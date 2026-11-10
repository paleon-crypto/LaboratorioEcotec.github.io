/** Biología Celular y Molecular – Práctica 5: Células de la mucosa bucal. */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import { biologiaMeta, biologiaWeightsNoResults, SIM_NOTE_BIO } from '../biologia'
import Extra5, { SPOTS } from './Extra'

const meta = biologiaMeta(5, 5, '4/06/2025', {
  title: 'Células de la mucosa bucal',
  objective: 'Observar e identificar las estructuras básicas de las células epiteliales de la mucosa bucal mediante una tinción simple, con el fin de comprender su morfología y adquirir destreza en el uso del microscopio óptico.',
  learningOutcomes: ['Comprender el procedimiento de tinción simple.', 'Distinguir los componentes presentados a través de la observación en el microscopio.', 'Adquirir mayor destreza con la utilización del microscopio.'],
  difficulty: 'Intermedia',
  theory: 'Las células de la mucosa bucal son células epiteliales que recubren el interior de la cavidad oral y cumplen funciones de protección. Son fácilmente accesibles y se obtienen sin procedimientos invasivos. Poseen estructuras básicas como núcleo, citoplasma y membrana plasmática, que pueden observarse con claridad mediante tinción simple.',
  materials: ['Lámina portaobjeto (20)', 'Lámina cubreobjeto (20)', 'Hisopo (20)', 'Mecheros y fósforos (3)', 'Azul de metileno', 'Agua destilada', 'Papel toalla'],
  equipment: ['Microscopio (15)'],
  safetyNotes: ['Uso adecuado de muestras biológicas y desinfección posterior.', 'Manipulación cuidadosa del azul de metileno y de las placas portaobjeto.', 'Fijar con cuidado: no deteriorar las proteínas ni quemar la placa.'],
  evaluationCriteria: ['Actitud: asistencia, puntualidad, presentación personal, liderazgo.', 'Habilidad y desempeño: planificación, ejecución, iniciativa, precaución.', 'Capacidad técnica/conocimiento: aplicación práctica y teórica, seguimiento de instrucciones.', 'Campo profesional: empleo de normas de bioseguridad y técnicas adecuadas.'],
  bibliography: ['De Robertis EMF. Biología celular y molecular. 11.ª ed. Ateneo; Buenos Aires; 1986.'],
  validated: false,
  validationNotes: [
    SIM_NOTE_BIO,
    'Las actividades de informe, observación de placas preparadas (células cancerígenas y espermatozoides) y preguntas abiertas de la ficha no se automatizan: se cubren en la pregunta abierta y por observación del docente.',
    'El simulador no mide los 4–5 minutos de tinción en tiempo real: se registra como una acción.',
    'La ficha menciona «cristal de violeta» en una pregunta pero el reactivo de la práctica es azul de metileno.',
    'El banco de preguntas fue redactado a partir de la ficha: pendiente de revisión docente.',
  ],
})

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Con qué colorante se tiñen las células de la mucosa bucal?', options: [{ id: 'a', text: 'Azul de metileno' }, { id: 'b', text: 'Wright' }, { id: 'c', text: 'Lugol' }, { id: 'd', text: 'Eosina' }], correct: 'a', explanation: 'Insumos de la ficha.' },
    { id: 'c2', type: 'choice', prompt: '¿Cuánto tiempo se tiñe la preparación?', options: [{ id: 'a', text: 'De 4 a 5 minutos' }, { id: 'b', text: '30 segundos' }, { id: 'c', text: '1 hora' }, { id: 'd', text: '20 minutos' }], correct: 'a', explanation: 'Paso 4 de la Actividad 1.' },
    { id: 'c3', type: 'choice', prompt: '¿Cómo se fija la muestra?', options: [{ id: 'a', text: 'Pasándola sobre la llama del mechero (fijación con calor)' }, { id: 'b', text: 'Con alcohol' }, { id: 'c', text: 'Con hielo' }, { id: 'd', text: 'No se fija' }], correct: 'a', explanation: 'Paso 3.' },
    { id: 't1', type: 'tf', prompt: 'El núcleo se ve de color más oscuro y el citoplasma de tono más claro.', correct: true, explanation: 'Interpretación de resultados.' },
    { id: 't2', type: 'tf', prompt: 'Para eliminar el exceso de azul de metileno se usa agua destilada.', correct: true, explanation: 'Paso 4.' },
    { id: 'o1', type: 'open', prompt: '¿Para qué sirve la fijación de la muestra y por qué debe tener cuidado? Indica las medidas de bioseguridad de la práctica.', expectedPoints: ['La fijación con calor mantiene la muestra adherida y conservada.', 'Debe cuidarse para no deteriorar las proteínas ni quemar la placa.', 'Bioseguridad: muestras biológicas, desinfección posterior, manipulación cuidadosa del azul de metileno.'], explanation: 'Pregunta de la Actividad 4; será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Tinción simple de mucosa bucal',
  steps: [
    { id: 'sample', title: 'Obtener el frotis', instruction: 'Frota el interior de la mejilla con un hisopo estéril y extiende lo obtenido por el centro del portaobjetos (frotis).', hint: 'Dos acciones.', actions: ['swab', 'smear'], success: 'Frotis realizado.' },
    { id: 'fix', title: 'Fijar con calor', instruction: 'Pasa la muestra sobre la llama del mechero sin deteriorar las proteínas ni quemar la placa.', hint: 'Fijación con calor.', actions: ['fix'], success: 'Muestra fijada.' },
    { id: 'stain', title: 'Teñir y lavar', instruction: 'Tiñe con azul de metileno de 4 a 5 minutos, elimina los restos con agua destilada (portaobjetos inclinado) y seca con papel toalla.', hint: 'Teñir, lavar y secar, en ese orden.', actions: ['stain', 'rinse', 'dry'], success: 'Preparación teñida y seca.' },
    { id: 'observe', title: 'Observar a 4×, 10×, 40× y 100×', instruction: 'Selecciona el objetivo, ajusta con los mandos macro y micrométrico y enfoca las células en cada aumento.', hint: 'Usa el microscopio: objetivo y deslizador de enfoque.', actions: ['obj-4', 'focus:4', 'obj-10', 'focus:10', 'obj-40', 'focus:40', 'obj-100', 'focus:100'], success: 'Células enfocadas en los cuatro aumentos.' },
    { id: 'identify', title: 'Identificar las estructuras', instruction: 'Distingue los componentes de las células observadas.', hint: 'Selecciona una etiqueta y pulsa la zona del esquema.', actions: SPOTS.map((s) => `identify:${s.id}`), success: 'Estructuras identificadas.' },
    { id: 'prepared', title: 'Placas preparadas', instruction: 'Observa las placas preparadas de laboratorio (células cancerígenas, espermatozoides).', hint: 'Una acción.', actions: ['prepared'], success: 'Placas preparadas observadas.' },
    { id: 'clean', title: 'Limpiar el portaobjetos', instruction: 'Al terminar, limpia el portaobjetos, lávalo y sécalo con un paño suave.', hint: 'Una acción.', actions: ['clean'], success: 'Material limpio.' },
  ],
  cards: [
    { id: 'swab', label: 'Frotar el interior de la mejilla con un hisopo estéril', group: 'Muestra' },
    { id: 'smear', label: 'Depositar y extender la muestra en el portaobjetos (frotis)', group: 'Muestra' },
    { id: 'fix', label: 'Fijar con calor pasando la muestra por la llama', group: 'Tinción' },
    { id: 'stain', label: 'Teñir con azul de metileno de 4 a 5 minutos', group: 'Tinción' },
    { id: 'rinse', label: 'Lavar con agua destilada (portaobjetos inclinado)', group: 'Tinción' },
    { id: 'dry', label: 'Secar con papel toalla', group: 'Tinción' },
    { id: 'prepared', label: 'Observar placas preparadas (células cancerígenas, espermatozoides)', group: 'Observación' },
    { id: 'clean', label: 'Limpiar, lavar y secar el portaobjetos', group: 'Cierre' },
  ],
  distractors: [
    { id: 'burn', label: 'Mantener la placa en la llama hasta secarla', group: 'Tinción', feedback: 'Se debe fijar con cuidado: no deteriorar las proteínas ni quemar la placa.' },
    { id: 'tap-water', label: 'Lavar con cualquier agua sin inclinar la placa', group: 'Tinción', feedback: 'Los restos de azul de metileno se eliminan con agua destilada, con el portaobjetos inclinado, hasta que el agua que cae sea transparente.' },
    { id: 'identify-wrong', label: 'Señalar una estructura al azar', group: 'Observación', feedback: 'Esa zona no corresponde a esa estructura.' },
  ],
  requires: {
    smear: { needs: 'swab', message: 'Primero toma la muestra con el hisopo.' },
    rinse: { needs: 'stain', message: 'Primero tiñe la preparación.' },
    dry: { needs: 'rinse', message: 'Primero lava los restos de colorante.' },
    'focus:4': { needs: 'obj-4', message: 'Primero usa el objetivo de 4×.' },
    'obj-10': { needs: 'focus:4', message: 'Termina el enfoque a 4×.' },
    'focus:10': { needs: 'obj-10', message: 'Primero gira al objetivo de 10×.' },
    'obj-40': { needs: 'focus:10', message: 'Termina el enfoque a 10×.' },
    'focus:40': { needs: 'obj-40', message: 'Primero gira al objetivo de 40×.' },
    'obj-100': { needs: 'focus:40', message: 'Termina el enfoque a 40×.' },
    'focus:100': { needs: 'obj-100', message: 'Primero gira al objetivo de 100×.' },
  },
  Extra: Extra5,
  quiz,
  materialsPanel: [
    ...['Lámina portaobjeto (20)', 'Lámina cubreobjeto (20)', 'Hisopo (20)', 'Mecheros y fósforos (3)', 'Azul de metileno'].map((l, i) => ({ id: `m${i}`, label: l, description: 'Insumo consumible.', kind: 'material' as const })),
    { id: 'mic', label: 'Microscopio (15)', description: 'Equipo.', kind: 'equipment' as const },
  ],
  referenceTable: [{ title: 'Datos de la ficha', rows: [{ label: 'Colorante', value: 'Azul de metileno, 4 a 5 minutos' }, { label: 'Fijación', value: 'Con calor (llama del mechero)' }, { label: 'Lavado', value: 'Agua destilada' }, { label: 'Aumentos', value: '4×, 10×, 40×, 100×' }] }],
  defaultWeights: biologiaWeightsNoResults,
  resultText: 'Tinción simple realizada y estructuras de la célula epitelial identificadas.',
  closing: 'Se preparó y tiñó el frotis de mucosa bucal, se enfocó a cuatro aumentos y se identificaron núcleo, citoplasma y membrana.',
})
