/**
 * Bioquímica – Práctica 5: Clasificación de los carbohidratos (identificación cualitativa).
 * FUENTE: ficha VAC-FOR-006 (Rev. 01), práctica N°5.
 *
 * Resultados esperados (ficha): Molisch → anillo violeta en todos los azúcares; Barfoed → rojo
 * ladrillo en monosacáridos; Seliwanoff → rojo intenso en cetosas; Lugol → azul con almidón (polisacáridos).
 * Las muestras sin reacción positiva se muestran «sin» la coloración característica.
 */
import { tubePractice } from '../../core/tubeLab'
import type { TubeLabSpec, TubeOutcome } from '../../core/tubeLab'
import type { InterpretationItem, PracticeMeta, QuizConfig } from '../../core/types'
import { CHAMPE, FACULTY, OMS, RUBRIC, sourceFor } from '../shared'

const meta: PracticeMeta = {
  id: 'bioquimica-p5',
  number: 5,
  title: 'Clasificación de los carbohidratos',
  subjectId: 'bioquimica',
  careerIds: ['medicina'],
  faculty: FACULTY,
  objective:
    'Diferenciar los tipos de carbohidratos mediante pruebas específicas como Molisch, Benedict, Barfoed, Seliwanoff y Lugol.',
  learningOutcomes: [
    'Diferencia y clasifica carbohidratos por tipo estructural según la reacción presentada frente a reactivos bioquímicos específicos.',
    'Identificación experimental de carbohidratos según su estructura química.',
    'Manejo técnico de reactivos químicos de prueba.',
  ],
  theory:
    'Los carbohidratos son biomoléculas fundamentales para el metabolismo energético. Su estructura define su comportamiento frente a pruebas químicas específicas. Las reacciones de Molisch (presencia de carbohidratos), Benedict (azúcares reductores), Barfoed (monosacáridos), Seliwanoff (cetonas) y Lugol (polisacáridos) permiten identificar su tipo mediante observaciones visuales.',
  durationMin: 80,
  difficulty: 'Intermedia',
  materials: [
    'Reactivo de Molisch',
    'Ácido sulfúrico concentrado',
    'Reactivo de Barfoed',
    'Reactivo de Seliwanoff',
    'Lugol',
    'Disoluciones de glucosa, fructosa, lactosa y xilosa al 5 %',
    'Tubos de ensayo y gradillas',
  ],
  equipment: ['Plancha de calentamiento', 'Vaso de precipitación'],
  safetyNotes: [
    'Uso de guantes, bata y gafas de seguridad. Evitar contacto con ácido sulfúrico.',
    'Manipulación cuidadosa de reactivos ácidos y calientes. Supervisión constante del docente.',
  ],
  evaluationCriteria: RUBRIC,
  bibliography: [CHAMPE, OMS],
  source: sourceFor(5),
  validated: true,
  validationNotes: [
    'En la ficha corregida la lista de insumos ya no incluye el almidón (aparece Lugol dos veces: 25 ml y 1000 ml), pero el procedimiento sigue usándolo como muestra: se simula y se pide confirmar su concentración y cantidad.',
    'La ficha pide analizar tónica y tónica light, pero no indica su resultado esperado: se excluyeron de la simulación.',
    'La prueba de Benedict figura en el objetivo pero no en el procedimiento: no se simula.',
    'Los resultados negativos («sin coloración») se derivan de lo descrito para cada tipo de carbohidrato; la ficha solo describe los positivos.',
    'La ficha no indica el tiempo de calentamiento de Seliwanoff ni de Lugol; el de Barfoed (5 min) se simula como un paso.',
    'Clasificación de las muestras: glucosa y xilosa (monosacáridos, aldosas), fructosa (monosacárido, cetosa), lactosa (disacárido), almidón (polisacárido).',
  ],
  version: '1.0.0',
}

const solution = '#dbeafe'
type Kind = 'aldosa' | 'cetosa' | 'disacarido' | 'polisacarido'
const KIND: Record<string, Kind> = { glucosa: 'aldosa', fructosa: 'cetosa', xilosa: 'aldosa', lactosa: 'disacarido', almidon: 'polisacarido' }
const isMono = (id: string) => KIND[id] === 'aldosa' || KIND[id] === 'cetosa'

