import { Clock, FlaskConical, Play, ShieldAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { PracticeModule } from '../core/types'
import { getCareer, getSubject } from '../data/catalog'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>{children}</section>
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-brand-900">{title}</h1>
        {subtitle && <p className="mt-1 max-w-3xl text-sm text-slate-600">{subtitle}</p>}
      </div>
      {actions}
    </header>
  )
}

const tones = {
  slate: 'bg-slate-100 text-slate-700',
  blue: 'bg-brand-100 text-brand-800',
  green: 'bg-emerald-100 text-emerald-800',
  amber: 'bg-amber-100 text-amber-900',
  red: 'bg-red-100 text-red-800',
} as const

export function Badge({ children, tone = 'slate' }: { children: ReactNode; tone?: keyof typeof tones }) {
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>
}

export function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200"
    >
      <div className="h-full rounded-full bg-accent-600 transition-all" style={{ width: `${value}%` }} />
    </div>
  )
}

export function ProgressRing({ value, label }: { value: number; label: string }) {
  const r = 42
  const c = 2 * Math.PI * r
  return (
    <div className="relative h-28 w-28" role="img" aria-label={`${label}: ${value}%`}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#0d9488"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-brand-900">{value}%</span>
    </div>
  )
}

const diffTone = { Básica: 'green', Intermedia: 'amber', Avanzada: 'red' } as const

export function PracticeCard({ practice }: { practice: PracticeModule }) {
  const { meta } = practice
  const careers = meta.careerIds.map((id) => getCareer(id)?.name ?? id)
  const subject = getSubject(meta.subjectId)?.name ?? meta.subjectId
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <FlaskConical size={22} aria-hidden="true" />
        </span>
      </div>
      <h3 className="text-base font-semibold leading-snug text-brand-900">{meta.title}</h3>
      <dl className="mt-3 space-y-1 text-sm text-slate-600">
        <div className="flex gap-1">
          <dt className="font-medium text-slate-700">Carrera:</dt>
          <dd>{careers.join(', ')}</dd>
        </div>
        <div className="flex gap-1">
          <dt className="font-medium text-slate-700">Asignatura:</dt>
          <dd>{subject}</dd>
        </div>
      </dl>
      <p className="mt-3 text-sm text-slate-600">
        <span className="font-medium text-slate-700">Objetivo: </span>
        {meta.objective}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge tone="blue">
          <Clock size={12} aria-hidden="true" /> {meta.durationMin} min
        </Badge>
        <Badge tone={diffTone[meta.difficulty]}>{meta.difficulty}</Badge>
        {!meta.validated && (
          <Badge tone="amber">
            <ShieldAlert size={12} aria-hidden="true" /> Pendiente de validar con la ficha
          </Badge>
        )}
      </div>
      <p className="mt-3 text-xs text-slate-500">
        <span className="font-medium text-slate-600">Materiales: </span>
        {[...meta.equipment, ...meta.materials].join(', ')}
      </p>
      <div className="mt-auto pt-4">
        <Link
          to={`/practica/${meta.id}`}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
        >
          <Play size={16} aria-hidden="true" />
          Iniciar práctica
        </Link>
      </div>
    </article>
  )
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <p className="font-semibold text-slate-700">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
    </div>
  )
}
