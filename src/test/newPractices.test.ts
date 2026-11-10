import { describe, expect, it } from 'vitest'
import { createInitialState, perform, startRun } from '../core/engine'
import { getInterpretationItems, stepsFor } from '../core/practice'
import type { EngineState, PracticeModule } from '../core/types'
import { practices } from '../data/catalog'
import p2 from '../practices/bioquimica-p2'

const CALC: Record<string, number> = {
  'calc:g5': 25, 'calc:g10': 50, 'calc:g20': 100, 'calc:g50': 250, 'calc:vol': 50,
  'calc:tmax': Math.log(6) / 1.0, 'calc:t12': Math.LN2 / 0.2,
  'calc:mlh': 125, 'calc:gtt': 500 * 20 / 240, 'calc:macro': 1000 * 20 / 480, 'calc:micro': 125, 'calc:in': 3500, 'calc:out': 2500, 'calc:bal': 1000,
}

/** Completa una práctica ejecutando, en orden, todas las acciones de cada paso. */
function autoComplete(m: PracticeModule, scenario: string): EngineState {
  let s = startRun(createInitialState(m, scenario, 7), 0)
  let t = 1000
  let guard = 0
  while (s.status === 'running' && guard++ < 500) {
    const step = stepsFor(m, s.roundIndex)[s.stepIndex]
    for (const a of step.actions) {
      t += 500
      const payload = a === 'record' ? (s.data.measured as number) / 1000 : a.startsWith('calc:') ? CALC[a] : a === 'angle' ? 20 : a === 'select-catheter' ? (scenario === 'fragil' ? 22 : 18) : undefined
      s = perform(m, s, a, payload, t)
    }
  }
  return s
}

describe('catálogo', () => {
  it('registra P2, P5, P6, P7, P8, P10, P11, P12, P13 y P14 ordenadas por número', () => {
    expect(practices.filter((p) => p.meta.subjectId === 'bioquimica').map((p) => p.meta.number)).toEqual([2, 5, 6, 7, 8, 10, 11, 12, 13, 14])
    expect(practices.filter((p) => p.meta.subjectId === 'farmacologia').map((p) => p.meta.number)).toEqual([1, 2, 3, 4, 5, 6, 7])
    expect(practices.filter((p) => p.meta.subjectId === 'enfermeria-basica').map((p) => p.meta.number)).toEqual([15])
  })
  it('toda práctica declara fuente y aviso educativo', () => {
    for (const p of practices) {
      expect(p.meta.source).toMatch(/Ficha de planificación/)
      expect(p.disclaimer.length).toBeGreaterThan(10)
    }
  })
  it('las prácticas no validadas explican por qué', () => {
    for (const p of practices.filter((x) => !x.meta.validated)) expect(p.meta.validationNotes?.length).toBeGreaterThan(0)
  })
})

describe.each(practices.filter((p) => ['bioquimica-p5', 'bioquimica-p6', 'bioquimica-p8', 'bioquimica-p10', 'bioquimica-p14'].includes(p.meta.id)))(
  'práctica de tubos $meta.id',
  (m) => {
    it('se completa sin errores siguiendo el orden de la ficha y genera resultados por ronda', () => {
      const s = autoComplete(m, m.scenarios[0].id)
      expect(s.status).toBe('completed')
      expect(s.errors).toBe(0)
      expect(s.results).toHaveLength(m.rounds.length)
      for (const r of s.results) expect(r.observations?.length).toBeGreaterThan(0)
    })
    it('cada ítem de interpretación tiene respuesta correcta entre sus opciones', () => {
      const s = autoComplete(m, m.scenarios[0].id)
      const items = getInterpretationItems(m, s.results)
      expect(items.length).toBeGreaterThan(0)
      for (const i of items) expect(i.options.map((o) => o.id)).toContain(i.correct)
    })
    it('un paso fuera de orden cuenta como error', () => {
      let s = startRun(createInitialState(m, m.scenarios[0].id, 7), 0)
      s = perform(m, s, 'observe', undefined, 10)
      expect(s.errors).toBe(1)
    })
  },
)

