/**
 * Plantilla de prácticas de PROCEDIMIENTO / manejo de equipos (sin resultados numéricos).
 * El estudiante elige, de un tablero de acciones, la que corresponde al paso actual.
 * Las acciones "distractoras" representan errores típicos y devuelven una retroalimentación.
 */
import { CheckCircle2 } from 'lucide-react'
import { actionIcon } from './actionIcons'
import { useState } from 'react'
import type { ComponentType, ReactNode } from 'react'
import PatientPanel from './patientPanel'
import type { PatientSpec, StageProps } from './patientPanel'
import type {
  ActionPayload,
  InterpretationItem,
  MaterialItem,
  PracticeHooks,
  PracticeMeta,
  PracticeModule,
  ProcedureStep,
  QuizConfig,
  SceneProps,
  SimData,
  Scenario,
  Weights,
  EngineState,
} from './types'

export interface ProtocolCard {
  id: string
  label: string
  group: string
  /** Acción que se ejecuta (por defecto, el id). Permite varias tarjetas para una misma acción. */
  action?: string
  payload?: number | string
}

const cardKey = (c: ProtocolCard) => (c.payload !== undefined ? `${c.action ?? c.id}:${c.payload}` : (c.action ?? c.id))
export interface ProtocolDistractor extends ProtocolCard {
  /** Retroalimentación que recibe el estudiante al elegirla. */
  feedback: string
}

/** Ejercicio de cálculo: el estudiante ingresa un número y el simulador lo valida. */
export interface ProtocolTask {
  id: string
  group: string
  /** Enunciado completo. */
  prompt: string
  /** Etiqueta corta para el informe. */
  label: string
  unit: string
  answer: number
  /** Tolerancia absoluta aceptada. */
  tol: number
  /** Ayuda (fórmula) que se muestra si el resultado es incorrecto. */
  hint: string
}

/** Arrastrar y soltar / seleccionar y pulsar: elementos de la bandeja y zonas sobre la escena. */
export interface DndItem {
  id: string
  label: string
  icon?: ReactNode
  /** Imagen (URL o ruta en /public). Si falta se usa `icon`. */
  image?: string
}
export interface DndZone {
  id: string
  label: string
  /** Posición y tamaño en % sobre la escena. */
  box: { x: number; y: number; w: number; h: number }
}
export interface ProtocolDnd {
  trayTitle?: string
  items: DndItem[]
  zones: DndZone[]
  /** `elemento->zona` → acción del motor. Las combinaciones no listadas cuentan como error. */
  map: Record<string, { action: string; payload?: number | string }>
}

export interface ExtraProps {
  state: EngineState
  perform: (action: string, payload?: number | string) => void
  disabled: boolean
}

export interface ProtocolOptions {
  meta: PracticeMeta
  steps: ProcedureStep[]
  cards: ProtocolCard[]
  distractors?: ProtocolDistractor[]
  tasks?: ProtocolTask[]
  /** Escenarios (casos) entre los que elige el estudiante; por defecto uno solo. */
  scenarios?: Scenario[]
  /** Regla adicional que depende del escenario o del estado: devuelve un mensaje de error o null. */
  rules?: (action: string, payload: ActionPayload, state: EngineState) => string | null
  /** Interacción de arrastrar y soltar (o seleccionar y pulsar) sobre la escena del paciente. */
  dnd?: ProtocolDnd
  /** Paciente virtual (monitor, caso y registro) y su escena visual. */
  patient?: PatientSpec
  Stage?: ComponentType<StageProps>
  /** Contenido adicional sobre el tablero (p. ej. un gráfico). */
  Extra?: ComponentType<ExtraProps>
  /** Orden obligatorio dentro de un mismo paso: acción → acción previa necesaria. */
  requires?: Record<string, { needs: string; message: string }>
  quiz: QuizConfig
  interpretationItems?: InterpretationItem[]
  materialsPanel: MaterialItem[]
  referenceTable: PracticeModule['referenceTable']
  defaultWeights: Weights
  /** Texto del registro de resultados al terminar el procedimiento. */
  resultText: string
  roundLabel: string
  /** Partes independientes dentro del mismo módulo: cada una agrupa pasos (por id) y se completa por separado. */
  parts?: { id: string; label: string; description: string; steps: string[]; resultText?: string }[]
  closing: string
  disclaimer?: string
  intro?: PracticeModule['intro']
  boardHelp?: string
}

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)

