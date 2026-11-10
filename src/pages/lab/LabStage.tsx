import { actionIcon } from '../../core/actionIcons'
import { CheckCircle2, Circle, CircleAlert, ClipboardList, HelpCircle, Info, RotateCcw, Target, XCircle } from 'lucide-react'
import { useState } from 'react'
import { Badge, Card, ProgressBar } from '../../components/ui'
import { progressPercent } from '../../core/engine'
import { stepsFor } from '../../core/practice'
import type { ActionPayload, EngineState, PracticeModule } from '../../core/types'

interface Props {
  module: PracticeModule
  engine: EngineState
  perform: (action: string, payload?: ActionPayload) => void
  onReset: () => void
}

const feedbackStyles = {
  ok: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  error: 'border-red-300 bg-red-50 text-red-900',
  info: 'border-brand-200 bg-brand-50 text-brand-900',
} as const

export default function LabStage({ module, engine, perform, onReset }: Props) {
  const { rounds, materialsPanel, Scene } = module
  const steps = stepsFor(module, engine.roundIndex)
  const pickMode = (module.materialsMode ?? 'pick') === 'pick'
  const [hintKey, setHintKey] = useState<string | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)

  const running = engine.status === 'running'
  const round = rounds[Math.min(engine.roundIndex, rounds.length - 1)]
  const stepIdx = Math.min(engine.stepIndex, steps.length - 1)
  const step = steps[stepIdx]
  const stepKey = `${round.id}:${step.id}`
  const completedInRound = engine.completedSteps[round.id] ?? []
  const picked = (engine.data.picked as string[]) ?? []
  const percent = progressPercent(module, engine)
  const FeedbackIcon = engine.feedback?.kind === 'error' ? CircleAlert : engine.feedback?.kind === 'ok' ? CheckCircle2 : Info

  return (
    <div className={`grid grid-cols-1 items-start gap-4 md:grid-cols-2 ${module.wideBench ? 'lg:grid-cols-[minmax(0,1fr)_320px]' : 'lg:grid-cols-[250px_minmax(0,1fr)_320px]'}`}>
      {/* Panel izquierdo: materiales y equipos */}
      <Card className={`order-2 md:order-3 ${module.wideBench ? 'lg:order-2 lg:col-start-1 lg:row-start-2' : 'lg:order-1'}`}>
        <h2 className="mb-1 font-semibold text-brand-900">Materiales y equipos</h2>
        <p className="mb-3 text-xs text-slate-500">
          {pickMode ? 'Pulsa «Usar» para llevar el elemento a la mesa de trabajo.' : 'Insumos y equipos indicados en la ficha para esta práctica.'}
        </p>
        <ul className="space-y-2">
          {materialsPanel.map((m) => {
            const onBench = picked.includes(m.id)
            return (
              <li key={m.id} className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-start gap-3">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${m.kind === 'equipment' ? 'bg-sky-50 text-sky-700' : 'bg-brand-50 text-brand-700'}`} aria-hidden="true">
                    {(() => { const I = actionIcon(m.label); return <I size={22} /> })()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-medium leading-tight text-slate-800">{m.label}</span>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge tone={m.kind === 'equipment' ? 'blue' : 'slate'}>{m.kind === 'equipment' ? 'Equipo' : 'Material'}</Badge>
                    </div>
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-slate-500">{m.description}</p>
                {pickMode && (
                <button
                  type="button"
                  disabled={!running || onBench}
                  onClick={() => perform(`pick:${m.id}`)}
                  className="mt-2 w-full rounded-lg border border-brand-500 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400 disabled:hover:bg-transparent"
                >
                  {onBench ? 'En la mesa ✓' : 'Usar'}
                </button>
                )}
              </li>
            )
          })}
        </ul>
      </Card>

      {/* Centro: área de experimentación */}
      <div className={`order-1 min-w-0 md:col-span-2 lg:col-span-1 ${module.wideBench ? 'lg:col-start-1 lg:row-start-1' : 'lg:order-2'}`}>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-semibold text-brand-900">Área de experimentación</h2>
            <p className="text-xs text-slate-500">
              Medición {Math.min(engine.roundIndex + 1, rounds.length)} de {rounds.length}: <strong>{round.label}</strong>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {confirmReset ? (
              <>
                <span className="text-xs text-slate-600">¿Reiniciar y perder el avance?</span>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmReset(false)
                    setHintKey(null)
                    onReset()
                  }}
                  className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Sí, reiniciar
                </button>
                <button type="button" onClick={() => setConfirmReset(false)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700">
                  Cancelar
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw size={14} aria-hidden="true" /> Reiniciar práctica
              </button>
            )}
          </div>
        </div>

        <Scene state={engine} steps={steps} rounds={rounds} perform={perform} disabled={!running} />

        <div role="status" aria-live="polite" className="mt-3 min-h-14">
          {engine.feedback && (
            <p key={engine.feedback.key} className={`flex items-start gap-2 rounded-xl border p-3 text-sm ${feedbackStyles[engine.feedback.kind]}`}>
              <FeedbackIcon size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              {engine.feedback.text}
            </p>
          )}
        </div>
      </div>

      {/* Panel derecho: instrucciones, progreso y resultados */}
      <div className={`order-3 space-y-4 md:order-2 lg:order-3 ${module.wideBench ? 'lg:col-start-2 lg:row-span-2 lg:row-start-1' : ''}`}>
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold text-brand-900">Instrucciones</h2>
            <span className="text-xs text-slate-500">{percent}%</span>
          </div>
          <ProgressBar value={percent} label="Progreso de la práctica" />
          <p className="mt-1 text-xs text-slate-500">Errores: {engine.errors}</p>

          {running && (
            <div className="mt-4 rounded-xl bg-brand-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                Paso {stepIdx + 1} de {steps.length}
              </p>
              <p className="mt-1 text-sm font-semibold text-brand-900">{step.title}</p>
              <p className="mt-1 text-sm text-slate-700">{step.instruction}</p>
              <button
                type="button"
                onClick={() => setHintKey(hintKey === stepKey ? null : stepKey)}
                aria-expanded={hintKey === stepKey}
                className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:underline"
              >
                <HelpCircle size={14} aria-hidden="true" /> {hintKey === stepKey ? 'Ocultar ayuda' : 'Ayuda contextual'}
              </button>
              {hintKey === stepKey && <p className="mt-2 rounded-lg bg-white p-2 text-xs text-slate-700">{step.hint}</p>}
            </div>
          )}

          <ol className="mt-4 space-y-1.5" aria-label="Pasos del procedimiento">
            {steps.map((s, i) => {
              const done = completedInRound.includes(s.id)
              const current = running && i === stepIdx
              return (
                <li key={s.id} aria-current={current ? 'step' : undefined} className={`flex items-start gap-2 text-sm ${current ? 'font-semibold text-brand-900' : done ? 'text-slate-500' : 'text-slate-600'}`}>
                  {done ? (
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" aria-label="Completado" />
                  ) : (
                    <Circle size={16} className={`mt-0.5 shrink-0 ${current ? 'text-brand-600' : 'text-slate-300'}`} aria-hidden="true" />
                  )}
                  <span>{s.title}</span>
                </li>
              )
            })}
          </ol>
        </Card>

        <Card>
          <details open className="group">
            <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold text-brand-900">
              <Target size={16} aria-hidden="true" /> Objetivos de aprendizaje
            </summary>
            <p className="mt-2 text-sm text-slate-700">{module.meta.objective}</p>
            {module.meta.learningOutcomes.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-600">
                {module.meta.learningOutcomes.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            )}
          </details>
        </Card>

        <Card>
          <h2 className="mb-2 font-semibold text-brand-900">Resultados experimentales</h2>
          {engine.results.length === 0 ? (
            <p className="text-sm text-slate-500">Los valores registrados aparecerán aquí.</p>
          ) : (
            <ul className="space-y-2">
              {engine.results.map((r) => (
                <li key={r.roundId} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                  <span className="text-slate-700">
                    {r.label}
                    {r.recordedAt && (
                      <span className="block text-xs text-slate-500">
                        {new Date(r.recordedAt).toLocaleString('es-EC', { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    )}
                  </span>
                  <span className="font-bold tabular-nums text-brand-900">
                    {r.value !== undefined ? `${r.value} ${r.unit ?? ''}` : 'Registrado ✓'}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-slate-500">La interpretación se realiza al finalizar todas las partes de la práctica.</p>
        </Card>

        <Card>
          <h2 className="mb-2 flex items-center gap-2 font-semibold text-brand-900"><ClipboardList size={16} aria-hidden="true" /> Registro de actividades</h2>
          {engine.log.length === 0 ? (
            <p className="text-sm text-slate-500">Las acciones que realices quedarán registradas aquí.</p>
          ) : (
            <ol className="max-h-56 space-y-1 overflow-y-auto text-xs" aria-label="Registro de actividades">
              {[...engine.log].reverse().slice(0, 30).map((l, i) => (
                <li key={`${l.at}-${i}`} className={`flex items-start gap-1.5 rounded-lg px-2 py-1 ${l.ok ? 'bg-emerald-50 text-emerald-900' : 'bg-red-50 text-red-900'}`}>
                  {l.ok ? <CheckCircle2 size={13} className="mt-0.5 shrink-0" aria-label="Acierto" /> : <XCircle size={13} className="mt-0.5 shrink-0" aria-label="Error" />}
                  <span>{l.ok ? (module.actionLabel?.(l.action) ?? l.message) : l.message}</span>
                </li>
              ))}
            </ol>
          )}
        </Card>
      </div>
    </div>
  )
}
