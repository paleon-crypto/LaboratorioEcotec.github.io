import { BookOpen, FlaskConical, GraduationCap, LayoutDashboard, Menu, X } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

interface NavItem {
  to: string
  label: string
  icon: ReactNode
}

const nav: NavItem[] = [
  { to: '/', label: 'Inicio', icon: <LayoutDashboard size={18} /> },
  { to: '/carreras', label: 'Carreras y asignaturas', icon: <GraduationCap size={18} /> },
  { to: '/catalogo', label: 'Catálogo de prácticas', icon: <FlaskConical size={18} /> },
]

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
        <FlaskConical size={22} aria-hidden="true" />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-bold tracking-wide">ECOTEC</p>
        <p className="text-xs text-brand-200">Laboratorios Virtuales</p>
      </div>
    </div>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  // En la vista de laboratorio se aprovecha todo el ancho.
  const wide = location.pathname.startsWith('/practica/')

  const items = nav

  const sidebar = (
    <div className="flex h-full flex-col bg-brand-900 p-4 text-white">
      <Brand />
      <nav aria-label="Navegación principal" className="mt-8 flex-1 space-y-1">
        {items.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.to === '/'}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-white text-brand-900' : 'text-brand-100 hover:bg-white/10'
              }`
            }
          >
            {n.icon}
            {n.label}
          </NavLink>
        ))}
      </nav>
      <p className="rounded-xl bg-white/10 p-3 text-xs text-brand-100">
        Sin cuentas ni almacenamiento: tu progreso solo existe mientras esta página esté abierta.
      </p>
    </div>
  )

  return (
    <div className="flex min-h-full">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">
        Saltar al contenido
      </a>

      {/* Menú lateral fijo en pantallas grandes */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block">{sidebar}</aside>

      {/* Menú desplegable en tabletas/móviles */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Menú">
          <button type="button" aria-label="Cerrar menú" className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative h-full w-72 max-w-[85%]">{sidebar}</div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="rounded-lg p-2 text-brand-900 hover:bg-slate-100"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <span className="flex items-center gap-2 text-sm font-bold text-brand-900">
            <BookOpen size={18} aria-hidden="true" /> Laboratorios Virtuales ECOTEC
          </span>
        </header>
        <main id="contenido" className={`mx-auto w-full flex-1 p-4 sm:p-6 ${wide ? 'max-w-[1600px]' : 'max-w-7xl'}`}>
          <Outlet />
        </main>
        <footer className="border-t border-slate-200 px-6 py-3 text-center text-xs text-slate-500">
          Simulador educativo: no constituye una herramienta de diagnóstico clínico.
        </footer>
      </div>
    </div>
  )
}
