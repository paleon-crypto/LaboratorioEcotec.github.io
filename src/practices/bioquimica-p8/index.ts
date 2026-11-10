/**
 * Bioquímica – Práctica 8: Identificación de proteínas en soluciones biológicas.
 * FUENTE: ficha VAC-FOR-006 (Rev. 01), práctica N°8.
 *
 * Ficha: Biuret → coloración violeta en presencia de proteínas (enlaces peptídicos);
 * Xantoproteica (ácido nítrico + calor) → coloración amarilla con aminoácidos aromáticos.
 */
import { tubePractice } from '../../core/tubeLab'
import type { TubeLabSpec } from '../../core/tubeLab'
import type { InterpretationItem, PracticeMeta, QuizConfig } from '../../core/types'
import { CHAMPE, FACULTY, OMS, RUBRIC, sourceFor } from '../shared'

const meta: PracticeMeta = {
  id: 'bioquimica-p8',
  number: 8,
  title: 'Identificación de proteínas en soluciones biológicas',
  subjectId: 'bioquimica',
  careerIds: ['medicina'],
  faculty: FACULTY,
  objective: 'Identificar proteínas en soluciones mediante la prueba de Biuret y la prueba de Xantoproteica.',
  learningOutcomes: [
    'Identifica la presencia de proteínas en muestras a través de reacciones colorimétricas específicas y fundamenta su análisis.',
    'Identificación de proteínas en muestras comunes mediante reacciones colorimétricas.',
    'Interpretación visual de resultados experimentales.',
  ],
  theory:
    'Las proteínas son polímeros de aminoácidos con funciones estructurales, catalíticas y reguladoras. La prueba de Biuret detecta enlaces peptídicos, generando coloración violeta en presencia de proteínas. La prueba Xantoproteica identifica anillos aromáticos en aminoácidos mediante una coloración amarilla al reaccionar con ácido nítrico.',
  durationMin: 80,
  difficulty: 'Intermedia',
  materials: ['Solución de Biuret', 'Ácido nítrico concentrado', 'Clara de huevo', 'Leche', 'Gelatina sin sabor', 'Agua destilada', 'Tubos de ensayo y gradillas'],
  equipment: ['Plancha de calentamiento', 'Vasos de precipitación'],
  safetyNotes: [
    'Uso de guantes y gafas al trabajar con ácido nítrico.',
    'Control cuidadoso del calentamiento de las muestras.',
  ],
  evaluationCriteria: RUBRIC,
  bibliography: [CHAMPE, OMS],
  source: sourceFor(8),
  validated: false,
  validationNotes: [
    'El paso 1 de la ficha lista azúcares (error de copia de la práctica 5): se usaron las muestras del paso 2 (clara de huevo, leche, gelatina y agua destilada).',
    'La ficha no lista clara de huevo ni leche entre los insumos, aunque el procedimiento las usa.',
    'La ficha no indica qué muestras tienen aminoácidos aromáticos: se asumió que clara de huevo y leche reaccionan (Xantoproteica) y que el agua no. El resultado de la gelatina en Xantoproteica NO está en la ficha y se registra como «no especificado». Confirmar con el docente.',
    'Biuret: se asumió violeta en clara, leche y gelatina (proteínas) y sin coloración en agua destilada.',
  ],
  version: '1.0.0',
}

const proteins = ['clara', 'leche', 'gelatina']
const spec: TubeLabSpec = {
  samples: [
    { id: 'clara', label: 'Clara de huevo', description: 'Muestra de clara de huevo.', base: '#fefce8' },
    { id: 'leche', label: 'Leche', description: 'Muestra de leche.', base: '#f8fafc' },
    { id: 'gelatina', label: 'Gelatina', description: 'Gelatina sin sabor disuelta.', base: '#fef9c3' },
    { id: 'agua', label: 'Agua destilada', description: 'Control sin proteínas.', base: '#e0f2fe' },
  ],
  reagents: [
    { id: 'biuret', label: 'Solución de Biuret', description: 'Detecta enlaces peptídicos (violeta).', color: '#60a5fa' },
    { id: 'hno3', label: 'Ácido nítrico conc.', description: 'Prueba Xantoproteica. Usar guantes y gafas.', color: '#fde68a' },
  ],
  equipment: [{ id: 'plancha', label: 'Plancha de calentamiento', description: 'Calentar con cuidado.', actionLabel: 'Calentar cuidadosamente' }],
  rounds: [
    {
      id: 'biuret',
      label: 'Prueba de Biuret',
      description: 'Enlaces peptídicos.',
      steps: [
        { kind: 'place', id: 'place', title: 'Preparar tubos con las muestras', instruction: 'Prepara tubos de ensayo con clara de huevo, leche, gelatina y agua destilada.', hint: 'Usa «Colocar todas» o una por una.', success: 'Muestras en la gradilla.' },
        { kind: 'add', id: 'biuret', reagent: 'biuret', title: 'Añadir solución de Biuret', instruction: 'Añade solución de Biuret a cada muestra.', hint: 'Usa «Añadir a todos los tubos» o tubo por tubo.', success: 'Biuret añadido.' },
        { kind: 'observe', id: 'observe', title: 'Observar la coloración violeta', instruction: 'Observa la coloración violeta en presencia de proteínas.', hint: 'Pulsa «Observar y registrar resultados».', success: 'Observaciones de Biuret registradas.' },
      ],
      outcome: (id) =>
        proteins.includes(id)
          ? { text: 'Coloración violeta: presencia de proteínas', liquid: '#7e22ce' }
          : { text: 'Sin coloración violeta', liquid: '#e0f2fe' },
    },
    {
      id: 'xanto',
      label: 'Prueba Xantoproteica',
      description: 'Aminoácidos aromáticos.',
      steps: [
        { kind: 'add', id: 'hno3', reagent: 'hno3', title: 'Añadir ácido nítrico', instruction: 'En otros tubos, añade ácido nítrico a las mismas muestras. Usa guantes y gafas.', hint: 'Usa «Añadir a todos los tubos» o tubo por tubo.', success: 'Ácido nítrico añadido.' },
        { kind: 'equip', id: 'heat', equipment: 'plancha', title: 'Calentar cuidadosamente', instruction: 'Calienta cuidadosamente los tubos.', hint: 'Pulsa «Calentar cuidadosamente».', success: 'Tubos calentados.' },
        { kind: 'observe', id: 'observe', title: 'Observar la coloración amarilla', instruction: 'Observa la coloración amarilla en muestras con aminoácidos aromáticos.', hint: 'Pulsa «Observar y registrar resultados».', success: 'Observaciones de Xantoproteica registradas.' },
      ],
      outcome: (id) =>
        id === 'clara' || id === 'leche'
          ? { text: 'Coloración amarilla: aminoácidos aromáticos', liquid: '#facc15' }
          : id === 'gelatina'
            ? { text: 'Resultado no especificado en la ficha', liquid: '#fef9c3' }
            : { text: 'Sin coloración amarilla', liquid: '#e0f2fe' },
    },
  ],
}

