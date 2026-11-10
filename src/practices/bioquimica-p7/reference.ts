/**
 * Valores de referencia de la FICHA ACADÉMICA (Bioquímica – Práctica 7).
 * Son los ÚNICOS umbrales que usa la práctica. No añadir otros sin respaldo
 * de la ficha oficial de ECOTEC.
 *
 * Glucemia en ayunas:
 *   < 100 mg/dL        -> normal
 *   100 a 125 mg/dL    -> prediabetes
 *   >= 126 mg/dL       -> umbral de diabetes
 *
 * Glucemia posprandial:
 *   < 140 mg/dL        -> normal
 *   >= 200 mg/dL       -> umbral de diabetes
 *   140 a 199 mg/dL    -> la ficha NO especifica su clasificación
 */

export type FastingClass = 'normal' | 'prediabetes' | 'umbral_diabetes'
export type PostprandialClass = 'normal' | 'no_especificado' | 'umbral_diabetes'

export const UNIT = 'mg/dL'

export function classifyFasting(value: number): FastingClass {
  if (value < 100) return 'normal'
  if (value <= 125) return 'prediabetes'
  return 'umbral_diabetes' // >= 126
}

export function classifyPostprandial(value: number): PostprandialClass {
  if (value < 140) return 'normal'
  if (value >= 200) return 'umbral_diabetes'
  return 'no_especificado' // 140 a 199
}

export const FASTING_LABELS: Record<FastingClass, string> = {
  normal: 'Normal (menor de 100 mg/dL)',
  prediabetes: 'Prediabetes (100 a 125 mg/dL)',
  umbral_diabetes: 'Umbral de diabetes (igual o superior a 126 mg/dL)',
}

export const POSTPRANDIAL_LABELS: Record<PostprandialClass, string> = {
  normal: 'Normal (menor de 140 mg/dL)',
  no_especificado: 'Clasificación no especificada en la ficha académica (140 a 199 mg/dL)',
  umbral_diabetes: 'Umbral de diabetes (igual o superior a 200 mg/dL)',
}

export const POSTPRANDIAL_UNSPECIFIED_NOTE =
  'La ficha académica no especifica la clasificación para valores entre 140 y 199 mg/dL.'

export function classify(roundId: string, value: number): { classification: string; label: string; note?: string } {
  if (roundId === 'ayunas') {
    const c = classifyFasting(value)
    return { classification: c, label: FASTING_LABELS[c] }
  }
  const c = classifyPostprandial(value)
  return {
    classification: c,
    label: POSTPRANDIAL_LABELS[c],
    note: c === 'no_especificado' ? POSTPRANDIAL_UNSPECIFIED_NOTE : undefined,
  }
}
