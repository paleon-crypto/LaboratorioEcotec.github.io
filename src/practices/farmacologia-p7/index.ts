/**
 * Farmacología Básica – Práctica 7: Integración de farmacodinamia y farmacocinética.
 * La guía no trae el caso clínico ni los datos del paciente: el caso es ILUSTRATIVO. Los factores de goteo
 * (macrogotero 20 gotas/mL, microgotero 60 gotas/mL) son los habituales y no figuran en la guía.
 */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import type { PatientSpec, Vital } from '../../core/patientPanel'
import { farmaMeta, SIM_NOTE } from '../farma'
import DripStage from './DripStage'

const meta = farmaMeta(7, '18-06-2025', {
  title: 'Integración farmacodinamia y farmacocinética',
  objective: 'Desarrollar un plan farmacológico completo para un paciente clínico simulado, integrando conceptos de farmacología básica, cálculo de velocidad de goteo y balance hídrico.',
  learningOutcomes: ['Resuelve un caso clínico simulando decisiones terapéuticas con base farmacológica.', 'Calcula la velocidad de infusión adecuada y evalúa el balance hídrico del paciente.', 'Justifica el uso de fármacos y vías de administración en función del estado clínico.'],
  theory: 'La administración intravenosa de medicamentos y soluciones requiere integrar conocimientos de farmacocinética, farmacodinamia, dosis, velocidad de goteo y evaluación del estado hídrico. Esta práctica desarrolla competencias clave para el abordaje clínico seguro y racional del paciente hospitalizado, promoviendo una comprensión funcional y aplicada de la farmacología.',
  difficulty: 'Avanzada',
  materials: ['Guantes de látex descartables', 'Mascarilla quirúrgica', 'Hoja de rúbrica', 'Catéter periférico (18–22G)', 'Gasas estériles', 'Equipo de venoclisis', 'Mandil y gorro', 'Hoja de simulación de signos vitales'],
  equipment: ['Computadora', 'Proyector', 'Pizarra', 'Simulador de alta fidelidad', 'Brazo para canalizar vía (simulador)'],
  safetyNotes: ['Aprendizaje basado en simulación y ética médica.', 'Uso responsable del simulador bajo supervisión docente.'],
  evaluationCriteria: ['Cálculo correcto de velocidad de infusión.', 'Precisión en balance hídrico.', 'Aplicación farmacológica integral.', 'Justificación terapéutica oral.'],
  validated: false,
  validationNotes: [
    'La guía no incluye el caso clínico, fármacos ni datos del paciente: el caso de los ejercicios (1000 mL en 8 horas; ingresos y egresos de 24 h) es ilustrativo.',
    'La guía no indica los factores de goteo: se usan los habituales (macrogotero 20 gotas/mL, microgotero 60 gotas/mL). Confirmar con el equipo de venoclisis del laboratorio.',
    'La elección de fármacos y vías y la presentación oral se evalúan con la pregunta abierta, que califica el docente.',
  ],
})

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: 'Para calcular la velocidad de goteo, ¿qué datos se necesitan?', options: [{ id: 'a', text: 'Volumen, tiempo y factor de goteo' }, { id: 'b', text: 'Solo el peso' }, { id: 'c', text: 'Solo la edad' }, { id: 'd', text: 'Ninguno' }], correct: 'a', explanation: 'Gotas/min = volumen (mL) × factor de goteo / tiempo (min).' },
    { id: 'c2', type: 'choice', prompt: 'Según la ficha, ¿qué se integra en la administración intravenosa de medicamentos?', options: [{ id: 'a', text: 'Farmacocinética, farmacodinamia, dosis, velocidad de goteo y estado hídrico' }, { id: 'b', text: 'Solo el color del suero' }, { id: 'c', text: 'Solo el costo' }, { id: 'd', text: 'Nada' }], correct: 'a', explanation: 'Está en la fundamentación teórica.' },
    { id: 'c3', type: 'choice', prompt: '¿Cuántas horas abarca el balance hídrico estimado en la práctica?', options: [{ id: 'a', text: '6 horas' }, { id: 'b', text: '12 horas' }, { id: 'c', text: '24 horas' }, { id: 'd', text: '72 horas' }], correct: 'c', explanation: 'Paso 4: balance hídrico estimado para 24 horas.' },
    { id: 't1', type: 'tf', prompt: 'La práctica considera el cálculo de goteo en macrogotas y microgotas.', correct: true, explanation: 'Paso 3 del procedimiento.' },
    { id: 't2', type: 'tf', prompt: 'El balance hídrico es la diferencia entre ingresos y egresos de líquidos.', correct: true, explanation: 'Definición estándar del balance hídrico.' },
    { id: 'o1', type: 'open', prompt: 'Presenta un plan farmacológico para un paciente con patología aguda que requiere fluidoterapia y polifarmacia: fármacos, vías, velocidad de infusión, balance hídrico y justificación terapéutica.', expectedPoints: ['Identifica fármacos y vías de administración.', 'Calcula la velocidad de goteo.', 'Evalúa el balance hídrico.', 'Justifica el ajuste terapéutico.'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

const patient: PatientSpec = {
  name: 'Paciente simulado',
  descriptor: () => 'patología aguda con fluidoterapia y polifarmacia',
  caseFor: () => 'Paciente hospitalizado con patología aguda, con necesidad de fluidoterapia y polifarmacia (caso ilustrativo, sin datos de la guía). Indicación: 1000 mL de solución parenteral en 8 horas.',
  vitalsFor: (_id, done): Vital[] =>
    done.includes('decide')
      ? [
          { id: 'fc', label: 'FC', value: '92', unit: 'lpm', tone: 'green' },
          { id: 'pa', label: 'PA', value: '112/70', unit: 'mmHg', tone: 'green' },
          { id: 'sat', label: 'SpO₂', value: '98', unit: '%', tone: 'blue' },
          { id: 'temp', label: 'T°', value: '37.4', unit: '°C', tone: 'green' },
        ]
      : [
          { id: 'fc', label: 'FC', value: '108', unit: 'lpm', tone: 'amber' },
          { id: 'pa', label: 'PA', value: '100/62', unit: 'mmHg', tone: 'amber' },
          { id: 'sat', label: 'SpO₂', value: '97', unit: '%', tone: 'blue' },
          { id: 'temp', label: 'T°', value: '37.8', unit: '°C', tone: 'amber' },
        ],
  events: {
    case: 'Caso clínico revisado.', drugs: 'Fármacos y vías de administración identificados.',
    'calc:macro': 'Velocidad de goteo calculada (macrogotero).', 'calc:micro': 'Velocidad de goteo calculada (microgotero).',
    'calc:in': 'Ingresos de 24 h calculados.', 'calc:out': 'Egresos de 24 h calculados.', 'calc:bal': 'Balance hídrico calculado.',
    decide: 'Decisiones clínicas tomadas: infusión iniciada.', present: 'Caso presentado con justificación terapéutica.',
  },
  note: 'Signos vitales y caso ilustrativos (no provienen de la guía).',
}

export default protocolPractice({
  meta,
  roundLabel: 'Caso clínico integrador',
  patient,
  Stage: DripStage,
  boardHelp: 'Caso ILUSTRATIVO: indicación de 1000 mL de solución parenteral en 8 horas. Ingresos en 24 h: 3000 mL de infusión + 500 mL por vía oral. Egresos en 24 h: diuresis 1800 mL, vómito 200 mL, pérdidas insensibles 500 mL. Factores de goteo: macrogotero 20 gotas/mL, microgotero 60 gotas/mL.',
  steps: [
    { id: 'case', title: 'Presentación del caso clínico', instruction: 'Revisa el caso clínico: paciente con patología aguda, necesidad de fluidoterapia y polifarmacia (caso ilustrativo).', hint: 'Elige «Revisar el caso clínico».', actions: ['case'], success: 'Caso revisado.' },
    { id: 'drugs', title: 'Fármacos y vías de administración', instruction: 'Identifica los fármacos indicados y las vías de administración (con el docente).', hint: 'Elige «Identificar fármacos y vías».', actions: ['drugs'], success: 'Fármacos y vías identificados.' },
    { id: 'drip', title: 'Velocidad de goteo', instruction: 'Calcula la velocidad de goteo de 1000 mL en 8 horas, en macrogotas y en microgotas.', hint: 'Gotas/min = mL × factor / (horas × 60).', actions: ['calc:macro', 'calc:micro'], success: 'Goteo calculado.' },
    { id: 'balance', title: 'Balance hídrico de 24 horas', instruction: 'Elabora el balance hídrico estimado de 24 horas: total de ingresos, total de egresos y balance.', hint: 'Balance = ingresos − egresos.', actions: ['calc:in', 'calc:out', 'calc:bal'], success: 'Balance calculado.' },
    { id: 'decide', title: 'Decisiones clínicas', instruction: 'Toma decisiones clínicas sobre el ajuste de la infusión y la elección de fármacos.', hint: 'Elige «Tomar decisiones clínicas».', actions: ['decide'], success: 'Decisiones tomadas.' },
    { id: 'present', title: 'Presentación oral', instruction: 'Presenta el caso con la justificación terapéutica (en la evaluación).', hint: 'Elige «Presentar el caso».', actions: ['present'], success: 'Caso presentado.' },
  ],
  cards: [
    { id: 'case', label: 'Revisar el caso clínico', group: 'Caso' },
    { id: 'drugs', label: 'Identificar fármacos y vías de administración', group: 'Caso' },
    { id: 'decide', label: 'Tomar decisiones clínicas', group: 'Decisión' },
    { id: 'present', label: 'Presentar el caso con justificación terapéutica', group: 'Decisión' },
  ],
  requires: { present: { needs: 'decide', message: 'Primero toma las decisiones clínicas.' } },
  tasks: [
    { id: 'macro', group: 'Goteo', label: 'Macrogotas', prompt: 'Velocidad de goteo con macrogotero (20 gotas/mL): 1000 mL en 8 horas.', unit: 'gotas/min', answer: (1000 * 20) / 480, tol: 1, hint: 'Gotas/min = 1000 mL × 20 / 480 min.' },
    { id: 'micro', group: 'Goteo', label: 'Microgotas', prompt: 'Velocidad de goteo con microgotero (60 gotas/mL): 1000 mL en 8 horas.', unit: 'microgotas/min', answer: (1000 * 60) / 480, tol: 1, hint: 'Microgotas/min = 1000 mL × 60 / 480 min.' },
    { id: 'in', group: 'Balance hídrico', label: 'Ingresos 24 h', prompt: 'Total de ingresos en 24 h (infusión 3000 mL + vía oral 500 mL).', unit: 'mL', answer: 3500, tol: 0.5, hint: 'Suma todos los ingresos.' },
    { id: 'out', group: 'Balance hídrico', label: 'Egresos 24 h', prompt: 'Total de egresos en 24 h (diuresis 1800 + vómito 200 + pérdidas insensibles 500).', unit: 'mL', answer: 2500, tol: 0.5, hint: 'Suma todos los egresos.' },
    { id: 'bal', group: 'Balance hídrico', label: 'Balance', prompt: 'Balance hídrico de 24 h (ingresos − egresos).', unit: 'mL', answer: 1000, tol: 0.5, hint: 'Balance = 3500 − 2500.' },
  ],
  quiz,
  materialsPanel: [{ id: 'set', label: 'Equipo de venoclisis y catéter periférico', description: '10 unidades cada uno.', kind: 'material' }, { id: 'sim', label: 'Simulador de alta fidelidad y brazo para canalizar', description: 'Supervisión docente.', kind: 'equipment' }, { id: 'vitals', label: 'Hoja de simulación de signos vitales', description: 'Apoyo del caso.', kind: 'material' }],
  referenceTable: [{ title: 'Fórmulas', rows: [{ label: 'Goteo', value: 'gotas/min = mL × factor / minutos' }, { label: 'Balance hídrico', value: 'ingresos − egresos' }, { label: 'Factores', value: 'No figuran en la guía (valores habituales 20 y 60 gotas/mL)' }] }],
  defaultWeights: { procedure: 45, results: 0, quizChoice: 10, quizTrueFalse: 5, quizOpen: 35, errorPenalty: 5 },
  resultText: 'Velocidad de goteo y balance hídrico calculados para el caso ilustrativo.',
  closing: `Se calculó la velocidad de goteo y el balance hídrico de un caso ilustrativo. ${SIM_NOTE}`,
  disclaimer: `Simulación educativa. ${SIM_NOTE}`,
})
