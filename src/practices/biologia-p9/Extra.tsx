/** Uniones de anclaje: observación de piel e identificación de desmosomas y hemidesmosomas (esquemático). */
import Classify from '../../core/classify'
import Identify from '../../core/identify'
import type { Hotspot } from '../../core/identify'
import Microscope from '../../core/microscope'
import type { ExtraProps } from '../../core/protocolBench'

export const SPOTS: Hotspot[] = [
  { id: 'desmosome', label: 'Desmosoma (unión célula-célula, borde lateral)', x: 50, y: 34, r: 8 },
  { id: 'hemidesmosome', label: 'Hemidesmosoma (base de la célula)', x: 30, y: 66, r: 8 },
  { id: 'basal', label: 'Membrana basal', x: 76, y: 74, r: 9 },
  { id: 'filaments', label: 'Filamentos intermedios', x: 24, y: 34, r: 8 },
]

function Skin({ thick }: { thick: boolean }) {
  const h = thick ? 46 : 26
  return (
    <g>
      <rect x="0" y="0" width="100" height="100" fill="#fef3c7" />
      <rect x="0" y="8" width="100" height={h} fill="#fbcfe8" stroke="#ec4899" strokeWidth=".6" />
      {[...Array(8)].map((_, i) => <line key={i} x1={i * 14 + 6} y1="8" x2={i * 14 + 6} y2={8 + h} stroke="#ec4899" strokeWidth=".4" />)}
      <rect x="0" y={8 + h} width="100" height="3" fill="#a78bfa" />
      <rect x="0" y={11 + h} width="100" height={89 - h - 3} fill="#fde68a" />
    </g>
  )
}

function Junctions() {
  return (
    <g>
      <rect x="0" y="0" width="100" height="100" fill="#f8fafc" />
      <rect x="8" y="10" width="38" height="56" rx="8" fill="#fbcfe8" stroke="#ec4899" strokeWidth="1.5" />
      <rect x="54" y="10" width="38" height="56" rx="8" fill="#fbcfe8" stroke="#ec4899" strokeWidth="1.5" />
      <rect x="46" y="28" width="8" height="12" fill="#7c3aed" />
      <path d="M12 30 H44 M12 38 H44" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="2 1" />
      <rect x="2" y="68" width="96" height="8" fill="#a78bfa" />
      <rect x="22" y="62" width="14" height="6" fill="#7c3aed" />
    </g>
  )
}

export default function Extra9({ state, perform, disabled }: ExtraProps) {
  const done = (state.data.doneActions as string[]) ?? []
  const go = (a: string) => { if (!done.includes(a)) perform(a) }
  const thick = done.includes('slide:thin')
  return (
    <div className="space-y-3">
      <Microscope objectives={[10, 40]} disabled={disabled} caption={`Piel ${thick ? 'gruesa' : 'fina'} (esquema ilustrativo)`} onObjective={(o) => go(`obj-${o}`)} onFocused={(o) => go(`focus:${o}`)} render={() => <Skin thick={thick} />} />
      <Identify title="Identificar uniones y estructuras de anclaje" help="Esquema ilustrativo de dos células epiteliales sobre la membrana basal." draw={() => <Junctions />} spots={SPOTS} prefix="identify" wrongAction="identify-wrong" done={done} perform={perform} disabled={disabled} />
      <Classify
        title="Ubicar las proteínas que participan en las uniones"
        items={[{ id: 'cadherin', label: 'Cadherinas' }, { id: 'integrin', label: 'Integrinas' }]}
        bins={[{ id: 'desmo', label: 'Desmosomas: unen células entre sí' }, { id: 'hemi', label: 'Hemidesmosomas: fijan la célula a la membrana basal' }]}
        answer={{ cadherin: 'desmo', integrin: 'hemi' }}
        prefix="protein"
        wrongAction="protein-wrong"
        done={done}
        perform={perform}
        disabled={disabled}
      />
    </div>
  )
}