const base = (id: string) => (id === 'almidon' ? '#f1f5f9' : solution)

const molisch = (id: string): TubeOutcome => ({ text: 'Anillo violeta en la interfase', liquid: base(id), ring: '#7c3aed' })
const barfoed = (id: string): TubeOutcome =>
  isMono(id)
    ? { text: 'Precipitado rojo ladrillo', liquid: '#bfdbfe', precipitate: '#b91c1c' }
    : { text: 'Sin precipitado rojo', liquid: '#bfdbfe' }
const seliwanoff = (id: string): TubeOutcome =>
  KIND[id] === 'cetosa' ? { text: 'Coloración rojo intenso', liquid: '#dc2626' } : { text: 'Sin coloración roja', liquid: '#fde68a' }
const lugol = (id: string): TubeOutcome =>
  id === 'almidon' ? { text: 'Coloración azul', liquid: '#1e3a8a' } : { text: 'Sin coloración azul (color del reactivo)', liquid: '#fcd34d' }

const spec: TubeLabSpec = {
  samples: [
    { id: 'glucosa', label: 'Glucosa 5 %', description: 'Disolución de glucosa al 5 %.', base: solution },
    { id: 'fructosa', label: 'Fructosa 5 %', description: 'Disolución de fructosa al 5 %.', base: solution },
    { id: 'lactosa', label: 'Lactosa 5 %', description: 'Disolución de lactosa al 5 %.', base: solution },
    { id: 'xilosa', label: 'Xilosa 5 %', description: 'Disolución de xilosa al 5 %.', base: solution },
    { id: 'almidon', label: 'Almidón', description: 'Muestra de almidón.', base: '#f1f5f9' },
  ],
  reagents: [
    { id: 'molisch', label: 'Reactivo de Molisch', description: 'Se añaden 5 gotas a cada muestra.', color: '#a78bfa' },
    { id: 'h2so4', label: 'Ácido sulfúrico conc.', description: 'Se añade 1 ml por las paredes del tubo. Evitar el contacto.', color: '#fde68a' },
    { id: 'barfoed', label: 'Reactivo de Barfoed', description: 'Se añade 1 ml a cada muestra y se calienta.', color: '#60a5fa' },
    { id: 'seliwanoff', label: 'Reactivo de Seliwanoff', description: 'Se añade 1 ml a cada muestra y se calienta.', color: '#f87171' },
    { id: 'lugol', label: 'Lugol', description: 'Se añade a las muestras para detectar polisacáridos.', color: '#92400e' },
  ],
  equipment: [{ id: 'plancha', label: 'Plancha de calentamiento', description: 'Para calentar los tubos.', actionLabel: 'Calentar en la plancha' }],
  rounds: [
    {
      id: 'molisch',
      label: 'Prueba de Molisch',
      description: 'Presencia de carbohidratos.',
      steps: [
        { kind: 'place', id: 'place', title: 'Colocar las muestras en tubos', instruction: 'Coloca en tubos de ensayo las muestras de glucosa, fructosa, lactosa y xilosa al 5 % y el almidón.', hint: 'Usa «Colocar todas» o coloca una por una cada muestra.', success: 'Muestras en la gradilla.' },
        { kind: 'add', id: 'molisch', reagent: 'molisch', title: 'Añadir reactivo de Molisch', instruction: 'Añade 5 gotas de reactivo de Molisch a cada muestra.', hint: 'Selecciona el reactivo y pulsa cada tubo, o usa «Añadir a todos los tubos».', success: 'Molisch añadido a todas las muestras.' },
        { kind: 'add', id: 'h2so4', reagent: 'h2so4', title: 'Añadir ácido sulfúrico por las paredes', instruction: 'Añade 1 ml de ácido sulfúrico concentrado por las paredes del tubo. Manipula con precaución.', hint: 'Mismo procedimiento: el ácido se deja resbalar por la pared para formar una interfase.', success: 'Ácido añadido por las paredes.' },
        { kind: 'observe', id: 'observe', title: 'Observar el anillo violeta', instruction: 'Observa la interfase de cada tubo y registra tus observaciones.', hint: 'Pulsa «Observar y registrar resultados».', success: 'Observaciones de Molisch registradas.' },
      ],
      outcome: molisch,
    },
    {
      id: 'barfoed',
      label: 'Prueba de Barfoed',
      description: 'Monosacáridos.',
      steps: [
        { kind: 'add', id: 'barfoed', reagent: 'barfoed', title: 'Añadir reactivo de Barfoed', instruction: 'Añade 1 ml de reactivo de Barfoed a cada muestra.', hint: 'Usa «Añadir a todos los tubos» o tubo por tubo.', success: 'Barfoed añadido.' },
        { kind: 'equip', id: 'heat', equipment: 'plancha', title: 'Calentar durante 5 minutos', instruction: 'Calienta los tubos durante 5 minutos (tiempo simulado).', hint: 'Pulsa «Calentar en la plancha».', success: 'Calentamiento completado.' },
        { kind: 'observe', id: 'observe', title: 'Observar el precipitado rojo', instruction: 'Observa la formación de precipitado rojo.', hint: 'Pulsa «Observar y registrar resultados».', success: 'Observaciones de Barfoed registradas.' },
      ],
      outcome: barfoed,
    },
    {
      id: 'seliwanoff',
      label: 'Prueba de Seliwanoff',
      description: 'Cetosas.',
      steps: [
        { kind: 'add', id: 'seliwanoff', reagent: 'seliwanoff', title: 'Añadir reactivo de Seliwanoff', instruction: 'Añade 1 ml de reactivo de Seliwanoff a cada muestra.', hint: 'Usa «Añadir a todos los tubos» o tubo por tubo.', success: 'Seliwanoff añadido.' },
        { kind: 'equip', id: 'heat', equipment: 'plancha', title: 'Calentar', instruction: 'Calienta los tubos.', hint: 'Pulsa «Calentar en la plancha».', success: 'Tubos calentados.' },
        { kind: 'observe', id: 'observe', title: 'Observar la coloración rojo intenso', instruction: 'Observa la coloración de cada tubo (rojo intenso para cetosas).', hint: 'Pulsa «Observar y registrar resultados».', success: 'Observaciones de Seliwanoff registradas.' },
      ],
      outcome: seliwanoff,
    },
    {
      id: 'lugol',
      label: 'Prueba de Lugol',
      description: 'Polisacáridos.',
      steps: [
        { kind: 'add', id: 'lugol', reagent: 'lugol', title: 'Añadir Lugol', instruction: 'Añade Lugol a las muestras.', hint: 'Usa «Añadir a todos los tubos» o tubo por tubo.', success: 'Lugol añadido.' },
        { kind: 'observe', id: 'observe', title: 'Observar la coloración azul', instruction: 'Observa la coloración de cada tubo (azul para almidón).', hint: 'Pulsa «Observar y registrar resultados».', success: 'Observaciones de Lugol registradas.' },
      ],
      outcome: lugol,
    },
  ],
}

