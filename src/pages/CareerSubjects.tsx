import { ArrowLeft, ChevronRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Badge, Card, EmptyState, PageHeader } from '../components/ui'
import { careers, practicesBySubject, subjects } from '../data/catalog'

/** Paso 2 del recorrido: asignaturas de la carrera elegida. */
export default function CareerSubjects() {
  const { careerId } = useParams()
  const career = careers.find((c) => c.id === careerId)
  if (!career) {
    return (
      <>
        <EmptyState title="Carrera no encontrada" text="La carrera solicitada no existe." />
        <Link to="/carreras" className="mt-4 inline-block text-sm font-medium text-brand-700 underline">Volver a las carreras</Link>
      </>
    )
  }
  const subs = subjects.filter((s) => s.careerIds.includes(career.id))
  return (
    <>
      <Link to="/carreras" className="mb-2 inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:underline">
        <ArrowLeft size={14} aria-hidden="true" /> Carreras
      </Link>
      <PageHeader title={career.name} subtitle="Selecciona la asignatura para ver sus prácticas." />
      {subs.length === 0 ? (
        <EmptyState title="Próximamente" text="Esta carrera aún no tiene asignaturas ni prácticas disponibles." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {subs.map((s) => {
            const n = practicesBySubject(s.id).filter((p) => p.meta.careerIds.includes(career.id)).length
            return (
              <Link key={s.id} to={`/catalogo?carrera=${career.id}&asignatura=${s.id}`} className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
                <Card className="flex h-full items-center gap-3 transition group-hover:shadow-md group-hover:ring-2 group-hover:ring-brand-500">
                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-brand-900">{s.name}</h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge tone="green">{n} práctica(s)</Badge>
                      {s.provisional && <Badge tone="amber">Asignación por confirmar</Badge>}
                    </div>
                  </div>
                  <ChevronRight className="text-slate-400 group-hover:text-brand-700" aria-hidden="true" />
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
