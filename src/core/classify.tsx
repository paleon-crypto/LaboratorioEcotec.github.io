/**
 * Actividad reutilizable de clasificación: arrastrar cada elemento a su categoría (o seleccionarlo y pulsar la categoría; funciona con teclado).
 * Un acierto ejecuta `${prefix}:${itemId}` en el motor; un error ejecuta `${wrongAction}` (que debe estar definido como distractor).
 */
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'

export interface ClassifyItem { id: string; label: string; icon?: ReactNode; note?: string }
export interface ClassifyBin { id: string; label: string; icon?: ReactNode }

export interface ClassifyProps {
  title: string
  help?: string
  items: ClassifyItem[]
  bins: ClassifyBin[]
  /** itemId → binId correcto. */
  answer: Record<string, string>
  prefix: string
  wrongAction: string
  done: string[]
  perform: (action: string, payload?: number | string) => void
  disabled: boolean
}

export default function Classify({ title, help, items, bins, answer, prefix, wrongAction, done, perform, disabled }: ClassifyProps) {
  const [held, setHeld] = useState<string | null>(null)
  const [msg, setMsg] = useState('')
  const isDone = (id: string) => done.includes(`${prefix}:${id}`)
  const drop = (binId: string, itemId: string) => {
    if (answer[itemId] === binId) {
      perform(`${prefix}:${itemId}`)
      setMsg(`Correcto: «${items.find((i) => i.id === itemId)?.label}» → ${bins.find((b) => b.id === binId)?.label}.`)
    } else {
      perform(wrongAction)
      setMsg(`«${items.find((i) => i.id === itemId)?.label}» no corresponde a «${bins.find((b) => b.id === binId)?.label}». Revisa su función.`)
    }
    setHeld(null)
  }
  const pending = items.filter((i) => !isDone(i.id))
  return (
    <section aria-label={title} className="rounded-xl border-2 border-brand-200 bg-white p-4">
      <h3 className="mb-1 text-sm font-bold text-brand-900">{title}</h3>
      <p className="mb-3 text-xs text-slate-600" aria-live="polite">{msg || help || 'Arrastra cada elemento a su categoría, o selecciónalo y pulsa la categoría.'}</p>
      <div className="mb-3 flex flex-wrap gap-2">
        {pending.map((it) => (
          <button
            key={it.id}
            type="button"
            draggable={!disabled}
            disabled={disabled}
            aria-pressed={held === it.id}
            onDragStart={(e) => { e.dataTransfer.setData('text/plain', it.id); setHeld(it.id) }}
            onDragEnd={() => setHeld(null)}
            onClick={() => setHeld(held === it.id ? null : it.id)}
            className={`flex cursor-grab items-center gap-2 rounded-xl border-2 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm ${held === it.id ? 'border-amber-500 ring-2 ring-amber-300' : 'border-slate-200 hover:border-brand-500'}`}
          >
            {it.icon}{it.label}
          </button>
        ))}
        {pending.length === 0 && <p className="flex items-center gap-1 text-sm font-medium text-emerald-700"><CheckCircle2 size={16} aria-hidden="true" /> Todos clasificados.</p>}
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {bins.map((b) => (
          <button
            key={b.id}
            type="button"
            disabled={disabled}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData('text/plain'); if (id) drop(b.id, id) }}
            onClick={() => held && drop(b.id, held)}
            aria-label={held ? `Soltar «${items.find((i) => i.id === held)?.label}» en: ${b.label}` : b.label}
            className={`min-h-20 rounded-xl border-2 border-dashed p-2 text-left ${held ? 'border-amber-500 bg-amber-50' : 'border-slate-300 bg-slate-50'}`}
          >
            <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-slate-600">{b.icon}{b.label}</span>
            <span className="mt-1 flex flex-wrap gap-1">
              {items.filter((i) => isDone(i.id) && answer[i.id] === b.id).map((i) => (
                <span key={i.id} className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">{i.label}</span>
              ))}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