export function protocolPractice(o: ProtocolOptions): PracticeModule {
  const distractors = o.distractors ?? []
  const tasks = o.tasks ?? []
  const hooks: PracticeHooks = {
    initRoundData: (): SimData => ({ doneActions: [] }),
    beforeAction(action, _p, { state }) {
      const rule = o.rules?.(action, _p, state)
      if (rule) return rule
      if (action.startsWith('calc:')) {
        const t = tasks.find((x) => `calc:${x.id}` === action)
        if (!t) return null
        if (typeof _p !== 'number' || !Number.isFinite(_p)) return 'Ingresa un valor numérico.'
        if (Math.abs(_p - t.answer) > t.tol) return `Resultado incorrecto. ${t.hint}`
        return null
      }
      const req = o.requires?.[action]
      const doneActions = [...((state.data.keep_all as string[]) ?? []), ...((state.data.doneActions as string[]) ?? [])]
      if (req && !doneActions.includes(req.needs)) return req.message
      return null
    },
    afterAction(action, _p, { state }) {
      if (action.startsWith('calc:')) return { doneActions: [...((state.data.doneActions as string[]) ?? []), action], [`val_${action.slice(5)}`]: _p as number }
      const key = _p !== undefined ? `${action}:${_p}` : action
      return { doneActions: [...((state.data.doneActions as string[]) ?? []), key], keep_all: [...((state.data.keep_all as string[]) ?? []), key] }
    },
    buildRoundResult({ now, round, state }) {
      return {
        roundId: round.id,
        label: round.label,
        observations: [
          { sample: 'Procedimiento', text: o.parts?.find((p) => p.id === round.id)?.resultText ?? o.resultText },
          ...tasks.map((t) => ({ sample: t.label, text: `${state.data[`val_${t.id}`] ?? '—'} ${t.unit}` })),
        ],
        classification: 'completado',
        classificationLabel: 'Procedimiento completado',
        recordedAt: now,
      }
    },
    describeInvalid: (action) =>
      distractors.find((d) => d.id === action)?.feedback ??
      (action.includes('->') ? 'Combinación no válida: ese elemento no corresponde a esa zona en este momento.' : 'Esa acción no es válida en este paso. Revisa las instrucciones.'),
  }

  const all = [...o.cards, ...distractors]

  function Scene({ state, perform, disabled }: SceneProps) {
    const Extra = o.Extra
    const dnd = o.dnd
    const [held, setHeld] = useState<string | null>(null)
    const keyOf = (m: { action: string; payload?: number | string }) => (m.payload !== undefined ? `${m.action}:${m.payload}` : m.action)
    const drop = (zoneId: string, itemId: string) => {
      const m = dnd?.map[`${itemId}->${zoneId}`]
      if (m) perform(m.action, m.payload)
      else perform(`${itemId}->${zoneId}`)
      setHeld(null)
    }
    const heldLabel = dnd?.items.find((i) => i.id === held)?.label
    const overlay = dnd && (
      <>
        {dnd.zones.map((z) => (
          <button
            key={z.id}
            type="button"
            disabled={disabled}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const id = e.dataTransfer.getData('text/plain')
              if (id) drop(z.id, id)
            }}
            onClick={() => held && drop(z.id, held)}
            aria-label={held ? `Soltar «${heldLabel}» en: ${z.label}` : z.label}
            style={{ left: `${z.box.x}%`, top: `${z.box.y}%`, width: `${z.box.w}%`, height: `${z.box.h}%` }}
            className={`pointer-events-auto absolute flex items-start justify-start rounded-lg border-2 border-dashed p-0.5 text-left text-[10px] font-semibold leading-tight ${held ? 'border-amber-500 bg-amber-200/30 text-amber-900' : 'border-slate-400/50 text-slate-600 hover:border-brand-500'}`}
          >
            {z.label}
          </button>
        ))}
      </>
    )
    const done = (state.data.doneActions as string[]) ?? []
    const partActions = o.parts ? new Set(o.steps.filter((st) => o.parts![state.roundIndex]?.steps.includes(st.id)).flatMap((st) => st.actions)) : null
    const partGroups = partActions ? new Set(o.cards.filter((c) => partActions.has(c.action ?? c.id)).map((c) => c.group)) : null
    const visible = (c: { id: string; action?: string; group: string }, isDistractor: boolean) =>
      !partActions || (isDistractor ? partGroups!.has(c.group) : partActions.has(c.action ?? c.id))
    const groups = [...new Set([...all.filter((c) => visible(c, !o.cards.includes(c as never))).map((c) => c.group), ...tasks.map((t) => t.group)])]
    const extraState = o.parts ? { ...state, data: { ...state.data, doneActions: (state.data.keep_all as string[]) ?? [] } } : state
    const tray = dnd && (
          <section aria-label={dnd.trayTitle ?? 'Bandeja de materiales'} className="rounded-xl bg-white/70 p-3">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{dnd.trayTitle ?? 'Bandeja de materiales'}</h3>
            <p className="mb-2 text-xs text-slate-600" aria-live="polite">
              {held ? `Seleccionado: ${heldLabel}. Arrástralo a una zona de la escena o pulsa la zona.` : 'Arrastra un elemento a una zona de la escena, o selecciónalo y pulsa la zona (también con teclado).'}
            </p>
            <div className="flex flex-wrap gap-2">
              {dnd.items.map((it) => {
                const mapped = Object.entries(dnd.map).filter(([k]) => k.startsWith(`${it.id}->`)).map(([, m]) => keyOf(m))
                const itemDone = mapped.length > 0 && mapped.every((k) => done.includes(k))
                const isHeld = held === it.id
                return (
                  <button
                    key={it.id}
                    type="button"
                    draggable={!disabled && !itemDone}
                    disabled={disabled || itemDone}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', it.id)
                      setHeld(it.id)
                    }}
                    onDragEnd={() => setHeld(null)}
                    onClick={() => setHeld(isHeld ? null : it.id)}
                    aria-pressed={isHeld}
                    className={`flex w-24 cursor-grab flex-col items-center gap-1 rounded-xl border-2 bg-white p-2 text-center text-[11px] font-medium leading-tight text-slate-700 shadow-sm ${itemDone ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : isHeld ? 'border-amber-500 ring-2 ring-amber-300' : 'border-slate-200 hover:border-brand-500'}`}
                  >
                    <span className="relative flex h-12 w-12 items-center justify-center">
                      {it.image ? <img src={it.image} alt="" draggable={false} className="h-12 w-12 object-contain" /> : it.icon}
                      {itemDone && <CheckCircle2 size={16} className="absolute -right-1 -top-1 rounded-full bg-white text-emerald-600" aria-hidden="true" />}
                    </span>
                    {it.label}
                    {itemDone && <span className="sr-only"> (realizado)</span>}
                  </button>
                )
              })}
            </div>
          </section>
        )
    return (
      <div className="flex h-full min-h-[30rem] flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-100 to-slate-200 p-4" role="group" aria-label="Mesa de trabajo del laboratorio virtual">
        <p className="text-center text-xs text-slate-600">
          {o.boardHelp ?? 'Elige la acción que corresponde al paso actual. Las acciones incorrectas o fuera de orden cuentan como error.'}
        </p>
        {o.patient && <PatientPanel patient={o.patient} state={state} Stage={o.Stage} overlay={overlay} tray={tray} />}
        {!o.patient && o.Stage && (
          <section aria-label="Escena de la práctica" className="rounded-xl border border-slate-300 bg-white p-2">
            <div className="relative">
              <o.Stage state={state} done={done} />
              {overlay && <div className="pointer-events-none absolute inset-0">{overlay}</div>}
            </div>
          </section>
        )}
        {!o.patient && tray}
        {Extra && <Extra state={extraState} perform={perform} disabled={disabled} />}
        {groups.map((g) => (
          <section key={g} aria-label={g} className="rounded-xl bg-white/70 p-3">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{g}</h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {tasks
                .filter((t) => t.group === g)
                .map((t) => (
                  <TaskForm key={t.id} task={t} done={done.includes(`calc:${t.id}`)} disabled={disabled} onSubmit={(v) => perform(`calc:${t.id}`, v)} value={state.data[`val_${t.id}`] as number | undefined} />
                ))}
              {all
                .filter((c) => c.group === g && visible(c, !o.cards.includes(c as never)))
                .sort((a, b) => hash(a.id + state.seed) - hash(b.id + state.seed))
                .map((c) => {
                  const isDone = done.includes(cardKey(c))
                  return (
                    <button
                      key={c.id}
                      type="button"
                      disabled={disabled || isDone}
                      onClick={() => perform(c.action ?? c.id, c.payload)}
                      className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left text-sm font-medium transition-colors ${
                        isDone ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-500 hover:bg-brand-50'
                      } disabled:cursor-default`}
                    >
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-brand-50 text-brand-700'}`}>
                        {isDone ? <CheckCircle2 size={18} aria-hidden="true" /> : (() => { const I = actionIcon(c.label); return <I size={18} aria-hidden="true" /> })()}
                      </span>
                      <span>{c.label}{isDone && <span className="sr-only"> (realizado)</span>}</span>
                    </button>
                  )
                })}
            </div>
          </section>
        ))}
      </div>
    )
  }

  return {
    meta: o.meta,
    rounds: o.parts ? o.parts.map((p) => ({ id: p.id, label: p.label, description: p.description })) : [{ id: 'proc', label: o.roundLabel, description: 'Procedimiento guiado.' }],
    steps: o.parts ? o.steps.filter((st) => o.parts![0].steps.includes(st.id)) : o.steps,
    roundSteps: o.parts ? Object.fromEntries(o.parts.map((p) => [p.id, o.steps.filter((st) => p.steps.includes(st.id))])) : undefined,
    scenarios: o.scenarios ?? [{ id: 'guiada', label: 'Práctica guiada', description: 'Sigue el procedimiento de la ficha.' }],
    materialsMode: 'info',
    materialsPanel: o.materialsPanel,
    hooks,
    quiz: o.quiz,
    wideBench: !!(o.patient || o.Stage),
    actionLabel: (action) => {
      const c = o.cards.find((x) => (x.action ?? x.id) === action || x.id === action)
      if (c) return c.label
      const ev = o.patient?.events[action]
      if (ev) return ev
      if (action.startsWith('calc:')) return tasks.find((t) => `calc:${t.id}` === action.slice(0))?.label
      return undefined
    },
    defaultWeights: o.defaultWeights,
    interpretationItems: o.interpretationItems ?? [],
    referenceTable: o.referenceTable,
    disclaimer:
      o.disclaimer ??
      'Simulación educativa basada en la ficha de práctica: no reemplaza el trabajo experimental real ni constituye una herramienta de diagnóstico clínico.',
    buildConclusion: () => o.closing,
    Scene,
    intro: o.intro,
  }
}

