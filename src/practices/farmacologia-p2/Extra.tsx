/**
 * Simulaciones de la práctica 2: frascos de suero, concentración porcentual y gráfico de gramos.
 * De la ficha: concentración porcentual (g/100 mL) y los tipos de solución. ILUSTRATIVOS: dibujo de los frascos,
 * nivel del líquido, volumen de 500 mL. La ficha no da las concentraciones de las soluciones salinas ni del Ringer.
 */
import { BarChart3, Droplets, FlaskConical } from 'lucide-react'
import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import type { ExtraProps } from '../../core/protocolBench'

const STEP_IDS = ['theory', 'recognize', 'compare', 'volume', 'discuss']
const GL = [5, 10, 20, 50]

const Panel = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <section className="rounded-xl border-2 border-brand-200 bg-white p-4" aria-label={title}>
    <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-900">{icon} {title}</h3>
    {children}
  </section>
)
const useDone = (p: ExtraProps) => (p.state.data.doneActions as string[]) ?? []

/* ---------------- Frascos ---------------- */
interface Bottle { id: string; group: 'glucose' | 'saline' | 'ringer'; label: string; level: number; color: string; info: string }
const BOTTLES: Bottle[] = [
  ...GL.map((g): Bottle => ({ id: `g${g}`, group: 'glucose', label: `Glucosa ${g}%`, level: 30 + g * 0.9, color: '#fde68a', info: `Suero de glucosa al ${g}%: ${g} g de glucosa por 100 mL.` })),
  { id: 'hipo', group: 'saline', label: 'Salino hipotónico', level: 70, color: '#bae6fd', info: 'Suero salino hipotónico. La ficha no indica su concentración.' },
  { id: 'iso', group: 'saline', label: 'Salino isotónico', level: 70, color: '#93c5fd', info: 'Suero salino isotónico. La ficha no indica su concentración.' },
  { id: 'hiper', group: 'saline', label: 'Salino hipertónico', level: 70, color: '#60a5fa', info: 'Suero salino hipertónico. La ficha no indica su concentración.' },
  { id: 'ringer', group: 'ringer', label: 'Lactato de Ringer', level: 70, color: '#d9f99d', info: 'Solución parenteral de lactato de Ringer. La ficha no indica su composición.' },
]
const ACTION: Record<Bottle['group'], string> = { glucose: 'recognize:glucose', saline: 'recognize:saline', ringer: 'recognize:ringer' }

function BottleSvg({ b, seen }: { b: Bottle; seen: boolean }) {
  return (
    <svg viewBox="0 0 60 100" className="h-24 w-14" aria-hidden="true">
      <rect x="22" y="2" width="16" height="8" rx="2" fill="#94a3b8" />
      <path d="M16 10 H44 V90 Q44 96 38 96 H22 Q16 96 16 90 Z" fill="#f8fafc" stroke={seen ? '#16a34a' : '#64748b'} strokeWidth="2" />
      <rect x="18" y={96 - b.level * 0.8} width="24" height={b.level * 0.8 - 2} fill={b.color} style={{ transition: 'all .4s' }} />
    </svg>
  )
}

function Recognize(p: ExtraProps) {
  const done = useDone(p)
  const [seen, setSeen] = useState<string[]>([])
  const [info, setInfo] = useState('Pulsa cada frasco para reconocerlo.')
  const click = (b: Bottle) => {
    const next = seen.includes(b.id) ? seen : [...seen, b.id]
    setSeen(next)
    setInfo(b.info)
    const group = BOTTLES.filter((x) => x.group === b.group)
    if (group.every((x) => next.includes(x.id)) && !done.includes(ACTION[b.group])) p.perform(ACTION[b.group])
  }
  return (
    <Panel icon={<FlaskConical size={16} aria-hidden="true" />} title="Reconocimiento de soluciones expuestas">
      <div className="flex flex-wrap gap-2">
        {BOTTLES.map((b) => {
          const s = seen.includes(b.id)
          return (
            <button key={b.id} type="button" disabled={p.disabled} onClick={() => click(b)} aria-label={`Reconocer: ${b.label}${s ? ' (reconocido)' : ''}`}
              className={`flex w-24 flex-col items-center gap-1 rounded-xl border-2 p-2 text-center text-[11px] font-medium ${s ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white hover:border-brand-500'}`}>
              <BottleSvg b={b} seen={s} />
              {b.label}
            </button>
          )
        })}
      </div>
      <p className="mt-3 rounded-lg bg-slate-50 p-2 text-xs text-slate-700" aria-live="polite">{info}</p>
      <p className="mt-1 text-[11px] text-slate-500">Reconoce los cuatro de glucosa, los tres salinos y el Ringer. Dibujo y nivel del líquido ilustrativos.</p>
    </Panel>
  )
}

