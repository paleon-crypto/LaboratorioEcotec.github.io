/**
 * Actividades interactivas de la práctica 15 (Enfermería): se muestran según el paso actual.
 * Los datos marcados como «ilustrativos» NO provienen de la ficha.
 */
import { AlertTriangle, CheckCircle2, ClipboardCheck, Droplets, MessageCircle, MousePointerClick, ShieldAlert, Syringe } from 'lucide-react'
import { useState } from 'react'
import type { ExtraProps } from '../../core/protocolBench'

const STEP_IDS = ['ppe', 'prep', 'material', 'site', 'cannulate', 'perm', 'drug', 'rate', 'monitor', 'close']

const Panel = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <section className="rounded-xl border-2 border-brand-200 bg-white p-4" aria-label={title}>
    <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-900">{icon} {title}</h3>
    {children}
  </section>
)

/* ------------------------------------------------------------------ */
/* 10 correctos                                                        */
/* ------------------------------------------------------------------ */
const RIGHTS = [
  ['Paciente correcto', 'Comparar la orden con la identificación del paciente.'],
  ['Medicamento correcto', 'Comparar el nombre del fármaco de la orden con el envase.'],
  ['Dosis correcta', 'Verificar la dosis indicada y el cálculo.'],
  ['Vía correcta', 'Confirmar que la vía indicada es la intravenosa.'],
  ['Hora correcta', 'Confirmar el horario de administración.'],
  ['Registro correcto', 'Documentar lo realizado en la hoja de enfermería.'],
  ['Educación al paciente', 'Informar el procedimiento y el fármaco al paciente.'],
  ['Derecho a rechazar', 'Respetar la decisión del paciente (consentimiento).'],
  ['Historia y alergias', 'Revisar los antecedentes y alergias registrados.'],
  ['Respuesta esperada', 'Vigilar la respuesta del paciente tras la administración.'],
]

