import { describe, expect, it } from 'vitest'
import { getPractice } from '../data/catalog'
import { createInitialState, perform, startRun } from '../core/engine'
import { stepsFor } from '../core/practice'

describe('Farmacología P1, P2 y P5 con simulaciones', () => {
  it.each(['farmacologia-p1', 'farmacologia-p2', 'farmacologia-p5'])('%s expone Extra y conserva sus pasos', (id) => {
    const m = getPractice(id)!
    expect(stepsFor(m, 0).length).toBeGreaterThan(3)
    const s = startRun(createInitialState(m, m.scenarios[0].id, 7), 0)
    expect(s.status).toBe('running')
  })
  it('P5: las acciones de caso siguen siendo válidas en su paso', () => {
    const m = getPractice('farmacologia-p5')!
    let s = startRun(createInitialState(m, m.scenarios[0].id, 7), 0)
    s = perform(m, s, 'case:1', undefined, 10)
    expect(s.errors).toBe(0)
  })
})
