import { ArrowRight, FileDown, FlaskConical, GraduationCap, ListChecks, Microscope } from 'lucide-react'
import { Link } from 'react-router-dom'
import { practices } from '../data/catalog'

/** Pantalla de bienvenida: único acceso, para estudiantes. No hay cuentas ni credenciales. */
export default function Welcome() {
  return (
    <div className="flex min-h-full items-center justify-center bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl sm:p-10">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-800 text-white">
            <FlaskConical size={26} aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-brand-900">Laboratorios Virtuales ECOTEC</h1>
            <p className="text-sm text-slate-600">Prácticas de laboratorio interactivas desde tu navegador</p>
          </div>
        </div>

        <ol className="mb-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
          <li className="flex items-start gap-2 rounded-xl bg-slate-50 p-3"><Microscope size={18} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" /> Elige tu práctica y realiza la simulación.</li>
          <li className="flex items-start gap-2 rounded-xl bg-slate-50 p-3"><ListChecks size={18} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" /> Completa la evaluación.</li>
          <li className="flex items-start gap-2 rounded-xl bg-slate-50 p-3"><FileDown size={18} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" /> Descarga tu informe PDF y entrégalo en la plataforma académica de ECOTEC.</li>
        </ol>

        <Link
          to="/carreras"
          className="flex w-full items-center gap-4 rounded-2xl border-2 border-brand-600 bg-brand-50 p-5 text-left transition hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <GraduationCap className="shrink-0 text-brand-700" size={36} aria-hidden="true" />
          <span className="flex-1">
            <span className="block text-lg font-semibold text-brand-900">Ingresar como estudiante</span>
            <span className="text-sm text-slate-600">{practices.length} prácticas disponibles. Sin registro ni contraseña.</span>
          </span>
          <ArrowRight className="text-brand-700" aria-hidden="true" />
        </Link>

        <p className="mt-6 rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
          Esta plataforma no guarda información de los estudiantes: tu progreso y tus datos permanecen solo en la memoria del navegador
          y se pierden al cerrar o actualizar la página. El informe PDF se genera en tu equipo y no se envía a ningún servidor.
        </p>
      </div>
    </div>
  )
}
