import type { ComponentType } from 'react'
import type { LucideIcon } from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Catálogo                                                            */
/* ------------------------------------------------------------------ */

export interface Career {
  id: string
  name: string
  description: string
  icon: LucideIcon
}

export interface Subject {
  id: string
  name: string
  /** Carreras en las que se dicta la asignatura. */
  careerIds: string[]
  /** true si la relación asignatura-carrera aún debe confirmarse con ECOTEC. */
  provisional?: boolean
}

export type Difficulty = 'Básica' | 'Intermedia' | 'Avanzada'

export interface PracticeMeta {
  id: string
  /** Número de la práctica en la ficha. */
  number?: number
  title: string
  subjectId: string
  careerIds: string[]
  objective: string
  learningOutcomes: string[]
  durationMin: number
  difficulty: Difficulty
  materials: string[]
  equipment: string[]
  /** Fuente académica (ficha de práctica de ECOTEC). */
  source: string
  /** Unidad académica indicada en la ficha. */
  faculty?: string
  /** Fundamentación teórica de la ficha. */
  theory?: string
  /** Protocolos y normas de seguridad de la ficha. */
  safetyNotes?: string[]
  /** Criterios y rúbricas de evaluación de la ficha. */
  evaluationCriteria?: string[]
  /** Bibliografía de la ficha. */
  bibliography?: string[]
  /** true cuando el procedimiento/contenido fue validado con la ficha oficial. */
  validated: boolean
  /** Notas visibles para el docente/administrador sobre pendientes de validación. */
  validationNotes?: string[]
  version: string
}

/* ------------------------------------------------------------------ */
/* Motor de simulación                                                 */
/* ------------------------------------------------------------------ */

export type DataValue = number | string | boolean | string[] | undefined
export type SimData = Record<string, DataValue>

export interface ProcedureStep {
  id: string
  title: string
  instruction: string
  /** Ayuda contextual mostrada bajo demanda. */
  hint: string
  /** Acciones que deben ocurrir (en cualquier orden) para completar el paso. */
  actions: string[]
  /** Retroalimentación al completar el paso. */
  success: string
}

export interface Round {
  id: string
  label: string
  description: string
}

export interface Scenario {
  id: string
  label: string
  description: string
}

export interface RoundResult {
  roundId: string
  label: string
  /** Valor numérico (mediciones). Ausente en resultados observacionales. */
  value?: number
  unit?: string
  /** Observaciones por muestra (pruebas cualitativas). */
  observations?: { sample: string; text: string }[]
  classification: string
  classificationLabel: string
  note?: string
  /** Fecha y hora (ms) en que se registró el valor, según el procedimiento de la ficha. */
  recordedAt?: number
}

export interface Feedback {
  kind: 'ok' | 'error' | 'info'
  text: string
  /** Contador para forzar el anuncio en regiones aria-live. */
  key: number
}

export interface LogEntry {
  at: number
  roundId: string
  stepId: string
  action: string
  ok: boolean
  message: string
}

export interface EngineState {
  status: 'idle' | 'running' | 'completed'
  scenarioId: string
  seed: number
  roundIndex: number
  stepIndex: number
  /** Acciones ya realizadas dentro del paso actual. */
  done: string[]
  /** Pasos completados por ronda: roundId -> stepIds. */
  completedSteps: Record<string, string[]>
  errors: number
  results: RoundResult[]
  log: LogEntry[]
  data: SimData
  feedback: Feedback | null
  feedbackCounter: number
  startedAt: number | null
  finishedAt: number | null
}

export type ActionPayload = number | string | undefined

export interface HookContext {
  now: number
  state: EngineState
  step: ProcedureStep
  round: Round
}

/** Lógica experimental específica de cada práctica. Funciones puras. */
export interface PracticeHooks {
  /** Devuelve un mensaje de error si la acción no es válida en este momento. */
  beforeAction?: (action: string, payload: ActionPayload, ctx: HookContext) => string | null
  /** Devuelve un parche de datos de simulación tras una acción correcta. */
  afterAction?: (action: string, payload: ActionPayload, ctx: HookContext) => SimData
  /** Construye el resultado de una ronda cuando se completa su procedimiento. */
  buildRoundResult: (ctx: HookContext) => RoundResult
  /** Datos con los que arranca cada ronda (p. ej. mesa de trabajo vacía). */
  initRoundData: (roundIndex: number) => SimData
  /** Describe una acción inválida (combinación de elementos incorrecta). */
  describeInvalid?: (action: string) => string
}

