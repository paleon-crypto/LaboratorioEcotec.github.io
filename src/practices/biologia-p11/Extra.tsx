/** Mitosis: meristemo de raíz de cebolla al microscopio y clasificación de fases (esquemático). */
import Classify from '../../core/classify'
import Microscope from '../../core/microscope'
import type { ExtraProps } from '../../core/protocolBench'

export const PHASES = [
  { id: 'prophase', label: 'Cromosomas visibles y condensados' },
  { id: 'metaphase', label: 'Cromosomas alineados en el centro' },
  { id: 'anaphase', label: 'Cromátidas separándose hacia los polos' },
  { id: 'telophase', label: 'Reformación de núcleos y división celular' },
]

function Cell({ x, y, phase }: { x: number; y: number; phase: string }) {
  return (
    <g>
      <rect x={x} y={y} width="24" height="24" rx="3" fill="#ede9fe" stroke="#a78bfa" strokeWidth=".7" />
      {phase === 'interphase' && <circle cx={x + 12} cy={y + 12} r="6" fill="#a78bfa" opacity=".7" />}
      {phase === 'prophase' && [0, 1, 2, 3].map((i) => <path key={i} d={`M${x + 6 + i * 4} ${y + 8} q2 4 0 8`} stroke="#4c1d95" strokeWidth="1.2" fill="none" />)}
      {phase === 'metaphase' && <line x1={x + 12} y1={y + 5} x2={x + 12} y2={y + 19} stroke="#4c1d95" strokeWidth="2.4" strokeDasharray="2 1" />}
      {phase === 'anaphase' && <><line x1={x + 5} y1={y + 7} x2={x + 19} y2={y + 7} stroke="#4c1d95" strokeWidth="2" strokeDasharray="2 1" /><line x1={x + 5} y1={y + 17} x2={x + 19} y2={y + 17} stroke="#4c1d95" strokeWidth="2" strokeDasharray="2 1" /></>}
      {phase === 'telophase' && <><circle cx={x + 12} cy={y + 6} r="3.5" fill="#4c1d95" /><circle cx={x + 12} cy={y + 18} r="3.5" fill="#4c1d95" /><line x1={x + 2} y1={y + 12} x2={x + 22} y2={y + 12} stroke="#a78bfa" /></>}
    </g>
  )
}

const LAYOUT: [number, number, string][] = [[6, 6, 'interphase'], [34, 6, 'prophase'], [62, 6, 'interphase'], [6, 34, 'metaphase'], [34, 34, 'interphase'], [62, 34, 'anaphase'], [6, 62, 'interphase'], [34, 62, 'telophase'], [62, 62, 'interphase']]

export default function Extra11({ state, perform, disabled }: ExtraProps) {
  const done = (state.data.doneActions as string[]) ?? []
  const go = (a: string) => { if (!done.includes(a)) perform(a) }
  return (
    <div className="space-y-3">
      <Microscope objectives={[10, 40]} disabled={disabled} caption="Meristemo de raíz de cebolla teñido con orceína (esquema ilustrativo)" onObjective={(o) => go(`obj-${o}`)} onFocused={(o) => go(`focus:${o}`)} render={() => <g>{LAYOUT.map(([x, y, p], i) => <Cell key={i} x={x} y={y} phase={p} />)}</g>} />
      <Classify
        title="Reconocer las fases de la mitosis"
        help="Relaciona cada característica con su fase, según la interpretación de la ficha."
        items={PHASES}
        bins={[{ id: 'prophase', label: 'Profase' }, { id: 'metaphase', label: 'Metafase' }, { id: 'anaphase', label: 'Anafase' }, { id: 'telophase', label: 'Telofase' }]}
        answer={{ prophase: 'prophase', metaphase: 'metaphase', anaphase: 'anaphase', telophase: 'telophase' }}
        prefix="phase"
        wrongAction="phase-wrong"
        done={done}
        perform={perform}
        disabled={disabled}
      />
    </div>
  )
}
