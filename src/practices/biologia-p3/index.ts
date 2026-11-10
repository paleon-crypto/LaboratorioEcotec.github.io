/** Biología Celular y Molecular – Práctica 3: Manejo y uso del microscopio óptico. */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import { biologiaMeta, biologiaWeightsNoResults, SIM_NOTE_BIO } from '../biologia'
import Extra3 from './Extra'

const meta = biologiaMeta(3, 1, '21/05/2025', {
  title: 'Manejo y uso del microscopio óptico',
  objective: 'Conocer las partes del microscopio, fundamento y manejo al visualizar tamaños de muestras dentro del instrumento.',
  learningOutcomes: ['Manejar correctamente el microscopio compuesto y observar muestras de forma correcta en el equipo.'],
  difficulty: 'Intermedia',
  theory: 'El microscopio permite observar estructuras pequeñas invisibles a simple vista, como células y microorganismos, mediante lentes que amplían la imagen. Su uso práctico incluye preparar muestras, ajustar aumentos y enfocar para ver detalles claros. Esta práctica ayuda a entender conceptos teóricos y a desarrollar habilidades científicas esenciales para la investigación.',
  materials: ['Algodón (1 rollo)', 'Papel milimetrado (1 hoja)'],
  equipment: ['Microscopio óptico (15)'],
  safetyNotes: ['Uso obligatorio de mandil y guantes.', 'Mirar directamente (no por el ocular) al acercar el objetivo a la preparación.', 'Nunca retirar la preparación con el objetivo de inmersión en posición de observación.'],
  evaluationCriteria: ['Actitud: asistencia, puntualidad, presentación personal, liderazgo.', 'Habilidad y desempeño: planificación, ejecución, iniciativa, precaución.', 'Capacidad técnica/conocimiento: aplicación práctica y teórica, seguimiento de instrucciones.', 'Campo profesional: empleo de normas de bioseguridad y técnicas adecuadas.'],
  bibliography: ['Johnson TR, Case CL. Use and Care of the microscope. Laboratory Experiments in Microbiology. 10th ed. Pearson Education; 2013.', 'Mendía E. El microscopio óptico compuesto. 2005.', 'Cooper GM, Hausman RE. La célula. 5.ª ed. Marbán; 2010.'],
  validated: false,
  validationNotes: [
    SIM_NOTE_BIO,
    'La ficha no indica qué muestra observar: se usa una preparación esquemática de fibras sobre papel milimetrado a partir de los insumos listados (algodón y papel milimetrado).',
    'El procedimiento reproduce los pasos 1–6 de la ficha; el simulador no modela el condensador ni las partes internas del microscopio.',
    'La ficha menciona el objetivo de inmersión (100×) aunque el paso 3 solo cita 4×, 10× y 40×.',
    'Numeración: la ficha rotula esta práctica como N°1; se numera 3 por su orden.',
    'El banco de preguntas fue redactado a partir de la ficha: pendiente de revisión docente.',
  ],
})

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Con qué objetivo se comienza la observación?', options: [{ id: 'a', text: 'El de menor aumento (4×)' }, { id: 'b', text: 'El de inmersión (100×)' }, { id: 'c', text: 'El de 40×' }, { id: 'd', text: 'Cualquiera' }], correct: 'a', explanation: 'Paso 1 y 3 del procedimiento.' },
    { id: 'c2', type: 'choice', prompt: 'Para acercar al máximo el objetivo a la preparación con el macrométrico, debes…', options: [{ id: 'a', text: 'Mirar directamente, no a través del ocular' }, { id: 'b', text: 'Mirar por el ocular' }, { id: 'c', text: 'Cerrar los ojos' }, { id: 'd', text: 'Usar el aceite de inmersión' }], correct: 'a', explanation: 'Se corre el riesgo de incrustar el objetivo en la preparación.' },
    { id: 'c3', type: 'choice', prompt: '¿Con qué tornillo se logra el enfoque fino?', options: [{ id: 'a', text: 'Micrométrico' }, { id: 'b', text: 'Macrométrico' }, { id: 'c', text: 'Revólver' }, { id: 'd', text: 'Condensador' }], correct: 'a', explanation: 'Paso 4.b.' },
    { id: 't1', type: 'tf', prompt: 'Después de poner aceite de inmersión se puede volver a usar el objetivo de 40× sobre esa zona.', correct: false, explanation: 'Se mancharía de aceite (paso 6.h).' },
    { id: 't2', type: 'tf', prompt: 'La preparación puede retirarse con el objetivo de inmersión en posición de observación.', correct: false, explanation: 'Nunca se debe retirar así (paso 6.i).' },
    { id: 'o1', type: 'open', prompt: 'Explica cómo se interpretan los resultados de la observación: qué se compara y qué errores deben reconocerse.', expectedPoints: ['Identificar las estructuras observadas y compararlas con la teoría.', 'Evaluar cómo cambia la imagen con diferentes aumentos.', 'Revisar la calidad de la muestra y el enfoque; reconocer errores y concluir.'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Manejo del microscopio',
  steps: [
    { id: 'epp', title: 'Mandil y guantes', instruction: 'Colócate el mandil y los guantes (uso obligatorio).', hint: 'Dos acciones.', actions: ['epp:mandil', 'epp:guantes'], success: 'Protección lista.' },
    { id: 'setup', title: 'Preparar el microscopio', instruction: 'Coloca el objetivo de menor aumento en posición de empleo, baja la platina por completo y coloca la preparación sujetándola con las pinzas.', hint: 'Tres acciones.', actions: ['lowest-obj', 'stage-down', 'slide'], success: 'Microscopio preparado.' },
    { id: 'focus4', title: 'Enfocar con el objetivo de 4×', instruction: 'Acerca el objetivo mirando directamente; luego, mirando por los oculares, sepáralo lentamente con el macrométrico y afina con el micrométrico.', hint: 'Usa el microscopio: objetivo 4× y deslizador de enfoque.', actions: ['obj-4', 'macro-close', 'macro-away', 'focus:4'], success: 'Imagen nítida a 4×.' },
    { id: 'next', title: 'Pasar al siguiente objetivo', instruction: 'Pasa a 10× y enfoca con el micrométrico; después a 40× y enfoca de nuevo.', hint: 'Cambia el objetivo en el microscopio y ajusta el enfoque fino.', actions: ['obj-10', 'focus:10', 'obj-40', 'focus:40'], success: 'Imagen nítida a 10× y 40×.' },
    { id: 'immersion', title: 'Objetivo de inmersión', instruction: 'Baja la platina, sube el condensador, gira el revólver, coloca una gota mínima de aceite, termina de girar, sube la platina lentamente mirando directamente y enfoca con el micrométrico.', hint: 'Sigue el orden de la ficha (6.a a 6.g).', actions: ['imm-stage-down', 'imm-condenser-up', 'imm-revolver', 'imm-oil', 'imm-rotate', 'imm-raise', 'obj-100', 'focus:100'], success: 'Imagen nítida con inmersión.' },
    { id: 'finish', title: 'Terminar y limpiar', instruction: 'Baja la platina, vuelve al objetivo de menor aumento, retira la preparación y limpia el objetivo con papel para óptica.', hint: 'Cuatro acciones en orden.', actions: ['end-stage-down', 'end-low-obj', 'remove-slide', 'clean'], success: 'Microscopio recogido y limpio.' },
  ],
  cards: [
    { id: 'epp:mandil', label: 'Colocarse el mandil', group: 'Protección' },
    { id: 'epp:guantes', label: 'Colocarse los guantes', group: 'Protección' },
    { id: 'lowest-obj', label: 'Colocar el objetivo de menor aumento', group: 'Preparar' },
    { id: 'stage-down', label: 'Bajar la platina por completo', group: 'Preparar' },
    { id: 'slide', label: 'Colocar la preparación con las pinzas metálicas', group: 'Preparar' },
    { id: 'macro-close', label: 'Acercar el objetivo mirando directamente (macrométrico)', group: 'Enfoque' },
    { id: 'macro-away', label: 'Separar lentamente mirando por los oculares', group: 'Enfoque' },
    { id: 'obj-4', label: 'Comenzar con el objetivo de 4×', group: 'Enfoque' },
    { id: 'imm-stage-down', label: 'Bajar totalmente la platina', group: 'Inmersión' },
    { id: 'imm-condenser-up', label: 'Subir totalmente el condensador', group: 'Inmersión' },
    { id: 'imm-revolver', label: 'Girar el revólver hacia el objetivo de inmersión', group: 'Inmersión' },
    { id: 'imm-oil', label: 'Colocar una gota mínima de aceite de inmersión', group: 'Inmersión' },
    { id: 'imm-rotate', label: 'Terminar de girar suavemente el revólver', group: 'Inmersión' },
    { id: 'imm-raise', label: 'Subir la platina lentamente mirando directamente', group: 'Inmersión' },
    { id: 'end-stage-down', label: 'Bajar la platina al terminar', group: 'Finalizar' },
    { id: 'end-low-obj', label: 'Colocar el objetivo de menor aumento', group: 'Finalizar' },
    { id: 'remove-slide', label: 'Retirar la preparación', group: 'Finalizar' },
    { id: 'clean', label: 'Limpiar el objetivo con papel para óptica', group: 'Finalizar' },
  ],
  distractors: [
    { id: 'eyepiece-close', label: 'Acercar el objetivo mirando por el ocular', group: 'Enfoque', feedback: 'Se corre el riesgo de incrustar el objetivo en la preparación: acércalo mirando directamente.' },
    { id: 'use-40-oil', label: 'Volver a usar el objetivo de 40× sobre la zona con aceite', group: 'Inmersión', feedback: 'El objetivo de 40× se mancharía de aceite.' },
    { id: 'remove-imm', label: 'Retirar la preparación con el objetivo de inmersión en posición', group: 'Finalizar', feedback: 'Nunca se debe retirar con el objetivo de inmersión en posición de observación.' },
  ],
  requires: {
    'macro-away': { needs: 'macro-close', message: 'Primero acerca el objetivo mirando directamente.' },
    'focus:4': { needs: 'macro-away', message: 'Primero separa lentamente el objetivo con el macrométrico.' },
    'focus:10': { needs: 'obj-10', message: 'Primero gira al objetivo de 10×.' },
    'obj-40': { needs: 'focus:10', message: 'Termina el enfoque a 10× antes de pasar a 40×.' },
    'focus:40': { needs: 'obj-40', message: 'Primero gira al objetivo de 40×.' },
    'imm-condenser-up': { needs: 'imm-stage-down', message: 'Primero baja totalmente la platina.' },
    'imm-revolver': { needs: 'imm-condenser-up', message: 'Primero sube el condensador.' },
    'imm-oil': { needs: 'imm-revolver', message: 'Primero gira el revólver hacia el objetivo de inmersión.' },
    'imm-rotate': { needs: 'imm-oil', message: 'Primero coloca la gota de aceite.' },
    'imm-raise': { needs: 'imm-rotate', message: 'Primero termina de girar el revólver.' },
    'obj-100': { needs: 'imm-raise', message: 'Primero sube la platina lentamente hasta que la lente toque la gota.' },
    'focus:100': { needs: 'obj-100', message: 'Primero pon el objetivo de inmersión (100×).' },
    'end-low-obj': { needs: 'end-stage-down', message: 'Primero baja la platina.' },
    'remove-slide': { needs: 'end-low-obj', message: 'Retira la preparación solo con el objetivo de menor aumento.' },
    clean: { needs: 'remove-slide', message: 'Retira primero la preparación.' },
  },
  Extra: Extra3,
  quiz,
  materialsPanel: [
    { id: 'cot', label: 'Algodón (1 rollo)', description: 'Insumo consumible.', kind: 'material' },
    { id: 'mil', label: 'Papel milimetrado (1 hoja)', description: 'Insumo consumible.', kind: 'material' },
    { id: 'mic', label: 'Microscopio óptico (15)', description: 'Equipo.', kind: 'equipment' },
  ],
  referenceTable: [{ title: 'Objetivos citados en la ficha', rows: [{ label: 'Menor aumento', value: '4×' }, { label: 'Intermedios', value: '10× y 40×' }, { label: 'Inmersión', value: 'Con aceite de inmersión (aumento no indicado en la ficha)' }] }],
  defaultWeights: biologiaWeightsNoResults,
  resultText: 'Microscopio manejado según el procedimiento: enfoque con 4×, 10×, 40× y objetivo de inmersión.',
  closing: 'Se enfocó la preparación con los objetivos y se recogió y limpió el microscopio siguiendo la ficha.',
})
