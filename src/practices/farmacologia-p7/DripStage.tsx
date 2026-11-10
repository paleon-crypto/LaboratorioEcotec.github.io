import type { StageProps } from '../../core/patientPanel'

/** Esquema de la infusión: bolsa, cámara de goteo y velocidad calculada por el estudiante. */
export default function DripStage({ state, done }: StageProps) {
  const macro = done.includes('calc:macro')
  const micro = done.includes('calc:micro')
  const running = done.includes('decide')
  const vm = state.data.val_macro as number | undefined
  const vu = state.data.val_micro as number | undefined
  return (
    <svg viewBox="0 0 300 220" className="h-auto w-full" role="img" aria-label={`Esquema de infusión.${macro ? ` Macrogotero: ${vm} gotas por minuto.` : ''}${micro ? ` Microgotero: ${vu} microgotas por minuto.` : ''}`}>
      <rect x="110" y="10" width="80" height="90" rx="14" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
      <rect x="114" y={running ? 50 : 30} width="72" height={running ? 46 : 66} rx="10" fill="#7dd3fc" opacity=".7" />
      <text x="150" y="60" fontSize="11" textAnchor="middle" fill="#0369a1">1000 mL</text>
      <rect x="140" y="100" width="20" height="38" rx="4" fill="#f1f5f9" stroke="#94a3b8" />
      {running && [0, 1, 2].map((i) => <circle key={i} className="drip-drop" cx="150" cy={108 + i * 6} r="2.5" fill="#38bdf8" style={{ animationDelay: `${i * 0.35}s` }} />)}
      <path d="M150 138 C150 170 120 180 90 200" fill="none" stroke="#94a3b8" strokeWidth="3" />
      <text x="170" y="150" fontSize="11" fill="#334155">Cámara de goteo</text>
      <text x="12" y="212" fontSize="11" fill="#475569">{macro ? `Macro: ${vm} gotas/min` : 'Macro: —'}  ·  {micro ? `Micro: ${vu} microgotas/min` : 'Micro: —'}</text>
    </svg>
  )
}
