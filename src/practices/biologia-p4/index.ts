/** Biología Celular y Molecular – Práctica 4: Visualización de células vegetales. */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import { biologiaMeta, biologiaWeightsNoResults, SIM_NOTE_BIO } from '../biologia'
import Extra4, { SPOTS } from './Extra'

const meta = biologiaMeta(4, 1, '28/05/2025', {
  title: 'Visualización de células vegetales',
  objective: 'Observar células vegetales de tomate, frutas o hojas al microscopio, usando correctamente el microscopio óptico, identificar organelos como el núcleo, cromoplastos y la pared celular, y adquirir destreza en la preparación de muestras microscópicas.',
  learningOutcomes: ['Identificar las características de las células vegetales.', 'Adquirir destrezas en la preparación de muestras microscópicas.', 'Utilizar apropiadamente el microscopio.'],
  difficulty: 'Intermedia',
  theory: 'Las células vegetales tienen una pared celular rígida, cloroplastos para la fotosíntesis y una vacuola central que mantiene la turgencia. Observarlas al microscopio permite identificar estructuras clave como el núcleo y los cromoplastos, facilitando el entendimiento de sus funciones.',
  materials: ['Placa portaobjeto (20)', 'Placa cubreobjeto (20)', 'Bisturíes (3)', 'Vidrio de reloj (3)', 'Fruta (tomate, frutilla, etc.)', 'Agua'],
  equipment: ['Microscopio óptico (15)'],
  safetyNotes: ['Lavado de manos, uso de guantes y materiales biodegradables.', 'Manejo del bisturí con precaución al realizar los cortes.', 'Eliminación segura de las muestras en el recipiente cortopunzante.'],
  evaluationCriteria: ['Actitud: asistencia, puntualidad, presentación personal, liderazgo.', 'Habilidad y desempeño: planificación, ejecución, iniciativa, precaución.', 'Capacidad técnica/conocimiento: aplicación práctica y teórica, seguimiento de instrucciones.', 'Campo profesional: empleo de normas de bioseguridad y técnicas adecuadas.'],
  bibliography: ['Otegui M, Totaro ME. Atlas de histología vegetal. Editorial Universitaria de Misiones. Colección Cuadernos de Cátedra; 2007.'],
  validated: false,
  validationNotes: [
    SIM_NOTE_BIO,
    'La ficha incluye actividades de informe y de comparación (células vegetales, animales y procariotas) que no se pueden automatizar: se evalúan en la pregunta abierta del cuestionario.',
    'La ficha no da los aumentos finales de la observación más allá de 4×, 10× y 40×.',
    'Numeración: la ficha rotula esta práctica como N°1; se numera 4 por su orden.',
    'El banco de preguntas fue redactado a partir de la ficha: pendiente de revisión docente.',
  ],
})

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Qué estructuras identifica la práctica en la célula vegetal del mesocarpio?', options: [{ id: 'a', text: 'Núcleo, cromoplastos y pared celular' }, { id: 'b', text: 'Solo ribosomas' }, { id: 'c', text: 'Flagelos' }, { id: 'd', text: 'Centriolos' }], correct: 'a', explanation: 'Objetivo de la práctica.' },
    { id: 'c2', type: 'choice', prompt: '¿Qué mantiene la turgencia de la célula vegetal?', options: [{ id: 'a', text: 'La vacuola central' }, { id: 'b', text: 'El núcleo' }, { id: 'c', text: 'El cromoplasto' }, { id: 'd', text: 'La membrana nuclear' }], correct: 'a', explanation: 'Fundamentación teórica.' },
    { id: 'c3', type: 'choice', prompt: '¿Con qué objetivo se enfoca primero la muestra?', options: [{ id: 'a', text: '4×, con el macrométrico y luego con el micrométrico' }, { id: 'b', text: '40× directamente' }, { id: 'c', text: '100× con aceite' }, { id: 'd', text: 'Sin objetivo' }], correct: 'a', explanation: 'Paso 9 de la Actividad 1.' },
    { id: 't1', type: 'tf', prompt: 'Los cloroplastos se observan en hojas y los cromoplastos en frutas.', correct: true, explanation: 'Interpretación de resultados de la ficha.' },
    { id: 't2', type: 'tf', prompt: 'Las muestras se eliminan en la basura común.', correct: false, explanation: 'Eliminación segura de las muestras en el cortopunzante.' },
    { id: 'o1', type: 'open', prompt: 'Escribe las diferencias entre células vegetales, células animales y organismos procariotas.', expectedPoints: ['Las células vegetales tienen pared celular, cloroplastos y vacuola central.', 'Las animales carecen de pared celular y cloroplastos.', 'Los procariotas no tienen núcleo definido.'], explanation: 'Actividad 4 de la ficha; será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Células vegetales',
  steps: [
    { id: 'prep', title: 'Preparar la placa con mesocarpio', instruction: 'Corta el tomate para exponer la pulpa, raspa la pulpa, colócala en el portaobjeto con una gota de agua y cubre con el cubreobjeto.', hint: 'Sigue el orden de las acciones del grupo Preparación.', actions: ['cut', 'scrape', 'sample', 'water', 'coverslip'], success: 'Placa preparada.' },
    { id: 'mount', title: 'Montar en el microscopio', instruction: 'Coloca la placa en la platina sujetándola con las pinzas y ubica la muestra en el campo de luz.', hint: 'Dos acciones.', actions: ['stage', 'light'], success: 'Muestra en el campo de luz.' },
    { id: 'focus', title: 'Enfocar a 4×, 10× y 40×', instruction: 'Enfoca la muestra a 4× con el macrométrico y luego con el micrométrico; después a 10× y 40×.', hint: 'Usa el microscopio: objetivo y deslizador de enfoque.', actions: ['obj-4', 'focus:4', 'obj-10', 'focus:10', 'obj-40', 'focus:40'], success: 'Imagen nítida en los tres objetivos.' },
    { id: 'identify', title: 'Identificar los organelos', instruction: 'Identifica los organelos y estructuras visibles de la célula vegetal.', hint: 'Selecciona una etiqueta y pulsa la zona del esquema.', actions: SPOTS.map((s) => `identify:${s.id}`), success: 'Estructuras identificadas.' },
    { id: 'dispose', title: 'Eliminar la muestra', instruction: 'Elimina de forma segura la muestra y el material cortante.', hint: 'Cortopunzantes en su recipiente.', actions: ['dispose'], success: 'Material eliminado.' },
  ],
  cards: [
    { id: 'cut', label: 'Corte transversal para exponer la pulpa', group: 'Preparación' },
    { id: 'scrape', label: 'Raspar la pulpa de tomate', group: 'Preparación' },
    { id: 'sample', label: 'Colocar la muestra en el portaobjeto', group: 'Preparación' },
    { id: 'water', label: 'Colocar una gota de agua', group: 'Preparación' },
    { id: 'coverslip', label: 'Colocar el cubreobjetos', group: 'Preparación' },
    { id: 'stage', label: 'Colocar en la platina con las pinzas', group: 'Microscopio' },
    { id: 'light', label: 'Ubicar la muestra en el campo de luz', group: 'Microscopio' },
    { id: 'dispose', label: 'Eliminar la muestra en el cortopunzante', group: 'Cierre' },
  ],
  distractors: [
    { id: 'identify-wrong', label: 'Señalar una estructura sin observar el esquema', group: 'Microscopio', feedback: 'Esa zona no corresponde a esa estructura.' },
    { id: 'bare-hands', label: 'Cortar la fruta sin precaución', group: 'Preparación', feedback: 'El bisturí se maneja con precaución al realizar los cortes.' },
    { id: 'trash', label: 'Tirar el bisturí a la basura común', group: 'Cierre', feedback: 'Eliminación segura de las muestras en el cortopunzante.' },
  ],
  requires: {
    scrape: { needs: 'cut', message: 'Primero haz el corte transversal.' },
    sample: { needs: 'scrape', message: 'Primero raspa la pulpa.' },
    water: { needs: 'sample', message: 'Primero coloca la muestra en el portaobjeto.' },
    coverslip: { needs: 'water', message: 'Primero coloca la gota de agua.' },
    light: { needs: 'stage', message: 'Primero coloca la placa en la platina.' },
    'focus:4': { needs: 'obj-4', message: 'Primero usa el objetivo de 4×.' },
    'obj-10': { needs: 'focus:4', message: 'Termina el enfoque a 4× antes de pasar a 10×.' },
    'focus:10': { needs: 'obj-10', message: 'Primero gira al objetivo de 10×.' },
    'obj-40': { needs: 'focus:10', message: 'Termina el enfoque a 10× antes de pasar a 40×.' },
    'focus:40': { needs: 'obj-40', message: 'Primero gira al objetivo de 40×.' },
  },
  Extra: Extra4,
  quiz,
  materialsPanel: [
    ...['Placa portaobjeto (20)', 'Placa cubreobjeto (20)', 'Bisturíes (3)', 'Vidrio de reloj (3)'].map((l, i) => ({ id: `m${i}`, label: l, description: 'Insumo consumible.', kind: 'material' as const })),
    { id: 'mic', label: 'Microscopio óptico (15)', description: 'Equipo.', kind: 'equipment' as const },
  ],
  referenceTable: [{ title: 'Estructuras (ficha)', rows: [{ label: 'Pared celular', value: 'Rígida' }, { label: 'Cloroplastos', value: 'Fotosíntesis (hojas)' }, { label: 'Cromoplastos', value: 'Se observan en frutas' }, { label: 'Vacuola central', value: 'Mantiene la turgencia' }] }],
  defaultWeights: biologiaWeightsNoResults,
  resultText: 'Placa de mesocarpio preparada, enfocada a 4×, 10× y 40× e identificadas las estructuras.',
  closing: 'Se preparó la placa, se enfocó a tres aumentos y se identificaron los organelos de la célula vegetal.',
})
