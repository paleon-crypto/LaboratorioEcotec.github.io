/**
 * Bioquímica – Práctica 2: Estado de hidratación según la gravedad específica de la orina.
 * FUENTE: ficha VAC-FOR-006 (Rev. 01), práctica N°2.
 *
 * LIMITACIÓN: la ficha indica interpretar «según los rangos clínicos normales» pero no los incluye.
 * Solo afirma que un valor bajo puede indicar sobrehidratación y uno alto, deshidratación. Por eso
 * no hay clasificación automática numérica. Los valores simulados son ILUSTRATIVOS.
 */
import { randomInt, seededRandom } from '../../core/engine'
import type { PracticeHooks, PracticeMeta, PracticeModule, ProcedureStep, QuizConfig, Round, Scenario, SimData } from '../../core/types'
import { FACULTY, OMS, sourceFor } from '../shared'
import Scene from './Scene'

const MEASURE_NOTE = 'Valores simulados ilustrativos (no clínicos).'

const meta: PracticeMeta = {
  id: 'bioquimica-p2',
  number: 2,
  title: 'Estado de hidratación según la gravedad específica de la orina',
  subjectId: 'bioquimica',
  careerIds: ['medicina'],
  faculty: FACULTY,
  objective: 'Determinar el estado de hidratación a través de la prueba de la gravedad específica de la orina.',
  learningOutcomes: [
    'Determina el estado de hidratación mediante el uso e interpretación de la gravedad específica de la orina.',
    'Manejo de equipos básicos de medición en laboratorio clínico.',
    'Interpretación de parámetros urinarios.',
  ],
  theory:
    'La gravedad específica de la orina mide la concentración de solutos presentes en esta. Un valor bajo puede indicar sobrehidratación, mientras que un valor alto sugiere deshidratación. Esta técnica es útil para evaluar el estado de hidratación y la función renal.',
  durationMin: 80,
  difficulty: 'Básica',
  materials: ['Muestra de orina (50 ml)', 'Agua destilada (50 ml)', 'Papel cocina (1 rollo)', 'Goteros o pipetas Pasteur', 'Mascarilla, gorro y guantes'],
  equipment: ['Refractómetro'],
  safetyNotes: ['Uso adecuado de muestras biológicas y lavado de manos.', 'Limpieza del refractómetro entre muestras.'],
  evaluationCriteria: [
    'Actitud: asistencia, puntualidad, presentación personal, liderazgo.',
    'Habilidad y desempeño: precisión en la medición y lectura del equipo.',
    'Capacidad técnica/conocimiento: interpretación adecuada de los resultados.',
    'Campo profesional: relación entre parámetros urinarios y el estado de salud.',
  ],
  bibliography: [OMS, 'Manual de laboratorio clínico. (2024). Función renal y exámenes de orina.'],
  source: sourceFor(2),
  validated: false,
  validationNotes: [
    'La ficha no incluye los rangos clínicos normales de gravedad específica: no hay clasificación numérica automática. El docente debe proporcionarlos y revisar la interpretación.',
    'Los valores de gravedad específica simulados son ilustrativos (no provienen de la ficha).',
    'La «justificación» de la ficha repite la de la práctica 1 (bioseguridad): no se utilizó.',
    'El paso 1 de la ficha (reunirse en grupos de trabajo) se realiza fuera del simulador.',
  ],
  version: '1.0.0',
}

const rounds: Round[] = [{ id: 'sg', label: 'Gravedad específica de la orina', description: 'Lectura con refractómetro.' }]

