/**
 * Enfermería Básica y Seguridad del Paciente – Práctica 15:
 * Administración de medicamentos por vía intravenosa y canalización de vía periférica.
 * FUENTE: FL Enfermería básica P15 (Lcda. Betzabeth Vargas Reyes, Mgtr.).
 */
import { protocolPractice } from '../../core/protocolBench'
import type { PracticeMeta, ProcedureStep, QuizConfig } from '../../core/types'
import type { PatientSpec, Vital } from '../../core/patientPanel'
import Stage15 from './Stage'
import { P15_ICONS } from './Items'
import Extra15 from './Extra'

const FACULTY = 'Facultad de Ciencias de la Salud y Desarrollo Humano'

const meta: PracticeMeta = {
  id: 'enfermeria-p15',
  number: 15,
  subjectId: 'enfermeria-basica',
  careerIds: ['enfermeria'],
  faculty: FACULTY,
  title: 'Administración de medicamentos por vía intravenosa y canalización de vía periférica',
  objective: 'Ejecutar la técnica de canalización de vía venosa periférica y administración de fármacos por bolo e infusión continua, aplicando los protocolos de bioseguridad, para garantizar un acceso vascular funcional y seguro.',
  learningOutcomes: ['Instala un acceso venoso periférico en simuladores anatómicos, verifica la permeabilidad del mismo y administra la terapia indicada siguiendo los «10 correctos», demostrando destreza técnica y respeto a la integridad del paciente.'],
  durationMin: 90,
  difficulty: 'Intermedia',
  theory: 'La administración intravenosa permite el ingreso de fármacos directamente al compartimento intravascular, logrando una biodisponibilidad inmediata. La canalización periférica requiere la inserción de un catéter sobre aguja en la luz venosa. La elección del sitio debe priorizar las venas del antebrazo sobre las de la flexura del codo para facilitar la movilidad del paciente. El mantenimiento de la vía depende de la fijación estéril y el lavado con solución salina para prevenir la obstrucción intraluminal.',
  materials: ['Guantes de manejo', 'Mascarillas quirúrgicas', 'Catéteres IV calibres 18, 20, 22 y 24G', 'Equipos de venoclisis', 'Llaves de tres vías', 'Torundas de algodón', 'Alcohol 70%', 'Solución salina al 0.9%', 'Apósitos transparentes (Tegaderm)', 'Kardex'],
  equipment: ['Torniquetes (ligaduras) y bandejas de acero', 'Riñoneras', 'Contenedores cortopunzantes', 'Soporte de suero', 'Simulador de cuerpo completo (fantoma)', 'Brazos de simulación de canalización con retorno venoso', 'Cama hospitalaria', 'Carro de curaciones o mesa Mayo', 'Bomba de infusión volumétrica'],
  safetyNotes: [
    'Uso obligatorio de uniforme y mandil, mascarilla, visor o gafas de seguridad y guantes de manejo.',
    'Las agujas nunca deben reencapucharse; se depositan de inmediato en el guardián de paredes rígidas.',
    'Pinchazo accidental: lavar con abundante agua y jabón, permitir el sangrado libre y reportar de inmediato al docente.',
    'Clasificar los desechos sanitarios (infecciosos, comunes y cortopunzantes).',
  ],
  evaluationCriteria: [
    'Preparación de materiales y seguridad (10 correctos).',
    'Técnica de canalización (venopunción) con asepsia, al primer o segundo intento.',
    'Fijación y mantenimiento (apósito estéril y rotulado con fecha, hora y responsable).',
    'Administración de fármacos y manejo de fluidos (cálculo de goteo, permeabilidad).',
    'Interpretación de signos clínicos y registro en notas de enfermería.',
  ],
  bibliography: [],
  version: '1.0.0',
  source: 'Ficha de planificación de la práctica N°15 (Enfermería básica P15). Docente: Lcda. Betzabeth Vargas Reyes, Mgtr. Carrera: Enfermería. Asignatura: Enfermería Básica y Seguridad del Paciente. Lugar: Centro de Simulación. Período: II Semestre Ordinario. Fecha de elaboración: 05/04/2026.',
  validated: false,
  validationNotes: [
    'La ficha menciona los «10 correctos» pero no los enumera: el simulador los trata como una verificación única. Pendiente: lista oficial de ECOTEC.',
    'La ficha no da criterios para elegir el calibre (rango G18–G24). Los dos casos del simulador (reposición rápida → 18/20G; venas frágiles → 22/24G) y sus signos vitales son ilustrativos: validar con la docente.',
    'Los datos del cálculo de infusión (500 mL en 4 h, factor 20 gotas/mL) son ilustrativos: la ficha solo pide calcular goteo y mL/h.',
    'La bibliografía de la ficha está vacía.',
    'La ficha no indica cuándo retirar el torniquete: el simulador lo muestra hasta fijar el catéter.',
  ],
}

