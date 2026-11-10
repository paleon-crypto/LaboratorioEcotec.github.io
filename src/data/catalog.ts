import { Activity, Apple, Brain, HeartPulse, PawPrint, Smile, Stethoscope } from 'lucide-react'
import type { Career, PracticeModule, Subject } from '../core/types'

export const careers: Career[] = [
  { id: 'enfermeria', name: 'Enfermería', description: 'Cuidado integral de la salud de las personas.', icon: HeartPulse },
  { id: 'medicina', name: 'Medicina', description: 'Ciencias médicas y práctica clínica.', icon: Stethoscope },
  { id: 'nutricion', name: 'Nutrición', description: 'Alimentación, metabolismo y salud.', icon: Apple },
  { id: 'fisioterapia', name: 'Fisioterapia', description: 'Rehabilitación y movimiento humano.', icon: Activity },
  { id: 'odontologia', name: 'Odontología', description: 'Salud bucodental.', icon: Smile },
  { id: 'psicologia', name: 'Psicología', description: 'Conducta y procesos mentales.', icon: Brain },
  { id: 'veterinaria', name: 'Medicina Veterinaria', description: 'Salud y bienestar animal.', icon: PawPrint },
]

/**
 * Asignaturas. Para agregar una asignatura nueva basta con añadirla aquí.
 * `provisional: true` indica que la relación con las carreras debe confirmarse con ECOTEC.
 */
export const subjects: Subject[] = [
  { id: 'bioquimica', name: 'Bioquímica', careerIds: ['medicina'] },
  { id: 'farmacologia', name: 'Farmacología Básica', careerIds: ['medicina'] },
  { id: 'biologia-celular', name: 'Biología Celular y Molecular', careerIds: ['enfermeria'] },
  { id: 'enfermeria-basica', name: 'Enfermería Básica y Seguridad del Paciente', careerIds: ['enfermeria'] },
]

/**
 * Registro automático de prácticas: cada carpeta `src/practices/<id>/index.ts`
 * que exporte por defecto un PracticeModule se incorpora sin tocar el resto de la app.
 */
const found = import.meta.glob<{ default: PracticeModule }>('../practices/*/index.ts', { eager: true })

export const practices: PracticeModule[] = Object.values(found)
  .map((m) => m.default)
  .sort((a, b) => a.meta.subjectId.localeCompare(b.meta.subjectId) || (a.meta.number ?? 99) - (b.meta.number ?? 99))

export const getPractice = (id: string) => practices.find((p) => p.meta.id === id)
export const getCareer = (id: string) => careers.find((c) => c.id === id)
export const getSubject = (id: string) => subjects.find((s) => s.id === id)
export const practicesBySubject = (subjectId: string) => practices.filter((p) => p.meta.subjectId === subjectId)
export const practicesByCareer = (careerId: string) => practices.filter((p) => p.meta.careerIds.includes(careerId))
