/**
 * Identificación de estructuras sobre un esquema: selecciona (o arrastra) una etiqueta y pulsa la zona del dibujo.
 * Un acierto ejecuta `${prefix}:${id}`; un fallo ejecuta `wrongAction`. Las zonas son botones accesibles («Zona 1», …).
 */
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'

export interface Hotspot { id: string; label: string; x: number; y: number; r: number }

export interface IdentifyProps {
  title: string
  help?: string
  /** Dibujo en viewBox 0 0 100 100; recibe los ids ya identificados. */
  draw: (identified: string[]) => ReactNode
  spots: Hotspot[]
  prefix: string
  wrongAction: string
  done: string[]
  perform: (action: string, payload?: number | string) => void
  disabled: boolean
}

export default function Identify({ title, help, draw, spots, prefix, wrongAction, done, perform, disabled }: IdentifyProps) {
  const [held, setHeld] = useState<string | null>(null)
  const [msg, setMsg] = useState('')
  const isDone = (id: string) => done.includes(`${prefix}:${id}`)
  const identified = spots.filter((s) => isDone(s.id)).map((s) => s.id)
  const drop = (spotId: string, labelId: string) => {
    if (spotId === labelId) { perform(`${prefix}:${labelId}`); setMsg(`Correcto: ${spots.find((s) => s.id === labelId)?.label}.`) }
    else { perform(wrongAction); setMsg('Esa zona no corresponde a esa etiqueta. Observa de nuevo el esquema.') }
    setHeld(null)
  }
  return (
    <section aria-label={title} className="rounded-xl border-2 border-brand-200 bg-white p-4">
      <h3 className="mb-1 text-sm font-bold text-brand-900">{title}</h3>
      <p className="mb-3 text-xs text-slate-600" aria-live="polite">{msg || help || 'Selecciona una etiqueta (o arrástrala) y pulsa la zona del esquema.'}</p>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_200px]">
        <div className="relative mx-auto aspect-square w-full max-w-md rounded-xl bg-slate-50">
          <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="Esquema para identificar estructuras">{draw(identified)}</svg>
          {spots.map((s, i) => (
            <button
              key={s.id}
              type="button"
              disabled={disabled || isDone(s.id)}
              aria-label={isDone(s.id) ? `${s.label} (identificado)` : held ? `Soltar «${spots.find((x) => x.id === held)?.label}» en la zona ${i + 1}` : `Zona ${i + 1}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData('text/plain'); if (id) drop(s.id, id) }}
              onClick={() => held && drop(s.id, held)}
              style={{ left: `${s.x - s.r}%`, top: `${s.y - s.r}%`, width: `${s.r * 2}%`, height: `${s.r * 2}%` }}
              className={`absolute flex items-center justify-center rounded-full border-2 border-dashed text-[10px] font-bold ${isDone(s.id) ? 'border-emerald-500 bg-emerald-100/60 text-emerald-800' : held ? 'border-amber-500 bg-amber-100/50 text-amber-800' : 'border-slate-400 text-slate-600'}`}
            >
              {isDone(s.id) ? '✓' : i + 1}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap content-start gap-2" role="group" aria-label="Etiquetas">
          {spots.map((s) => isDone(s.id) ? (
            <span key={s.id} className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1.5 text-xs font-medium text-emerald-800"><CheckCircle2 size={14} aria-hidden="true" />{s.label}</span>
          ) : (
            <button
              key={s.id}
              type="button"
              draggable={!disabled}
              disabled={disabled}
              aria-pressed={held === s.id}
              onDragStart={(e) => { e.dataTransfer.setData('text/plain', s.id); setHeld(s.id) }}
              onDragEnd={() => setHeld(null)}
              onClick={() => setHeld(held === s.id ? null : s.id)}
              className={`cursor-grab rounded-lg border-2 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 ${held === s.id ? 'border-amber-500 ring-2 ring-amber-300' : 'border-slate-200 hover:border-brand-500'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