const steps: ProcedureStep[] = [
  { id: 'ppe', title: 'Barreras de protección', instruction: 'Lávate las manos y colócate el equipo de protección personal.', hint: 'Arrastra el jabón y el EPP hacia el operador.', actions: ['handwash', 'epp'], success: 'Barreras de protección listas.' },
  { id: 'prep', title: 'Preparación del paciente', instruction: 'Verifica la orden médica, aplica los «10 correctos» y explica el procedimiento al paciente.', hint: 'Elige las tres acciones de preparación.', actions: ['order', 'ten-rights', 'explain'], success: 'Paciente preparado e informado.' },
  { id: 'material', title: 'Material y catéter', instruction: 'Organiza el material y selecciona el catéter según el caso clínico (rango G18–G24).', hint: 'Lleva la bandeja y un solo catéter a la mesa auxiliar.', actions: ['materials', 'select-catheter'], success: 'Material preparado.' },
  { id: 'site', title: 'Sitio, torniquete y asepsia', instruction: 'Elige el acceso venoso, coloca el torniquete y desinfecta la zona.', hint: 'Prioriza las venas del antebrazo (de distal a proximal).', actions: ['select-site', 'tourniquet', 'antisepsis'], success: 'Zona preparada.' },
  { id: 'cannulate', title: 'Canalización y fijación', instruction: 'Elige el ángulo, punciona, confirma el retorno venoso, retira el fiador, fija con apósito transparente y rotula.', hint: 'Orden: ángulo de 15° a 30° con el bisel hacia arriba, inserción, retorno venoso, retiro del fiador, fijación y rotulado.', actions: ['angle', 'insert', 'flashback', 'withdraw', 'fix', 'label'], success: 'Vía canalizada, fijada y rotulada.' },
  { id: 'perm', title: 'Conexión y permeabilidad', instruction: 'Conecta el equipo de venoclisis y verifica la permeabilidad con solución salina.', hint: 'Primero conecta; después realiza el lavado con solución salina.', actions: ['connect', 'flush-before'], success: 'Vía permeable.' },
  { id: 'drug', title: 'Administración del fármaco', instruction: 'Administra el fármaco prescrito en bolo y realiza el lavado final de la vía.', hint: 'Fármaco primero; lavado final después.', actions: ['drug', 'flush-after'], success: 'Fármaco administrado.' },
  { id: 'rate', title: 'Velocidad de infusión', instruction: 'Calcula la velocidad de infusión (mL/h y gotas/min) e inicia la infusión.', hint: 'mL/h = volumen / horas; gotas/min = mL × factor / minutos.', actions: ['calc:mlh', 'calc:gtt', 'infuse'], success: 'Infusión controlada.' },
  { id: 'monitor', title: 'Monitorización', instruction: 'Observa la zona e identifica las complicaciones asociadas a la terapia de infusión.', hint: 'Elige flebitis, infiltración/extravasación y embolia gaseosa.', actions: ['compl:flebitis', 'compl:infiltration', 'compl:embolia'], success: 'Complicaciones identificadas.' },
  { id: 'close', title: 'Descarte y registro', instruction: 'Descarta el material cortopunzante y registra el procedimiento en la hoja de enfermería.', hint: 'Aguja al guardián; luego el registro (calibre, ubicación, hora, medicamento y respuesta).', actions: ['dispose', 'record'], success: 'Procedimiento registrado.' },
]

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Con qué ángulo y orientación del bisel se realiza la punción según la ficha?', options: [{ id: 'a', text: '15° a 30° con el bisel hacia arriba' }, { id: 'b', text: '90° con el bisel hacia abajo' }, { id: 'c', text: '45° a 60° con el bisel hacia abajo' }, { id: 'd', text: 'Paralelo a la piel, sin bisel' }], correct: 'a', explanation: 'Paso 3 de la ficha: ángulo de 15° a 30° con el bisel hacia arriba.' },
    { id: 'c2', type: 'choice', prompt: '¿Qué zona se prioriza para la canalización según la fundamentación teórica?', options: [{ id: 'a', text: 'Las venas del antebrazo' }, { id: 'b', text: 'Las venas de la flexura del codo' }, { id: 'c', text: 'Las venas del cuello' }, { id: 'd', text: 'Cualquiera, sin criterio' }], correct: 'a', explanation: 'Se priorizan las venas del antebrazo sobre las de la flexura del codo para facilitar la movilidad.' },
    { id: 'c3', type: 'choice', prompt: '¿Qué indica un retorno venoso rápido y fluido?', options: [{ id: 'a', text: 'Canalización exitosa en la luz del vaso' }, { id: 'b', text: 'Extravasación' }, { id: 'c', text: 'Flebitis' }, { id: 'd', text: 'Nada' }], correct: 'a', explanation: 'Interpretación de resultados de la ficha.' },
    { id: 'c4', type: 'choice', prompt: 'Edema, dolor o resistencia al paso de líquidos sugieren…', options: [{ id: 'a', text: 'Extravasación o infiltración: retirar el catéter de inmediato' }, { id: 'b', text: 'Éxito de la técnica' }, { id: 'c', text: 'Aumentar la velocidad de infusión' }, { id: 'd', text: 'Ignorarlo y continuar' }], correct: 'a', explanation: 'La ficha exige el retiro inmediato del catéter para evitar daño tisular.' },
    { id: 'c5', type: 'choice', prompt: '¿Cuáles son signos tempranos de flebitis?', options: [{ id: 'a', text: 'Eritema, calor o cordón venoso palpable' }, { id: 'b', text: 'Palidez y frío' }, { id: 'c', text: 'Tos' }, { id: 'd', text: 'Ninguno' }], correct: 'a', explanation: 'Interpretación de resultados de la ficha.' },
    { id: 't1', type: 'tf', prompt: 'Las agujas deben reencapucharse antes de depositarlas en el guardián.', correct: false, explanation: 'Las agujas nunca deben reencapucharse.' },
    { id: 't2', type: 'tf', prompt: 'Tras un pinchazo accidental se debe lavar con agua y jabón, permitir el sangrado libre y reportar de inmediato al docente.', correct: true, explanation: 'Protocolo de incidentes de la ficha.' },
    { id: 't3', type: 'tf', prompt: 'El catéter fijado debe rotularse con fecha, hora y responsable.', correct: true, explanation: 'Criterio de fijación y rotulado de la rúbrica.' },
    { id: 'o1', type: 'open', prompt: 'Explica cómo la aplicación de los «10 correctos» y la técnica aséptica previene errores de medicación y bacteriemias asociadas a catéteres, y qué datos debes registrar en la hoja de enfermería.', expectedPoints: ['Verificación de los «10 correctos» previene errores de medicación.', 'La técnica aséptica previene bacteriemias asociadas a catéteres.', 'Registro: calibre, ubicación, hora, medicamento administrado y respuesta del paciente.'], explanation: 'Esta pregunta será revisada por la docente.' },
  ],
}

