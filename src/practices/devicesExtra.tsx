/**
 * Simulaciones visuales de las prácticas 12 y 13 (dispositivos de laboratorio).
 * Se muestran según el paso actual y usan las acciones del motor. Los elementos gráficos son esquemáticos;
 * los datos numéricos son los de la ficha (37 ºC, 20 min, micropipetas de 10, 100 y 1000 μL).
 * ILUSTRATIVO (no figura en la ficha): número de ranuras del rotor, colores de las pipetas y la duración animada.
 */
import { CheckCircle2, Info } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import type { ExtraProps } from '../core/protocolBench'

const CSS = `
@keyframes dv-spin{to{transform:rotate(360deg)}}
@keyframes dv-fill{from{width:0}to{width:100%}}
@keyframes dv-bubble{0%{transform:translateY(0);opacity:.9}100%{transform:translateY(-14px);opacity:0}}
.dv-spin{animation:dv-spin 0.6s linear infinite;transform-box:fill-box;transform-origin:center}
.dv-fill{animation:dv-fill 6s linear forwards}
.dv-bubble{animation:dv-bubble 1.6s ease-in infinite}
@media (prefers-reduced-motion: reduce){.dv-spin,.dv-fill,.dv-bubble{animation:none}.dv-fill{width:100%}}
`
const STEP_IDS = ['recognize', 'draw-prep', 'draw-puncture', 'draw-collect', 'draw-post', 'centrifuge', 'serum', 'incubate', 'pip-adjust', 'pip-aspirate', 'pip-dispense', 'cleanup']
const TUBES = [
  { id: 'azul', color: '#3b82f6', label: 'Azul' },
  { id: 'rojo', color: '#ef4444', label: 'Rojo' },
  { id: 'amarillo', color: '#eab308', label: 'Amarillo' },
  { id: 'lila', color: '#a855f7', label: 'Lila' },
]

const Panel = ({ title, note, children }: { title: string; note?: string; children: ReactNode }) => (
  <section className="rounded-xl border-2 border-brand-200 bg-white p-4" aria-label={title}>
    <style>{CSS}</style>
    <h3 className="mb-2 text-sm font-bold text-brand-900">{title}</h3>
    {children}
    {note && <p className="mt-2 flex items-start gap-1.5 text-[11px] text-slate-500"><Info size={12} className="mt-0.5 shrink-0" aria-hidden="true" />{note}</p>}
  </section>
)

const Btn = ({ onClick, disabled, children, active }: { onClick: () => void; disabled?: boolean; children: ReactNode; active?: boolean }) => (
  <button type="button" onClick={onClick} disabled={disabled} className={`rounded-lg border-2 px-3 py-1.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60 ${active ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-brand-500 bg-white text-brand-700 hover:bg-brand-50'}`}>
    {children}
  </button>
)

/* ----------------------------- Reconocimiento ----------------------------- */
const Syringe = () => (<svg viewBox="0 0 80 40" className="h-12 w-24" aria-hidden="true"><rect x="14" y="14" width="40" height="12" rx="2" fill="#e0f2fe" stroke="#0284c7" /><rect x="2" y="18" width="12" height="4" fill="#64748b" /><rect x="54" y="19" width="22" height="2" fill="#94a3b8" /><rect x="0" y="12" width="3" height="16" fill="#64748b" /></svg>)
const Centrifuge = () => (<svg viewBox="0 0 80 50" className="h-12 w-24" aria-hidden="true"><rect x="8" y="14" width="64" height="30" rx="6" fill="#cbd5e1" stroke="#64748b" /><ellipse cx="40" cy="14" rx="30" ry="8" fill="#e2e8f0" stroke="#64748b" /><circle cx="40" cy="14" r="3" fill="#475569" /></svg>)
const Bath = () => (<svg viewBox="0 0 80 50" className="h-12 w-24" aria-hidden="true"><rect x="8" y="16" width="64" height="28" rx="4" fill="#bae6fd" stroke="#0369a1" /><rect x="14" y="20" width="52" height="6" fill="#7dd3fc" /><rect x="56" y="4" width="4" height="22" rx="2" fill="#fff" stroke="#ef4444" /></svg>)
const Pip = () => (<svg viewBox="0 0 40 60" className="h-12 w-10" aria-hidden="true"><rect x="14" y="2" width="12" height="8" rx="2" fill="#0f766e" /><rect x="10" y="10" width="20" height="26" rx="5" fill="#99f6e4" stroke="#0f766e" /><rect x="18" y="36" width="4" height="14" fill="#94a3b8" /><path d="M18 50 L20 58 L22 50Z" fill="#e2e8f0" stroke="#64748b" /></svg>)

