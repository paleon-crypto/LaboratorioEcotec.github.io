/** Ilustraciones de la bandeja de la práctica 15 (reutiliza las de Farmacología P3 y añade las propias). */
import type { ReactNode } from 'react'
import { P3_ICONS } from '../farmacologia-p3/Items'

const S = { width: 48, height: 48, viewBox: '0 0 48 48', 'aria-hidden': true } as const

export const P15_ICONS: Record<string, ReactNode> = {
  soap: P3_ICONS.soap,
  ppe: P3_ICONS.ppe,
  kit: P3_ICONS.kit,
  cat18: P3_ICONS.cat18,
  cat20: P3_ICONS.cat20,
  cat22: P3_ICONS.cat22,
  cat24: (
    <svg {...S}><rect x="6" y="22" width="16" height="10" rx="3" fill="#eab308" transform="rotate(-25 14 27)" /><line x1="18" y1="22" x2="42" y2="8" stroke="#64748b" strokeWidth="2" /><rect x="14" y="24" width="7" height="4" rx="1" fill="#fca5a5" transform="rotate(-25 17 26)" /><text x="24" y="46" fontSize="10" fontWeight="700" textAnchor="middle" fill="#334155">24G</text></svg>
  ),
  catheter: P3_ICONS.catheter,
  set: P3_ICONS.set,
  used: P3_ICONS.used,
  tourniquet: (
    <svg {...S}><rect x="6" y="20" width="36" height="8" rx="4" fill="#f59e0b" /><rect x="20" y="16" width="8" height="16" rx="2" fill="#b45309" /></svg>
  ),
  swab: (
    <svg {...S}><circle cx="24" cy="24" r="12" fill="#fff" stroke="#94a3b8" strokeWidth="1.5" /><text x="24" y="28" fontSize="9" fontWeight="700" textAnchor="middle" fill="#0369a1">70%</text></svg>
  ),
  dressing: (
    <svg {...S}><rect x="6" y="14" width="36" height="20" rx="3" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" /><rect x="18" y="19" width="12" height="10" rx="2" fill="#fff" /></svg>
  ),
  label: (
    <svg {...S}><rect x="8" y="12" width="32" height="24" rx="3" fill="#fef9c3" stroke="#a16207" strokeWidth="1.5" /><line x1="13" y1="20" x2="35" y2="20" stroke="#a16207" /><line x1="13" y1="26" x2="35" y2="26" stroke="#a16207" /><line x1="13" y1="32" x2="27" y2="32" stroke="#a16207" /></svg>
  ),
  saline: (
    <svg {...S}><rect x="10" y="20" width="22" height="9" rx="2" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" /><rect x="32" y="22" width="10" height="5" rx="1" fill="#0284c7" /><rect x="4" y="22" width="6" height="5" rx="1" fill="#64748b" /><text x="21" y="38" fontSize="8" textAnchor="middle" fill="#0369a1">SSF 0.9%</text></svg>
  ),
  drug: (
    <svg {...S}><rect x="16" y="14" width="16" height="26" rx="3" fill="#fecaca" stroke="#dc2626" strokeWidth="1.5" /><rect x="18" y="8" width="12" height="6" rx="2" fill="#64748b" /><rect x="19" y="22" width="10" height="8" rx="1" fill="#fff" /></svg>
  ),
}
