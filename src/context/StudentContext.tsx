/**
 * Datos del estudiante para el informe PDF.
 * Viven SOLO en memoria (estado de React): no se guardan en ningún almacenamiento ni se envían a ningún servidor.
 * Desaparecen al cerrar o actualizar la página.
 */
import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export interface StudentInfo {
  fullName: string
  teacher: string
  /** Fecha de realización en formato AAAA-MM-DD (valor de <input type="date">). */
  date: string
  career: string
  subject: string
}

interface Value {
  student: StudentInfo
  setStudent: (patch: Partial<StudentInfo>) => void
}

const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const Ctx = createContext<Value | null>(null)

export function StudentProvider({ children }: { children: ReactNode }) {
  const [student, setState] = useState<StudentInfo>({ fullName: '', teacher: '', date: today(), career: '', subject: '' })
  const value = useMemo<Value>(() => ({ student, setStudent: (patch) => setState((s) => ({ ...s, ...patch })) }), [student])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStudent(): Value {
  const v = useContext(Ctx)
  if (!v) throw new Error('useStudent debe usarse dentro de <StudentProvider>')
  return v
}
