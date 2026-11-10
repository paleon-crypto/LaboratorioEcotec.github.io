import { ArrowLeft, Clock, FlaskConical, Play, ShieldAlert } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Badge, Card, EmptyState } from '../components/ui'
import { createInitialState, perform as enginePerform, startRun } from '../core/engine'
import { isInterpreted } from '../core/practice'
import type { ActionPayload, Attempt, EngineState, PracticeModule } from '../core/types'
import { getCareer, getPractice, getSubject } from '../data/catalog'
import LabStage from './lab/LabStage'
import QuizStage from './lab/QuizStage'
import ReportStage from './lab/ReportStage'
import ResultsStage from './lab/ResultsStage'

type Stage = 'intro' | 'lab' | 'results' | 'quiz' | 'report'

export default function PracticeLab() {
  const { id } = useParams()
  const practice = id ? getPractice(id) : undefined
  if (!practice) {
    return (
      <>
        <EmptyState title="Práctica no encontrada" text="La práctica solicitada no existe o aún no está disponible." />
        <Link to="/catalogo" className="mt-4 inline-block text-sm font-medium text-brand-700 underline">Volver al catálogo</Link>
      </>
    )
  }
  return <LabSession key={practice.meta.id} module={practice} />
}

function newId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

/**
 * Sesión de una práctica. Todo el estado vive en memoria (React): no se guarda nada en el navegador
 * ni en servidores. Al cerrar o actualizar la página el progreso se pierde.
 */
