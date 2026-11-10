/**
 * Escena 2D interactiva de la práctica (no hay modelos 3D reales, por lo que
 * se usa una simulación 2D honesta, tal como pide el proyecto).
 *
 * Interacción:
 *  - Arrastrar y soltar un elemento sobre su destino, o bien
 *  - Seleccionar el elemento (clic / Enter) y luego pulsar el destino (accesible por teclado).
 */
import { useEffect, useState } from 'react'
import type { DragEvent, FormEvent, ReactNode } from 'react'
import type { SceneProps } from '../../core/types'
import { MEASURE_MS } from './config'

/* ----------------------------- Iconos SVG ----------------------------- */

const StripIcon = () => (
  <svg viewBox="0 0 24 80" className="h-16 w-5" aria-hidden="true">
    <rect x="5" y="2" width="14" height="76" rx="3" fill="#e2e8f0" stroke="#94a3b8" />
    <rect x="5" y="2" width="14" height="22" rx="3" fill="#fbbf24" />
    <rect x="9" y="30" width="6" height="30" rx="2" fill="#94a3b8" opacity=".5" />
  </svg>
)
const LancetIcon = () => (
  <svg viewBox="0 0 28 80" className="h-16 w-6" aria-hidden="true">
    <rect x="6" y="14" width="16" height="62" rx="6" fill="#3b82f6" />
    <rect x="9" y="2" width="10" height="14" rx="3" fill="#cbd5e1" />
    <rect x="10" y="30" width="8" height="10" rx="2" fill="#bfdbfe" />
  </svg>
)
const CottonIcon = ({ wet }: { wet: boolean }) => (
  <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
    {[[24, 26, 14], [40, 28, 13], [32, 40, 15], [22, 42, 11], [42, 42, 11]].map(([cx, cy, r], i) => (
      <circle key={i} cx={cx} cy={cy} r={r} fill={wet ? '#bae6fd' : '#fff'} stroke="#cbd5e1" />
    ))}
  </svg>
)
const AlcoholIcon = () => (
  <svg viewBox="0 0 48 80" className="h-16 w-10" aria-hidden="true">
    <rect x="16" y="2" width="16" height="10" rx="2" fill="#475569" />
    <rect x="10" y="12" width="28" height="64" rx="8" fill="#bae6fd" stroke="#38bdf8" />
    <rect x="13" y="34" width="22" height="26" rx="2" fill="#fff" />
    <text x="24" y="51" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0369a1">
      70%
    </text>
  </svg>
)
const DropIcon = () => (
  <svg viewBox="0 0 24 32" className="drop-in h-8 w-6" aria-hidden="true">
    <path d="M12 2C12 2 3 14 3 20a9 9 0 0 0 18 0C21 14 12 2 12 2z" fill="#dc2626" />
    <ellipse cx="8.5" cy="20" rx="2" ry="3" fill="#fff" opacity=".35" />
  </svg>
)
const SharpsIcon = () => (
  <svg viewBox="0 0 90 100" className="h-24 w-20" aria-hidden="true">
    <path d="M14 30h62l-6 62a6 6 0 0 1-6 5H26a6 6 0 0 1-6-5z" fill="#dc2626" />
    <rect x="10" y="20" width="70" height="14" rx="4" fill="#991b1b" />
    <rect x="30" y="25" width="30" height="4" rx="2" fill="#fecaca" />
    <rect x="30" y="52" width="30" height="24" rx="3" fill="#fff" opacity=".9" />
    <path d="M45 56l9 16H36z" fill="#facc15" stroke="#111" strokeWidth="1.5" />
  </svg>
)

/* --------------------------- Piezas de la UI --------------------------- */

interface ItemProps {
  id: string
  label: string
  held: string | null
  children: ReactNode
  /** Si el elemento también es destino de otro (p. ej. algodón recibe alcohol). */
  acceptsDrops?: boolean
  onHold: (id: string | null) => void
  onCombine: (item: string, target: string) => void
  disabled: boolean
}

