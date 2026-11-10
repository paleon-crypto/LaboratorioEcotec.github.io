/** Células vegetales: microscopio con la preparación de pulpa de tomate e identificación de estructuras (esquemático). */
import Identify from '../../core/identify'
import type { Hotspot } from '../../core/identify'
import Microscope from '../../core/microscope'
import type { ExtraProps } from '../../core/protocolBench'

export const SPOTS: Hotspot[] = [
  { id: 'wall', label: 'Pared celular', x: 14, y: 50, r: 7 },
  { id: 'nucleus', label: 'Núcleo', x: 55, y: 38, r: 8 },
  { id: 'chromo', label: 'Cromoplastos', x: 36, y: 68, r: 8 },
  { id: 'vacuole', label: 'Vacuola central', x: 62, y: 66, r: 9 },
]

const CELLS = [[8, 10], [38, 8], [68, 12], [10, 40], [42, 38], [72, 42], [6, 72], [40, 70], [70, 72]]

function Tissue({ zoom }: { zoom: number }) {
  return (
    <g>
      {CELLS.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="26" height="26" rx="4" fill="#fee2e2" stroke="#16a34a" strokeWidth={1.2 / Math.sqrt(zoom)} />
          {zoom >= 2 && <circle cx={x + 17} cy={y + 9} r="3" fill="#7c3aed" opacity=".8" />}
          {zoom >= 2 && [0, 1, 2].map((k) => <ellipse key={k} cx={x + 6 + k * 5} cy={y + 19} rx="1.8" ry="1.2" fill="#f97316" />)}
        </g>
      ))}
    </g>
  )
}

function CellDrawing({ ids }: { ids: string[] }) {
  return (
    <g>
      <rect x="6" y="14" width="88" height="76" rx="14" fill="#fee2e2" stroke={ids.includes('wall') ? '#15803d' : '#16a34a'} strokeWidth="4" />
      <ellipse cx="62" cy="68" rx="18" ry="14" fill="#bfdbfe" opacity=".8" />
      <circle cx="55" cy="38" r="8" fill="#7c3aed" opacity=".8" />
      {[0, 1, 2, 3].map((k) => <ellipse key={k} cx={26 + k * 5} cy={68 + (k % 2) * 4} rx="3" ry="2" fill="#f97316" />)}
    </g>
  )
}

export default function Extra4({ state, perform, disabled }: ExtraProps) {
  const done = (state.data.doneActions as string[]) ?? []
  const go = (a: string) => { if (!done.includes(a)) perform(a) }
  return (
    <div className="space-y-3">
      <Microscope objectives={[4, 10, 40]} disabled={disabled} caption="Pulpa de tomate (esquema ilustrativo)" onObjective={(o) => go(`obj-${o}`)} onFocused={(o) => go(`focus:${o}`)} render={({ zoom }) => <Tissue zoom={zoom} />} />
      <Identify title="Identificar los organelos y estructuras" help="Esquema ilustrativo de una célula vegetal del mesocarpio." draw={(ids) => <CellDrawing ids={ids} />} spots={SPOTS} prefix="identify" wrongAction="identify-wrong" done={done} perform={perform} disabled={disabled} />
    </div>
  )
}
