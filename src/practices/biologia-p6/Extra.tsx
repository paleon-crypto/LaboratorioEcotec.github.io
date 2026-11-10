/** Tinción de Gram: color del frotis por etapa, microscopio (40×/100×) y clasificación por color (esquemático). */
import Classify from '../../core/classify'
import Microscope from '../../core/microscope'
import type { ExtraProps } from '../../core/protocolBench'

/** Color de las bacterias Gram+ / Gram− según la etapa alcanzada. */
export function colors(done: string[]) {
  const has = (k: string) => done.includes(k)
  const pos = has('safranin') ? '#7c3aed' : has('iodine') ? '#5b21b6' : has('cv') ? '#8b5cf6' : '#d1d5db'
  const neg = has('safranin') ? '#f472b6' : has('decolor') ? '#e5e7eb' : has('iodine') ? '#6d28d9' : has('cv') ? '#8b5cf6' : '#d1d5db'
  return { pos, neg }
}

const POS = [[20, 20], [26, 26], [32, 20], [70, 70], [76, 76], [64, 76], [24, 70], [30, 76]]
const NEG = [[60, 24], [70, 30], [50, 52], [40, 40], [80, 52], [20, 52]]

function Field({ pos, neg }: { pos: string; neg: string }) {
  return (
    <g>
      {POS.map(([x, y], i) => <circle key={`p${i}`} cx={x} cy={y} r="4" fill={pos} />)}
      {NEG.map(([x, y], i) => <rect key={`n${i}`} x={x - 7} y={y - 2.5} width="14" height="5" rx="2.5" fill={neg} transform={`rotate(${(i * 37) % 90} ${x} ${y})`} />)}
    </g>
  )
}

export default function Extra6({ state, perform, disabled }: ExtraProps) {
  const done = (state.data.doneActions as string[]) ?? []
  const go = (a: string) => { if (!done.includes(a)) perform(a) }
  const part = state.roundIndex
  const { pos, neg } = colors(done)
  const stage = done.includes('dry') ? 'Frotis teñido y seco' : done.includes('safranin') ? 'Contraste con safranina' : done.includes('decolor') ? 'Decolorado' : done.includes('iodine') ? 'Mordiente (yodo)' : done.includes('cv') ? 'Colorante primario (violeta de genciana)' : done.includes('fix') ? 'Frotis fijado' : 'Sin frotis'
  if (part === 0) {
    const seeded = done.includes('seed')
    const incubated = done.includes('incubate')
    return (
      <section aria-label="Caja Petri" className="flex items-center gap-4 rounded-xl border-2 border-brand-200 bg-white p-4">
        <svg viewBox="0 0 100 100" className="h-28 w-28" role="img" aria-label={`Caja Petri: ${incubated ? 'colonias tras la incubación' : seeded ? 'sembrada' : done.includes('label') ? 'etiquetada' : 'sin preparar'}`}>
          <circle cx="50" cy="50" r="44" fill="#fef3c7" stroke="#94a3b8" strokeWidth="3" />
          {done.includes('label') && <rect x="30" y="86" width="40" height="8" rx="2" fill="#fff" stroke="#94a3b8" />}
          {seeded && <path d="M30 40 q20 -12 40 0 M30 55 q20 -12 40 0" stroke="#a16207" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />}
          {incubated && [[36, 38], [50, 34], [62, 42], [40, 56], [58, 58], [48, 46]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" fill="#fffbeb" stroke="#d97706" />)}
        </svg>
        <p className="text-sm font-medium text-slate-700">{incubated ? 'Colonias desarrolladas (ilustrativo)' : seeded ? 'Muestra sembrada: falta incubar' : done.includes('label') ? 'Caja etiquetada' : 'Caja Petri con agar'}</p>
      </section>
    )
  }
  return (
    <div className="space-y-3">
      <section aria-label="Estado del frotis" className="flex items-center gap-4 rounded-xl border-2 border-brand-200 bg-white p-4">
        <svg viewBox="0 0 100 40" className="h-16 w-40" role="img" aria-label={`Portaobjetos: ${stage}`}>
          <rect x="2" y="6" width="96" height="28" rx="3" fill="#f1f5f9" stroke="#94a3b8" />
          {done.includes('smear') && <ellipse cx="50" cy="20" rx="26" ry="9" fill={done.includes('cv') ? (done.includes('safranin') ? '#f9a8d4' : '#a78bfa') : '#e2e8f0'} opacity=".8" />}
        </svg>
        <p className="text-sm font-medium text-slate-700">{stage}</p>
      </section>
      {part < 3 ? null : <Microscope objectives={[40, 100]} disabled={disabled} caption="Frotis bacteriano (esquema ilustrativo)" onObjective={(o) => go(`obj-${o}`)} onFocused={(o) => go(`focus:${o}`)} render={() => <Field pos={pos} neg={neg} />} />}
      {part < 3 ? null : <Classify
        title="Clasificar las bacterias observadas según su color"
        help="Interpretación de la ficha: violeta/morado = Gram positiva; rosado/rojo = Gram negativa."
        items={[{ id: 'violet', label: 'Bacteria de color violeta' }, { id: 'pink', label: 'Bacteria de color rosado' }]}
        bins={[{ id: 'pos', label: 'Gram positiva (pared gruesa de peptidoglicano)' }, { id: 'neg', label: 'Gram negativa (pared delgada y membrana externa)' }]}
        answer={{ violet: 'pos', pink: 'neg' }}
        prefix="classify"
        wrongAction="classify-wrong"
        done={done}
        perform={perform}
        disabled={disabled}
      />}
    </div>
  )
}
