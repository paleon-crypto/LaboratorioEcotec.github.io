/**
 * Configuración y lógica experimental de:
 *   Bioquímica – Práctica 7
 *   "Marcadores bioquímicos relacionados al metabolismo de los hidratos de carbono"
 *
 * FUENTE: Ficha de planificación de prácticas VAC-FOR-006 (Rev. 01), práctica N°7.
 *  - Datos generales, objetivo, resultados de aprendizaje, materiales, equipos,
 *    procedimiento, valores de referencia, rúbrica y bibliografía: de la ficha.
 *  - Los perfiles de "sujeto simulado" generan valores ILUSTRATIVOS (no clínicos
 *    ni de la ficha) para poder ejecutar la simulación.
 *  - El banco de preguntas fue redactado a partir de la ficha y debe revisarlo el docente.
 */
import { randomInt, seededRandom } from '../../core/engine'
import type {
  MaterialItem,
  PracticeHooks,
  PracticeMeta,
  ProcedureStep,
  Round,
  RoundResult,
  Scenario,
  SimData,
  Weights,
} from '../../core/types'
import { classify, UNIT } from './reference'

export const meta: PracticeMeta = {
  id: 'bioquimica-p7',
  number: 7,
  title: 'Marcadores bioquímicos relacionados al metabolismo de los hidratos de carbono',
  subjectId: 'bioquimica',
  careerIds: ['medicina'],
  faculty: 'Facultad de Ciencias de la Vida y Desarrollo Humano',
  objective: 'Reconocer los marcadores bioquímicos relacionados al metabolismo de los hidratos de carbono.',
  learningOutcomes: [
    'Reconoce e interpreta parámetros bioquímicos asociados a la glucemia en ayuno y postprandial.',
    'Aplica técnicas de medición de glucosa capilar con glucómetro.',
    'Interpreta resultados bioquímicos según los valores de referencia de la ficha.',
  ],
  theory:
    'La glucosa es un marcador bioquímico clave del metabolismo de los hidratos de carbono. Su medición permite evaluar condiciones como la diabetes, prediabetes y normoglucemia. El monitoreo capilar con glucómetro es una herramienta básica en el control metabólico.',
  durationMin: 80,
  difficulty: 'Básica',
  materials: ['Muestra sanguínea capilar (simulada)', 'Alcohol al 70 %', 'Algodón', 'Tirillas para glucómetro', 'Lancetas'],
  equipment: ['Glucómetro', 'Recipiente para desechos cortopunzantes'],
  safetyNotes: [
    'Lavado de manos, uso de guantes y materiales desechables.',
    'Desecho adecuado de lancetas en contenedor bioseguro.',
  ],
  evaluationCriteria: [
    'Actitud: asistencia, puntualidad, presentación personal, liderazgo.',
    'Habilidad y desempeño: planificación, ejecución, iniciativa, precaución.',
    'Capacidad técnica/conocimiento: aplicación práctica y teórica, seguimiento de instrucciones.',
    'Campo profesional: empleo de normas de bioseguridad y técnicas adecuadas.',
  ],
  bibliography: [
    'Asociación Americana de Diabetes (ADA). Valores de referencia y guías clínicas.',
    'Champe, P. C., Harvey, R. A., & Ferrier, D. R. (2014). Bioquímica ilustrada de Lippincott.',
    'Organización Mundial de la Salud (OMS). Manual de Bioseguridad en el laboratorio.',
  ],
  source:
    'Ficha de planificación de prácticas de laboratorio y de campo VAC-FOR-006 (Rev. 01), Bioquímica, práctica N°7. Docente: María Gracia Yturralde, MSc. Carrera: Medicina. Lugar: Laboratorio de nutrición. Período: Ordinario I - 2025.',
  validated: true,
  validationNotes: [
    'Banco de preguntas redactado a partir de la ficha: pendiente de revisión por el docente.',
    'La ficha no define un destino para la tira y el algodón usados: en la simulación se desechan en el recipiente de cortopunzantes (único recipiente de la ficha). Confirmar.',
    'El paso 1 de la ficha (reunirse en grupos de trabajo) se realiza fuera del simulador.',
  ],
  version: '1.0.0',
}

export const rounds: Round[] = [
  {
    id: 'ayunas',
    label: 'Glucemia en ayunas',
    description: 'Medición de glucemia capilar en ayunas del sujeto simulado.',
  },
  {
    id: 'posprandial',
    label: 'Glucemia posprandial',
    description: 'Medición de glucemia capilar posprandial del sujeto simulado.',
  },
]

