/**
 * Prácticas 12 y 13 de la ficha VAC-FOR-006: «Uso, manejo y cuidados de dispositivos en laboratorio:
 * extracción de sangre, centrifugadora, baño maría y micropipetas». Ambas fichas tienen contenido idéntico,
 * por eso comparten esta definición.
 */
import { protocolPractice } from '../core/protocolBench'
import type { PracticeMeta, PracticeModule, ProcedureStep, QuizConfig } from '../core/types'
import DevicesExtra from './devicesExtra'
import { CHAMPE, FACULTY, OMS, RUBRIC, sourceFor } from './shared'

const ADA = 'Asociación Americana de Diabetes (ADA). Valores de referencia y guías clínicas.'

const step = (id: string, title: string, instruction: string, hint: string, actions: string[], success: string): ProcedureStep => ({ id, title, instruction, hint, actions, success })

const steps: ProcedureStep[] = [
  step('recognize', 'Reconocer materiales y equipos', 'Reconoce los materiales y equipos de la práctica: jeringa o sistema vacutainer, centrífuga, baño maría y micropipetas.', 'Elige las cuatro acciones «Reconocer…» del grupo Reconocimiento.', ['recognize:syringe', 'recognize:centrifuge', 'recognize:waterbath', 'recognize:micropipette'], 'Materiales y equipos reconocidos.'),
  step('draw-prep', 'Extracción simulada: preparación', 'Simulación de extracción de sangre, fase 1: preparación.', 'Elige la fase de preparación en el grupo Extracción de sangre.', ['draw:prepare'], 'Preparación realizada.'),
  step('draw-puncture', 'Extracción simulada: punción', 'Simulación de extracción de sangre, fase 2: punción.', 'Elige la fase de punción.', ['draw:puncture'], 'Punción realizada.'),
  step('draw-collect', 'Extracción simulada: recolección', 'Simulación de extracción de sangre, fase 3: recolección de la muestra en los tubos.', 'Elige la fase de recolección.', ['draw:collect'], 'Muestra recolectada.'),
  step('draw-post', 'Extracción simulada: postpunción', 'Simulación de extracción de sangre, fase 4: postpunción.', 'Elige la fase de postpunción.', ['draw:post'], 'Postpunción realizada.'),
  step('centrifuge', 'Balancear y centrifugar', 'Balancea y centrifuga los tubos según su color y tipo de muestra.', 'Primero balancear, después centrifugar.', ['balance', 'centrifuge'], 'Tubos centrifugados.'),
  step('serum', 'Recolectar suero y mezclar con azul de metileno', 'Recolecta el suero y mézclalo con azul de metileno en tubos Eppendorf.', 'Primero recolecta el suero.', ['serum:collect', 'serum:mix'], 'Suero mezclado con azul de metileno.'),
  step('incubate', 'Incubar a 37 ºC por 20 minutos', 'Incuba la mezcla a 37 ºC por 20 minutos en el baño maría.', 'Ajusta temperatura y tiempo antes de iniciar la incubación.', ['temp:37', 'time:20', 'incubate'], 'Incubación completada.'),
  step('pip-adjust', 'Micropipeteo: ajuste', 'Práctica de micropipeteo, parte 1: ajuste de la micropipeta.', 'Elige «Ajustar el volumen».', ['pip:adjust'], 'Micropipeta ajustada.'),
  step('pip-aspirate', 'Micropipeteo: aspiración', 'Práctica de micropipeteo, parte 2: aspiración.', 'Elige «Aspirar el líquido».', ['pip:aspirate'], 'Líquido aspirado.'),
  step('pip-dispense', 'Micropipeteo: dispensación', 'Práctica de micropipeteo, parte 3: dispensación.', 'Elige «Dispensar el líquido».', ['pip:dispense'], 'Líquido dispensado.'),
  step('cleanup', 'Desechar materiales y limpiar', 'Desecha adecuadamente los materiales y limpia el área de trabajo.', 'Cortopunzantes en su recipiente; después limpia el área.', ['dispose', 'clean'], 'Área limpia.'),
]

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿A qué temperatura se incuba la mezcla de suero con azul de metileno?', options: [{ id: 'a', text: '25 ºC' }, { id: 'b', text: '37 ºC' }, { id: 'c', text: '60 ºC' }, { id: 'd', text: '100 ºC' }], correct: 'b', explanation: 'La ficha indica incubar a 37 ºC por 20 minutos.' },
    { id: 'c2', type: 'choice', prompt: '¿Por cuánto tiempo se incuba?', options: [{ id: 'a', text: '5 minutos' }, { id: 'b', text: '10 minutos' }, { id: 'c', text: '20 minutos' }, { id: 'd', text: '60 minutos' }], correct: 'c', explanation: 'La incubación es de 20 minutos.' },
    { id: 'c3', type: 'choice', prompt: '¿Con qué se mezcla el suero en los tubos Eppendorf?', options: [{ id: 'a', text: 'Alcohol' }, { id: 'b', text: 'Agua destilada' }, { id: 'c', text: 'Azul de metileno' }, { id: 'd', text: 'Lugol' }], correct: 'c', explanation: 'El suero se mezcla con azul de metileno.' },
    { id: 'c4', type: 'choice', prompt: '¿Qué micropipetas se usan en la práctica?', options: [{ id: 'a', text: '10, 100 y 1000 μL' }, { id: 'b', text: '1, 5 y 10 mL' }, { id: 'c', text: 'Solo de 5 mL' }, { id: 'd', text: '2, 20 y 200 mL' }], correct: 'a', explanation: 'El equipamiento incluye micropipetas de 10, 100 y 1000 μL.' },
    { id: 'c5', type: 'choice', prompt: 'En el micropipeteo, ¿cuál es el orden indicado?', options: [{ id: 'a', text: 'Dispensación, aspiración, ajuste' }, { id: 'b', text: 'Aspiración, ajuste, dispensación' }, { id: 'c', text: 'Ajuste, aspiración, dispensación' }, { id: 'd', text: 'Ajuste, dispensación, aspiración' }], correct: 'c', explanation: 'La ficha indica: ajuste, aspiración y dispensación.' },
    { id: 't1', type: 'tf', prompt: 'Los tubos se balancean y centrifugan según su color y tipo de muestra.', correct: true, explanation: 'Es el paso 3 del procedimiento.' },
    { id: 't2', type: 'tf', prompt: 'El material cortopunzante requiere un manejo seguro.', correct: true, explanation: 'La ficha lo indica en protocolos y normas de seguridad.' },
    { id: 't3', type: 'tf', prompt: 'Al terminar no es necesario limpiar el área de trabajo.', correct: false, explanation: 'El paso 7 indica desechar adecuadamente los materiales y limpiar el área.' },
    { id: 'o1', type: 'open', prompt: 'Explica por qué dominar el uso de los equipos del laboratorio clínico es importante.', expectedPoints: ['Garantiza la confiabilidad de los resultados.', 'Previene riesgos.', 'Permite obtener, manejar y procesar muestras de forma segura y eficaz.'], explanation: 'Esta pregunta será revisada por el docente.' },
    { id: 'o2', type: 'open', prompt: 'Describe las cuatro fases de la simulación de extracción de sangre.', expectedPoints: ['Preparación.', 'Punción.', 'Recolección.', 'Postpunción.'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

export function devicesPractice(number: 12 | 13): PracticeModule {
  const dates = number === 12 ? '04 al 09 de agosto de 2025' : '11 al 16 de agosto de 2025'
  const meta: PracticeMeta = {
    id: `bioquimica-p${number}`,
    number,
    title: 'Uso, manejo y cuidados de dispositivos en laboratorio: extracción de sangre, centrífuga, baño maría y micropipetas',
    subjectId: 'bioquimica',
    careerIds: ['medicina'],
    faculty: FACULTY,
    objective: 'Familiarizar a los estudiantes con las partes, el uso y el protocolo de manejo correcto de jeringas, centrifugadora, baño maría y micropipetas.',
    learningOutcomes: ['Utiliza y maneja correctamente dispositivos clínicos como jeringas, centrífuga, baño maría y micropipetas para la manipulación de muestras biológicas.'],
    theory: 'El laboratorio clínico requiere del uso de equipos que permitan la obtención, manejo y procesamiento seguro y eficaz de muestras biológicas. Dominar el uso de estos equipos garantiza confiabilidad en los resultados y prevención de riesgos.',
    durationMin: 80,
    difficulty: 'Intermedia',
    materials: ['Jeringas 5 ml o sistemas vacutainer', 'Tubos vacutainer de tapa azul, roja, amarilla y lila', 'Alcohol, algodones, pads', 'Azul de metileno', 'Agua destilada', 'Gradillas', 'Tubos Eppendorf', 'Vasos de precipitación'],
    equipment: ['Centrífuga de laboratorio', 'Baño maría', 'Micropipetas (10, 100 y 1000 μL)', 'Puntas desechables', 'Termómetro', 'Vortex', 'Placa calentadora'],
    safetyNotes: ['Manejo seguro de material cortopunzante. Higiene en todo el proceso.', 'Identificación, etiquetado y conservación adecuada de materiales y reactivos.'],
    evaluationCriteria: RUBRIC,
    bibliography: [ADA, CHAMPE, OMS],
    source: `${sourceFor(number)} Fechas de la ficha: ${dates}.`,
    validated: true,
    validationNotes: [
      number === 13
        ? 'La ficha de la práctica 13 es idéntica a la de la práctica 12 (mismo título y procedimiento): confirmar si es un duplicado o falta contenido propio.'
        : 'La ficha de la práctica 13 es idéntica a esta: confirmar si es un duplicado.',
      'La ficha no detalla las fases de la extracción de sangre ni la función de cada color de tubo: la simulación solo usa los nombres de las fases (preparación, punción, recolección y postpunción).',
      'Las acciones incorrectas del tablero (p. ej. centrifugar sin balancear, otra temperatura o tiempo) son errores típicos derivados de los pasos de la ficha.',
      'La ficha no indica resultados medibles: se evalúa la correcta ejecución del procedimiento.',
      'El paso 1 (reunirse en grupos) se realiza fuera del simulador.',
    ],
    version: '1.0.0',
  }

  return protocolPractice({
    meta,
    steps,
    roundLabel: 'Manejo de dispositivos',
    Extra: DevicesExtra,
    cards: [
      { id: 'recognize:syringe', label: 'Reconocer jeringa / sistema vacutainer', group: 'Reconocimiento' },
      { id: 'recognize:centrifuge', label: 'Reconocer la centrífuga', group: 'Reconocimiento' },
      { id: 'recognize:waterbath', label: 'Reconocer el baño maría', group: 'Reconocimiento' },
      { id: 'recognize:micropipette', label: 'Reconocer las micropipetas', group: 'Reconocimiento' },
      { id: 'draw:prepare', label: 'Preparación', group: 'Extracción de sangre (simulada)' },
      { id: 'draw:puncture', label: 'Punción', group: 'Extracción de sangre (simulada)' },
      { id: 'draw:collect', label: 'Recolección en tubos', group: 'Extracción de sangre (simulada)' },
      { id: 'draw:post', label: 'Postpunción', group: 'Extracción de sangre (simulada)' },
      { id: 'balance', label: 'Balancear los tubos', group: 'Centrífuga' },
      { id: 'centrifuge', label: 'Centrifugar', group: 'Centrífuga' },
      { id: 'serum:collect', label: 'Recolectar el suero', group: 'Suero' },
      { id: 'serum:mix', label: 'Mezclar con azul de metileno en tubo Eppendorf', group: 'Suero' },
      { id: 'temp:37', label: 'Ajustar a 37 ºC', group: 'Baño maría' },
      { id: 'time:20', label: 'Programar 20 minutos', group: 'Baño maría' },
      { id: 'incubate', label: 'Iniciar la incubación', group: 'Baño maría' },
      { id: 'pip:adjust', label: 'Ajustar el volumen', group: 'Micropipeta' },
      { id: 'pip:aspirate', label: 'Aspirar el líquido', group: 'Micropipeta' },
      { id: 'pip:dispense', label: 'Dispensar el líquido', group: 'Micropipeta' },
      { id: 'dispose', label: 'Desechar los materiales (cortopunzantes en su recipiente)', group: 'Cierre' },
      { id: 'clean', label: 'Limpiar el área de trabajo', group: 'Cierre' },
    ],
    distractors: [
      { id: 'centrifuge-unbalanced', label: 'Centrifugar sin balancear', group: 'Centrífuga', feedback: 'Los tubos deben balancearse antes de centrifugarlos (paso 3 de la ficha).' },
      { id: 'temp:25', label: 'Ajustar a 25 ºC', group: 'Baño maría', feedback: 'La ficha indica incubar a 37 ºC.' },
      { id: 'temp:60', label: 'Ajustar a 60 ºC', group: 'Baño maría', feedback: 'La ficha indica incubar a 37 ºC.' },
      { id: 'time:5', label: 'Programar 5 minutos', group: 'Baño maría', feedback: 'La ficha indica incubar por 20 minutos.' },
      { id: 'time:60', label: 'Programar 60 minutos', group: 'Baño maría', feedback: 'La ficha indica incubar por 20 minutos.' },
      { id: 'skip-clean', label: 'Dejar el área sin limpiar', group: 'Cierre', feedback: 'El procedimiento exige desechar adecuadamente los materiales y limpiar el área de trabajo.' },
    ],
    requires: {
      'balance': { needs: 'draw:post', message: 'Primero completa la extracción simulada.' },
      'centrifuge': { needs: 'balance', message: 'Primero balancea los tubos.' },
      'serum:mix': { needs: 'serum:collect', message: 'Primero recolecta el suero.' },
      'incubate': { needs: 'time:20', message: 'Primero ajusta la temperatura y el tiempo.' },
      'pip:dispense': { needs: 'pip:aspirate', message: 'Primero aspira el líquido.' },
      'clean': { needs: 'dispose', message: 'Primero desecha los materiales usados.' },
    },
    quiz,
    materialsPanel: [
      { id: 'syringe', label: 'Jeringas 5 ml o sistemas vacutainer', description: 'Para la extracción simulada.', kind: 'material' },
      { id: 'tubes', label: 'Tubos vacutainer (azul, rojo, amarillo, lila)', description: '20 unidades.', kind: 'material' },
      { id: 'alcohol', label: 'Alcohol, algodones y pads', description: 'Según el grupo.', kind: 'material' },
      { id: 'methylene', label: 'Azul de metileno', description: '10 ml.', kind: 'material' },
      { id: 'eppendorf', label: 'Tubos Eppendorf y gradillas', description: 'Para el suero.', kind: 'material' },
      { id: 'centrifuge', label: 'Centrífuga de laboratorio', description: 'Balancear los tubos antes de usarla.', kind: 'equipment' },
      { id: 'waterbath', label: 'Baño maría', description: 'Incubación a 37 ºC por 20 minutos.', kind: 'equipment' },
      { id: 'micropipettes', label: 'Micropipetas (10, 100 y 1000 μL)', description: 'Con puntas desechables.', kind: 'equipment' },
    ],
    referenceTable: [
      {
        title: 'Parámetros del procedimiento',
        rows: [
          { label: 'Incubación', value: '37 ºC por 20 minutos' },
          { label: 'Micropipetas', value: '10, 100 y 1000 μL' },
          { label: 'Micropipeteo', value: 'Ajuste, aspiración y dispensación' },
        ],
      },
    ],
    defaultWeights: { procedure: 45, results: 0, quizChoice: 20, quizTrueFalse: 10, quizOpen: 25, errorPenalty: 5 },
    resultText: 'Procedimiento ejecutado en el orden indicado por la ficha, sin resultado medible.',
    closing: 'Se ejecutó el procedimiento de manejo de jeringas, centrífuga, baño maría y micropipetas. La ficha evalúa la correcta ejecución técnica, el uso adecuado de los equipos y el cumplimiento de las normas de bioseguridad.',
  })
}