function Item({ id, label, held, children, acceptsDrops, onHold, onCombine, disabled }: ItemProps) {
  const isHeld = held === id
  const onDragStart = (e: DragEvent) => {
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.effectAllowed = 'move'
    onHold(id)
  }
  const dropProps = acceptsDrops
    ? {
        onDragOver: (e: DragEvent) => e.preventDefault(),
        onDrop: (e: DragEvent) => {
          e.preventDefault()
          const item = e.dataTransfer.getData('text/plain')
          if (item) onCombine(item, id)
        },
      }
    : {}
  return (
    <button
      type="button"
      draggable={!disabled}
      onDragStart={onDragStart}
      onDragEnd={() => onHold(null)}
      onClick={() => {
        if (disabled) return
        if (held && held !== id && acceptsDrops) onCombine(held, id)
        else onHold(isHeld ? null : id)
      }}
      aria-pressed={isHeld}
      aria-label={`${label}${isHeld ? ' (seleccionado)' : ''}`}
      className={`flex min-w-20 cursor-grab flex-col items-center gap-1 rounded-xl border-2 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition active:cursor-grabbing ${
        isHeld ? 'border-amber-500 ring-2 ring-amber-300' : 'border-slate-200 hover:border-brand-500'
      }`}
      {...dropProps}
    >
      {children}
      <span>{label}</span>
    </button>
  )
}

interface ZoneProps {
  target: string
  label: string
  held: string | null
  children: ReactNode
  onCombine: (item: string, target: string) => void
  className?: string
}

function Zone({ target, label, held, children, onCombine, className = '' }: ZoneProps) {
  const [over, setOver] = useState(false)
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setOver(false)
        const item = e.dataTransfer.getData('text/plain')
        if (item) onCombine(item, target)
      }}
      className={`rounded-2xl transition ${over ? 'ring-4 ring-amber-300' : ''} ${className}`}
    >
      <button
        type="button"
        aria-label={held ? `Usar el elemento seleccionado sobre: ${label}` : label}
        onClick={() => held && onCombine(held, target)}
        className={`w-full rounded-2xl ${held ? 'cursor-pointer outline-2 outline-dashed outline-amber-400' : 'cursor-default'}`}
      >
        {children}
      </button>
    </div>
  )
}

/* ------------------------------- Escena ------------------------------- */

/** Formulario de registro del valor leído (validación de entrada). */
function RecordForm({ perform, disabled }: { perform: SceneProps['perform']; disabled: boolean }) {
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const clean = text.trim()
    if (!/^\d{1,3}$/.test(clean)) {
      setError('Ingresa un número entero de hasta 3 dígitos (mg/dL).')
      return
    }
    setError(null)
    perform('record', Number(clean))
    setText('')
  }

  return (
    <form onSubmit={submit} className="mx-auto flex w-full max-w-md flex-col gap-2 rounded-xl border border-brand-200 bg-white p-3" noValidate>
      <label htmlFor="record-value" className="text-sm font-semibold text-brand-900">
        Registro de resultados: valor mostrado por el glucómetro (mg/dL)
      </label>
      <div className="flex gap-2">
        <input
          id="record-value"
          inputMode="numeric"
          autoComplete="off"
          maxLength={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-invalid={error !== null}
          aria-describedby={error ? 'record-error' : undefined}
          disabled={disabled}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          placeholder="Ej.: 95"
        />
        <button type="submit" disabled={disabled} className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-50">
          Registrar
        </button>
      </div>
      {error && (
        <p id="record-error" role="alert" className="text-xs text-red-700">
          {error}
        </p>
      )}
    </form>
  )
}

