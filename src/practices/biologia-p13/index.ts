/** Biología Celular y Molecular – Observación microscópica de la osmolaridad y fragilidad osmótica de los glóbulos rojos. */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import { biologiaMeta, biologiaWeightsNoResults, SIM_NOTE_BIO } from '../biologia'
import Extra13 from './Extra'

const meta = {
  ...biologiaMeta(13, 'sin número', 'sin fecha', {
    title: 'Osmolaridad y fragilidad osmótica de los glóbulos rojos',
    objective: 'Observar en tiempo real, con el microscopio óptico, los cambios en la morfología de los glóbulos rojos al ser expuestos a medios con distintas concentraciones de cloruro de sodio (NaCl).',
    learningOutcomes: [
      'Visualizar e identificar las tres formas del eritrocito: normal (bicóncavo), hemolizado / fantasma celular y crenado (equinocito).',
      'Comprender el movimiento neto de agua (ósmosis) a través de la membrana citoplasmática según el gradiente de concentración.',
      'Correlacionar la respuesta osmótica microscópica con los riesgos clínicos de administrar fluidos parenterales desequilibrados en la práctica de enfermería.',
    ],
    difficulty: 'Intermedia',
    theory: 'Los glóbulos rojos expuestos a medios con distinta concentración de NaCl cambian de forma por el movimiento neto de agua a través de su membrana: en un medio isotónico conservan su forma bicóncava, en uno hipotónico pueden hemolizarse (fantasma celular) y en uno hipertónico se crenan (equinocito).',
    materials: ['Sangre capilar', 'Solución salina hipotónica (NaCl 0.3 %)', 'Solución salina isotónica (NaCl 0.9 %)', 'Solución salina hipertónica (NaCl 3.0 % o 5.0 %)', 'Láminas portaobjetos (3)', 'Cubreobjetos (3)', 'Lancetas estériles', 'Torundas de algodón y alcohol'],
    equipment: ['Microscopio óptico compuesto', 'Mascarilla, gorro, guantes de nitrilo o látex y bata de laboratorio'],
    safetyNotes: ['Usar mascarilla, gorro, guantes y bata de laboratorio.', 'Desechar la lanceta en el guardián inmediatamente.', 'Dejar secar el alcohol: el alcohol residual puede causar hemólisis prematura o alterar la muestra.'],
    evaluationCriteria: ['Cumplimiento del procedimiento (preparación, toma de muestra, montaje y observación).', 'Identificación de las tres formas morfológicas del eritrocito.', 'Correlación con la práctica de enfermería.'],
    bibliography: [],
    validated: false,
    validationNotes: [
      SIM_NOTE_BIO,
      'El documento no indica docente, fecha, período, bibliografía ni criterios de evaluación: se usan criterios generales y se deja la bibliografía vacía. Pendiente de completar con el docente.',
      'La práctica se solapa con «Ósmosis en eritrocitos» (P8, ficha de planificación): aquí se usan soluciones de NaCl 0.3 / 0.9 / 3.0 % y se observa por lámina.',
      'La ficha admite NaCl 3.0 % o 5.0 % para la hipertónica; el simulador usa 3.0 % (el valor de la Lámina C del procedimiento).',
      'El documento solo dice «observa y compara» en el registro: la relación hipotónica→hemólisis, isotónica→normal e hipertónica→crenación se toma de los objetivos de la ficha.',
      'Es una simulación: no se realiza punción real. El aceite de inmersión y el 100× son opcionales, como en la ficha, y no se exigen.',
      'La correlación con riesgos clínicos de fluidos parenterales se evalúa en la pregunta abierta (la ficha no da más datos).',
      'El banco de preguntas fue redactado a partir de la ficha: pendiente de revisión docente.',
    ],
  }),
  number: 13,
  source: 'Ficha de planificación de práctica «Observación Microscópica de la Osmolaridad y Fragilidad Osmótica de los Glóbulos Rojos» (documento Word adjunto; no indica código, docente, período ni fecha). Carrera: Enfermería.',
}

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Qué forma adoptan los glóbulos rojos en NaCl 0.9 % (isotónica)?', options: [{ id: 'a', text: 'Normal (bicóncava)' }, { id: 'b', text: 'Hemolizada (fantasma)' }, { id: 'c', text: 'Crenada (equinocito)' }, { id: 'd', text: 'Se dividen' }], correct: 'a', explanation: 'Objetivo específico 1 de la ficha.' },
    { id: 'c2', type: 'choice', prompt: '¿Qué ocurre con los glóbulos rojos en NaCl 0.3 % (hipotónica)?', options: [{ id: 'a', text: 'Entra agua y pueden hemolizarse (fantasma celular)' }, { id: 'b', text: 'Se crenan' }, { id: 'c', text: 'No cambian' }, { id: 'd', text: 'Se agrupan en cadenas' }], correct: 'a', explanation: 'Movimiento neto de agua según el gradiente.' },
    { id: 'c3', type: 'choice', prompt: '¿Por qué se debe dejar secar el alcohol antes de pinchar?', options: [{ id: 'a', text: 'El alcohol residual puede causar hemólisis prematura o alterar la muestra' }, { id: 'b', text: 'Para que la lanceta no se oxide' }, { id: 'c', text: 'Para que no duela' }, { id: 'd', text: 'No es necesario' }], correct: 'a', explanation: 'Paso 3.3 de la ficha.' },
    { id: 'c4', type: 'choice', prompt: '¿Por qué se descarta la primera gota de sangre?', options: [{ id: 'a', text: 'Contiene líquido tisular que diluye la muestra' }, { id: 'b', text: 'Tiene más células' }, { id: 'c', text: 'Está estéril' }, { id: 'd', text: 'Para ahorrar sangre' }], correct: 'a', explanation: 'Paso 3.5.' },
    { id: 't1', type: 'tf', prompt: 'La punción se hace en el centro de la yema del dedo.', correct: false, explanation: 'Se punciona el lateral de la yema, para evitar el centro con más terminaciones nerviosas.' },
    { id: 't2', type: 'tf', prompt: 'El cubreobjetos se coloca en ángulo de 45° para evitar burbujas.', correct: true, explanation: 'Paso 4.1.' },
    { id: 'o1', type: 'open', prompt: 'Relaciona la respuesta osmótica observada en los glóbulos rojos con los riesgos clínicos de administrar fluidos parenterales desequilibrados en enfermería.', expectedPoints: ['Un fluido hipotónico puede provocar entrada de agua y hemólisis.', 'Un fluido hipertónico puede provocar salida de agua y crenación.', 'Importancia de usar soluciones con una tonicidad adecuada.'], explanation: 'Objetivo específico 3; será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Osmolaridad y fragilidad osmótica',
  parts: [
    { id: 'laminas', label: 'Parte 1 · Preparación de láminas', description: 'Rotular las láminas A, B y C y colocar una gota de cada solución.', steps: ['setup', 'drops'], resultText: 'Tres láminas rotuladas con NaCl 0.3 %, 0.9 % y 3.0 %.' },
    { id: 'muestra', label: 'Parte 2 · Toma de muestra capilar', description: 'Punción en la yema del dedo con antisepsia y descarte de la primera gota.', steps: ['sample'], resultText: 'Muestra capilar recogida en las láminas con la técnica de la ficha.' },
    { id: 'montaje', label: 'Parte 3 · Colocación del cubreobjetos', description: 'Cubrir sin burbujas y secar el exceso.', steps: ['cover'], resultText: 'Preparaciones cubiertas sin burbujas.' },
    { id: 'observacion', label: 'Parte 4 · Observación al microscopio', description: 'Observar las láminas B, A y C a 10× y 40×.', steps: ['observe'], resultText: 'Láminas B, A y C observadas a 10× y 40×.' },
    { id: 'registro', label: 'Parte 5 · Registro e interpretación', description: 'Comparar la morfología de los glóbulos rojos en cada medio.', steps: ['interpret'], resultText: 'Morfología de los glóbulos rojos relacionada con cada medio.' },
  ],
  steps: [
    { id: 'setup', title: 'Preparar el espacio y rotular', instruction: 'Coloca los 3 portaobjetos sobre la mesa y rotúlalos: A (NaCl 0.3 %, hipotónica), B (NaCl 0.9 %, isotónica) y C (NaCl 3.0 %, hipertónica).', hint: 'Una acción.', actions: ['label'], success: 'Láminas rotuladas.' },
    { id: 'drops', title: 'Montar las gotas de solución', instruction: 'Coloca 1 gota de cada solución sobre su lámina.', hint: 'Arrastra cada solución a su lámina.', actions: ['drop:A', 'drop:B', 'drop:C'], success: 'Gotas colocadas.' },
    { id: 'sample', title: 'Toma de muestra capilar', instruction: 'Colócate los guantes, masajea el dedo, haz la antisepsia con alcohol 70 % y deja secar, punciona en el lateral de la yema, descarta la lanceta, descarta la primera gota y recoge la nueva gota con el portaobjetos.', hint: 'Sigue el orden de la técnica.', actions: ['gloves', 'massage', 'antisepsis', 'lancet', 'sharps', 'wipe', 'collect'], success: 'Muestra recogida.' },
    { id: 'cover', title: 'Colocar el cubreobjetos', instruction: 'Coloca un cubreobjetos sobre cada mezcla en ángulo de 45° y seca el exceso de líquido con papel de filtro.', hint: 'Dos acciones.', actions: ['coverslip', 'blot'], success: 'Preparaciones cubiertas.' },
    { id: 'observe', title: 'Observar B, A y C', instruction: 'Coloca la lámina B en la platina, enfoca a 10× y 40×; repite con la lámina A y con la C.', hint: 'Elige la lámina en el panel y enfoca.', actions: ['B:10', 'B:40', 'A:10', 'A:40', 'C:10', 'C:40'], success: 'Láminas observadas.' },
    { id: 'interpret', title: 'Interpretar los resultados', instruction: 'Observa y compara el aspecto de los glóbulos rojos en cada medio.', hint: 'Relaciona cada forma con su medio.', actions: ['morph:A', 'morph:B', 'morph:C'], success: 'Resultados interpretados.' },
  ],
  cards: [
    { id: 'label', label: 'Rotular las láminas A, B y C (0.3 %, 0.9 %, 3.0 %)', group: 'Preparación' },
    { id: 'gloves', label: 'Colocarse los guantes y elegir el dedo anular o medio', group: 'Toma de muestra' },
    { id: 'massage', label: 'Masajear el dedo desde la base hacia la punta', group: 'Toma de muestra' },
    { id: 'antisepsis', label: 'Limpiar la yema con alcohol al 70 % y dejar secar al aire', group: 'Toma de muestra' },
    { id: 'lancet', label: 'Puncionar con lanceta estéril en el lateral de la yema', group: 'Toma de muestra' },
    { id: 'sharps', label: 'Desechar la lanceta en el guardián inmediatamente', group: 'Toma de muestra' },
    { id: 'wipe', label: 'Descartar la primera gota con una torunda de algodón seca', group: 'Toma de muestra' },
    { id: 'collect', label: 'Formar una nueva gota y recogerla con el portaobjetos', group: 'Toma de muestra' },
    { id: 'coverslip', label: 'Colocar el cubreobjetos en ángulo de 45° y dejarlo caer suavemente', group: 'Montaje' },
    { id: 'blot', label: 'Secar el exceso de líquido con papel de filtro', group: 'Montaje' },
  ],
  distractors: [
    { id: 'drop-wrong', label: 'Colocar una solución en la lámina equivocada', group: 'Preparación', feedback: 'Esa solución no corresponde a esa lámina (A: 0.3 %, B: 0.9 %, C: 3.0 %).' },
    { id: 'morph-wrong', label: 'Asignar una forma sin comparar las láminas', group: 'Interpretación', feedback: 'Esa forma del eritrocito no corresponde a ese medio.' },
    { id: 'centre', label: 'Puncionar el centro de la yema', group: 'Toma de muestra', feedback: 'Se punciona el lateral de la yema: el centro tiene más terminaciones nerviosas.' },
    { id: 'wet', label: 'Pinchar con el alcohol aún húmedo', group: 'Toma de muestra', feedback: 'Deja secar el alcohol: el residual puede causar hemólisis prematura.' },
    { id: 'first-drop', label: 'Recoger la primera gota de sangre', group: 'Toma de muestra', feedback: 'La primera gota contiene líquido tisular que diluye la muestra: se descarta.' },
    { id: 'drop-cover', label: 'Dejar caer el cubreobjetos en plano', group: 'Montaje', feedback: 'Colócalo en ángulo de 45° para evitar burbujas de aire.' },
  ],
  requires: {
    'drop:A': { needs: 'label', message: 'Primero rotula las láminas.' },
    'drop:B': { needs: 'label', message: 'Primero rotula las láminas.' },
    'drop:C': { needs: 'label', message: 'Primero rotula las láminas.' },
    massage: { needs: 'gloves', message: 'Primero colócate los guantes.' },
    antisepsis: { needs: 'massage', message: 'Primero masajea suavemente el dedo.' },
    lancet: { needs: 'antisepsis', message: 'Primero haz la antisepsia y deja secar.' },
    sharps: { needs: 'lancet', message: 'Primero realiza la punción.' },
    wipe: { needs: 'sharps', message: 'Desecha primero la lanceta en el guardián.' },
    collect: { needs: 'wipe', message: 'Primero descarta la primera gota.' },
    blot: { needs: 'coverslip', message: 'Primero coloca el cubreobjetos.' },
    'B:40': { needs: 'B:10', message: 'Primero enfoca la lámina B a 10×.' },
    'A:10': { needs: 'B:40', message: 'Empieza por la lámina B (isotónica) y termina su observación.' },
    'A:40': { needs: 'A:10', message: 'Primero enfoca la lámina A a 10×.' },
    'C:10': { needs: 'A:40', message: 'Sigue con la lámina A antes de la C.' },
    'C:40': { needs: 'C:10', message: 'Primero enfoca la lámina C a 10×.' },
  },
  Extra: Extra13,
  quiz,
  materialsPanel: [
    ...['Sangre capilar', 'NaCl 0.3 % (hipotónica)', 'NaCl 0.9 % (isotónica)', 'NaCl 3.0 % (hipertónica)', 'Portaobjetos (3) y cubreobjetos (3)', 'Lancetas, torundas y alcohol'].map((l, i) => ({ id: `m${i}`, label: l, description: 'Insumo.', kind: 'material' as const })),
    ...['Microscopio óptico compuesto', 'Guantes, mascarilla, gorro y bata'].map((l, i) => ({ id: `e${i}`, label: l, description: 'Equipo / EPP.', kind: 'equipment' as const })),
  ],
  referenceTable: [{ title: 'Láminas (ficha)', rows: [{ label: 'A', value: 'NaCl 0.3 % (hipotónica)' }, { label: 'B', value: 'NaCl 0.9 % (isotónica)' }, { label: 'C', value: 'NaCl 3.0 % (hipertónica)' }, { label: 'Formas', value: 'Normal (bicóncavo), hemolizado/fantasma, crenado (equinocito)' }] }],
  defaultWeights: biologiaWeightsNoResults,
  resultText: 'Procedimiento completado.',
  closing: 'Se prepararon tres láminas con NaCl 0.3, 0.9 y 3.0 %, se tomó la muestra capilar, se observaron al microscopio y se relacionó cada forma del eritrocito con su medio.',
})
