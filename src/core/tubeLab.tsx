/**
 * Plantilla reutilizable para prácticas de tubos de ensayo (pruebas cualitativas).
 *
 * Una práctica describe en un objeto `TubeLabSpec`: muestras, reactivos, equipos y
 * rondas (cada ronda = una prueba con sus pasos y el resultado esperado por muestra).
 * `buildTubeLab` genera de ahí los pasos del motor, las reglas de simulación y la
 * escena 2D interactiva. Los resultados esperados deben salir de la ficha académica.
 *
 * Acciones del motor:
 *   place:<muestra>            colocar la muestra en la gradilla
 *   add:<reactivo>:<muestra>   añadir un reactivo a un tubo
 *   equip:<equipo>             usar un equipo (calentar, incubar…)
 *   observe                    observar y registrar los resultados de la ronda
 */
import { useState } from 'react'
import type { DragEvent } from 'react'
import type {
  InterpretationItem,
  MaterialItem,
  PracticeHooks,
  PracticeMeta,
  PracticeModule,
  ProcedureStep,
  QuizConfig,
  Round,
  Scenario,
  SceneProps,
  SimData,
  Weights,
} from './types'
import { defaultTubeWeights } from '../practices/shared'

export interface TubeSample {
  id: string
  label: string
  description: string
  /** Color del líquido antes de reaccionar. */
  base: string
}

export interface TubeReagent {
  id: string
  label: string
  description: string
  /** Color del frasco / de las gotas. */
  color: string
  /** Si se indica, el reactivo solo corresponde a estos tubos. */
  targets?: string[]
}

export interface TubeEquipment {
  id: string
  label: string
  description: string
  actionLabel: string
}

export interface TubeOutcome {
  /** Observación en palabras (se registra en el informe). */
  text: string
  liquid: string
  /** Anillo de color en la interfase (p. ej. prueba de Molisch). */
  ring?: string
  /** Precipitado en el fondo del tubo. */
  precipitate?: string
}

interface StepText {
  id: string
  title: string
  instruction: string
  hint: string
  success: string
}

export type TubeStep =
  | (StepText & { kind: 'place' })
  | (StepText & { kind: 'add'; reagent: string | string[] })
  | (StepText & { kind: 'equip'; equipment: string })
  | (StepText & { kind: 'observe' })

export interface TubeRound {
  id: string
  label: string
  description: string
  steps: TubeStep[]
  outcome: (sampleId: string) => TubeOutcome
}

export interface TubeLabSpec {
  samples: TubeSample[]
  reagents: TubeReagent[]
  equipment: TubeEquipment[]
  rounds: TubeRound[]
  /** Texto para el nombre de cada tubo ("Muestra", "Tubo"). */
  sampleNoun?: string
}

type Built = Pick<PracticeModule, 'rounds' | 'steps' | 'roundSteps' | 'hooks' | 'materialsPanel' | 'scenarios' | 'materialsMode' | 'Scene'>

