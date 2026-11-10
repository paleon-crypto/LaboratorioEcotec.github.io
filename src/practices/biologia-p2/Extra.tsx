/** Micropipetas (ficha): elegir punta según el rango y practicar los topes del émbolo. */
import { Pipette } from 'lucide-react'
import Classify from '../../core/classify'
import type { ExtraProps } from '../../core/protocolBench'

export const TIPS = [
  { id: 'white', label: 'Punta blanca (0 a 10 µL)' },
  { id: 'yellow', label: 'Punta amarilla (20 a 200 µL)' },
  { id: 'blue', label: 'Punta azul (100 a 1000 µL)' },
]
const BINS = [
  { id: 'p10', label: 'Micropipeta 0–10 µL' },
  { id: 'p200', label: 'Micropipeta 20–200 µL' },
  { id: 'p1000', label: 'Micropipeta 100–1000 µL' },
]
const ANSWER = { white: 'p10', yellow: 'p200', blue: 'p1000' }
const TIP_COLOR: Record<string, string> = { white: '#f8fafc', yellow: '#fde047', blue: '#60a5fa' }

function PipetteDrawing({ done }: { done: string[] }) {
  const has = (k: string) => done.includes(k)
  const plunger = has('dispense-2') ? 2 : has('dispense-1') ? 1 : has('aspirate') ? 0 : has('stop1') ? 1 : 0
  const tip = has('classify:white') ? TIP_COLOR.white : TIP_COLOR.yellow
  const hasTip = has('classify:white') || has('classify:yellow') || has('classify:blue')
  const liquid = has('aspirate') && !has('dispense-2')
  const discarded = has('discard')
  return (
    <svg viewBox="0 0 200 260" className="h-60 w-40" role="img" aria-label={`Micropipeta: émbolo en ${plunger === 0 ? 'reposo' : plunger === 1 ? 'primer tope' : 'segundo tope'}${liquid ? ', con líquido en la punta' : ''}`}>
      <rect x="85" y={8 + plunger * 14} width="30" height="14" rx="4" fill="#ef4444" style={{ transition: 'y .3s' }} />
      <rect x="95" y={22 + plunger * 14} width="10" height="30" fill="#94a3b8" style={{ transition: 'y .3s' }} />
      <rect x="70" y="52" width="60" height="110" rx="14" fill="#1e3a5f" />
      <rect x="82" y="68" width="36" height="22" rx="3" fill="#e2e8f0" />
      <text x="100" y="84" fontSize="11" fontWeight="700" textAnchor="middle" fill="#0f172a">µL</text>
      <rect x="88" y="162" width="24" height="26" fill="#475569" />
      {hasTip && !discarded && (
        <>
          <path d="M88 188 H112 L104 250 H96 Z" fill={tip} stroke="#64748b" strokeWidth="1.5" opacity=".9" />
          {liquid && <path d="M97 224 H103 L102 248 H98 Z" fill="#38bdf8" />}
        </>
      )}
      {discarded && <text x="100" y="230" fontSize="11" textAnchor="middle" fill="#15803d">punta desechada ✓</text>}
    </svg>
  )
}

export default function Extra2({ state, perform, disabled }: ExtraProps) {
  const done = (state.data.doneActions as string[]) ?? []
  return (
    <div className="space-y-3">
      <Classify
        title="Elegir la punta que corresponde a cada micropipeta"
        help="Según los rangos de puntas y micropipetas indicados en la ficha."
        items={TIPS}
        bins={BINS}
        answer={ANSWER}
        prefix="classify"
        wrongAction="tip-wrong"
        done={done}
        perform={perform}
        disabled={disabled}
      />
      <section aria-label="Micropipeta" className="flex flex-wrap items-center gap-4 rounded-xl border-2 border-brand-200 bg-white p-4">
        <PipetteDrawing done={done} />
        <div className="min-w-0 flex-1 text-sm text-slate-600">
          <h3 className="mb-1 flex items-center gap-2 font-bold text-brand-900"><Pipette size={16} aria-hidden="true" /> Émbolo y topes</h3>
          <p>Primer tope: aspiración / inicio de la dispensación. Segundo tope: vaciado completo. El volumen a pipetear no figura en la ficha («contenido previamente ajustado»).</p>
          <p className="mt-2 text-xs text-slate-500">Dibujo esquemático. Usa las tarjetas de acción para realizar cada fase en orden.</p>
        </div>
      </section>
    </div>
  )
}