export default function Scene({ state, steps, perform, disabled }: SceneProps) {
  const d = state.data
  const currentStep = steps[state.stepIndex]
  const showRecord = state.status === 'running' && currentStep?.actions.includes('record')
  const picked = (d.picked as string[]) ?? []
  const has = (id: string) => picked.includes(id)
  const [held, setHeld] = useState<string | null>(null)
  const [now, setNow] = useState(() => Date.now())

  const startedAt = typeof d.measureStartedAt === 'number' ? d.measureStartedAt : undefined
  const valueRead = d.valueRead === true
  useEffect(() => {
    if (startedAt === undefined || valueRead) return
    const id = setInterval(() => setNow(Date.now()), 200)
    return () => clearInterval(id)
  }, [startedAt, valueRead])

  const measuring = startedAt !== undefined && !valueRead && now - startedAt < MEASURE_MS
  const ready = startedAt !== undefined && !valueRead && !measuring

  const combine = (item: string, target: string) => {
    if (disabled || item === target) return
    let action = `${item}->${target}`
    if (item === 'drop' && target === 'glucometer') action = 'drop->strip'
    // Tras la punción, el algodón sobre el dedo sirve para detener el sangrado.
    if (item === 'cotton' && target === 'finger' && d.punctured === true) action = 'stop-bleeding'
    perform(action)
    setHeld(null)
  }

  let screen: ReactNode
  if (!d.stripInserted) screen = <span className="text-sm">Inserte tira</span>
  else if (!d.dropOnStrip) screen = <span className="blink-soft text-sm">Aplique sangre</span>
  else if (measuring) screen = <span className="blink-soft text-sm">Midiendo…</span>
  else if (ready) screen = <span className="text-sm font-semibold">Listo</span>
  else
    screen = (
      <span className="flex items-baseline gap-1">
        <span className="text-4xl font-bold tabular-nums">{String(d.measured)}</span>
        <span className="text-xs">mg/dL</span>
      </span>
    )

  const heldNote = held ? 'Elemento seleccionado: pulsa su destino o arrástralo.' : 'Arrastra los elementos a su destino o selecciónalos con clic.'

  return (
    <div
      className="relative flex h-full min-h-[30rem] flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-100 to-slate-200 p-4"
      role="group"
      aria-label="Mesa de trabajo del laboratorio virtual"
    >
      <p className="text-center text-xs text-slate-600">{heldNote}</p>

      {/* Lavabo (paso 2 de la ficha) */}
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl bg-white/70 p-2" role="group" aria-label="Lavabo: higiene de manos">
        <span className="text-xs font-semibold text-slate-700">Lavabo</span>
        <button
          type="button"
          disabled={disabled || d.washed === true}
          onClick={() => perform('wash-soap')}
          className="rounded-lg border border-brand-500 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50 disabled:border-slate-200 disabled:text-slate-400 disabled:hover:bg-transparent"
        >
          {d.washed === true ? 'Manos lavadas ✓' : 'Lavar con agua y jabón'}
        </button>
        <button
          type="button"
          disabled={disabled || d.dried === true}
          onClick={() => perform('dry-hands')}
          className="rounded-lg border border-brand-500 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50 disabled:border-slate-200 disabled:text-slate-400 disabled:hover:bg-transparent"
        >
          {d.dried === true ? 'Manos secas ✓' : 'Secar completamente'}
        </button>
      </div>

      <div className="grid flex-1 grid-cols-1 items-center gap-4 sm:grid-cols-3">
        {/* Dedo del sujeto simulado */}
        <div className="flex flex-col items-center">
          <Zone target="finger" label="Dedo del sujeto simulado" held={held} onCombine={combine}>
            <div className="relative mx-auto flex h-52 w-32 flex-col items-center justify-end">
              <svg viewBox="0 0 120 200" className="h-full w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="skin" x1="0" x2="1">
                    <stop offset="0" stopColor="#f2c9a5" />
                    <stop offset="1" stopColor="#e7b48c" />
                  </linearGradient>
                </defs>
                <rect x="30" y="20" width="60" height="190" rx="30" fill="url(#skin)" stroke="#cf9d77" />
                <rect x="42" y="30" width="36" height="34" rx="14" fill="#f8e1cf" opacity=".85" />
                {d.disinfected === true && <ellipse cx="60" cy="92" rx="20" ry="12" fill="#bae6fd" opacity=".6" />}
              </svg>
              {d.punctured === true && !d.dropOnStrip && (
                <div className="absolute top-12">
                  <DropIcon />
                </div>
              )}
            </div>
            <span className="mt-1 block text-xs font-medium text-slate-700">Dedo del sujeto simulado</span>
          </Zone>
          {d.punctured === true && !d.dropOnStrip && (
            <div className="mt-2">
              <Item id="drop" label="Gota de sangre" held={held} onHold={setHeld} onCombine={combine} disabled={disabled}>
                <DropIcon />
              </Item>
            </div>
          )}
        </div>

        {/* Glucómetro */}
        <div className="flex justify-center">
          {has('glucometer') ? (
            <Zone target="glucometer" label="Glucómetro" held={held} onCombine={combine}>
              <div className="mx-auto flex w-44 flex-col items-center rounded-[2rem] border-4 border-slate-700 bg-gradient-to-b from-slate-600 to-slate-800 px-4 pb-6 pt-3 shadow-xl">
                {/* Ranura de la tira */}
                <div className="relative mb-3 flex h-12 w-14 items-end justify-center rounded-b-md bg-slate-900">
                  {d.stripInserted === true && d.stripDisposed !== true && (
                    <div className="absolute -top-5 h-14 w-5 rounded-t-sm border border-slate-300 bg-slate-100">
                      <div className="h-5 rounded-t-sm bg-amber-400" />
                      {d.dropOnStrip === true && (
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                          <svg viewBox="0 0 24 32" className="h-4 w-3" aria-hidden="true">
                            <path d="M12 2C12 2 3 14 3 20a9 9 0 0 0 18 0C21 14 12 2 12 2z" fill="#dc2626" />
                          </svg>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div
                  role="status"
                  aria-label="Pantalla del glucómetro"
                  className="flex h-20 w-full items-center justify-center rounded-lg bg-lime-100 px-2 font-mono text-slate-800 shadow-inner"
                >
                  {screen}
                </div>
                <div className="mt-3 text-[10px] font-semibold tracking-widest text-slate-300">GLUCÓMETRO</div>
              </div>
            </Zone>
          ) : (
            <div className="flex h-48 w-44 items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-400 p-3 text-center text-xs text-slate-500">
              Selecciona el glucómetro en el panel de materiales
            </div>
          )}
        </div>

        {/* Cortopunzantes */}
        <div className="flex justify-center">
          {has('sharps') ? (
            <Zone target="sharps" label="Recipiente para objetos cortopunzantes" held={held} onCombine={combine}>
              <div className="flex flex-col items-center">
                <SharpsIcon />
                <span className="text-xs font-medium text-slate-700">Cortopunzantes</span>
              </div>
            </Zone>
          ) : (
            <div className="flex h-28 w-24 items-center justify-center rounded-xl border-2 border-dashed border-slate-400 p-2 text-center text-xs text-slate-500">
              Recipiente de cortopunzantes
            </div>
          )}
        </div>
      </div>

      {/* Bandeja de materiales */}
      <div className="rounded-xl bg-white/70 p-3">
        <div className="flex flex-wrap items-end justify-center gap-3" aria-label="Materiales en la mesa">
          {has('alcohol') && (
            <Item id="alcohol" label="Alcohol" held={held} onHold={setHeld} onCombine={combine} disabled={disabled}>
              <AlcoholIcon />
            </Item>
          )}
          {has('cotton') && d.cottonDisposed !== true && (
            <Item id="cotton" label={d.cottonWet ? 'Algodón con alcohol' : 'Algodón'} held={held} acceptsDrops onHold={setHeld} onCombine={combine} disabled={disabled}>
              <CottonIcon wet={d.cottonWet === true} />
            </Item>
          )}
          {has('strips') && d.stripInserted !== true && (
            <Item id="strips" label="Tira reactiva" held={held} onHold={setHeld} onCombine={combine} disabled={disabled}>
              <StripIcon />
            </Item>
          )}
          {has('lancet') && d.lancetDisposed !== true && (
            <div className="flex flex-col items-center gap-1">
              <Item id="lancet" label="Lanceta" held={held} onHold={setHeld} onCombine={combine} disabled={disabled}>
                <LancetIcon />
              </Item>
              <button
                type="button"
                disabled={disabled || d.lancetPrepared === true}
                onClick={() => perform('prepare-lancet')}
                className="rounded-lg border border-brand-500 px-2 py-1 text-[11px] font-semibold text-brand-700 hover:bg-brand-50 disabled:border-slate-200 disabled:text-slate-400 disabled:hover:bg-transparent"
              >
                {d.lancetPrepared === true ? 'Lanceta preparada ✓' : 'Preparar lanceta'}
              </button>
            </div>
          )}
          {d.valueRead === true && d.stripDisposed !== true && (
            <Item id="usedstrip" label="Tira usada" held={held} onHold={setHeld} onCombine={combine} disabled={disabled}>
              <StripIcon />
            </Item>
          )}
          {picked.length === 0 && <p className="text-xs text-slate-500">La mesa está vacía: selecciona materiales en el panel izquierdo.</p>}
        </div>
      </div>

      {showRecord && <RecordForm perform={perform} disabled={disabled} />}

      {/* Control del glucómetro */}
      {d.dropOnStrip === true && !valueRead && (
        <div className="flex justify-center">
          <button
            type="button"
            disabled={disabled}
            onClick={() => perform('read-value')}
            className="rounded-lg bg-brand-700 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-brand-800 disabled:opacity-50"
          >
            Leer resultado
          </button>
        </div>
      )}
    </div>
  )
}
