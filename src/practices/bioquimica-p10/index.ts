/**
 * Bioquímica – Práctica 10: Identificación de lípidos en muestras biológicas (solubilidad de lípidos).
 * FUENTE: ficha VAC-FOR-006 (Rev. 01), práctica N°10.
 *
 * Ficha: Sudán III → coloración roja en muestras con lípidos; papel filtro → mancha translúcida;
 * las diferencias de solubilidad confirman la naturaleza hidrofóbica de los lípidos.
 */
import { tubePractice } from '../../core/tubeLab'
import type { TubeLabSpec } from '../../core/tubeLab'
import type { InterpretationItem, PracticeMeta, QuizConfig } from '../../core/types'
import { CHAMPE, FACULTY, OMS, RUBRIC, sourceFor } from '../shared'

const meta: PracticeMeta = {
  id: 'bioquimica-p10',
  number: 10,
  title: 'Identificación de lípidos en muestras biológicas',
  subjectId: 'bioquimica',
  careerIds: ['medicina'],
  faculty: FACULTY,
  objective:
    'Identificar lípidos presentes en muestras de alimentos mediante pruebas específicas como la prueba de Sudan III, transparencia y papel filtro.',
  learningOutcomes: [
    'Identifica experimentalmente la presencia de lípidos en diferentes muestras, comprendiendo sus propiedades físicas y químicas básicas.',
    'Identificación de lípidos a través de reacciones cualitativas.',
  ],
  theory:
    'Los lípidos son biomoléculas hidrofóbicas con funciones esenciales como reserva energética, aislamiento térmico y formación de membranas. Las pruebas físicas y químicas permiten su identificación en distintas matrices biológicas.',
  durationMin: 80,
  difficulty: 'Básica',
  materials: ['Mantequilla', 'Aceite', 'Clara de huevo', 'Agua', 'Sudan III', 'Agua destilada', 'Alcohol etílico 96 %', 'Papel filtro', 'Tubos de ensayo y gradillas'],
  equipment: ['Plancha de calentamiento', 'Vasos de precipitación'],
  safetyNotes: [
    'Uso de guantes y gafas al trabajar con alcohol. Manejo responsable de sustancias inflamables.',
    'Supervisión durante el uso de la plancha de calentamiento y la manipulación de Sudan III.',
  ],
  evaluationCriteria: RUBRIC,
  bibliography: [CHAMPE, OMS],
  source: sourceFor(10),
  validated: true,
  validationNotes: [
    'El paso 1 de la ficha lista azúcares (error de copia de la práctica 5): se usaron las muestras del paso 2 (mantequilla, aceite, clara de huevo y agua).',
    'La ficha pide comparar la solubilidad en alcohol y en agua, pero solo indica que confirma la naturaleza hidrofóbica: se simula la prueba con agua y no se simula la de alcohol.',
    'Los resultados de las muestras sin lípidos (clara de huevo y agua) se derivan de la ficha: sin coloración roja ni mancha translúcida.',
    'La mancha en papel filtro se representa sobre el tubo de cada muestra.',
  ],
  version: '1.0.0',
}

const lipids = ['mantequilla', 'aceite']
const isLipid = (id: string) => lipids.includes(id)

const spec: TubeLabSpec = {
  samples: [
    { id: 'mantequilla', label: 'Mantequilla', description: 'Pequeña cantidad de mantequilla.', base: '#fde68a' },
    { id: 'aceite', label: 'Aceite', description: 'Pequeña cantidad de aceite.', base: '#fcd34d' },
    { id: 'clara', label: 'Clara de huevo', description: 'Muestra de clara de huevo.', base: '#fefce8' },
    { id: 'agua', label: 'Agua', description: 'Control.', base: '#e0f2fe' },
  ],
  reagents: [
    { id: 'sudan', label: 'Sudan III', description: 'Colorante que tiñe de rojo las muestras con lípidos.', color: '#dc2626' },
    { id: 'papel', label: 'Papel filtro', description: 'Se aplica una gota de cada muestra.', color: '#f8fafc' },
    { id: 'agua', label: 'Agua destilada', description: 'Para evaluar la solubilidad.', color: '#bae6fd' },
  ],
  equipment: [{ id: 'secar', label: 'Secado', description: 'Dejar secar la gota sobre el papel.', actionLabel: 'Dejar secar' }],
  rounds: [
    {
      id: 'sudan',
      label: 'Prueba de Sudan III',
      description: 'Coloración roja con lípidos.',
      steps: [
        { kind: 'place', id: 'place', title: 'Colocar las muestras en tubos', instruction: 'Coloca pequeñas cantidades de mantequilla, aceite, clara de huevo y agua en tubos separados.', hint: 'Usa «Colocar todas» o una por una.', success: 'Muestras en la gradilla.' },
        { kind: 'add', id: 'sudan', reagent: 'sudan', title: 'Añadir Sudan III', instruction: 'Añade Sudan III a cada tubo.', hint: 'Usa «Añadir a todos los tubos» o tubo por tubo.', success: 'Sudan III añadido.' },
        { kind: 'observe', id: 'observe', title: 'Observar la coloración roja', instruction: 'Observa la coloración roja en las muestras que contienen lípidos.', hint: 'Pulsa «Observar y registrar resultados».', success: 'Observaciones de Sudan III registradas.' },
      ],
      outcome: (id) => (isLipid(id) ? { text: 'Coloración roja: contiene lípidos', liquid: '#dc2626' } : { text: 'Sin coloración roja', liquid: id === 'agua' ? '#e0f2fe' : '#fefce8' }),
    },
    {
      id: 'papel',
      label: 'Prueba del papel filtro',
      description: 'Mancha translúcida.',
      steps: [
        { kind: 'add', id: 'papel', reagent: 'papel', title: 'Aplicar una gota en papel filtro', instruction: 'Aplica una gota de cada muestra sobre papel filtro.', hint: 'Usa «Añadir a todos los tubos» o tubo por tubo.', success: 'Gotas aplicadas.' },
        { kind: 'equip', id: 'dry', equipment: 'secar', title: 'Dejar secar', instruction: 'Deja secar el papel filtro.', hint: 'Pulsa «Dejar secar».', success: 'Papel seco.' },
        { kind: 'observe', id: 'observe', title: 'Observar la mancha translúcida', instruction: 'Observa si se forma una mancha translúcida.', hint: 'Pulsa «Observar y registrar resultados».', success: 'Observaciones del papel filtro registradas.' },
      ],
      outcome: (id) => (isLipid(id) ? { text: 'Mancha translúcida: contiene lípidos', liquid: '#fde68a' } : { text: 'Sin mancha translúcida', liquid: id === 'agua' ? '#e0f2fe' : '#fefce8' }),
    },
    {
      id: 'solub',
      label: 'Solubilidad en agua',
      description: 'Naturaleza hidrofóbica.',
      steps: [
        { kind: 'add', id: 'agua', reagent: 'agua', title: 'Añadir agua a cada muestra', instruction: 'Añade agua a cada muestra para comparar su solubilidad.', hint: 'Usa «Añadir a todos los tubos» o tubo por tubo.', success: 'Agua añadida.' },
        { kind: 'observe', id: 'observe', title: 'Comparar la solubilidad', instruction: 'Observa qué muestras se mezclan con el agua y cuáles no.', hint: 'Pulsa «Observar y registrar resultados».', success: 'Observaciones de solubilidad registradas.' },
      ],
      outcome: (id) =>
        isLipid(id)
          ? { text: 'No se mezcla con el agua (hidrofóbico)', liquid: '#fde68a', precipitate: '#f59e0b' }
          : { text: 'Se mezcla con el agua', liquid: '#e0f2fe' },
    },
  ],
}

