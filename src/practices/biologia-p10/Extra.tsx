/** Tipificación sanguínea: cartilla con reactivos, aglutinación y determinación del grupo (simulación educativa). */
import Classify from '../../core/classify'
import type { ExtraProps } from '../../core/protocolBench'

/** Casos ilustrativos (no provienen de la ficha). */
export const CASES: Record<string, { abo: 'A' | 'B' | 'AB' | 'O'; rh: '+' | '-' }> = {
  'a-pos': { abo: 'A', rh: '+' },
  'b-pos': { abo: 'B', rh: '+' },
  'ab-neg': { abo: 'AB', rh: '-' },
  'o-neg': { abo: 'O', rh: '-' },
}
export const REAGENTS = [
  { id: 'anti-a', label: 'Reactivo anti-A' },
  { id: 'anti-b', label: 'Reactivo anti-B' },
  { id: 'anti-ab', label: 'Mezcla anti-A + anti-B' },
  { id: 'anti-d', label: 'Reactivo anti-D' },
]
const WELLS = [
  { id: 'wa', label: 'Casilla anti-A' },
  { id: 'wb', label: 'Casilla anti-B' },
  { id: 'wab', label: 'Casilla anti-A + anti-B' },
  { id: 'wd', label: 'Casilla anti-D' },
]
const ANSWER = { 'anti-a': 'wa', 'anti-b': 'wb', 'anti-ab': 'wab', 'anti-d': 'wd' }

export function agglutinates(scenario: string) {
  const c = CASES[scenario] ?? CASES['a-pos']
  const a = c.abo === 'A' || c.abo === 'AB'
  const b = c.abo === 'B' || c.abo === 'AB'
  return { wa: a, wb: b, wab: a || b, wd: c.rh === '+' }
}

export default function Extra10({ state, perform, disabled }: ExtraProps) {
  const done = (state.data.doneActions as string[]) ?? []
  const mixed = done.includes('mix')
  const agg = agglutinates(state.scenarioId)
  return (
    <div className="space-y-3">
      <Classify
        title="Colocar cada reactivo en su casilla de la cartilla"
        help="Una gota de cada reactivo en su casilla (anti-A, anti-B, la mezcla anti-A + anti-B y anti-D)."
        items={REAGENTS}
        bins={WELLS}
        answer={ANSWER}
        prefix="reagent"
        wrongAction="reagent-wrong"
        done={done}
        perform={perform}
        disabled={disabled}
      />
      <section aria-label="Cartilla de grupo sanguíneo" className="rounded-xl border-2 border-brand-200 bg-white p-4">
        <h3 className="mb-2 text-sm font-bold text-brand-900">Cartilla (simulación)</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {WELLS.map((w) => {
            const filled = done.includes(`reagent:${Object.entries(ANSWER).find(([, v]) => v === w.id)![0]}`) && done.includes('blood-drops')
            const clumps = mixed && filled && agg[w.id as keyof typeof agg]
            return (
              <figure key={w.id} className="text-center">
                <svg viewBox="0 0 60 60" className="mx-auto h-16 w-16" role="img" aria-label={`${w.label}: ${!filled ? 'vacía' : !mixed ? 'sin mezclar' : clumps ? 'aglutinación' : 'sin aglutinación'}`}>
                  <circle cx="30" cy="30" r="26" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
                  {filled && <circle cx="30" cy="30" r="20" fill="#fecaca" />}
                  {clumps && [[22, 24], [34, 22], [28, 34], [38, 36], [20, 38], [30, 28]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.2" fill="#b91c1c" />)}
                </svg>
                <figcaption className="text-[11px] text-slate-600">{w.label}</figcaption>
              </figure>
            )
          })}
        </div>
        <p className="mt-2 text-xs text-slate-500">Muestra ilustrativa: la ficha no entrega muestras. Simulación educativa, no una prueba diagnóstica.</p>
      </section>
      {mixed && (
        <section aria-label="Determinar el grupo sanguíneo" className="rounded-xl border-2 border-brand-200 bg-white p-4">
          <h3 className="mb-2 text-sm font-bold text-brand-900">Determinar el grupo sanguíneo</h3>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Sistema ABO">
            {['A', 'B', 'AB', 'O'].map((g) => (
              <button key={g} type="button" disabled={disabled || done.includes('abo')} onClick={() => perform('abo', g)} className={`rounded-lg border-2 px-4 py-2 text-sm font-bold ${done.includes(`abo:${g}`) ? 'border-emerald-400 bg-emerald-50 text-emerald-800' : 'border-slate-200 text-slate-700 hover:border-brand-500'}`}>Grupo {g}</button>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Factor Rh">
            {[['+', 'Rh positivo'], ['-', 'Rh negativo']].map(([v, l]) => (
              <button key={v} type="button" disabled={disabled || done.includes('rh')} onClick={() => perform('rh', v)} className={`rounded-lg border-2 px-4 py-2 text-sm font-bold ${done.includes(`rh:${v}`) ? 'border-emerald-400 bg-emerald-50 text-emerald-800' : 'border-slate-200 text-slate-700 hover:border-brand-500'}`}>{l}</button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
