/** Biología Celular y Molecular – Práctica 12: Extracción del ADN. */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import { biologiaMeta, biologiaWeightsNoResults, SIM_NOTE_BIO } from '../biologia'
import Extra12, { PURPOSES } from './Extra'

const meta = biologiaMeta(12, 12, '23/07/2025', {
  title: 'Extracción del ADN',
  objective: 'Extraer ADN de una muestra biológica mediante lisis celular, desnaturalización de proteínas y precipitación con alcohol frío, e interpretar el resultado.',
  learningOutcomes: ['Conocer la técnica de extracción de ADN.', 'Relacionar cada paso con su función (lisis, desnaturalización, precipitación).', 'Interpretar el resultado visible tras la precipitación con alcohol.'],
  difficulty: 'Intermedia',
  theory: 'La extracción de ADN comprende la lisis celular (ruptura de membranas con detergente y sal), la desnaturalización de proteínas (con enzima y calor) y la precipitación del ADN con alcohol frío, donde aparece como una sustancia fibrosa blanca o translúcida.',
  materials: ['Agua destilada estéril', 'Sal (NaCl)', 'Detergente líquido', 'Alcohol 96 % frío', 'Fresas congeladas', 'Ablandador de carne', 'Gasa estéril', 'Puntas', 'Tubos Falcon (20)', 'Microtubos (30)', 'Pipetas Pasteur (30)'],
  equipment: ['Microscopio', 'Centrífuga', 'Baño María', 'Balanza', 'Micropipetas (5)', 'Mortero estéril'],
  safetyNotes: ['Usar guantes, bata y gafas de seguridad.', 'Precaución con muestras biológicas.'],
  evaluationCriteria: ['Actitud: asistencia, puntualidad, presentación personal, liderazgo.', 'Habilidad y desempeño: planificación, ejecución, iniciativa, precaución.', 'Capacidad técnica/conocimiento: aplicación práctica y teórica, seguimiento de instrucciones.', 'Campo profesional: empleo de normas de bioseguridad y técnicas adecuadas.'],
  bibliography: ['Luque J, Herráez A. 2012. Biología molecular e ingeniería genética.', 'Solomon EP, Berg LR, Martin DW. 2013. Biología.'],
  validated: false,
  validationNotes: [
    SIM_NOTE_BIO,
    'La alternativa de centrifugación (6000 rpm, sedimento/sobrenadante) citada en la ficha no se simula: se usa la filtración con gasa.',
    'La ficha indica preferir fruta sobre saliva; el simulador emplea fresas congeladas.',
    'Bibliografía tomada de la ficha: verificar referencia completa con el docente.',
    'El banco de preguntas fue redactado a partir de la ficha: pendiente de revisión docente.',
  ],
})

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Qué contiene el tampón de lisis de la ficha?', options: [{ id: 'a', text: '9 mL de agua destilada, 1 g de sal y 1 mL de detergente líquido' }, { id: 'b', text: 'Solo alcohol' }, { id: 'c', text: 'Agua y azúcar' }, { id: 'd', text: 'Ablandador y alcohol' }], correct: 'a', explanation: 'Procedimiento de la ficha.' },
    { id: 'c2', type: 'choice', prompt: '¿A qué temperatura y tiempo se calienta la mezcla en baño María?', options: [{ id: 'a', text: '60 °C durante 10 minutos' }, { id: 'b', text: '100 °C durante 1 minuto' }, { id: 'c', text: '37 °C durante 2 horas' }, { id: 'd', text: '4 °C durante 10 minutos' }], correct: 'a', explanation: 'Pasos 3–4 de la ficha.' },
    { id: 'c3', type: 'choice', prompt: '¿Cómo se ve el ADN tras la precipitación con alcohol?', options: [{ id: 'a', text: 'Sustancia fibrosa blanca o translúcida' }, { id: 'b', text: 'Líquido azul' }, { id: 'c', text: 'Gas' }, { id: 'd', text: 'Polvo negro' }], correct: 'a', explanation: 'Interpretación de resultados.' },
    { id: 't1', type: 'tf', prompt: 'El etanol se añade lentamente por la pared del tubo.', correct: true, explanation: 'Se forma una capa de alcohol visible.' },
    { id: 't2', type: 'tf', prompt: 'El ADN puede conservarse en etanol frío.', correct: true, explanation: 'Indicado en la ficha.' },
    { id: 'o1', type: 'open', prompt: 'Explica la función de la lisis celular, la desnaturalización de proteínas y la precipitación con alcohol.', expectedPoints: ['La lisis rompe las membranas y libera el ADN.', 'La desnaturalización elimina proteínas.', 'El alcohol frío precipita el ADN visible.'], explanation: 'Será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Extracción de ADN de fresa',
  steps: [
    { id: 'buffer', title: 'Preparar el tampón de lisis', instruction: 'Mezcla 9 mL de agua destilada estéril, 1 g de sal y 1 mL de detergente líquido.', hint: 'Una acción.', actions: ['buffer'], success: 'Tampón de lisis preparado.' },
    { id: 'lysis', title: 'Lisis celular', instruction: 'Macera las fresas congeladas picadas en el mortero estéril con el tampón.', hint: 'Dos acciones.', actions: ['chop', 'macerate'], success: 'Células lisadas.' },
    { id: 'protein', title: 'Desnaturalizar proteínas', instruction: 'Añade 2 g de ablandador de carne en 10 mL de agua estéril al macerado, mezcla en un tubo Falcon y calienta a 60 °C durante 10 minutos.', hint: 'Tres acciones en orden.', actions: ['tenderizer', 'mix', 'waterbath'], success: 'Proteínas desnaturalizadas.' },
    { id: 'clean', title: 'Enfriar y filtrar', instruction: 'Enfría en hielo 10 minutos y filtra a través de gasa estéril a un tubo estéril.', hint: 'Dos acciones.', actions: ['ice', 'filter'], success: 'Extracto filtrado.' },
    { id: 'precip', title: 'Precipitar el ADN', instruction: 'Vierte lentamente 10 mL de etanol frío por la pared del tubo hasta formar una capa de alcohol.', hint: 'Una acción.', actions: ['ethanol'], success: 'ADN visible.' },
    { id: 'purpose', title: 'Interpretar el procedimiento', instruction: 'Relaciona cada paso con su propósito.', hint: 'Lisis, desnaturalización, precipitación.', actions: PURPOSES.map((p) => `purpose:${p.id}`), success: 'Pasos interpretados.' },
  ],
  cards: [
    { id: 'buffer', label: 'Mezclar 9 mL de agua destilada, 1 g de sal y 1 mL de detergente', group: 'Lisis' },
    { id: 'chop', label: 'Picar las fresas congeladas', group: 'Lisis' },
    { id: 'macerate', label: 'Macerar las fresas en mortero estéril con el tampón', group: 'Lisis' },
    { id: 'tenderizer', label: 'Añadir 2 g de ablandador de carne en 10 mL de agua estéril', group: 'Proteínas' },
    { id: 'mix', label: 'Mezclar en un tubo Falcon', group: 'Proteínas' },
    { id: 'waterbath', label: 'Baño María a 60 °C durante 10 min', group: 'Proteínas' },
    { id: 'ice', label: 'Enfriar en hielo durante 10 min', group: 'Purificación' },
    { id: 'filter', label: 'Filtrar con gasa estéril a un tubo estéril', group: 'Purificación' },
    { id: 'ethanol', label: 'Verter 10 mL de etanol frío lentamente por la pared del tubo', group: 'Precipitación' },
  ],
  distractors: [
    { id: 'purpose-wrong', label: 'Asignar un propósito incorrecto a un paso', group: 'Precipitación', feedback: 'Ese paso no cumple esa función.' },
    { id: 'ethanol-fast', label: 'Verter el etanol de golpe y agitar', group: 'Precipitación', feedback: 'El alcohol se añade lentamente por la pared para formar una capa visible.' },
    { id: 'hot', label: 'Calentar el extracto a ebullición', group: 'Proteínas', feedback: 'La ficha indica baño María a 60 °C durante 10 minutos.' },
  ],
  requires: {
    macerate: { needs: 'chop', message: 'Primero pica las fresas.' },
    mix: { needs: 'tenderizer', message: 'Primero añade el ablandador de carne.' },
    waterbath: { needs: 'mix', message: 'Primero mezcla en el tubo Falcon.' },
    filter: { needs: 'ice', message: 'Primero enfría la mezcla en hielo.' },
    ethanol: { needs: 'filter', message: 'Primero filtra el extracto.' },
  },
  Extra: Extra12,
  quiz,
  materialsPanel: [
    ...['Agua destilada estéril', 'Sal (NaCl)', 'Detergente líquido', 'Alcohol 96 %', 'Tubos Falcon (20)'].map((l, i) => ({ id: `m${i}`, label: l, description: 'Insumo.', kind: 'material' as const })),
    ...['Baño María', 'Centrífuga', 'Balanza', 'Micropipetas (5)', 'Microscopio'].map((l, i) => ({ id: `e${i}`, label: l, description: 'Equipo.', kind: 'equipment' as const })),
  ],
  referenceTable: [{ title: 'Parámetros (ficha)', rows: [{ label: 'Tampón', value: '9 mL agua + 1 g sal + 1 mL detergente' }, { label: 'Enzima', value: '2 g ablandador + 10 mL agua' }, { label: 'Baño María', value: '60 °C, 10 min' }, { label: 'Etanol frío', value: '10 mL' }] }],
  defaultWeights: biologiaWeightsNoResults,
  resultText: 'ADN extraído y visible como sustancia fibrosa blanca/translúcida tras la precipitación con etanol.',
  closing: 'Se extrajo ADN de fresa mediante lisis, desnaturalización de proteínas y precipitación con etanol frío.',
})
