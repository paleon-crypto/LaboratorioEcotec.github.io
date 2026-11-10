import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { EngineState } from '../../core/types'

/** Parámetros ILUSTRATIVOS (no provienen de la guía). */
export const DR = { emax: 100, ec50: 10, ec50Comp: 40, emaxNon: 50 }

const resp = (c: number, emax: number, ec50: number) => (emax * c) / (ec50 + c)

export default function Chart({ state }: { state: EngineState }) {
  const done = (state.data.doneActions as string[]) ?? []
  const show = { a: done.includes('sim:agonist'), c: done.includes('sim:competitive'), n: done.includes('sim:noncompetitive') }
  const data = Array.from({ length: 41 }, (_, i) => {
    const c = Math.pow(10, -1 + i * 0.1)
    return {
      c: Number(c.toFixed(3)),
      a: Number(resp(c, DR.emax, DR.ec50).toFixed(2)),
      comp: Number(resp(c, DR.emax, DR.ec50Comp).toFixed(2)),
      non: Number(resp(c, DR.emaxNon, DR.ec50).toFixed(2)),
    }
  })
  return (
    <section aria-label="Curvas dosis-respuesta ilustrativas" className="rounded-xl bg-white/80 p-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Curvas dosis-respuesta (ilustrativas)</h3>
      <p className="mb-2 text-xs text-slate-600">Valores ilustrativos (no de la guía). Ejecuta las simulaciones para mostrar las curvas.</p>
      <div className="h-56 w-full" role="img" aria-label="Curvas dosis-respuesta del agonista solo y con antagonistas">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 16 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="c" type="number" scale="log" domain={[0.1, 1000]} ticks={[0.1, 1, 10, 100, 1000]} tick={{ fontSize: 11 }} label={{ value: 'Dosis del agonista (escala log)', position: 'insideBottom', offset: -8, fontSize: 11 }} />
            <YAxis width={36} domain={[0, 100]} tick={{ fontSize: 11 }} label={{ value: '% efecto', angle: -90, position: 'insideLeft', fontSize: 11 }} />
            <Tooltip />
            <Legend verticalAlign="top" height={24} />
            {show.a && <Line type="monotone" dataKey="a" name="Agonista solo" stroke="#1d6fa3" dot={false} strokeWidth={2} isAnimationActive={false} />}
            {show.c && <Line type="monotone" dataKey="comp" name="+ Antagonista competitivo" stroke="#b45309" dot={false} strokeWidth={2} isAnimationActive={false} />}
            {show.n && <Line type="monotone" dataKey="non" name="+ Antagonista no competitivo" stroke="#b91c1c" dot={false} strokeWidth={2} isAnimationActive={false} />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
