/**
 * Simulaciones de la práctica 1 (inducción): vestidor, lavado de manos, plano de recorrido y carteles de normas.
 * Los textos de normas provienen de la ficha; el plano y la animación de lavado son ILUSTRATIVOS.
 */
import { Hand, HardHat, Map as MapIcon, ShieldCheck, Shirt, Utensils } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ExtraProps } from '../../core/protocolBench'

const STEP_IDS = ['epp', 'welcome', 'tour', 'norms', 'format', 'qa', 'exit']

const Panel = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <section className="rounded-xl border-2 border-brand-200 bg-white p-4" aria-label={title}>
    <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-900">{icon} {title}</h3>
    {children}
  </section>
)

const useDone = (p: ExtraProps) => (p.state.data.doneActions as string[]) ?? []

/* ---------------- Lavado de manos (animación) ---------------- */
function Handwash({ p, action, title }: { p: ExtraProps; action: string; title: string }) {
  const done = useDone(p).includes(action)
  const [t, setT] = useState(0) // 0..100
  const [running, setRunning] = useState(false)
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setT((v) => Math.min(100, v + 4)), 80)
    return () => clearInterval(id)
  }, [running])
  useEffect(() => {
    if (running && t >= 100) {
      setRunning(false)
      p.perform(action)
    }
  }, [t, running, p, action])
  const phase = t < 34 ? 'Mojar y aplicar jabón' : t < 67 ? 'Frotar manos y dedos' : 'Enjuagar y secar con toalla de papel'
  return (
    <Panel icon={<Hand size={16} aria-hidden="true" />} title={title}>
      <div className="flex flex-wrap items-center gap-4">
        <svg viewBox="0 0 120 80" className="h-24 w-36" role="img" aria-label="Manos con espuma">
          <rect x="10" y="50" width="100" height="22" rx="6" fill="#bae6fd" />
          <g fill="#fcd9b6" stroke="#d6a77a"><ellipse cx="45" cy="38" rx="20" ry="14" /><ellipse cx="75" cy="38" rx="20" ry="14" /></g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={30 + i * 12} cy={30 + (i % 2) * 10} r={3 + (i % 3)} fill="#fff" stroke="#7dd3fc" style={{ opacity: done ? 0 : t > 20 && t < 90 ? 0.9 : 0, transition: 'opacity .4s' }} />
          ))}
        </svg>
        <div className="min-w-[12rem] flex-1">
          <div className="h-3 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuenow={done ? 100 : t} aria-valuemin={0} aria-valuemax={100} aria-label="Progreso del lavado">
            <div className="h-full rounded-full bg-sky-500" style={{ width: `${done ? 100 : t}%`, transition: 'width .1s' }} />
          </div>
          <p className="mt-1 text-xs text-slate-600" aria-live="polite">{done ? 'Lavado de manos realizado.' : running ? phase : 'Pulsa para iniciar el lavado.'}</p>
          <p className="text-[11px] text-slate-500">La animación y su duración son ilustrativas: la ficha solo exige el lavado de manos.</p>
        </div>
        <button type="button" disabled={p.disabled || done || running} onClick={() => { setT(0); setRunning(true) }} className="rounded-lg bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-40">
          {done ? 'Realizado' : 'Lavarse las manos'}
        </button>
      </div>
    </Panel>
  )
}

/* ---------------- Vestidor ---------------- */
const EPP_ITEMS = [
  { id: 'mandil', label: 'Mandil largo blanco' },
  { id: 'gorro', label: 'Gorro' },
  { id: 'mascarilla', label: 'Mascarilla quirúrgica' },
  { id: 'guantes', label: 'Guantes de látex' },
]
const ZONES: Record<string, { x: number; y: number; w: number; h: number; zone: string }> = {
  gorro: { x: 38, y: 2, w: 24, h: 12, zone: 'Cabeza' },
  mascarilla: { x: 38, y: 16, w: 24, h: 10, zone: 'Rostro' },
  mandil: { x: 26, y: 30, w: 48, h: 40, zone: 'Tronco' },
  guantes: { x: 4, y: 52, w: 20, h: 18, zone: 'Manos' },
}

