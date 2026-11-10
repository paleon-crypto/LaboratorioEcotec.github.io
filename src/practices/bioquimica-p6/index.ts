/**
 * Bioquímica – Práctica 6: Identificación de la hidrólisis del almidón.
 * FUENTE: ficha VAC-FOR-006 (Rev. 01), práctica N°6.
 *
 * Ficha: color negro con Lugol = sin hidrólisis; café = con hidrólisis (acción de la amilasa).
 * La saliva hervida confirma la desnaturalización enzimática (color negro).
 */
import { tubePractice } from '../../core/tubeLab'
import type { TubeLabSpec } from '../../core/tubeLab'
import type { InterpretationItem, PracticeMeta, QuizConfig } from '../../core/types'
import { CHAMPE, FACULTY, OMS, RUBRIC, sourceFor } from '../shared'

const meta: PracticeMeta = {
  id: 'bioquimica-p6',
  number: 6,
  title: 'Identificación de la hidrólisis del almidón',
  subjectId: 'bioquimica',
  careerIds: ['medicina'],
  faculty: FACULTY,
  objective: 'Aplicar diferentes tests bioquímicos para la identificación de carbohidratos complejos o altamente fermentables.',
  learningOutcomes: [
    'Aplica diferentes tests bioquímicos para la identificación de carbohidratos complejos o altamente fermentables.',
    'Aplicación de pruebas bioquímicas básicas.',
    'Comprensión de la acción enzimática sobre carbohidratos complejos.',
  ],
  theory:
    'El almidón es un polisacárido que se hidroliza en azúcares más simples mediante la acción de enzimas como la amilasa. La prueba con Lugol permite detectar la presencia o ausencia de almidón, cambiando su coloración en función de la hidrólisis.',
  durationMin: 80,
  difficulty: 'Intermedia',
  materials: ['Almidón al 5 %', 'Lugol', 'Saliva humana (2 ml)', 'Tubos de ensayo', 'Vasos de precipitado', 'Pipetas y micropipetas', 'Pipeteador', 'Termómetro'],
  equipment: ['Placa calentadora (baño maría)'],
  safetyNotes: [
    'Uso adecuado de muestras biológicas y desinfección posterior.',
    'Manipulación cuidadosa de Lugol y reactivos en caliente.',
  ],
  evaluationCriteria: RUBRIC,
  bibliography: [
    'Asociación Americana de Diabetes (ADA). Valores de referencia y guías clínicas.',
    CHAMPE,
    OMS,
  ],
  source: sourceFor(6),
  validated: true,
  validationNotes: [
    'La ficha no indica el tiempo de incubación a 37 °C: se simula como un solo paso.',
    'El resultado del tubo #1 (agua) se deriva de la ficha: sin enzima no hay hidrólisis (color negro).',
    'Las «3 gotas de cada tubo en tubos con Lugol» se simulan como añadir Lugol al tubo correspondiente.',
  ],
  version: '1.0.0',
}

const spec: TubeLabSpec = {
  sampleNoun: 'Tubo',
  samples: [
    { id: 't1', label: 'Tubo #1 (agua)', description: 'Control sin enzima.', base: '#f1f5f9' },
    { id: 't2', label: 'Tubo #2 (saliva)', description: 'Con amilasa salival.', base: '#f1f5f9' },
    { id: 't3', label: 'Tubo #3 (saliva hervida)', description: 'Con la saliva hervida 10 minutos.', base: '#f1f5f9' },
  ],
  reagents: [
    { id: 'almidon', label: 'Almidón al 5 %', description: 'Se añade 1 ml a cada tubo.', color: '#e2e8f0' },
    { id: 'agua', label: 'Agua', description: 'Reactivo del tubo #1.', color: '#bae6fd', targets: ['t1'] },
    { id: 'saliva', label: 'Saliva humana', description: 'Reactivo del tubo #2.', color: '#fef3c7', targets: ['t2'] },
    { id: 'salivaH', label: 'Saliva hervida', description: 'Reactivo del tubo #3 (tras hervirla).', color: '#fde68a', targets: ['t3'] },
    { id: 'lugol', label: 'Lugol', description: 'Se colocan 3 gotas de cada tubo en tubos con Lugol.', color: '#92400e' },
  ],
  equipment: [
    { id: 'hervir', label: 'Baño maría (hervir saliva)', description: 'Hervir 2 ml de saliva durante 10 minutos.', actionLabel: 'Hervir la saliva 10 min en baño maría' },
    { id: 'incubar', label: 'Incubación a 37 °C', description: 'En la mano o en baño maría a 37 °C.', actionLabel: 'Mantener los tubos a 37 °C' },
  ],
  rounds: [
    {
      id: 'hidrolisis',
      label: 'Hidrólisis del almidón con amilasa salival',
      description: 'Tubos con agua, saliva y saliva hervida.',
      steps: [
        { kind: 'place', id: 'place', title: 'Preparar y rotular los tubos', instruction: 'Rotula y coloca los tubos #1 (agua), #2 (saliva) y #3 (saliva hervida).', hint: 'Usa «Colocar todas» o colócalos uno por uno.', success: 'Tubos rotulados y colocados.' },
        { kind: 'equip', id: 'boil', equipment: 'hervir', title: 'Hervir la saliva', instruction: 'Hierve 2 ml de saliva humana durante 10 minutos en baño maría.', hint: 'Pulsa «Hervir la saliva 10 min en baño maría». La saliva hervida será el reactivo del tubo #3.', success: 'Saliva hervida lista.' },
        { kind: 'add', id: 'starch', reagent: 'almidon', title: 'Añadir almidón a cada tubo', instruction: 'Añade 1 ml de almidón al 5 % a cada tubo.', hint: 'Usa «Añadir a todos los tubos».', success: 'Almidón añadido.' },
        { kind: 'add', id: 'react', reagent: ['agua', 'saliva', 'salivaH'], title: 'Añadir el reactivo correspondiente', instruction: 'Añade 1 ml del reactivo correspondiente a cada tubo: agua al #1, saliva al #2 y saliva hervida al #3. Mezcla.', hint: 'Cada reactivo solo corresponde a su tubo.', success: 'Reactivos añadidos.' },
        { kind: 'equip', id: 'incubate', equipment: 'incubar', title: 'Mantener a 37 °C', instruction: 'Mantén los tubos en la mano o en baño maría a 37 °C.', hint: 'Pulsa «Mantener los tubos a 37 °C».', success: 'Incubación completada.' },
        { kind: 'add', id: 'lugol', reagent: 'lugol', title: 'Probar con Lugol', instruction: 'Toma 3 gotas de cada tubo y colócalas en tubos que contienen Lugol. Mezcla.', hint: 'Usa «Añadir a todos los tubos» (Lugol).', success: 'Gotas probadas con Lugol.' },
        { kind: 'observe', id: 'observe', title: 'Observar el cambio de coloración', instruction: 'Observa: negro (sin hidrólisis) o café (con hidrólisis).', hint: 'Pulsa «Observar y registrar resultados».', success: 'Observaciones registradas.' },
      ],
      outcome: (id) =>
        id === 't2'
          ? { text: 'Color café: hay hidrólisis (acción de la amilasa)', liquid: '#92400e' }
          : id === 't3'
            ? { text: 'Color negro: sin hidrólisis (enzima desnaturalizada)', liquid: '#111827' }
            : { text: 'Color negro: sin hidrólisis', liquid: '#111827' },
    },
  ],
}

