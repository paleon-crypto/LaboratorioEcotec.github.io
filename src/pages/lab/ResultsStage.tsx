import { CheckCircle2, XCircle } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Badge, Card } from '../../components/ui'
import { getInterpretationItems } from '../../core/practice'
import type { Attempt, InterpretationItem, PracticeModule } from '../../core/types'

interface Props {
  module: PracticeModule
  attempt: Attempt
  onInterpret: (itemId: string, optionId: string) => void
  onContinue: () => void
}

export default function ResultsStage({ module, attempt, onInterpret, onContinue }: Props) {
  const items = getInterpretationItems(module, attempt.results)
  const allAnswered = items.every((i) => attempt.interpretation[i.id])
  const roundIds = new Set(module.rounds.map((r) => r.id))
  const looseItems = items.filter((i) => !i.roundId || !roundIds.has(i.roundId))

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-4">
        {module.rounds.map((round) => {
          const res = attempt.results.find((r) => r.roundId === round.id)
          if (!res) return null
          const roundItems = items.filter((i) => i.roundId === round.id)
          const lines = module.chartThresholds?.[round.id] ?? []
          const numeric = res.value !== undefined
          const showChart = numeric && lines.length > 0
          const top = numeric ? Math.max(300, (res.value as number) + 40, ...lines.map((l) => l.value + 40)) : 0

          return (
            <Card key={round.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-brand-900">{round.label}</h2>
                  {numeric ? (
                    <p className="text-3xl font-bold tabular-nums text-brand-800">
                      {res.value} <span className="text-base font-medium text-slate-500">{res.unit}</span>
                    </p>
                  ) : (
                    <table className="mt-2 w-full text-sm">
                      <caption className="sr-only">Observaciones de {round.label}</caption>
                      <thead>
                        <tr className="text-left text-xs uppercase text-slate-500">
                          <th scope="col" className="py-1 pr-2">Muestra</th>
                          <th scope="col" className="py-1">Observación</th>
                        </tr>
                      </thead>
                      <tbody>
                        {res.observations?.map((o) => (
                          <tr key={o.sample} className="border-t border-slate-100">
                            <th scope="row" className="py-1.5 pr-2 text-left font-medium text-slate-700">{o.sample}</th>
                            <td className="py-1.5 text-slate-600">{o.text}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                {showChart && (
                  <div className="h-44 w-full sm:w-64" role="img" aria-label={`Gráfico: ${round.label} ${res.value} ${res.unit}`}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[{ name: 'Valor', value: res.value }]} margin={{ top: 8, right: 36, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={false} axisLine={false} />
                        <YAxis domain={[0, top]} width={36} tick={{ fontSize: 11 }} />
                        <Bar dataKey="value" fill="#1d6fa3" radius={[6, 6, 0, 0]} maxBarSize={70} isAnimationActive={false} />
                        {lines.map((l) => (
                          <ReferenceLine key={l.value} y={l.value} stroke="#d97706" strokeDasharray="5 3" label={{ value: l.label, position: 'right', fontSize: 11, fill: '#92400e' }} />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {roundItems.map((item) => (
                <ItemBlock key={item.id} item={item} attempt={attempt} onInterpret={onInterpret} autoText={numeric ? `${res.classificationLabel}.` : undefined} note={res.note} />
              ))}
            </Card>
          )
        })}

        {looseItems.length > 0 && (
          <Card>
            <h2 className="font-semibold text-brand-900">Interpretación de los resultados</h2>
            <p className="text-sm text-slate-600">Con base en lo observado y en la ficha académica, responde cada punto.</p>
            {looseItems.map((item) => (
              <ItemBlock key={item.id} item={item} attempt={attempt} onInterpret={onInterpret} />
            ))}
          </Card>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            {items.length === 0
              ? 'Esta práctica no incluye interpretación automática de resultados.'
              : allAnswered
                ? 'Has interpretado todos los resultados.'
                : 'Responde todas las interpretaciones para continuar con la evaluación.'}
          </p>
          <button
            type="button"
            disabled={!allAnswered}
            onClick={onContinue}
            className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continuar a la evaluación
          </button>
        </div>
      </div>

      <aside className="space-y-4">
        {module.referenceTable.map((t) => (
          <Card key={t.title}>
            <h2 className="mb-2 font-semibold text-brand-900">Referencia de la ficha · {t.title}</h2>
            <table className="w-full text-sm">
              <caption className="sr-only">{t.title}</caption>
              <tbody>
                {t.rows.map((r) => (
                  <tr key={r.label} className="border-t border-slate-100">
                    <th scope="row" className="py-2 pr-2 text-left font-medium text-slate-700">{r.label}</th>
                    <td className="py-2 text-slate-600">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ))}
        <Card className="bg-amber-50">
          <Badge tone="amber">Aviso</Badge>
          <p className="mt-2 text-sm text-amber-900">{module.disclaimer}</p>
        </Card>
      </aside>
    </div>
  )
}

function ItemBlock({
  item,
  attempt,
  onInterpret,
  autoText,
  note,
}: {
  item: InterpretationItem
  attempt: Attempt
  onInterpret: Props['onInterpret']
  autoText?: string
  note?: string
}) {
  const chosen = attempt.interpretation[item.id]
  const correct = chosen === item.correct
  const correctLabel = item.options.find((o) => o.id === item.correct)?.label
  return (
    <div className="mt-4">
      <fieldset>
        <legend className="text-sm font-medium text-slate-700">{item.prompt}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {item.options.map((o) => (
            <label
              key={o.id}
              className={`cursor-pointer rounded-lg border-2 px-3 py-2 text-sm ${
                chosen === o.id ? 'border-brand-600 bg-brand-50 font-semibold text-brand-900' : 'border-slate-200 hover:border-brand-500'
              }`}
            >
              <input type="radio" name={`interp-${item.id}`} value={o.id} checked={chosen === o.id} onChange={() => onInterpret(item.id, o.id)} className="sr-only" />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>
      {chosen && (
        <div
          role="status"
          className={`mt-3 rounded-xl border p-3 text-sm ${correct ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-amber-300 bg-amber-50 text-amber-900'}`}
        >
          <p className="flex items-center gap-2 font-semibold">
            {correct ? <CheckCircle2 size={18} aria-hidden="true" /> : <XCircle size={18} aria-hidden="true" />}
            {correct ? 'Interpretación correcta' : 'Revisa tu interpretación'}
          </p>
          {autoText ? (
            <p className="mt-1"><strong>Interpretación automática:</strong> {autoText}</p>
          ) : (
            <p className="mt-1"><strong>Respuesta esperada:</strong> {correctLabel}</p>
          )}
          {item.explanation && <p className="mt-1">{item.explanation}</p>}
          {note && <p className="mt-1">{note}</p>}
        </div>
      )}
    </div>
  )
}