function LabSession({ module }: { module: PracticeModule }) {
  const { meta } = module

  const [stage, setStage] = useState<Stage>('intro')
  const [engine, setEngine] = useState<EngineState | null>(null)
  const [attempt, setAttempt] = useState<Attempt | null>(null)
  const [scenarioId, setScenarioId] = useState(module.scenarios[0]?.id ?? '')
  const attemptRef = useRef<Attempt | null>(null)

  const commit = useCallback((next: Attempt) => {
    attemptRef.current = next
    setAttempt(next)
  }, [])

  /** Sincroniza el intento con el estado del motor (se llama al cambiar el motor). */
  const syncEngine = useCallback(
    (eng: EngineState) => {
      const a = attemptRef.current
      if (!a) return
      commit({
        ...a,
        errors: eng.errors,
        results: eng.results,
        completedSteps: eng.completedSteps,
        log: eng.log.slice(-300),
        status: eng.status === 'completed' ? 'completed' : 'in_progress',
        finishedAt: eng.finishedAt,
      })
      if (eng.status === 'completed') setStage((st) => (st === 'lab' ? 'results' : st))
    },
    [commit],
  )

  useEffect(() => {
    if (engine) syncEngine(engine)
  }, [engine, syncEngine])

  const freshAttempt = useCallback(
    (eng: EngineState, id: string): Attempt => ({
      id,
      practiceId: meta.id,
      scenarioId: eng.scenarioId,
      status: 'in_progress',
      startedAt: Date.now(),
      finishedAt: null,
      errors: 0,
      results: [],
      completedSteps: eng.completedSteps,
      log: [],
      interpretation: {},
      quizAnswers: {},
      quizSubmitted: false,
      openGrade: null,
      conclusions: '',
      observations: '',
      weightsUsed: module.defaultWeights,
    }),
    [meta.id, module.defaultWeights],
  )

  const start = () => {
    const seed = Math.floor(Math.random() * 2 ** 31)
    const eng = startRun(createInitialState(module, scenarioId, seed), Date.now())
    commit(freshAttempt(eng, newId()))
    setEngine(eng)
    setStage('lab')
  }

  const reset = () => {
    if (!engine || !attemptRef.current) return
    const eng = startRun(createInitialState(module, engine.scenarioId, Math.floor(Math.random() * 2 ** 31)), Date.now())
    commit(freshAttempt(eng, attemptRef.current.id))
    setEngine(eng)
    setStage('lab')
  }

  const restartFromScratch = () => {
    attemptRef.current = null
    setAttempt(null)
    setEngine(null)
    setStage('intro')
  }

  const perform = useCallback(
    (action: string, payload?: ActionPayload) => {
      setEngine((prev) => (prev ? enginePerform(module, prev, action, payload, Date.now()) : prev))
    },
    [module],
  )

  const update = (patch: Partial<Attempt>) => {
    if (attemptRef.current) commit({ ...attemptRef.current, ...patch })
  }

  const completed = engine?.status === 'completed' || attempt?.status === 'completed'
  const interpreted = !!attempt && isInterpreted(module, attempt)
  const tabs: { id: Stage; label: string; enabled: boolean }[] = [
    { id: 'lab', label: '1. Laboratorio', enabled: !!engine },
    { id: 'results', label: '2. Resultados', enabled: !!completed },
    { id: 'quiz', label: '3. Evaluación', enabled: !!completed && interpreted },
    { id: 'report', label: '4. Informe', enabled: !!attempt?.quizSubmitted },
  ]

  return (
    <>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <Link to="/catalogo" className="mb-1 inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:underline">
            <ArrowLeft size={14} aria-hidden="true" /> Catálogo
          </Link>
          <h1 className="text-lg font-bold leading-snug text-brand-900 sm:text-xl">{meta.title}</h1>
          <p className="text-xs text-slate-500">{getSubject(meta.subjectId)?.name}{meta.number ? ` · Práctica ${meta.number}` : ''}</p>
        </div>
        {stage !== 'intro' && (
          <nav aria-label="Etapas de la práctica" className="flex flex-wrap gap-1 rounded-xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                disabled={!t.enabled}
                aria-current={stage === t.id ? 'page' : undefined}
                onClick={() => setStage(t.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold sm:text-sm ${
                  stage === t.id ? 'bg-brand-700 text-white' : 'text-slate-600 hover:bg-slate-100 disabled:text-slate-300 disabled:hover:bg-transparent'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        )}
      </div>

      {stage === 'intro' && <Intro module={module} scenarioId={scenarioId} onScenario={setScenarioId} onStart={start} />}
      {stage === 'lab' && engine && <LabStage module={module} engine={engine} perform={perform} onReset={reset} />}
      {stage === 'results' && attempt && (
        <ResultsStage
          module={module}
          attempt={attempt}
          onInterpret={(roundId, optionId) => update({ interpretation: { ...attempt.interpretation, [roundId]: optionId } })}
          onContinue={() => setStage('quiz')}
        />
      )}
      {stage === 'quiz' && attempt && (
        <QuizStage
          module={module}
          attempt={attempt}
          onAnswer={(qid, value) => update({ quizAnswers: { ...attempt.quizAnswers, [qid]: value } })}
          onSubmit={() => update({ quizSubmitted: true })}
          onContinue={() => setStage('report')}
        />
      )}
      {stage === 'report' && attempt && (
        <ReportStage module={module} attempt={attempt} onUpdate={update} onRestart={restartFromScratch} />
      )}
    </>
  )
}

function Intro({
  module,
  scenarioId,
  onScenario,
  onStart,
}: {
  module: PracticeModule
  scenarioId: string
  onScenario: (id: string) => void
  onStart: () => void
}) {
  const { meta } = module
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card>
        <h2 className="text-lg font-semibold text-brand-900">Antes de comenzar</h2>
        <dl className="mt-3 space-y-3 text-sm">
          <div>
            <dt className="font-semibold text-slate-700">Objetivo</dt>
            <dd className="text-slate-600">{meta.objective}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-700">Resultados de aprendizaje</dt>
            <dd>
              <ul className="list-disc pl-5 text-slate-600">{meta.learningOutcomes.map((o) => <li key={o}>{o}</li>)}</ul>
            </dd>
          </div>
          {meta.theory && (
            <div>
              <dt className="font-semibold text-slate-700">Fundamentación teórica</dt>
              <dd className="text-slate-600">{meta.theory}</dd>
            </div>
          )}
          <div>
            <dt className="font-semibold text-slate-700">Carreras</dt>
            <dd className="text-slate-600">{meta.careerIds.map((c) => getCareer(c)?.name ?? c).join(', ')}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-700">Equipos y materiales</dt>
            <dd className="text-slate-600">{[...meta.equipment, ...meta.materials].join(', ')}</dd>
          </div>
          {meta.safetyNotes && (
            <div>
              <dt className="font-semibold text-slate-700">Protocolos y normas de seguridad</dt>
              <dd>
                <ul className="list-disc pl-5 text-slate-600">{meta.safetyNotes.map((n) => <li key={n}>{n}</li>)}</ul>
              </dd>
            </div>
          )}
          {meta.evaluationCriteria && (
            <div>
              <dt className="font-semibold text-slate-700">Criterios de evaluación (ficha)</dt>
              <dd>
                <ul className="list-disc pl-5 text-slate-600">{meta.evaluationCriteria.map((n) => <li key={n}>{n}</li>)}</ul>
              </dd>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <Badge tone="blue"><Clock size={12} aria-hidden="true" /> {meta.durationMin} min</Badge>
            <Badge tone="green">{meta.difficulty}</Badge>
          </div>
        </dl>
        {!meta.validated && (
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
            <ShieldAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p>Contenido pendiente de validación con la ficha académica oficial de ECOTEC.</p>
          </div>
        )}
        <p className="mt-3 text-xs text-slate-500">
          Procedimiento según la ficha VAC-FOR-006. El primer paso de la ficha (reunirse en los grupos de trabajo) se realiza fuera del simulador.
        </p>
        <p className="mt-3 text-xs text-slate-500">{module.disclaimer}</p>
      </Card>

      <Card>
        {module.scenarios.length > 1 ? (
          <>
            <h2 className="mb-1 font-semibold text-brand-900">{module.intro?.scenarioTitle ?? 'Escenario'}</h2>
            <p className="mb-3 text-xs text-slate-500">{module.intro?.scenarioHelp ?? 'Elige el escenario de la simulación.'}</p>
            <fieldset>
              <legend className="sr-only">{module.intro?.scenarioTitle ?? 'Escenario'}</legend>
              <div className="space-y-2">
                {module.scenarios.map((s) => (
                  <label key={s.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-3 text-sm ${scenarioId === s.id ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:border-brand-500'}`}>
                    <input type="radio" name="scenario" value={s.id} checked={scenarioId === s.id} onChange={() => onScenario(s.id)} className="mt-0.5" />
                    <span>
                      <span className="block font-medium text-slate-800">{s.label}</span>
                      <span className="text-xs text-slate-500">{s.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        ) : (
          <>
            <h2 className="mb-1 font-semibold text-brand-900">Partes de la práctica</h2>
            <ol className="mb-3 list-decimal space-y-1 pl-5 text-sm text-slate-600">
              {module.rounds.map((r) => <li key={r.id}>{r.label}</li>)}
            </ol>
          </>
        )}
        <button type="button" onClick={onStart} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-800">
          <Play size={16} aria-hidden="true" /> Iniciar práctica
        </button>
        <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <FlaskConical size={14} aria-hidden="true" /> {module.intro?.roundsNote ?? `La práctica tiene ${module.rounds.length} parte(s).`}
        </p>
      </Card>
    </div>
  )
}
