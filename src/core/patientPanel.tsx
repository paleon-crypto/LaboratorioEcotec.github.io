/**
 * Panel de paciente virtual reutilizable (estilo simulador clínico): escena del paciente, monitor de
 * signos vitales, caso clínico y registro de eventos. Los valores de los signos son ILUSTRATIVOS.
 */
import { Activity, AlertTriangle } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'
import type { EngineState } from './types'

export interface Vital {
  id: string
  label: string
  value: string
  unit: string
  tone: 'green' | 'amber' | 'red' | 'blue'
}

export interface PatientSpec {
  name: string
  /** Descripción breve según el escenario (p. ej. «adulto mayor»). */
  descriptor?: (scenarioId: string) => string
  /** Texto del caso según el escenario elegido. */
  caseFor: (scenarioId: string) => string
  /** Signos vitales según el escenario y las acciones ya realizadas. */
  vitalsFor: (scenarioId: string, done: string[]) => Vital[]
  /** Texto del registro clínico por acción (clave = acción o acción:payload). */
  events: Record<string, string>
  /** Aviso bajo el monitor (p. ej. valores ilustrativos). */
  note?: string
}

export interface StageProps {
  state: EngineState
  done: string[]
}

const TONE: Record<Vital['tone'], string> = { green: 'text-emerald-400', amber: 'text-amber-300', red: 'text-red-400', blue: 'text-sky-300' }

export default function PatientPanel({ patient, state, Stage, overlay, tray }: { patient: PatientSpec; state: EngineState; Stage?: ComponentType<StageProps>; overlay?: ReactNode; tray?: ReactNode }) {
  const done = (state.data.doneActions as string[]) ?? []
  const vitals = patient.vitalsFor(state.scenarioId, done)
  const events = done.map((k) => patient.events[k]).filter(Boolean)
  const alert = state.feedback?.kind === 'error' ? state.feedback.text : null

  return (
    <section aria-label={`Paciente virtual: ${patient.name}`} className="space-y-3">
      <div className="rounded-xl bg-white/80 p-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Caso clínico</h3>
        <p className="mt-1 text-sm font-semibold text-slate-800">{patient.name}{patient.descriptor ? ` · ${patient.descriptor(state.scenarioId)}` : ''}</p>
        <p className="mt-1 text-sm text-slate-700">{patient.caseFor(state.scenarioId)}</p>
      </div>

      <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_230px]">
        <div className="space-y-3">
          {Stage ? (
            <div className="rounded-xl border border-slate-300 bg-white p-2">
              <div className="relative">
                <Stage state={state} done={done} />
                {overlay && <div className="pointer-events-none absolute inset-0">{overlay}</div>}
              </div>
            </div>
          ) : null}
          {tray}
        </div>
        <div className="rounded-xl bg-slate-900 p-3 text-white lg:sticky lg:top-4" role="group" aria-label="Monitor de signos vitales">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
            <Activity size={14} aria-hidden="true" /> Monitor
          </div>
          <svg viewBox="0 0 240 40" className="mt-1 h-10 w-full" aria-hidden="true">
            <path className="ecg-line" d="M0 22 H40 l6 -4 6 4 H70 l5 4 6 -22 6 30 6 -12 H120 l6 -5 6 5 H160 l6 -4 6 4 H190 l5 4 6 -22 6 30 6 -12 H240" fill="none" stroke="#34d399" strokeWidth="1.8" />
          </svg>
          <dl className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-1">
            {vitals.map((v) => (
              <div key={v.id} className="rounded-lg bg-slate-800 p-2">
                <dt className="text-[11px] text-slate-400">{v.label}</dt>
                <dd className={`whitespace-nowrap text-lg font-bold tabular-nums ${TONE[v.tone]}`}>
                  {v.value} <span className="text-[11px] font-normal text-slate-400">{v.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
          {patient.note && <p className="mt-2 text-[11px] text-slate-400">{patient.note}</p>}
        </div>
      </div>

      {alert && (
        <p className="flex items-start gap-2 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-900">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> <span><strong>Alerta clínica:</strong> {alert}</span>
        </p>
      )}

      <div className="rounded-xl bg-white/80 p-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Registro clínico</h3>
        {events.length === 0 ? (
          <p className="mt-1 text-xs text-slate-500">Aún no hay eventos registrados.</p>
        ) : (
          <ol className="mt-1 max-h-32 list-decimal space-y-0.5 overflow-y-auto pl-5 text-xs text-slate-700">
            {events.map((e, i) => <li key={i}>{e}</li>)}
          </ol>
        )}
      </div>
    </section>
  )
}
