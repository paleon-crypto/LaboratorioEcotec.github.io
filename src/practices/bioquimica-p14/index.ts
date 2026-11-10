/**
 * Bioquímica – Práctica 14 (numerada «9» en la ficha): Vitaminas: propiedades y reacciones de identificación.
 * FUENTE: ficha VAC-FOR-006 (Rev. 01), práctica N°14.
 *
 * Ficha: hidrosolubles (complejo B, C) se disuelven en agua; liposolubles (A, D, E, K) se disuelven en
 * alcohol. No describe colores, olores ni el resultado del yodo con vitamina C: no se inventan.
 */
import { tubePractice } from '../../core/tubeLab'
import type { TubeLabSpec } from '../../core/tubeLab'
import type { InterpretationItem, PracticeMeta, QuizConfig } from '../../core/types'
import { CHAMPE, FACULTY, OMS, RUBRIC, sourceFor } from '../shared'

const meta: PracticeMeta = {
  id: 'bioquimica-p14',
  number: 14,
  title: 'Vitaminas: propiedades y reacciones de identificación',
  subjectId: 'bioquimica',
  careerIds: ['medicina'],
  faculty: FACULTY,
  objective: 'Identificar vitaminas hidrosolubles y liposolubles mediante observación de sus propiedades físicas y reacciones químicas.',
  learningOutcomes: ['Diferencia vitaminas por su solubilidad y comportamiento en pruebas prácticas de laboratorio.'],
  theory:
    'Las vitaminas son compuestos orgánicos esenciales en pequeñas cantidades. Se clasifican según su solubilidad: hidrosolubles (complejo B, C) y liposolubles (A, D, E, K). Su identificación en laboratorio puede realizarse mediante reacciones colorimétricas, cambios de solubilidad y observación física directa.',
  durationMin: 80,
  difficulty: 'Básica',
  materials: ['Solución de vitamina C', 'Solución de vitamina B1 (tiamina)', 'Solución de vitamina A', 'Solución de vitamina E', 'Alcohol etílico', 'Agua destilada', 'Yodo', 'Tubos de ensayo', 'Gradillas', 'Pipetas'],
  equipment: ['Agitador magnético'],
  safetyNotes: ['No ingerir ni inhalar soluciones vitamínicas. Uso de guantes.', 'Etiquetado y manipulación cuidadosa.'],
  evaluationCriteria: RUBRIC,
  bibliography: [CHAMPE, OMS],
  source: sourceFor(14),
  validated: false,
  validationNotes: [
    'La ficha numera esta práctica como «9» en sus datos informativos (el índice la llama 14).',
    'La ficha pide observar color, olor y miscibilidad, pero no describe colores ni olores: no se simulan. Los colores de los tubos son solo ilustrativos.',
    'Con yodo solo se indica «observar reacciones con vitamina C» sin describir el resultado: se muestra «la ficha no especifica la reacción» y el docente indica lo esperado.',
    'La insolubilidad en agua de las liposolubles (A y E) se deriva de que la ficha las clasifica como liposolubles y las disuelve en alcohol.',
    'La prueba en alcohol se aplica solo a las vitaminas liposolubles (A y E), que es lo que la ficha describe.',
    'El procedimiento pide 5 ml de cada muestra y la ficha no precisa cantidades de reactivos.',
  ],
  version: '1.0.0',
}

const hydro = ['vitc', 'vitb1']
const isHydro = (id: string) => hydro.includes(id)
const NA = 'No se realiza esta prueba con esta muestra'

const spec: TubeLabSpec = {
  samples: [
    { id: 'vitc', label: 'Vitamina C', description: 'Solución de vitamina C (5 ml).', base: '#fef9c3' },
    { id: 'vitb1', label: 'Vitamina B1 (tiamina)', description: 'Solución de tiamina (5 ml).', base: '#f1f5f9' },
    { id: 'vita', label: 'Vitamina A', description: 'Solución de vitamina A (5 ml).', base: '#fde68a' },
    { id: 'vite', label: 'Vitamina E', description: 'Solución de vitamina E (5 ml).', base: '#fef3c7' },
  ],
  reagents: [
    { id: 'agua', label: 'Agua destilada', description: 'Para evaluar la miscibilidad en agua.', color: '#bae6fd' },
    { id: 'alcohol', label: 'Alcohol etílico', description: 'Para evaluar la miscibilidad en alcohol (vitaminas liposolubles).', color: '#e2e8f0', targets: ['vita', 'vite'] },
    { id: 'yodo', label: 'Yodo (gotas)', description: 'Para observar la reacción con vitamina C.', color: '#92400e', targets: ['vitc'] },
  ],
  equipment: [],
  rounds: [
    {
      id: 'agua',
      label: 'Miscibilidad en agua',
      description: 'Las hidrosolubles se disuelven en agua.',
      steps: [
        { kind: 'place', id: 'place', title: 'Colocar las soluciones en tubos', instruction: 'Coloca 5 ml de cada solución vitamínica en tubos de ensayo individuales.', hint: 'Usa «Colocar todas» o una por una.', success: 'Soluciones en la gradilla.' },
        { kind: 'add', id: 'agua', reagent: 'agua', title: 'Añadir agua destilada', instruction: 'Añade agua destilada a cada tubo para observar su miscibilidad.', hint: 'Usa «Añadir a todos los tubos» o tubo por tubo.', success: 'Agua añadida.' },
        { kind: 'observe', id: 'observe', title: 'Observar la miscibilidad en agua', instruction: 'Observa qué vitaminas se disuelven en agua.', hint: 'Pulsa «Observar y registrar resultados».', success: 'Observaciones registradas.' },
      ],
      outcome: (id) => (isHydro(id) ? { text: 'Se disuelve en agua (hidrosoluble)', liquid: '#e0f2fe' } : { text: 'No se disuelve en agua (liposoluble)', liquid: '#fde68a', precipitate: '#f59e0b' }),
    },
    {
      id: 'alcohol',
      label: 'Miscibilidad en alcohol',
      description: 'Las liposolubles se disuelven en alcohol.',
      steps: [
        { kind: 'add', id: 'alcohol', reagent: 'alcohol', title: 'Añadir alcohol etílico', instruction: 'Añade alcohol etílico a las vitaminas liposolubles (A y E) para observar su miscibilidad.', hint: 'Usa «Añadir a todos los tubos» o tubo por tubo.', success: 'Alcohol añadido.' },
        { kind: 'observe', id: 'observe', title: 'Observar la miscibilidad en alcohol', instruction: 'Observa si se disuelven en alcohol.', hint: 'Pulsa «Observar y registrar resultados».', success: 'Observaciones registradas.' },
      ],
      outcome: (id) => (isHydro(id) ? { text: NA, liquid: '#f1f5f9' } : { text: 'Se disuelve en alcohol (liposoluble)', liquid: '#fef3c7' }),
    },
    {
      id: 'yodo',
      label: 'Reacción con yodo',
      description: 'Reacción con vitamina C.',
      steps: [
        { kind: 'add', id: 'yodo', reagent: 'yodo', title: 'Añadir gotas de yodo', instruction: 'Añade gotas de yodo para observar la reacción con la vitamina C.', hint: 'Añade el yodo al tubo de vitamina C.', success: 'Yodo añadido.' },
        { kind: 'observe', id: 'observe', title: 'Observar la reacción', instruction: 'Observa y registra la reacción con la vitamina C.', hint: 'Pulsa «Observar y registrar resultados».', success: 'Observación registrada.' },
      ],
      outcome: (id) => (id === 'vitc' ? { text: 'Reacción con yodo observada: la ficha no especifica el resultado esperado (lo indica el docente)', liquid: '#fef9c3' } : { text: NA, liquid: '#f1f5f9' }),
    },
  ],
}

