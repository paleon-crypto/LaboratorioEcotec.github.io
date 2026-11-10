/** Biología Celular y Molecular – Práctica 1: Bioseguridad en el laboratorio. */
import { protocolPractice } from '../../core/protocolBench'
import Extra1, { EQUIP } from './Extra'
import type { QuizConfig } from '../../core/types'
import { biologiaMeta, biologiaWeightsNoResults } from '../biologia'

const meta = biologiaMeta(1, 1, '7/05/2025', {
  title: 'Bioseguridad en el laboratorio',
  objective: 'Reconocer el laboratorio de prácticas y sus normas de bioseguridad. Identificar responsabilidades y tareas dentro del entorno de laboratorio.',
  learningOutcomes: ['Reconocer e identificar correctamente todos los elementos que existen en el laboratorio de biología.', 'Manejar de manera adecuada los equipos de esterilización.', 'Distinguir cuándo y por qué se utiliza un antiséptico y un desinfectante.', 'Conocer la terminología del tema tratado.'],
  difficulty: 'Básica',
  theory: 'La práctica de bioseguridad es vital para proteger al personal y al ambiente de riesgos biológicos en el laboratorio. Se basa en normas y procedimientos que regulan el manejo seguro de agentes peligrosos, el uso de equipos de protección personal y la correcta eliminación de residuos. Aplicar estas medidas previene accidentes y contaminaciones, asegurando un entorno seguro y el cumplimiento de las normativas vigentes.',
  materials: ['Mandiles', 'Mascarillas', 'Gorros', 'Guantes (pares)', 'Marcadores', 'Pizarra'],
  equipment: ['Microscopio óptico (15)', 'Autoclave', 'Baño María', 'Agitador calentador', 'Balanza analítica', 'Cámara de bioseguridad'],
  safetyNotes: ['Uso obligatorio de uniforme completo para ingreso al laboratorio.', 'No se permite el uso de celulares ni la ingestión de alimentos o bebidas.', 'Se recomienda observar los procedimientos del docente para futuras manipulaciones.'],
  evaluationCriteria: ['Actitud: asistencia, puntualidad, presentación personal, liderazgo.', 'Habilidad y desempeño: planificación, ejecución, iniciativa, precaución.', 'Capacidad técnica/conocimiento: aplicación práctica y teórica, seguimiento de instrucciones.', 'Campo profesional: empleo de normas de bioseguridad y técnicas adecuadas.'],
  bibliography: ['Organización Mundial de la Salud. Manual de bioseguridad en el laboratorio. 4.ª ed., 2020.'],
  validated: false,
  validationNotes: [
    'La ficha pide clasificar los materiales «de acuerdo a su uso» (medición, separación, mezcla, calentamiento, soporte, reducción de tamaño, uso diverso, etc.) pero no indica a qué categoría pertenece cada equipo: las categorías y la correspondencia del simulador son ilustrativas. Pendiente de validación docente.',
    'La ficha menciona antisépticos y desinfectantes en los resultados de aprendizaje pero no incluye su procedimiento: solo se evalúa en el cuestionario con la distinción conceptual general. Pendiente.',
    'Numeración: tres fichas están rotuladas N°1 (esta, micropipetas y microscopio).',
    'El banco de preguntas fue redactado a partir de la ficha: pendiente de revisión docente.',
  ],
})

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Qué exige la ficha para ingresar al laboratorio?', options: [{ id: 'a', text: 'Uniforme completo' }, { id: 'b', text: 'Solo guantes' }, { id: 'c', text: 'Ninguna prenda especial' }, { id: 'd', text: 'Solo mascarilla' }], correct: 'a', explanation: 'Uso obligatorio de uniforme completo para ingreso al laboratorio.' },
    { id: 'c2', type: 'choice', prompt: 'Según la fundamentación, aplicar las medidas de bioseguridad previene…', options: [{ id: 'a', text: 'Accidentes y contaminaciones' }, { id: 'b', text: 'Solo la pérdida de material' }, { id: 'c', text: 'El aprendizaje' }, { id: 'd', text: 'Ningún riesgo' }], correct: 'a', explanation: 'Fundamentación teórica de la ficha.' },
    { id: 'c3', type: 'choice', prompt: '¿Cuál de estos equipos figura en la lista de la ficha?', options: [{ id: 'a', text: 'Autoclave' }, { id: 'b', text: 'Resonador magnético' }, { id: 'c', text: 'Secuenciador' }, { id: 'd', text: 'Cromatógrafo' }], correct: 'a', explanation: 'Equipos: microscopio, autoclave, baño María, agitador calentador, balanza analítica y cámara de bioseguridad.' },
    { id: 't1', type: 'tf', prompt: 'Se permite el uso de celulares y la ingestión de alimentos en el laboratorio.', correct: false, explanation: 'No se permite según los protocolos y normas de seguridad.' },
    { id: 't2', type: 'tf', prompt: 'Se recomienda observar los procedimientos del docente para futuras manipulaciones.', correct: true, explanation: 'Consideraciones adicionales de la ficha.' },
    { id: 'o1', type: 'open', prompt: 'Reflexiona sobre la importancia de cumplir las normas de bioseguridad para el desarrollo seguro y eficiente de las prácticas, y explica cuándo se usa un antiséptico y cuándo un desinfectante.', expectedPoints: ['El cumplimiento de las normas protege al personal y evita la contaminación cruzada.', 'Se espera apropiación de roles y normas.', 'Distinción entre antiséptico (tejido vivo) y desinfectante (superficies/objetos): pendiente de validar con el docente.'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Bioseguridad en el laboratorio',
  steps: [
    { id: 'epp', title: 'Uniforme completo', instruction: 'Colócate el uniforme completo para ingresar al laboratorio.', hint: 'Mandil, gorro, mascarilla y guantes.', actions: ['epp:mandil', 'epp:gorro', 'epp:mascarilla', 'epp:guantes'], success: 'Uniforme completo.' },
    { id: 'norms', title: 'Normas de seguridad', instruction: 'Revisa las normas de seguridad del laboratorio.', hint: 'Celulares, alimentos y observación del docente.', actions: ['norm:phones', 'norm:food', 'norm:teacher'], success: 'Normas revisadas.' },
    { id: 'identify', title: 'Identificar y clasificar los equipos', instruction: 'Observa los equipos del laboratorio, identifícalos y clasifícalos según su uso.', hint: 'Arrastra cada equipo a su categoría.', actions: EQUIP.map((e) => `classify:${e.id}`), success: 'Equipos clasificados.' },
  ],
  cards: [
    { id: 'epp:mandil', label: 'Colocarse el mandil', group: 'Uniforme' },
    { id: 'epp:gorro', label: 'Colocarse el gorro', group: 'Uniforme' },
    { id: 'epp:mascarilla', label: 'Colocarse la mascarilla', group: 'Uniforme' },
    { id: 'epp:guantes', label: 'Colocarse los guantes', group: 'Uniforme' },
    { id: 'norm:phones', label: 'Revisar: no se permiten celulares', group: 'Normas' },
    { id: 'norm:food', label: 'Revisar: no se ingieren alimentos ni bebidas', group: 'Normas' },
    { id: 'norm:teacher', label: 'Revisar: observar los procedimientos del docente', group: 'Normas' },
  ],
  distractors: [
    { id: 'no-epp', label: 'Ingresar sin uniforme completo', group: 'Uniforme', feedback: 'El uso de uniforme completo es obligatorio para ingresar.' },
    { id: 'eat', label: 'Ingerir alimentos o bebidas', group: 'Normas', feedback: 'No se permite ingerir alimentos ni bebidas en el laboratorio.' },
    { id: 'classify-wrong', label: 'Clasificar sin revisar la función del equipo', group: 'Normas', feedback: 'Ese equipo no corresponde a esa categoría: revisa su función.' },
  ],
  Extra: Extra1,
  quiz,
  materialsPanel: [
    ...['Mandiles', 'Mascarillas', 'Gorros', 'Guantes (pares)', 'Marcadores', 'Pizarra'].map((l, i) => ({ id: `m${i}`, label: l, description: 'No consumible.', kind: 'material' as const })),
    ...['Microscopio óptico (15)', 'Autoclave', 'Baño María', 'Agitador calentador', 'Balanza analítica', 'Cámara de bioseguridad'].map((l, i) => ({ id: `e${i}`, label: l, description: 'Equipo.', kind: 'equipment' as const })),
  ],
  referenceTable: [{ title: 'Normas (ficha)', rows: [{ label: 'Uniforme', value: 'Completo, obligatorio' }, { label: 'Celulares', value: 'No permitidos' }, { label: 'Alimentos y bebidas', value: 'No permitidos' }] }],
  defaultWeights: biologiaWeightsNoResults,
  resultText: 'Uniforme completo, normas revisadas y equipos clasificados según su uso.',
  closing: 'Se aplicaron las normas de bioseguridad y se identificaron los equipos del laboratorio.',
})
