/** Ósmosis en eritrocitos: tres soluciones y la respuesta del eritrocito (esquemático, según la interpretación de la ficha). */
import { useState } from 'react'
import Classify from '../../core/classify'
import Microscope from '../../core/microscope'
import type { ExtraProps } from '../../core/protocolBench'

type Sol = 'hipo' | 'iso' | 'hiper'
const SOLS: { id: Sol; label: string; effect: string }[] = [
  { id: 'hipo', label: 'Hipotónica', effect: 'El agua entra, los eritrocitos se hinchan y pueden romperse (hemólisis).' },
  { id: 'iso', label: 'Isotónica', effect: 'Los eritrocitos mantienen su forma normal.' },
  { id: 'hiper', label: 'Hipertónica', effect: 'El agua sale, los eritrocitos se encogen y se arrugan (crenación).' },
]
const CELLS = [[16, 18], [40, 14], [66, 20], [86, 16], [20, 46], [48, 44], [74, 50], [14, 76], [42, 78], [70, 80], [88, 72]]

function Cells({ sol }: { sol: Sol }) {
  return (
    <g>
      {CELLS.map(([x, y], i) => {
        if (sol === 'hipo') return i % 3 === 0 ? <circle key={i} cx={x} cy={y} r="3" fill="none" stroke="#fca5a5" strokeDasharray="1 1" strokeWidth=".5" /> : <circle key={i} cx={x} cy={y} r="8.5" fill="#fecdd3" stroke="#f43f5e" strokeWidth=".6" />
        if (sol === 'hiper') return <path key={i} d={`M${x - 5} ${y} L${x - 3} ${y - 4} L${x} ${y - 6} L${x + 3} ${y - 4} L${x + 6} ${y} L${x + 4} ${y + 4} L${x} ${y + 6} L${x - 4} ${y + 4} Z`} fill="#f43f5e" opacity=".8" />
        return <circle key={i} cx={x} cy={y} r="6" fill="#fda4af" stroke="#f43f5e" strokeWidth=".6" />
      })}
    </g>
  )
}

export default function Extra8({ state, perform, disabled }: ExtraProps) {
  const done = (state.data.doneActions as string[]) ?? []
  const [sol, setSol] = useState<Sol>('iso')
  const go = (a: string) => { if (!done.includes(a)) perform(a) }
  const cur = SOLS.find((s) => s.id === sol)!
  return (
    <div className="space-y-3">
      <section aria-label="Solución observada" className="rounded-xl border-2 border-brand-200 bg-white p-4">
        <h3 className="mb-2 text-sm font-bold text-brand-900">Solución en observación</h3>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Elegir solución">
          {SOLS.map((s) => (
            <button key={s.id} type="button" aria-pressed={sol === s.id} onClick={() => setSol(s.id)} className={`rounded-lg border-2 px-3 py-1.5 text-sm font-medium ${sol === s.id ? 'border-brand-600 bg-brand-50 text-brand-800' : 'border-slate-200 text-slate-600'}`}>{s.label}</button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">Según la interpretación de la ficha. Imagen esquemática.</p>
      </section>
      <Microscope objectives={[10, 40]} disabled={disabled} caption={`Eritrocitos en solución ${cur.label.toLowerCase()} (esquema ilustrativo)`} onObjective={(o) => go(`obj-${o}`)} onFocused={(o) => go(`focus:${o}`)} render={() => <Cells sol={sol} />} />
      <Classify
        title="Relacionar cada solución con su efecto sobre el eritrocito"
        items={[{ id: 'swell', label: 'Se hinchan y pueden romperse (hemólisis)' }, { id: 'normal', label: 'Mantienen su forma normal' }, { id: 'shrink', label: 'Se encogen y se arrugan (crenación)' }]}
        bins={[{ id: 'hipo', label: 'Solución hipotónica' }, { id: 'iso', label: 'Solución isotónica' }, { id: 'hiper', label: 'Solución hipertónica' }]}
        answer={{ swell: 'hipo', normal: 'iso', shrink: 'hiper' }}
        prefix="effect"
        wrongAction="effect-wrong"
        done={done}
        perform={perform}
        disabled={disabled}
      />
    </div>
  )
}
