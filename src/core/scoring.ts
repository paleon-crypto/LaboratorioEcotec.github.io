/**
 * Cálculo de calificaciones con ponderación configurable.
 *
 * Componentes: procedimiento, resultados (interpretación), preguntas de
 * selección múltiple, verdadero/falso y preguntas abiertas.
 * - Los componentes sin preguntas se excluyen y los pesos se renormalizan.
 * - Las preguntas abiertas requieren calificación docente; mientras estén
 *   pendientes la nota es PROVISIONAL (se calcula sin ese componente).
 */
import { getInterpretationItems } from './practice'
import type { Attempt, PracticeModule, Weights } from './types'

export interface ScoreBreakdownItem {
  key: keyof Omit<Weights, 'errorPenalty'>
  label: string
  /** 0-100 o null si aún no se puede calcular. */
  score: number | null
  weight: number
}

export interface Grade {
  /** Nota 0-100 (null si no hay ningún componente calculable). */
  total: number | null
  provisional: boolean
  breakdown: ScoreBreakdownItem[]
}

export const WEIGHT_LABELS: Record<keyof Omit<Weights, 'errorPenalty'>, string> = {
  procedure: 'Procedimiento',
  results: 'Resultados e interpretación',
  quizChoice: 'Selección múltiple',
  quizTrueFalse: 'Verdadero / falso',
  quizOpen: 'Preguntas abiertas',
}

export function sanitizeWeights(w: Weights): Weights {
  const clamp = (n: number) => (Number.isFinite(n) ? Math.min(100, Math.max(0, Math.round(n))) : 0)
  return {
    procedure: clamp(w.procedure),
    results: clamp(w.results),
    quizChoice: clamp(w.quizChoice),
    quizTrueFalse: clamp(w.quizTrueFalse),
    quizOpen: clamp(w.quizOpen),
    errorPenalty: clamp(w.errorPenalty),
  }
}

export function procedureScore(errors: number, weights: Weights): number {
  return Math.max(0, 100 - errors * weights.errorPenalty)
}

export function resultsScore(attempt: Attempt, module: PracticeModule): number | null {
  if (attempt.results.length < module.rounds.length) return null
  const items = getInterpretationItems(module, attempt.results)
  if (items.length === 0) return null
  // Solo es calculable cuando el estudiante interpretó todos los ítems.
  if (!items.every((i) => attempt.interpretation[i.id])) return null
  const correct = items.filter((i) => attempt.interpretation[i.id] === i.correct).length
  return Math.round((correct / items.length) * 100)
}

function ratio(correct: number, total: number): number | null {
  return total === 0 ? null : Math.round((correct / total) * 100)
}

export function quizScores(attempt: Attempt, module: PracticeModule) {
  const qs = module.quiz.questions
  const choice = qs.filter((q) => q.type === 'choice')
  const tf = qs.filter((q) => q.type === 'tf')
  const open = qs.filter((q) => q.type === 'open')
  const submitted = attempt.quizSubmitted
  const correctOf = (list: typeof qs) =>
    list.filter((q) => (q.type === 'choice' || q.type === 'tf') && attempt.quizAnswers[q.id] === q.correct).length
  return {
    choice: submitted ? ratio(correctOf(choice), choice.length) : null,
    tf: submitted ? ratio(correctOf(tf), tf.length) : null,
    open: submitted && open.length > 0 ? attempt.openGrade : null,
    hasChoice: choice.length > 0,
    hasTf: tf.length > 0,
    hasOpen: open.length > 0,
  }
}

export function computeGrade(attempt: Attempt, module: PracticeModule, weights: Weights = attempt.weightsUsed): Grade {
  const q = quizScores(attempt, module)
  const hasItems = getInterpretationItems(module, attempt.results).length > 0
  const finished = attempt.status === 'completed'
  const breakdown: ScoreBreakdownItem[] = [
    {
      key: 'procedure',
      label: WEIGHT_LABELS.procedure,
      score: finished ? procedureScore(attempt.errors, weights) : null,
      weight: weights.procedure,
    },
    { key: 'results', label: WEIGHT_LABELS.results, score: resultsScore(attempt, module), weight: hasItems ? weights.results : 0 },
    { key: 'quizChoice', label: WEIGHT_LABELS.quizChoice, score: q.choice, weight: q.hasChoice ? weights.quizChoice : 0 },
    { key: 'quizTrueFalse', label: WEIGHT_LABELS.quizTrueFalse, score: q.tf, weight: q.hasTf ? weights.quizTrueFalse : 0 },
    { key: 'quizOpen', label: WEIGHT_LABELS.quizOpen, score: q.open, weight: q.hasOpen ? weights.quizOpen : 0 },
  ]

  const usable = breakdown.filter((b) => b.weight > 0 && b.score !== null)
  const weightSum = usable.reduce((n, b) => n + b.weight, 0)
  const total = weightSum === 0 ? null : Math.round(usable.reduce((n, b) => n + (b.score as number) * b.weight, 0) / weightSum)

  // Provisional si falta algún componente con peso > 0 (incluida la revisión docente).
  const provisional = breakdown.some((b) => b.weight > 0 && b.score === null)
  return { total, provisional, breakdown }
}
