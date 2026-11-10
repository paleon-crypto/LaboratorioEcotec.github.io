import { describe, expect, it } from 'vitest'
import { createInitialState, perform, startRun } from '../core/engine'
import { computeGrade } from '../core/scoring'
import type { Attempt, EngineState } from '../core/types'
import practice from '../practices/bioquimica-p7'
import { classifyFasting, classifyPostprandial } from '../practices/bioquimica-p7/reference'
import { MEASURE_MS } from '../practices/bioquimica-p7/config'

describe('valores de referencia de la ficha', () => {
  it('glucemia en ayunas: <100 normal, 100-125 prediabetes, >=126 umbral', () => {
    expect(classifyFasting(99)).toBe('normal')
    expect(classifyFasting(100)).toBe('prediabetes')
    expect(classifyFasting(125)).toBe('prediabetes')
    expect(classifyFasting(126)).toBe('umbral_diabetes')
  })
  it('glucemia posprandial: <140 normal, 140-199 no especificado, >=200 umbral', () => {
    expect(classifyPostprandial(139)).toBe('normal')
    expect(classifyPostprandial(140)).toBe('no_especificado')
    expect(classifyPostprandial(199)).toBe('no_especificado')
    expect(classifyPostprandial(200)).toBe('umbral_diabetes')
  })
})

const PICKS = ['glucometer', 'strips', 'lancet', 'cotton', 'alcohol', 'sharps']

/** Lleva la ronda hasta justo antes de registrar el valor (pasos 1 a 5 del simulador). */
function toRecord(s: EngineState, t: number): { s: EngineState; t: number } {
  const act = (a: string, p?: number) => {
    s = perform(practice, s, a, p, t)
  }
  for (const m of PICKS) act(`pick:${m}`)
  act('wash-soap')
  act('dry-hands')
  act('strips->glucometer')
  act('prepare-lancet')
  act('alcohol->cotton')
  act('cotton->finger')
  act('lancet->finger')
  act('drop->strip')
  t += MEASURE_MS + 100
  act('read-value')
  act('stop-bleeding')
  act('lancet->sharps')
  act('usedstrip->sharps')
  act('cotton->sharps')
  return { s, t }
}

/** Ejecuta una ronda completa de forma correcta. Devuelve el estado final y el reloj. */
function runRound(s0: EngineState, t0: number): { s: EngineState; t: number } {
  const r = toRecord(s0, t0)
  return { s: perform(practice, r.s, 'record', r.s.data.measured as number, r.t), t: r.t }
}

