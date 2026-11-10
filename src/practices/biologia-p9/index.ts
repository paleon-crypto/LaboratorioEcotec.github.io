/** Biología Celular y Molecular – Práctica 9: Uniones celulares de anclaje (desmosomas y hemidesmosomas). */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import { biologiaMeta, biologiaWeightsNoResults, SIM_NOTE_BIO } from '../biologia'
import Extra9, { SPOTS } from './Extra'

const meta = biologiaMeta(9, 9, '2/07/2025', {
  title: 'Uniones celulares de anclaje: desmosomas y hemidesmosomas',
  objective: 'Observar e identificar las uniones celulares de anclaje, específicamente desmosomas y hemidesmosomas, para comprender su estructura, localización y función en la cohesión y estabilidad de los tejidos.',
  learningOutcomes: ['Argumentar la función de las uniones de anclaje y la interrelación que existe entre el interior y el exterior de la célula.'],
  difficulty: 'Intermedia',
  theory: 'Las uniones celulares de anclaje mantienen la cohesión entre células o entre células y la matriz extracelular, proporcionando resistencia mecánica. Los desmosomas unen células entre sí mediante cadherinas conectadas con filamentos intermedios (piel y músculo cardíaco). Los hemidesmosomas fijan las células epiteliales a la membrana basal mediante integrinas, también conectadas a filamentos intermedios.',
  materials: ['Microtubos de 1,5 mL'],
  equipment: ['Placas histológicas preparadas de piel (15)', 'Microscopio (15)'],
  safetyNotes: ['Uso adecuado de muestras biológicas y lavado de manos.'],
  evaluationCriteria: ['Actitud: asistencia, puntualidad, presentación personal, liderazgo.', 'Habilidad y desempeño: planificación, ejecución, iniciativa, precaución.', 'Capacidad técnica/conocimiento: aplicación práctica y teórica, seguimiento de instrucciones.', 'Campo profesional: empleo de normas de bioseguridad y técnicas adecuadas.'],
  bibliography: ['Megías Pacheco M, Molist García P, Pombal Diego M. Atlas de histología vegetal y animal. Universidad de Vigo. https://mmegias.webs.uvigo.es/'],
  validated: false,
  validationNotes: [
    SIM_NOTE_BIO,
    'Los desmosomas y hemidesmosomas no se distinguen con el microscopio óptico de la práctica (la ficha cita microscopía óptica o electrónica): el simulador usa un esquema ilustrativo de las uniones.',
    'La ficha no enumera las capas de la piel que deben dibujarse; el dibujo y el informe se evalúan en la pregunta abierta.',
    'El banco de preguntas fue redactado a partir de la ficha: pendiente de revisión docente.',
  ],
})

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Qué unen los desmosomas?', options: [{ id: 'a', text: 'Células entre sí' }, { id: 'b', text: 'Células con la membrana basal' }, { id: 'c', text: 'Solo proteínas' }, { id: 'd', text: 'Células con el núcleo' }], correct: 'a', explanation: 'Fundamentación teórica.' },
    { id: 'c2', type: 'choice', prompt: '¿Con qué proteínas fijan los hemidesmosomas la célula a la membrana basal?', options: [{ id: 'a', text: 'Integrinas' }, { id: 'b', text: 'Cadherinas' }, { id: 'c', text: 'Hemoglobina' }, { id: 'd', text: 'Colágeno' }], correct: 'a', explanation: 'Los hemidesmosomas usan integrinas.' },
    { id: 'c3', type: 'choice', prompt: '¿Dónde se localizan los hemidesmosomas?', options: [{ id: 'a', text: 'En la base de las células epiteliales' }, { id: 'b', text: 'En los bordes laterales' }, { id: 'c', text: 'En el núcleo' }, { id: 'd', text: 'En la superficie libre' }], correct: 'a', explanation: 'Interpretación de resultados.' },
    { id: 't1', type: 'tf', prompt: 'Los desmosomas se conectan con los filamentos intermedios del citoesqueleto.', correct: true, explanation: 'Fundamentación teórica.' },
    { id: 't2', type: 'tf', prompt: 'Su mal funcionamiento puede relacionarse con enfermedades cutáneas o cardíacas.', correct: true, explanation: 'Fundamentación teórica.' },
    { id: 'o1', type: 'open', prompt: 'Argumenta la función de las uniones de anclaje y la interrelación entre el interior y el exterior de la célula. Dibuja las capas de la piel y sus partes.', expectedPoints: ['Proporcionan cohesión y resistencia mecánica a los tejidos.', 'Conectan el citoesqueleto (filamentos intermedios) con otras células o con la matriz extracelular.'], explanation: 'Será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Uniones celulares de anclaje',
  steps: [
    { id: 'observe', title: 'Observar la placa de piel fina y gruesa', instruction: 'Observa la placa de tejido de piel fina y la de piel gruesa en el microscopio.', hint: 'Elige las placas y enfoca.', actions: ['slide:thin', 'slide:thick', 'obj-10', 'focus:10'], success: 'Placas observadas.' },
    { id: 'identify', title: 'Identificar componentes y uniones', instruction: 'Identifica los componentes de la piel y la ubicación de las uniones celulares.', hint: 'Selecciona una etiqueta y pulsa la zona del esquema.', actions: SPOTS.map((s) => `identify:${s.id}`), success: 'Estructuras identificadas.' },
    { id: 'proteins', title: 'Ubicar las proteínas', instruction: 'Ubica las proteínas que participan en las uniones celulares.', hint: 'Arrastra cada proteína a su unión.', actions: ['protein:cadherin', 'protein:integrin'], success: 'Proteínas ubicadas.' },
  ],
  cards: [
    { id: 'slide:thin', label: 'Observar la placa de piel fina', group: 'Placas' },
    { id: 'slide:thick', label: 'Observar la placa de piel gruesa', group: 'Placas' },
  ],
  distractors: [
    { id: 'identify-wrong', label: 'Señalar una zona al azar', group: 'Placas', feedback: 'Esa zona no corresponde a esa estructura.' },
    { id: 'protein-wrong', label: 'Asignar una proteína sin revisar su función', group: 'Placas', feedback: 'Esa proteína no corresponde a esa unión.' },
  ],
  requires: {
    'slide:thick': { needs: 'slide:thin', message: 'Observa primero la placa de piel fina.' },
    'focus:10': { needs: 'obj-10', message: 'Primero usa el objetivo de 10×.' },
  },
  Extra: Extra9,
  quiz,
  materialsPanel: [
    { id: 'tubes', label: 'Microtubos de 1,5 mL', description: 'Insumo consumible.', kind: 'material' },
    { id: 'slides', label: 'Placas histológicas preparadas de piel (15)', description: 'No consumible.', kind: 'material' },
    { id: 'mic', label: 'Microscopio (15)', description: 'Equipo.', kind: 'equipment' },
  ],
  referenceTable: [{ title: 'Uniones de anclaje (ficha)', rows: [{ label: 'Desmosomas', value: 'Unen células entre sí; cadherinas; filamentos intermedios' }, { label: 'Hemidesmosomas', value: 'Fijan la célula a la membrana basal; integrinas' }] }],
  defaultWeights: biologiaWeightsNoResults,
  resultText: 'Uniones de anclaje identificadas en el esquema y proteínas ubicadas.',
  closing: 'Se observaron placas de piel y se identificaron desmosomas, hemidesmosomas y sus proteínas.',
})