export function buildTubeLab(spec: TubeLabSpec): Built {
  const sampleIds = spec.samples.map((s) => s.id)
  const reagentOf = (id: string) => spec.reagents.find((r) => r.id === id)
  const sampleOf = (id: string) => spec.samples.find((s) => s.id === id)
  const equipOf = (id: string) => spec.equipment.find((e) => e.id === id)

  const toStep = (st: TubeStep): ProcedureStep => {
    let actions: string[]
    if (st.kind === 'place') actions = sampleIds.map((s) => `place:${s}`)
    else if (st.kind === 'add')
      actions = [st.reagent].flat().flatMap((rid) => (reagentOf(rid)?.targets ?? sampleIds).map((s) => `add:${rid}:${s}`))
    else if (st.kind === 'equip') actions = [`equip:${st.equipment}`]
    else actions = ['observe']
    return { id: st.id, title: st.title, instruction: st.instruction, hint: st.hint, success: st.success, actions }
  }

  const rounds: Round[] = spec.rounds.map((r) => ({ id: r.id, label: r.label, description: r.description }))
  const roundSteps = Object.fromEntries(spec.rounds.map((r) => [r.id, r.steps.map(toStep)]))

  const hooks: PracticeHooks = {
    initRoundData: (ri): SimData => ({
      placed: spec.rounds[ri]?.steps.some((s) => s.kind === 'place') ? [] : [...sampleIds],
    }),
    afterAction(action, _payload, { state }) {
      const [verb, a, b] = action.split(':')
      if (verb === 'place') return { placed: [...((state.data.placed as string[]) ?? []), a] }
      if (verb === 'add') return { [`added:${a}`]: [...((state.data[`added:${a}`] as string[]) ?? []), b] }
      if (verb === 'equip') return { [`equip:${a}`]: true }
      if (verb === 'observe') return { observed: true }
      return {}
    },
    buildRoundResult({ now, round }) {
      const tr = spec.rounds.find((r) => r.id === round.id) as TubeRound
      return {
        roundId: round.id,
        label: round.label,
        observations: spec.samples.map((s) => ({ sample: s.label, text: tr.outcome(s.id).text })),
        classification: 'observado',
        classificationLabel: 'Observaciones registradas',
        recordedAt: now,
      }
    },
    describeInvalid(action) {
      const [verb, a, b] = action.split(':')
      if (verb === 'add') return `No corresponde añadir ${reagentOf(a)?.label ?? a} al tubo «${sampleOf(b)?.label ?? b}» en este momento.`
      if (verb === 'place') return 'Esa muestra no corresponde en este paso.'
      if (verb === 'equip') return `No corresponde usar «${equipOf(a)?.label ?? a}» en este momento.`
      return 'Esa acción no es válida en este paso. Revisa las instrucciones.'
    },
  }

  const materialsPanel: MaterialItem[] = [
    ...spec.samples.map((s) => ({ id: `s-${s.id}`, label: s.label, description: s.description, kind: 'material' as const })),
    ...spec.reagents.map((r) => ({ id: `r-${r.id}`, label: r.label, description: r.description, kind: 'material' as const })),
    ...spec.equipment.map((e) => ({ id: `e-${e.id}`, label: e.label, description: e.description, kind: 'equipment' as const })),
  ]

  const scenarios: Scenario[] = [{ id: 'default', label: 'Práctica', description: 'Simulación según la ficha.' }]

  const Scene = (props: SceneProps) => <TubeBench spec={spec} {...props} />

  return { rounds, steps: roundSteps[spec.rounds[0].id], roundSteps, hooks, materialsPanel, scenarios, materialsMode: 'info', Scene }
}

export interface TubePracticeOptions {
  meta: PracticeMeta
  spec: TubeLabSpec
  quiz: QuizConfig
  interpretationItems: InterpretationItem[]
  referenceTable: PracticeModule['referenceTable']
  /** Frase final de las conclusiones automáticas. */
  closing: string
  defaultWeights?: Weights
  disclaimer?: string
}

/** Crea un módulo de práctica completo a partir de una especificación de tubos de ensayo. */
export function tubePractice(o: TubePracticeOptions): PracticeModule {
  const built = buildTubeLab(o.spec)
  return {
    meta: o.meta,
    ...built,
    quiz: o.quiz,
    defaultWeights: o.defaultWeights ?? defaultTubeWeights,
    interpretationItems: o.interpretationItems,
    referenceTable: o.referenceTable,
    disclaimer:
      o.disclaimer ??
      'Simulación educativa basada en la ficha de práctica: los resultados representan los efectos descritos en ella y no reemplazan el trabajo experimental real.',
    buildConclusion: (results) =>
      results
        .map((r) => `${r.label}: ${(r.observations ?? []).map((x) => `${x.sample} — ${x.text}`).join('; ')}.`)
        .join(' ') +
      ' ' +
      o.closing,
  }
}

/* ------------------------------------------------------------------ */
/* Escena                                                              */
/* ------------------------------------------------------------------ */

