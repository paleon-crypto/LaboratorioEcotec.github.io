/** Extracción de ADN: tubo Falcon que evoluciona con los pasos y clasificación de pasos según su propósito (esquemático). */
import Classify from '../../core/classify'
import type { ExtraProps } from '../../core/protocolBench'

export const PURPOSES = [
  { id: 'macerate', label: 'Macerar la fresa con el tampón de lisis' },
  { id: 'enzyme', label: 'Agregar ablandador de carne y calentar a 60 °C' },
  { id: 'ethanol', label: 'Añadir etanol frío por la pared del tubo' },
]

function Tube({ done }: { done: string[] }) {
  const has = (a: string) => done.includes(a)
  const lysate = has('macerate')
  const enzyme = has('tenderizer')
  const heated = has('waterbath')
  const filtered = has('filter')
  const ethanol = has('ethanol')
  const liquid = filtered ? '#fecdd3' : lysate ? (heated ? '#fda4af' : '#fb7185') : '#e0f2fe'
  return (
    <svg viewBox="0 0 220 260" className="mx-auto h-60 w-full max-w-[260px]" role="img" aria-label="Tubo Falcon con la muestra">
      <rect x="0" y="0" width="220" height="260" rx="14" fill="#f8fafc" />
      <path d="M80 20 h60 v150 q0 60 -30 60 q-30 0 -30 -60 z" fill="#fff" stroke="#64748b" strokeWidth="2" />
      <rect x="76" y="12" width="68" height="12" rx="3" fill="#94a3b8" />
      {filtered && <path d="M84 150 q26 70 52 0 v-10 h-52 z" fill="none" />}
      {lysate && <path d="M84 110 h52 v60 q0 50 -26 50 q-26 0 -26 -50 z" fill={liquid} opacity=".9" />}
      {lysate && !filtered && [0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={92 + i * 7} cy={196 + (i % 2) * 6} r="2.5" fill="#be123c" opacity=".7" />)}
      {enzyme && <text x="150" y="130" fontSize="9" fill="#475569">+ enzima</text>}
      {heated && <text x="150" y="146" fontSize="9" fill="#b45309">60 °C · 10 min</text>}
      {ethanol && <path d="M84 70 h52 v40 h-52 z" fill="#e0f2fe" opacity=".9" />}
      {ethanol && <text x="150" y="92" fontSize="9" fill="#0369a1">etanol frío</text>}
      {ethanol && (
        <g stroke="#f1f5f9" strokeWidth="2.2" fill="none" strokeLinecap="round">
          <path d="M100 108 q6 -14 0 -26 q-5 -10 4 -18" />
          <path d="M112 108 q-6 -12 2 -24 q6 -10 -2 -16" />
          <path d="M124 108 q5 -12 -1 -22" />
        </g>
      )}
      {ethanol && <text x="150" y="70" fontSize="9" fill="#334155">ADN fibroso</text>}
    </svg>
  )
}

export default function Extra12({ state, perform, disabled }: ExtraProps) {
  const done = (state.data.doneActions as string[]) ?? []
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-200 p-3">
        <p className="mb-1 text-sm font-semibold text-slate-700">Tubo Falcon (esquema ilustrativo)</p>
        <Tube done={done} />
        <p className="mt-1 text-xs text-slate-500">La sustancia fibrosa blanca/translúcida visible tras la precipitación con alcohol es el ADN (interpretación de la ficha).</p>
      </div>
      <Classify
        title="¿Para qué sirve cada paso?"
        help="Relaciona cada paso con su propósito."
        items={PURPOSES}
        bins={[{ id: 'lysis', label: 'Lisis celular' }, { id: 'denat', label: 'Desnaturalización de proteínas' }, { id: 'precip', label: 'Precipitación del ADN' }]}
        answer={{ macerate: 'lysis', enzyme: 'denat', ethanol: 'precip' }}
        prefix="purpose"
        wrongAction="purpose-wrong"
        done={done}
        perform={perform}
        disabled={disabled}
      />
    </div>
  )
}
