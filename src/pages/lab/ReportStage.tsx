import { CheckCircle2, Download, FlaskConical, ListChecks, Lock, Pencil } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Card } from '../../components/ui'
import { useStudent } from '../../context/StudentContext'
import { computeGrade } from '../../core/scoring'
import type { Attempt, PracticeModule } from '../../core/types'
import { careers, getSubject, subjects } from '../../data/catalog'
import { downloadReport, reportFileName } from '../../services/pdfReport'
import type { ReportInfo } from '../../services/pdfReport'

interface Props {
  module: PracticeModule
  attempt: Attempt
  onUpdate: (patch: Partial<Attempt>) => void
  onRestart: () => void
}

const field = 'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm'

export default function ReportStage({ module, attempt, onUpdate, onRestart }: Props) {
  const { meta } = module
  const grade = computeGrade(attempt, module)
  const { student, setStudent } = useStudent()
  // Carrera y asignatura se proponen según la práctica; el estudiante puede corregirlas.
  const [career, setCareer] = useState(student.career || (careers.find((c) => c.id === meta.careerIds[0])?.name ?? ''))
  const [subject, setSubject] = useState(student.subject || (getSubject(meta.subjectId)?.name ?? ''))
  const [reviewing, setReviewing] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const info: ReportInfo = { fullName: student.fullName.trim(), career, subject, teacher: student.teacher.trim(), date: student.date }

  const review = () => {
    const missing: string[] = []
    if (!info.fullName) missing.push('Nombres y apellidos')
    if (!info.teacher) missing.push('Docente')
    if (!info.date) missing.push('Fecha de realización')
    if (!info.career) missing.push('Carrera')
    if (!info.subject) missing.push('Asignatura')
    setErrors(missing)
    if (missing.length === 0) {
      setStudent({ career, subject })
      setReviewing(true)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-brand-900">Resumen de la evaluación</h2>
            <p className="text-sm text-slate-600">Calificación automática sobre 100. No se guarda en ningún lugar: solo se incluye en tu informe PDF.</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-brand-800">{grade.total === null ? '—' : grade.total}</p>
            {grade.provisional && <Badge tone="amber">Provisional</Badge>}
          </div>
        </div>
        <table className="mt-4 w-full text-sm">
          <caption className="sr-only">Desglose de calificación</caption>
          <thead>
            <tr className="text-left text-xs uppercase text-slate-500">
              <th scope="col" className="py-2">Componente</th>
              <th scope="col" className="py-2">Ponderación</th>
              <th scope="col" className="py-2 text-right">Puntaje</th>
            </tr>
          </thead>
          <tbody>
            {grade.breakdown.filter((b) => b.weight > 0).map((b) => (
              <tr key={b.key} className="border-t border-slate-100">
                <td className="py-2">{b.label}</td>
                <td className="py-2">{b.weight}</td>
                <td className="py-2 text-right tabular-nums">{b.score === null ? 'Pendiente' : `${b.score} / 100`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {grade.provisional && (
          <p className="mt-3 text-xs text-slate-500">
            La nota es provisional porque hay componentes pendientes (p. ej., las preguntas abiertas, que revisa el docente). Se calcula con los componentes disponibles.
          </p>
        )}
        <p className="mt-3 text-xs text-slate-500">Errores durante el procedimiento: {attempt.errors}.</p>
      </Card>

      <Card>
        <h2 className="mb-2 font-semibold text-brand-900">Observaciones y conclusiones</h2>
        <p className="mb-3 text-sm text-slate-600">{module.buildConclusion(attempt.results)}</p>
        <label htmlFor="observations" className="text-sm font-medium text-slate-700">Tus observaciones (opcional, se incluyen en el PDF)</label>
        <textarea id="observations" rows={3} maxLength={1200} value={attempt.observations} onChange={(e) => onUpdate({ observations: e.target.value })} className={field} />
        <label htmlFor="conclusions" className="mt-3 block text-sm font-medium text-slate-700">Tus conclusiones (opcional, se incluyen en el PDF)</label>
        <textarea id="conclusions" rows={4} maxLength={1200} value={attempt.conclusions} onChange={(e) => onUpdate({ conclusions: e.target.value })} className={field} />
        <p className="mt-1 text-right text-xs text-slate-400">{attempt.conclusions.length}/1200</p>
      </Card>

      <Card>
        <h2 className="mb-1 font-semibold text-brand-900">Datos para el informe</h2>
        <p className="mb-3 flex items-start gap-2 text-xs text-slate-500">
          <Lock size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
          Los datos se usan solo para armar el PDF en tu navegador. No se envían ni se guardan; desaparecen al cerrar o actualizar la página.
        </p>

        {!reviewing ? (
          <form noValidate onSubmit={(e) => { e.preventDefault(); review() }} className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              Nombres y apellidos
              <input value={student.fullName} onChange={(e) => setStudent({ fullName: e.target.value })} autoComplete="off" maxLength={120} className={field} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Carrera
              <select value={career} onChange={(e) => setCareer(e.target.value)} className={field}>
                {careers.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Asignatura
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className={field}>
                {subjects.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              Práctica
              <input value={`${meta.number ? `N.º ${meta.number} · ` : ''}${meta.title}`} readOnly className={`${field} bg-slate-50 text-slate-600`} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Docente
              <input value={student.teacher} onChange={(e) => setStudent({ teacher: e.target.value })} autoComplete="off" maxLength={120} className={field} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Fecha de realización
              <input type="date" value={student.date} onChange={(e) => setStudent({ date: e.target.value })} className={field} />
            </label>
            {errors.length > 0 && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800 sm:col-span-2">Completa: {errors.join(', ')}.</p>
            )}
            <div className="sm:col-span-2">
              <button type="submit" className="flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800">
                <CheckCircle2 size={16} aria-hidden="true" /> Revisar datos
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-700">Revisa tus datos antes de generar el documento</h3>
            <dl className="grid gap-x-4 gap-y-2 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-[160px_1fr]">
              <dt className="font-medium text-slate-600">Estudiante</dt><dd>{info.fullName}</dd>
              <dt className="font-medium text-slate-600">Carrera</dt><dd>{info.career}</dd>
              <dt className="font-medium text-slate-600">Asignatura</dt><dd>{info.subject}</dd>
              <dt className="font-medium text-slate-600">Práctica</dt><dd>{meta.number ? `N.º ${meta.number} · ` : ''}{meta.title}</dd>
              <dt className="font-medium text-slate-600">Docente</dt><dd>{info.teacher}</dd>
              <dt className="font-medium text-slate-600">Fecha</dt><dd>{info.date}</dd>
              <dt className="font-medium text-slate-600">Archivo</dt><dd className="break-all">{reportFileName(module, info)}</dd>
            </dl>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={() => downloadReport(attempt, module, info)} className="flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800">
                <Download size={16} aria-hidden="true" /> GENERAR INFORME PDF
              </button>
              <button type="button" onClick={() => setReviewing(false)} className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                <Pencil size={16} aria-hidden="true" /> Editar datos
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-500">El archivo se descarga en tu equipo. Entrégalo tú mismo en la plataforma académica oficial de ECOTEC: esta aplicación no lo envía a ningún sitio.</p>
          </div>
        )}
      </Card>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onRestart} className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          <FlaskConical size={16} aria-hidden="true" /> Repetir la práctica
        </button>
        <Link to="/catalogo" className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          <ListChecks size={16} aria-hidden="true" /> Volver al catálogo
        </Link>
      </div>
    </div>
  )
}
