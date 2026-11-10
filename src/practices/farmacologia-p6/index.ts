/**
 * Farmacología Básica – Práctica 6: Farmacodinamia: tipos de antagonismo y su aplicación clínica.
 * Las curvas dosis-respuesta son ILUSTRATIVAS (modelo Emax con parámetros propios); la guía solo
 * indica comparar agonista solo vs antagonista competitivo y analizar la variación de Emax en el no competitivo.
 */
import { protocolPractice } from '../../core/protocolBench'
import type { InterpretationItem, QuizConfig } from '../../core/types'
import { farmaMeta, farmaWeightsWithItems, SIM_NOTE } from '../farma'
import Chart from './Chart'

const meta = farmaMeta(6, '11-06-2025', {
  title: 'Farmacodinamia: tipos de antagonismo y su aplicación clínica',
  objective: 'Analizar y comparar los diferentes tipos de antagonismo farmacológico mediante simulaciones digitales y su aplicación clínica en el manejo terapéutico.',
  learningOutcomes: ['Distingue antagonismo competitivo, no competitivo, químico y fisiológico.', 'Interpreta gráficas dosis-respuesta bajo presencia de antagonistas.', 'Aplica el conocimiento en casos clínicos como reversión de anticoagulación con sulfato de protamina.'],
  theory: 'Los antagonistas farmacológicos pueden clasificarse según su mecanismo de acción: competitivos (desplazan al agonista en el receptor), no competitivos (se unen a sitios distintos), químicos (neutralizan al fármaco) y fisiológicos (ejercen efectos opuestos). Este conocimiento permite al médico tomar decisiones terapéuticas precisas ante situaciones como intoxicaciones o efectos adversos graves, siendo un ejemplo clásico el uso del sulfato de protamina como antídoto frente a sobredosis de heparina.',
  difficulty: 'Intermedia',
  materials: ['Guantes de látex descartables', 'Mascarilla quirúrgica', 'Hoja de rúbrica', 'Mandil y gorro', 'Hoja de simulación de signos vitales'],
  equipment: ['Computadora', 'Proyector', 'Pizarra', 'Simulador de alta fidelidad', 'Software de simulación'],
  safetyNotes: ['Aprendizaje basado en simulación y ética médica.', 'Uso responsable del simulador bajo supervisión docente.'],
  evaluationCriteria: ['Identificación de tipo de antagonismo.', 'Interpretación de curvas dosis-respuesta.', 'Aplicación en escenarios clínicos.'],
  validated: false,
  validationNotes: [
    'La guía no incluye las curvas ni sus parámetros: las curvas son ilustrativas (modelo Emax) y solo muestran el comportamiento cualitativo: el antagonista competitivo desplaza la curva a la derecha sin cambiar Emax y el no competitivo reduce Emax.',
    'El desplazamiento a la derecha del antagonismo competitivo y la disminución de Emax del no competitivo se toman de la farmacología estándar (la guía solo cita «variación en Emax»): confirmar con el docente.',
    'Los pares protamina–heparina (químico) e insulina–glucagón (fisiológico) sí están en la guía.',
  ],
})