const yn = [
  { id: 'si', label: 'Sí hubo hidrólisis (color café)' },
  { id: 'no', label: 'No hubo hidrólisis (color negro)' },
]
const interpretationItems: InterpretationItem[] = [
  { id: 't1', prompt: '¿Hubo hidrólisis del almidón en el tubo #1 (agua)?', options: yn, correct: 'no', explanation: 'Sin enzima no hay hidrólisis: el Lugol se mantiene en color negro.' },
  { id: 't2', prompt: '¿Hubo hidrólisis del almidón en el tubo #2 (saliva)?', options: yn, correct: 'si', explanation: 'El color café indica actividad enzimática de la amilasa sobre el almidón.' },
  { id: 't3', prompt: '¿Hubo hidrólisis del almidón en el tubo #3 (saliva hervida)?', options: yn, correct: 'no', explanation: 'La ausencia de reacción (color negro) con saliva hervida confirma la desnaturalización enzimática.' },
]

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: 'Según la ficha, ¿qué indica el color café con Lugol?', options: [{ id: 'a', text: 'Presencia de almidón sin hidrolizar' }, { id: 'b', text: 'Hidrólisis del almidón (actividad de la amilasa)' }, { id: 'c', text: 'Presencia de proteínas' }, { id: 'd', text: 'Error en la técnica' }], correct: 'b', explanation: 'El cambio a café indica actividad enzimática de la amilasa sobre el almidón.' },
    { id: 'c2', type: 'choice', prompt: '¿Qué enzima actúa sobre el almidón en esta práctica?', options: [{ id: 'a', text: 'Catalasa' }, { id: 'b', text: 'Amilasa salival' }, { id: 'c', text: 'Lipasa' }, { id: 'd', text: 'Proteasa' }], correct: 'b', explanation: 'La práctica observa la acción de la amilasa salival sobre el almidón.' },
    { id: 'c3', type: 'choice', prompt: '¿Qué se hace con la saliva del tubo #3?', options: [{ id: 'a', text: 'Se hierve en baño maría durante 10 minutos' }, { id: 'b', text: 'Se congela' }, { id: 'c', text: 'Se diluye con Lugol' }, { id: 'd', text: 'Se usa sin tratamiento' }], correct: 'a', explanation: 'Se hierven 2 ml de saliva durante 10 minutos para desnaturalizar la enzima.' },
    { id: 't1', type: 'tf', prompt: 'El color negro con Lugol indica que no hubo hidrólisis del almidón.', correct: true, explanation: 'Negro = sin hidrólisis; café = con hidrólisis.' },
    { id: 't2', type: 'tf', prompt: 'La saliva hervida mantiene su actividad enzimática.', correct: false, explanation: 'La ausencia de reacción con saliva hervida confirma la desnaturalización enzimática.' },
    { id: 't3', type: 'tf', prompt: 'Se recomienda manipular con cuidado el Lugol y los reactivos en caliente.', correct: true, explanation: 'Está indicado en el manejo de materiales y reactivos de la ficha.' },
    { id: 'o1', type: 'open', prompt: 'Explica por qué el tubo con saliva hervida sirve como control en esta práctica.', expectedPoints: ['La ebullición desnaturaliza la amilasa.', 'Sin enzima activa no hay hidrólisis y el Lugol permanece negro.', 'Confirma que el cambio observado se debe a la actividad enzimática.'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

const practice = tubePractice({
  meta,
  spec,
  quiz,
  interpretationItems,
  referenceTable: [
    {
      title: 'Interpretación con Lugol',
      rows: [
        { label: 'Negro', value: 'Sin hidrólisis' },
        { label: 'Café', value: 'Con hidrólisis (actividad de la amilasa)' },
        { label: 'Saliva hervida', value: 'Sin reacción: desnaturalización enzimática' },
      ],
    },
  ],
  closing: 'La actividad de la amilasa salival se evidencia por el cambio de color del Lugol de negro a café.',
})

export default practice
