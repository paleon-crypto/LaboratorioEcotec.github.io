/**
 * Motor de simulación reutilizable.
 *
 * Es un conjunto de funciones PURAS: reciben un estado y devuelven uno nuevo.
 * Cada práctica aporta (a) la lista de pasos, (b) las rondas (p. ej. ayunas /
 * posprandial) y (c) unos `hooks` con su lógica experimental.
 *
 * Reglas del motor:
 *  - Un paso se completa cuando se realizan todas sus `actions` (en cualquier orden).
 *  - Una acción que no corresponde al paso actual es un error (se registra y penaliza),
 *    salvo que ya se hubiera realizado en un paso anterior (solo informativo).
 *  - Al terminar los pasos de una ronda se construye su resultado y se pasa a la siguiente.
 */
import { stepsFor, totalSteps } from './practice'
import type {
  ActionPayload,
  EngineState,
  Feedback,
  HookContext,
  PracticeModule,
  SimData,
} from './types'

type Def = Pick<PracticeModule, 'steps' | 'rounds' | 'roundSteps' | 'hooks'>

export function createInitialState(def: Def, scenarioId: string, seed: number): EngineState {
  return {
    status: 'idle',
    scenarioId,
    seed,
    roundIndex: 0,
    stepIndex: 0,
    done: [],
    completedSteps: Object.fromEntries(def.rounds.map((r) => [r.id, [] as string[]])),
    errors: 0,
    results: [],
    log: [],
    data: def.hooks.initRoundData(0),
    feedback: null,
    feedbackCounter: 0,
    startedAt: null,
    finishedAt: null,
  }
}

export function startRun(state: EngineState, now: number): EngineState {
  return { ...state, status: 'running', startedAt: now }
}

function withFeedback(state: EngineState, kind: Feedback['kind'], text: string): EngineState {
  const key = state.feedbackCounter + 1
  return { ...state, feedbackCounter: key, feedback: { kind, text, key } }
}

export function perform(
  def: Def,
  state: EngineState,
  action: string,
  payload: ActionPayload,
  now: number,
): EngineState {
  if (state.status !== 'running') return state

  const steps = stepsFor(def, state.roundIndex)
  const step = steps[state.stepIndex]
  const round = def.rounds[state.roundIndex]
  const ctx: HookContext = { now, state, step, round }

  const logEntry = (ok: boolean, message: string) => ({
    at: now,
    roundId: round.id,
    stepId: step.id,
    action,
    ok,
    message,
  })

  // 1) Validación de orden
  if (!step.actions.includes(action)) {
    const idx = steps.findIndex((s) => s.actions.includes(action))
    if (idx >= 0 && idx < state.stepIndex) {
      // Ya se hizo en un paso anterior: informativo, sin penalización.
      return withFeedback(state, 'info', 'Esa acción ya fue realizada en un paso anterior.')
    }
    const message =
      idx > state.stepIndex
        ? `Acción fuera de orden. Ahora corresponde: «${step.title}».`
        : (def.hooks.describeInvalid?.(action) ?? 'Esa acción no es válida en este paso. Revisa las instrucciones.')
    return fail(state, logEntry(false, message), message)
  }

  if (state.done.includes(action)) {
    return withFeedback(state, 'info', 'Ya realizaste esa acción en este paso.')
  }

  // 2) Validación específica de la práctica (reglas de la simulación)
  const hookError = def.hooks.beforeAction?.(action, payload, ctx) ?? null
  if (hookError) return fail(state, logEntry(false, hookError), hookError)

  // 3) Acción correcta
  const patch: SimData = def.hooks.afterAction?.(action, payload, ctx) ?? {}
  const done = [...state.done, action]
  let next: EngineState = {
    ...state,
    data: { ...state.data, ...patch },
    done,
    log: [...state.log, logEntry(true, 'Acción correcta')],
  }

  const stepComplete = step.actions.every((a) => done.includes(a))
  if (!stepComplete) {
    return withFeedback(next, 'ok', `Correcto (${done.length}/${step.actions.length}).`)
  }

  // 4) Paso completado
  const completedSteps = {
    ...next.completedSteps,
    [round.id]: [...(next.completedSteps[round.id] ?? []), step.id],
  }
  next = { ...next, completedSteps, done: [], stepIndex: state.stepIndex + 1 }

  if (next.stepIndex < steps.length) {
    return withFeedback(next, 'ok', step.success)
  }

  // 5) Ronda completada
  const result = def.hooks.buildRoundResult({ now, state: next, step, round })
  next = { ...next, results: [...next.results, result] }

  if (state.roundIndex + 1 < def.rounds.length) {
    const nextRound = def.rounds[state.roundIndex + 1]
    next = {
      ...next,
      roundIndex: state.roundIndex + 1,
      stepIndex: 0,
      done: [],
      data: { ...def.hooks.initRoundData(state.roundIndex + 1), ...carryOver(next.data) },
    }
    return withFeedback(
      next,
      'ok',
      `Medición «${round.label}» completada. Ahora inicia la medición «${nextRound.label}».`,
    )
  }

  next = { ...next, status: 'completed', finishedAt: now }
  return withFeedback(next, 'ok', 'Práctica completada. Revisa tus resultados y continúa con la evaluación.')
}

/** Datos que se conservan entre rondas (prefijo "keep_"). */
function carryOver(data: SimData): SimData {
  return Object.fromEntries(Object.entries(data).filter(([k]) => k.startsWith('keep_')))
}

function fail(state: EngineState, entry: EngineState['log'][number], message: string): EngineState {
  return withFeedback({ ...state, errors: state.errors + 1, log: [...state.log, entry] }, 'error', message)
}

export { totalSteps }

export function completedStepCount(state: EngineState): number {
  return Object.values(state.completedSteps).reduce((n, list) => n + list.length, 0)
}

export function progressPercent(def: Def, state: EngineState): number {
  return Math.round((completedStepCount(state) / totalSteps(def)) * 100)
}

/** PRNG determinista (mulberry32) para que los valores simulados sean reproducibles. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function randomInt(rand: () => number, min: number, max: number): number {
  return Math.floor(rand() * (max - min + 1)) + min
}