describe('P2 refractómetro', () => {
  it('se completa y registra un valor con fecha y hora', () => {
    const s = autoComplete(p2, 'b')
    expect(s.status).toBe('completed')
    expect(s.errors).toBe(0)
    expect(s.results[0].value).toBeGreaterThan(1)
    expect(s.results[0].recordedAt).toBeGreaterThan(0)
  })
  it('rechaza leer sin muestra y un valor que no coincide con la lectura', () => {
    let s = startRun(createInitialState(p2, 'b', 7), 0)
    s = perform(p2, s, 'water->prism', undefined, 1)
    s = perform(p2, s, 'paper->prism', undefined, 2)
    s = perform(p2, s, 'read-value', undefined, 3)
    expect(s.errors).toBe(1)
    s = perform(p2, s, 'urine->prism', undefined, 4)
    s = perform(p2, s, 'lower-lens', undefined, 5)
    s = perform(p2, s, 'face-light', undefined, 6)
    s = perform(p2, s, 'read-value', undefined, 7)
    const before = s.errors
    s = perform(p2, s, 'record', 9.999, 8)
    expect(s.errors).toBe(before + 1)
  })
  it('no inventa interpretación numérica: sin ítems automáticos y nota de validación', () => {
    expect(p2.meta.validated).toBe(false)
    const s = autoComplete(p2, 'a')
    expect(getInterpretationItems(p2, s.results)).toHaveLength(0)
  })
})

describe.each(practices.filter((p) => ['bioquimica-p11', 'bioquimica-p12', 'bioquimica-p13'].includes(p.meta.id) || p.meta.subjectId === 'farmacologia'))('práctica de procedimiento $meta.id', (m) => {
  it('se completa sin errores en el orden de la ficha', () => {
    const s = autoComplete(m, m.scenarios[0].id)
    expect(s.status).toBe('completed')
    expect(s.errors).toBe(0)
  })
  it('los ítems de interpretación tienen respuesta correcta entre sus opciones', () => {
    const items = getInterpretationItems(m, autoComplete(m, m.scenarios[0].id).results)
    for (const i of items) expect(i.options.map((o) => o.id)).toContain(i.correct)
  })
  it('una acción inexistente en el paso actual cuenta como error', () => {
    let s = startRun(createInitialState(m, m.scenarios[0].id, 7), 0)
    s = perform(m, s, 'accion-invalida', undefined, 1)
    expect(s.errors).toBe(1)
  })
})

describe('P12 reglas de la ficha', () => {
  const p12 = practices.find((p) => p.meta.id === 'bioquimica-p12') as PracticeModule
  const upTo = (stepId: string) => {
    let s = startRun(createInitialState(p12, 'guiada', 7), 0)
    for (const st of stepsFor(p12, 0)) {
      if (st.id === stepId) break
      for (const a of st.actions) s = perform(p12, s, a, undefined, 10)
    }
    return s
  }
  it('rechaza una temperatura distinta de 37 ºC', () => {
    const s = perform(p12, upTo('incubate'), 'temp:60', undefined, 20)
    expect(s.errors).toBe(1)
    expect(s.feedback?.text).toMatch(/37/)
  })
  it('rechaza centrifugar sin balancear', () => {
    const s = perform(p12, upTo('centrifuge'), 'centrifuge-unbalanced', undefined, 20)
    expect(s.errors).toBe(1)
  })
  it('P13 comparte el contenido de P12', () => {
    const p13 = practices.find((p) => p.meta.id === 'bioquimica-p13') as PracticeModule
    expect(p13.steps.map((x) => x.id)).toEqual(p12.steps.map((x) => x.id))
  })
})