function Recognize({ done, perform, disabled }: Ctx) {
  const items = [
    { id: 'recognize:syringe', label: 'Jeringa / vacutainer', icon: <Syringe /> },
    { id: 'recognize:centrifuge', label: 'Centrífuga', icon: <Centrifuge /> },
    { id: 'recognize:waterbath', label: 'Baño maría', icon: <Bath /> },
    { id: 'recognize:micropipette', label: 'Micropipetas', icon: <Pip /> },
  ]
  return (
    <Panel title="Reconoce los equipos" note="Esquemas ilustrativos de los equipos de la ficha. Pulsa cada uno para reconocerlo.">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {items.map((i) => {
          const d = done.includes(i.id)
          return (
            <button key={i.id} type="button" disabled={disabled || d} onClick={() => perform(i.id)} aria-label={`Reconocer: ${i.label}`} className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 text-sm font-medium ${d ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white hover:border-brand-500'}`}>
              {i.icon}
              <span className="flex items-center gap-1">{d && <CheckCircle2 size={14} aria-hidden="true" />}{i.label}</span>
            </button>
          )
        })}
      </div>
    </Panel>
  )
}

/* ------------------------------- Extracción ------------------------------- */
function Draw({ done }: Ctx) {
  const prep = done.includes('draw:prepare'), punct = done.includes('draw:puncture'), coll = done.includes('draw:collect'), post = done.includes('draw:post')
  const phases = [['Preparación', prep], ['Punción', punct], ['Recolección', coll], ['Postpunción', post]] as const
  return (
    <Panel title="Extracción de sangre (simulada)" note="La ficha solo nombra las cuatro fases y los colores de tubo (azul, rojo, amarillo, lila): el orden de llenado no figura en la ficha (pendiente de validación).">
      <ol className="mb-3 flex flex-wrap gap-2" aria-label="Fases">
        {phases.map(([n, d], i) => (
          <li key={n} className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${d ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>{d ? <CheckCircle2 size={12} aria-hidden="true" /> : <span>{i + 1}</span>}{n}</li>
        ))}
      </ol>
      <svg viewBox="0 0 420 130" className="h-40 w-full" role="img" aria-label="Brazo con sistema de extracción y tubos de colores">
        <path d="M10 70 Q60 40 200 52 L250 54 Q290 60 290 80 Q290 100 250 104 L200 106 Q60 112 10 90Z" fill="#fdba74" stroke="#c2410c" />
        <path d="M30 78 L230 74" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
        {prep && <circle cx="170" cy="76" r="16" fill="#e2e8f0" opacity=".8" />}
        {punct && <g><line x1="170" y1="30" x2="170" y2="74" stroke="#64748b" strokeWidth="2" /><rect x="164" y="14" width="12" height="18" rx="3" fill="#94a3b8" /></g>}
        {punct && <path d="M176 22 C 230 10 270 14 300 26" fill="none" stroke="#94a3b8" strokeWidth="3" />}
        {TUBES.map((t, i) => (
          <g key={t.id} transform={`translate(${310 + i * 24},10)`}>
            <rect x="0" y="0" width="16" height="70" rx="6" fill="#f8fafc" stroke="#64748b" />
            <rect x="0" y="0" width="16" height="12" rx="3" fill={t.color} />
            {coll && <rect x="2" y="30" width="12" height="38" rx="4" fill="#b91c1c" opacity=".85" />}
            <text x="8" y="90" fontSize="8" textAnchor="middle" fill="#334155">{t.label}</text>
          </g>
        ))}
        {post && <g><rect x="150" y="62" width="40" height="28" rx="4" fill="#fff" stroke="#94a3b8" /><text x="170" y="80" fontSize="9" textAnchor="middle" fill="#475569">gasa</text></g>}
      </svg>
    </Panel>
  )
}

/* -------------------------------- Centrífuga ------------------------------ */
const SLOTS = 6
function CentrifugePanel({ done, perform, disabled }: Ctx) {
  const [slots, setSlots] = useState<boolean[]>([true, true, true, false, false, false])
  const [msg, setMsg] = useState<string | null>(null)
  const balanced = slots.some(Boolean) && slots.every((v, i) => v === slots[(i + SLOTS / 2) % SLOTS])
  const balancedDone = done.includes('balance')
  const spinning = done.includes('centrifuge')
  const pos = (i: number) => {
    const a = (i / SLOTS) * Math.PI * 2 - Math.PI / 2
    return { x: 100 + 58 * Math.cos(a), y: 100 + 58 * Math.sin(a) }
  }
  const toggle = (i: number) => !balancedDone && setSlots((s) => s.map((v, j) => (j === i ? !v : v)))
  return (
    <Panel title="Centrífuga: balancea los tubos" note="Colócalos en ranuras enfrentadas (regla general de balanceo). El número de ranuras es ilustrativo; la ficha solo indica balancear antes de centrifugar.">
      <div className="flex flex-wrap items-center gap-4">
        <svg viewBox="0 0 200 200" className="h-48 w-48" role="group" aria-label="Rotor de la centrífuga con seis ranuras">
          <circle cx="100" cy="100" r="92" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
          <g className={spinning ? 'dv-spin' : ''}>
            <circle cx="100" cy="100" r="82" fill="#f1f5f9" stroke="#94a3b8" />
            {slots.map((on, i) => {
              const { x, y } = pos(i)
              return (
                <g key={i} role="button" tabIndex={0} aria-pressed={on} aria-label={`Ranura ${i + 1}: ${on ? 'con tubo' : 'vacía'}`} onClick={() => toggle(i)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggle(i))} style={{ cursor: balancedDone ? 'default' : 'pointer' }}>
                  <circle cx={x} cy={y} r="14" fill={on ? TUBES[i % 4].color : '#fff'} stroke="#475569" strokeDasharray={on ? '0' : '3 2'} />
                  <text x={x} y={y + 4} fontSize="11" textAnchor="middle" fill={on ? '#fff' : '#94a3b8'}>{i + 1}</text>
                </g>
              )
            })}
          </g>
          <circle cx="100" cy="100" r="8" fill="#475569" />
        </svg>
        <div className="min-w-48 flex-1 space-y-2">
          <p className={`rounded-lg px-3 py-2 text-sm font-medium ${balanced ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900'}`} aria-live="polite">
            {balanced ? 'Rotor balanceado: tubos enfrentados.' : 'Rotor desbalanceado: coloca un tubo en la ranura opuesta a cada tubo.'}
          </p>
          <div className="flex flex-wrap gap-2">
            <Btn disabled={disabled || balancedDone} active={balancedDone} onClick={() => (balanced ? (setMsg(null), perform('balance')) : setMsg('No puedes continuar: el rotor no está balanceado.'))}>{balancedDone ? '✓ Balanceado' : 'Confirmar balanceo'}</Btn>
            <Btn disabled={disabled || spinning} active={spinning} onClick={() => perform('centrifuge')}>{spinning ? '✓ Centrifugado' : 'Centrifugar'}</Btn>
          </div>
          {msg && <p role="alert" className="text-xs font-semibold text-red-700">{msg}</p>}
        </div>
      </div>
    </Panel>
  )
}

/* ----------------------------------- Suero -------------------------------- */
function SerumPanel({ done, perform, disabled }: Ctx) {
  const col = done.includes('serum:collect'), mix = done.includes('serum:mix')
  return (
    <Panel title="Suero y azul de metileno" note="Esquema ilustrativo del tubo con sangre centrifugada (suero arriba) y del tubo Eppendorf.">
      <div className="flex flex-wrap items-center gap-6">
        <svg viewBox="0 0 220 120" className="h-32 w-56" role="img" aria-label="Tubo centrifugado y tubo Eppendorf">
          <rect x="30" y="10" width="26" height="100" rx="10" fill="#f8fafc" stroke="#64748b" />
          <rect x="32" y="12" width="22" height={col ? 20 : 44} rx="6" fill="#fde68a" />
          <rect x="32" y={col ? 32 : 56} width="22" height={col ? 76 : 52} rx="6" fill="#b91c1c" opacity=".85" />
          <text x="43" y="118" fontSize="8" textAnchor="middle" fill="#334155">tubo</text>
          <path d="M140 30 h40 l-6 70 q-14 10 -28 0z" fill="#f8fafc" stroke="#64748b" />
          {col && <path d="M146 60 h28 l-4 38 q-10 6 -20 0z" fill={mix ? '#2563eb' : '#fde68a'} opacity=".9" />}
          {mix && <circle className="dv-bubble" cx="160" cy="70" r="3" fill="#bfdbfe" />}
          <text x="160" y="118" fontSize="8" textAnchor="middle" fill="#334155">Eppendorf</text>
        </svg>
        <div className="flex flex-wrap gap-2">
          <Btn disabled={disabled || col} active={col} onClick={() => perform('serum:collect')}>{col ? '✓ Suero recolectado' : 'Recolectar el suero'}</Btn>
          <Btn disabled={disabled || mix} active={mix} onClick={() => perform('serum:mix')}>{mix ? '✓ Mezclado con azul de metileno' : 'Mezclar con azul de metileno'}</Btn>
        </div>
      </div>
    </Panel>
  )
}

/* --------------------------------- Baño maría ------------------------------ */
function BathPanel({ done, perform, disabled }: Ctx) {
  const t37 = done.includes('temp:37'), time = done.includes('time:20'), inc = done.includes('incubate')
  const temp = t37 ? 37 : 22
  return (
    <Panel title="Baño maría" note="Temperatura y tiempo de la ficha: 37 ºC por 20 minutos. La temperatura inicial (22 ºC) y la duración animada son ilustrativas.">
      <div className="flex flex-wrap items-center gap-5">
        <svg viewBox="0 0 220 130" className="h-36 w-56" role="img" aria-label={`Baño maría a ${temp} grados`}>
          <rect x="10" y="40" width="160" height="80" rx="8" fill="#e2e8f0" stroke="#64748b" />
          <rect x="16" y="56" width="148" height="58" rx="4" fill={t37 ? '#7dd3fc' : '#bae6fd'} />
          {inc && [50, 90, 130].map((x) => <circle key={x} className="dv-bubble" cx={x} cy="100" r="3" fill="#fff" />)}
          <rect x="60" y="44" width="16" height="50" rx="4" fill="#f8fafc" stroke="#64748b" /><rect x="62" y="70" width="12" height="22" fill="#fde68a" />
          <rect x="190" y="14" width="10" height="90" rx="5" fill="#fff" stroke="#64748b" />
          <rect x="193" y={104 - Math.min(80, (temp - 15) * 2.2)} width="4" height={Math.min(80, (temp - 15) * 2.2)} rx="2" fill="#ef4444" />
          <circle cx="195" cy="108" r="8" fill="#ef4444" />
          <text x="210" y="60" fontSize="12" fontWeight="700" fill="#b91c1c" textAnchor="end" transform="translate(-6,0)">{temp} ºC</text>
        </svg>
        <div className="space-y-2">
          <div role="group" aria-label="Temperatura" className="flex flex-wrap items-center gap-2"><span className="w-20 text-xs font-semibold text-slate-600">Temperatura</span>{[25, 37, 60].map((v) => <Btn key={v} disabled={disabled || t37} active={t37 && v === 37} onClick={() => perform(`temp:${v}`)}>{v} ºC</Btn>)}</div>
          <div role="group" aria-label="Tiempo" className="flex flex-wrap items-center gap-2"><span className="w-20 text-xs font-semibold text-slate-600">Tiempo</span>{[5, 20, 60].map((v) => <Btn key={v} disabled={disabled || time} active={time && v === 20} onClick={() => perform(`time:${v}`)}>{v} min</Btn>)}</div>
          <div className="flex items-center gap-2"><Btn disabled={disabled || inc} active={inc} onClick={() => perform('incubate')}>{inc ? '✓ Incubación iniciada' : 'Iniciar la incubación'}</Btn><span className="text-sm font-bold tabular-nums text-slate-700">{time ? '20:00' : '--:--'}</span></div>
          {inc && <div className="h-2 w-56 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-label="Incubación"><div className="dv-fill h-full bg-brand-600" /></div>}
        </div>
      </div>
    </Panel>
  )
}

/* ------------------------------- Micropipeta ------------------------------- */
function PipPanel({ done, perform, disabled }: Ctx) {
  const [size, setSize] = useState(100)
  const adj = done.includes('pip:adjust'), asp = done.includes('pip:aspirate'), dis = done.includes('pip:dispense')
  const level = dis ? 0 : asp ? 1 : 0
  return (
    <Panel title="Micropipeta" note="Micropipetas de la ficha: 10, 100 y 1000 μL. La ficha no indica el volumen a pipetear: el dial es solo demostrativo.">
      <div className="flex flex-wrap items-center gap-5">
        <svg viewBox="0 0 120 190" className="h-44 w-28" role="img" aria-label={`Micropipeta de ${size} microlitros`}>
          <rect x="44" y={asp && !dis ? 14 : 4} width="32" height="12" rx="3" fill="#0f766e" />
          <rect x="36" y="26" width="48" height="84" rx="12" fill="#99f6e4" stroke="#0f766e" strokeWidth="2" />
          <rect x="46" y="40" width="28" height="22" rx="3" fill="#0f172a" /><text x="60" y="56" fontSize="11" fontFamily="monospace" textAnchor="middle" fill="#4ade80">{adj ? size : '---'}</text>
          <rect x="52" y="110" width="16" height="36" fill="#94a3b8" />
          <path d="M54 146 L58 184 L62 184 L66 146Z" fill="#f1f5f9" stroke="#64748b" />
          {level > 0 && <path d="M58 168 L58.5 184 L61.5 184 L62 168Z" fill="#60a5fa" />}
        </svg>
        <div className="space-y-2">
          <div role="group" aria-label="Micropipeta" className="flex flex-wrap items-center gap-2"><span className="text-xs font-semibold text-slate-600">Micropipeta</span>{[10, 100, 1000].map((v) => <Btn key={v} disabled={adj} active={size === v} onClick={() => setSize(v)}>{v} μL</Btn>)}</div>
          <div className="flex flex-wrap gap-2">
            <Btn disabled={disabled || adj} active={adj} onClick={() => perform('pip:adjust')}>{adj ? '✓ Volumen ajustado' : '1. Ajustar el volumen'}</Btn>
            <Btn disabled={disabled || asp} active={asp} onClick={() => perform('pip:aspirate')}>{asp ? '✓ Aspirado' : '2. Aspirar'}</Btn>
            <Btn disabled={disabled || dis} active={dis} onClick={() => perform('pip:dispense')}>{dis ? '✓ Dispensado' : '3. Dispensar'}</Btn>
          </div>
        </div>
      </div>
    </Panel>
  )
}

interface Ctx { done: string[]; perform: ExtraProps['perform']; disabled: boolean }

export default function DevicesExtra(p: ExtraProps) {
  if (p.state.status !== 'running') return null
  const id = STEP_IDS[Math.min(p.state.stepIndex, STEP_IDS.length - 1)]
  const c: Ctx = { done: (p.state.data.doneActions as string[]) ?? [], perform: p.perform, disabled: p.disabled }
  if (id === 'recognize') return <Recognize {...c} />
  if (id.startsWith('draw')) return <Draw {...c} />
  if (id === 'centrifuge') return <CentrifugePanel {...c} />
  if (id === 'serum') return <SerumPanel {...c} />
  if (id === 'incubate') return <BathPanel {...c} />
  if (id.startsWith('pip')) return <PipPanel {...c} />
  return null
}
