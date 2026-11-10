import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge, Card, PageHeader } from '../components/ui'
import { careers, practices, subjects } from '../data/catalog'

/** Paso 1 del recorrido: selección de carrera. */
export default function Careers() {
  return (
    <>
      <PageHeader title="Selecciona tu carrera" subtitle="Después elegirás la asignatura y la práctica. Las carreras sin prácticas aún están en preparación." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {careers.map((career) => {
          const count = practices.filter((p) => p.meta.careerIds.includes(career.id)).length
          const subjectCount = subjects.filter((s) => s.careerIds.includes(career.id)).length
          return (
            <Link key={career.id} to={`/carreras/${career.id}`} className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
              <Card className="h-full transition group-hover:shadow-md group-hover:ring-2 group-hover:ring-brand-500">
                <div className="flex items-start gap-3">
                  <span className="rounded-xl bg-brand-50 p-3 text-brand-700"><career.icon size={26} aria-hidden="true" /></span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold text-brand-900">{career.name}</h2>
                    <p className="text-sm text-slate-600">{career.description}</p>
                  </div>
                  <ChevronRight className="mt-1 text-slate-400 group-hover:text-brand-700" aria-hidden="true" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {count > 0 ? (
                    <>
                      <Badge tone="blue">{subjectCount} asignatura(s)</Badge>
                      <Badge tone="green">{count} práctica(s)</Badge>
                    </>
                  ) : (
                    <Badge tone="amber">Próximamente</Badge>
                  )}
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </>
  )
}
