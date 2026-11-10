/** Farmacología Básica – Práctica 3: Vías de administración: canalización de vía venosa periférica. */
import { protocolPractice } from '../../core/protocolBench'
import type { ProcedureStep, QuizConfig } from '../../core/types'
import type { PatientSpec, Vital } from '../../core/patientPanel'
import { farmaMeta } from '../farma'
import ArmStage from './ArmStage'
import { P3_ICONS } from './Items'

const meta = farmaMeta(3, '21-05-2025', {
  title: 'Vías de administración: canalización de vía venosa periférica',
  objective: 'Ejecutar adecuadamente la canalización de una vía venosa periférica utilizando técnica aséptica, identificando indicaciones y complicaciones inmediatas, para comprender su impacto en la farmacocinética.',
  learningOutcomes: ['Aplica correctamente la técnica de canalización venosa periférica.', 'Selecciona el sitio y catéter adecuado según el objetivo terapéutico.', 'Comprende la relación entre vía de administración y farmacocinética.'],
  theory: 'La vía intravenosa periférica es fundamental en medicina para administrar medicamentos, líquidos y electrolitos. Esta práctica proporciona absorción inmediata, evitando la fase de absorción gastrointestinal. La elección del calibre del catéter y sitio de punción influye en la eficacia terapéutica, seguridad y comodidad del paciente. La comprensión de este procedimiento fortalece el aprendizaje de farmacocinética aplicada.',
  difficulty: 'Intermedia',
  materials: ['Guantes de látex descartables', 'Mascarilla quirúrgica', 'Solución desinfectante de base alcohólica', 'Esparadrapo', 'Catéter periférico (18–22G)', 'Gasas estériles', 'Equipo de venoclisis', 'Mandil y gorro', 'Lista de cotejo de simulación'],
  equipment: ['Computadora', 'Proyector', 'Pizarra', 'Guardián (recipiente de cortopunzantes)'],
  safetyNotes: ['Técnica aséptica obligatoria.', 'Supervisión continua.', 'Reporte inmediato de eventos adversos.', 'Descarte según normativa institucional.'],
  evaluationCriteria: ['Preparación del entorno y bioseguridad.', 'Selección y técnica de punción.', 'Conexión correcta al sistema de infusión.', 'Manejo de complicaciones.', 'Registro clínico.'],
  validated: true,
  validationNotes: [
    'La evaluación de la ficha es una lista de cotejo: el simulador registra el orden correcto de los pasos.',
    'La ficha solo indica «seleccionar sitio y catéter según el caso clínico» (catéter 18–22G) sin criterios. Los dos casos del simulador (reposición rápida → 18G; venas frágiles → 22G) y sus signos vitales son ilustrativos, basados en la práctica clínica habitual y no en la ficha: validar con el docente.',
    'Las acciones incorrectas (puncionar sin antisepsia, conectar sin purgar, dejar la aguja sobre la mesa) se derivan de los pasos y de las normas de la ficha.',
    'La ficha no define cómo se resuelven el hematoma y la extravasación: solo se identifican.',
  ],
})

