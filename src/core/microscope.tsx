/**
 * Microscopio virtual reutilizable: campo circular con objetivos, enfoque, iluminación y desplazamiento de la platina.
 * El contenido de la preparación lo dibuja cada práctica (SVG) y recibe el aumento y el desplazamiento.
 * Las imágenes son esquemáticas: la ficha no incluye micrografías.
 */
import { ZoomIn } from 'lucide-react'
import { useId, useState } from 'react'
import type { ReactNode } from 'react'

export interface MicroscopeProps {
  /** Aumentos de los objetivos disponibles (p. ej. [4, 10, 40, 100]). */
  objectives?: number[]
  /** Dibuja la preparación. `zoom` es el factor del objetivo (1 = menor aumento), `pan` el desplazamiento en unidades del lienzo (0..100). */
  render: (v: { objective: number; zoom: number; pan: { x: number; y: number } }) => ReactNode
  /** Se llama al cambiar de objetivo o al lograr un buen enfoque (para registrar acciones del motor). */
  onObjective?: (objective: number) => void
  onFocused?: (objective: number) => void
  /** Texto bajo el campo (p. ej. «Preparación de mucosa bucal teñida con azul de metileno»). */
  caption?: string
  disabled?: boolean
  /** Enfoque inicial desenfocado (0..100); el óptimo es 50 ± 6. */
  startFocus?: number
  /** Al elegir un objetivo, la imagen se enfoca sola y se registra la observación (el tornillo queda como ajuste fino opcional). */
  autoFocus?: boolean
}

export default function Microscope({ objectives = [4, 10, 40], render, onObjective, onFocused, caption, disabled, startFocus = 15, autoFocus = true }: MicroscopeProps) {
  const [obj, setObj] = useState(objectives[0])
  const [focus, setFocus] = useState(startFocus)
  const [light, setLight] = useState(70)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const id = useId()
  const zoom = obj / objectives[0]
  const blur = Math.min(8, Math.abs(focus - 50) / 6)
  const sharp = blur < 1
  const move = (dx: number, dy: number) => setPan((p) => ({ x: Math.max(-40, Math.min(40, p.x + dx)), y: Math.max(-40, Math.min(40, p.y + dy)) }))

  return (
    <section aria-label="Microscopio virtual" className="rounded-xl border border-slate-300 bg-white p-3">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
        <div>
          <div className="relative mx-auto aspect-square w-full max-w-[22rem] overflow-hidden rounded-full border-8 border-slate-700 bg-slate-900">
            <svg viewBox="0 0 100 100" className="h-full w-full" style={{ filter: `blur(${blur}px) brightness(${0.35 + light / 100 * 0.9})`, transition: 'filter .2s' }} role="img" aria-label={caption ?? 'Campo microscópico'}>
              <rect width="100" height="100" fill="#fdf6ee" />
              <g transform={`translate(${50 + pan.x * zoom} ${50 + pan.y * zoom}) scale(${zoom}) translate(-50 -50)`}>{render({ objective: obj, zoom, pan })}</g>
            </svg>
            <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_40px_10px_rgba(0,0,0,.55)]" />
          </div>
          {caption && <p className="mt-2 text-center text-xs text-slate-500">{caption} · {obj}×</p>}
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500"><ZoomIn size={14} aria-hidden="true" /> Objetivo</p>
            <div className="flex flex-wrap gap-1.5">
              {objectives.map((o) => (
                <button
                  key={o}
                  type="button"
                  disabled={disabled}
                  aria-pressed={obj === o}
                  onClick={() => { setObj(o); setPan({ x: 0, y: 0 }); onObjective?.(o); if (autoFocus) { setFocus(50); onFocused?.(o) } }}
                  className={`rounded-lg border-2 px-3 py-1.5 text-xs font-bold ${obj === o ? 'border-brand-600 bg-brand-50 text-brand-800' : 'border-slate-200 text-slate-600 hover:border-brand-500'}`}
                >
                  {o}×
                </button>
              ))}
            </div>
            {autoFocus && <p className="mt-1.5 text-[11px] text-slate-500">Al elegir un objetivo la imagen se enfoca sola y la observación queda registrada.</p>}
          </div>
          <label className="block text-xs font-semibold text-slate-600" htmlFor={`${id}-f`}>
            {autoFocus ? 'Ajuste fino (opcional)' : 'Enfoque (tornillo micrométrico)'} {sharp && <span className="text-emerald-700">· nítido</span>}
            <input id={`${id}-f`} type="range" min={0} max={100} value={focus} disabled={disabled} className="mt-1 w-full"
              onChange={(e) => setFocus(Number(e.target.value))}
              onPointerUp={() => sharp && onFocused?.(obj)} onKeyUp={() => sharp && onFocused?.(obj)} />
          </label>
          <label className="block text-xs font-semibold text-slate-600" htmlFor={`${id}-l`}>
            Iluminación
            <input id={`${id}-l`} type="range" min={10} max={100} value={light} disabled={disabled} className="mt-1 w-full" onChange={(e) => setLight(Number(e.target.value))} />
          </label>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Platina</p>
            <div className="grid w-28 grid-cols-3 gap-1" role="group" aria-label="Desplazar la platina">
              <span />
              <button type="button" disabled={disabled} aria-label="Mover hacia arriba" onClick={() => move(0, 8)} className="rounded border border-slate-300 py-1 text-xs font-bold hover:bg-slate-50">↑</button>
              <span />
              <button type="button" disabled={disabled} aria-label="Mover hacia la izquierda" onClick={() => move(8, 0)} className="rounded border border-slate-300 py-1 text-xs font-bold hover:bg-slate-50">←</button>
              <span />
              <button type="button" disabled={disabled} aria-label="Mover hacia la derecha" onClick={() => move(-8, 0)} className="rounded border border-slate-300 py-1 text-xs font-bold hover:bg-slate-50">→</button>
              <span />
              <button type="button" disabled={disabled} aria-label="Mover hacia abajo" onClick={() => move(0, -8)} className="rounded border border-slate-300 py-1 text-xs font-bold hover:bg-slate-50">↓</button>
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