/** Calibres aceptados por caso (ILUSTRATIVO: la ficha solo indica el rango G18–G24). */
const GAUGES: Record<string, number[]> = { rapida: [18, 20], fragil: [22, 24] }

const patient: PatientSpec = {
  name: 'Paciente simulado',
  descriptor: (id) => (id === 'fragil' ? 'adulto mayor' : 'adulto'),
  caseFor: (id) => (id === 'fragil' ? 'Adulto mayor con venas finas y frágiles que requiere terapia intravenosa de mantenimiento y un fármaco prescrito en bolo (caso ilustrativo).' : 'Adulto deshidratado que requiere reposición rápida de líquidos y un fármaco prescrito en bolo (caso ilustrativo).'),
  vitalsFor: (id, done): Vital[] => {
    const running = done.includes('infuse')
    if (id === 'fragil') return [
      { id: 'fc', label: 'FC', value: '76', unit: 'lpm', tone: 'green' },
      { id: 'pa', label: 'PA', value: '130/80', unit: 'mmHg', tone: 'green' },
      { id: 'sat', label: 'SpO₂', value: '96', unit: '%', tone: 'blue' },
      { id: 'fr', label: 'FR', value: '16', unit: 'rpm', tone: 'green' },
    ]
    return running
      ? [
          { id: 'fc', label: 'FC', value: '96', unit: 'lpm', tone: 'green' },
          { id: 'pa', label: 'PA', value: '110/70', unit: 'mmHg', tone: 'green' },
          { id: 'sat', label: 'SpO₂', value: '98', unit: '%', tone: 'blue' },
          { id: 'fr', label: 'FR', value: '18', unit: 'rpm', tone: 'green' },
        ]
      : [
          { id: 'fc', label: 'FC', value: '112', unit: 'lpm', tone: 'amber' },
          { id: 'pa', label: 'PA', value: '98/60', unit: 'mmHg', tone: 'amber' },
          { id: 'sat', label: 'SpO₂', value: '97', unit: '%', tone: 'blue' },
          { id: 'fr', label: 'FR', value: '20', unit: 'rpm', tone: 'amber' },
        ]
  },
  events: {
    handwash: 'Lavado de manos realizado.', epp: 'EPP colocado.', order: 'Orden médica verificada.', 'ten-rights': '«10 correctos» verificados.', explain: 'Procedimiento explicado; consentimiento verbal.',
    materials: 'Material dispuesto en la mesa auxiliar.', 'select-site': 'Acceso venoso seleccionado (antebrazo).',
    'select-catheter:18': 'Catéter 18G seleccionado.', 'select-catheter:20': 'Catéter 20G seleccionado.', 'select-catheter:22': 'Catéter 22G seleccionado.', 'select-catheter:24': 'Catéter 24G seleccionado.',
    tourniquet: 'Torniquete colocado.', antisepsis: 'Desinfección de la zona (alcohol 70%).', insert: 'Catéter insertado.', flashback: 'Retorno venoso observado.', withdraw: 'Fiador retirado; cánula avanzada.',
    fix: 'Catéter fijado con apósito transparente.', label: 'Fijación rotulada (fecha, hora y responsable).', connect: 'Equipo de venoclisis conectado.', 'flush-before': 'Permeabilidad verificada con solución salina.',
    drug: 'Fármaco prescrito administrado en bolo.', 'flush-after': 'Lavado final de la vía.', 'calc:mlh': 'Velocidad en mL/h calculada.', 'calc:gtt': 'Goteo calculado.', infuse: 'Infusión iniciada.',
    'compl:flebitis': 'Complicación identificada: flebitis.', 'compl:infiltration': 'Complicación identificada: infiltración/extravasación.', 'compl:embolia': 'Complicación identificada: embolia gaseosa.',
    dispose: 'Cortopunzantes descartados en el guardián.', record: 'Procedimiento registrado en la hoja de enfermería.',
  },
  note: 'Signos vitales ilustrativos (no provienen de la ficha).',
}

