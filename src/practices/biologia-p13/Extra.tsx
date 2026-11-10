/** Osmolaridad y fragilidad osmótica: láminas A/B/C, punción capilar, microscopio por lámina e interpretación (esquemático). */
import { useState } from 'react'
import Classify from '../../core/classify'
import Microscope from '../../core/microscope'
import type { ExtraProps } from '../../core/protocolBench'

export type SlideId = 'A' | 'B' | 'C'
export const SLIDES: { id: SlideId; conc: string; label: string; morph: string }[] = [
  { id: 'A', conc: 'NaCl 0.3 %', label: 'Hipotónica', morph: 'Hemolizado / fantasma celular' },
  { id: 'B', conc: 'NaCl 0.9 %', label: 'Isotónica', morph: 'Normal (bicóncavo)' },
  { id: 'C', conc: 'NaCl 3.0 %', label: 'Hipertónica', morph: 'Crenado (equinocito)' },
]
const POS = [[16, 18], [40, 14], [66, 20], [86, 16], [20, 46], [48, 44], [74, 50], [14, 76], [42, 78], [70, 80], [88, 72]]

export function Cells({ s, r = 7 }: { s: SlideId; r?: number }) {
  return (
    <g>
      {POS.map(([x, y], i) => {
        if (s === 'A') return i % 3 === 0
          ? <circle key={i} cx={x} cy={y} r={r * 0.45} fill="none" stroke="#fca5a5" strokeDasharray="1 1" strokeWidth=".5" />
          : <circle key={i} cx={x} cy={y} r={r * 1.2} fill="#ffe4e6" stroke="#f43f5e" strokeWidth=".5" opacity=".85" />
        if (s === 'C') {
          const pts = Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; const rr = k % 2 ? r * 0.7 : r * 0.95; return `${x + Math.cos(a) * rr},${y + Math.sin(a) * rr}` }).join(' ')
          return <polygon key={i} points={pts} fill="#e11d48" opacity=".85" />
        }
        return <g key={i}><circle cx={x} cy={y} r={r} fill="#fda4af" stroke="#f43f5e" strokeWidth=".5" /><circle cx={x} cy={y} r={r * 0.4} fill="#ffe4e6" /></g>
      })}
    </g>
  )
}

