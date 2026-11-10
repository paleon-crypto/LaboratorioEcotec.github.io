/**
 * Farmacología Básica – Práctica 2: Formas farmacéuticas y soluciones parenterales en medicina.
 * La ficha no da dosis por peso ni concentraciones de las soluciones salinas: solo se calcula con la
 * definición de concentración porcentual (g/100 mL). Los volúmenes usados son ilustrativos.
 */
import { protocolPractice } from '../../core/protocolBench'
import type { QuizConfig } from '../../core/types'
import { farmaMeta, farmaWeights, SIM_NOTE } from '../farma'
import Extra2 from './Extra'

const meta = farmaMeta(2, '14-05-2025', {
  title: 'Formas farmacéuticas y soluciones parenterales en medicina',
  objective: 'Diferenciar las principales formas farmacéuticas, con énfasis en soluciones parenterales usadas en medicina, para comprender el concepto de concentración y su aplicación clínica.',
  learningOutcomes: ['Distingue diferentes formas farmacéuticas de uso común.', 'Aplica el concepto de concentración farmacológica usando soluciones reales.', 'Interpreta la utilidad clínica de soluciones cristaloides y coloides en el tratamiento médico.'],
  theory: 'Las formas farmacéuticas permiten administrar medicamentos de forma segura, eficaz y conveniente. En el contexto clínico, el entendimiento de las soluciones parenterales, como los cristaloides (ej. glucosa al 5%, suero fisiológico) y coloides (ej. albúmina), es crucial para el tratamiento de deshidratación, choque y soporte metabólico. El análisis de concentraciones (ej. glucosa al 5%, 10%, 20% o 50%) permite al futuro médico comprender cómo varía la respuesta terapéutica y el riesgo clínico.',
  difficulty: 'Básica',
  materials: ['Suero de glucosa al 5%, 10%, 20% y 50%', 'Suero salino hipotónico, isotónico e hipertónico', 'Suero de lactato de Ringer', 'Jeringuillas de 5 cc y 10 cc', 'Guantes de manejo', 'Frascos medidores'],
  equipment: ['Computadora', 'Proyector', 'Pizarra', 'Porta frascos', 'Balanza de precisión'],
  safetyNotes: ['Uso de guantes de manejo, mandil y gorro.'],
  evaluationCriteria: ['Reconocimiento de soluciones.', 'Realización correcta de cálculo de dosis y goteo.', 'Participación en discusión clínica.'],
  validated: false,
  validationNotes: [
    'La ficha pide cálculos de dosis según peso corporal pero no da dosis ni pesos: no se simulan. Se calculan gramos y volúmenes a partir de la definición de concentración (g/100 mL).',
    'Los volúmenes usados en los ejercicios (500 mL, 25 g) son ilustrativos.',
    'La ficha no indica las concentraciones del suero salino hipotónico/hipertónico ni clasifica el lactato de Ringer: no se usan.',
    'La discusión clínica se evalúa con la pregunta abierta, que califica el docente.',
    'Los frascos dibujados, el nivel del líquido y el vaso de 100 mL son ilustrativos (no representan datos de la ficha).',
  ],
})

const gl = [5, 10, 20, 50]

const quiz: QuizConfig = {
  validated: false,
  questions: [
    { id: 'c1', type: 'choice', prompt: 'Según la ficha, ¿cuál es un ejemplo de cristaloide?', options: [{ id: 'a', text: 'Albúmina' }, { id: 'b', text: 'Glucosa al 5% / suero fisiológico' }, { id: 'c', text: 'Ninguno' }, { id: 'd', text: 'Jeringuilla de 5 cc' }], correct: 'b', explanation: 'Cristaloides: glucosa al 5% y suero fisiológico.' },
    { id: 'c2', type: 'choice', prompt: 'Según la ficha, ¿cuál es un ejemplo de coloide?', options: [{ id: 'a', text: 'Glucosa al 5%' }, { id: 'b', text: 'Suero fisiológico' }, { id: 'c', text: 'Albúmina' }, { id: 'd', text: 'Agua' }], correct: 'c', explanation: 'Coloide mencionado: albúmina.' },
    { id: 'c3', type: 'choice', prompt: '¿Cuántos gramos de glucosa hay en 100 mL de una solución al 10%?', options: [{ id: 'a', text: '1 g' }, { id: 'b', text: '10 g' }, { id: 'c', text: '100 g' }, { id: 'd', text: '0,1 g' }], correct: 'b', explanation: 'Una concentración del 10% equivale a 10 g por 100 mL.' },
    { id: 'c4', type: 'choice', prompt: 'Entender las soluciones parenterales es crucial para el tratamiento de:', options: [{ id: 'a', text: 'Deshidratación, choque y soporte metabólico' }, { id: 'b', text: 'Solo dolor de cabeza' }, { id: 'c', text: 'Ninguna condición' }, { id: 'd', text: 'Solo fracturas' }], correct: 'a', explanation: 'Así lo indica la fundamentación teórica.' },
    { id: 't1', type: 'tf', prompt: 'La concentración de glucosa (5%, 10%, 20%, 50%) influye en la respuesta terapéutica y el riesgo clínico.', correct: true, explanation: 'Está en la fundamentación teórica.' },
    { id: 't2', type: 'tf', prompt: 'Las formas farmacéuticas permiten administrar medicamentos de forma segura, eficaz y conveniente.', correct: true, explanation: 'Está en la fundamentación teórica.' },
    { id: 't3', type: 'tf', prompt: 'Una solución al 50% contiene menos glucosa por volumen que una al 5%.', correct: false, explanation: 'Al 50% hay 50 g por 100 mL; al 5%, 5 g por 100 mL.' },
    { id: 'o1', type: 'open', prompt: 'Para un paciente con deshidratación, discute qué tipo de solución parenteral elegirías y qué implicaciones clínicas consideras.', expectedPoints: ['Distingue cristaloides y coloides.', 'Relaciona la concentración con la respuesta terapéutica y el riesgo.', 'Justifica la elección de la solución.'], explanation: 'Esta pregunta será revisada por el docente.' },
  ],
}