describe('motor de simulación', () => {
  const fresh = () => startRun(createInitialState(practice, 'c', 42), 0)

  it('el procedimiento sigue la ficha: lavado, tira/lanceta/limpieza, punción, sangrado/desecho, registro', () => {
    expect(practice.steps.map((s) => s.id)).toEqual(['prepare', 'wash', 'setup', 'puncture', 'dispose', 'record'])
    expect(practice.meta.durationMin).toBe(80)
    expect(practice.meta.careerIds).toEqual(['medicina'])
  })

  it('completa las dos mediciones y registra los resultados con fecha y hora', () => {
    let { s, t } = runRound(fresh(), 1000)
    expect(s.status).toBe('running')
    expect(s.roundIndex).toBe(1)
    expect(s.results).toHaveLength(1)
    expect(s.results[0].recordedAt).toBeGreaterThan(0)
    ;({ s, t } = runRound(s, t))
    expect(t).toBeGreaterThan(0)
    expect(s.status).toBe('completed')
    expect(s.results.map((r) => r.roundId)).toEqual(['ayunas', 'posprandial'])
    expect(s.errors).toBe(0)
    // Perfil C: valores altos simulados
    expect(s.results[0].value).toBeGreaterThanOrEqual(128)
    expect(s.results[1].value).toBeGreaterThanOrEqual(205)
    expect(s.results[1].classification).toBe('umbral_diabetes')
  })

  it('es reproducible con la misma semilla', () => {
    const a = runRound(fresh(), 1000).s
    const b = runRound(fresh(), 5000).s
    expect(a.results[0].value).toBe(b.results[0].value)
  })

  it('penaliza acciones fuera de orden y no avanza', () => {
    let s = fresh()
    s = perform(practice, s, 'lancet->finger', undefined, 10)
    expect(s.errors).toBe(1)
    expect(s.stepIndex).toBe(0)
    expect(s.feedback?.kind).toBe('error')
    expect(s.feedback?.text).toMatch(/fuera de orden/i)
  })

  it('exige lavar antes de secar y humedecer el algodón antes de limpiar el dedo', () => {
    let s = fresh()
    for (const m of PICKS) s = perform(practice, s, `pick:${m}`, undefined, 0)
    s = perform(practice, s, 'dry-hands', undefined, 1)
    expect(s.feedback?.text).toMatch(/lava las manos/i)
    s = perform(practice, s, 'wash-soap', undefined, 2)
    s = perform(practice, s, 'dry-hands', undefined, 3)
    expect(s.stepIndex).toBe(2)
    s = perform(practice, s, 'cotton->finger', undefined, 4)
    expect(s.feedback?.text).toMatch(/humedece/i)
    expect(s.errors).toBe(2)
  })

  it('no permite desechar el algodón antes de detener el sangrado', () => {
    let { s, t } = toRecord(fresh(), 0)
    expect(s.stepIndex).toBe(5)
    // Ronda nueva: llegar al paso de desecho sin detener el sangrado
    let s2 = fresh()
    for (const m of PICKS) s2 = perform(practice, s2, `pick:${m}`, undefined, 0)
    for (const a of ['wash-soap', 'dry-hands', 'strips->glucometer', 'prepare-lancet', 'alcohol->cotton', 'cotton->finger', 'lancet->finger', 'drop->strip']) s2 = perform(practice, s2, a, undefined, 100)
    s2 = perform(practice, s2, 'read-value', undefined, 100 + MEASURE_MS + 1)
    s2 = perform(practice, s2, 'cotton->sharps', undefined, t + 1)
    expect(s2.errors).toBe(1)
    expect(s2.feedback?.text).toMatch(/detener el sangrado/i)
    s = s2
  })

  it('no permite leer antes de que termine la medición', () => {
    let s = fresh()
    for (const m of PICKS) s = perform(practice, s, `pick:${m}`, undefined, 0)
    for (const a of ['wash-soap', 'dry-hands', 'strips->glucometer', 'prepare-lancet', 'alcohol->cotton', 'cotton->finger', 'lancet->finger', 'drop->strip']) s = perform(practice, s, a, undefined, 100)
    s = perform(practice, s, 'read-value', undefined, 200)
    expect(s.errors).toBe(1)
    expect(s.feedback?.text).toMatch(/procesando/i)
  })

  it('rechaza un valor registrado que no coincide con la lectura', () => {
    const { s: s0, t } = toRecord(fresh(), 0)
    let s = s0
    const bad = (s.data.measured as number) + 1
    s = perform(practice, s, 'record', bad, t + 10)
    expect(s.errors).toBe(1)
    expect(s.results).toHaveLength(0)
    s = perform(practice, s, 'record', 12.5, t + 10)
    expect(s.errors).toBe(2)
  })

  it('combinación inválida de elementos da un mensaje claro', () => {
    let s = fresh()
    for (const m of PICKS) s = perform(practice, s, `pick:${m}`, undefined, 0)
    s = perform(practice, s, 'wash-soap', undefined, 1)
    s = perform(practice, s, 'dry-hands', undefined, 1)
    s = perform(practice, s, 'cotton->glucometer', undefined, 1)
    expect(s.errors).toBe(1)
    expect(s.feedback?.text).toMatch(/no válida/i)
  })
})

describe('calificación ponderada', () => {
  const base = (): Attempt => {
    const done = runRound(startRun(createInitialState(practice, 'a', 7), 0), 0).s
    const done2 = runRound(done, 10_000).s
    return {
      id: 'x', practiceId: practice.meta.id, scenarioId: 'a',
      status: 'completed', startedAt: 0, finishedAt: 1, errors: done2.errors, results: done2.results,
      completedSteps: done2.completedSteps, log: [], interpretation: {}, quizAnswers: {}, quizSubmitted: false,
      openGrade: null, conclusions: '', observations: '', weightsUsed: practice.defaultWeights,
    }
  }

  it('es provisional mientras falten componentes y se renormaliza', () => {
    const g = computeGrade(base(), practice)
    expect(g.provisional).toBe(true)
    expect(g.total).toBe(100) // solo procedimiento disponible, sin errores
  })

  it('combina componentes según los pesos configurados', () => {
    const a = base()
    a.interpretation = { ayunas: a.results[0].classification, posprandial: a.results[1].classification }
    a.quizSubmitted = true
    a.quizAnswers = { c1: 'b', c2: 'c', c3: 'a', c4: 'a', c5: 'b', t1: false, t2: true, t3: false, t4: false, t5: true }
    a.openGrade = 80
    const g = computeGrade(a, practice)
    expect(g.provisional).toBe(false)
    // 100*30 + 100*20 + 100*20 + 100*15 + 80*15 = 9700 / 100
    expect(g.total).toBe(97)
    // Cambiar ponderación: todo el peso a procedimiento
    const only = computeGrade(a, practice, { ...practice.defaultWeights, procedure: 100, results: 0, quizChoice: 0, quizTrueFalse: 0, quizOpen: 0 })
    expect(only.total).toBe(100)
  })

  it('descuenta puntos por error', () => {
    const a = base()
    a.errors = 3
    expect(computeGrade(a, practice).breakdown[0].score).toBe(70)
  })
})