function Tube({ liquid, ring, precipitate, dots }: { liquid: string; ring?: string; precipitate?: string; dots: string[] }) {
  return (
    <svg viewBox="0 0 60 180" className="h-40 w-14" aria-hidden="true">
      {/* gotas añadidas */}
      {dots.map((c, i) => (
        <circle key={i} cx={12 + (i % 4) * 12} cy={8 + Math.floor(i / 4) * 9} r="3.5" fill={c} stroke="#0f172a" strokeWidth=".4" />
      ))}
      <clipPath id="tube-clip">
        <path d="M12 24h36v118a18 18 0 0 1-36 0z" />
      </clipPath>
      <g clipPath="url(#tube-clip)">
        <rect x="10" y="70" width="40" height="110" fill={liquid} />
        {ring && <rect x="10" y="94" width="40" height="9" fill={ring} />}
        {precipitate && <ellipse cx="30" cy="150" rx="14" ry="7" fill={precipitate} />}
      </g>
      <path d="M12 24h36v118a18 18 0 0 1-36 0z" fill="none" stroke="#64748b" strokeWidth="2" />
      <rect x="9" y="20" width="42" height="6" rx="3" fill="#94a3b8" />
    </svg>
  )
}

function TubeBench({ spec, state, perform, disabled }: SceneProps & { spec: TubeLabSpec }) {
  const [held, setHeld] = useState<string | null>(null)
  const round = spec.rounds[Math.min(state.roundIndex, spec.rounds.length - 1)]
  const step = round.steps[Math.min(state.stepIndex, round.steps.length - 1)]
  const placed = (state.data.placed as string[]) ?? []
  const noun = spec.sampleNoun ?? 'Muestra'
  const showOutcome = step.kind === 'observe'

  const roundReagents = [...new Set(round.steps.flatMap((s) => (s.kind === 'add' ? [s.reagent].flat() : [])))]
    .map((id) => spec.reagents.find((r) => r.id === id))
    .filter((r): r is TubeReagent => !!r)
  const roundEquipment = [...new Set(round.steps.filter((s) => s.kind === 'equip').map((s) => (s as { equipment: string }).equipment))]
    .map((id) => spec.equipment.find((e) => e.id === id))
    .filter((e): e is TubeEquipment => !!e)

  const addTo = (reagentId: string, sampleId: string) => {
    if (disabled) return
    perform(`add:${reagentId}:${sampleId}`)
    setHeld(null)
  }

  const addToAll = (reagentIds: string[]) => {
    for (const reagentId of reagentIds) {
      const r = spec.reagents.find((x) => x.id === reagentId)
      for (const s of r?.targets ?? spec.samples.map((x) => x.id)) {
        if (!((state.data[`added:${reagentId}`] as string[]) ?? []).includes(s)) perform(`add:${reagentId}:${s}`)
      }
    }
    setHeld(null)
  }

  const onDrop = (e: DragEvent, sampleId: string) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (id) addTo(id, sampleId)
  }

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-100 to-slate-200 p-4" role="group" aria-label="Mesa de trabajo del laboratorio virtual">
      <p className="text-center text-xs text-slate-600">
        {held ? 'Reactivo seleccionado: pulsa el tubo donde añadirlo o arrástralo.' : 'Selecciona un reactivo (o arrástralo) y llévalo al tubo correspondiente.'}
      </p>

      {/* Gradilla */}
      <div className="flex flex-1 flex-wrap items-end justify-center gap-3 rounded-xl bg-white/60 p-3" aria-label="Gradilla de tubos de ensayo">
        {spec.samples.map((s) => {
          const isPlaced = placed.includes(s.id)
          const out = showOutcome && isPlaced ? round.outcome(s.id) : null
          const dots = spec.reagents.filter((r) => ((state.data[`added:${r.id}`] as string[]) ?? []).includes(s.id)).map((r) => r.color)
          return (
            <div
              key={s.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, s.id)}
              className="flex w-28 flex-col items-center text-center"
            >
              {isPlaced ? (
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => held && addTo(held, s.id)}
                  aria-label={held ? `Añadir el reactivo seleccionado al tubo ${s.label}` : `${noun}: ${s.label}`}
                  className={`rounded-xl p-1 ${held ? 'cursor-pointer outline-2 outline-dashed outline-amber-400' : 'cursor-default'}`}
                >
                  <Tube liquid={out?.liquid ?? s.base} ring={out?.ring} precipitate={out?.precipitate} dots={dots} />
                </button>
              ) : (
                <div className="flex h-[10.5rem] w-14 items-center justify-center rounded-xl border-2 border-dashed border-slate-400 text-[10px] text-slate-500">vacío</div>
              )}
              <span className="mt-1 text-xs font-semibold text-slate-800">{s.label}</span>
              {out && <span className="mt-1 text-[11px] leading-tight text-slate-600">{out.text}</span>}
            </div>
          )
        })}
      </div>

      {/* Paso: colocar muestras */}
      {step.kind === 'place' && (
        <div className="rounded-xl bg-white/70 p-3">
          <p className="mb-2 text-center text-xs font-semibold text-slate-700">Muestras disponibles</p>
          <div className="flex flex-wrap justify-center gap-2">
            {spec.samples.filter((s) => !placed.includes(s.id)).map((s) => (
              <button key={s.id} type="button" disabled={disabled} onClick={() => perform(`place:${s.id}`)} className="rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:border-brand-500">
                Colocar «{s.label}»
              </button>
            ))}
            <button
              type="button"
              disabled={disabled}
              onClick={() => spec.samples.filter((s) => !placed.includes(s.id)).forEach((s) => perform(`place:${s.id}`))}
              className="rounded-lg bg-brand-700 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-800"
            >
              Colocar todas
            </button>
          </div>
        </div>
      )}

      {/* Reactivos */}
      {roundReagents.length > 0 && (
        <div className="rounded-xl bg-white/70 p-3">
          <p className="mb-2 text-center text-xs font-semibold text-slate-700">Reactivos de esta parte</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {roundReagents.map((r) => (
              <button
                key={r.id}
                type="button"
                draggable={!disabled}
                disabled={disabled}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', r.id)
                  setHeld(r.id)
                }}
                onClick={() => setHeld(held === r.id ? null : r.id)}
                aria-pressed={held === r.id}
                aria-label={`${r.label}${held === r.id ? ' (seleccionado)' : ''}`}
                className={`flex min-w-24 cursor-grab flex-col items-center gap-1 rounded-xl border-2 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm ${held === r.id ? 'border-amber-500 ring-2 ring-amber-300' : 'border-slate-200 hover:border-brand-500'}`}
              >
                <svg viewBox="0 0 30 44" className="h-10 w-7" aria-hidden="true">
                  <rect x="10" y="2" width="10" height="8" rx="2" fill="#475569" />
                  <rect x="4" y="10" width="22" height="32" rx="6" fill={r.color} stroke="#0f172a" strokeWidth=".6" opacity=".9" />
                </svg>
                {r.label}
              </button>
            ))}
          </div>
          {step.kind === 'add' && (
            <div className="mt-3 text-center">
              <button type="button" disabled={disabled} onClick={() => addToAll([step.reagent].flat())} className="rounded-lg bg-brand-700 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-800">
                {[step.reagent].flat().length === 1
                  ? `Añadir «${spec.reagents.find((r) => r.id === [step.reagent].flat()[0])?.label}» a todos los tubos`
                  : 'Añadir a cada tubo el reactivo que le corresponde'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Equipos */}
      {roundEquipment.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {roundEquipment.map((e) => (
            <button
              key={e.id}
              type="button"
              disabled={disabled || state.data[`equip:${e.id}`] === true}
              onClick={() => perform(`equip:${e.id}`)}
              className="rounded-lg border border-brand-500 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 disabled:border-slate-200 disabled:text-slate-400"
            >
              {state.data[`equip:${e.id}`] === true ? `${e.label}: hecho ✓` : e.actionLabel}
            </button>
          ))}
        </div>
      )}

      {step.kind === 'observe' && (
        <div className="flex justify-center">
          <button type="button" disabled={disabled} onClick={() => perform('observe')} className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-brand-800 disabled:opacity-50">
            Observar y registrar resultados
          </button>
        </div>
      )}
    </div>
  )
}
