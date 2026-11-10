import { CheckCircle2, ShieldAlert, XCircle } from 'lucide-react'
import { useState } from 'react'
import { Badge, Card } from '../../components/ui'
import type { Attempt, PracticeModule, Question } from '../../core/types'

interface Props {
  module: PracticeModule
  attempt: Attempt
  onAnswer: (questionId: string, value: string | boolean) => void
  onSubmit: () => void
  onContinue: () => void
}

const typeLabel = { choice: 'Selección múltiple', tf: 'Verdadero o falso', open: 'Pregunta abierta' } as const

export default function QuizStage({ module, attempt, onAnswer, onSubmit, onContinue }: Props) {
  const [showMissing, setShowMissing] = useState(false)
  const questions = module.quiz.questions
  const submitted = attempt.quizSubmitted

  const required = questions.filter((q) => q.type !== 'open')
  const missing = required.filter((q) => attempt.quizAnswers[q.id] === undefined)

  const handleSubmit = () => {
    if (missing.length > 0) {
      setShowMissing(true)
      return
    }
    onSubmit()
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {!module.quiz.validated && (
        <p className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
          <ShieldAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          Las preguntas fueron redactadas a partir de la ficha académica y están pendientes de revisión por el docente.
        </p>
      )}

      {questions.map((q, i) => (
        <QuestionCard key={q.id} q={q} index={i + 1} attempt={attempt} submitted={submitted} onAnswer={onAnswer} flagMissing={showMissing && missing.some((m) => m.id === q.id)} />
      ))}

      <div className="flex flex-wrap items-center justify-between gap-3">
        {!submitted ? (
          <>
            <p className={`text-sm ${showMissing && missing.length ? 'font-medium text-red-700' : 'text-slate-600'}`} role={showMissing && missing.length ? 'alert' : undefined}>
              {showMissing && missing.length
                ? `Responde las ${missing.length} pregunta(s) de selección y verdadero/falso pendientes.`
                : 'Las preguntas abiertas serán revisadas por el docente.'}
            </p>
            <button type="button" onClick={handleSubmit} className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800">
              Enviar evaluación
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-slate-600">Evaluación enviada.</p>
            <button type="button" onClick={onContinue} className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800">
              Continuar al informe
            </button>
          </>
        )}
      </div>
    </div>
  )
}

interface QCProps {
  q: Question
  index: number
  attempt: Attempt
  submitted: boolean
  flagMissing: boolean
  onAnswer: Props['onAnswer']
}

function QuestionCard({ q, index, attempt, submitted, flagMissing, onAnswer }: QCProps) {
  const answer = attempt.quizAnswers[q.id]
  const graded = q.type !== 'open'
  const correct = q.type === 'open' ? null : answer === q.correct

  return (
    <Card className={flagMissing ? 'border-red-400' : ''}>
      <fieldset>
        <legend className="mb-3 flex w-full flex-wrap items-start gap-2">
          <Badge tone="blue">{index}. {typeLabel[q.type]}</Badge>
          <span className="w-full text-sm font-medium text-slate-800">{q.prompt}</span>
        </legend>

        {q.type === 'choice' && (
          <div className="space-y-2">
            {q.options.map((o) => (
              <label key={o.id} className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-3 text-sm ${answer === o.id ? 'border-brand-600 bg-brand-50' : 'border-slate-200'} ${submitted ? 'cursor-default' : 'hover:border-brand-500'}`}>
                <input type="radio" name={q.id} value={o.id} disabled={submitted} checked={answer === o.id} onChange={() => onAnswer(q.id, o.id)} className="mt-0.5" />
                <span>{o.text}</span>
              </label>
            ))}
          </div>
        )}

        {q.type === 'tf' && (
          <div className="flex gap-3">
            {[true, false].map((v) => (
              <label key={String(v)} className={`flex flex-1 cursor-pointer items-center gap-3 rounded-lg border-2 p-3 text-sm ${answer === v ? 'border-brand-600 bg-brand-50' : 'border-slate-200'} ${submitted ? 'cursor-default' : 'hover:border-brand-500'}`}>
                <input type="radio" name={q.id} disabled={submitted} checked={answer === v} onChange={() => onAnswer(q.id, v)} />
                {v ? 'Verdadero' : 'Falso'}
              </label>
            ))}
          </div>
        )}

        {q.type === 'open' && (
          <>
            <label htmlFor={q.id} className="sr-only">Respuesta a la pregunta {index}</label>
            <textarea
              id={q.id}
              rows={4}
              maxLength={1200}
              disabled={submitted}
              value={typeof answer === 'string' ? answer : ''}
              onChange={(e) => onAnswer(q.id, e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3 text-sm disabled:bg-slate-50"
              placeholder="Escribe tu respuesta (máx. 1200 caracteres)"
            />
          </>
        )}
      </fieldset>

      {submitted && graded && (
        <div role="status" className={`mt-3 rounded-xl border p-3 text-sm ${correct ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-red-300 bg-red-50 text-red-900'}`}>
          <p className="flex items-center gap-2 font-semibold">
            {correct ? <CheckCircle2 size={18} aria-hidden="true" /> : <XCircle size={18} aria-hidden="true" />}
            {correct ? 'Correcto' : 'Incorrecto'}
          </p>
          <p className="mt-1">{q.explanation}</p>
        </div>
      )}

      {submitted && q.type === 'open' && (
        <div className="mt-3 rounded-xl border border-brand-200 bg-brand-50 p-3 text-sm text-brand-900">
          <p className="font-semibold">Criterios que revisará el docente:</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            {q.expectedPoints.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      )}
    </Card>
  )
}
