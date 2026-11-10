/** Escena de la práctica 15: reutiliza el antebrazo de Farmacología P3 traduciendo las acciones. */
import type { StageProps } from '../../core/patientPanel'
import ArmStage from '../farmacologia-p3/ArmStage'

const MAP: Record<string, string> = { 'flush-before': 'purge', infuse: 'flow', 'compl:infiltration': 'compl:extravasation' }

export default function Stage15(p: StageProps) {
  return <ArmStage {...p} done={[...p.done, ...p.done.map((k) => MAP[k]).filter(Boolean)]} />
}
