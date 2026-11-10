/** Biología Celular y Molecular – Práctica 11: Mitosis. */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import { biologiaMeta, biologiaWeightsNoResults, SIM_NOTE_BIO } from '../biologia'
import Extra11, { PHASES } from './Extra'

const meta = biologiaMeta(11, 11, '16/07/2025', {
  title: 'Mitosis',
  objective: 'Observar y reconocer las diferentes fases de la mitosis en células somáticas, para comprender el proceso de división celular y su importancia en la reproducción y mantenimiento de los organismos.',
  learningOutcomes: ['Adquirir habilidades y destrezas en la preparación de la muestra.', 'Conocer la técnica e interpretar los resultados.', 'Conocimientos acerca de las células y las diferentes capacidades de proliferar.'],
  difficulty: 'Avanzada',
  theory: 'La mitosis es un proceso de división celular mediante el cual una célula madre se divide para formar dos células hijas genéticamente idénticas. Es esencial para el crecimiento, desarrollo, reparación y renovación de tejidos. Se divide en profase, metafase, anafase y telofase, durante las cuales los cromosomas se condensan, alinean en el centro, se separan y se distribuyen equitativamente a las células hijas.',
  materials: ['Placas portaobjeto (20)', 'Placas cubreobjeto (20)', 'Pipetas Pasteur (20)', 'Raíces en crecimiento con 5 a 7 días de preparación (5)', 'Orceína A', 'Orceína B', 'Papel de filtro', 'Bulbo de cebolla y agua'],
  equipment: ['Microscopio (15)', 'Vidrio de reloj (3)', 'Mechero (3)', 'Navaja (3)', 'Pinzas (3)'],
  safetyNotes: ['Trabajo en grupo con placas definidas, sin riesgo biológico.', 'Uso de placas preparadas con visualización del contenido.', 'Calentar suavemente evitando la ebullición.'],
  evaluationCriteria: ['Actitud: asistencia, puntualidad, presentación personal, liderazgo.', 'Habilidad y desempeño: planificación, ejecución, iniciativa, precaución.', 'Capacidad técnica/conocimiento: aplicación práctica y teórica, seguimiento de instrucciones.', 'Campo profesional: empleo de normas de bioseguridad y técnicas adecuadas.'],
  bibliography: ['Raven PH, Evert RF, Eichhorn SE. 1999. 6.ª ed. W.H. Freeman and Co. Worth Publishers. Cap. 8.', 'Sharma AK, Sharma A. 1972. Chromosome Techniques, Theory and Practice. 2.ª ed. Butterworths.', 'Strasburger E, et al. 1986. Tratado de botánica. 7.ª ed. Marín. Barcelona.', 'Jiménez-Martín G, González A, López JA. 1965. New Method of Labeling Cells. J Cell Biol 26:305-309.', 'Lindorf H, Parisca L, Rodríguez P. 1985. Botánica. Clasificación, estructura, reproducción. EBUC. Caracas.'],
  validated: false,
  validationNotes: [
    SIM_NOTE_BIO,
    'La bibliografía de la ficha aparece parcialmente cortada en el documento: se reproducen las referencias legibles.',
    'La ficha menciona tijeras (procedimiento) y navaja (equipos) para cortar las raicillas; el simulador usa «cortar el extremo».',
    'El simulador no mide los 8 minutos de calentamiento ni el minuto de la orceína B en tiempo real: figuran en cada acción.',
    'Las actividades de investigación (fases del ciclo celular, fase M, características de cada fase) se evalúan en la pregunta abierta.',
    'El banco de preguntas fue redactado a partir de la ficha: pendiente de revisión docente.',
  ],
})

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Cuáles son las fases de la mitosis que cita la ficha?', options: [{ id: 'a', text: 'Profase, metafase, anafase y telofase' }, { id: 'b', text: 'Solo profase y telofase' }, { id: 'c', text: 'Interfase y meiosis' }, { id: 'd', text: 'G1, S y G2' }], correct: 'a', explanation: 'Fundamentación teórica.' },
    { id: 'c2', type: 'choice', prompt: 'En la metafase los cromosomas…', options: [{ id: 'a', text: 'Se alinean en el centro de la célula' }, { id: 'b', text: 'Se separan hacia los polos' }, { id: 'c', text: 'Se descondensan' }, { id: 'd', text: 'Desaparecen' }], correct: 'a', explanation: 'Interpretación de resultados.' },
    { id: 'c3', type: 'choice', prompt: '¿Qué se observa en el meristemo de la raíz?', options: [{ id: 'a', text: 'Células en división' }, { id: 'b', text: 'Eritrocitos' }, { id: 'c', text: 'Bacterias' }, { id: 'd', text: 'Espermatozoides' }], correct: 'a', explanation: 'Actividad 2.' },
    { id: 't1', type: 'tf', prompt: 'Se calienta el vidrio de reloj hasta ebullición.', correct: false, explanation: 'Se calienta suavemente, evitando la ebullición.' },
    { id: 't2', type: 'tf', prompt: 'La mitosis produce dos células hijas genéticamente idénticas.', correct: true, explanation: 'Fundamentación teórica.' },
    { id: 'o1', type: 'open', prompt: 'Escribe las fases del ciclo celular y el concepto de cada una; indica qué comprende la fase M y las características de cada fase de la mitosis.', expectedPoints: ['Fases del ciclo celular y su concepto.', 'La fase M comprende la mitosis y la citocinesis.', 'Características de profase, metafase, anafase y telofase.'], explanation: 'Actividad 3 de la ficha; será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Mitosis en raíz de cebolla',
  steps: [
    { id: 'roots', title: 'Obtener las raicillas', instruction: 'Coloca un bulbo de cebolla con la parte inferior en agua y espera 3–4 días hasta tener raicillas de 3–4 cm; corta 2–3 mm del extremo.', hint: 'Dos acciones.', actions: ['bulb', 'cut'], success: 'Ápices de raicilla obtenidos.' },
    { id: 'stain', title: 'Teñir con orceína', instruction: 'Deposita el ápice en un vidrio de reloj con 2–3 mL de orceína A y caliéntalo suavemente unos 8 minutos sin ebullición.', hint: 'Orceína y calor suave.', actions: ['orcein-a', 'heat'], success: 'Ápices teñidos.' },
    { id: 'slide', title: 'Montar la preparación', instruction: 'Con pinzas coloca un ápice en el portaobjetos, añade una gota de orceína B (1 minuto), coloca el cubreobjetos y da golpecitos sin romperlo.', hint: 'Cuatro acciones en orden.', actions: ['tip', 'orcein-b', 'coverslip', 'tap'], success: 'Preparación montada.' },
    { id: 'press', title: 'Aplastar la preparación', instruction: 'Coloca 5 o 6 tiras de papel de filtro y presiona suavemente con el pulgar, sin que el cubre resbale.', hint: 'Dos acciones.', actions: ['filter-paper', 'press'], success: 'Preparación aplastada.' },
    { id: 'observe', title: 'Observar el meristemo', instruction: 'Observa las células del meristemo de la raíz al microscopio.', hint: 'Enfoca a 10× y 40×.', actions: ['obj-10', 'focus:10', 'obj-40', 'focus:40'], success: 'Células enfocadas.' },
    { id: 'phases', title: 'Identificar las fases', instruction: 'Identifica las fases de la mitosis.', hint: 'Relaciona cada característica con su fase.', actions: PHASES.map((p) => `phase:${p.id}`), success: 'Fases identificadas.' },
  ],
  cards: [
    { id: 'bulb', label: 'Colocar el bulbo con la parte inferior en agua (3–4 días)', group: 'Raicillas' },
    { id: 'cut', label: 'Cortar 2–3 mm del extremo de las raicillas', group: 'Raicillas' },
    { id: 'orcein-a', label: 'Depositar el ápice en vidrio de reloj con 2–3 mL de orceína A', group: 'Tinción' },
    { id: 'heat', label: 'Calentar suavemente unos 8 min a la llama, sin ebullición', group: 'Tinción' },
    { id: 'tip', label: 'Con pinzas, colocar un ápice en el portaobjetos', group: 'Montaje' },
    { id: 'orcein-b', label: 'Añadir una gota de orceína B y esperar 1 minuto', group: 'Montaje' },
    { id: 'coverslip', label: 'Colocar el cubreobjetos con mucho cuidado', group: 'Montaje' },
    { id: 'tap', label: 'Dar golpecitos sobre el cubre sin romperlo', group: 'Montaje' },
    { id: 'filter-paper', label: 'Colocar 5 o 6 tiras de papel de filtro', group: 'Aplastado' },
    { id: 'press', label: 'Presionar suavemente con el pulgar, sin que resbale el cubre', group: 'Aplastado' },
  ],
  distractors: [
    { id: 'phase-wrong', label: 'Asignar una fase sin observar la posición de los cromosomas', group: 'Aplastado', feedback: 'Esa característica no corresponde a esa fase.' },
    { id: 'boil', label: 'Hervir el vidrio de reloj', group: 'Tinción', feedback: 'Se calienta suavemente, evitando la ebullición, hasta la emisión de vapores tenues.' },
    { id: 'slip', label: 'Presionar sin sujetar el cubreobjetos', group: 'Aplastado', feedback: 'Haz una suave presión evitando que el cubre resbale.' },
  ],
  requires: {
    cut: { needs: 'bulb', message: 'Primero prepara el bulbo con las raicillas.' },
    heat: { needs: 'orcein-a', message: 'Primero coloca el ápice con orceína A.' },
    'orcein-b': { needs: 'tip', message: 'Primero coloca el ápice en el portaobjetos.' },
    coverslip: { needs: 'orcein-b', message: 'Primero añade la orceína B.' },
    tap: { needs: 'coverslip', message: 'Primero coloca el cubreobjetos.' },
    press: { needs: 'filter-paper', message: 'Primero coloca el papel de filtro.' },
    'focus:10': { needs: 'obj-10', message: 'Primero usa el objetivo de 10×.' },
    'obj-40': { needs: 'focus:10', message: 'Termina el enfoque a 10×.' },
    'focus:40': { needs: 'obj-40', message: 'Primero gira al objetivo de 40×.' },
  },
  Extra: Extra11,
  quiz,
  materialsPanel: [
    ...['Placas portaobjeto (20)', 'Placas cubreobjeto (20)', 'Pipetas Pasteur (20)', 'Raíces en crecimiento 5–7 días (5)', 'Orceína A'].map((l, i) => ({ id: `m${i}`, label: l, description: 'Insumo.', kind: 'material' as const })),
    ...['Vidrio de reloj (3)', 'Mechero (3)', 'Navaja (3)', 'Pinzas (3)', 'Microscopio (15)'].map((l, i) => ({ id: `e${i}`, label: l, description: 'Equipo.', kind: 'equipment' as const })),
  ],
  referenceTable: [{ title: 'Fases (ficha)', rows: [{ label: 'Profase', value: 'Cromosomas visibles y condensados' }, { label: 'Metafase', value: 'Cromosomas alineados en el centro' }, { label: 'Anafase', value: 'Cromátidas separándose hacia los polos' }, { label: 'Telofase', value: 'Reformación de núcleos y división celular' }] }],
  defaultWeights: biologiaWeightsNoResults,
  resultText: 'Preparación de meristemo de raíz observada e identificadas las fases de la mitosis.',
  closing: 'Se preparó el meristemo de raíz de cebolla, se observó al microscopio y se identificaron las fases de la mitosis.',
})
