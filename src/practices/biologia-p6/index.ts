/** Biología Celular y Molecular – Práctica 6: Tinción de Gram. */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import { biologiaMeta, biologiaWeightsNoResults, SIM_NOTE_BIO } from '../biologia'
import Extra6 from './Extra'

const meta = biologiaMeta(6, 6, '11/06/2025', {
  title: 'Tinción de Gram',
  objective: 'Identificar y diferenciar bacterias Gram positivas y Gram negativas mediante la aplicación correcta de la técnica de tinción de Gram, para observar sus características morfológicas y estructurales bajo el microscopio.',
  learningOutcomes: ['Diferenciar algunas especies bacterianas en Gram positivas y Gram negativas.', 'Observar la morfología bacteriana y aprender a distinguir los distintos tipos de agrupaciones.'],
  difficulty: 'Avanzada',
  theory: 'La tinción de Gram es una técnica de tinción diferencial desarrollada por Hans Christian Gram para clasificar bacterias en Gram positivas y Gram negativas según la composición de su pared celular. Las Gram positivas retienen el cristal violeta y aparecen de color morado, debido a su pared gruesa de peptidoglicano. Las Gram negativas, con una pared más delgada y una membrana externa adicional, no retienen este color y se tiñen de rosa o rojo con la safranina.',
  materials: ['Cristal violeta', 'Safranina', 'Alcohol cetona', 'Yodo', 'Fósforos', 'Hisopos (15)', 'Cultivo bacteriano (15)', 'Cajas Petri con agar', 'Mechero', 'Aceite de inmersión'],
  equipment: ['Microscopio (15)', 'Incubadora (1)'],
  safetyNotes: ['Uso adecuado de muestras biológicas y desinfección posterior.', 'Manipulación cuidadosa de Lugol, fucsina, alcohol ácido y cristal violeta.'],
  evaluationCriteria: ['Actitud: asistencia, puntualidad, presentación personal, liderazgo.', 'Habilidad y desempeño: planificación, ejecución, iniciativa, precaución.', 'Capacidad técnica/conocimiento: aplicación práctica y teórica, seguimiento de instrucciones.', 'Campo profesional: empleo de normas de bioseguridad y técnicas adecuadas.'],
  bibliography: ['Forbes B, Sahm D, Weissfeld A. Bailey & Scott. Diagnóstico microbiológico. Panamericana; 2009.', 'Jawetz E, Melnick J, Adelberg A. Medical Microbiology. McGraw-Hill.', 'Koneman E. Diagnóstico microbiológico. Médica Panamericana.'],
  validated: false,
  validationNotes: [
    SIM_NOTE_BIO,
    'Las formas y agrupaciones del campo microscópico (cocos y bacilos) son esquemáticas: la ficha no indica las especies. Pendiente.',
    'El simulador no mide los tiempos (60 s, 30 s) en tiempo real: figuran en cada acción.',
    'La ficha nombra a la vez el fijado con calor o con metanol al 95% (30 s) y el decolorante como alcohol-acetona o alcohol 96°: se presentan como una sola acción cada uno.',
    'La ficha menciona reactivos en «consideraciones» (Lugol, fucsina, alcohol ácido) que no coinciden con los insumos (yodo, safranina, alcohol-cetona).',
    'El banco de preguntas fue redactado a partir de la ficha: pendiente de revisión docente.',
  ],
})

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿De qué color se ven las bacterias Gram positivas?', options: [{ id: 'a', text: 'Morado o violeta' }, { id: 'b', text: 'Rosado o rojo' }, { id: 'c', text: 'Verde' }, { id: 'd', text: 'Incoloro' }], correct: 'a', explanation: 'Retienen el cristal violeta por su pared gruesa de peptidoglicano.' },
    { id: 'c2', type: 'choice', prompt: '¿Con qué se tiñen las Gram negativas?', options: [{ id: 'a', text: 'Safranina' }, { id: 'b', text: 'Cristal violeta' }, { id: 'c', text: 'Yodo' }, { id: 'd', text: 'Azul de metileno' }], correct: 'a', explanation: 'No retienen el violeta y se tiñen de rosa o rojo con la safranina.' },
    { id: 'c3', type: 'choice', prompt: '¿Cuánto tiempo se cubre el frotis con el colorante primario?', options: [{ id: 'a', text: '60 segundos' }, { id: 'b', text: '30 segundos' }, { id: 'c', text: '5 minutos' }, { id: 'd', text: '10 segundos' }], correct: 'a', explanation: 'Paso 3 de la Actividad 2.' },
    { id: 'c4', type: 'choice', prompt: '¿Con qué objetivos se observa el frotis?', options: [{ id: 'a', text: '40× y 100× con aceite de inmersión' }, { id: 'b', text: '4× y 10×' }, { id: 'c', text: 'Solo 4×' }, { id: 'd', text: 'A simple vista' }], correct: 'a', explanation: 'Paso 9.' },
    { id: 't1', type: 'tf', prompt: 'El yodo actúa como mordiente.', correct: true, explanation: 'Paso 5.' },
    { id: 't2', type: 'tf', prompt: 'El decolorante se aplica durante 30 segundos.', correct: true, explanation: 'Paso 6.' },
    { id: 'o1', type: 'open', prompt: 'Escribe los pasos de la tinción de Gram y explica por qué es una tinción diferencial y por qué se usa un colorante primario y uno de contraste.', expectedPoints: ['Frotis, fijación, violeta de genciana 60 s, yodo 60 s, decolorante 30 s, safranina 60 s, secado.', 'Diferencia bacterias según la composición de su pared celular.', 'El colorante de contraste tiñe las bacterias que perdieron el primario.'], explanation: 'Actividad 5 de la ficha; será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  parts: [
    { id: 'cultivo', label: 'Parte 1 · Cultivo', description: 'Etiquetar, sembrar e incubar las cajas Petri.', steps: ['culture'], resultText: 'Cultivo sembrado e incubado a 37 °C durante 24–48 horas.' },
    { id: 'frotis', label: 'Parte 2 · Frotis y fijación', description: 'Preparar el frotis del cultivo y fijarlo.', steps: ['smear'], resultText: 'Frotis preparado y fijado con calor o metanol al 95 %.' },
    { id: 'tincion', label: 'Parte 3 · Tinción', description: 'Tinción diferencial de Gram.', steps: ['stain'], resultText: 'Frotis teñido con la secuencia de Gram y seco.' },
    { id: 'observacion', label: 'Parte 4 · Observación al microscopio', description: 'Observar a 40× y 100× y diferenciar las bacterias.', steps: ['observe', 'classify'], resultText: 'Frotis observado a 40× y 100× y bacterias diferenciadas por su color.' },
  ],
  roundLabel: 'Tinción de Gram',
  steps: [
    { id: 'culture', title: 'Cultivo', instruction: 'Etiqueta las cajas Petri con agar (fecha y nombre), siembra una muestra faríngea e incuba a 37 °C durante 24–48 horas.', hint: 'Tres acciones.', actions: ['label', 'seed', 'incubate'], success: 'Cultivo incubado.' },
    { id: 'smear', title: 'Frotis y fijación', instruction: 'Realiza un frotis del cultivo en el portaobjeto y fíjalo con calor o metanol al 95% (30 segundos).', hint: 'Dos acciones.', actions: ['smear', 'fix'], success: 'Frotis fijado.' },
    { id: 'stain', title: 'Tinción diferencial', instruction: 'Aplica violeta de genciana (60 s), yodo (60 s), decolorante (30 s) y safranina (60 s), enjuagando tras cada reactivo, y seca con suavidad.', hint: 'Respeta el orden y enjuaga después de cada reactivo.', actions: ['cv', 'rinse1', 'iodine', 'rinse2', 'decolor', 'rinse3', 'safranin', 'rinse4', 'dry'], success: 'Frotis teñido y seco.' },
    { id: 'observe', title: 'Observar a 40× y 100×', instruction: 'Observa con el objetivo de 40× y con el de 100× con aceite de inmersión.', hint: 'Coloca el aceite antes de usar 100×.', actions: ['obj-40', 'focus:40', 'oil', 'obj-100', 'focus:100'], success: 'Imagen nítida a 40× y 100×.' },
    { id: 'classify', title: 'Diferenciar las bacterias', instruction: 'Diferencia las bacterias Gram positivas y Gram negativas según su color.', hint: 'Arrastra cada color a su clasificación.', actions: ['classify:violet', 'classify:pink'], success: 'Bacterias diferenciadas.' },
  ],
  cards: [
    { id: 'label', label: 'Etiquetar las cajas Petri (fecha y nombre)', group: 'Cultivo' },
    { id: 'seed', label: 'Sembrar una muestra faríngea en agar sangre y otro agar', group: 'Cultivo' },
    { id: 'incubate', label: 'Incubar a 37 °C durante 24–48 horas', group: 'Cultivo' },
    { id: 'smear', label: 'Realizar un frotis del cultivo en el portaobjeto', group: 'Frotis' },
    { id: 'fix', label: 'Fijar el frotis con calor o metanol al 95% (30 s)', group: 'Frotis' },
    { id: 'cv', label: 'Cubrir con violeta de genciana durante 60 s', group: 'Tinción' },
    { id: 'rinse1', label: 'Enjuagar con agua (tras el violeta)', group: 'Tinción' },
    { id: 'iodine', label: 'Cubrir con yodo (mordiente) durante 60 s', group: 'Tinción' },
    { id: 'rinse2', label: 'Enjuagar con agua (tras el yodo)', group: 'Tinción' },
    { id: 'decolor', label: 'Añadir el decolorante alcohol-acetona durante 30 s', group: 'Tinción' },
    { id: 'rinse3', label: 'Enjuagar con agua (tras el decolorante)', group: 'Tinción' },
    { id: 'safranin', label: 'Aplicar safranina (contraste) durante 60 s', group: 'Tinción' },
    { id: 'rinse4', label: 'Enjuagar con agua (tras la safranina)', group: 'Tinción' },
    { id: 'dry', label: 'Secar con suavidad con toalla de papel', group: 'Tinción' },
    { id: 'oil', label: 'Colocar aceite de inmersión', group: 'Observación' },
  ],
  distractors: [
    { id: 'classify-wrong', label: 'Clasificar sin observar el color', group: 'Observación', feedback: 'Esa clasificación no corresponde al color observado.' },
    { id: 'rub', label: 'Frotar el frotis con toalla de papel', group: 'Tinción', feedback: 'Se seca con suavidad; el frotis podría perderse.' },
    { id: 'jet', label: 'Enjuagar con el chorro directo sobre el frotis', group: 'Tinción', feedback: 'El enjuague debe hacerse con cuidado y por un extremo de la placa, para evitar perder el frotis.' },
  ],
  requires: {
    seed: { needs: 'label', message: 'Primero etiqueta las cajas Petri.' },
    incubate: { needs: 'seed', message: 'Primero siembra la muestra.' },
    fix: { needs: 'smear', message: 'Primero realiza el frotis.' },
    rinse1: { needs: 'cv', message: 'Primero cubre con violeta de genciana.' },
    iodine: { needs: 'rinse1', message: 'Enjuaga antes de aplicar el yodo.' },
    rinse2: { needs: 'iodine', message: 'Primero aplica el yodo.' },
    decolor: { needs: 'rinse2', message: 'Enjuaga tras el yodo antes de decolorar.' },
    rinse3: { needs: 'decolor', message: 'Primero aplica el decolorante.' },
    safranin: { needs: 'rinse3', message: 'Enjuaga tras el decolorante antes de la safranina.' },
    rinse4: { needs: 'safranin', message: 'Primero aplica la safranina.' },
    dry: { needs: 'rinse4', message: 'Enjuaga antes de secar.' },
    'focus:40': { needs: 'obj-40', message: 'Primero usa el objetivo de 40×.' },
    oil: { needs: 'focus:40', message: 'Termina el enfoque a 40× antes del aceite.' },
    'obj-100': { needs: 'oil', message: 'Coloca primero el aceite de inmersión.' },
    'focus:100': { needs: 'obj-100', message: 'Primero gira al objetivo de 100×.' },
  },
  Extra: Extra6,
  quiz,
  materialsPanel: [
    ...['Cristal violeta', 'Safranina', 'Alcohol cetona', 'Yodo', 'Fósforos', 'Hisopos (15)', 'Cultivo bacteriano (15)', 'Mechero', 'Aceite de inmersión'].map((l, i) => ({ id: `m${i}`, label: l, description: 'Insumo.', kind: 'material' as const })),
    { id: 'mic', label: 'Microscopio (15)', description: 'Equipo.', kind: 'equipment' as const },
    { id: 'inc', label: 'Incubadora (1)', description: 'Equipo.', kind: 'equipment' as const },
  ],
  referenceTable: [{ title: 'Tinción de Gram (ficha)', rows: [{ label: 'Violeta de genciana', value: '60 s' }, { label: 'Yodo (mordiente)', value: '60 s' }, { label: 'Decolorante', value: '30 s' }, { label: 'Safranina', value: '60 s' }, { label: 'Gram positiva', value: 'Morada/violeta' }, { label: 'Gram negativa', value: 'Rosada/roja' }] }],
  defaultWeights: biologiaWeightsNoResults,
  resultText: 'Tinción de Gram completada y bacterias diferenciadas por su color.',
  closing: 'Se realizó la tinción de Gram siguiendo el orden de reactivos y se diferenciaron las bacterias Gram positivas y negativas.',
})
