import { Flame, Microscope, Scale, ShieldCheck, Thermometer, Wind } from 'lucide-react'
import Classify from '../../core/classify'
import type { ExtraProps } from '../../core/protocolBench'

export const EQUIP = [
  { id: 'micro', label: 'Microscopio óptico', icon: <Microscope size={16} aria-hidden="true" /> },
  { id: 'auto', label: 'Autoclave', icon: <Flame size={16} aria-hidden="true" /> },
  { id: 'bano', label: 'Baño María', icon: <Thermometer size={16} aria-hidden="true" /> },
  { id: 'agit', label: 'Agitador calentador', icon: <Thermometer size={16} aria-hidden="true" /> },
  { id: 'bal', label: 'Balanza analítica', icon: <Scale size={16} aria-hidden="true" /> },
  { id: 'cam', label: 'Cámara de bioseguridad', icon: <Wind size={16} aria-hidden="true" /> },
]
const BINS = [
  { id: 'obs', label: 'Observación' },
  { id: 'est', label: 'Esterilización' },
  { id: 'cal', label: 'Calentamiento y mezcla' },
  { id: 'med', label: 'Medición' },
  { id: 'seg', label: 'Protección / bioseguridad', icon: <ShieldCheck size={14} aria-hidden="true" /> },
]
const ANSWER = { micro: 'obs', auto: 'est', bano: 'cal', agit: 'cal', bal: 'med', cam: 'seg' }

export default function Extra1({ state, perform, disabled }: ExtraProps) {
  const done = (state.data.doneActions as string[]) ?? []
  return (
    <Classify
      title="Reconocer y clasificar los equipos del laboratorio por su uso"
      help="Categorías ilustrativas: la ficha solo pide clasificar según el uso."
      items={EQUIP}
      bins={BINS}
      answer={ANSWER}
      prefix="classify"
      wrongAction="classify-wrong"
      done={done}
      perform={perform}
      disabled={disabled}
    />
  )
}

