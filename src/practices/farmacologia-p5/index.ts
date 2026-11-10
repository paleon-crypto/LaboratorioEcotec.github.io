/**
 * Farmacología Básica – Práctica 5: Metabolismo y excreción de fármacos: análisis clínico aplicado.
 * La guía no incluye los datos de los casos clínicos ni fármacos/dosis: el contenido se evalúa con
 * preguntas abiertas que califica el docente.
 */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import { farmaMeta } from '../farma'
import Extra5 from './Extra'

const meta = farmaMeta(5, '4-06-2025', {
  title: 'Metabolismo y excreción de fármacos: análisis clínico aplicado',
  objective: 'Aplicar los principios de metabolismo y excreción de fármacos al análisis de casos clínicos con alteración hepática o renal, para interpretar su impacto en la seguridad y eficacia del tratamiento.',
  learningOutcomes: ['Interpreta casos clínicos con alteración hepática o renal.', 'Ajusta esquemas terapéuticos según la función metabólica y excretora.', 'Selecciona fármacos adecuados en contextos clínicos simulados.'],
  theory: 'El metabolismo de los fármacos ocurre principalmente en el hígado mediante enzimas como las del citocromo P450, mientras que la excreción se produce en su mayoría por vía renal. Alteraciones en estos sistemas pueden modificar la biodisponibilidad, vida media y toxicidad de los medicamentos. Comprender estos procesos es fundamental para prescribir de forma segura.',
  difficulty: 'Intermedia',
  materials: ['Guantes de látex descartables', 'Mascarilla quirúrgica', 'Hoja de rúbrica de evaluación', 'Mandil y gorro', 'Hoja de simulación de signos vitales'],
  equipment: ['Computadora', 'Proyector', 'Pizarra', 'Simulador de alta fidelidad'],
  safetyNotes: ['Aprendizaje basado en simulación y ética médica.', 'Uso responsable del simulador bajo supervisión docente.'],
  evaluationCriteria: ['Análisis correcto de casos clínicos.', 'Aplicación adecuada del concepto de metabolismo y excreción.', 'Selección racional de fármacos y ajuste de dosis.'],
  validated: false,
  validationNotes: [
    'La guía no incluye los datos de los casos (cirrosis hepática, insuficiencia renal crónica), ni fármacos, dosis o signos vitales: el simulador no genera ni ajusta dosis. El análisis se evalúa con preguntas abiertas que califica el docente.',
    'La guía no detalla los datos del simulador de alta fidelidad: no se simula.',
    'La discusión en grupos y el debriefing se realizan fuera del simulador.',
    'El esquema hígado–riñón es ilustrativo: solo representa qué órgano interviene (metabolismo/excreción, según la ficha); no contiene datos de pacientes ni dosis.',
  ],
})

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Dónde ocurre principalmente el metabolismo de los fármacos según la ficha?', options: [{ id: 'a', text: 'Hígado' }, { id: 'b', text: 'Riñón' }, { id: 'c', text: 'Pulmón' }, { id: 'd', text: 'Piel' }], correct: 'a', explanation: 'Principalmente en el hígado.' },
    { id: 'c2', type: 'choice', prompt: '¿Qué enzimas se citan como principales en el metabolismo de fármacos?', options: [{ id: 'a', text: 'Citocromo P450' }, { id: 'b', text: 'Catalasa' }, { id: 'c', text: 'Amilasa' }, { id: 'd', text: 'Lipasa' }], correct: 'a', explanation: 'La ficha menciona las enzimas del citocromo P450.' },
    { id: 'c3', type: 'choice', prompt: '¿Por qué vía se excreta en su mayoría un fármaco?', options: [{ id: 'a', text: 'Renal' }, { id: 'b', text: 'Respiratoria' }, { id: 'c', text: 'Sudor' }, { id: 'd', text: 'Ninguna' }], correct: 'a', explanation: 'La excreción es en su mayoría renal.' },
    { id: 't1', type: 'tf', prompt: 'Las alteraciones hepáticas o renales pueden modificar la biodisponibilidad, vida media y toxicidad de los medicamentos.', correct: true, explanation: 'Está en la fundamentación teórica.' },
    { id: 't2', type: 'tf', prompt: 'La dosis de un fármaco nunca debe ajustarse según la función hepática o renal.', correct: false, explanation: 'El resultado de aprendizaje es ajustar esquemas terapéuticos según la función metabólica y excretora.' },
    { id: 'o1', type: 'open', prompt: 'Caso 1 (paciente con cirrosis hepática): explica cómo afecta el metabolismo de los fármacos y cómo ajustarías el tratamiento.', expectedPoints: ['Alteración del metabolismo hepático (citocromo P450).', 'Impacto en biodisponibilidad, vida media y toxicidad.', 'Ajuste de dosis y selección racional del fármaco.'], explanation: 'Esta pregunta será revisada por el docente.' },
    { id: 'o2', type: 'open', prompt: 'Caso 2 (paciente con insuficiencia renal crónica): explica cómo afecta la excreción de los fármacos y cómo ajustarías el tratamiento.', expectedPoints: ['Alteración de la excreción renal.', 'Acumulación y riesgo de toxicidad.', 'Ajuste de dosis y selección racional del fármaco.'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Casos clínicos hepáticos y renales',
  steps: [
    { id: 'case1', title: 'Caso clínico 1: cirrosis hepática', instruction: 'Analiza el caso clínico 1: paciente con cirrosis hepática.', hint: 'Elige «Analizar el caso 1».', actions: ['case:1'], success: 'Caso 1 analizado.' },
    { id: 'case2', title: 'Caso clínico 2: insuficiencia renal crónica', instruction: 'Analiza el caso clínico 2: paciente con insuficiencia renal crónica.', hint: 'Elige «Analizar el caso 2».', actions: ['case:2'], success: 'Caso 2 analizado.' },
    { id: 'discuss', title: 'Discusión de ajuste de dosis', instruction: 'Discute en grupos el ajuste de dosis y la elección de fármacos.', hint: 'Elige «Discutir el ajuste de dosis y fármacos».', actions: ['discuss'], success: 'Discusión realizada.' },
    { id: 'eval', title: 'Evaluación individual', instruction: 'Realiza la evaluación individual con preguntas abiertas (en la evaluación).', hint: 'Elige «Iniciar la evaluación individual».', actions: ['eval'], success: 'Evaluación individual lista.' },
    { id: 'debrief', title: 'Debriefing y cierre', instruction: 'Participa en el debriefing y cierre de la práctica.', hint: 'Elige «Participar en el debriefing».', actions: ['debrief'], success: 'Práctica cerrada.' },
  ],
  cards: [
    { id: 'case:1', label: 'Analizar el caso 1 (cirrosis hepática)', group: 'Casos clínicos' },
    { id: 'case:2', label: 'Analizar el caso 2 (insuficiencia renal crónica)', group: 'Casos clínicos' },
    { id: 'discuss', label: 'Discutir el ajuste de dosis y fármacos', group: 'Discusión' },
    { id: 'eval', label: 'Iniciar la evaluación individual', group: 'Evaluación' },
    { id: 'debrief', label: 'Participar en el debriefing', group: 'Cierre' },
  ],
  Extra: Extra5,
  requires: { debrief: { needs: 'eval', message: 'Primero realiza la evaluación individual.' } },
  quiz,
  materialsPanel: [{ id: 'sim', label: 'Simulador de alta fidelidad', description: 'Simulador clínico (supervisión docente).', kind: 'equipment' }, { id: 'vitals', label: 'Hoja de simulación de signos vitales', description: 'Apoyo del caso.', kind: 'material' }, { id: 'rubric', label: 'Hoja de rúbrica', description: 'Evaluación.', kind: 'material' }],
  referenceTable: [{ title: 'Metabolismo y excreción (ficha)', rows: [{ label: 'Metabolismo', value: 'Principalmente hepático (citocromo P450)' }, { label: 'Excreción', value: 'En su mayoría renal' }, { label: 'Alteraciones', value: 'Modifican biodisponibilidad, vida media y toxicidad' }] }],
  defaultWeights: { procedure: 20, results: 0, quizChoice: 15, quizTrueFalse: 10, quizOpen: 55, errorPenalty: 5 },
  resultText: 'Casos clínicos analizados; respuestas abiertas pendientes de calificación por el docente.',
  closing: 'Se analizaron casos con alteración hepática y renal. La guía no incluye los datos de los casos: el análisis lo valida el docente.',
})