function TaskForm({ task, done, disabled, onSubmit, value }: { task: ProtocolTask; done: boolean; disabled: boolean; onSubmit: (v: number) => void; value?: number }) {
  const [text, setText] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const id = `task-${task.id}`
  return (
    <form
      noValidate
      className="w-full rounded-lg border-2 border-slate-200 bg-white p-3"
      onSubmit={(e) => {
        e.preventDefault()
        const v = Number(text.trim().replace(',', '.'))
        if (text.trim() === '' || !Number.isFinite(v)) {
          setErr('Ingresa un valor numérico.')
          return
        }
        setErr(null)
        onSubmit(v)
      }}
    >
      <label htmlFor={id} className="text-sm font-medium text-slate-700">{task.prompt}</label>
      {done ? (
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-emerald-800"><CheckCircle2 size={16} aria-hidden="true" /> {value} {task.unit}</p>
      ) : (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input id={id} inputMode="decimal" autoComplete="off" value={text} disabled={disabled} onChange={(e) => setText(e.target.value)} aria-invalid={err !== null} className="w-32 rounded-lg border border-slate-300 px-3 py-1.5 text-sm" />
          <span className="text-sm text-slate-600">{task.unit}</span>
          <button type="submit" disabled={disabled} className="rounded-lg bg-brand-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-50">Comprobar</button>
        </div>
      )}
      {err && <p role="alert" className="mt-1 text-xs text-red-700">{err}</p>}
    </form>
  )
}