export const materialsPanel: MaterialItem[] = [
  { id: 'glucometer', label: 'Glucómetro', description: 'Equipo que mide la glucosa en la gota de sangre capilar.', kind: 'equipment' },
  { id: 'strips', label: 'Tirillas para glucómetro', description: 'Se insertan en el glucómetro y reciben la sangre.', kind: 'material' },
  { id: 'lancet', label: 'Lanceta', description: 'Permite la punción capilar. Es de un solo uso.', kind: 'material' },
  { id: 'cotton', label: 'Algodón', description: 'Se humedece con alcohol para limpiar el dedo y sirve para detener el sangrado.', kind: 'material' },
  { id: 'alcohol', label: 'Alcohol al 70 %', description: 'Antiséptico para limpiar el dedo.', kind: 'material' },
  { id: 'sharps', label: 'Recipiente cortopunzantes', description: 'Recipiente bioseguro para desechar la lanceta y los materiales usados.', kind: 'equipment' },
]

const PICKS = materialsPanel.map((m) => `pick:${m.id}`)

/**
 * Procedimiento de la ficha (VAC-FOR-006, práctica 7):
 *  1 Reunirse en los grupos de trabajo (fuera del simulador).
 *  2 Lavado de manos con agua y jabón. Secado completo.
 *  3 Insertar tira reactiva en glucómetro. Preparar lanceta y limpiar el dedo con alcohol.
 *  4 Realizar la punción. Aplicar sangre en la tira reactiva. Esperar el resultado.
 *  5 Detener sangrado y desechar materiales usados. Registrar el valor con fecha y hora.
 * El primer paso del simulador (preparar materiales) solo coloca los insumos de la ficha en la mesa.
 */
export const steps: ProcedureStep[] = [
  {
    id: 'prepare',
    title: 'Preparar los materiales',
    instruction: 'Lleva a la mesa de trabajo los insumos y equipos de la ficha: selecciónalos en el panel «Materiales y equipos».',
    hint: 'Pulsa «Usar» en cada elemento del panel izquierdo hasta tener los seis en la mesa.',
    actions: PICKS,
    success: 'Materiales y equipos listos en la mesa de trabajo.',
  },
  {
    id: 'wash',
    title: 'Lavado de manos',
    instruction: 'Lávate las manos con agua y jabón y sécalas completamente (usa los botones del lavabo).',
    hint: 'Primero «Lavar con agua y jabón» y después «Secar completamente».',
    actions: ['wash-soap', 'dry-hands'],
    success: 'Manos lavadas y secas.',
  },
  {
    id: 'setup',
    title: 'Tira, lanceta y limpieza del dedo',
    instruction:
      'Inserta la tira reactiva en el glucómetro, prepara la lanceta y limpia el dedo con alcohol (humedece antes el algodón con alcohol).',
    hint: 'Arrastra la tira al glucómetro; pulsa «Preparar lanceta»; arrastra el alcohol al algodón y luego el algodón al dedo.',
    actions: ['strips->glucometer', 'prepare-lancet', 'alcohol->cotton', 'cotton->finger'],
    success: 'Glucómetro listo, lanceta preparada y dedo limpio.',
  },
  {
    id: 'puncture',
    title: 'Punción, muestra y resultado',
    instruction: 'Realiza la punción con la lanceta, aplica la sangre en la tira reactiva y espera el resultado en el glucómetro.',
    hint: 'Arrastra la lanceta al dedo; luego la gota de sangre a la tira del glucómetro; espera unos segundos y pulsa «Leer resultado».',
    actions: ['lancet->finger', 'drop->strip', 'read-value'],
    success: 'Resultado mostrado por el glucómetro.',
  },
  {
    id: 'dispose',
    title: 'Detener sangrado y desechar materiales',
    instruction:
      'Detén el sangrado con el algodón y desecha los materiales usados (lanceta, tira y algodón) en el recipiente de cortopunzantes.',
    hint: 'Arrastra el algodón al dedo; después la lanceta, la tira usada y el algodón al recipiente de cortopunzantes.',
    actions: ['stop-bleeding', 'lancet->sharps', 'usedstrip->sharps', 'cotton->sharps'],
    success: 'Sangrado detenido y materiales usados desechados.',
  },
  {
    id: 'record',
    title: 'Registrar el valor con fecha y hora',
    instruction: 'Escribe el valor (mg/dL) que mostró el glucómetro y pulsa «Registrar»: el sistema anota la fecha y la hora.',
    hint: 'Copia exactamente el número de la pantalla del glucómetro.',
    actions: ['record'],
    success: 'Resultado registrado con fecha y hora.',
  },
]

