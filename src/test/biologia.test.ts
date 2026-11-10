import { describe, expect, it } from 'vitest'
import { createInitialState, perform, startRun } from '../core/engine'
import { stepsFor } from '../core/practice'
import type { PracticeModule } from '../core/types'
import { practices } from '../data/catalog'
import { CASES } from '../practices/biologia-p10/Extra'

const bio = practices.filter((p) => p.meta.subjectId === 'biologia-celular')

describe('Biología Celular y Molecular', () => {
  it('cada práctica se completa con las acciones del procedimiento y es de Enfermería', () => {
    for (const m of bio as PracticeModule[]) {
      expect(m.meta.careerIds).toEqual(['enfermeria'])
      let s = startRun(createInitialState(m, m.scenarios[0].id, 7), 0)
      let t = 0, guard = 0
      while (s.status === 'running' && guard++ < 500) {
        for (const a of stepsFor(m, s.roundIndex)[s.stepIndex].actions) {
          const c = CASES[s.scenarioId]
          const payload = a === 'abo' ? c?.abo : a === 'rh' ? c?.rh : undefined
          s = perform(m, s, a, payload, (t += 500))
        }
      }
      expect(s.status, m.meta.id).toBe('completed')
      expect(s.errors, m.meta.id).toBe(0)
    }
  })
  it('P10: un grupo sanguíneo que no coincide con la aglutinación cuenta como error', () => {
    const m = bio.find((p) => p.meta.id === 'biologia-p10') as PracticeModule
    let s = startRun(createInitialState(m, 'a-pos', 7), 0)
    let t = 0
    for (const a of ['disinfect', 'prick', 'blood-drops', ...['anti-a', 'anti-b', 'anti-ab', 'anti-d'].map((r) => `reagent:${r}`), 'mix']) s = perform(m, s, a, undefined, (t += 500))
    s = perform(m, s, 'abo', 'O', (t += 500))
    expect(s.errors).toBe(1)
    s = perform(m, s, 'abo', 'A', (t += 500))
    expect(s.errors).toBe(1)
  })
  it('una acción inexistente cuenta como error', () => {
    for (const m of bio as PracticeModule[]) {
      const s = perform(m, startRun(createInitialState(m, m.scenarios[0].id, 7), 0), 'no-existe', undefined, 10)
      expect(s.errors, m.meta.id).toBe(1)
    }
  })
})
