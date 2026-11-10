/** Microscopio óptico: manejo y enfoque. La preparación es esquemática (algodón y papel milimetrado, insumos de la ficha). */
import type { ExtraProps } from '../../core/protocolBench'
import Microscope from '../../core/microscope'

const FIBERS = [
  'M10 20 Q30 10 50 25 T90 18', 'M5 50 Q25 40 45 55 T95 45', 'M12 78 Q35 65 55 80 T92 70', 'M20 10 Q15 40 30 60 T25 95', 'M70 8 Q80 35 65 60 T80 94',
]

function Sample({ zoom }: { zoom: number }) {
  return (
    <g>
      {[...Array(21)].map((_, i) => (
        <g key={i}>
          <line x1={i * 5} y1="0" x2={i * 5} y2="100" stroke="#f87171" strokeWidth={i % 5 === 0 ? 0.5 : 0.2} />
          <line x1="0" y1={i * 5} x2="100" y2={i * 5} stroke="#f87171" strokeWidth={i % 5 === 0 ? 0.5 : 0.2} />
        </g>
      ))}
      {FIBERS.map((d, i) => <path key={i} d={d} fill="none" stroke="#475569" strokeWidth={1.2 / Math.sqrt(zoom)} strokeLinecap="round" opacity=".8" />)}
    </g>
  )
}

export default function Extra3({ state, perform, disabled }: ExtraProps) {
  const done = (state.data.doneActions as string[]) ?? []
  const go = (a: string) => { if (!done.includes(a)) perform(a) }
  return (
    <Microscope
      objectives={[4, 10, 40, 100]}
      disabled={disabled}
      caption="Preparación esquemática: fibras de algodón sobre papel milimetrado (insumos de la ficha)"
      onObjective={(o) => go(`obj-${o}`)}
      onFocused={(o) => go(`focus:${o}`)}
      render={({ zoom }) => <Sample zoom={zoom} />}
    />
  )
}