const steps: ProcedureStep[] = [
  { id: 'calibrate', title: 'Calibrar el refractómetro', instruction: 'Calibra el refractómetro con 1 gota de agua destilada sobre el visor.', hint: 'Arrastra el gotero de agua destilada al visor del refractómetro.', actions: ['water->prism'], success: 'Refractómetro calibrado con agua destilada.' },
  { id: 'clean', title: 'Limpiar el visor y el lente', instruction: 'Limpia el visor y el lente con papel de cocina.', hint: 'Arrastra el papel de cocina al visor.', actions: ['paper->prism'], success: 'Visor y lente limpios.' },
  { id: 'place', title: 'Colocar la muestra y bajar el lente', instruction: 'Coloca la muestra de orina en el visor y baja el lente con cuidado.', hint: 'Primero la orina (gotero) sobre el visor; después «Bajar el lente con cuidado».', actions: ['urine->prism', 'lower-lens'], success: 'Muestra colocada y lente bajado.' },
  { id: 'read', title: 'Posicionar frente a la luz y leer', instruction: 'Posiciona el refractómetro frente a una fuente de luz y realiza la lectura.', hint: 'Pulsa «Posicionar frente a la luz» y luego «Leer la escala».', actions: ['face-light', 'read-value'], success: 'Lectura realizada.' },
  { id: 'record', title: 'Anotar el resultado', instruction: 'Anota la gravedad específica leída (con tres decimales) y pulsa «Registrar».', hint: 'Copia exactamente el valor de la escala.', actions: ['record'], success: 'Resultado registrado.' },
]

/** Perfiles ILUSTRATIVOS (milésimas de gravedad específica): no provienen de la ficha. */
const profiles: Record<string, [number, number]> = { a: [1003, 1008], b: [1012, 1022], c: [1026, 1034] }
const scenarios: Scenario[] = [
  { id: 'a', label: 'Muestra A', description: 'Valor simulado bajo (ilustrativo).' },
  { id: 'b', label: 'Muestra B', description: 'Valor simulado intermedio (ilustrativo).' },
  { id: 'c', label: 'Muestra C', description: 'Valor simulado alto (ilustrativo).' },
  { id: 'random', label: 'Aleatoria', description: 'Se elige una muestra al azar.' },
]