function SlideRow({ done }: { done: string[] }) {
  const dropped = (id: string) => done.includes(`drop:${id}`)
  return (
    <section aria-label="Láminas" className="rounded-xl border-2 border-brand-200 bg-white p-4">
      <h3 className="mb-2 text-sm font-bold text-brand-900">Láminas portaobjetos</h3>
      <div className="grid grid-cols-3 gap-2">
        {SLIDES.map((s) => (
          <figure key={s.id} className="text-center">
            <svg viewBox="0 0 100 44" className="w-full" role="img" aria-label={`Lámina ${s.id}${done.includes('label') ? `: ${s.conc}` : ' sin rotular'}`}>
              <rect x="2" y="6" width="96" height="32" rx="3" fill="#f1f5f9" stroke="#94a3b8" />
              {done.includes('label') && <rect x="6" y="9" width="22" height="9" rx="1.5" fill="#fff" stroke="#cbd5e1" />}
              {done.includes('label') && <text x="17" y="16" fontSize="6" textAnchor="middle" fill="#334155">{s.id}</text>}
              {dropped(s.id) && <ellipse cx="62" cy="24" rx="16" ry="8" fill="#bae6fd" opacity=".8" />}
              {done.includes('collect') && dropped(s.id) && <circle cx="62" cy="24" r="4" fill="#dc2626" />}
              {done.includes('coverslip') && <rect x="42" y="12" width="40" height="24" rx="1.5" fill="#e0f2fe" opacity=".5" stroke="#38bdf8" />}
            </svg>
            <figcaption className="text-[11px] text-slate-600">{done.includes('label') ? `${s.id}: ${s.conc}` : `Lámina ${s.id}`}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function Finger({ done }: { done: string[] }) {
  const has = (a: string) => done.includes(a)
  return (
    <section aria-label="Dedo del paciente" className="flex items-center gap-4 rounded-xl border-2 border-brand-200 bg-white p-4">
      <svg viewBox="0 0 80 120" className="h-32 w-24" role="img" aria-label="Yema del dedo (esquema)">
        <path d="M22 118 V40 q0 -30 18 -30 q18 0 18 30 V118 z" fill={has('gloves') ? '#bfdbfe' : '#fcd9bd'} stroke="#a16207" strokeWidth="1.2" />
        {has('massage') && <path d="M40 100 V30" stroke="#ef4444" strokeWidth="1.6" strokeDasharray="3 3" markerEnd="url(#a)" />}
        {has('antisepsis') && <ellipse cx="56" cy="30" rx="4" ry="9" fill="#a5f3fc" opacity=".8" />}
        {has('lancet') && <circle cx="57" cy="30" r="1.6" fill="#7f1d1d" />}
        {has('lancet') && !has('wipe') && <circle cx="60" cy="38" r="3.2" fill="#dc2626" />}
        {has('wipe') && !has('collect') && <circle cx="61" cy="39" r="4.4" fill="#dc2626" />}
        {has('collect') && <circle cx="61" cy="39" r="1.8" fill="#fecaca" />}
      </svg>
      <ul className="space-y-1 text-sm text-slate-700">
        {[['gloves', 'Guantes colocados'], ['massage', 'Dedo masajeado'], ['antisepsis', 'Antisepsia y secado al aire'], ['lancet', 'Punción lateral y lanceta al guardián'], ['wipe', 'Primera gota descartada'], ['collect', 'Muestra recogida en la lámina']].map(([k, l]) => (
          <li key={k} className={done.includes(k) ? 'font-semibold text-emerald-700' : 'text-slate-400'}>{done.includes(k) ? '✓' : '○'} {l}</li>
        ))}
      </ul>
    </section>
  )
}

export default function Extra13({ state, perform, disabled }: ExtraProps) {
  const done = (state.data.doneActions as string[]) ?? []
  const part = state.roundIndex
  const [slide, setSlide] = useState<SlideId>('B')
  const cur = SLIDES.find((s) => s.id === slide)!
  if (part === 0) return <div className="space-y-3"><SlideRow done={done} />
    <Classify
      title="Colocar una gota de cada solución en su lámina"
      help="Arrastra cada solución a la lámina rotulada que le corresponde (A, B o C)."
      items={SLIDES.map((s) => ({ id: s.id, label: `Gota de ${s.conc}` }))}
      bins={SLIDES.map((s) => ({ id: s.id, label: `Lámina ${s.id}` }))}
      answer={{ A: 'A', B: 'B', C: 'C' }}
      prefix="drop"
      wrongAction="drop-wrong"
      done={done}
      perform={perform}
      disabled={disabled}
    /></div>
  if (part === 1) return <div className="space-y-3"><Finger done={done} /><SlideRow done={done} /></div>
  if (part === 2) return <SlideRow done={done} />
  if (part === 3) {
    const go = (a: string) => { if (!done.includes(a)) perform(a) }
    return (
      <div className="space-y-3">
        <section aria-label="Lámina en la platina" className="rounded-xl border-2 border-brand-200 bg-white p-4">
          <h3 className="mb-2 text-sm font-bold text-brand-900">Lámina en la platina</h3>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Elegir lámina">
            {SLIDES.map((s) => (
              <button key={s.id} type="button" disabled={disabled} aria-pressed={slide === s.id} onClick={() => setSlide(s.id)} className={`rounded-lg border-2 px-3 py-1.5 text-sm font-medium ${slide === s.id ? 'border-brand-600 bg-brand-50 text-brand-800' : 'border-slate-200 text-slate-600'}`}>
                {done.includes(`${s.id}:40`) ? '✓ ' : ''}Lámina {s.id} · {s.conc}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-500">Según la ficha: empieza por la lámina B, enfoca a 10× y 40× (el 100× con aceite de inmersión es opcional) y repite con A y C.</p>
        </section>
        <Microscope key={slide} objectives={[10, 40, 100]} disabled={disabled} caption={`Glóbulos rojos en ${cur.conc} (esquema ilustrativo)`} onFocused={(o) => { if (o === 10 || o === 40) go(`${slide}:${o}`) }} render={() => <Cells s={slide} />} />
      </div>
    )
  }
  return (
    <div className="space-y-3">
      <section aria-label="Comparación" className="rounded-xl border-2 border-brand-200 bg-white p-4">
        <h3 className="mb-2 text-sm font-bold text-brand-900">Comparación de las tres láminas (esquema)</h3>
        <div className="grid grid-cols-3 gap-2">
          {SLIDES.map((s) => (
            <figure key={s.id} className="text-center">
              <svg viewBox="0 0 100 100" className="w-full rounded-full bg-slate-900" role="img" aria-label={`Lámina ${s.id} ${s.conc}`}><rect width="100" height="100" fill="#fff7f7" /><Cells s={s.id} r={6} /></svg>
              <figcaption className="text-[11px] text-slate-600">{s.id}: {s.conc}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <Classify
        title="Relacionar cada forma del eritrocito con su medio"
        help="Observa y compara el aspecto de los glóbulos rojos en cada medio."
        items={SLIDES.map((s) => ({ id: s.id, label: s.morph }))}
        bins={SLIDES.map((s) => ({ id: s.id, label: `${s.label} (${s.conc})` }))}
        answer={{ A: 'A', B: 'B', C: 'C' }}
        prefix="morph"
        wrongAction="morph-wrong"
        done={done}
        perform={perform}
        disabled={disabled}
      />
    </div>
  )
}
