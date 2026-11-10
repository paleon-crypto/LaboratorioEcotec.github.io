/**
 * Generación del informe de práctica en PDF (jsPDF + autotable), 100 % en el navegador.
 */
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { getInterpretationItems, stepsFor } from '../core/practice'
import { computeGrade } from '../core/scoring'
import type { Attempt, PracticeModule } from '../core/types'

export const UNIVERSITY = 'Universidad ECOTEC'

/** Datos que el estudiante completa para el informe (solo en memoria, nunca se guardan ni se envían). */
export interface ReportInfo {
  fullName: string
  career: string
  subject: string
  teacher: string
  /** AAAA-MM-DD */
  date: string
}

const fmtDay = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return new Date(y, m - 1, d).toLocaleDateString('es-EC', { dateStyle: 'long' })
}

const fmtDate = (t: number) =>
  new Date(t).toLocaleString('es-EC', { dateStyle: 'long', timeStyle: 'short' })

/** Sustituye símbolos que la fuente estándar del PDF (Helvetica, WinAnsi) no puede dibujar. */
const PDF_MAP: Record<string, string> = { '✓': '(ok)', '→': '->', '←': '<-', '↔': '<->', '↑': '(arriba)', '↓': '(abajo)', 'μ': 'µ', '₂': '2', '−': '-', '⁻': '-', '≈': '~', '○': 'o' }
const pdfSafe = <T,>(t: T): T => {
  const fix = (x: string) => x.replace(/[✓→←↔↑↓μ₂−⁻≈○]/g, (c) => PDF_MAP[c] ?? c)
  return (typeof t === 'string' ? fix(t) : Array.isArray(t) ? t.map((x) => (typeof x === 'string' ? fix(x) : x)) : t) as T
}

