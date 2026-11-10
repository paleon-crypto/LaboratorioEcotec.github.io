/**
 * Bioquímica – Práctica 11: Marcadores bioquímicos relacionados con el metabolismo de lípidos.
 * FUENTE: ficha VAC-FOR-006 (Rev. 01), práctica N°11.
 *
 * LIMITACIÓN: la ficha NO incluye valores de referencia ni exámenes simulados: indica que el docente
 * entrega las muestras y que el estudiante completa un informe (definición, función y valores normales).
 * Por eso no se inventan valores ni clasificaciones: la parte de contenido se evalúa con preguntas
 * abiertas que califica el docente.
 */
import { protocolPractice } from '../../core/protocolBench'
import type { PracticeMeta, QuizConfig } from '../../core/types'
import { makeLipidExtra } from './Extra'
import { CHAMPE, FACULTY, OMS, RUBRIC, sourceFor } from '../shared'

const meta: PracticeMeta = {
  id: 'bioquimica-p11',
  number: 11,
  title: 'Marcadores bioquímicos relacionados con el metabolismo de lípidos',
  subjectId: 'bioquimica',
  careerIds: ['medicina'],
  faculty: FACULTY,
  objective: 'Identificar los marcadores bioquímicos relacionados con el metabolismo de los lípidos.',
  learningOutcomes: ['Identifica e interpreta los marcadores bioquímicos asociados al metabolismo lipídico a partir de análisis clínicos simulados.'],
  theory:
    'Los lípidos desempeñan un rol clave en el almacenamiento de energía y estructura celular. Su metabolismo se evalúa clínicamente a través de marcadores como el colesterol total, c-HDL, c-LDL, triglicéridos, entre otros. Su alteración puede reflejar enfermedades metabólicas, hepáticas o cardiovasculares.',
  durationMin: 80,
  difficulty: 'Básica',
  materials: ['Exámenes bioquímicos simulados entregados por el docente'],
  equipment: [],
  safetyNotes: ['Lavado de manos, uso de guantes y materiales desechables.', 'Buen uso y conservación de los documentos clínicos.'],
  evaluationCriteria: RUBRIC,
  bibliography: [CHAMPE, OMS],
  source: sourceFor(11),
  validated: false,
  validationNotes: [
    'La ficha no incluye valores de referencia ni los exámenes simulados (los entrega el docente): el simulador no genera valores ni clasifica niveles de lípidos.',
    'El informe (definición, función y valores normales de cada marcador) se responde en las preguntas abiertas, que califica el docente con sus valores de referencia.',
    'La ficha menciona «enzimas hepáticas» en la interpretación y c-IDL en el procedimiento sin más detalle: no se desarrollaron.',
    'El paso 1 (reunirse en grupos) se realiza fuera del simulador.',
  ],
  version: '1.0.0',
}

const markers = [
  { id: 'total', name: 'colesterol total' },
  { id: 'hdl', name: 'c-HDL' },
  { id: 'ldl', name: 'c-LDL' },
  { id: 'idl', name: 'c-IDL' },
  { id: 'tg', name: 'triglicéridos' },
]

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: 'Según la fundamentación, ¿qué rol clave desempeñan los lípidos?', options: [{ id: 'a', text: 'Almacenamiento de energía y estructura celular' }, { id: 'b', text: 'Transporte de oxígeno' }, { id: 'c', text: 'Digestión de proteínas' }, { id: 'd', text: 'Ninguno' }], correct: 'a', explanation: 'Los lípidos desempeñan un rol clave en el almacenamiento de energía y la estructura celular.' },
    { id: 'c2', type: 'choice', prompt: '¿Cuál de estos es un marcador del metabolismo lipídico mencionado en la ficha?', options: [{ id: 'a', text: 'Triglicéridos' }, { id: 'b', text: 'Gravedad específica' }, { id: 'c', text: 'pH urinario' }, { id: 'd', text: 'Reactivo de Molisch' }], correct: 'a', explanation: 'La ficha menciona colesterol total, c-HDL, c-LDL, c-IDL y triglicéridos.' },
    { id: 't1', type: 'tf', prompt: 'La alteración de los marcadores lipídicos puede reflejar enfermedades metabólicas, hepáticas o cardiovasculares.', correct: true, explanation: 'Está en la fundamentación teórica.' },
    { id: 't2', type: 'tf', prompt: 'En esta práctica los resultados se interpretan con los valores de referencia para clasificar los niveles de lípidos.', correct: true, explanation: 'Así lo indica la interpretación de resultados de la ficha.' },
    ...markers.map((m) => ({
      id: `o-${m.id}`,
      type: 'open' as const,
      prompt: `Informe: define ${m.name}, explica su función e indica sus valores normales.`,
      expectedPoints: ['Definición del marcador.', 'Función.', 'Valores normales según la guía de referencia del docente.'],
      explanation: 'Esta pregunta será revisada por el docente con sus valores de referencia.',
    })),
  ],
}

const practice = protocolPractice({
  meta,
  roundLabel: 'Interpretación de marcadores lipídicos',
  Extra: makeLipidExtra(markers),
  steps: [
    { id: 'receive', title: 'Recibir los exámenes simulados', instruction: 'El docente entrega muestras de exámenes bioquímicos simulados. Recíbelos.', hint: 'Elige «Recibir el examen simulado».', actions: ['receive-report'], success: 'Examen recibido.' },
    { id: 'read', title: 'Leer los marcadores lipídicos', instruction: 'Lee e interpreta los resultados de los marcadores: colesterol total, c-HDL, c-LDL, c-IDL y triglicéridos.', hint: 'Revisa cada uno de los cinco marcadores.', actions: markers.map((m) => `read:${m.id}`), success: 'Marcadores revisados.' },
    { id: 'report', title: 'Completar el informe', instruction: 'Completa un informe con la definición, función y valores normales de cada marcador (en la evaluación).', hint: 'Elige «Completar el informe» y luego responde las preguntas abiertas de la evaluación.', actions: ['complete-report'], success: 'Informe listo para la evaluación.' },
  ],
  cards: [
    { id: 'receive-report', label: 'Recibir el examen simulado del docente', group: 'Examen' },
    ...markers.map((m) => ({ id: `read:${m.id}`, label: `Leer e interpretar: ${m.name}`, group: 'Marcadores lipídicos' })),
    { id: 'complete-report', label: 'Completar el informe (definición, función y valores normales)', group: 'Informe' },
  ],
  requires: { 'complete-report': { needs: 'read:tg', message: 'Primero revisa todos los marcadores.' } },
  quiz,
  materialsPanel: [{ id: 'report', label: 'Examen bioquímico simulado', description: 'Lo entrega el docente; la ficha no incluye sus valores.', kind: 'material' }],
  referenceTable: [
    {
      title: 'Marcadores',
      rows: [
        { label: 'Marcadores a interpretar', value: 'Colesterol total, c-HDL, c-LDL, c-IDL, triglicéridos' },
        { label: 'Valores normales', value: 'No incluidos en la ficha: los indica el docente' },
      ],
    },
  ],
  defaultWeights: { procedure: 20, results: 0, quizChoice: 10, quizTrueFalse: 10, quizOpen: 60, errorPenalty: 5 },
  resultText: 'Marcadores revisados; informe pendiente de calificación por el docente.',
  closing: 'Se revisaron los marcadores lipídicos. La ficha no incluye valores de referencia: la interpretación del informe la valida el docente.',
  boardHelp: 'Sigue el orden: recibir el examen, leer los marcadores y completar el informe. El contenido del informe se responde en la evaluación.',
})

export default practice
