/** Farmacología Básica – Práctica 1: Inducción al laboratorio y simulación en farmacología. */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import { farmaMeta } from '../farma'
import Extra1 from './Extra'

const meta = farmaMeta(1, '5-05-2025', {
  title: 'Inducción al laboratorio y simulación en farmacología',
  objective: 'Conocer y aplicar las normas de bioseguridad, la metodología de trabajo en laboratorio y simulación clínica, para familiarizarse con el entorno práctico de la asignatura.',
  learningOutcomes: ['Aplica las normas de bioseguridad durante la práctica.', 'Reconoce los espacios de laboratorio y simulación clínica.', 'Describe el procedimiento general de desarrollo de prácticas.'],
  theory: 'El conocimiento y cumplimiento de las normas de bioseguridad es esencial para prevenir accidentes y garantizar un entorno seguro. Familiarizar al estudiante con el entorno físico y metodológico del laboratorio de farmacología y de simulación clínica mejora la disposición para el aprendizaje activo, y sienta las bases para prácticas clínicas seguras y efectivas.',
  difficulty: 'Básica',
  materials: ['Guantes de látex descartables', 'Mascarilla quirúrgica descartable', 'Solución desinfectante de base alcohólica', 'Toallas de papel', 'Mandil largo blanco', 'Gorro'],
  equipment: ['Computadora', 'Proyector', 'Pizarra', 'Infografía y señalética de bioseguridad'],
  safetyNotes: ['Uso obligatorio de EPP.', 'Prohibido ingerir alimentos.', 'Lavado de manos al ingreso y salida.'],
  evaluationCriteria: ['Participación en la práctica.', 'Comprensión de normas de bioseguridad.', 'Reconocimiento de espacios y equipos.'],
  validated: true,
  validationNotes: [
    'La ficha describe una actividad presencial (bienvenida, recorrido, explicación de normas): el simulador la convierte en un recorrido guiado y no mide resultados.',
    'Las acciones incorrectas (ingresar sin EPP, ingerir alimentos) se derivan de las normas de la ficha.',
    'El plano del recorrido, el dibujo del maniquí y la animación del lavado de manos son ilustrativos: la ficha no describe la distribución de los espacios ni la técnica de lavado.',
    'El banco de preguntas fue redactado a partir de la ficha: pendiente de revisión por el docente.',
  ],
})