const items: InterpretationItem[] = [
  { id: 'comp', prompt: 'En la simulación con antagonista competitivo, ¿qué ocurre con la curva dosis-respuesta?', options: [{ id: 'right', label: 'Se desplaza a la derecha, con el mismo Emax' }, { id: 'down', label: 'Disminuye el Emax' }, { id: 'left', label: 'Se desplaza a la izquierda' }], correct: 'right', explanation: 'El antagonista competitivo desplaza al agonista del receptor: se necesita más dosis para el mismo efecto, y el efecto máximo puede alcanzarse.' },
  { id: 'non', prompt: 'En la simulación con antagonista no competitivo, ¿qué ocurre con el Emax?', options: [{ id: 'down', label: 'Disminuye' }, { id: 'same', label: 'No cambia' }, { id: 'up', label: 'Aumenta' }], correct: 'down', explanation: 'Se une a un sitio distinto y reduce el efecto máximo alcanzable.' },
  { id: 'chem', prompt: 'Sulfato de protamina frente a heparina: ¿qué tipo de antagonismo es?', options: [{ id: 'chem', label: 'Químico' }, { id: 'phys', label: 'Fisiológico' }, { id: 'comp', label: 'Competitivo' }, { id: 'non', label: 'No competitivo' }], correct: 'chem', explanation: 'El antagonista químico neutraliza al fármaco (la protamina es el antídoto de la heparina).' },
  { id: 'phys', prompt: 'Insulina frente a glucagón: ¿qué tipo de antagonismo es?', options: [{ id: 'chem', label: 'Químico' }, { id: 'phys', label: 'Fisiológico' }, { id: 'comp', label: 'Competitivo' }, { id: 'non', label: 'No competitivo' }], correct: 'phys', explanation: 'El antagonismo fisiológico ejerce efectos opuestos.' },
]

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: 'Según la ficha, un antagonista competitivo:', options: [{ id: 'a', text: 'Desplaza al agonista en el receptor' }, { id: 'b', text: 'Neutraliza al fármaco' }, { id: 'c', text: 'Ejerce efectos opuestos' }, { id: 'd', text: 'No interactúa con el receptor' }], correct: 'a', explanation: 'Definición de la fundamentación teórica.' },
    { id: 'c2', type: 'choice', prompt: 'Un antagonista no competitivo:', options: [{ id: 'a', text: 'Se une a sitios distintos' }, { id: 'b', text: 'Neutraliza químicamente al fármaco' }, { id: 'c', text: 'Es siempre un hormona' }, { id: 'd', text: 'No existe' }], correct: 'a', explanation: 'Se une a sitios distintos del agonista.' },
    { id: 'c3', type: 'choice', prompt: 'El sulfato de protamina se usa como antídoto frente a:', options: [{ id: 'a', text: 'Sobredosis de heparina' }, { id: 'b', text: 'Sobredosis de insulina' }, { id: 'c', text: 'Hipoglucemia' }, { id: 'd', text: 'Deshidratación' }], correct: 'a', explanation: 'Ejemplo clásico de la ficha.' },
    { id: 't1', type: 'tf', prompt: 'El antagonismo químico neutraliza al fármaco.', correct: true, explanation: 'Definición de la fundamentación.' },
    { id: 't2', type: 'tf', prompt: 'El antagonismo fisiológico ejerce efectos opuestos.', correct: true, explanation: 'Definición de la fundamentación.' },
    { id: 'o1', type: 'open', prompt: 'Explica con un caso clínico cómo aplicarías el conocimiento del antagonismo para tomar una decisión terapéutica (por ejemplo, reversión de anticoagulación).', expectedPoints: ['Identifica el tipo de antagonismo.', 'Interpreta el efecto en la curva dosis-respuesta o en el fármaco.', 'Justifica la decisión terapéutica.'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Tipos de antagonismo',
  Extra: Chart,
  steps: [
    { id: 'theory', title: 'Revisión teórica', instruction: 'Revisa la teoría breve sobre farmacodinamia y tipos de antagonismo (10 minutos).', hint: 'Elige «Revisar la teoría».', actions: ['theory'], success: 'Teoría revisada.' },
    { id: 'sim1', title: 'Simulación 1: antagonista competitivo', instruction: 'Ejecuta la simulación de la curva dosis-respuesta del agonista solo y con antagonista competitivo.', hint: 'Ejecuta primero el agonista solo y luego el antagonista competitivo.', actions: ['sim:agonist', 'sim:competitive'], success: 'Simulación 1 completada.' },
    { id: 'sim2', title: 'Simulación 2: antagonista no competitivo', instruction: 'Ejecuta la segunda simulación: antagonismo no competitivo, y analiza la variación en Emax.', hint: 'Ejecuta la simulación del antagonista no competitivo.', actions: ['sim:noncompetitive'], success: 'Simulación 2 completada.' },
    { id: 'cases', title: 'Casos clínicos', instruction: 'Revisa los casos clínicos: antagonismo químico (protamina vs. heparina) y fisiológico (insulina vs. glucagón).', hint: 'Revisa los dos casos.', actions: ['case:chem', 'case:phys'], success: 'Casos revisados.' },
    { id: 'discuss', title: 'Análisis grupal', instruction: 'Participa en el análisis grupal y la resolución de preguntas clínicas.', hint: 'Elige «Participar en el análisis grupal».', actions: ['discuss'], success: 'Análisis realizado.' },
  ],
  cards: [
    { id: 'theory', label: 'Revisar la teoría de antagonismo', group: 'Teoría' },
    { id: 'sim:agonist', label: 'Simular el agonista solo', group: 'Simulaciones' },
    { id: 'sim:competitive', label: 'Simular con antagonista competitivo', group: 'Simulaciones' },
    { id: 'sim:noncompetitive', label: 'Simular con antagonista no competitivo', group: 'Simulaciones' },
    { id: 'case:chem', label: 'Caso: protamina vs. heparina', group: 'Casos clínicos' },
    { id: 'case:phys', label: 'Caso: insulina vs. glucagón', group: 'Casos clínicos' },
    { id: 'discuss', label: 'Participar en el análisis grupal', group: 'Análisis' },
  ],
  requires: { 'sim:competitive': { needs: 'sim:agonist', message: 'Primero simula el agonista solo.' } },
  quiz,
  interpretationItems: items,
  materialsPanel: [{ id: 'sw', label: 'Software de simulación', description: 'Curvas dosis-respuesta interactivas.', kind: 'equipment' }, { id: 'sim', label: 'Simulador de alta fidelidad', description: 'Supervisión docente.', kind: 'equipment' }],
  referenceTable: [{ title: 'Tipos de antagonismo (ficha)', rows: [{ label: 'Competitivo', value: 'Desplaza al agonista en el receptor' }, { label: 'No competitivo', value: 'Se une a sitios distintos' }, { label: 'Químico', value: 'Neutraliza al fármaco (protamina–heparina)' }, { label: 'Fisiológico', value: 'Efectos opuestos (insulina–glucagón)' }] }],
  defaultWeights: farmaWeightsWithItems,
  resultText: 'Simulaciones de antagonismo realizadas y casos clínicos revisados.',
  closing: `Se compararon los tipos de antagonismo farmacológico y sus aplicaciones clínicas. ${SIM_NOTE}`,
  disclaimer: `Simulación educativa. ${SIM_NOTE}`,
})