const steps: ProcedureStep[] = [
  { id: 'ppe', title: 'Lavado de manos y EPP', instruction: 'Lávate las manos y colócate el EPP.', hint: 'Elige las dos acciones del grupo «Preparación».', actions: ['handwash', 'epp'], success: 'Preparación realizada.' },
  { id: 'explain', title: 'Explicar el procedimiento', instruction: 'Explica el procedimiento al paciente simulado.', hint: 'Elige «Explicar el procedimiento al paciente».', actions: ['explain'], success: 'Paciente informado.' },
  { id: 'field', title: 'Campo estéril y materiales', instruction: 'Organiza el campo estéril y los materiales.', hint: 'Elige las dos acciones de organización.', actions: ['sterile-field', 'materials'], success: 'Campo organizado.' },
  { id: 'select', title: 'Seleccionar sitio y catéter', instruction: 'Selecciona el sitio y el calibre del catéter según el caso clínico (rango de la ficha: 18–22G).', hint: 'Lee el caso: elige el sitio y un solo calibre adecuado.', actions: ['select-site', 'select-catheter'], success: 'Sitio y catéter seleccionados.' },
  { id: 'antisepsis', title: 'Antisepsia de la zona', instruction: 'Realiza la antisepsia de la zona de punción.', hint: 'Elige «Antisepsia de la zona de punción».', actions: ['antisepsis'], success: 'Zona preparada.' },
  { id: 'cannulate', title: 'Canalización venosa', instruction: 'Inserta el catéter, confirma por flashback, retira la aguja y fija.', hint: 'Respeta el orden: inserción, flashback, retiro de aguja y fijación.', actions: ['insert', 'flashback', 'withdraw', 'fix'], success: 'Vía canalizada.' },
  { id: 'connect', title: 'Conexión al sistema de infusión', instruction: 'Conecta el sistema de infusión, purga y verifica el flujo.', hint: 'Primero conecta, después purga y por último verifica el flujo.', actions: ['connect', 'purge', 'flow'], success: 'Sistema conectado.' },
  { id: 'compl', title: 'Identificar complicaciones', instruction: 'Identifica las complicaciones iniciales: hematoma y extravasación.', hint: 'Elige las dos complicaciones.', actions: ['compl:hematoma', 'compl:extravasation'], success: 'Complicaciones identificadas.' },
  { id: 'close', title: 'Descarte y registro', instruction: 'Descarta el material y registra el procedimiento.', hint: 'Cortopunzantes en el guardián; después registra.', actions: ['dispose', 'record'], success: 'Procedimiento registrado.' },
]

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Qué ventaja farmacocinética tiene la vía intravenosa según la ficha?', options: [{ id: 'a', text: 'Absorción inmediata, evitando la fase de absorción gastrointestinal' }, { id: 'b', text: 'Absorción lenta' }, { id: 'c', text: 'Requiere pasar por el hígado primero' }, { id: 'd', text: 'Ninguna' }], correct: 'a', explanation: 'Proporciona absorción inmediata.' },
    { id: 'c2', type: 'choice', prompt: '¿Qué rango de catéter periférico figura en la ficha?', options: [{ id: 'a', text: '8–10G' }, { id: 'b', text: '18–22G' }, { id: 'c', text: '30–34G' }, { id: 'd', text: '40–50G' }], correct: 'b', explanation: 'Catéter periférico (18–22G).' },
    { id: 'c3', type: 'choice', prompt: '¿Cuáles son las complicaciones iniciales citadas en el procedimiento?', options: [{ id: 'a', text: 'Hematoma y extravasación' }, { id: 'b', text: 'Fiebre y tos' }, { id: 'c', text: 'Cefalea' }, { id: 'd', text: 'Ninguna' }], correct: 'a', explanation: 'Paso 8: hematoma, extravasación.' },
    { id: 'c4', type: 'choice', prompt: 'Después de insertar el catéter, ¿cómo se confirma su colocación?', options: [{ id: 'a', text: 'Por flashback' }, { id: 'b', text: 'Con una radiografía' }, { id: 'c', text: 'No se confirma' }, { id: 'd', text: 'Con un termómetro' }], correct: 'a', explanation: 'Confirmación por flashback.' },
    { id: 't1', type: 'tf', prompt: 'La técnica aséptica es obligatoria.', correct: true, explanation: 'Protocolo de seguridad de la ficha.' },
    { id: 't2', type: 'tf', prompt: 'El calibre del catéter y el sitio de punción influyen en la eficacia y seguridad.', correct: true, explanation: 'Está en la fundamentación teórica.' },
    { id: 't3', type: 'tf', prompt: 'Antes de conectar el sistema de infusión no es necesario purgarlo.', correct: false, explanation: 'El paso 7 indica conexión, purga y verificación de flujo.' },
    { id: 'o1', type: 'open', prompt: 'Describe cómo la elección de la vía intravenosa y del catéter influye en la farmacocinética y en la seguridad del paciente.', expectedPoints: ['Absorción inmediata.', 'Influencia del calibre y sitio en eficacia, seguridad y comodidad.', 'Complicaciones (hematoma, extravasación).'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

const GAUGE: Record<string, number> = { rapida: 18, fragil: 22 }

const patient: PatientSpec = {
  name: 'Paciente simulado',
  descriptor: (id) => (id === 'fragil' ? 'adulto mayor' : 'adulto'),
  caseFor: (id) => (id === 'fragil' ? 'Adulto mayor con venas finas y frágiles, que requiere hidratación de mantenimiento por vía intravenosa periférica.' : 'Adulto con deshidratación que requiere reposición rápida de líquidos por vía intravenosa periférica.'),
  vitalsFor: (id, done): Vital[] => {
    const running = done.includes('flow')
    if (id === 'fragil') return [
      { id: 'fc', label: 'FC', value: '76', unit: 'lpm', tone: 'green' },
      { id: 'pa', label: 'PA', value: '130/80', unit: 'mmHg', tone: 'green' },
      { id: 'sat', label: 'SpO₂', value: '96', unit: '%', tone: 'blue' },
      { id: 'fr', label: 'FR', value: '16', unit: 'rpm', tone: 'green' },
    ]
    return running
      ? [
          { id: 'fc', label: 'FC', value: '98', unit: 'lpm', tone: 'green' },
          { id: 'pa', label: 'PA', value: '108/68', unit: 'mmHg', tone: 'green' },
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
    handwash: 'Lavado de manos realizado.', epp: 'EPP colocado.', explain: 'Procedimiento explicado al paciente.',
    'sterile-field': 'Campo estéril organizado.', materials: 'Materiales dispuestos.', 'select-site': 'Sitio de punción seleccionado (antebrazo).',
    'select-catheter:18': 'Catéter 18G seleccionado.', 'select-catheter:20': 'Catéter 20G seleccionado.', 'select-catheter:22': 'Catéter 22G seleccionado.',
    antisepsis: 'Antisepsia de la zona de punción.', insert: 'Catéter insertado.', flashback: 'Flashback confirmado.', withdraw: 'Aguja retirada.', fix: 'Catéter fijado.',
    connect: 'Sistema de infusión conectado.', purge: 'Sistema purgado.', flow: 'Flujo verificado: infusión en curso.',
    'compl:hematoma': 'Complicación identificada: hematoma.', 'compl:extravasation': 'Complicación identificada: extravasación.',
    dispose: 'Material descartado (aguja en el guardián).', record: 'Procedimiento registrado.',
  },
  note: 'Signos vitales ilustrativos (no provienen de la ficha).',
}

export default protocolPractice({
  meta,
  roundLabel: 'Canalización venosa periférica',
  steps,
  scenarios: [
    { id: 'rapida', label: 'Reposición rápida de líquidos', description: 'Adulto deshidratado que necesita reposición rápida (caso ilustrativo).' },
    { id: 'fragil', label: 'Venas frágiles', description: 'Adulto mayor con venas finas que requiere hidratación de mantenimiento (caso ilustrativo).' },
  ],
  rules: (action, payload, state) => {
    if (action !== 'select-catheter') return null
    const ok = GAUGE[state.scenarioId] ?? 18
    if (payload === ok) return null
    return state.scenarioId === 'fragil'
      ? 'Venas finas y frágiles: elige el calibre más pequeño del rango de la ficha (18–22G) para no dañar la vena.'
      : 'Reposición rápida de líquidos: elige el calibre mayor del rango de la ficha (18–22G), que permite mayor flujo.'
  },
  patient,
  Stage: ArmStage,
  dnd: {
    trayTitle: 'Bandeja y material',
    items: [
      { id: 'soap', label: 'Jabón / solución para manos', icon: P3_ICONS['soap'] },
      { id: 'ppe', label: 'EPP', icon: P3_ICONS['ppe'] },
      { id: 'drape', label: 'Campo estéril', icon: P3_ICONS['drape'] },
      { id: 'kit', label: 'Bandeja de materiales', icon: P3_ICONS['kit'] },
      { id: 'antiseptic', label: 'Antiséptico', icon: P3_ICONS['antiseptic'] },
      { id: 'cat18', label: 'Catéter 18G', icon: P3_ICONS['cat18'] },
      { id: 'cat20', label: 'Catéter 20G', icon: P3_ICONS['cat20'] },
      { id: 'cat22', label: 'Catéter 22G', icon: P3_ICONS['cat22'] },
      { id: 'catheter', label: 'Catéter seleccionado', icon: P3_ICONS['catheter'] },
      { id: 'tape', label: 'Fijación (apósito)', icon: P3_ICONS['tape'] },
      { id: 'set', label: 'Equipo de venoclisis', icon: P3_ICONS['set'] },
      { id: 'used', label: 'Aguja usada', icon: P3_ICONS['used'] },
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
      'drape->arm': { action: 'sterile-field' },
      'kit->table': { action: 'materials' },
      'cat18->table': { action: 'select-catheter', payload: 18 },
      'cat20->table': { action: 'select-catheter', payload: 20 },
      'cat22->table': { action: 'select-catheter', payload: 22 },
      'antiseptic->site': { action: 'antisepsis' },
      'catheter->site': { action: 'insert' },
      'tape->site': { action: 'fix' },
      'set->site': { action: 'connect' },
      'used->sharps': { action: 'dispose' },
    },
  },
  intro: { scenarioTitle: 'Caso clínico', scenarioHelp: 'Elige el caso del paciente simulado. Los casos son ilustrativos.', roundsNote: 'Se realizará una canalización venosa periférica completa.' },
  cards: [
    { id: 'explain', label: 'Explicar el procedimiento al paciente', group: 'Paciente' },
    { id: 'select-site', label: 'Seleccionar el sitio de punción', group: 'Selección' },
    { id: 'flashback', label: 'Confirmar por flashback', group: 'Técnica' },
    { id: 'withdraw', label: 'Retirar la aguja', group: 'Técnica' },
    { id: 'purge', label: 'Purgar el sistema', group: 'Infusión' },
    { id: 'flow', label: 'Verificar el flujo', group: 'Infusión' },
    { id: 'compl:hematoma', label: 'Identificar hematoma', group: 'Complicaciones' },
    { id: 'compl:extravasation', label: 'Identificar extravasación', group: 'Complicaciones' },
    { id: 'record', label: 'Registrar el procedimiento', group: 'Cierre' },
  ],
  distractors: [
    { id: 'no-antisepsis', label: 'Puncionar sin antisepsia', group: 'Técnica', feedback: 'La técnica aséptica es obligatoria: realiza primero la antisepsia de la zona.' },
    { id: 'needle-table', label: 'Dejar la aguja sobre la mesa', group: 'Cierre', feedback: 'Descarta el material según la normativa institucional (guardián).' },
    { id: 'no-purge', label: 'Conectar sin purgar el sistema', group: 'Infusión', feedback: 'Debes purgar el sistema y verificar el flujo.' },
  ],
  requires: {
    flashback: { needs: 'insert', message: 'Primero inserta el catéter.' },
    withdraw: { needs: 'flashback', message: 'Confirma por flashback antes de retirar la aguja.' },
    fix: { needs: 'withdraw', message: 'Primero retira la aguja.' },
    purge: { needs: 'connect', message: 'Primero conecta el sistema de infusión.' },
    flow: { needs: 'purge', message: 'Primero purga el sistema.' },
    record: { needs: 'dispose', message: 'Primero descarta el material usado.' },
  },
  quiz,
  materialsPanel: [
    { id: 'gloves', label: 'Guantes, mascarilla, mandil y gorro', description: 'EPP.', kind: 'material' },
    { id: 'antiseptic', label: 'Solución desinfectante de base alcohólica', description: 'Antisepsia.', kind: 'material' },
    { id: 'catheter', label: 'Catéter periférico (18–22G)', description: '10 unidades.', kind: 'material' },
    { id: 'gauze', label: 'Gasas estériles y esparadrapo', description: 'Fijación.', kind: 'material' },
    { id: 'set', label: 'Equipo de venoclisis', description: '10 unidades.', kind: 'material' },
    { id: 'sharps', label: 'Guardián', description: 'Recipiente de cortopunzantes.', kind: 'equipment' },
  ],
  referenceTable: [{ title: 'Datos de la ficha', rows: [{ label: 'Catéter', value: '18–22G (según el caso clínico)' }, { label: 'Complicaciones', value: 'Hematoma, extravasación' }, { label: 'Evaluación', value: 'Lista de cotejo' }] }],
  defaultWeights: { procedure: 55, results: 0, quizChoice: 15, quizTrueFalse: 5, quizOpen: 20, errorPenalty: 5 },
  resultText: 'Vía venosa periférica canalizada con técnica aséptica y registrada.',
  closing: 'Se ejecutó la canalización de una vía venosa periférica con técnica aséptica. La vía intravenosa proporciona absorción inmediata, lo que se relaciona con la farmacocinética.',
})
