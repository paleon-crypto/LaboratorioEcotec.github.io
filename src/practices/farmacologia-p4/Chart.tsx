import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { EngineState } from '../../core/types'

/** Parámetros ILUSTRATIVOS (no provienen de la guía). */
export const PK = { dose: 100, v: 20, ke: 0.2, kaOral: 1.2, kaIm: 2.0 }

const conc = (ka: number | null, t: number) =>
  ka === null ? (PK.dose / PK.v) * Math.exp(-PK.ke * t) : ((PK.dose * ka) / (PK.v * (ka - PK.ke))) * (Math.exp(-PK.ke * t) - Math.exp(-ka * t))

export const tmax = (ka: number) => Math.log(ka / PK.ke) / (ka - PK.ke)
export const halfLife = Math.LN2 / PK.ke

const SERIES = [
  { key: 'iv', label: 'Intravenosa', color: '#b91c1c', ka: null as number | null },
  { key: 'im', label: 'Intramuscular', color: '#1d6fa3', ka: PK.kaIm },
  { key: 'oral', label: 'Oral', color: '#15803d', ka: PK.kaOral },
]

export default function Chart({ state }: { state: EngineState }) {
  const done = (state.data.doneActions as string[]) ?? []
  const shown = SERIES.filter((s) => done.includes(`review:${s.key}`))
  const data = Array.from({ length: 97 }, (_, i) => {
    const t = i * 0.25
    const row: Record<string, number> = { t }
    for (const s of shown) row[s.key] = Number(conc(s.ka, t).toFixed(3))
    return row
  })
  return (
    <section aria-label="Curvas farmacocinéticas ilustrativas" className="rounded-xl bg-white/80 p-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Curvas concentración plasmática – tiempo (ilustrativas)</h3>
      <p className="mb-2 text-xs text-slate-600">Dosis 100 mg, V = 20 L, ke = 0,2 h⁻¹ (valores ilustrativos, no de la guía). Pasa el cursor para leer valores.</p>
      <div className="h-56 w-full" role="img" aria-label={`Curvas de ${shown.map((s) => s.label).join(', ') || 'ninguna vía aún'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 16 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="t" type="number" domain={[0, 24]} tickCount={13} tick={{ fontSize: 11 }} label={{ value: 'Tiempo (h)', position: 'insideBottom', offset: -8, fontSize: 11 }} />
            <YAxis width={36} tick={{ fontSize: 11 }} label={{ value: 'mg/L', angle: -90, position: 'insideLeft', fontSize: 11 }} />
            <Tooltip formatter={(v) => `${v} mg/L`} labelFormatter={(l) => `${l} h`} />
            <Legend verticalAlign="top" height={24} />
            {shown.map((s) => (
              <Line key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={s.color} dot={false} strokeWidth={2} isAnimationActive={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {shown.length === 0 && <p className="text-center text-xs text-slate-500">Revisa las curvas modelo para mostrarlas.</p>}
    </section>
  )
}
