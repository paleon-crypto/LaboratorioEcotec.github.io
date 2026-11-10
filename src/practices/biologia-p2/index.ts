/** Biología Celular y Molecular – Práctica 2: Uso, manejo y cuidados de dispositivos de laboratorio: micropipetas. */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import { biologiaMeta, biologiaWeightsNoResults } from '../biologia'
import Extra2, { TIPS } from './Extra'

const meta = biologiaMeta(2, 1, '14/05/2025', {
  title: 'Uso, manejo y cuidados de dispositivos en laboratorio: micropipetas',
  objective: 'Demostrar el correcto uso de la micropipeta al dosificar diferentes fluidos correlacionando aspiración con volúmenes deseados.',
  learningOutcomes: ['Utilizar correctamente las micropipetas.', 'Transferir volúmenes de un recipiente a otro relacionando volumen y longitud.', 'Identificar las partes y tipos de micropipetas, sus rangos de volumen y aplicaciones.', 'Conocer el procedimiento de calibración y ajuste de volumen.'],
  difficulty: 'Básica',
  theory: 'Las micropipetas son instrumentos esenciales en el laboratorio para medir y transferir volúmenes pequeños con precisión. Su uso correcto es clave en áreas como biología molecular y bioquímica, ya que errores en el pipeteo afectan los resultados. Esta práctica permite aprender su funcionamiento, técnica adecuada, cuidados, y refuerza el cumplimiento de normas de bioseguridad y manejo responsable del equipo.',
  materials: ['Puntas amarillas de 20 a 200 µL (100)', 'Puntas azules de 100 a 1000 µL (150)', 'Puntas blancas de 0 a 10 µL (50)', 'Microtubos de 1,5 mL', 'Gradillas para microtubos (6)'],
  equipment: ['Micropipeta 0–10 (2)', 'Micropipeta 20–200 (2)', 'Micropipeta 100–1000 (3)', 'Cámara de seguridad biológica (1)'],
  safetyNotes: ['Uso adecuado de instrumentos de medición volumétrica.', 'Dosificación y manejo de pipetas automáticas.', 'Eliminación de puntas por cada aspiración.'],
  evaluationCriteria: ['Actitud: asistencia, puntualidad, presentación personal, liderazgo.', 'Habilidad y desempeño: precisión en la medición y lectura del equipo.', 'Capacidad técnica/conocimiento: interpretación adecuada de los resultados.', 'Campo profesional: relación entre parámetros urinarios y el estado de salud (texto de la ficha, probablemente copiado de otra práctica).'],
  bibliography: ['Johnson TR, Case CL. Laboratory Experiments in Microbiology. 10th ed. Pearson Education; 2013.', 'Buenas prácticas de la OMS para laboratorios de microbiología farmacéutica. Red PARF Documento Técnico N.º 11. Washington, DC; 2013.'],
  validated: false,
  validationNotes: [
    'La ficha no indica el volumen a pipetear ni los fluidos: el simulador no fija volúmenes y solo practica la secuencia de topes. Pendiente.',
    'El emparejamiento punta ↔ micropipeta se deduce de que los rangos de las puntas coinciden con los de las micropipetas listadas en la ficha.',
    'Numeración: la ficha rotula esta práctica como N°1 (hay tres N°1); se numera 2 por su orden.',
    'El criterio «Campo profesional» menciona parámetros urinarios, ajeno a esta práctica; se reproduce tal cual.',
    'El banco de preguntas fue redactado a partir de la ficha: pendiente de revisión docente.',
  ],
})

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: '¿Hasta dónde se aprieta el émbolo antes de introducir la punta para aspirar?', options: [{ id: 'a', text: 'Hasta el primer tope' }, { id: 'b', text: 'Hasta el segundo tope' }, { id: 'c', text: 'No se aprieta' }, { id: 'd', text: 'Hasta el fondo y se sostiene' }], correct: 'a', explanation: 'Paso 1 del procedimiento.' },
    { id: 'c2', type: 'choice', prompt: '¿Cómo se suelta el volumen completamente?', options: [{ id: 'a', text: 'Presionando hasta el segundo tope' }, { id: 'b', text: 'Soltando el émbolo de golpe' }, { id: 'c', text: 'Agitando la pipeta' }, { id: 'd', text: 'Soplando por la punta' }], correct: 'a', explanation: 'Paso 5 del procedimiento.' },
    { id: 'c3', type: 'choice', prompt: '¿Qué punta corresponde a la micropipeta de 100 a 1000 µL?', options: [{ id: 'a', text: 'Azul' }, { id: 'b', text: 'Amarilla' }, { id: 'c', text: 'Blanca' }, { id: 'd', text: 'Cualquiera' }], correct: 'a', explanation: 'Puntas azules de 100 a 1000 µL, según el listado de insumos.' },
    { id: 't1', type: 'tf', prompt: 'Se debe eliminar la punta por cada aspiración.', correct: true, explanation: 'Manejo de materiales: eliminación de puntas por cada aspiración.' },
    { id: 't2', type: 'tf', prompt: 'Al aspirar hay que procurar no generar burbujas.', correct: true, explanation: 'Paso 3 del procedimiento.' },
    { id: 'o1', type: 'open', prompt: 'Explica cómo se interpreta un uso preciso de la micropipeta y qué indican los errores de volumen o de manipulación.', expectedPoints: ['Un uso preciso y sin errores indica que se comprendió la técnica.', 'Los errores reflejan fallas en la práctica o en la calibración.', 'Se evalúa destreza, precisión y responsabilidad.'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Micropipeteo',
  steps: [
    { id: 'tips', title: 'Elegir las puntas', instruction: 'Empareja cada punta con la micropipeta cuyo rango le corresponde.', hint: 'Arrastra cada punta a su micropipeta.', actions: TIPS.map((t) => `classify:${t.id}`), success: 'Puntas emparejadas.' },
    { id: 'stop1', title: 'Primer tope', instruction: 'Aprieta el émbolo hasta el primer tope.', hint: 'Elige la acción del émbolo.', actions: ['stop1'], success: 'Émbolo en el primer tope.' },
    { id: 'aspirate', title: 'Aspirar', instruction: 'Introduce la punta y aspira el contenido previamente ajustado, sin generar burbujas.', hint: 'Aspira y comprueba que no haya burbujas.', actions: ['aspirate', 'no-bubbles'], success: 'Líquido aspirado sin burbujas.' },
    { id: 'dispense', title: 'Dispensar', instruction: 'Aprieta hasta el primer tope y luego hasta el segundo tope para soltar el volumen completamente.', hint: 'Primero el primer tope; después el segundo.', actions: ['dispense-1', 'dispense-2'], success: 'Volumen dispensado.' },
    { id: 'discard', title: 'Desechar la punta', instruction: 'Desecha la punta en el recipiente correspondiente.', hint: 'Elimina la punta tras terminar.', actions: ['discard'], success: 'Punta desechada.' },
  ],
  cards: [
    { id: 'stop1', label: 'Apretar el émbolo hasta el primer tope', group: 'Técnica' },
    { id: 'aspirate', label: 'Introducir la punta y aspirar', group: 'Técnica' },
    { id: 'no-bubbles', label: 'Comprobar que no hay burbujas', group: 'Técnica' },
    { id: 'dispense-1', label: 'Dispensar: apretar hasta el primer tope', group: 'Técnica' },
    { id: 'dispense-2', label: 'Presionar hasta el segundo tope', group: 'Técnica' },
    { id: 'discard', label: 'Desechar la punta en su recipiente', group: 'Cierre' },
  ],
  distractors: [
    { id: 'tip-wrong', label: 'Usar una punta de otro rango', group: 'Puntas', feedback: 'Esa punta no corresponde al rango de la micropipeta.' },
    { id: 'reuse-tip', label: 'Reutilizar la punta en otra aspiración', group: 'Cierre', feedback: 'Se elimina la punta por cada aspiración.' },
    { id: 'bubbles', label: 'Soltar el émbolo de golpe al aspirar', group: 'Técnica', feedback: 'Debe evitarse generar burbujas al aspirar.' },
  ],
  requires: {
    'dispense-2': { needs: 'dispense-1', message: 'Primero aprieta hasta el primer tope.' },
    'no-bubbles': { needs: 'aspirate', message: 'Primero aspira.' },
  },
  Extra: Extra2,
  quiz,
  materialsPanel: [
    ...['Puntas amarillas 20–200 µL (100)', 'Puntas azules 100–1000 µL (150)', 'Puntas blancas 0–10 µL (50)', 'Microtubos 1,5 mL', 'Gradillas para microtubos (6)'].map((l, i) => ({ id: `m${i}`, label: l, description: 'Insumo.', kind: 'material' as const })),
    ...['Micropipeta 0–10 (2)', 'Micropipeta 20–200 (2)', 'Micropipeta 100–1000 (3)', 'Cámara de seguridad biológica'].map((l, i) => ({ id: `e${i}`, label: l, description: 'Equipo.', kind: 'equipment' as const })),
  ],
  referenceTable: [{ title: 'Puntas y micropipetas (ficha)', rows: [{ label: 'Blanca', value: '0 a 10 µL' }, { label: 'Amarilla', value: '20 a 200 µL' }, { label: 'Azul', value: '100 a 1000 µL' }] }],
  defaultWeights: biologiaWeightsNoResults,
  resultText: 'Micropipeteo realizado con los topes del émbolo y descarte de la punta.',
  closing: 'Se practicó la secuencia de micropipeteo: primer tope, aspiración sin burbujas, dispensación hasta el segundo tope y descarte de la punta.',
})