export function buildReport(attempt: Attempt, module: PracticeModule, info: ReportInfo): jsPDF {
  const { meta } = module
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const d = doc as unknown as Record<string, (...a: unknown[]) => unknown>
  for (const fn of ['text', 'splitTextToSize', 'getTextWidth']) {
    const orig = d[fn].bind(doc)
    d[fn] = (t: unknown, ...rest: unknown[]) => orig(pdfSafe(t), ...rest)
  }
  const pageW = doc.internal.pageSize.getWidth()
  const margin = 48
  let y = 0

  // Encabezado
  doc.setFillColor(15, 61, 94)
  doc.rect(0, 0, pageW, 78, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold').setFontSize(18)
  doc.text(UNIVERSITY, margin, 36)
  doc.setFont('helvetica', 'normal').setFontSize(11)
  doc.text('Laboratorios Virtuales · Informe de práctica', margin, 56)
  y = 108

  doc.setTextColor(15, 23, 42)
  doc.setFont('helvetica', 'bold').setFontSize(14)
  const titleLines = doc.splitTextToSize(meta.title, pageW - margin * 2)
  doc.text(titleLines, margin, y)
  y += titleLines.length * 17 + 6

  // Datos generales
  autoTable(doc, {
    startY: y,
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 120, fillColor: [238, 246, 251] } },
    body: [
      ['Universidad', UNIVERSITY],
      ...(meta.faculty ? [['Unidad académica', meta.faculty]] : []),
      ['Estudiante', info.fullName],
      ['Carrera', info.career],
      ['Asignatura', info.subject],
      ['Práctica', `${meta.number ? `N.º ${meta.number} · ` : ''}${meta.title}`],
      ['Docente', info.teacher],
      ['Fecha de realización', fmtDay(info.date)],
    ],
  })
  y = lastY(doc) + 18

  y = heading(doc, 'Objetivo', y, margin)
  y = paragraph(doc, meta.objective, y, margin, pageW)

  if (meta.theory) {
    y = ensureSpace(doc, y, 80)
    y = heading(doc, 'Fundamento teórico', y + 6, margin)
    y = paragraph(doc, meta.theory, y, margin, pageW)
  }

  y = ensureSpace(doc, y, 80)
  y = heading(doc, 'Materiales y equipos', y + 6, margin)
  autoTable(doc, {
    startY: y,
    head: [['Tipo', 'Detalle']],
    body: [['Materiales', meta.materials.join(', ') || '—'], ['Equipos', meta.equipment.join(', ') || '—']],
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [15, 61, 94] },
    columnStyles: { 0: { cellWidth: 80, fontStyle: 'bold' } },
  })
  y = lastY(doc) + 14

  // Procedimiento
  y = heading(doc, 'Procedimiento realizado', y + 6, margin)
  const rows: string[][] = []
  module.rounds.forEach((round, ri) => {
    const done = attempt.completedSteps[round.id] ?? []
    stepsFor(module, ri).forEach((s, i) => {
      rows.push([i === 0 ? round.label : '', `${i + 1}. ${s.title}`, done.includes(s.id) ? 'Completado' : 'Pendiente'])
    })
  })
  autoTable(doc, {
    startY: y,
    head: [['Parte', 'Paso', 'Estado']],
    body: rows,
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [15, 61, 94] },
  })
  y = lastY(doc) + 8
  y = paragraph(doc, `Errores cometidos durante el procedimiento: ${attempt.errors}.`, y, margin, pageW)
  if (!meta.validated) {
    y = paragraph(doc, 'Nota: el procedimiento está pendiente de validación con la ficha académica oficial.', y, margin, pageW)
  }

  // Evidencia de las actividades (registro de acciones de la simulación)
  const okLog = attempt.log.filter((l) => l.ok)
  const badLog = attempt.log.filter((l) => !l.ok)
  if (attempt.log.length > 0) {
    y = ensureSpace(doc, y, 100)
    y = heading(doc, 'Evidencia de las actividades realizadas', y + 6, margin)
    y = paragraph(doc, `Acciones correctas: ${okLog.length}. Acciones con error: ${badLog.length}. Resumen del registro de la simulación por paso del procedimiento.`, y, margin, pageW)
    const stepTitle = (id: string) => module.rounds.flatMap((_, ri) => stepsFor(module, ri)).find((st) => st.id === id)?.title ?? id
    const stepIds = [...new Set(attempt.log.map((l) => l.stepId))]
    autoTable(doc, {
      startY: y,
      head: [['Paso', 'Acciones correctas', 'Errores']],
      body: stepIds.map((id) => [stepTitle(id), String(okLog.filter((l) => l.stepId === id).length), String(badLog.filter((l) => l.stepId === id).length)]),
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { fillColor: [15, 61, 94] },
      columnStyles: { 1: { cellWidth: 100 }, 2: { cellWidth: 60 } },
    })
    y = lastY(doc) + 10
    if (badLog.length > 0) {
      autoTable(doc, {
        startY: y,
        head: [['Paso', 'Error registrado']],
        body: badLog.slice(0, 60).map((l) => [stepTitle(l.stepId), l.message]),
        styles: { fontSize: 8.5, cellPadding: 3 },
        headStyles: { fillColor: [120, 53, 15] },
      })
      y = lastY(doc) + 14
    }
  }

  // Resultados
  y = ensureSpace(doc, y, 120)
  y = heading(doc, 'Resultados de la simulación', y + 6, margin)
  y = paragraph(doc, 'Los resultados siguientes son SIMULADOS con fines educativos; no son resultados experimentales reales.', y, margin, pageW)
  const items = getInterpretationItems(module, attempt.results)
  const roundIds = new Set(module.rounds.map((r) => r.id))
  autoTable(doc, {
    startY: y,
    head: [['Parte', 'Resultado', 'Interpretación automática (ficha académica)', 'Interpretación del estudiante']],
    body: attempt.results.map((r) => {
      const when = r.recordedAt ? `\nRegistrado: ${fmtDate(r.recordedAt)}` : ''
      const result =
        r.value !== undefined ? `${r.value} ${r.unit ?? ''}` : (r.observations ?? []).map((o) => `${o.sample}: ${o.text}`).join('\n')
      const item = items.find((i) => i.roundId === r.roundId)
      const chosen = item?.options.find((o) => o.id === attempt.interpretation[item.id])
      const auto = r.value !== undefined ? (r.note ? `${r.classificationLabel}. ${r.note}` : r.classificationLabel) : '—'
      return [`${r.label}${when}`, result, auto, item ? (chosen?.label ?? 'Sin responder') : '—']
    }),
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [15, 61, 94] },
    columnStyles: { 1: { cellWidth: 150 }, 2: { cellWidth: 140 } },
  })
  y = lastY(doc) + 14

  const loose = items.filter((i) => !i.roundId || !roundIds.has(i.roundId))
  if (loose.length > 0) {
    y = ensureSpace(doc, y, 100)
    y = heading(doc, 'Interpretación de las muestras', y, margin)
    autoTable(doc, {
      startY: y,
      head: [['Pregunta', 'Respuesta del estudiante', 'Respuesta esperada']],
      body: loose.map((i) => [
        i.prompt,
        i.options.find((o) => o.id === attempt.interpretation[i.id])?.label ?? 'Sin responder',
        i.options.find((o) => o.id === i.correct)?.label ?? '',
      ]),
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { fillColor: [15, 61, 94] },
    })
    y = lastY(doc) + 14
  }

  // Evaluación
  y = ensureSpace(doc, y, 150)
  y = heading(doc, 'Evaluación', y, margin)
  const grade = computeGrade(attempt, module)
  autoTable(doc, {
    startY: y,
    head: [['Componente', 'Ponderación', 'Puntaje']],
    body: grade.breakdown
      .filter((b) => b.weight > 0)
      .map((b) => [b.label, `${b.weight}`, b.score === null ? 'Pendiente' : `${b.score} / 100`]),
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [15, 61, 94] },
  })
  y = lastY(doc) + 8
  const totalText =
    grade.total === null
      ? 'Calificación: pendiente.'
      : `Calificación${grade.provisional ? ' provisional (hay componentes pendientes)' : ''}: ${grade.total} / 100.`
  doc.setFont('helvetica', 'bold').setFontSize(11)
  doc.text(totalText, margin, y + 8)
  y += 22
  y = paragraph(doc, 'La calificación es automática y no se almacena. Las preguntas abiertas no se califican aquí: las revisa el docente.', y, margin, pageW)

  // Respuestas de la evaluación
  y = ensureSpace(doc, y, 120)
  y = heading(doc, 'Respuestas de la evaluación', y + 6, margin)
  const label = (q: PracticeModule['quiz']['questions'][number], v: string | boolean | undefined) => {
    if (v === undefined || v === '') return 'Sin responder'
    if (q.type === 'choice') return q.options.find((o) => o.id === v)?.text ?? String(v)
    if (q.type === 'tf') return v === true ? 'Verdadero' : 'Falso'
    return String(v)
  }
  autoTable(doc, {
    startY: y,
    head: [['Pregunta', 'Respuesta del estudiante', 'Respuesta correcta / criterios']],
    body: module.quiz.questions.map((q) => {
      const given = attempt.quizAnswers[q.id]
      const expected = q.type === 'open' ? `Pendiente de revisión docente. Criterios: ${q.expectedPoints.join(' · ')}` : `${label(q, q.correct)}${given === q.correct ? ' (acierto)' : ''}`
      return [q.prompt, label(q, given), expected]
    }),
    styles: { fontSize: 8.5, cellPadding: 4 },
    headStyles: { fillColor: [15, 61, 94] },
  })
  y = lastY(doc) + 14

  // Observaciones
  y = ensureSpace(doc, y, 80)
  y = heading(doc, 'Observaciones', y, margin)
  y = paragraph(doc, attempt.observations.trim() || 'Sin observaciones registradas por el estudiante.', y, margin, pageW)

  // Conclusiones
  y = ensureSpace(doc, y, 120)
  y = heading(doc, 'Conclusiones', y, margin)
  y = paragraph(doc, module.buildConclusion(attempt.results), y, margin, pageW)
  if (attempt.conclusions.trim()) {
    y = paragraph(doc, `Conclusiones del estudiante: ${attempt.conclusions.trim()}`, y + 4, margin, pageW)
  }

  // Fuente y aviso
  y = ensureSpace(doc, y, 90)
  y = heading(doc, 'Referencias bibliográficas', y + 6, margin)
  y = paragraph(doc, `Fuente de la práctica: ${meta.source}`, y, margin, pageW)
  if (meta.bibliography?.length) {
    for (const b of meta.bibliography) y = paragraph(doc, `• ${b}`, y, margin, pageW)
  } else {
    y = paragraph(doc, 'La ficha no incluye bibliografía: pendiente de completar con el docente.', y, margin, pageW)
  }
  doc.setTextColor(120, 53, 15)
  paragraph(doc, module.disclaimer, y + 4, margin, pageW)

  // Pie de página
  const pages = doc.getNumberOfPages()
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    if (i > 1) {
      // Encabezado en todas las páginas
      doc.setFillColor(15, 61, 94).rect(0, 0, pageW, 30, 'F')
      doc.setTextColor(255, 255, 255).setFont('helvetica', 'bold').setFontSize(9)
      doc.text(`${UNIVERSITY} · Laboratorios Virtuales`, margin, 19)
      doc.setFont('helvetica', 'normal')
      doc.text(`Práctica ${meta.number ?? ''}`.trim(), pageW - margin, 19, { align: 'right' })
    }
    doc.setFont('helvetica', 'normal').setFontSize(8).setTextColor(100, 116, 139)
    doc.text(`${UNIVERSITY} · ${info.fullName} · ${meta.title}`.slice(0, 110), margin, doc.internal.pageSize.getHeight() - 24)
    doc.text(`Página ${i} de ${pages}`, pageW - margin, doc.internal.pageSize.getHeight() - 24, { align: 'right' })
  }
  return doc
}

