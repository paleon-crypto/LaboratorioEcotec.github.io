/**
 * Constantes comunes a las fichas VAC-FOR-006 de Bioquímica.
 */
import type { Weights } from '../core/types'

export const FACULTY = 'Facultad de Ciencias de la Vida y Desarrollo Humano'

export const sourceFor = (n: number) =>
  `Ficha de planificación de prácticas de laboratorio y de campo VAC-FOR-006 (Rev. 01), Bioquímica, práctica N°${n}. Docente: María Gracia Yturralde, MSc. Carrera: Medicina. Lugar: Laboratorio de nutrición. Período: Ordinario I - 2025.`

/** Rúbrica común de la ficha. */
export const RUBRIC = [
  'Actitud: asistencia, puntualidad, presentación personal, liderazgo.',
  'Habilidad y desempeño: planificación, ejecución, iniciativa, precaución.',
  'Capacidad técnica/conocimiento: aplicación práctica y teórica, seguimiento de instrucciones.',
  'Campo profesional: empleo de normas de bioseguridad y técnicas adecuadas.',
]

export const CHAMPE = 'Champe, P. C., Harvey, R. A., & Ferrier, D. R. (2014). Bioquímica ilustrada de Lippincott.'
export const OMS = 'Organización Mundial de la Salud (OMS). Manual de Bioseguridad en el laboratorio.'

/** Ponderación inicial para prácticas cualitativas (configurable por el docente). */
export const defaultTubeWeights: Weights = {
  procedure: 30,
  results: 25,
  quizChoice: 15,
  quizTrueFalse: 15,
  quizOpen: 15,
  errorPenalty: 5,
}
