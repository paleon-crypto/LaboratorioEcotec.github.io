/** Biología Celular y Molecular – Práctica 8: Ósmosis en eritrocitos. */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import { biologiaMeta, biologiaWeightsNoResults, SIM_NOTE_BIO } from '../biologia'
import Extra8 from './Extra'

const meta = biologiaMeta(8, '8 (sin número en la ficha)', '25/06/2025', {
  title: 'Ósmosis en eritrocitos',
  objective: 'Observar y analizar los efectos de diferentes soluciones (hipotónica, isotónica e hipertónica) sobre la morfología de los eritrocitos, para comprender el proceso de ósmosis y su impacto en las células.',
  learningOutcomes: ['Comprender cómo se mueven los líquidos en el compartimento extracelular en relación con la célula.', 'Adquirir destrezas y habilidades en el laboratorio.'],
  difficulty: 'Intermedia',
  theory: 'La ósmosis es el paso del agua a través de una membrana semipermeable desde una solución de menor concentración de solutos hacia una de mayor concentración. En una solución hipotónica, el agua entra a la célula causando hinchazón e incluso hemólisis; en una isotónica no hay cambio en el volumen celular; y en una hipertónica el agua sale de la célula provocando su deshidratación y crenación.',
  materials: ['Placas portaobjeto (20)', 'Placas cubreobjeto (20)', 'Puntas para micropipetas de 20 µL (20)', 'Suero fisiológico', 'Agua destilada', 'Sal (1 g)', 'Alcohol y algodón', 'Lanceta', 'Palillo de dientes', 'Vasos de precipitación de 10 mL'],
  equipment: ['Microscopio (15)', 'Micropipetas (3)', 'Balanza (1)'],
  safetyNotes: ['Uso adecuado de muestras biológicas y desinfección posterior.', 'Manipulación cuidadosa de materiales de vidrio y observación al microscopio.'],
  evaluationCriteria: ['Actitud: asistencia, puntualidad, presentación personal, liderazgo.', 'Habilidad y desempeño: planificación, ejecución, iniciativa, precaución.', 'Capacidad técnica/conocimiento: aplicación práctica y teórica, seguimiento de instrucciones.', 'Campo profesional: empleo de normas de bioseguridad y técnicas adecuadas.'],
  bibliography: ['Fernández Garza NE. Manual de laboratorio de fisiología. McGraw Hill Medical. 6.ª ed.', 'Derrickson. Fisiología humana. Panamericana. pp. 137-140.'],
  validated: false,
  validationNotes: [
    SIM_NOTE_BIO,
    'La ficha no lleva número de práctica en este apartado: se asigna 8 por el orden.',
    'Es una simulación: no se realiza punción real.',
    'La ficha pide un taller de sueroterapia basado en un artículo científico (Actividad 5) y el informe: se evalúan en la pregunta abierta.',
    'La ficha escribe «hipotónicas» dos veces en el informe (probablemente «hipertónicas»); se interpreta como hipotónica, isotónica e hipertónica.',
    'El banco de preguntas fue redactado a partir de la ficha: pendiente de revisión docente.',
  ],
})

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: 'En una solución hipotónica, los eritrocitos…', options: [{ id: 'a', text: 'Se hinchan y pueden romperse (hemólisis)' }, { id: 'b', text: 'Se arrugan (crenación)' }, { id: 'c', text: 'No cambian' }, { id: 'd', text: 'Se dividen' }], correct: 'a', explanation: 'El agua entra a la célula.' },
    { id: 'c2', type: 'choice', prompt: 'En una solución hipertónica, los eritrocitos…', options: [{ id: 'a', text: 'Pierden agua y se arrugan (crenación)' }, { id: 'b', text: 'Se hinchan' }, { id: 'c', text: 'Mantienen su forma' }, { id: 'd', text: 'Se rompen' }], correct: 'a', explanation: 'El agua sale de la célula.' },
    { id: 'c3', type: 'choice', prompt: '¿Cómo se prepara la solución hipertónica?', options: [{ id: 'a', text: '5 mL de suero fisiológico disueltos con 1 g de sal' }, { id: 'b', text: '5 mL de agua destilada' }, { id: 'c', text: '5 mL de suero fisiológico solo' }, { id: 'd', text: '10 mL de alcohol' }], correct: 'a', explanation: 'Actividad 1 de la ficha.' },
    { id: 't1', type: 'tf', prompt: 'La solución isotónica se prepara con 5 mL de suero fisiológico.', correct: true, explanation: 'Actividad 1.' },
    { id: 't2', type: 'tf', prompt: 'La ósmosis es el paso del agua desde una solución de mayor a una de menor concentración de solutos.', correct: false, explanation: 'Es de menor a mayor concentración de solutos.' },
    { id: 'o1', type: 'open', prompt: 'Explica cómo se aplica la sueroterapia con soluciones isotónicas, hipotónicas e hipertónicas según lo aprendido en la práctica.', expectedPoints: ['Relación entre la tonicidad de la solución y el movimiento de agua en las células.', 'Importancia clínica: deshidratación, transfusiones, tratamientos intravenosos.'], explanation: 'Taller de la ficha; será revisado por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Ósmosis en eritrocitos',
  steps: [
    { id: 'solutions', title: 'Preparar las soluciones', instruction: 'En vasos de precipitación de 10 mL prepara y rotula las soluciones: hipertónica (5 mL de suero fisiológico con 1 g de sal), hipotónica (5 mL de agua destilada) e isotónica (5 mL de suero fisiológico).', hint: 'Tres soluciones y su rotulado.', actions: ['hiper', 'hipo', 'iso', 'label'], success: 'Soluciones preparadas y rotuladas.' },
    { id: 'slides', title: 'Preparar los portaobjetos y la muestra', instruction: 'Coloca una gota de cada solución en tres portaobjetos rotulados; desinfecta la yema del dedo, extrae la sangre con la lanceta y transfiérela con la micropipeta.', hint: 'Gotas, desinfección, extracción y transferencia.', actions: ['drops', 'disinfect', 'lancet', 'transfer'], success: 'Sangre transferida.' },
    { id: 'mix', title: 'Mezclar y cubrir', instruction: 'Disuelve la muestra en las soluciones con movimientos circulares delicados con un palillo y coloca el cubreobjetos.', hint: 'Mezclar y cubrir.', actions: ['mix', 'coverslip'], success: 'Preparaciones listas.' },
    { id: 'observe', title: 'Observar al microscopio', instruction: 'Observa el proceso en cada solución, enfocando con los objetivos.', hint: 'Cambia de solución en el panel y enfoca.', actions: ['obj-10', 'focus:10', 'obj-40', 'focus:40'], success: 'Imagen nítida.' },
    { id: 'effects', title: 'Explicar las observaciones', instruction: 'Relaciona cada solución con su efecto sobre el eritrocito.', hint: 'Arrastra cada efecto a su solución.', actions: ['effect:swell', 'effect:normal', 'effect:shrink'], success: 'Efectos relacionados.' },
  ],
  cards: [
    { id: 'hiper', label: 'Hipertónica: 5 mL de suero fisiológico + 1 g de sal', group: 'Soluciones' },
    { id: 'hipo', label: 'Hipotónica: 5 mL de agua destilada', group: 'Soluciones' },
    { id: 'iso', label: 'Isotónica: 5 mL de suero fisiológico', group: 'Soluciones' },
    { id: 'label', label: 'Señalar en cada vaso su solución', group: 'Soluciones' },
    { id: 'drops', label: 'Colocar una gota de cada solución en tres portaobjetos rotulados', group: 'Muestra' },
    { id: 'disinfect', label: 'Desinfectar con alcohol y algodón un costado de la yema del dedo', group: 'Muestra' },
    { id: 'lancet', label: 'Extraer la sangre con la lanceta presionando suavemente', group: 'Muestra' },
    { id: 'transfer', label: 'Absorber la sangre con la micropipeta y transferirla', group: 'Muestra' },
    { id: 'mix', label: 'Mezclar con movimientos circulares delicados (palillo)', group: 'Preparación' },
    { id: 'coverslip', label: 'Colocar el cubreobjetos', group: 'Preparación' },
  ],
  distractors: [
    { id: 'effect-wrong', label: 'Asignar un efecto sin observar la forma de las células', group: 'Observación', feedback: 'Ese efecto no corresponde a esa solución.' },
    { id: 'vigorous', label: 'Agitar con fuerza la muestra', group: 'Preparación', feedback: 'Se mezcla de inmediato con delicados movimientos circulares.' },
    { id: 'no-disinfect', label: 'Pinchar sin desinfectar', group: 'Muestra', feedback: 'Se desinfecta con alcohol y algodón antes de extraer la muestra.' },
  ],
  requires: {
    disinfect: { needs: 'drops', message: 'Primero coloca las gotas de cada solución en los portaobjetos.' },
    lancet: { needs: 'disinfect', message: 'Primero desinfecta la zona.' },
    transfer: { needs: 'lancet', message: 'Primero extrae la sangre.' },
    coverslip: { needs: 'mix', message: 'Primero mezcla la muestra con la solución.' },
    'focus:10': { needs: 'obj-10', message: 'Primero usa el objetivo de 10×.' },
    'obj-40': { needs: 'focus:10', message: 'Termina el enfoque a 10×.' },
    'focus:40': { needs: 'obj-40', message: 'Primero gira al objetivo de 40×.' },
  },
  Extra: Extra8,
  quiz,
  materialsPanel: [
    ...['Placas portaobjeto (20)', 'Placas cubreobjeto (20)', 'Puntas para micropipetas 20 µL (20)', 'Suero fisiológico', 'Agua destilada'].map((l, i) => ({ id: `m${i}`, label: l, description: 'Insumo.', kind: 'material' as const })),
    ...['Microscopio (15)', 'Micropipetas (3)', 'Balanza (1)'].map((l, i) => ({ id: `e${i}`, label: l, description: 'Equipo.', kind: 'equipment' as const })),
  ],
  referenceTable: [{ title: 'Soluciones (ficha)', rows: [{ label: 'Hipertónica', value: '5 mL de suero fisiológico + 1 g de sal' }, { label: 'Hipotónica', value: '5 mL de agua destilada' }, { label: 'Isotónica', value: '5 mL de suero fisiológico' }] }],
  defaultWeights: biologiaWeightsNoResults,
  resultText: 'Soluciones preparadas y efectos osmóticos sobre los eritrocitos relacionados.',
  closing: 'Se prepararon las tres soluciones y se relacionó cada una con su efecto sobre la forma de los eritrocitos.',
})