export default protocolPractice({
  meta,
  roundLabel: 'Soluciones parenterales',
  steps: [
    { id: 'theory', title: 'Presentación teórica', instruction: 'Revisa la presentación teórica breve sobre formas farmacéuticas y concentración.', hint: 'Elige «Revisar la presentación teórica».', actions: ['theory'], success: 'Teoría revisada.' },
    { id: 'recognize', title: 'Reconocer las soluciones médicas', instruction: 'Reconoce físicamente las diferentes soluciones médicas expuestas.', hint: 'Reconoce los tres tipos de soluciones.', actions: ['recognize:glucose', 'recognize:saline', 'recognize:ringer'], success: 'Soluciones reconocidas.' },
    { id: 'compare', title: 'Análisis comparativo de concentración', instruction: 'Compara las concentraciones de glucosa: calcula los gramos de glucosa en 500 mL de cada solución (volumen ilustrativo).', hint: 'Gramos = concentración (g/100 mL) × volumen (mL) / 100.', actions: gl.map((g) => `calc:g${g}`), success: 'Comparación completada.' },
    { id: 'volume', title: 'Cálculo de volumen', instruction: 'Calcula el volumen de glucosa al 50% que contiene 25 g (ejercicio ilustrativo).', hint: 'Volumen = gramos × 100 / concentración (%).', actions: ['calc:vol'], success: 'Cálculo correcto.' },
    { id: 'discuss', title: 'Discusión clínica', instruction: 'Discute las implicaciones clínicas y la elección adecuada de la solución (en la evaluación).', hint: 'Elige «Discutir implicaciones clínicas».', actions: ['discuss'], success: 'Discusión realizada.' },
  ],
  cards: [
    { id: 'theory', label: 'Revisar la presentación teórica', group: 'Teoría' },
    { id: 'recognize:glucose', label: 'Reconocer sueros de glucosa (5, 10, 20, 50%)', group: 'Reconocimiento' },
    { id: 'recognize:saline', label: 'Reconocer suero salino (hipo, iso, hipertónico)', group: 'Reconocimiento' },
    { id: 'recognize:ringer', label: 'Reconocer lactato de Ringer', group: 'Reconocimiento' },
    { id: 'discuss', label: 'Discutir implicaciones clínicas', group: 'Discusión' },
  ],
  tasks: [
    ...gl.map((g) => ({ id: `g${g}`, group: 'Cálculo', label: `Glucosa al ${g}% en 500 mL`, prompt: `¿Cuántos gramos de glucosa hay en 500 mL de suero glucosado al ${g}%?`, unit: 'g', answer: g * 5, tol: 0.01, hint: 'Gramos = % × volumen (mL) / 100.' })),
    { id: 'vol', group: 'Cálculo', label: 'Volumen de glucosa al 50% con 25 g', prompt: '¿Qué volumen de glucosa al 50% contiene 25 g de glucosa?', unit: 'mL', answer: 50, tol: 0.01, hint: 'Volumen = gramos × 100 / %.' },
  ],
  Extra: Extra2,
  quiz,
  materialsPanel: [
    { id: 'glucose', label: 'Suero de glucosa 5%, 10%, 20% y 50%', description: 'Soluciones para comparar concentraciones.', kind: 'material' },
    { id: 'saline', label: 'Suero salino hipotónico, isotónico e hipertónico', description: 'Soluciones salinas.', kind: 'material' },
    { id: 'ringer', label: 'Suero de lactato de Ringer', description: 'Solución parenteral.', kind: 'material' },
    { id: 'syringes', label: 'Jeringuillas de 5 cc y 10 cc', description: '10 unidades.', kind: 'material' },
    { id: 'balance', label: 'Balanza de precisión y frascos medidores', description: 'Medición.', kind: 'equipment' },
  ],
  referenceTable: [{ title: 'Concentración porcentual', rows: [{ label: '5%', value: '5 g por 100 mL' }, { label: '10%', value: '10 g por 100 mL' }, { label: '20%', value: '20 g por 100 mL' }, { label: '50%', value: '50 g por 100 mL' }] }],
  defaultWeights: farmaWeights,
  resultText: 'Soluciones reconocidas y concentraciones comparadas.',
  closing: `Se reconocieron las soluciones parenterales y se compararon las concentraciones de glucosa. ${SIM_NOTE}`,
  disclaimer: `Simulación educativa. ${SIM_NOTE}`,
})
