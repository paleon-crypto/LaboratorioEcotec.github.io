/** Biología Celular y Molecular – Práctica 7: Tinción de Wright. */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import { biologiaMeta, biologiaWeightsNoResults, SIM_NOTE_BIO } from '../biologia'
import Extra7, { SPOTS } from './Extra'

const meta = biologiaMeta(7, 7, '18/06/2025', {
  title: 'Tinción de Wright',
  objective: 'Identificar y diferenciar los distintos tipos de células sanguíneas mediante la tinción de Wright, para analizar su morfología y detectar posibles anomalías celulares bajo el microscopio.',
  learningOutcomes: ['Reconocer las células de la sangre.', 'Adquirir destrezas y habilidades con la técnica de frotis sanguíneo.'],
  difficulty: 'Intermedia',
  theory: 'La tinción de Wright es una técnica de tinción citológica utilizada principalmente para la observación de células sanguíneas y médula ósea. Utiliza eosina y azul de metileno: la eosina tiñe los componentes ácidos (citoplasma) en tonos rosados y el azul de metileno tiñe los componentes básicos (núcleo y orgánulos) en tonos azulados o púrpuras. Es fundamental para identificar leucocitos, eritrocitos y plaquetas y detectar alteraciones morfológicas.',
  materials: ['Placas portaobjeto (15)', 'Lancetas (15)', 'Pads de algodón (15)', 'Colorante Wright', 'Aceite de inmersión', 'Curitas'],
  equipment: ['Microscopio (15)'],
  safetyNotes: ['Uso adecuado de muestras biológicas y objetos cortopunzantes, así como desinfección posterior.', 'Manipulación cuidadosa del colorante Wright y de las lancetas.', 'Las lancetas y torundas usadas se desechan en el contenedor de residuos biológicos.'],
  evaluationCriteria: ['Actitud: asistencia, puntualidad, presentación personal, liderazgo.', 'Habilidad y desempeño: planificación, ejecución, iniciativa, precaución.', 'Capacidad técnica/conocimiento: aplicación práctica y teórica, seguimiento de instrucciones.', 'Campo profesional: empleo de normas de bioseguridad y técnicas adecuadas.'],
  bibliography: ['Carr-Rodak. Atlas de hematología clínica. 3.ª ed. Panamericana; 2010.', 'Rodak BF, Fritsma GA, Doig K. Hematología: fundamentos y aplicaciones clínicas. 4.ª ed. Panamericana; 2014.'],
  validated: false,
  validationNotes: [
    SIM_NOTE_BIO,
    'Es una simulación: no se realiza punción real. La ficha describe la punción del propio dedo; el simulador la presenta como una acción educativa.',
    'La ficha incluye en sus resultados de aprendizaje y contenidos texto sobre mitosis y meiosis que no corresponde a esta práctica; no se evalúa.',
    'La ficha no da el volumen de la gota ni el tiempo de secado del frotis antes de teñir.',
    'El informe, el diagrama del linaje de las células sanguíneas y la pregunta sobre dónde se forman las células sanguíneas (Actividad 4) se evalúan en la pregunta abierta.',
    'El banco de preguntas fue redactado a partir de la ficha: pendiente de revisión docente.',
  ],
})

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Qué tiñe la eosina en la tinción de Wright?', options: [{ id: 'a', text: 'Componentes ácidos (citoplasma) en tonos rosados' }, { id: 'b', text: 'El núcleo en azul' }, { id: 'c', text: 'Solo las plaquetas' }, { id: 'd', text: 'Nada' }], correct: 'a', explanation: 'Fundamentación teórica.' },
    { id: 'c2', type: 'choice', prompt: '¿A qué ángulo se sostiene el portaobjeto extensor?', options: [{ id: 'a', text: '35–45°' }, { id: 'b', text: '90°' }, { id: 'c', text: '0°' }, { id: 'd', text: '10°' }], correct: 'a', explanation: 'Paso 5 de la Actividad 1.' },
    { id: 'c3', type: 'choice', prompt: '¿Cuánto tiempo permanece el colorante en el frotis?', options: [{ id: 'a', text: 'Aproximadamente 2 minutos' }, { id: 'b', text: '10 segundos' }, { id: 'c', text: '1 hora' }, { id: 'd', text: '30 minutos' }], correct: 'a', explanation: 'Paso 6.' },
    { id: 'c4', type: 'choice', prompt: '¿Cómo se ven los eritrocitos?', options: [{ id: 'a', text: 'Rosado uniforme' }, { id: 'b', text: 'Morados con núcleo' }, { id: 'c', text: 'Incoloros' }, { id: 'd', text: 'Verdes' }], correct: 'a', explanation: 'Interpretación de resultados.' },
    { id: 't1', type: 'tf', prompt: 'Las lancetas y torundas usadas se desechan en el contenedor de residuos biológicos.', correct: true, explanation: 'Paso 4.' },
    { id: 't2', type: 'tf', prompt: 'El colorante puede derramarse por los bordes del portaobjetos.', correct: false, explanation: 'Debe cubrir el portaobjetos pero no derramarse.' },
    { id: 'o1', type: 'open', prompt: '¿Dónde se forman las células sanguíneas? Describe el linaje de las células sanguíneas.', expectedPoints: ['Las células sanguíneas se forman en la médula ósea (hematopoyesis).', 'Linaje: eritrocitos, leucocitos y plaquetas.'], explanation: 'Actividad 4 de la ficha; será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Tinción de Wright',
  steps: [
    { id: 'prep', title: 'Preparar el material y la zona', instruction: 'Prepara el material y desinfecta el dedo del que se extrae la muestra (por lo general índice o anular).', hint: 'Dos acciones.', actions: ['material', 'disinfect'], success: 'Material y zona preparados.' },
    { id: 'sample', title: 'Obtener la gota de sangre', instruction: 'Pincha con la lanceta en el pulpejo, aprieta para formar una gota y acércala al portaobjetos.', hint: 'Pinchar, formar la gota y acercarla.', actions: ['prick', 'drop'], success: 'Gota depositada en el portaobjetos.' },
    { id: 'clean', title: 'Limpiar y desechar', instruction: 'Limpia el dedo y coloca una curita; desecha lancetas y torundas en el contenedor de residuos biológicos.', hint: 'Dos acciones.', actions: ['bandage', 'dispose-bio'], success: 'Residuos desechados.' },
    { id: 'smear', title: 'Frotis en cuña', instruction: 'Sostén el portaobjeto extensor a 35–45°, deslízalo hacia atrás hasta tocar la gota, deja que la sangre se esparza y desliza con rapidez y suavidad.', hint: 'Orden: ángulo, contacto, extensión.', actions: ['angle', 'contact', 'spread'], success: 'Frotis extendido.' },
    { id: 'stain', title: 'Teñir con Wright', instruction: 'Cubre completamente el portaobjetos con el colorante gota a gota, sin derramarlo, y déjalo unos 2 minutos.', hint: 'Cubrir y esperar.', actions: ['cover', 'wait'], success: 'Frotis teñido.' },
    { id: 'observe', title: 'Observar a 40× y 100×', instruction: 'Observa el frotis con los objetivos de 40× y 100× (con aceite de inmersión).', hint: 'Coloca el aceite antes de usar 100×.', actions: ['obj-40', 'focus:40', 'oil', 'obj-100', 'focus:100'], success: 'Imagen nítida a 40× y 100×.' },
    { id: 'identify', title: 'Identificar las células', instruction: 'Identifica las células componentes de la sangre.', hint: 'Selecciona una etiqueta y pulsa la zona.', actions: SPOTS.map((s) => `identify:${s.id}`), success: 'Células identificadas.' },
  ],
  cards: [
    { id: 'material', label: 'Preparar el material', group: 'Preparación' },
    { id: 'disinfect', label: 'Desinfectar el dedo (índice o anular)', group: 'Preparación' },
    { id: 'prick', label: 'Pinchar con la lanceta en el pulpejo (zona anterior o lateral)', group: 'Muestra' },
    { id: 'drop', label: 'Acercar la gota al portaobjetos hasta que pase a éste', group: 'Muestra' },
    { id: 'bandage', label: 'Limpiar el dedo y colocar una curita', group: 'Cierre de la muestra' },
    { id: 'dispose-bio', label: 'Desechar lancetas y torundas en residuos biológicos', group: 'Cierre de la muestra' },
    { id: 'angle', label: 'Sostener el extensor a 35–45° por delante de la gota', group: 'Frotis' },
    { id: 'contact', label: 'Deslizar el extensor hacia atrás hasta tocar la gota', group: 'Frotis' },
    { id: 'spread', label: 'Deslizar con rapidez y suavidad hacia el otro extremo', group: 'Frotis' },
    { id: 'cover', label: 'Cubrir el portaobjetos con colorante, gota a gota', group: 'Tinción' },
    { id: 'wait', label: 'Dejar actuar el colorante unos 2 minutos', group: 'Tinción' },
    { id: 'oil', label: 'Colocar aceite de inmersión', group: 'Observación' },
  ],
  distractors: [
    { id: 'identify-wrong', label: 'Señalar una célula al azar', group: 'Observación', feedback: 'Esa zona no corresponde a esa estructura.' },
    { id: 'spill', label: 'Dejar que el colorante se derrame por los bordes', group: 'Tinción', feedback: 'El colorante debe cubrir completamente el portaobjetos, pero no debe derramarse por los bordes.' },
    { id: 'trash', label: 'Tirar la lanceta a la basura común', group: 'Cierre de la muestra', feedback: 'Las lancetas y torundas se desechan en el contenedor de residuos biológicos.' },
  ],
  requires: {
    disinfect: { needs: 'material', message: 'Primero prepara el material.' },
    drop: { needs: 'prick', message: 'Primero pincha con la lanceta.' },
    contact: { needs: 'angle', message: 'Primero sostén el extensor a 35–45°.' },
    spread: { needs: 'contact', message: 'Primero toca la gota con el extensor.' },
    wait: { needs: 'cover', message: 'Primero cubre el frotis con el colorante.' },
    'focus:40': { needs: 'obj-40', message: 'Primero usa el objetivo de 40×.' },
    oil: { needs: 'focus:40', message: 'Termina el enfoque a 40× antes del aceite.' },
    'obj-100': { needs: 'oil', message: 'Coloca primero el aceite de inmersión.' },
    'focus:100': { needs: 'obj-100', message: 'Primero gira al objetivo de 100×.' },
  },
  Extra: Extra7,
  quiz,
  materialsPanel: [
    ...['Placas portaobjeto (15)', 'Lancetas (15)', 'Pads de algodón (15)', 'Colorante Wright', 'Aceite de inmersión'].map((l, i) => ({ id: `m${i}`, label: l, description: 'Insumo.', kind: 'material' as const })),
    { id: 'mic', label: 'Microscopio (15)', description: 'Equipo.', kind: 'equipment' as const },
  ],
  referenceTable: [{ title: 'Interpretación (ficha)', rows: [{ label: 'Eritrocitos', value: 'Rosado uniforme' }, { label: 'Leucocitos', value: 'Núcleo azul o púrpura' }, { label: 'Plaquetas', value: 'Pequeñas estructuras moradas' }, { label: 'Colorante', value: 'Unos 2 minutos' }] }],
  defaultWeights: biologiaWeightsNoResults,
  resultText: 'Frotis sanguíneo teñido con Wright y células sanguíneas identificadas.',
  closing: 'Se preparó el frotis en cuña, se tiñó con Wright y se identificaron eritrocitos, leucocitos y plaquetas.',
})
