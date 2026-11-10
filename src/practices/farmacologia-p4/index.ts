/**
 * Farmacología Básica – Práctica 4: Análisis de curvas farmacocinéticas de absorción y distribución.
 * La guía usa «curvas modelo en plataforma digital» pero no las incluye: las curvas son ILUSTRATIVAS
 * (modelo monocompartimental de primer orden con parámetros propios).
 */
import { protocolPractice } from '../../core/protocolBench'
import type { InterpretationItem, QuizConfig } from '../../core/types'
import { farmaMeta, farmaWeightsWithItems, SIM_NOTE } from '../farma'
import Chart, { halfLife, PK, tmax } from './Chart'

const meta = farmaMeta(4, '28-05-2025', {
  title: 'Análisis de curvas farmacocinéticas de absorción y distribución',
  objective: 'Analizar curvas farmacocinéticas de absorción y distribución, identificar sus fases y relacionarlas con la vía de administración.',
  learningOutcomes: ['Analiza curvas farmacocinéticas e identifica sus fases.', 'Relaciona los perfiles plasmáticos con la vía de administración.', 'Aplica estos conceptos en escenarios clínicos simulados.'],
  theory: 'La farmacocinética estudia el recorrido de los fármacos en el organismo, comprendiendo procesos de absorción, distribución, metabolismo y excreción. El análisis gráfico de la concentración plasmática frente al tiempo es fundamental para determinar la biodisponibilidad, el tiempo de inicio de acción, y la frecuencia de dosificación. Esta práctica permite al estudiante visualizar y comparar estos conceptos de forma dinámica y aplicada.',
  difficulty: 'Intermedia',
  materials: ['Guantes de látex descartables', 'Mascarilla quirúrgica', 'Toallas de papel', 'Marcador de pizarra', 'Mandil y gorro'],
  equipment: ['Computadora', 'Proyector', 'Pizarra', 'Plataforma de entorno virtual'],
  safetyNotes: ['No hay reactivos físicos: práctica en plataforma digital.'],
  evaluationCriteria: ['Participación en el análisis.', 'Interpretación adecuada de curvas (SI/NO).', 'Aplicación clínica en discusión.'],
  validated: false,
  validationNotes: [
    'El campo «Objetivo» de la ficha contiene actividades de conexión (discusión de casos, cuestionario): el objetivo se redactó a partir del título y los resultados de aprendizaje. Confirmar.',
    'La ficha no incluye las curvas modelo ni sus parámetros (dosis, volumen, constantes): las curvas son ilustrativas y generadas con un modelo monocompartimental simple.',
    'Los fármacos y las vías (oral, IM, IV) se usan sin nombrar fármacos concretos.',
    'La discusión en grupos pequeños y la conclusión se realizan fuera del simulador.',
  ],
})

