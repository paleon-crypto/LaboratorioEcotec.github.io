import { describe, expect, it } from 'vitest'
import html from '../../index.html?raw'

const all = import.meta.glob<string>('../**/*.{ts,tsx}', { query: '?raw', import: 'default', eager: true })
const sources = Object.entries(all).filter(([f]) => !f.includes('.test.') && !f.includes('/test/'))

describe('privacidad: la plataforma no almacena datos', () => {
  it('ningún código usa almacenamiento del navegador, cookies ni red', () => {
    const banned = /localStorage|sessionStorage|indexedDB|document\.cookie|\bfetch\(|XMLHttpRequest|navigator\.sendBeacon|WebSocket/
    expect(sources.filter(([, src]) => banned.test(src)).map(([f]) => f)).toEqual([])
  })

  it('no quedan módulos de autenticación, roles ni administración', () => {
    const banned = /AuthContext|useAuth|demoUsers|roleLabels|apiRepository|localRepository/
    expect(sources.filter(([, src]) => banned.test(src)).map(([f]) => f)).toEqual([])
    expect(sources.map(([f]) => f.toLowerCase()).filter((f) => /teacher|admin|login/.test(f))).toEqual([])
  })

  it('no hay analítica ni servicios externos en el HTML', () => {
    expect(html).not.toMatch(/googletagmanager|google-analytics|gtag\(|hotjar|segment/i)
  })
})