const yn = [
  { id: 'si', label: 'Sí contiene lípidos' },
  { id: 'no', label: 'No contiene lípidos' },
]
const interpretationItems: InterpretationItem[] = spec.samples.map((s) => ({
  id: s.id,
  prompt: `Según las pruebas realizadas, ¿contiene lípidos la muestra «${s.label}»?`,
  options: yn,
  correct: isLipid(s.id) ? 'si' : 'no',
  explanation: isLipid(s.id)
    ? 'Coloración roja con Sudan III, mancha translúcida y no se mezcla con el agua: naturaleza hidrofóbica.'
    : 'Sin coloración roja con Sudan III y sin mancha translúcida.',
}))

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Qué coloración da el Sudan III en las muestras que contienen lípidos?', options: [{ id: 'a', text: 'Azul' }, { id: 'b', text: 'Roja' }, { id: 'c', text: 'Violeta' }, { id: 'd', text: 'Verde' }], correct: 'b', explanation: 'La ficha indica coloración roja en muestras con lípidos.' },
    { id: 'c2', type: 'choice', prompt: '¿Qué se observa en el papel filtro con una muestra que contiene lípidos?', options: [{ id: 'a', text: 'Una mancha translúcida' }, { id: 'b', text: 'Una mancha azul' }, { id: 'c', text: 'Ninguna marca' }, { id: 'd', text: 'Un precipitado rojo' }], correct: 'a', explanation: 'Las muestras con lípidos forman manchas translúcidas en papel filtro.' },
    { id: 'c3', type: 'choice', prompt: 'Según la fundamentación teórica, los lípidos son biomoléculas:', options: [{ id: 'a', text: 'Hidrofílicas' }, { id: 'b', text: 'Hidrofóbicas' }, { id: 'c', text: 'Gaseosas' }, { id: 'd', text: 'Siempre solubles en agua' }], correct: 'b', explanation: 'Los lípidos son biomoléculas hidrofóbicas.' },
    { id: 't1', type: 'tf', prompt: 'Los lípidos cumplen funciones de reserva energética y formación de membranas.', correct: true, explanation: 'Está indicado en la fundamentación teórica de la ficha.' },
    { id: 't2', type: 'tf', prompt: 'Las diferencias de solubilidad ayudan a confirmar la naturaleza hidrofóbica de los lípidos.', correct: true, explanation: 'Así lo indica la interpretación de resultados.' },
    { id: 't3', type: 'tf', prompt: 'Al trabajar con alcohol no es necesario tomar precauciones.', correct: false, explanation: 'La ficha indica usar guantes y gafas y manejar con responsabilidad sustancias inflamables.' },
    { id: 'o1', type: 'open', prompt: 'Describe cómo identificarías si una muestra contiene lípidos usando las pruebas de la práctica.', expectedPoints: ['Coloración roja con Sudan III.', 'Mancha translúcida en papel filtro.', 'Comportamiento hidrofóbico frente al agua.'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

const practice = tubePractice({
  meta,
  spec,
  quiz,
  interpretationItems,
  referenceTable: [
    {
      title: 'Resultados esperados',
      rows: [
        { label: 'Sudan III', value: 'Coloración roja en muestras con lípidos' },
        { label: 'Papel filtro', value: 'Mancha translúcida' },
        { label: 'Solubilidad', value: 'Los lípidos son hidrofóbicos' },
      ],
    },
  ],
  closing: 'Los resultados confirman la naturaleza hidrofóbica de los lípidos.',
})

export default practice