export interface InterpretationItem {
  id: string
  /** Si coincide con una ronda, se muestra dentro de su tarjeta de resultados. */
  roundId?: string
  prompt: string
  options: { id: string; label: string }[]
  correct: string
  explanation?: string
}

export interface MaterialItem {
  id: string
  label: string
  description: string
  kind: 'material' | 'equipment'
}

export interface SceneProps {
  state: EngineState
  steps: ProcedureStep[]
  rounds: Round[]
  perform: (action: string, payload?: ActionPayload) => void
  disabled: boolean
}

/* ------------------------------------------------------------------ */
/* Evaluación                                                          */
/* ------------------------------------------------------------------ */

export interface QuestionOption {
  id: string
  text: string
}

export type Question =
  | { id: string; type: 'choice'; prompt: string; options: QuestionOption[]; correct: string; explanation: string }
  | { id: string; type: 'tf'; prompt: string; correct: boolean; explanation: string }
  | { id: string; type: 'open'; prompt: string; expectedPoints: string[]; explanation: string }

export interface Weights {
  procedure: number
  results: number
  quizChoice: number
  quizTrueFalse: number
  quizOpen: number
  /** Puntos descontados del componente de procedimiento por cada error. */
  errorPenalty: number
}

export interface QuizConfig {
  questions: Question[]
  /** true si las preguntas aún deben validarse contra la ficha oficial. */
  validated: boolean
}

export type QuizAnswers = Record<string, string | boolean>

/* ------------------------------------------------------------------ */
/* Módulo de práctica (unidad de contenido independiente)              */
/* ------------------------------------------------------------------ */

export interface PracticeModule {
  meta: PracticeMeta
  rounds: Round[]
  steps: ProcedureStep[]
  scenarios: Scenario[]
  materialsPanel: MaterialItem[]
  hooks: PracticeHooks
  quiz: QuizConfig
  /** Mesa ancha: escena + monitor lateral (prácticas con paciente virtual). */
  wideBench?: boolean
  /** Nombre legible de una acción para el registro de actividades. */
  actionLabel?: (action: string) => string | undefined
  defaultWeights: Weights
  /** Opciones de interpretación que el estudiante elige por ronda. */
  interpretationOptions?: Record<string, { id: string; label: string }[]>
  /** Interpretación por ítems personalizados (p. ej. una por muestra). Por defecto: una por ronda. */
  interpretationItems?: InterpretationItem[]
  /** Pasos propios de cada ronda (si difieren de `steps`). */
  roundSteps?: Record<string, ProcedureStep[]>
  /** 'pick': el estudiante lleva materiales a la mesa; 'info': el panel solo lista insumos. */
  materialsMode?: 'pick' | 'info'
  /** Textos de la pantalla inicial. */
  intro?: { scenarioTitle?: string; scenarioHelp?: string; roundsNote?: string }
  /** Líneas de referencia del gráfico de resultados, por ronda (valores de la ficha). */
  chartThresholds?: Record<string, { value: number; label: string }[]>
  /** Texto de reglas de referencia mostrado en resultados. */
  referenceTable: { title: string; rows: { label: string; value: string }[] }[]
  disclaimer: string
  buildConclusion: (results: RoundResult[]) => string
  Scene: ComponentType<SceneProps>
}

/* ------------------------------------------------------------------ */
/* Intentos / registros                                                */
/* ------------------------------------------------------------------ */

export interface Attempt {
  id: string
  practiceId: string
  scenarioId: string
  status: 'in_progress' | 'completed'
  startedAt: number
  finishedAt: number | null
  errors: number
  results: RoundResult[]
  completedSteps: Record<string, string[]>
  log: LogEntry[]
  /** roundId -> id de clasificación elegida por el estudiante. */
  interpretation: Record<string, string>
  quizAnswers: QuizAnswers
  quizSubmitted: boolean
  /** Calificación (0-100) de las preguntas abiertas; siempre null: las revisa el docente fuera de la plataforma. */
  openGrade: number | null
  conclusions: string
  observations: string
  weightsUsed: Weights
}
