/**
 * Constantes comunes a las fichas de Biología Celular y Molecular (Enfermería).
 * FUENTE: «Ficha práctica – Biología Celular y Molecular» (VAC-FOR-006, 12 prácticas, docente Mgs. Héctor Gavilanes Pinela).
 */
import type { PracticeMeta, Weights } from '../core/types'

export const FACULTY_VIDA = 'Facultad de Ciencias de la Vida y Desarrollo Humano'

export const biologiaSource = (n: number, fichaNumber: number | string, date: string) =>
  `Ficha de planificación de prácticas de laboratorio y de campo VAC-FOR-006 (Rev. 01), Biología Celular y Molecular, práctica N°${fichaNumber}${n !== Number(fichaNumber) ? ` en la ficha (se numera ${n} por su orden)` : ''}. Docente: Mgs. Héctor Gavilanes Pinela. Carrera: Enfermería. Lugar: Laboratorio de Biología Celular y Molecular. Período: Ordinario 1 - 2025. Fecha: ${date}.`

/** Campos comunes de PracticeMeta para las prácticas de Biología Celular y Molecular. */
export function biologiaMeta(
  n: number,
  fichaNumber: number | string,
  date: string,
  rest: Omit<PracticeMeta, 'id' | 'number' | 'subjectId' | 'careerIds' | 'faculty' | 'durationMin' | 'source' | 'version'>,
): PracticeMeta {
  return {
    id: `biologia-p${n}`,
    number: n,
    subjectId: 'biologia-celular',
    careerIds: ['enfermeria'],
    faculty: FACULTY_VIDA,
    durationMin: 90,
    source: biologiaSource(n, fichaNumber, date),
    version: '1.0.0',
    ...rest,
  }
}

export const SIM_NOTE_BIO =
  'Las imágenes microscópicas, valores y datos de esta simulación son ESQUEMÁTICOS/ILUSTRATIVOS (la ficha no los incluye) y no sustituyen la observación real.'

export const biologiaWeights: Weights = { procedure: 45, results: 15, quizChoice: 15, quizTrueFalse: 5, quizOpen: 15, errorPenalty: 5 }
export const biologiaWeightsNoResults: Weights = { procedure: 50, results: 0, quizChoice: 15, quizTrueFalse: 10, quizOpen: 20, errorPenalty: 5 }