const slug = (t: string, max = 40) => t.normalize('NFD').replace(/\p{M}/gu, '').replace(/[^\p{L}\p{N}]+/gu, '_').replace(/^_+|_+$/g, '').slice(0, max)

/** Nombre sugerido: ECOTEC_Practica_[numero]_[asignatura]_[estudiante].pdf */
export function reportFileName(module: PracticeModule, info: ReportInfo): string {
  return `ECOTEC_Practica_${module.meta.number ?? module.meta.id}_${slug(info.subject, 30)}_${slug(info.fullName)}.pdf`
}

/** Genera el PDF en el navegador y lo descarga; no se envía a ningún servidor. */
export function downloadReport(attempt: Attempt, module: PracticeModule, info: ReportInfo): void {
  const blob = buildReport(attempt, module, info).output('blob')
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = reportFileName(module, info)
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/* ------------------------------ utilidades ------------------------------ */

function lastY(doc: jsPDF): number {
  return (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY
}

function heading(doc: jsPDF, text: string, y: number, margin: number): number {
  doc.setTextColor(15, 61, 94).setFont('helvetica', 'bold').setFontSize(12)
  doc.text(text, margin, y)
  doc.setTextColor(15, 23, 42)
  return y + 14
}

function paragraph(doc: jsPDF, text: string, y: number, margin: number, pageW: number): number {
  doc.setFont('helvetica', 'normal').setFontSize(10)
  const lines = doc.splitTextToSize(text, pageW - margin * 2) as string[]
  const pageH = doc.internal.pageSize.getHeight()
  for (const line of lines) {
    if (y > pageH - 50) {
      doc.addPage()
      y = 60
    }
    doc.text(line, margin, y)
    y += 13
  }
  return y + 2
}

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > doc.internal.pageSize.getHeight() - 50) {
    doc.addPage()
    return 60
  }
  return y
}
