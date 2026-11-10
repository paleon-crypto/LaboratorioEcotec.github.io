/**
 * Simulaciones de la práctica 5: esquema hígado–riñón con los dos casos y tarjetas de discusión.
 * De la ficha: metabolismo principalmente hepático (citocromo P450), excreción mayoritariamente renal, y su efecto
 * en biodisponibilidad, vida media y toxicidad. NO se simulan datos de pacientes, fármacos ni dosis (la guía no los incluye).
 */
import { Brain, Pill } from 'lucide-react'
import { useState } from 'react'
import type { ExtraProps } from '../../core/protocolBench'

const STEP_IDS = ['case1', 'case2', 'discuss', 'eval', 'debrief']

const Panel = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <section className="rounded-xl border-2 border-brand-200 bg-white p-4" aria-label={title}>
    <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-900">{icon} {title}</h3>
    {children}
  </section>
)

type Organ = 'liver' | 'kidney'

function Schema({ affected, chosen }: { affected: Organ; chosen: Organ | null }) {
  const o = (k: Organ) => (chosen === k ? (affected === k ? '#fca5a5' : '#fde68a') : '#e2e8f0')
  return (
    <svg viewBox="0 0 300 150" className="w-full max-w-md" role="img" aria-label="Esquema: fármaco, hígado (metabolismo) y riñón (excreción)">
      <defs><marker id="p5a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#64748b" /></marker></defs>
      <rect x="8" y="55" width="52" height="40" rx="8" fill="#ddd6fe" stroke="#7c3aed" /><text x="34" y="79" fontSize="10" textAnchor="middle" fill="#4c1d95">Fármaco</text>
      <path d="M60 75 H98" stroke="#64748b" strokeWidth="2" markerEnd="url(#p5a)" strokeDasharray="4 3" />
      <ellipse cx="140" cy="75" rx="38" ry="28" fill={o('liver')} stroke={chosen === 'liver' ? '#b91c1c' : '#64748b'} strokeWidth="2" style={{ transition: 'fill .4s' }} />
      <text x="140" y="72" fontSize="10" fontWeight="700" textAnchor="middle">Hígado</text><text x="140" y="85" fontSize="8" textAnchor="middle" fill="#475569">metabolismo</text>
      <path d="M178 75 H212" stroke="#64748b" strokeWidth="2" markerEnd="url(#p5a)" strokeDasharray="4 3" />
      <ellipse cx="248" cy="75" rx="34" ry="28" fill={o('kidney')} stroke={chosen === 'kidney' ? '#b91c1c' : '#64748b'} strokeWidth="2" style={{ transition: 'fill .4s' }} />
      <text x="248" y="72" fontSize="10" fontWeight="700" textAnchor="middle">Riñón</text><text x="248" y="85" fontSize="8" textAnchor="middle" fill="#475569">excreción</text>
      <text x="140" y="130" fontSize="9" textAnchor="middle" fill="#64748b">Citocromo P450</text>
    </svg>
  )
}

const IMPACT = ['Biodisponibilidad', 'Vida media', 'Toxicidad']

function CasePanel({ p, n }: { p: ExtraProps; n: 1 | 2 }) {
  const affected: Organ = n === 1 ? 'liver' : 'kidney'
  const done = ((p.state.data.doneActions as string[]) ?? []).includes(`case:${n}`)
  const [chosen, setChosen] = useState<Organ | null>(null)
  const [msg, setMsg] = useState('Elige el órgano cuya función está alterada en este caso.')
  const pick = (k: Organ) => {
    setChosen(k)
    if (k === affected) {
      setMsg(n === 1 ? 'Correcto: en la cirrosis hepática se altera el metabolismo (citocromo P450), lo que puede modificar la biodisponibilidad, la vida media y la toxicidad.' : 'Correcto: en la insuficiencia renal crónica se altera la excreción (en su mayoría renal), lo que puede modificar la biodisponibilidad, la vida media y la toxicidad.')
      if (!done) p.perform(`case:${n}`)
    } else setMsg('Revisa de nuevo: piensa dónde se metaboliza y dónde se excreta principalmente el fármaco. Puedes reintentar.')
  }
  return (
    <Panel icon={<Brain size={16} aria-hidden="true" />} title={n === 1 ? 'Caso 1: paciente con cirrosis hepática' : 'Caso 2: paciente con insuficiencia renal crónica'}>
      <Schema affected={affected} chosen={done ? affected : chosen} />
      <div className="mt-2 flex flex-wrap gap-2">
        {(['liver', 'kidney'] as Organ[]).map((k) => (
          <button key={k} type="button" disabled={p.disabled || done} onClick={() => pick(k)} className="rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:border-brand-500 disabled:opacity-60">
            {k === 'liver' ? 'Hígado (metabolismo)' : 'Riñón (excreción)'}
          </button>
        ))}
      </div>
      <p className="mt-2 rounded-lg bg-slate-50 p-2 text-xs text-slate-700" aria-live="polite">{done ? 'Caso analizado.' : msg}</p>
      <p className="mt-1 text-[11px] text-slate-500">La guía no incluye datos del paciente, fármacos ni dosis: no se simulan. El análisis detallado se responde en la evaluación (pregunta abierta).</p>
    </Panel>
  )
}

const TOPICS = [
  ['Ajuste de dosis', 'Se discute según la función metabólica y excretora (sin valores: la guía no los incluye).'],
  ['Selección de fármacos', 'Elección racional del fármaco en cada contexto clínico simulado.'],
  ...IMPACT.map((i) => [i, 'Puede modificarse por alteraciones hepáticas o renales.']),
]
function Discuss(p: ExtraProps) {
  const [seen, setSeen] = useState<number[]>([])
  const click = (i: number) => {
    const next = seen.includes(i) ? seen : [...seen, i]
    setSeen(next)
    if (next.length === TOPICS.length) p.perform('discuss')
  }
  return (
    <Panel icon={<Pill size={16} aria-hidden="true" />} title="Temas de la discusión en grupos (revisa cada tarjeta)">
      <div className="grid gap-2 sm:grid-cols-2">
        {TOPICS.map(([t, d], i) => (
          <button key={t} type="button" disabled={p.disabled} onClick={() => click(i)} aria-pressed={seen.includes(i)}
            className={`rounded-lg border-2 p-3 text-left text-sm ${seen.includes(i) ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white hover:border-brand-500'}`}>
            <strong className="block">{seen.includes(i) ? '✓ ' : ''}{t}</strong>
            {seen.includes(i) && <span className="text-xs text-slate-600">{d}</span>}
          </button>
        ))}
      </div>
    </Panel>
  )
}

export default function Extra5(p: ExtraProps) {
  if (p.state.status !== 'running') return null
  const id = STEP_IDS[Math.min(p.state.stepIndex, STEP_IDS.length - 1)]
  switch (id) {
    case 'case1': return <CasePanel key="c1" p={p} n={1} />
    case 'case2': return <CasePanel key="c2" p={p} n={2} />
    case 'discuss': return <Discuss {...p} />
    default: return null
  }
}
