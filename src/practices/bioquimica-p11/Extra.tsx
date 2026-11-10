/**
 * Informe de laboratorio simulado (P11). La ficha NO incluye valores ni rangos: las columnas «Resultado» y
 * «Valor de referencia» las completa el docente. No se muestran números inventados.
 */
import { CheckCircle2, ClipboardList, FlaskConical } from 'lucide-react'
import type { ComponentType } from 'react'
import type { ExtraProps } from '../../core/protocolBench'

export interface Marker { id: string; name: string }

export function makeLipidExtra(markers: Marker[]): ComponentType<ExtraProps> {
  return function LipidReport({ state, perform, disabled }: ExtraProps) {
    if (state.status !== 'running') return null
    const done = (state.data.doneActions as string[]) ?? []
    const received = done.includes('receive-report')
    return (
      <section className="rounded-xl border-2 border-brand-200 bg-white p-4" aria-label="Examen bioquímico simulado">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-brand-900"><ClipboardList size={16} aria-hidden="true" /> Examen bioquímico simulado · perfil lipídico</h3>
        {!received ? (
          <button type="button" disabled={disabled} onClick={() => perform('receive-report')} className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-300 bg-brand-50 p-6 text-sm font-semibold text-brand-800 hover:bg-brand-100">
            <FlaskConical size={20} aria-hidden="true" /> Recibir el examen del docente
          </button>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500"><th className="py-1.5 pr-2">Marcador</th><th className="pr-2">Resultado</th><th className="pr-2">Valor de referencia</th><th className="text-right">Lectura</th></tr></thead>
              <tbody>
                {markers.map((m) => {
                  const d = done.includes(`read:${m.id}`)
                  return (
                    <tr key={m.id} className="border-b border-slate-100">
                      <td className="py-2 pr-2 font-medium capitalize">{m.name}</td>
                      <td className="pr-2 text-xs italic text-slate-400">lo entrega el docente</td>
                      <td className="pr-2 text-xs italic text-slate-400">lo indica el docente</td>
                      <td className="py-1 text-right">
                        <button type="button" disabled={disabled || d} onClick={() => perform(`read:${m.id}`)} aria-label={`Leer e interpretar ${m.name}`} className={`rounded-lg border-2 px-2.5 py-1 text-xs font-semibold ${d ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-brand-500 text-brand-700 hover:bg-brand-50'}`}>
                          {d ? <span className="flex items-center gap-1"><CheckCircle2 size={12} aria-hidden="true" /> Leído</span> : 'Leer'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <p className="mt-2 text-[11px] text-slate-500">La ficha no incluye valores ni rangos: el docente entrega el examen y los valores normales. El informe (definición, función y valores normales) se responde en la evaluación.</p>
          </div>
        )}
      </section>
    )
  }
}