const items: InterpretationItem[] = [
  { id: 'fastest', prompt: 'Según las curvas del simulador, ¿qué vía alcanza antes la concentración máxima?', options: [{ id: 'iv', label: 'Intravenosa' }, { id: 'im', label: 'Intramuscular' }, { id: 'oral', label: 'Oral' }], correct: 'iv', explanation: 'En la curva intravenosa la concentración máxima es inmediata (no hay fase de absorción).' },
  { id: 'imvsoral', prompt: 'Entre la vía oral y la intramuscular de las curvas del simulador, ¿cuál alcanza antes su Tmax?', options: [{ id: 'im', label: 'Intramuscular' }, { id: 'oral', label: 'Oral' }], correct: 'im', explanation: `Con los parámetros ilustrativos, Tmax IM = ${tmax(PK.kaIm).toFixed(1)} h y Tmax oral = ${tmax(PK.kaOral).toFixed(1)} h.` },
]

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Qué procesos comprende la farmacocinética según la ficha?', options: [{ id: 'a', text: 'Absorción, distribución, metabolismo y excreción' }, { id: 'b', text: 'Solo la absorción' }, { id: 'c', text: 'Receptores y antagonismo' }, { id: 'd', text: 'Formas farmacéuticas únicamente' }], correct: 'a', explanation: 'Definición de la fundamentación teórica.' },
    { id: 'c2', type: 'choice', prompt: 'El análisis de la concentración plasmática frente al tiempo permite determinar:', options: [{ id: 'a', text: 'Biodisponibilidad, tiempo de inicio de acción y frecuencia de dosificación' }, { id: 'b', text: 'Solo el color del fármaco' }, { id: 'c', text: 'El costo del tratamiento' }, { id: 'd', text: 'Nada' }], correct: 'a', explanation: 'Está en la fundamentación teórica.' },
    { id: 'c3', type: 'choice', prompt: '¿Qué parámetros se analizan en las fases de las curvas?', options: [{ id: 'a', text: 'Absorción, distribución, Cmax, Tmax y t1/2' }, { id: 'b', text: 'Solo la dosis' }, { id: 'c', text: 'El pH' }, { id: 'd', text: 'La gravedad específica' }], correct: 'a', explanation: 'Paso 3 del procedimiento.' },
    { id: 't1', type: 'tf', prompt: 'Las curvas modelo de la práctica comparan las vías oral, intramuscular e intravenosa.', correct: true, explanation: 'Paso 2 del procedimiento.' },
    { id: 't2', type: 'tf', prompt: 'Esta práctica usa reactivos físicos.', correct: false, explanation: 'No hay reactivos físicos: es una plataforma digital.' },
    { id: 'o1', type: 'open', prompt: 'Compara las curvas de las vías oral, intramuscular e intravenosa y explica cómo elegirías vía, dosis y frecuencia en un escenario clínico.', expectedPoints: ['Identifica fases de absorción y eliminación.', 'Relaciona el perfil con la vía.', 'Justifica la elección de vía, dosis y frecuencia.'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Curvas farmacocinéticas',
  Extra: Chart,
  steps: [
    { id: 'theory', title: 'Introducción teórica', instruction: 'Revisa la introducción teórica breve (10 minutos) sobre farmacocinética.', hint: 'Elige «Revisar la introducción teórica».', actions: ['theory'], success: 'Teoría revisada.' },
    { id: 'review', title: 'Revisar las curvas modelo', instruction: 'Revisa las curvas modelo en la plataforma digital: oral, intramuscular e intravenosa.', hint: 'Revisa las tres curvas; aparecerán en el gráfico.', actions: ['review:oral', 'review:im', 'review:iv'], success: 'Curvas cargadas.' },
    { id: 'phases', title: 'Análisis de fases', instruction: 'Realiza el análisis guiado de las fases: absorción, distribución, Cmax, Tmax y t1/2.', hint: 'Identifica los cinco elementos.', actions: ['id:absorption', 'id:distribution', 'id:cmax', 'id:tmax', 'id:t12'], success: 'Fases identificadas.' },
    { id: 'calc', title: 'Medir Tmax y t1/2', instruction: 'Lee en la curva el Tmax de la vía oral y calcula la vida media a partir de ke (valores ilustrativos).', hint: 'Lee el pico de la curva oral; t1/2 = 0,693 / ke.', actions: ['calc:tmax', 'calc:t12'], success: 'Parámetros calculados.' },
    { id: 'compare', title: 'Comparar curvas por vía', instruction: 'Compara las curvas según la vía de administración.', hint: 'Elige «Comparar las curvas».', actions: ['compare'], success: 'Comparación realizada.' },
    { id: 'discuss', title: 'Discusión clínica', instruction: 'Discute la aplicación clínica de las curvas (en la evaluación).', hint: 'Elige «Discutir la aplicación clínica».', actions: ['discuss'], success: 'Discusión realizada.' },
  ],
  cards: [
    { id: 'theory', label: 'Revisar la introducción teórica', group: 'Teoría' },
    { id: 'review:oral', label: 'Revisar la curva oral', group: 'Curvas modelo' },
    { id: 'review:im', label: 'Revisar la curva intramuscular', group: 'Curvas modelo' },
    { id: 'review:iv', label: 'Revisar la curva intravenosa', group: 'Curvas modelo' },
    { id: 'id:absorption', label: 'Identificar la fase de absorción', group: 'Fases' },
    { id: 'id:distribution', label: 'Identificar la fase de distribución', group: 'Fases' },
    { id: 'id:cmax', label: 'Identificar Cmax', group: 'Fases' },
    { id: 'id:tmax', label: 'Identificar Tmax', group: 'Fases' },
    { id: 'id:t12', label: 'Identificar t1/2', group: 'Fases' },
    { id: 'compare', label: 'Comparar las curvas por vía', group: 'Análisis' },
    { id: 'discuss', label: 'Discutir la aplicación clínica', group: 'Análisis' },
  ],
  requires: { compare: { needs: 'calc:t12', message: 'Primero completa las mediciones.' } },
  tasks: [
    { id: 'tmax', group: 'Mediciones', label: 'Tmax oral', prompt: 'Lee en la curva oral el tiempo en que se alcanza la concentración máxima (Tmax).', unit: 'h', answer: tmax(PK.kaOral), tol: 0.25, hint: 'Busca el pico de la curva verde (oral) pasando el cursor sobre ella.' },
    { id: 't12', group: 'Mediciones', label: 't1/2', prompt: 'Calcula la vida media de eliminación con ke = 0,2 h⁻¹.', unit: 'h', answer: halfLife, tol: 0.05, hint: 't1/2 = 0,693 / ke.' },
  ],
  quiz,
  interpretationItems: items,
  materialsPanel: [{ id: 'platform', label: 'Plataforma de entorno virtual', description: 'No hay reactivos físicos.', kind: 'equipment' }, { id: 'projector', label: 'Computadora y proyector', description: 'Apoyo de la sesión.', kind: 'equipment' }],
  referenceTable: [{ title: 'Parámetros de la ficha', rows: [{ label: 'Vías', value: 'Oral, IM, IV' }, { label: 'Parámetros', value: 'Cmax, Tmax, t1/2' }, { label: 'Curvas del simulador', value: 'Ilustrativas (no de la guía)' }] }],
  defaultWeights: farmaWeightsWithItems,
  resultText: 'Curvas analizadas y parámetros calculados.',
  closing: `Se analizaron curvas farmacocinéticas de las vías oral, intramuscular e intravenosa. ${SIM_NOTE}`,
  disclaimer: `Simulación educativa. ${SIM_NOTE}`,
})
