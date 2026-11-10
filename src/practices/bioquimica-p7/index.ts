import type { PracticeModule } from '../../core/types'
import {
  buildConclusion,
  chartThresholds,
  defaultWeights,
  disclaimer,
  hooks,
  interpretationOptions,
  materialsPanel,
  meta,
  referenceTable,
  rounds,
  scenarios,
  steps,
} from './config'
import { quiz } from './quiz'
import Scene from './Scene'

/** Módulo de práctica: Bioquímica – Práctica 7. */
const practice: PracticeModule = {
  meta,
  rounds,
  steps,
  scenarios,
  materialsPanel,
  hooks,
  quiz,
  defaultWeights,
  interpretationOptions,
  chartThresholds,
  referenceTable,
  disclaimer,
  buildConclusion,
  Scene,
  intro: {
    scenarioTitle: 'Sujeto simulado',
    scenarioHelp: 'Elige el perfil de valores ilustrativos que generará la simulación (no son datos clínicos).',
    roundsNote: 'Se realizarán dos mediciones: ayunas y posprandial.',
  },
}

export default practice