function Dressing(p: ExtraProps) {
  const done = useDone(p)
  const [held, setHeld] = useState<string | null>(null)
  const [msg, setMsg] = useState('Arrastra cada prenda a la zona del cuerpo (o selecciónala y pulsa la zona).')
  const worn = (id: string) => done.includes(`epp:${id}`)
  const drop = (zoneItem: string, item: string) => {
    if (zoneItem === item) { p.perform(`epp:${item}`); setMsg(`Correcto: ${EPP_ITEMS.find((e) => e.id === item)?.label} colocado.`) }
    else setMsg('Esa prenda no va en esa zona del cuerpo.')
    setHeld(null)
  }
  return (
    <Panel icon={<Shirt size={16} aria-hidden="true" />} title="Vestidor: equipo de protección personal (EPP)">
      <div className="grid items-start gap-4 sm:grid-cols-[minmax(0,260px)_1fr]">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] rounded-xl bg-slate-100">
          <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full" role="img" aria-label="Maniquí para colocar el EPP">
            <circle cx="50" cy="16" r="9" fill="#fcd9b6" />
            <rect x="30" y="28" width="40" height="52" rx="8" fill="#cbd5e1" />
            <rect x="12" y="32" width="12" height="46" rx="6" fill="#fcd9b6" /><rect x="76" y="32" width="12" height="46" rx="6" fill="#fcd9b6" />
            <rect x="34" y="80" width="14" height="40" rx="5" fill="#94a3b8" /><rect x="52" y="80" width="14" height="40" rx="5" fill="#94a3b8" />
            {worn('mandil') && <path d="M28 28 H72 L76 100 H24 Z" fill="#fff" stroke="#94a3b8" />}
            {worn('gorro') && <path d="M40 14 Q50 0 60 14 Z" fill="#5eead4" stroke="#0f766e" />}
            {worn('mascarilla') && <rect x="43" y="17" width="14" height="7" rx="2" fill="#7dd3fc" stroke="#0369a1" />}
            {worn('guantes') && (<g fill="#fde68a" stroke="#a16207"><rect x="11" y="74" width="14" height="10" rx="4" /><rect x="75" y="74" width="14" height="10" rx="4" /></g>)}
          </svg>
          {EPP_ITEMS.map((e) => {
            const z = ZONES[e.id]
            return (
              <button key={e.id} type="button" disabled={p.disabled} aria-label={held ? `Soltar «${EPP_ITEMS.find((i) => i.id === held)?.label}» en: ${z.zone}` : `Zona ${z.zone}`}
                onDragOver={(ev) => ev.preventDefault()} onDrop={(ev) => { ev.preventDefault(); const id = ev.dataTransfer.getData('text/plain'); if (id) drop(e.id, id) }}
                onClick={() => held && drop(e.id, held)}
                style={{ left: `${z.x}%`, top: `${(z.y / 125) * 100}%`, width: `${z.w}%`, height: `${(z.h / 125) * 100}%` }}
                className={`absolute rounded-md border-2 border-dashed text-[10px] font-semibold ${held ? 'border-amber-500 bg-amber-200/30 text-amber-900' : 'border-slate-400/60 text-slate-500'}`}>
                {z.zone}
              </button>
            )
          })}
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {EPP_ITEMS.map((e) => (
              <button key={e.id} type="button" draggable={!p.disabled && !worn(e.id)} disabled={p.disabled || worn(e.id)} aria-pressed={held === e.id}
                onDragStart={(ev) => { ev.dataTransfer.setData('text/plain', e.id); setHeld(e.id) }} onDragEnd={() => setHeld(null)} onClick={() => setHeld(held === e.id ? null : e.id)}
                className={`flex cursor-grab items-center gap-1.5 rounded-lg border-2 px-3 py-2 text-sm font-medium ${worn(e.id) ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : held === e.id ? 'border-amber-500 ring-2 ring-amber-300' : 'border-slate-200 bg-white hover:border-brand-500'}`}>
                <HardHat size={16} aria-hidden="true" /> {e.label}{worn(e.id) && ' ✓'}
              </button>
            ))}
          </div>
          <p className="mt-3 rounded-lg bg-slate-50 p-2 text-xs text-slate-700" aria-live="polite">{msg}</p>
          <p className="mt-2 text-[11px] text-slate-500">Dibujo esquemático. La ficha indica el uso obligatorio de EPP.</p>
        </div>
      </div>
    </Panel>
  )
}

