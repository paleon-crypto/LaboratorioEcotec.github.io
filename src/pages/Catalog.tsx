import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EmptyState, PageHeader, PracticeCard } from '../components/ui'
import type { Difficulty } from '../core/types'
import { careers, practices, subjects } from '../data/catalog'

const selectCls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm'

export default function Catalog() {
  const [params] = useSearchParams()
  const [q, setQ] = useState('')
  const [career, setCareer] = useState(params.get('carrera') ?? '')
  const [subject, setSubject] = useState(params.get('asignatura') ?? '')
  const [difficulty, setDifficulty] = useState<'' | Difficulty>('')

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    return practices.filter(({ meta }) => {
      if (career && !meta.careerIds.includes(career)) return false
      if (subject && meta.subjectId !== subject) return false
      if (difficulty && meta.difficulty !== difficulty) return false
      if (term && !`${meta.title} ${meta.objective}`.toLowerCase().includes(term)) return false
      return true
    })
  }, [q, career, subject, difficulty])

  return (
    <>
      <PageHeader title="Catálogo de prácticas" subtitle="Filtra por carrera, asignatura o dificultad e inicia la práctica que necesites." />

      <form className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4" onSubmit={(e) => e.preventDefault()} role="search">
        <label className="text-sm font-medium text-slate-700">
          Buscar
          <div className="relative mt-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nombre u objetivo" className={`${selectCls} pl-9`} />
          </div>
        </label>
        <label className="text-sm font-medium text-slate-700">
          Carrera
          <select value={career} onChange={(e) => setCareer(e.target.value)} className={`${selectCls} mt-1`}>
            <option value="">Todas</option>
            {careers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700">
          Asignatura
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className={`${selectCls} mt-1`}>
            <option value="">Todas</option>
            {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700">
          Dificultad
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as '' | Difficulty)} className={`${selectCls} mt-1`}>
            <option value="">Todas</option>
            <option>Básica</option>
            <option>Intermedia</option>
            <option>Avanzada</option>
          </select>
        </label>
      </form>

      <p className="mb-3 text-sm text-slate-600" aria-live="polite">{list.length} práctica(s) encontrada(s)</p>
      {list.length === 0 ? (
        <EmptyState title="Sin resultados" text="Prueba con otros filtros. Las carreras sin módulos aún están en preparación." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((p) => <PracticeCard key={p.meta.id} practice={p} />)}
        </div>
      )}
    </>
  )
}
