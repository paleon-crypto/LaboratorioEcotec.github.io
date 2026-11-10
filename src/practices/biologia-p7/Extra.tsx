/** Tinción de Wright: frotis sanguíneo en el microscopio e identificación de células (esquemático). */
import Identify from '../../core/identify'
import type { Hotspot } from '../../core/identify'
import Microscope from '../../core/microscope'
import type { ExtraProps } from '../../core/protocolBench'

export const SPOTS: Hotspot[] = [
  { id: 'rbc', label: 'Eritrocito (rosado uniforme)', x: 28, y: 32, r: 10 },
  { id: 'wbc', label: 'Leucocito (núcleo azul o púrpura)', x: 62, y: 56, r: 12 },
  { id: 'plt', label: 'Plaquetas (pequeñas, moradas)', x: 80, y: 24, r: 7 },
]

const RBC = [[14, 20], [34, 14], [24, 40], [48, 30], [12, 62], [38, 66], [72, 18], [84, 50], [56, 82], [82, 80], [20, 84]]

function Field() {
  return (
    <g>
      {RBC.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6.5" fill="#fbcfe8" stroke="#f472b6" strokeWidth=".6" />)}
      <circle cx="62" cy="56" r="10" fill="#e9d5ff" stroke="#c084fc" strokeWidth=".6" />
      <path d="M56 54 Q62 48 68 54 Q66 62 60 62 Z" fill="#4c1d95" />
      {[[80, 24], [84, 28], [78, 30]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" fill="#7c3aed" />)}
    </g>
  )
}

export default function Extra7({ state, perform, disabled }: ExtraProps) {
  const done = (state.data.doneActions as string[]) ?? []
  const go = (a: string) => { if (!done.includes(a)) perform(a) }
  return (
    <div className="space-y-3">
      <Microscope objectives={[40, 100]} disabled={disabled} caption="Frotis sanguíneo con tinción de Wright (esquema ilustrativo)" onObjective={(o) => go(`obj-${o}`)} onFocused={(o) => go(`focus:${o}`)} render={() => <Field />} />
      <Identify title="Identificar las células de la sangre" help="Colores según la interpretación de la ficha." draw={() => <Field />} spots={SPOTS} prefix="identify" wrongAction="identify-wrong" done={done} perform={perform} disabled={disabled} />
    </div>
  )
}
