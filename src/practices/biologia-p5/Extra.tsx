/** Células de la mucosa bucal: microscopio (4×–100×) e identificación de estructuras (esquemático). */
import Identify from '../../core/identify'
import type { Hotspot } from '../../core/identify'
import Microscope from '../../core/microscope'
import type { ExtraProps } from '../../core/protocolBench'

export const SPOTS: Hotspot[] = [
  { id: 'nucleus', label: 'Núcleo (más oscuro)', x: 50, y: 50, r: 9 },
  { id: 'cytoplasm', label: 'Citoplasma (tono más claro)', x: 28, y: 38, r: 10 },
  { id: 'membrane', label: 'Membrana plasmática (borde definido)', x: 82, y: 62, r: 8 },
]

const CELLS = [[10, 12, 12], [52, 10, -8], [28, 44, 6], [66, 48, -14], [8, 74, 10], [48, 76, -6]]

function Smear({ zoom }: { zoom: number }) {
  return (
    <g>
      {CELLS.map(([x, y, rot], i) => (
        <g key={i} transform={`rotate(${rot} ${x + 14} ${y + 10})`}>
          <path d={`M${x} ${y + 8} Q${x + 4} ${y - 2} ${x + 16} ${y} Q${x + 30} ${y + 4} ${x + 28} ${y + 16} Q${x + 20} ${y + 26} ${x + 6} ${y + 22} Z`} fill="#bfdbfe" stroke="#3b82f6" strokeWidth={0.8 / Math.sqrt(zoom)} />
          {zoom >= 2 && <circle cx={x + 14} cy={y + 12} r="4" fill="#1e3a8a" />}
        </g>
      ))}
    </g>
  )
}

function CellDrawing() {
  return (
    <g>
      <path d="M10 40 Q20 8 56 12 Q92 14 92 52 Q90 90 52 90 Q14 88 10 40 Z" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="3" />
      <circle cx="50" cy="50" r="12" fill="#1e3a8a" />
    </g>
  )
}

export default function Extra5({ state, perform, disabled }: ExtraProps) {
  const done = (state.data.doneActions as string[]) ?? []
  const go = (a: string) => { if (!done.includes(a)) perform(a) }
  return (
    <div className="space-y-3">
      <Microscope objectives={[4, 10, 40, 100]} disabled={disabled} caption="Frotis de mucosa bucal con azul de metileno (esquema ilustrativo)" onObjective={(o) => go(`obj-${o}`)} onFocused={(o) => go(`focus:${o}`)} render={({ zoom }) => <Smear zoom={zoom} />} />
      <Identify title="Identificar las estructuras de la célula epitelial" help="Esquema ilustrativo, según la interpretación de la ficha." draw={() => <CellDrawing />} spots={SPOTS} prefix="identify" wrongAction="identify-wrong" done={done} perform={perform} disabled={disabled} />
    </div>
  )
}