/**
 * Perfiles ILUSTRATIVOS de sujeto simulado (no provienen de la ficha).
 * Cada uno define un rango de valores simulados para cada medición.
 */
export interface ScenarioProfile {
  fasting: [number, number]
  postprandial: [number, number]
}

export const scenarioProfiles: Record<string, ScenarioProfile> = {
  a: { fasting: [78, 96], postprandial: [105, 135] },
  b: { fasting: [102, 122], postprandial: [145, 190] },
  c: { fasting: [128, 158], postprandial: [205, 260] },
}

export const scenarios: Scenario[] = [
  { id: 'a', label: 'Sujeto simulado A', description: 'Valores simulados en rangos bajos.' },
  { id: 'b', label: 'Sujeto simulado B', description: 'Valores simulados en rangos intermedios.' },
  { id: 'c', label: 'Sujeto simulado C', description: 'Valores simulados en rangos altos.' },
  { id: 'random', label: 'Aleatorio', description: 'Se elige un perfil al azar al iniciar.' },
]

export const defaultWeights: Weights = {
  procedure: 30,
  results: 20,
  quizChoice: 20,
  quizTrueFalse: 15,
  quizOpen: 15,
  errorPenalty: 10,
}

const ITEM_LABEL: Record<string, string> = {
  strips: 'la tira reactiva',
  usedstrip: 'la tira usada',
  lancet: 'la lanceta',
  cotton: 'el algodón',
  alcohol: 'el alcohol',
  drop: 'la gota de sangre',
}
const TARGET_LABEL: Record<string, string> = {
  glucometer: 'el glucómetro',
  cotton: 'el algodón',
  finger: 'el dedo',
  strip: 'la tira',
  sharps: 'el recipiente de cortopunzantes',
}

function profileFor(scenarioId: string, seed: number): ScenarioProfile {
  if (scenarioId !== 'random') return scenarioProfiles[scenarioId] ?? scenarioProfiles.a
  const keys = Object.keys(scenarioProfiles)
  return scenarioProfiles[keys[Math.floor(seededRandom(seed)() * keys.length)]]
}

export const MEASURE_MS = 2500

export const hooks: PracticeHooks = {
  initRoundData: (): SimData => ({
    picked: [],
    washed: false,
    dried: false,
    lancetPrepared: false,
    bleedingStopped: false,
    stripInserted: false,
    cottonWet: false,
    disinfected: false,
    punctured: false,
    dropOnStrip: false,
    measureStartedAt: undefined,
    measured: undefined,
    valueRead: false,
    lancetDisposed: false,
    stripDisposed: false,
    cottonDisposed: false,
    recorded: undefined,
  }),

  beforeAction(action, payload, { now, state }) {
    const d = state.data
    if (action === 'dry-hands' && d.washed !== true) return 'Primero lava las manos con agua y jabón.'
    if (action === 'cotton->finger' && d.cottonWet !== true) return 'Humedece primero el algodón con alcohol para limpiar el dedo.'
    if (action === 'lancet->finger') {
      if (d.lancetPrepared !== true) return 'Prepara primero la lanceta.'
      if (d.disinfected !== true) return 'Limpia primero el dedo con alcohol antes de la punción.'
    }
    if (action === 'drop->strip' && d.punctured !== true) return 'Aún no hay gota de sangre: realiza primero la punción.'
    if (action === 'stop-bleeding' && d.punctured !== true) return 'No hay sangrado que detener todavía.'
    if (action === 'cotton->sharps' && d.bleedingStopped !== true) return 'Usa primero el algodón para detener el sangrado.'
    if (action === 'usedstrip->sharps' && d.valueRead !== true) return 'La tira aún está en uso: espera y lee el resultado.'
    if (action === 'read-value') {
      const startedAt = state.data.measureStartedAt
      if (typeof startedAt !== 'number') return 'Aún no hay una muestra en la tira.'
      if (now - startedAt < MEASURE_MS) return 'El glucómetro aún está procesando la muestra. Espera el resultado.'
    }
    if (action === 'record') {
      if (typeof payload !== 'number' || !Number.isInteger(payload) || payload < 0) {
        return 'Ingresa un valor numérico entero en mg/dL.'
      }
      if (payload !== state.data.measured) {
        return 'El valor registrado no coincide con la lectura del glucómetro. Revísalo.'
      }
    }
    return null
  },

  afterAction(action, payload, { now, state, round }) {
    if (action.startsWith('pick:')) {
      const picked = (state.data.picked as string[]) ?? []
      return { picked: [...picked, action.slice(5)] }
    }
    switch (action) {
      case 'wash-soap':
        return { washed: true }
      case 'dry-hands':
        return { dried: true }
      case 'prepare-lancet':
        return { lancetPrepared: true }
      case 'stop-bleeding':
        return { bleedingStopped: true }
      case 'usedstrip->sharps':
        return { stripDisposed: true }
      case 'cotton->sharps':
        return { cottonDisposed: true }
      case 'strips->glucometer':
        return { stripInserted: true }
      case 'alcohol->cotton':
        return { cottonWet: true }
      case 'cotton->finger':
        return { disinfected: true }
      case 'lancet->finger':
        return { punctured: true }
      case 'drop->strip': {
        const profile = profileFor(state.scenarioId, state.seed)
        const [min, max] = round.id === 'ayunas' ? profile.fasting : profile.postprandial
        // Semilla distinta por ronda para que los valores sean reproducibles.
        const rand = seededRandom(state.seed + (round.id === 'ayunas' ? 1 : 2))
        return { dropOnStrip: true, measureStartedAt: now, measured: randomInt(rand, min, max) }
      }
      case 'read-value':
        return { valueRead: true }
      case 'lancet->sharps':
        return { lancetDisposed: true }
      case 'record':
        return { recorded: payload as number }
      default:
        return {}
    }
  },

  buildRoundResult({ now, state, round }) {
    const value = state.data.recorded as number
    const c = classify(round.id, value)
    return {
      roundId: round.id,
      label: round.label,
      value,
      unit: UNIT,
      classification: c.classification,
      classificationLabel: c.label,
      note: c.note,
      recordedAt: now,
    }
  },

  describeInvalid(action) {
    const [item, target] = action.split('->')
    if (item && target) {
      return `Combinación no válida: no corresponde usar ${ITEM_LABEL[item] ?? item} con ${TARGET_LABEL[target] ?? target} en este momento.`
    }
    return 'Esa acción no es válida en este paso. Revisa las instrucciones.'
  },
}