function TenRights({ perform, disabled }: ExtraProps) {
  const [checked, setChecked] = useState<boolean[]>(RIGHTS.map(() => false))
  const all = checked.every(Boolean)
  return (
    <Panel icon={<ClipboardCheck size={16} aria-hidden="true" />} title="Verificación de los «10 correctos»">
      <div className="mb-3 grid gap-2 rounded-lg bg-slate-50 p-3 text-xs sm:grid-cols-2">
        <p><strong>Orden médica (simulada):</strong> solución salina 0.9% por vía intravenosa.</p>
        <p><strong>Envase:</strong> solución salina 0.9% (fármaco simulado, vial íntegro y transparente).</p>
      </div>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {RIGHTS.map(([t, d], i) => (
          <li key={t}>
            <button
              type="button"
              disabled={disabled}
              aria-pressed={checked[i]}
              onClick={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
              className={`flex w-full items-start gap-2 rounded-lg border-2 p-2 text-left text-xs ${checked[i] ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-white hover:border-brand-500'}`}
            >
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${checked[i] ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>{checked[i] ? '✓' : i + 1}</span>
              <span><strong className="block text-slate-800">{t}</strong><span className="text-slate-600">{d}</span></span>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button type="button" disabled={disabled || !all} onClick={() => perform('ten-rights')} className="rounded-lg bg-brand-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-40">Confirmar verificación completa</button>
        <span className="text-xs text-slate-500">{checked.filter(Boolean).length}/10 verificados</span>
      </div>
      <p className="mt-2 text-[11px] text-slate-500">La ficha menciona los «10 correctos» sin enumerarlos: esta lista es la habitual y está pendiente de validar con la docente.</p>
    </Panel>
  )
}

/* ------------------------------------------------------------------ */
/* Comunicación y consentimiento verbal                                */
/* ------------------------------------------------------------------ */
const DIALOGUE = [
  {
    q: '¿Cómo inicias la interacción con el paciente?',
    opts: [
      { t: 'Me presento, verifico su identidad y le pregunto cómo se siente.', ok: true, f: 'Correcto: te presentas y verificas la identidad antes de actuar.' },
      { t: 'Empiezo a preparar el material sin decir nada.', ok: false, f: 'Sin comunicación el paciente no está informado ni tranquilo.' },
      { t: 'Le indico que se quede quieto y no pregunte.', ok: false, f: 'Se debe disminuir la ansiedad, no aumentarla.' },
    ],
  },
  {
    q: '¿Cómo explicas el procedimiento?',
    opts: [
      { t: 'Con palabras sencillas: qué voy a hacer, para qué sirve y qué sentirá.', ok: true, f: 'Correcto: la explicación clara disminuye la ansiedad.' },
      { t: 'Con términos técnicos, rápido y sin detalles.', ok: false, f: 'El paciente debe comprender lo que se le hará.' },
      { t: 'No lo explico para no preocuparle.', ok: false, f: 'Es obligatorio explicar el procedimiento.' },
    ],
  },
  {
    q: '¿Cómo aseguras el consentimiento informado verbal?',
    opts: [
      { t: 'Resuelvo sus dudas y le pido su aceptación verbal antes de comenzar.', ok: true, f: 'Correcto: se asegura el consentimiento informado verbal.' },
      { t: 'Asumo que acepta porque está en el hospital.', ok: false, f: 'El consentimiento debe obtenerse; no se asume.' },
      { t: 'Le pido que firme sin leer.', ok: false, f: 'El consentimiento debe ser informado.' },
    ],
  },
]

function Consent({ perform, disabled }: ExtraProps) {
  const [i, setI] = useState(0)
  const [fb, setFb] = useState<{ ok: boolean; t: string } | null>(null)
  const d = DIALOGUE[Math.min(i, DIALOGUE.length - 1)]
  return (
    <Panel icon={<MessageCircle size={16} aria-hidden="true" />} title="Comunicación y consentimiento verbal">
      <p className="text-xs text-slate-500">Pregunta {Math.min(i + 1, DIALOGUE.length)} de {DIALOGUE.length}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{d.q}</p>
      <ul className="mt-2 space-y-1.5">
        {d.opts.map((o) => (
          <li key={o.t}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                setFb({ ok: o.ok, t: o.f })
                if (!o.ok) { perform('bad-comm'); return }
                if (i + 1 >= DIALOGUE.length) perform('explain')
                else setI(i + 1)
              }}
              className="w-full rounded-lg border-2 border-slate-200 bg-white p-2 text-left text-sm hover:border-brand-500"
            >{o.t}</button>
          </li>
        ))}
      </ul>
      {fb && <p role="status" className={`mt-2 rounded-lg p-2 text-xs ${fb.ok ? 'bg-emerald-50 text-emerald-900' : 'bg-red-50 text-red-900'}`}>{fb.t}</p>}
    </Panel>
  )
}

/* ------------------------------------------------------------------ */
/* Selección anatómica del sitio                                       */
/* ------------------------------------------------------------------ */
const SITES: { id: string; label: string; ok: boolean; info: string; d: string; lx: number; ly: number }[] = [
  { id: 'dorsal', label: 'Red venosa dorsal (mano)', ok: true, info: 'Red venosa dorsal: es la zona más distal. La ficha indica elegir el acceso de distal a proximal.', d: 'M300 118 C330 112 350 122 372 128', lx: 336, ly: 104 },
  { id: 'cefalica', label: 'Vena cefálica (antebrazo)', ok: true, info: 'Vena del antebrazo: la ficha prioriza las venas del antebrazo para facilitar la movilidad del paciente.', d: 'M60 100 C130 98 200 104 290 114', lx: 150, ly: 90 },
  { id: 'mediana', label: 'Vena mediana del antebrazo', ok: true, info: 'Vena del antebrazo: sitio adecuado según la ficha (antebrazo antes que la flexura del codo).', d: 'M60 130 C130 128 200 130 290 128', lx: 150, ly: 122 },
  { id: 'basilica', label: 'Vena basílica (antebrazo)', ok: true, info: 'Vena del antebrazo: sitio adecuado según la ficha.', d: 'M60 160 C130 162 200 156 290 142', lx: 150, ly: 178 },
  { id: 'flexura', label: 'Flexura del codo', ok: false, info: 'La ficha indica priorizar las venas del antebrazo sobre las de la flexura del codo para facilitar la movilidad.', d: 'M36 100 C46 122 46 138 36 160', lx: 20, ly: 132 },
]

function SiteSelector({ perform, disabled }: ExtraProps) {
  const [sel, setSel] = useState<string | null>(null)
  const cur = SITES.find((s) => s.id === sel)
  return (
    <Panel icon={<MousePointerClick size={16} aria-hidden="true" />} title="Selecciona el acceso venoso en el antebrazo">
      <svg viewBox="0 0 400 220" className="h-auto w-full max-w-xl" role="group" aria-label="Ilustración del miembro superior con las venas">
        <path d="M24 90 C24 76 60 72 120 74 L300 86 C350 90 372 104 372 124 C372 150 350 164 300 168 L120 178 C60 180 24 172 24 156 Z" fill="#f1c9a5" stroke="#c99a74" strokeWidth="2" />
        <ellipse cx="376" cy="130" rx="22" ry="34" fill="#f1c9a5" stroke="#c99a74" strokeWidth="2" />
        <text x="200" y="208" fontSize="10" textAnchor="middle" fill="#64748b">Esquema ilustrativo (no a escala): codo a la izquierda, mano a la derecha</text>
        {SITES.map((s) => (
          <g key={s.id}>
            <path d={s.d} fill="none" stroke={sel === s.id ? (s.ok ? '#16a34a' : '#dc2626') : '#4f6fc7'} strokeWidth={sel === s.id ? 8 : 5} strokeLinecap="round" opacity=".85" />
            <path d={s.d} fill="none" stroke="transparent" strokeWidth="22" />
          </g>
        ))}
      </svg>
      <div className="mt-2 flex flex-wrap gap-2">
        {SITES.map((s) => (
          <button key={s.id} type="button" disabled={disabled} aria-pressed={sel === s.id} onClick={() => setSel(s.id)} className={`rounded-lg border-2 px-2.5 py-1.5 text-xs font-medium ${sel === s.id ? 'border-brand-600 bg-brand-50' : 'border-slate-200 bg-white hover:border-brand-500'}`}>{s.label}</button>
        ))}
      </div>
      {cur && (
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <p role="status" className={`flex-1 rounded-lg p-2 text-xs ${cur.ok ? 'bg-emerald-50 text-emerald-900' : 'bg-red-50 text-red-900'}`}>{cur.info}</p>
          <button type="button" disabled={disabled} onClick={() => perform(cur.ok ? 'select-site' : 'elbow')} className="rounded-lg bg-brand-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-40">Elegir este acceso</button>
        </div>
      )}
    </Panel>
  )
}

/* ------------------------------------------------------------------ */
/* Ángulo de punción                                                   */
/* ------------------------------------------------------------------ */
const ANGLES = [5, 20, 45, 90]
function AngleSelector({ perform, disabled }: ExtraProps) {
  return (
    <Panel icon={<Syringe size={16} aria-hidden="true" />} title="Ángulo de punción (bisel hacia arriba)">
      <p className="mb-2 text-xs text-slate-600">Elige el ángulo con el que introducirás el catéter sobre la piel.</p>
      <div className="flex flex-wrap gap-3">
        {ANGLES.map((a) => (
          <button key={a} type="button" disabled={disabled} onClick={() => perform('angle', a)} className="rounded-xl border-2 border-slate-200 bg-white p-2 text-center hover:border-brand-500" aria-label={`Ángulo de ${a} grados`}>
            <svg viewBox="0 0 80 50" className="h-14 w-24" aria-hidden="true">
              <line x1="4" y1="44" x2="76" y2="44" stroke="#c99a74" strokeWidth="4" />
              <line x1="14" y1="44" x2={14 + 56 * Math.cos((a * Math.PI) / 180)} y2={44 - 56 * Math.sin((a * Math.PI) / 180)} stroke="#475569" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="text-xs font-semibold text-slate-700">{a}°</span>
          </button>
        ))}
      </div>
    </Panel>
  )
}

/* ------------------------------------------------------------------ */
/* Calculadora de infusión                                             */
/* ------------------------------------------------------------------ */
function InfusionCalculator() {
  const [v, setV] = useState(500)
  const [h, setH] = useState(4)
  const [f, setF] = useState(20)
  const mlh = h > 0 ? v / h : 0
  const gtt = h > 0 ? (v * f) / (h * 60) : 0
  const num = (set: (n: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => set(Math.max(0, Number(e.target.value) || 0))
  return (
    <Panel icon={<Droplets size={16} aria-hidden="true" />} title="Calculadora de velocidad de infusión">
      <div className="grid gap-2 sm:grid-cols-3">
        {[['Volumen (mL)', v, setV], ['Tiempo (h)', h, setH], ['Factor (gotas/mL)', f, setF]].map(([l, val, set]) => (
          <label key={l as string} className="text-xs font-medium text-slate-700">{l as string}
            <input type="number" inputMode="decimal" min={0} value={val as number} onChange={num(set as (n: number) => void)} className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm" />
          </label>
        ))}
      </div>
      <div className="mt-3 grid gap-2 rounded-lg bg-slate-50 p-3 text-sm sm:grid-cols-2">
        <div><p className="text-xs font-semibold text-slate-500">mL/h = volumen ÷ tiempo</p><p className="tabular-nums">{v} ÷ {h} = <strong>{mlh.toFixed(1)} mL/h</strong></p></div>
        <div><p className="text-xs font-semibold text-slate-500">gotas/min = volumen × factor ÷ (tiempo × 60)</p><p className="tabular-nums">{v} × {f} ÷ ({h} × 60) = <strong>{gtt.toFixed(1)} ≈ {Math.round(gtt)} gotas/min</strong></p></div>
      </div>
      <p className="mt-2 text-[11px] text-slate-500">Valores de ejemplo ilustrativos (500 mL, 4 h, 20 gotas/mL): la ficha solo pide calcular goteo y mL/h. Los ejercicios de comprobación usan estos mismos datos.</p>
    </Panel>
  )
}

/* ------------------------------------------------------------------ */
/* Complicaciones                                                      */
/* ------------------------------------------------------------------ */
const Arm = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 200 90" className="h-24 w-full" aria-hidden="true">
    <path d="M6 30 C6 20 40 16 90 18 L170 24 C192 26 196 40 196 46 C196 54 190 62 170 64 L90 70 C40 72 6 66 6 56 Z" fill="#f1c9a5" stroke="#c99a74" strokeWidth="2" />
    <path d="M20 44 C70 40 130 46 180 42" fill="none" stroke="#6b8fd6" strokeWidth="4" strokeLinecap="round" opacity=".8" />
    {children}
  </svg>
)

const COMPL = [
  {
    id: 'flebitis', action: 'compl:flebitis', title: 'Flebitis',
    signs: ['Eritema (enrojecimiento)', 'Calor local', 'Cordón venoso palpable'],
    act: 'Identificarla de forma temprana, observar la zona de punción y registrarla en la hoja de enfermería. (La ficha no detalla el manejo: pendiente de validar con la docente.)',
    art: <Arm><path d="M60 44 C100 40 130 46 160 42" stroke="#ef4444" strokeWidth="14" strokeLinecap="round" opacity=".35" fill="none" /><path d="M60 44 C100 40 130 46 160 42" stroke="#b91c1c" strokeWidth="4" strokeLinecap="round" fill="none" /></Arm>,
  },
  {
    id: 'infiltration', action: 'compl:infiltration', title: 'Infiltración / extravasación',
    signs: ['Edema en el sitio', 'Dolor', 'Resistencia al paso de líquidos'],
    act: 'Retirar el catéter de inmediato para evitar daño tisular (ficha).',
    art: <Arm><ellipse cx="110" cy="42" rx="42" ry="22" fill="#fecaca" stroke="#ef4444" strokeDasharray="4 3" opacity=".7" /><circle cx="110" cy="42" r="4" fill="#475569" /></Arm>,
  },
  {
    id: 'embolia', action: 'compl:embolia', title: 'Embolia gaseosa',
    signs: ['Burbujas de aire en el sistema de infusión'],
    act: 'Prevención: purgar el sistema antes de conectarlo. Los signos sistémicos y el manejo no figuran en la ficha: pendiente de validar con la docente.',
    art: <svg viewBox="0 0 200 90" className="h-24 w-full" aria-hidden="true"><path d="M10 45 H190" stroke="#7dd3fc" strokeWidth="8" strokeLinecap="round" />{[40, 80, 95, 140].map((x) => <circle key={x} cx={x} cy="45" r="4" fill="#fff" stroke="#0284c7" />)}</svg>,
  },
]

function ComplicationLab({ state, perform, disabled }: ExtraProps) {
  const done = (state.data.doneActions as string[]) ?? []
  return (
    <Panel icon={<AlertTriangle size={16} aria-hidden="true" />} title="Monitorización: identifica la complicación">
      <p className="mb-2 text-xs text-slate-600">Observa cada cuadro y pulsa «Identificar». Verás los signos y la acción educativa correspondiente.</p>
      <div className="grid gap-3 md:grid-cols-3">
        {COMPL.map((c) => {
          const isDone = done.includes(c.action)
          return (
            <article key={c.id} className={`rounded-xl border-2 p-3 ${isDone ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
              <h4 className="text-sm font-bold text-slate-800">{c.title}</h4>
              {c.art}
              {isDone ? (
                <div className="mt-1 space-y-1 text-xs">
                  <p className="flex items-center gap-1 font-semibold text-emerald-800"><CheckCircle2 size={14} aria-hidden="true" /> Identificada</p>
                  <ul className="list-disc pl-4 text-slate-700">{c.signs.map((s) => <li key={s}>{s}</li>)}</ul>
                  <p className="rounded-lg bg-white p-2 text-slate-700"><ShieldAlert size={12} className="mr-1 inline" aria-hidden="true" /><strong>Acción educativa:</strong> {c.act}</p>
                </div>
              ) : (
                <button type="button" disabled={disabled} onClick={() => perform(c.action)} className="mt-1 w-full rounded-lg bg-brand-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-40">Identificar</button>
              )}
            </article>
          )
        })}
      </div>
    </Panel>
  )
}

export default function Extra15(p: ExtraProps) {
  const id = STEP_IDS[Math.min(p.state.stepIndex, STEP_IDS.length - 1)]
  if (p.state.status !== 'running') return null
  switch (id) {
    case 'prep': return (<div className="space-y-3"><TenRights {...p} /><Consent {...p} /></div>)
    case 'site': return <SiteSelector {...p} />
    case 'cannulate': return <AngleSelector {...p} />
    case 'rate': return <InfusionCalculator />
    case 'monitor': return <ComplicationLab {...p} />
    default: return null
  }
}