describe('farmacología: cálculos y reglas', () => {
  const get = (id: string) => practices.find((p) => p.meta.id === id) as PracticeModule
  const reach = (m: PracticeModule, stepId: string) => {
    let s = startRun(createInitialState(m, m.scenarios[0].id, 7), 0)
    for (const st of stepsFor(m, 0)) {
      if (st.id === stepId) break
      for (const a of st.actions) s = perform(m, s, a, a.startsWith('calc:') ? CALC[a] : a === 'select-catheter' ? 18 : undefined, 10)
    }
    return s
  }
  it('P7 rechaza un goteo incorrecto y acepta el correcto', () => {
    const m = get('farmacologia-p7')
    let s = perform(m, reach(m, 'drip'), 'calc:macro', 10, 20)
    expect(s.errors).toBe(1)
    s = perform(m, s, 'calc:macro', 41.7, 30)
    expect(s.errors).toBe(1)
    expect(s.data.val_macro).toBeCloseTo(41.7)
  })
  it('P2 rechaza gramos incorrectos de glucosa', () => {
    const m = get('farmacologia-p2')
    const s = perform(m, reach(m, 'compare'), 'calc:g10', 5, 20)
    expect(s.errors).toBe(1)
  })
  it('P3 exige el orden inserción → flashback → retiro de aguja', () => {
    const m = get('farmacologia-p3')
    const s = perform(m, reach(m, 'cannulate'), 'withdraw', undefined, 20)
    expect(s.errors).toBe(1)
  })
  it('P3 rechaza puncionar sin antisepsia', () => {
    const m = get('farmacologia-p3')
    const s = perform(m, reach(m, 'antisepsis'), 'no-antisepsis', undefined, 20)
    expect(s.errors).toBe(1)
    expect(s.feedback?.text).toMatch(/aséptica/)
  })
  it('P3 exige el calibre según el caso y cambia los signos vitales', () => {
    const m = get('farmacologia-p3')
    expect(m.scenarios.map((x) => x.id)).toEqual(['rapida', 'fragil'])
    let s = startRun(createInitialState(m, 'fragil', 7), 0)
    for (const st of stepsFor(m, 0)) {
      if (st.id === 'select') break
      for (const a of st.actions) s = perform(m, s, a, undefined, 10)
    }
    s = perform(m, s, 'select-catheter', 18, 20)
    expect(s.errors).toBe(1)
    s = perform(m, s, 'select-catheter', 22, 30)
    expect(s.errors).toBe(1)
    expect(s.data.doneActions).toContain('select-catheter:22')
    expect(autoComplete(m, 'rapida').status).toBe('completed')
    expect(autoComplete(m, 'fragil').status).toBe('completed')
  })
  it('P3 arrastrar y soltar: combinaciones válidas mapean a acciones y las inválidas son error', () => {
    const m = get('farmacologia-p3') as PracticeModule & { dnd?: unknown }
    let s = startRun(createInitialState(m, 'rapida', 7), 0)
    s = perform(m, s, 'soap->arm', undefined, 5)
    expect(s.errors).toBe(1)
    s = perform(m, s, 'handwash', undefined, 6)
    expect(s.data.doneActions).toContain('handwash')
  })
  it('Enfermería P15: calibre según el caso, orden de canalización y lavado', () => {
    const m = get('enfermeria-p15')
    expect(autoComplete(m, 'rapida').status).toBe('completed')
    expect(autoComplete(m, 'fragil').status).toBe('completed')
    let s = startRun(createInitialState(m, 'fragil', 7), 0)
    for (const st of stepsFor(m, 0)) {
      if (st.id === 'material') break
      for (const a of st.actions) s = perform(m, s, a, undefined, 10)
    }
    s = perform(m, s, 'select-catheter', 18, 20)
    expect(s.errors).toBe(1)
    s = perform(m, s, 'select-catheter', 24, 30)
    expect(s.errors).toBe(1)
    expect(s.data.doneActions).toContain('select-catheter:24')
    s = perform(m, s, 'recap', undefined, 40)
    expect(s.errors).toBe(2)
  })
  it('P4 y P6 tienen interpretación con respuesta correcta definida', () => {
    for (const id of ['farmacologia-p4', 'farmacologia-p6']) {
      const m = get(id)
      expect(getInterpretationItems(m, autoComplete(m, m.scenarios[0].id).results).length).toBeGreaterThan(0)
    }
  })
})
