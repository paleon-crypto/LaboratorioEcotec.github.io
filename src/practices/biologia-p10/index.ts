/** Biología Celular y Molecular – Práctica 10: Tipificación sanguínea. */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import { biologiaMeta, biologiaWeightsNoResults, SIM_NOTE_BIO } from '../biologia'
import Extra10, { CASES, REAGENTS } from './Extra'

const meta = biologiaMeta(10, 10, '9/07/2025', {
  title: 'Tipificación sanguínea',
  objective: 'Determinar el grupo sanguíneo ABO y el factor Rh de una muestra de sangre mediante la observación de reacciones antígeno-anticuerpo, con el fin de comprender la importancia de la compatibilidad sanguínea en transfusiones y procedimientos médicos.',
  learningOutcomes: ['Adquirir conocimientos, habilidades y destrezas para desarrollar la prueba de tipificación sanguínea.', 'Conocer la técnica e interpretar los resultados.', 'Conocimientos acerca de la compatibilidad e incompatibilidad sanguínea.'],
  difficulty: 'Intermedia',
  theory: 'La tipificación sanguínea se basa en la identificación de antígenos específicos presentes en la superficie de los eritrocitos, principalmente los del sistema ABO (A, B, AB y O) y el factor Rh (positivo o negativo). Estos antígenos reaccionan con anticuerpos específicos, provocando aglutinación si hay incompatibilidad. Una persona con sangre tipo A tiene antígenos A y anticuerpos anti-B.',
  materials: ['Placas portaobjeto (20)', 'Placas cubreobjeto (20)', 'Lanceta estéril (20)', 'Algodón (20)', 'Alcohol', 'Reactivo anti-A', 'Reactivo anti-B', 'Reactivo anti-D', 'Cartilla de grupo sanguíneo'],
  equipment: [],
  safetyNotes: ['Uso adecuado de guantes por manipulación de muestras biológicas y desinfección posterior.', 'Manipulación cuidadosa de los reactivos anti-A, anti-B y anti-D, y de los objetos cortopunzantes.'],
  evaluationCriteria: ['Actitud: asistencia, puntualidad, presentación personal, liderazgo.', 'Habilidad y desempeño: planificación, ejecución, iniciativa, precaución.', 'Capacidad técnica/conocimiento: aplicación práctica y teórica, seguimiento de instrucciones.', 'Campo profesional: empleo de normas de bioseguridad y técnicas adecuadas.'],
  bibliography: ['Castro López M, Hernández-Vicente A, Garatachea Vallejo N, Fuentes-Broto L. Manual de prácticas de fundamentos fisiológicos de la actividad física y del deporte. 2017. ISBN 978-84-16935-81-9', 'Cossio Andia E, et al. Tipificación del grupo sanguíneo ABO y el factor Rh en la población de Totora-Cochabamba, gestión 2012. Rev Cient Cienc Med 2013;16(1):25-27.'],
  validated: false,
  validationNotes: [
    SIM_NOTE_BIO,
    'Simulación educativa: NO es una prueba diagnóstica y no sustituye la tipificación real.',
    'Los cuatro casos de muestra (A+, B+, AB−, O−) son ilustrativos: la ficha usa la sangre del propio estudiante. Las reglas de interpretación (aglutinación con anti-A, anti-B, mezcla y anti-D) son las de la ficha.',
    'La ficha pide investigar el grupo de todos los estudiantes y responder preguntas sobre el factor Rh y donantes/receptores universales: se evalúan en la pregunta abierta.',
    'La ficha no lista equipos.',
    'El banco de preguntas fue redactado a partir de la ficha: pendiente de revisión docente.',
  ],
})

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: 'Si la sangre se aglutina con anti-A y anti-B (y con la mezcla), el grupo es…', options: [{ id: 'a', text: 'AB' }, { id: 'b', text: 'O' }, { id: 'c', text: 'A' }, { id: 'd', text: 'B' }], correct: 'a', explanation: 'Si es AB, la sangre se aglutina en las tres primeras casillas.' },
    { id: 'c2', type: 'choice', prompt: 'Si no hay aglutinación con ningún reactivo ABO, el grupo es…', options: [{ id: 'a', text: 'O' }, { id: 'b', text: 'AB' }, { id: 'c', text: 'A' }, { id: 'd', text: 'B' }], correct: 'a', explanation: 'Interpretación de resultados.' },
    { id: 'c3', type: 'choice', prompt: 'Si hay aglutinación en la casilla anti-D, el individuo es…', options: [{ id: 'a', text: 'Rh positivo' }, { id: 'b', text: 'Rh negativo' }, { id: 'c', text: 'Grupo O' }, { id: 'd', text: 'No se puede saber' }], correct: 'a', explanation: 'Interpretación de resultados.' },
    { id: 't1', type: 'tf', prompt: 'Se mezcla y rota la cartilla durante dos minutos antes de observar.', correct: true, explanation: 'Actividad 1.' },
    { id: 't2', type: 'tf', prompt: 'Una persona con sangre tipo A tiene antígenos A y anticuerpos anti-B.', correct: true, explanation: 'Fundamentación teórica.' },
    { id: 'o1', type: 'open', prompt: 'Explica qué es el factor Rh y la incompatibilidad Rh en el embarazo, y cuáles son los donantes y receptores universales y por qué.', expectedPoints: ['El factor Rh (antígeno D) puede ser positivo o negativo.', 'La incompatibilidad Rh puede causar complicaciones en el neonato.', 'Donante universal y receptor universal, con su justificación.'], explanation: 'Actividad 3 de la ficha; será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Tipificación sanguínea',
  scenarios: Object.entries(CASES).map(([id, c]) => ({ id, label: `Muestra ilustrativa ${id.toUpperCase().replace('-', ' ')}`, description: `Muestra ilustrativa de grupo ${c.abo}${c.rh === '+' ? ' positivo' : ' negativo'}: el resultado se descubre durante la práctica.` })),
  rules: (action, payload, state) => {
    const c = CASES[state.scenarioId] ?? CASES['a-pos']
    if (action === 'abo') return payload === c.abo ? null : 'El grupo ABO no coincide con la aglutinación observada: si aglutina con anti-A hay antígeno A, con anti-B antígeno B, y si no aglutina con ninguno es O.'
    if (action === 'rh') return payload === c.rh ? null : 'Recuerda: la aglutinación con anti-D indica Rh positivo; si no hay aglutinación, es Rh negativo.'
    return null
  },
  steps: [
    { id: 'sample', title: 'Obtener la muestra', instruction: 'Desinfecta con alcohol, pincha lateralmente la yema del dedo y deposita una gota de sangre en cada casilla de la cartilla.', hint: 'Tres acciones en orden.', actions: ['disinfect', 'prick', 'blood-drops'], success: 'Sangre depositada en las casillas.' },
    { id: 'reagents', title: 'Colocar los reactivos', instruction: 'Coloca una gota de anti-A, de anti-B, de la mezcla anti-A + anti-B y de anti-D, cada una en su casilla.', hint: 'Arrastra cada reactivo a su casilla.', actions: REAGENTS.map((r) => `reagent:${r.id}`), success: 'Reactivos colocados.' },
    { id: 'mix', title: 'Mezclar y rotar', instruction: 'Mezcla y rota durante dos minutos.', hint: 'Una acción.', actions: ['mix'], success: 'Mezcla realizada.' },
    { id: 'result', title: 'Interpretar los resultados', instruction: 'Observa las casillas con aglutinación y determina el grupo ABO y el factor Rh.', hint: 'Elige el grupo y el factor Rh en el panel.', actions: ['abo', 'rh'], success: 'Grupo sanguíneo determinado.' },
    { id: 'dispose', title: 'Desechar', instruction: 'Desecha lanceta y algodón de forma segura.', hint: 'Cortopunzantes en su recipiente.', actions: ['dispose'], success: 'Material desechado.' },
  ],
  cards: [
    { id: 'disinfect', label: 'Desinfectar la yema del dedo con alcohol', group: 'Muestra' },
    { id: 'prick', label: 'Pinchar lateralmente la yema del dedo', group: 'Muestra' },
    { id: 'blood-drops', label: 'Depositar una gota de sangre en cada casilla', group: 'Muestra' },
    { id: 'mix', label: 'Mezclar y rotar por dos minutos', group: 'Reacción' },
    { id: 'dispose', label: 'Desechar la lanceta en el cortopunzante', group: 'Cierre' },
  ],
  distractors: [
    { id: 'reagent-wrong', label: 'Colocar un reactivo en otra casilla', group: 'Reacción', feedback: 'Cada reactivo va en su casilla correspondiente.' },
    { id: 'no-disinfect', label: 'Pinchar sin desinfectar', group: 'Muestra', feedback: 'Se pincha previa desinfección con alcohol.' },
    { id: 'reuse', label: 'Reutilizar la lanceta', group: 'Cierre', feedback: 'La lanceta estéril es de un solo uso y es un objeto cortopunzante.' },
  ],
  requires: {
    prick: { needs: 'disinfect', message: 'Primero desinfecta con alcohol.' },
    'blood-drops': { needs: 'prick', message: 'Primero pincha la yema del dedo.' },
  },
  Extra: Extra10,
  quiz,
  materialsPanel: [
    ...['Placas portaobjeto (20)', 'Placas cubreobjeto (20)', 'Lanceta estéril (20)', 'Algodón (20)', 'Alcohol', 'Reactivo anti-A', 'Reactivo anti-B', 'Reactivo anti-D'].map((l, i) => ({ id: `m${i}`, label: l, description: 'Insumo.', kind: 'material' as const })),
  ],
  referenceTable: [{ title: 'Interpretación (ficha)', rows: [{ label: 'Aglutina con anti-A', value: 'Antígeno A' }, { label: 'Aglutina con anti-B', value: 'Antígeno B' }, { label: 'Aglutina con ambos', value: 'Grupo AB' }, { label: 'Sin aglutinación ABO', value: 'Grupo O' }, { label: 'Aglutina con anti-D', value: 'Rh positivo' }] }],
  defaultWeights: biologiaWeightsNoResults,
  resultText: 'Grupo sanguíneo ABO y factor Rh determinados a partir de la aglutinación (muestra ilustrativa).',
  closing: 'Se determinó el grupo ABO y el factor Rh a partir de las reacciones antígeno-anticuerpo de una muestra ilustrativa.',
})