const options = [
  { id: 'aldosa', label: 'Monosacárido (aldosa)' },
  { id: 'cetosa', label: 'Monosacárido (cetosa)' },
  { id: 'disacarido', label: 'Disacárido' },
  { id: 'polisacarido', label: 'Polisacárido' },
]

const why: Record<Kind, string> = {
  aldosa: 'Molisch positivo (carbohidrato), Barfoed positivo (monosacárido) y Seliwanoff negativo (no es cetosa).',
  cetosa: 'Molisch positivo, Barfoed positivo (monosacárido) y Seliwanoff positivo (cetosa).',
  disacarido: 'Molisch positivo (carbohidrato), pero Barfoed y Lugol negativos: no es monosacárido ni almidón.',
  polisacarido: 'Molisch positivo (carbohidrato), Barfoed negativo y Lugol azul (polisacárido).',
}

const interpretationItems: InterpretationItem[] = spec.samples.map((s) => ({
  id: s.id,
  prompt: `Según las reacciones observadas, ¿qué tipo de carbohidrato es «${s.label}»?`,
  options,
  correct: KIND[s.id],
  explanation: why[KIND[s.id]],
}))

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: 'Según la ficha, ¿qué permite identificar la prueba de Molisch?', options: [{ id: 'a', text: 'La presencia de carbohidratos' }, { id: 'b', text: 'Solo monosacáridos' }, { id: 'c', text: 'Solo cetosas' }, { id: 'd', text: 'Solo polisacáridos' }], correct: 'a', explanation: 'La ficha indica Molisch como prueba de presencia de carbohidratos (anillo violeta).' },
    { id: 'c2', type: 'choice', prompt: 'La prueba de Seliwanoff, según la ficha, permite identificar:', options: [{ id: 'a', text: 'Polisacáridos' }, { id: 'b', text: 'Cetosas' }, { id: 'c', text: 'Azúcares no reductores' }, { id: 'd', text: 'Proteínas' }], correct: 'b', explanation: 'Seliwanoff da una coloración rojo intenso con cetosas.' },
    { id: 'c3', type: 'choice', prompt: '¿Qué coloración da el Lugol con el almidón en esta práctica?', options: [{ id: 'a', text: 'Violeta' }, { id: 'b', text: 'Rojo ladrillo' }, { id: 'c', text: 'Azul' }, { id: 'd', text: 'Amarillo' }], correct: 'c', explanation: 'La ficha indica coloración azul con Lugol para almidón (polisacáridos).' },
    { id: 'c4', type: 'choice', prompt: 'Tras añadir el reactivo de Barfoed, ¿qué indica la ficha que se debe hacer?', options: [{ id: 'a', text: 'Enfriar en hielo' }, { id: 'b', text: 'Calentar durante 5 minutos' }, { id: 'c', text: 'Agitar con vortex sin calor' }, { id: 'd', text: 'Añadir Lugol de inmediato' }], correct: 'b', explanation: 'Se añade 1 ml de Barfoed a cada muestra y se calienta durante 5 minutos.' },
    { id: 't1', type: 'tf', prompt: 'En la prueba de Barfoed se espera coloración rojo ladrillo en los monosacáridos.', correct: true, explanation: 'Así lo indica la interpretación de resultados de la ficha.' },
    { id: 't2', type: 'tf', prompt: 'El ácido sulfúrico concentrado se manipula sin precaución especial porque es una prueba sencilla.', correct: false, explanation: 'La ficha indica evitar el contacto con ácido sulfúrico y manipular con cuidado los reactivos ácidos.' },
    { id: 't3', type: 'tf', prompt: 'El anillo violeta de Molisch se espera en todos los azúcares.', correct: true, explanation: 'La ficha indica anillo violeta en la prueba de Molisch para todos los azúcares.' },
    { id: 't4', type: 'tf', prompt: 'Se recomienda usar guantes, bata y gafas de seguridad en esta práctica.', correct: true, explanation: 'Es parte de los protocolos y normas de seguridad de la ficha.' },
    { id: 'o1', type: 'open', prompt: 'Explica cómo usarías las pruebas de la práctica para diferenciar un monosacárido, una cetosa y un polisacárido.', expectedPoints: ['Molisch confirma la presencia de carbohidratos.', 'Barfoed (rojo ladrillo) identifica monosacáridos.', 'Seliwanoff (rojo intenso) identifica cetosas.', 'Lugol (azul) identifica polisacáridos como el almidón.'], explanation: 'Esta pregunta será revisada por el docente.' },
    { id: 'o2', type: 'open', prompt: 'Describe las medidas de seguridad que aplicaste al trabajar con ácido sulfúrico y reactivos calientes.', expectedPoints: ['Uso de guantes, bata y gafas de seguridad.', 'Evitar el contacto con ácido sulfúrico.', 'Manipulación cuidadosa de reactivos ácidos y calientes, con supervisión del docente.'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

const practice = tubePractice({
  meta,
  spec,
  quiz,
  interpretationItems,
  referenceTable: [
    {
      title: 'Resultados esperados por prueba',
      rows: [
        { label: 'Molisch', value: 'Anillo violeta (presencia de carbohidratos)' },
        { label: 'Barfoed', value: 'Rojo ladrillo en monosacáridos' },
        { label: 'Seliwanoff', value: 'Rojo intenso en cetosas' },
        { label: 'Lugol', value: 'Azul con almidón (polisacáridos)' },
      ],
    },
  ],
  closing: 'Estas diferencias permiten clasificar los carbohidratos según su tipo estructural.',
})

export default practice