const I = P15_ICONS
export default protocolPractice({
  meta,
  roundLabel: 'Canalización y administración intravenosa',
  steps,
  scenarios: [
    { id: 'rapida', label: 'Reposición rápida de líquidos', description: 'Adulto deshidratado que necesita reposición rápida (caso ilustrativo).' },
    { id: 'fragil', label: 'Venas frágiles', description: 'Adulto mayor con venas finas (caso ilustrativo).' },
  ],
  rules: (action, payload, state) => {
    if (action === 'angle') {
      const a = payload as number
      return a >= 15 && a <= 30 ? null : 'Ángulo inadecuado: la ficha indica 15° a 30° con el bisel hacia arriba. Un manejo inadecuado del ángulo provoca múltiples intentos y puede dañar el vaso (hematoma o daño tisular).'
    }
    if (action !== 'select-catheter') return null
    const ok = GAUGES[state.scenarioId] ?? [18, 20]
    if (ok.includes(payload as number)) return null
    return state.scenarioId === 'fragil'
      ? 'Venas finas y frágiles: elige un calibre pequeño (22 o 24G) para no dañar la vena.'
      : 'Reposición rápida de líquidos: elige un calibre grande (18 o 20G), que permite mayor flujo.'
  },
  patient,
  Stage: Stage15,
  Extra: Extra15,
  dnd: {
    trayTitle: 'Bandeja y material',
    items: [
      { id: 'soap', label: 'Jabón / solución para manos', icon: I.soap },
      { id: 'ppe', label: 'EPP', icon: I.ppe },
      { id: 'kit', label: 'Bandeja de materiales', icon: I.kit },
      { id: 'cat18', label: 'Catéter 18G', icon: I.cat18 },
      { id: 'cat20', label: 'Catéter 20G', icon: I.cat20 },
      { id: 'cat22', label: 'Catéter 22G', icon: I.cat22 },
      { id: 'cat24', label: 'Catéter 24G', icon: I.cat24 },
      { id: 'tourniquet', label: 'Torniquete', icon: I.tourniquet },
      { id: 'swab', label: 'Torunda con alcohol 70%', icon: I.swab },
      { id: 'catheter', label: 'Catéter seleccionado', icon: I.catheter },
      { id: 'dressing', label: 'Apósito transparente', icon: I.dressing },
      { id: 'label', label: 'Rótulo (fecha, hora, responsable)', icon: I.label },
      { id: 'set', label: 'Equipo de venoclisis', icon: I.set },
      { id: 'saline', label: 'Jeringa con solución salina 0.9%', icon: I.saline },
      { id: 'drug', label: 'Fármaco prescrito', icon: I.drug },
      { id: 'saline2', label: 'Lavado final (solución salina)', icon: I.saline },
      { id: 'used', label: 'Aguja usada', icon: I.used },
    ],
    zones: [
      { id: 'operator', label: 'Operador', box: { x: 0, y: 0, w: 28, h: 21 } },
      { id: 'table', label: 'Mesa auxiliar', box: { x: 34, y: 0, w: 32, h: 21 } },
      { id: 'sharps', label: 'Guardián', box: { x: 79, y: 0, w: 21, h: 21 } },
      { id: 'arm', label: 'Antebrazo', box: { x: 4, y: 58, w: 76, h: 36 } },
      { id: 'site', label: 'Sitio de punción', box: { x: 44, y: 64, w: 28, h: 22 } },
    ],
    map: {
      'soap->operator': { action: 'handwash' },
      'ppe->operator': { action: 'epp' },
      'kit->table': { action: 'materials' },
      'cat18->table': { action: 'select-catheter', payload: 18 },
      'cat20->table': { action: 'select-catheter', payload: 20 },
      'cat22->table': { action: 'select-catheter', payload: 22 },
      'cat24->table': { action: 'select-catheter', payload: 24 },
      'tourniquet->arm': { action: 'tourniquet' },
      'swab->site': { action: 'antisepsis' },
      'catheter->site': { action: 'insert' },
      'dressing->site': { action: 'fix' },
      'label->site': { action: 'label' },
      'set->site': { action: 'connect' },
      'saline->site': { action: 'flush-before' },
      'drug->site': { action: 'drug' },
      'saline2->site': { action: 'flush-after' },
      'used->sharps': { action: 'dispose' },
    },
  },
  intro: { scenarioTitle: 'Caso clínico', scenarioHelp: 'Elige el caso del paciente simulado. Los casos son ilustrativos.', roundsNote: 'Se realizará una canalización periférica con administración de un fármaco y una infusión.' },
  cards: [
    { id: 'order', label: 'Verificar la orden médica', group: 'Preparación' },
    { id: 'flashback', label: 'Observar el retorno venoso', group: 'Técnica' },
    { id: 'withdraw', label: 'Retirar el fiador y avanzar la cánula', group: 'Técnica' },
    { id: 'infuse', label: 'Iniciar la infusión (goteo o bomba)', group: 'Infusión' },
    { id: 'record', label: 'Registrar en la hoja de enfermería', group: 'Cierre' },
  ],
  distractors: [
    { id: 'bad-comm', label: 'Comunicación inadecuada', group: 'Paciente', feedback: 'Explica el procedimiento con claridad, resuelve dudas y asegura el consentimiento informado verbal para disminuir la ansiedad del paciente.' },
    { id: 'inject-resist', label: 'Inyectar pese a la resistencia o el dolor', group: 'Administración', feedback: 'Ignorar signos de resistencia o dolor es una falla grave: detén la administración y revisa la vía.' },
    { id: 'no-flashback-check', label: 'Inyectar sin verificar el retorno venoso', group: 'Administración', feedback: 'Verifica el retorno venoso y la permeabilidad antes de inyectar.' },
    { id: 'no-rights', label: 'Administrar sin verificar los «10 correctos»', group: 'Preparación', feedback: 'Aplica los «10 correctos» antes de preparar y administrar el medicamento.' },
    { id: 'elbow', label: 'Canalizar en la flexura del codo', group: 'Selección', feedback: 'Se priorizan las venas del antebrazo sobre las de la flexura del codo para facilitar la movilidad.' },
    { id: 'no-antisepsis', label: 'Puncionar sin desinfectar', group: 'Técnica', feedback: 'La técnica aséptica es obligatoria: desinfecta la zona antes de puncionar.' },
    { id: 'recap', label: 'Reencapuchar la aguja', group: 'Cierre', feedback: 'Las agujas nunca deben reencapucharse: deposítalas de inmediato en el guardián.' },
    { id: 'ignore-edema', label: 'Continuar la infusión pese al edema y dolor', group: 'Monitorización', feedback: 'Edema, dolor o resistencia sugieren extravasación: se exige el retiro inmediato del catéter.' },
  ],
  requires: {
    insert: { needs: 'angle:20', message: 'Primero elige el ángulo de punción.' },
    flashback: { needs: 'insert', message: 'Primero inserta el catéter.' },
    withdraw: { needs: 'flashback', message: 'Observa el retorno venoso antes de retirar el fiador.' },
    fix: { needs: 'withdraw', message: 'Primero retira el fiador y avanza la cánula.' },
    label: { needs: 'fix', message: 'Primero fija el catéter con el apósito.' },
    'flush-before': { needs: 'connect', message: 'Primero conecta el equipo de venoclisis.' },
    drug: { needs: 'flush-before', message: 'Verifica la permeabilidad con solución salina antes de inyectar.' },
    'flush-after': { needs: 'drug', message: 'El lavado final se hace después de administrar el fármaco.' },
    record: { needs: 'dispose', message: 'Primero descarta el material usado.' },
  },
  tasks: [
    { id: 'mlh', group: 'Infusión', label: 'Velocidad en mL/h', prompt: 'Velocidad de infusión en mL/h para 500 mL en 4 horas (datos ilustrativos).', unit: 'mL/h', answer: 125, tol: 0.5, hint: 'mL/h = 500 mL / 4 h.' },
    { id: 'gtt', group: 'Infusión', label: 'Goteo (macrogotero 20 gotas/mL)', prompt: 'Goteo para 500 mL en 4 horas con macrogotero de 20 gotas/mL (datos ilustrativos).', unit: 'gotas/min', answer: (500 * 20) / 240, tol: 1, hint: 'Gotas/min = 500 × 20 / 240 min.' },
  ],
  quiz,
  materialsPanel: [
    { id: 'ppe', label: 'Guantes de manejo y mascarillas quirúrgicas', description: 'Barreras de protección.', kind: 'material' },
    { id: 'cat', label: 'Catéteres IV 18, 20, 22 y 24G', description: 'Según el caso.', kind: 'material' },
    { id: 'set', label: 'Equipos de venoclisis y llaves de tres vías', description: 'Infusión.', kind: 'material' },
    { id: 'alc', label: 'Torundas de algodón y alcohol 70%', description: 'Antisepsia.', kind: 'material' },
    { id: 'ssf', label: 'Solución salina al 0.9%', description: 'Permeabilidad y lavado.', kind: 'material' },
    { id: 'teg', label: 'Apósitos transparentes (Tegaderm) y Kardex', description: 'Fijación y registro.', kind: 'material' },
    { id: 'tq', label: 'Torniquetes, bandejas y riñoneras', description: 'No consumibles.', kind: 'equipment' },
    { id: 'sharps', label: 'Contenedor cortopunzante y soporte de suero', description: 'Descarte e infusión.', kind: 'equipment' },
    { id: 'sim', label: 'Brazo de simulación con retorno venoso y bomba de infusión', description: 'Equipos.', kind: 'equipment' },
  ],
  referenceTable: [{ title: 'Datos de la ficha', rows: [{ label: 'Calibres', value: 'G18 a G24' }, { label: 'Ángulo de punción', value: '15° a 30°, bisel hacia arriba' }, { label: 'Sitio', value: 'Antebrazo (de distal a proximal)' }, { label: 'Complicaciones', value: 'Flebitis, extravasación/infiltración, embolia gaseosa' }, { label: 'Factor de goteo', value: 'No figura en la ficha (ilustrativo: 20 gotas/mL)' }] }],
  defaultWeights: { procedure: 55, results: 0, quizChoice: 15, quizTrueFalse: 5, quizOpen: 20, errorPenalty: 5 },
  resultText: 'Vía periférica canalizada, fármaco administrado e infusión calculada con técnica aséptica.',
  closing: 'Se ejecutó la canalización de una vía periférica y la administración de un fármaco por bolo e infusión aplicando asepsia y los «10 correctos». Los datos del caso y del cálculo son ilustrativos.',
})