const interpretationItems: InterpretationItem[] = spec.samples.map((s) => ({
  id: s.id,
  prompt: `Según su comportamiento de solubilidad, ¿cómo clasificas la ${s.label.toLowerCase()}?`,
  options: [
    { id: 'hidro', label: 'Hidrosoluble' },
    { id: 'lipo', label: 'Liposoluble' },
  ],
  correct: isHydro(s.id) ? 'hidro' : 'lipo',
  explanation: isHydro(s.id)
    ? 'Se disuelve en agua: las vitaminas del complejo B y la C son hidrosolubles.'
    : 'Se disuelve en alcohol: las vitaminas A, D, E y K son liposolubles.',
}))

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: 'Según la ficha, ¿qué vitaminas son hidrosolubles?', options: [{ id: 'a', text: 'Complejo B y C' }, { id: 'b', text: 'A, D, E y K' }, { id: 'c', text: 'Solo la A' }, { id: 'd', text: 'Solo la E' }], correct: 'a', explanation: 'Hidrosolubles: complejo B y C.' },
    { id: 'c2', type: 'choice', prompt: '¿Cuáles son las vitaminas liposolubles según la ficha?', options: [{ id: 'a', text: 'B y C' }, { id: 'b', text: 'A, D, E y K' }, { id: 'c', text: 'B1 y C' }, { id: 'd', text: 'Todas' }], correct: 'b', explanation: 'Liposolubles: A, D, E y K.' },
    { id: 'c3', type: 'choice', prompt: '¿Con qué vitamina se observa la reacción al añadir gotas de yodo?', options: [{ id: 'a', text: 'Vitamina A' }, { id: 'b', text: 'Vitamina E' }, { id: 'c', text: 'Vitamina C' }, { id: 'd', text: 'Vitamina B1' }], correct: 'c', explanation: 'El paso 3 indica añadir yodo para observar reacciones con vitamina C.' },
    { id: 't1', type: 'tf', prompt: 'Las vitaminas hidrosolubles se disuelven en agua.', correct: true, explanation: 'Así lo indica la interpretación de resultados.' },
    { id: 't2', type: 'tf', prompt: 'Las vitaminas liposolubles se identifican por disolverse en alcohol.', correct: true, explanation: 'Según la ficha, las liposolubles se disolverán en alcohol.' },
    { id: 't3', type: 'tf', prompt: 'Las soluciones vitamínicas pueden ingerirse durante la práctica.', correct: false, explanation: 'La ficha indica no ingerir ni inhalar soluciones vitamínicas.' },
    { id: 'o1', type: 'open', prompt: 'Explica cómo diferenciaste las vitaminas hidrosolubles de las liposolubles en la práctica y relaciona su función con su solubilidad.', expectedPoints: ['Miscibilidad en agua (hidrosolubles).', 'Miscibilidad en alcohol (liposolubles).', 'Relaciona la solubilidad con la función o deficiencias.'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

const practice = tubePractice({
  meta,
  spec,
  quiz,
  interpretationItems,
  referenceTable: [
    {
      title: 'Clasificación (ficha)',
      rows: [
        { label: 'Hidrosolubles', value: 'Complejo B y C: se disuelven en agua' },
        { label: 'Liposolubles', value: 'A, D, E y K: se disuelven en alcohol' },
        { label: 'Yodo', value: 'Reacción con vitamina C (resultado no descrito en la ficha)' },
      ],
    },
  ],
  closing: 'Las vitaminas se diferenciaron por su solubilidad: las hidrosolubles se disolvieron en agua y las liposolubles en alcohol.',
})

export default practice