export const interpretationOptions: Record<string, { id: string; label: string }[]> = {
  ayunas: [
    { id: 'normal', label: 'Normal' },
    { id: 'prediabetes', label: 'Prediabetes' },
    { id: 'umbral_diabetes', label: 'Umbral de diabetes' },
  ],
  posprandial: [
    { id: 'normal', label: 'Normal' },
    { id: 'no_especificado', label: 'Clasificación no especificada en la ficha' },
    { id: 'umbral_diabetes', label: 'Umbral de diabetes' },
  ],
}

/** Líneas de referencia del gráfico: únicamente los umbrales de la ficha. */
export const chartThresholds: Record<string, { value: number; label: string }[]> = {
  ayunas: [
    { value: 100, label: '100' },
    { value: 126, label: '126' },
  ],
  posprandial: [
    { value: 140, label: '140' },
    { value: 200, label: '200' },
  ],
}

export const referenceTable = [
  {
    title: 'Glucemia en ayunas',
    rows: [
      { label: 'Menor de 100 mg/dL', value: 'Normal' },
      { label: '100 a 125 mg/dL', value: 'Prediabetes' },
      { label: 'Igual o superior a 126 mg/dL', value: 'Umbral de diabetes' },
    ],
  },
  {
    title: 'Glucemia posprandial',
    rows: [
      { label: 'Menor de 140 mg/dL', value: 'Normal' },
      { label: '140 a 199 mg/dL', value: 'La ficha académica no especifica su clasificación' },
      { label: 'Igual o superior a 200 mg/dL', value: 'Umbral de diabetes' },
    ],
  },
]

export const disclaimer =
  'Simulador educativo. No constituye una herramienta de diagnóstico clínico. Los valores obtenidos son simulados.'

export function buildConclusion(results: RoundResult[]): string {
  const fasting = results.find((r) => r.roundId === 'ayunas')
  const post = results.find((r) => r.roundId === 'posprandial')
  const parts: string[] = []
  if (fasting) parts.push(`La glucemia en ayunas simulada fue de ${fasting.value} mg/dL: ${fasting.classificationLabel}.`)
  if (post) {
    parts.push(`La glucemia posprandial simulada fue de ${post.value} mg/dL: ${post.classificationLabel}.`)
    if (post.note) parts.push(post.note)
  }
  parts.push('Los resultados son simulados y con fines educativos; no constituyen un diagnóstico clínico.')
  return parts.join(' ')
}
