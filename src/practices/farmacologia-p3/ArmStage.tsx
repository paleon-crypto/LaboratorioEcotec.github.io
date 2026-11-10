/** Escena 2D del antebrazo del paciente simulado: se actualiza con cada paso del procedimiento. */
import type { StageProps } from '../../core/patientPanel'

const GAUGE_COLOR: Record<string, string> = { '18': '#16a34a', '20': '#ec4899', '22': '#3b82f6', '24': '#eab308' }

export default function ArmStage({ done }: StageProps) {
  const has = (k: string) => done.includes(k)
  const gauge = done.find((k) => k.startsWith('select-catheter:'))?.split(':')[1]
  const catColor = gauge ? GAUGE_COLOR[gauge] : '#94a3b8'
  const inserted = has('insert')
  const needleOut = has('withdraw')
  const connected = has('connect')
  const purged = has('purge')
  const flowing = has('flow')

  const status = [
    has('sterile-field') && 'campo estéril',
    has('antisepsis') && 'zona con antisepsia',
    gauge && `catéter ${gauge}G`,
    inserted && 'catéter insertado',
    has('flashback') && 'flashback confirmado',
    needleOut && 'aguja retirada',
    has('fix') && 'catéter fijado',
    connected && 'sistema conectado',
    flowing && 'infusión en curso',
    has('compl:hematoma') && 'hematoma identificado',
    has('compl:extravasation') && 'extravasación identificada',
  ].filter(Boolean)

  return (
    <svg viewBox="0 0 520 280" className="h-auto w-full" role="img" aria-label={`Antebrazo del paciente simulado. ${status.length ? status.join(', ') : 'Sin intervenciones todavía'}.`}>
      {/* operador, mesa auxiliar y guardián (banda superior) */}
      <g>
        <circle cx="40" cy="22" r="13" fill="#cbd5e1" />
        <rect x="22" y="36" width="36" height="22" rx="8" fill={has('epp') ? '#5eead4' : '#cbd5e1'} />
        {has('handwash') && <text x="66" y="30" fontSize="10" fill="#0f766e">manos ✓</text>}
        {has('epp') && <text x="66" y="44" fontSize="10" fill="#0f766e">EPP ✓</text>}
        <rect x="190" y="30" width="150" height="10" rx="2" fill="#94a3b8" />
        {has('materials') && (
          <g fill="#e2e8f0" stroke="#64748b">
            <rect x="200" y="16" width="30" height="14" rx="2" />
            <rect x="238" y="20" width="22" height="10" rx="2" />
            <rect x="268" y="18" width="34" height="12" rx="2" />
          </g>
        )}
        <rect x="420" y="22" width="44" height="34" rx="5" fill="#fde047" stroke="#a16207" />
        <text x="442" y="43" fontSize="8" textAnchor="middle" fill="#713f12">Guardián</text>
        {has('dispose') && <text x="442" y="16" fontSize="10" textAnchor="middle" fill="#15803d">✓</text>}
      </g>
      <g transform="translate(0,60)">
      {/* campo estéril */}
      {has('sterile-field') && <rect x="40" y="105" width="380" height="140" rx="12" fill="#99d6c9" opacity=".7" />}
      {/* antebrazo y mano */}
      <path d="M30 140 C30 120 70 112 140 114 L330 124 C380 126 400 138 400 150 C400 164 380 176 330 178 L140 190 C70 192 30 182 30 160 Z" fill="#f1c9a5" stroke="#c99a74" strokeWidth="2" />
      <ellipse cx="408" cy="152" rx="60" ry="30" fill="#f1c9a5" stroke="#c99a74" strokeWidth="2" />
      {/* torniquete (hasta fijar el catéter) */}
      {has('tourniquet') && !has('fix') && <rect x="150" y="110" width="14" height="86" rx="3" fill="#f59e0b" opacity=".85" />}
      {has('compl:flebitis') && <path d="M230 152 L340 146" stroke="#ef4444" strokeWidth="9" strokeLinecap="round" opacity=".35" />}
      {/* vena */}
      <path d="M60 150 C140 146 220 152 300 148 S380 146 400 150" fill="none" stroke="#6b8fd6" strokeWidth="5" strokeLinecap="round" opacity=".75" />
      <text x="90" y="138" fontSize="11" fill="#475569">Vena</text>
      {/* antisepsia */}
      {has('antisepsis') && <ellipse cx="300" cy="150" rx="46" ry="22" fill="#d97706" opacity=".3" />}
      {/* complicaciones identificadas */}
      {has('compl:extravasation') && <ellipse cx="318" cy="150" rx="62" ry="30" fill="#fecaca" opacity=".55" stroke="#ef4444" strokeDasharray="4 3" />}
      {has('compl:hematoma') && <ellipse cx="282" cy="158" rx="28" ry="14" fill="#7c3aed" opacity=".5" />}
      {/* catéter */}
      {inserted && (
        <g>
          <line x1="300" y1="150" x2="352" y2="122" stroke={catColor} strokeWidth="6" strokeLinecap="round" />
          <rect x="348" y="112" width="22" height="14" rx="3" transform="rotate(-28 359 119)" fill={catColor} />
          {has('flashback') && <rect x="352" y="116" width="10" height="6" rx="2" transform="rotate(-28 357 119)" fill="#b91c1c" />}
          {!needleOut && <line x1="362" y1="114" x2="396" y2="92" stroke="#64748b" strokeWidth="2.5" />}
        </g>
      )}
      {/* fijación */}
      {has('fix') && (
        <g fill="#ffffff" stroke="#cbd5e1">
          <rect x="296" y="140" width="40" height="12" rx="2" transform="rotate(-28 316 146)" />
          <rect x="312" y="150" width="34" height="10" rx="2" />
        </g>
      )}
      {/* sistema de infusión */}
      {connected && (
        <g>
          <path d="M366 118 C420 70 440 60 452 40" fill="none" stroke={purged ? '#7dd3fc' : '#cbd5e1'} strokeWidth="3" />
          <rect x="430" y="6" width="44" height="22" rx="5" fill="#e0f2fe" stroke="#38bdf8" />
          <text x="452" y="21" fontSize="9" textAnchor="middle" fill="#0369a1">Suero</text>
          {flowing && [0, 1, 2].map((i) => <circle key={i} className="drip-drop" cx="452" cy={34 + i * 6} r="2.5" fill="#38bdf8" style={{ animationDelay: `${i * 0.35}s` }} />)}
        </g>
      )}
      </g>
    </svg>
  )
}