/* ---------------- Plano del recorrido ---------------- */
function Tour(p: ExtraProps) {
  const done = useDone(p)
  const [info, setInfo] = useState('Pulsa cada espacio del plano para recorrerlo.')
  const spaces = [
    { id: 'lab', x: 10, y: 20, w: 150, h: 110, label: 'Laboratorio de farmacología', c: '#dbeafe', info: 'Laboratorio: aquí se trabajan las prácticas con material e insumos de la guía.' },
    { id: 'sim', x: 190, y: 20, w: 150, h: 110, label: 'Sala de simulación clínica', c: '#dcfce7', info: 'Sala de simulación: aquí se usan simuladores bajo supervisión docente.' },
  ]
  return (
    <Panel icon={<MapIcon size={16} aria-hidden="true" />} title="Recorrido guiado: plano del laboratorio y la sala de simulación">
      <svg viewBox="0 0 350 150" className="w-full max-w-xl" role="group" aria-label="Plano esquemático">
        <rect x="2" y="2" width="346" height="146" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
        <rect x="160" y="60" width="30" height="20" fill="#e2e8f0" /><text x="175" y="74" fontSize="8" textAnchor="middle" fill="#64748b">Acceso</text>
        {spaces.map((s) => {
          const v = done.includes(`tour:${s.id}`)
          return (
            <g key={s.id} role="button" tabIndex={p.disabled ? -1 : 0} aria-label={`Recorrer: ${s.label}${v ? ' (realizado)' : ''}`}
              onClick={() => { if (!p.disabled) { setInfo(s.info); p.perform(`tour:${s.id}`) } }}
              onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !p.disabled) { e.preventDefault(); setInfo(s.info); p.perform(`tour:${s.id}`) } }}
              style={{ cursor: 'pointer' }}>
              <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="8" fill={v ? '#bbf7d0' : s.c} stroke={v ? '#16a34a' : '#64748b'} strokeWidth="2" />
              <text x={s.x + s.w / 2} y={s.y + s.h / 2} fontSize="10" fontWeight="700" textAnchor="middle" fill="#0f172a">{s.label}</text>
              <text x={s.x + s.w / 2} y={s.y + s.h / 2 + 14} fontSize="9" textAnchor="middle" fill="#475569">{v ? '✓ recorrido' : 'Pulsa para entrar'}</text>
            </g>
          )
        })}
      </svg>
      <p className="mt-1 text-xs text-slate-700" aria-live="polite">{info}</p>
      <p className="text-[11px] text-slate-500">El plano es ilustrativo: la ficha no describe la distribución física de los espacios.</p>
    </Panel>
  )
}

/* ---------------- Carteles de normas ---------------- */
const POSTERS = [
  { id: 'epp', icon: <ShieldCheck size={28} aria-hidden="true" />, title: 'EPP', text: 'Uso obligatorio de equipo de protección personal.', c: 'border-sky-300 bg-sky-50 text-sky-900' },
  { id: 'food', icon: <Utensils size={28} aria-hidden="true" />, title: 'Alimentos', text: 'Prohibido ingerir alimentos.', c: 'border-red-300 bg-red-50 text-red-900' },
  { id: 'hands', icon: <Hand size={28} aria-hidden="true" />, title: 'Higiene', text: 'Lavado de manos al ingreso y salida.', c: 'border-emerald-300 bg-emerald-50 text-emerald-900' },
]
function Norms(p: ExtraProps) {
  const done = useDone(p)
  return (
    <Panel icon={<ShieldCheck size={16} aria-hidden="true" />} title="Señalética de bioseguridad: pulsa cada cartel para revisarlo">
      <div className="grid gap-3 sm:grid-cols-3">
        {POSTERS.map((n) => {
          const v = done.includes(`norm:${n.id}`)
          return (
            <button key={n.id} type="button" disabled={p.disabled || v} onClick={() => p.perform(`norm:${n.id}`)} aria-label={`Revisar cartel: ${n.title}${v ? ' (revisado)' : ''}`}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 p-4 text-center ${n.c} ${v ? 'opacity-70' : 'hover:shadow-md'}`}>
              {n.icon}
              <strong>{n.title}</strong>
              <span className="text-xs">{n.text}</span>
              <span className="text-[11px] font-semibold">{v ? '✓ Revisado' : 'Pulsa para revisar'}</span>
            </button>
          )
        })}
      </div>
    </Panel>
  )
}

export default function Extra1(p: ExtraProps) {
  if (p.state.status !== 'running') return null
  const id = STEP_IDS[Math.min(p.state.stepIndex, STEP_IDS.length - 1)]
  switch (id) {
    case 'epp': return (<div className="space-y-3"><Handwash p={p} action="handwash-in" title="Lavado de manos al ingreso" /><Dressing {...p} /></div>)
    case 'tour': return <Tour {...p} />
    case 'norms': return <Norms {...p} />
    case 'exit': return <Handwash p={p} action="handwash-out" title="Lavado de manos a la salida" />
    default: return null
  }
}