const hooks: PracticeHooks = {
  initRoundData: (): SimData => ({ prism: 'clean', lensDown: false, facingLight: false, valueRead: false, measured: undefined }),
  beforeAction(action, payload, { state }) {
    const d = state.data
    if (action === 'lower-lens' && d.urinePlaced !== true) return 'Primero coloca la muestra de orina en el visor.'
    if (action === 'face-light' && d.lensDown !== true) return 'Baja primero el lente sobre la muestra.'
    if (action === 'read-value' && d.facingLight !== true) return 'Posiciona primero el refractómetro frente a la luz.'
    if (action === 'record') {
      if (typeof payload !== 'number' || !Number.isFinite(payload)) return 'Ingresa un valor numérico, por ejemplo 1.015.'
      if (Math.round(payload * 1000) !== d.measured) return 'El valor registrado no coincide con la lectura del refractómetro. Revísalo.'
    }
    return null
  },
  afterAction(action, payload, { state }) {
    switch (action) {
      case 'water->prism':
        return { calibrated: true, prism: 'water' }
      case 'paper->prism':
        return { cleaned: true, prism: 'clean' }
      case 'urine->prism': {
        const keys = Object.keys(profiles)
        const key = state.scenarioId === 'random' ? keys[Math.floor(seededRandom(state.seed)() * keys.length)] : state.scenarioId
        const [min, max] = profiles[key] ?? profiles.a
        return { urinePlaced: true, prism: 'urine', measured: randomInt(seededRandom(state.seed + 3), min, max) }
      }
      case 'lower-lens':
        return { lensDown: true }
      case 'face-light':
        return { facingLight: true }
      case 'read-value':
        return { valueRead: true }
      case 'record':
        return { recorded: payload as number }
      default:
        return {}
    }
  },
  buildRoundResult({ now, state, round }) {
    return {
      roundId: round.id,
      label: round.label,
      value: state.data.recorded as number,
      unit: '',
      classification: 'registrado',
      classificationLabel: 'Valor registrado',
      recordedAt: now,
    }
  },
  describeInvalid(action) {
    const [item, target] = action.split('->')
    return item && target ? 'Combinación no válida: ese elemento no corresponde en este momento.' : 'Esa acción no es válida en este paso. Revisa las instrucciones.'
  },
}

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: 'Según la ficha, ¿qué mide la gravedad específica de la orina?', options: [{ id: 'a', text: 'La concentración de solutos presentes en la orina' }, { id: 'b', text: 'El pH de la orina' }, { id: 'c', text: 'La cantidad de proteínas únicamente' }, { id: 'd', text: 'El color de la orina' }], correct: 'a', explanation: 'La gravedad específica mide la concentración de solutos presentes en la orina.' },
    { id: 'c2', type: 'choice', prompt: 'Un valor alto de gravedad específica sugiere, según la ficha:', options: [{ id: 'a', text: 'Sobrehidratación' }, { id: 'b', text: 'Deshidratación' }, { id: 'c', text: 'Ninguna condición' }, { id: 'd', text: 'Hipoglucemia' }], correct: 'b', explanation: 'Un valor alto sugiere deshidratación.' },
    { id: 'c3', type: 'choice', prompt: '¿Con qué se calibra el refractómetro en esta práctica?', options: [{ id: 'a', text: '1 gota de agua destilada' }, { id: 'b', text: 'Orina del grupo' }, { id: 'c', text: 'Alcohol' }, { id: 'd', text: 'No se calibra' }], correct: 'a', explanation: 'Se calibra con 1 gota de agua destilada.' },
    { id: 'c4', type: 'choice', prompt: '¿Con qué se limpian el visor y el lente?', options: [{ id: 'a', text: 'Papel de cocina' }, { id: 'b', text: 'Ácido' }, { id: 'c', text: 'Con la mano' }, { id: 'd', text: 'No se limpian' }], correct: 'a', explanation: 'Se limpian con papel de cocina.' },
    { id: 't1', type: 'tf', prompt: 'Un valor bajo de gravedad específica puede indicar sobrehidratación.', correct: true, explanation: 'Así lo indica la fundamentación teórica.' },
    { id: 't2', type: 'tf', prompt: 'No es necesario limpiar el refractómetro entre muestras.', correct: false, explanation: 'La ficha indica la limpieza del refractómetro entre muestras.' },
    { id: 't3', type: 'tf', prompt: 'La lectura se realiza con el refractómetro frente a una fuente de luz.', correct: true, explanation: 'Está en el procedimiento de la ficha.' },
    { id: 'o1', type: 'open', prompt: 'Interpreta el valor de gravedad específica que obtuviste y relaciónalo con el estado de hidratación. Indica con qué rangos clínicos lo comparaste.', expectedPoints: ['Relaciona un valor bajo con sobrehidratación y uno alto con deshidratación.', 'Compara el valor con los rangos clínicos normales indicados por el docente.', 'Menciona que el valor es simulado y educativo.'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

const practice: PracticeModule = {
  meta,
  rounds,
  steps,
  scenarios,
  materialsMode: 'info',
  materialsPanel: [
    { id: 'refractometer', label: 'Refractómetro', description: 'Mide la gravedad específica de la orina.', kind: 'equipment' },
    { id: 'urine', label: 'Muestra de orina', description: '50 ml (simulada).', kind: 'material' },
    { id: 'water', label: 'Agua destilada', description: 'Para calibrar el equipo.', kind: 'material' },
    { id: 'paper', label: 'Papel de cocina', description: 'Para limpiar el visor y el lente.', kind: 'material' },
    { id: 'dropper', label: 'Goteros o pipetas Pasteur', description: 'Para aplicar las gotas.', kind: 'material' },
  ],
  hooks,
  quiz,
  defaultWeights: { procedure: 40, results: 0, quizChoice: 25, quizTrueFalse: 15, quizOpen: 20, errorPenalty: 10 },
  interpretationItems: [],
  referenceTable: [
    {
      title: 'Interpretación (ficha)',
      rows: [
        { label: 'Valor bajo', value: 'Puede indicar sobrehidratación' },
        { label: 'Valor alto', value: 'Sugiere deshidratación' },
        { label: 'Rangos normales', value: 'No especificados en la ficha: los indica el docente' },
      ],
    },
  ],
  disclaimer: `Simulación educativa. ${MEASURE_NOTE} No constituye una herramienta de diagnóstico clínico.`,
  buildConclusion: (results) => {
    const v = results[0]?.value
    return `La gravedad específica simulada fue ${v !== undefined ? v.toFixed(3) : '—'}. Según la ficha, un valor bajo puede indicar sobrehidratación y uno alto, deshidratación; la ficha no especifica los rangos numéricos. ${MEASURE_NOTE}`
  },
  Scene,
  intro: {
    scenarioTitle: 'Muestra de orina simulada',
    scenarioHelp: 'Elige el perfil de valores ilustrativos que generará la simulación (no son datos clínicos).',
    roundsNote: 'Se realizará una medición de gravedad específica.',
  },
}

export default practice