/* ---------------- Concentración porcentual (teoría) ---------------- */
function Concept() {
  const [pct, setPct] = useState(10)
  return (
    <Panel icon={<Droplets size={16} aria-hidden="true" />} title="Concentración porcentual: gramos de soluto por 100 mL">
      <div className="flex flex-wrap items-center gap-4">
        <svg viewBox="0 0 80 100" className="h-28 w-24" role="img" aria-label={`Vaso de 100 mL con ${pct} g de glucosa`}>
          <path d="M14 8 H66 V88 Q66 94 60 94 H20 Q14 94 14 88 Z" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
          <rect x="16" y="30" width="48" height="62" fill="#fef3c7" />
          {Array.from({ length: Math.round(pct / 2.5) }).map((_, i) => (<circle key={i} cx={22 + (i % 6) * 8} cy={84 - Math.floor(i / 6) * 8} r="2.6" fill="#f59e0b" />))}
          <text x="40" y="22" fontSize="9" textAnchor="middle" fill="#475569">100 mL</text>
        </svg>
        <div className="flex-1 text-sm">
          <label className="block text-xs font-semibold text-slate-600" htmlFor="pct">Concentración: {pct}%</label>
          <input id="pct" type="range" min={5} max={50} step={5} value={pct} onChange={(e) => setPct(Number(e.target.value))} className="w-full max-w-xs" />
          <p className="mt-1 text-slate-700"><strong>{pct}%</strong> = {pct} g de glucosa por 100 mL de solución.</p>
          <p className="text-[11px] text-slate-500">Visual ilustrativa de la definición (g/100 mL).</p>
        </div>
      </div>
    </Panel>
  )
}

/* ---------------- Gráfico con los resultados del estudiante ---------------- */
function Compare({ state }: ExtraProps) {
  const done = (state.data.doneActions as string[]) ?? []
  const data = GL.map((g) => ({ name: `${g}%`, gramos: done.includes(`calc:g${g}`) ? (state.data[`val_g${g}`] as number) : null }))
  const any = data.some((d) => d.gramos !== null)
  return (
    <Panel icon={<BarChart3 size={16} aria-hidden="true" />} title="Comparación: gramos de glucosa en 500 mL (se construye con tus cálculos)">
      {any ? (
        <div className="h-52" role="img" aria-label="Gráfico de barras de gramos de glucosa por concentración">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" /><YAxis unit=" g" width={52} />
              <Bar dataKey="gramos" fill="#f59e0b" radius={[4, 4, 0, 0]} isAnimationActive={false}><LabelList dataKey="gramos" position="top" /></Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (<p className="text-sm text-slate-600">Resuelve los cálculos de abajo: cada resultado correcto aparecerá como una barra.</p>)}
      <p className="mt-1 text-[11px] text-slate-500">Volumen de 500 mL ilustrativo. Fórmula: gramos = % × volumen (mL) / 100.</p>
    </Panel>
  )
}

function Volume({ state }: ExtraProps) {
  const done = ((state.data.doneActions as string[]) ?? []).includes('calc:vol')
  return (
    <Panel icon={<Droplets size={16} aria-hidden="true" />} title="Volumen que contiene 25 g de glucosa al 50%">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <ol className="list-decimal space-y-1 pl-5 text-slate-700">
          <li>50% = 50 g por 100 mL.</li>
          <li>Volumen = gramos × 100 / concentración (%).</li>
          <li className={done ? 'font-semibold text-emerald-700' : 'text-slate-500'}>{done ? 'Resultado: 25 × 100 / 50 = 50 mL.' : 'Calcula y comprueba el resultado abajo.'}</li>
        </ol>
        <svg viewBox="0 0 60 100" className="h-24 w-14" aria-hidden="true">
          <path d="M16 8 H44 V90 Q44 96 38 96 H22 Q16 96 16 90 Z" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
          <rect x="18" y="52" width="24" height="42" fill="#fde68a" /><rect x="18" y={done ? 52 : 94} width="24" height={done ? 42 : 0} fill="#f59e0b" style={{ transition: 'all .5s' }} />
        </svg>
      </div>
    </Panel>
  )
}

export default function Extra2(p: ExtraProps) {
  if (p.state.status !== 'running') return null
  const id = STEP_IDS[Math.min(p.state.stepIndex, STEP_IDS.length - 1)]
  switch (id) {
    case 'theory': return <Concept />
    case 'recognize': return <Recognize {...p} />
    case 'compare': return <Compare {...p} />
    case 'volume': return <Volume {...p} />
    default: return null
  }
}