const norms = [
  { id: 'epp', label: 'Uso obligatorio de EPP' },
  { id: 'food', label: 'Prohibido ingerir alimentos' },
  { id: 'hands', label: 'Lavado de manos al ingreso y salida' },
]

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Cuál de estas normas está indicada en la ficha?', options: [{ id: 'a', text: 'Uso obligatorio de EPP' }, { id: 'b', text: 'Se puede comer en el laboratorio' }, { id: 'c', text: 'El lavado de manos es opcional' }, { id: 'd', text: 'Los EPP se usan solo al final' }], correct: 'a', explanation: 'La ficha establece el uso obligatorio de EPP.' },
    { id: 'c2', type: 'choice', prompt: '¿Cuándo se realiza el lavado de manos según la ficha?', options: [{ id: 'a', text: 'Solo al ingresar' }, { id: 'b', text: 'Solo al salir' }, { id: 'c', text: 'Al ingreso y a la salida' }, { id: 'd', text: 'Nunca' }], correct: 'c', explanation: 'Lavado de manos al ingreso y salida.' },
    { id: 'c3', type: 'choice', prompt: 'Según la fundamentación, el cumplimiento de las normas de bioseguridad es esencial para:', options: [{ id: 'a', text: 'Prevenir accidentes y garantizar un entorno seguro' }, { id: 'b', text: 'Acortar la práctica' }, { id: 'c', text: 'Evitar el uso de equipos' }, { id: 'd', text: 'Reemplazar al docente' }], correct: 'a', explanation: 'Así lo indica la fundamentación teórica.' },
    { id: 't1', type: 'tf', prompt: 'Está prohibido ingerir alimentos en el laboratorio.', correct: true, explanation: 'Es una de las normas de seguridad de la ficha.' },
    { id: 't2', type: 'tf', prompt: 'El laboratorio de farmacología y la sala de simulación clínica son espacios que se reconocen en esta práctica.', correct: true, explanation: 'Está en el recorrido guiado del procedimiento.' },
    { id: 't3', type: 'tf', prompt: 'Los materiales y reactivos se usan sin supervisión docente.', correct: false, explanation: 'La ficha indica uso responsable bajo supervisión docente.' },
    { id: 'o1', type: 'open', prompt: 'Describe las normas de bioseguridad y de conducta que debes cumplir en el laboratorio de farmacología y explica por qué son importantes.', expectedPoints: ['EPP obligatorio.', 'Prohibido ingerir alimentos.', 'Lavado de manos al ingreso y salida.', 'Prevención de accidentes y entorno seguro.'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Inducción al laboratorio',
  steps: [
    { id: 'epp', title: 'Ingreso: EPP y lavado de manos', instruction: 'Antes de ingresar, colócate el EPP (mandil, gorro, mascarilla y guantes) y lávate las manos.', hint: 'Elige las cinco acciones del grupo «Ingreso».', actions: ['handwash-in', 'epp:mandil', 'epp:gorro', 'epp:mascarilla', 'epp:guantes'], success: 'Ingreso correcto.' },
    { id: 'welcome', title: 'Bienvenida y presentación del docente', instruction: 'Participa en la bienvenida y presentación del docente.', hint: 'Elige «Participar en la bienvenida».', actions: ['welcome'], success: 'Bienvenida realizada.' },
    { id: 'tour', title: 'Recorrido por el laboratorio y la sala de simulación', instruction: 'Realiza el recorrido guiado por el laboratorio y la sala de simulación.', hint: 'Elige los dos espacios del grupo «Recorrido».', actions: ['tour:lab', 'tour:sim'], success: 'Espacios reconocidos.' },
    { id: 'norms', title: 'Normas de bioseguridad y conducta', instruction: 'Revisa las normas de bioseguridad y la conducta esperada.', hint: 'Revisa las tres normas del grupo «Normas».', actions: norms.map((n) => `norm:${n.id}`), success: 'Normas revisadas.' },
    { id: 'format', title: 'Formato de fichas de práctica', instruction: 'Revisa el formato de las fichas de práctica.', hint: 'Elige «Revisar el formato de fichas».', actions: ['format'], success: 'Formato revisado.' },
    { id: 'qa', title: 'Preguntas y retroalimentación', instruction: 'Resuelve tus preguntas y recibe retroalimentación.', hint: 'Elige «Resolver preguntas».', actions: ['qa'], success: 'Preguntas resueltas.' },
    { id: 'exit', title: 'Salida: lavado de manos', instruction: 'Al salir, lávate las manos.', hint: 'Elige «Lavado de manos a la salida».', actions: ['handwash-out'], success: 'Práctica completada.' },
  ],
  cards: [
    { id: 'handwash-in', label: 'Lavado de manos al ingreso', group: 'Ingreso' },
    { id: 'epp:mandil', label: 'Colocarse el mandil', group: 'Ingreso' },
    { id: 'epp:gorro', label: 'Colocarse el gorro', group: 'Ingreso' },
    { id: 'epp:mascarilla', label: 'Colocarse la mascarilla', group: 'Ingreso' },
    { id: 'epp:guantes', label: 'Colocarse los guantes', group: 'Ingreso' },
    { id: 'welcome', label: 'Participar en la bienvenida', group: 'Actividad' },
    { id: 'tour:lab', label: 'Recorrer el laboratorio', group: 'Recorrido' },
    { id: 'tour:sim', label: 'Recorrer la sala de simulación', group: 'Recorrido' },
    ...norms.map((n) => ({ id: `norm:${n.id}`, label: `Revisar: ${n.label}`, group: 'Normas' })),
    { id: 'format', label: 'Revisar el formato de fichas de práctica', group: 'Actividad' },
    { id: 'qa', label: 'Resolver preguntas y recibir retroalimentación', group: 'Actividad' },
    { id: 'handwash-out', label: 'Lavado de manos a la salida', group: 'Salida' },
  ],
  distractors: [
    { id: 'eat', label: 'Ingerir alimentos en el laboratorio', group: 'Actividad', feedback: 'Está prohibido ingerir alimentos en el laboratorio.' },
    { id: 'no-epp', label: 'Ingresar sin EPP', group: 'Ingreso', feedback: 'El uso de EPP es obligatorio.' },
  ],
  requires: { 'handwash-out': { needs: 'qa', message: 'Primero completa las actividades de la práctica.' } },
  Extra: Extra1,
  quiz,
  materialsPanel: [
    { id: 'gloves', label: 'Guantes de látex descartables', description: '2 unidades.', kind: 'material' },
    { id: 'mask', label: 'Mascarilla quirúrgica descartable', description: '1 unidad.', kind: 'material' },
    { id: 'gel', label: 'Solución desinfectante de base alcohólica', description: 'Para la higiene de manos.', kind: 'material' },
    { id: 'gown', label: 'Mandil largo blanco y gorro', description: 'Equipo de protección personal.', kind: 'material' },
    { id: 'infog', label: 'Infografía y señalética de bioseguridad', description: 'Apoyo visual.', kind: 'equipment' },
  ],
  referenceTable: [{ title: 'Normas de seguridad (ficha)', rows: [{ label: 'EPP', value: 'Uso obligatorio' }, { label: 'Alimentos', value: 'Prohibido ingerir' }, { label: 'Higiene', value: 'Lavado de manos al ingreso y salida' }] }],
  defaultWeights: { procedure: 40, results: 0, quizChoice: 20, quizTrueFalse: 10, quizOpen: 25, errorPenalty: 5 },
  resultText: 'Inducción completada: normas de bioseguridad aplicadas y espacios reconocidos.',
  closing: 'Se aplicaron las normas de bioseguridad y se reconocieron los espacios del laboratorio y la sala de simulación.',
  boardHelp: 'Elige la acción que corresponde al paso actual. Las acciones incorrectas cuentan como error.',
})
