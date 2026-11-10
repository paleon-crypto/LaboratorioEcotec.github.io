/** Escena 2D del refractómetro (práctica 2). */
import { useState } from 'react'
import type { DragEvent, FormEvent, ReactNode } from 'react'
import type { SceneProps } from '../../core/types'

function Chip({ id, label, held, onHold, disabled, children }: { id: string; label: string; held: string | null; onHold: (id: string | null) => void; disabled: boolean; children: ReactNode }) {
  const isHeld = held === id
  return (
    <button
      type="button"
      draggable={!disabled}
      disabled={disabled}
      onDragStart={(e: DragEvent) => {
        e.dataTransfer.setData('text/plain', id)
        onHold(id)
      }}
      onDragEnd={() => onHold(null)}
      onClick={() => onHold(isHeld ? null : id)}
      aria-pressed={isHeld}
      aria-label={`${label}${isHeld ? ' (seleccionado)' : ''}`}
      className={`flex min-w-24 cursor-grab flex-col items-center gap-1 rounded-xl border-2 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm ${isHeld ? 'border-amber-500 ring-2 ring-amber-300' : 'border-slate-200 hover:border-brand-500'}`}
    >
      {children}
      <span>{label}</span>
    </button>
  )
}

function RecordForm({ perform, disabled }: { perform: SceneProps['perform']; disabled: boolean }) {
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const clean = text.trim().replace(',', '.')
    if (!/^1\.\d{3}$/.test(clean)) {
      setError('Ingresa el valor con tres decimales, por ejemplo 1.015.')
      return
    }
    setError(null)
    perform('record', Number(clean))
    setText('')
  }
  return (
    <form onSubmit={submit} noValidate className="mx-auto flex w-full max-w-md flex-col gap-2 rounded-xl border border-brand-200 bg-white p-3">
      <label htmlFor="sg-value" className="text-sm font-semibold text-brand-900">Anota la gravedad específica leída</label>
      <div className="flex gap-2">
        <input id="sg-value" inputMode="decimal" autoComplete="off" maxLength={5} value={text} onChange={(e) => setText(e.target.value)} aria-invalid={error !== null} disabled={disabled} placeholder="Ej.: 1.015" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <button type="submit" disabled={disabled} className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-50">Registrar</button>
      </div>
      {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
    </form>
  )
}