const yn = [
  { id: 'si', label: 'Sí' },
  { id: 'no', label: 'No' },
]
const label = (id: string) => spec.samples.find((s) => s.id === id)?.label ?? id
const interpretationItems: InterpretationItem[] = [
  ...['clara', 'leche', 'gelatina', 'agua'].map((id) => ({
    id: `prot-${id}`,
    prompt: `Según la prueba de Biuret, ¿contiene proteínas la muestra «${label(id)}»?`,
    options: yn,
    correct: id === 'agua' ? 'no' : 'si',
    explanation: id === 'agua' ? 'Sin coloración violeta: no hay enlaces peptídicos.' : 'La coloración violeta indica enlaces peptídicos (proteínas).',
  })),
  ...['clara', 'leche', 'agua'].map((id) => ({
    id: `aro-${id}`,
    prompt: `Según la prueba Xantoproteica, ¿presenta aminoácidos aromáticos «${label(id)}»?`,
    options: yn,
    correct: id === 'agua' ? 'no' : 'si',
    explanation: id === 'agua' ? 'Sin coloración amarilla.' : 'La coloración amarilla indica aminoácidos aromáticos.',
  })),
]

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Qué detecta la prueba de Biuret según la ficha?', options: [{ id: 'a', text: 'Enlaces peptídicos' }, { id: 'b', text: 'Azúcares reductores' }, { id: 'c', text: 'Lípidos' }, { id: 'd', text: 'Almidón' }], correct: 'a', explanation: 'La prueba de Biuret detecta enlaces peptídicos, con coloración violeta.' },
    { id: 'c2', type: 'choice', prompt: '¿Qué coloración indica la prueba Xantoproteica positiva?', options: [{ id: 'a', text: 'Violeta' }, { id: 'b', text: 'Amarilla' }, { id: 'c', text: 'Azul' }, { id: 'd', text: 'Roja' }], correct: 'b', explanation: 'La coloración amarilla con ácido nítrico indica anillos aromáticos en aminoácidos.' },
    { id: 'c3', type: 'choice', prompt: '¿Qué equipo de protección exige la ficha al trabajar con ácido nítrico?', options: [{ id: 'a', text: 'Solo mascarilla' }, { id: 'b', text: 'Guantes y gafas' }, { id: 'c', text: 'Ninguno' }, { id: 'd', text: 'Solo gorro' }], correct: 'b', explanation: 'Uso de guantes y gafas al trabajar con ácido nítrico.' },
    { id: 't1', type: 'tf', prompt: 'La prueba de Biuret produce coloración violeta en presencia de proteínas.', correct: true, explanation: 'Así lo indica la fundamentación teórica de la ficha.' },
    { id: 't2', type: 'tf', prompt: 'En la prueba Xantoproteica no es necesario controlar el calentamiento.', correct: false, explanation: 'La ficha indica calentar cuidadosamente y controlar el calentamiento de las muestras.' },
    { id: 't3', type: 'tf', prompt: 'La coloración amarilla de la Xantoproteica indica aminoácidos aromáticos.', correct: true, explanation: 'La prueba identifica anillos aromáticos en aminoácidos.' },
    { id: 'o1', type: 'open', prompt: 'Explica qué diferencia hay entre lo que detectan las pruebas de Biuret y Xantoproteica.', expectedPoints: ['Biuret detecta enlaces peptídicos (violeta).', 'Xantoproteica identifica anillos aromáticos de aminoácidos (amarillo).'], explanation: 'Esta pregunta será revisada por el docente.' },
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
        { label: 'Biuret', value: 'Coloración violeta: enlaces peptídicos (proteínas)' },
        { label: 'Xantoproteica', value: 'Coloración amarilla: aminoácidos aromáticos' },
      ],
    },
  ],
  closing: 'La coloración violeta confirma enlaces peptídicos (Biuret) y la amarilla, aminoácidos aromáticos (Xantoproteica).',
})

export default practice
