/**
 * Utilidades comunes a todos los módulos de práctica.
 */
import type { Attempt, InterpretationItem, PracticeModule, ProcedureStep, RoundResult } from './types'

type StepsDef = Pick<PracticeModule, 'steps' | 'rounds' | 'roundSteps'>

/** Pasos de la ronda indicada (propios de la ronda o los comunes). */
export function stepsFor(def: StepsDef, roundIndex: number): ProcedureStep[] {
  const round = def.rounds[Math.min(Math.max(roundIndex, 0), def.rounds.length - 1)]
  return def.roundSteps?.[round.id] ?? def.steps
}

export function totalSteps(def: StepsDef): number {
  return def.rounds.reduce((n, _r, i) => n + stepsFor(def, i).length, 0)
}

/** Ítems de interpretación del estudiante: personalizados o uno por ronda (comportamiento por defecto). */
export function getInterpretationItems(module: PracticeModule, results: RoundResult[]): InterpretationItem[] {
  if (module.interpretationItems) return module.interpretationItems
  const items: InterpretationItem[] = []
  for (const round of module.rounds) {
    const res = results.find((r) => r.roundId === round.id)
    const options = module.interpretationOptions?.[round.id]
    if (!res || !options) continue
    items.push({
      id: round.id,
      roundId: round.id,
      prompt: '¿Cómo clasificas este resultado según la ficha académica?',
      options,
      correct: res.classification,
    })
  }
  return items
}

/** true si el estudiante ya interpretó todos los ítems (o no hay ninguno). */
export function isInterpreted(module: PracticeModule, attempt: Pick<Attempt, 'results' | 'interpretation'>): boolean {
  return getInterpretationItems(module, attempt.results).every((i) => attempt.interpretation[i.id])
}

/** Resumen corto de resultados para tablas. */
export function summarizeResult(r: RoundResult): string {
  if (r.value !== undefined) return `${r.value} ${r.unit ?? ''}`.trim()
  return `${r.observations?.length ?? 0} observaciones`
}
