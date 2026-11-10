/** Ilustraciones vectoriales (esquemáticas) de los materiales de la bandeja. Sustituibles por fotos con `image`. */
import type { ReactNode } from 'react'

const S = { width: 48, height: 48, viewBox: '0 0 48 48', 'aria-hidden': true } as const
const GAUGE_COLOR: Record<string, string> = { '18': '#16a34a', '20': '#ec4899', '22': '#3b82f6' }

const Cat = ({ g }: { g: string }) => (
  <svg {...S}>
    <rect x="6" y="22" width="16" height="10" rx="3" fill={GAUGE_COLOR[g]} transform="rotate(-25 14 27)" />
    <line x1="18" y1="22" x2="42" y2="8" stroke="#64748b" strokeWidth="2" />
    <rect x="14" y="24" width="7" height="4" rx="1" fill="#fca5a5" transform="rotate(-25 17 32)" />
    <text x="24" y="46" fontSize="10" fontWeight="700" textAnchor="middle" fill="#334155">{g}G</text>
  </svg>
)

export const P3_ICONS: Record<string, ReactNode> = {
  soap: (
    <svg {...S}><rect x="16" y="18" width="16" height="24" rx="4" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" /><rect x="20" y="8" width="8" height="10" rx="2" fill="#0284c7" /><rect x="26" y="6" width="10" height="4" rx="2" fill="#0284c7" /><circle cx="24" cy="30" r="4" fill="#fff" opacity=".8" /></svg>
  ),
  ppe: (
    <svg {...S}><path d="M12 14 L20 10 Q24 14 28 10 L36 14 L40 24 L34 26 V42 H14 V26 L8 24 Z" fill="#5eead4" stroke="#0f766e" strokeWidth="1.5" /><rect x="19" y="14" width="10" height="6" rx="2" fill="#fff" /></svg>
  ),
  drape: (
    <svg {...S}><rect x="6" y="10" width="36" height="28" rx="3" fill="#99d6c9" stroke="#0f766e" strokeWidth="1.5" /><circle cx="24" cy="24" r="6" fill="none" stroke="#0f766e" strokeWidth="1.5" /></svg>
  ),
  kit: (
    <svg {...S}><rect x="6" y="14" width="36" height="24" rx="3" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" /><rect x="10" y="18" width="10" height="8" rx="1" fill="#fff" stroke="#94a3b8" /><rect x="24" y="18" width="14" height="5" rx="1" fill="#fff" stroke="#94a3b8" /><rect x="10" y="29" width="28" height="4" rx="1" fill="#cbd5e1" /></svg>
  ),
  antiseptic: (
    <svg {...S}><rect x="15" y="16" width="18" height="26" rx="4" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" /><rect x="20" y="8" width="8" height="8" rx="2" fill="#b45309" /><rect x="19" y="24" width="10" height="8" rx="1" fill="#fff" /></svg>
  ),
  cat18: <Cat g="18" />,
  cat20: <Cat g="20" />,
  cat22: <Cat g="22" />,
  catheter: (
    <svg {...S}><rect x="6" y="28" width="16" height="10" rx="3" fill="#94a3b8" transform="rotate(-25 14 33)" /><line x1="18" y1="28" x2="42" y2="14" stroke="#64748b" strokeWidth="2" /></svg>
  ),
  tape: (
    <svg {...S}><rect x="8" y="16" width="32" height="16" rx="3" fill="#fff" stroke="#94a3b8" strokeWidth="1.5" /><rect x="20" y="20" width="8" height="8" rx="1" fill="#e2e8f0" /></svg>
  ),
  set: (
    <svg {...S}><rect x="26" y="4" width="16" height="12" rx="3" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" /><path d="M34 16 V24 Q34 32 24 34 Q12 36 10 44" fill="none" stroke="#38bdf8" strokeWidth="2" /><rect x="29" y="22" width="10" height="6" rx="2" fill="#7dd3fc" /></svg>
  ),
  used: (
    <svg {...S}><line x1="8" y1="40" x2="38" y2="10" stroke="#64748b" strokeWidth="3" strokeLinecap="round" /><rect x="30" y="6" width="12" height="8" rx="2" fill="#ef4444" transform="rotate(-45 36 10)" /></svg>
  ),
}