export default function Scene({ state, steps, perform, disabled }: SceneProps) {
  const d = state.data
  const [held, setHeld] = useState<string | null>(null)
  const step = steps[Math.min(state.stepIndex, steps.length - 1)]
  const showRecord = state.status === 'running' && step.actions.includes('record')

  const use = (item: string) => {
    if (disabled) return
    perform(`${item}->prism`)
    setHeld(null)
  }
  const prism = d.prism as string | undefined
  const prismColor = prism === 'urine' ? '#fde047' : prism === 'water' ? '#bae6fd' : '#cbd5e1'
  const value = typeof d.measured === 'number' ? (d.measured / 1000).toFixed(3) : ''

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-100 to-slate-200 p-4" role="group" aria-label="Mesa de trabajo del laboratorio virtual">
      <p className="text-center text-xs text-slate-600">{held ? 'Elemento seleccionado: pulsa el visor del refractómetro o arrástralo.' : 'Selecciona un elemento (o arrástralo) y llévalo al visor del refractómetro.'}</p>

      <div className="flex flex-1 flex-wrap items-center justify-center gap-6">
        {/* Refractómetro */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            const id = e.dataTransfer.getData('text/plain')
            if (id) use(id)
          }}
        >
          <button
            type="button"
            disabled={disabled}
            onClick={() => held && use(held)}
            aria-label={held ? 'Usar el elemento seleccionado sobre el visor del refractómetro' : 'Refractómetro'}
            className={`rounded-2xl p-2 ${held ? 'cursor-pointer outline-2 outline-dashed outline-amber-400' : 'cursor-default'}`}
          >
            <svg viewBox="0 0 220 230" className="h-56 w-52" aria-hidden="true">
              <rect x="70" y="10" width="80" height="100" rx="14" fill="#475569" />
              <rect x="82" y="22" width="56" height="30" rx="8" fill="#0f172a" />
              {/* visor / prisma */}
              <rect x="40" y="110" width="140" height="70" rx="12" fill="#334155" />
              <rect x="60" y="120" width="100" height="40" rx="8" fill={prismColor} stroke="#94a3b8" />
              {d.lensDown === true && <rect x="52" y="112" width="116" height="56" rx="10" fill="#94a3b8" opacity=".85" />}
              <rect x="95" y="180" width="30" height="40" rx="6" fill="#64748b" />
              {d.facingLight === true && <circle cx="110" cy="38" r="12" fill="#fde68a" opacity=".9" />}
            </svg>
          </button>
          <p className="text-center text-xs font-semibold text-slate-700">Refractómetro</p>
        </div>

        {/* Lectura */}
        <div className="w-44 rounded-xl bg-white/80 p-3 text-center">
          <p className="text-xs font-semibold text-slate-700">Escala del refractómetro</p>
          <div role="status" aria-label="Lectura del refractómetro" className="mt-2 flex h-16 items-center justify-center rounded-lg bg-lime-100 font-mono text-slate-800">
            {d.valueRead === true ? <span className="text-2xl font-bold tabular-nums">{value}</span> : <span className="text-xs">{d.facingLight === true ? 'Pulsa «Leer la escala»' : '—'}</span>}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/70 p-3">
        <div className="flex flex-wrap items-center justify-center gap-3" aria-label="Materiales en la mesa">
          <Chip id="water" label="Agua destilada (gotero)" held={held} onHold={setHeld} disabled={disabled}>
            <svg viewBox="0 0 30 44" className="h-10 w-7" aria-hidden="true"><rect x="12" y="2" width="6" height="14" rx="3" fill="#475569" /><rect x="6" y="16" width="18" height="26" rx="6" fill="#bae6fd" stroke="#0ea5e9" /></svg>
          </Chip>
          <Chip id="paper" label="Papel de cocina" held={held} onHold={setHeld} disabled={disabled}>
            <svg viewBox="0 0 40 36" className="h-9 w-10" aria-hidden="true"><rect x="4" y="6" width="32" height="24" rx="4" fill="#fff" stroke="#cbd5e1" /><path d="M10 14h20M10 20h20" stroke="#cbd5e1" /></svg>
          </Chip>
          <Chip id="urine" label="Muestra de orina (gotero)" held={held} onHold={setHeld} disabled={disabled}>
            <svg viewBox="0 0 30 44" className="h-10 w-7" aria-hidden="true"><rect x="12" y="2" width="6" height="14" rx="3" fill="#475569" /><rect x="6" y="16" width="18" height="26" rx="6" fill="#fde047" stroke="#ca8a04" /></svg>
          </Chip>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" disabled={disabled || d.lensDown === true} onClick={() => perform('lower-lens')} className="rounded-lg border border-brand-500 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 disabled:border-slate-200 disabled:text-slate-400">
          {d.lensDown === true ? 'Lente bajado ✓' : 'Bajar el lente con cuidado'}
        </button>
        <button type="button" disabled={disabled || d.facingLight === true} onClick={() => perform('face-light')} className="rounded-lg border border-brand-500 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 disabled:border-slate-200 disabled:text-slate-400">
          {d.facingLight === true ? 'Frente a la luz ✓' : 'Posicionar frente a la luz'}
        </button>
        <button type="button" disabled={disabled || d.valueRead === true} onClick={() => perform('read-value')} className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-50">
          Leer la escala
        </button>
      </div>

      {showRecord && <RecordForm perform={perform} disabled={disabled} />}
    </div>
  )
}
