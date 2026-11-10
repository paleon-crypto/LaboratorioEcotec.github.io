/**
 * Constantes comunes a las fichas de Farmacología Básica (Semestre V, Medicina).
 * FUENTE: «Guía práctica de farmacología básica» (7 prácticas).
 */
import type { PracticeMeta, Weights } from '../core/types'

export const FACULTY_SALUD = 'Facultad de Ciencias de la Salud y Desarrollo Humano'
export const KATZUNG = 'Katzung, B. G., & Trevor, A. J. (2021). Farmacología básica y clínica. McGraw-Hill.'
export const VELAZQUEZ = 'Velázquez, F. (2020). Farmacología Básica y Clínica. Editorial Médica Panamericana.'

export const farmaSource = (n: number, date: string) =>
  `Ficha de planificación de las prácticas de farmacología básica (Semestre V), práctica N°${n}. Docente: MD. Erik Gabriel Barberán Alcívar, MSc. Carrera: Medicina. Lugar: Laboratorio de farmacología. Período: Semestre 1 - 2025. Fecha: ${date}.`

export const RUBRIC_5432 = [
  'Rúbrica de la ficha: 5 = desempeño completo y fundamentado; 4 = adecuado con leves imprecisiones; 3 = parcial; 2 o menos = fallas de base o falta de participación.',
]

export const SIM_NOTE =
  'Los valores numéricos, curvas y datos del caso de esta simulación son ILUSTRATIVOS (la guía no los incluye) y no constituyen indicaciones clínicas.'

/** Campos comunes de PracticeMeta para las prácticas de farmacología. */
export function farmaMeta(
  n: number,
  date: string,
  rest: Omit<PracticeMeta, 'id' | 'number' | 'subjectId' | 'careerIds' | 'faculty' | 'durationMin' | 'source' | 'bibliography' | 'version'>,
): PracticeMeta {
  return {
    id: `farmacologia-p${n}`,
    number: n,
    subjectId: 'farmacologia',
    careerIds: ['medicina'],
    faculty: FACULTY_SALUD,
    durationMin: 90,
    source: farmaSource(n, date),
    bibliography: [KATZUNG, VELAZQUEZ],
    version: '1.0.0',
    ...rest,
  }
}

export const farmaWeights: Weights = { procedure: 35, results: 0, quizChoice: 15, quizTrueFalse: 10, quizOpen: 35, errorPenalty: 5 }
export const farmaWeightsWithItems: Weights = { procedure: 30, results: 15, quizChoice: 15, quizTrueFalse: 10, quizOpen: 25, errorPenalty: 5 }
