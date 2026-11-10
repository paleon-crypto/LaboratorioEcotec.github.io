import type { QuizConfig } from '../../core/types'

/**
 * Banco de preguntas redactado a partir de la ficha VAC-FOR-006 (práctica 7):
 * valores de referencia, procedimiento y bioseguridad. Está pendiente de revisión
 * por el docente (validated: false).
 */
export const quiz: QuizConfig = {
  validated: false,
  questions: [
    {
      id: 'c1',
      type: 'choice',
      prompt: 'Según la ficha académica, ¿qué rango de glucemia en ayunas corresponde a prediabetes?',
      options: [
        { id: 'a', text: 'Menor de 100 mg/dL' },
        { id: 'b', text: '100 a 125 mg/dL' },
        { id: 'c', text: 'Igual o superior a 126 mg/dL' },
        { id: 'd', text: '140 a 199 mg/dL' },
      ],
      correct: 'b',
      explanation: 'La ficha indica prediabetes para glucemia en ayunas de 100 a 125 mg/dL.',
    },
    {
      id: 'c2',
      type: 'choice',
      prompt: 'Una glucemia en ayunas igual o superior a 126 mg/dL corresponde, según la ficha, a:',
      options: [
        { id: 'a', text: 'Valor normal' },
        { id: 'b', text: 'Prediabetes' },
        { id: 'c', text: 'Umbral de diabetes' },
        { id: 'd', text: 'Clasificación no especificada' },
      ],
      correct: 'c',
      explanation: 'Igual o superior a 126 mg/dL en ayunas se considera umbral de diabetes según la ficha.',
    },
    {
      id: 'c3',
      type: 'choice',
      prompt: 'Una glucemia posprandial menor de 140 mg/dL se clasifica, según la ficha, como:',
      options: [
        { id: 'a', text: 'Normal' },
        { id: 'b', text: 'Prediabetes' },
        { id: 'c', text: 'Umbral de diabetes' },
        { id: 'd', text: 'No especificada' },
      ],
      correct: 'a',
      explanation: 'La ficha indica normal para glucemia posprandial menor de 140 mg/dL.',
    },
    {
      id: 'c4',
      type: 'choice',
      prompt: '¿Dónde debe desecharse la lanceta una vez utilizada?',
      options: [
        { id: 'a', text: 'En el recipiente para objetos cortopunzantes' },
        { id: 'b', text: 'En la papelera común' },
        { id: 'c', text: 'Sobre la mesa de trabajo, para reutilizarla' },
        { id: 'd', text: 'En el lavabo' },
      ],
      correct: 'a',
      explanation: 'Los objetos cortopunzantes se desechan en un recipiente específico para evitar accidentes.',
    },
    {
      id: 'c5',
      type: 'choice',
      prompt: 'Según el procedimiento de la ficha, ¿qué se realiza antes de insertar la tira reactiva en el glucómetro?',
      options: [
        { id: 'a', text: 'La punción del dedo' },
        { id: 'b', text: 'El lavado de manos con agua y jabón y el secado completo' },
        { id: 'c', text: 'Registrar el valor con fecha y hora' },
        { id: 'd', text: 'Desechar la lanceta' },
      ],
      correct: 'b',
      explanation: 'La ficha indica lavado de manos con agua y jabón y secado completo antes de insertar la tira reactiva.',
    },
    {
      id: 't1',
      type: 'tf',
      prompt: 'Una glucemia posprandial de 150 mg/dL está clasificada como normal en la ficha académica.',
      correct: false,
      explanation:
        'Normal es menor de 140 mg/dL. Para valores entre 140 y 199 mg/dL la ficha no especifica su clasificación.',
    },
    {
      id: 't2',
      type: 'tf',
      prompt: 'Una glucemia posprandial igual o superior a 200 mg/dL alcanza el umbral de diabetes según la ficha.',
      correct: true,
      explanation: 'Así lo indica la ficha académica para la glucemia posprandial.',
    },
    {
      id: 't3',
      type: 'tf',
      prompt: 'Este simulador puede utilizarse para emitir diagnósticos clínicos.',
      correct: false,
      explanation: 'El simulador es una herramienta educativa y no constituye una herramienta de diagnóstico clínico.',
    },
    {
      id: 't4',
      type: 'tf',
      prompt: 'Una misma lanceta puede reutilizarse en mediciones sucesivas.',
      correct: false,
      explanation: 'Las lancetas son de un solo uso; en la práctica se emplea una nueva para cada medición.',
    },
    {
      id: 't5',
      type: 'tf',
      prompt: 'Según la ficha, el valor medido debe registrarse junto con la fecha y la hora.',
      correct: true,
      explanation: 'El último paso del procedimiento es registrar el valor con fecha y hora.',
    },
    {
      id: 'o1',
      type: 'open',
      prompt:
        'Explica con tus palabras qué diferencia hay entre la glucemia en ayunas y la posprandial y cómo interpretaste los resultados de tu práctica.',
      expectedPoints: [
        'Distingue el momento de la medición (en ayunas vs. posprandial).',
        'Compara cada resultado con los valores de referencia de la ficha.',
        'Menciona que para posprandial entre 140 y 199 mg/dL la ficha no especifica clasificación (si aplica).',
        'Aclara que es una práctica educativa y no un diagnóstico.',
      ],
      explanation: 'Esta pregunta será revisada por el docente.',
    },
    {
      id: 'o2',
      type: 'open',
      prompt: 'Describe las medidas de bioseguridad que aplicaste durante el procedimiento.',
      expectedPoints: [
        'Lavado de manos con agua y jabón y secado completo.',
        'Limpieza del dedo con alcohol antes de la punción.',
        'Desecho de la lanceta en un contenedor bioseguro (cortopunzantes) y uso de materiales desechables.',
      ],
      explanation: 'Esta pregunta será revisada por el docente.',
    },
  ],
}
