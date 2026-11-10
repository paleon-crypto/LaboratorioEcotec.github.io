import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from '../App'
import { practices } from '../data/catalog'
import { computeGrade } from '../core/scoring'
import { createInitialState, perform as enginePerform, startRun } from '../core/engine'
import type { Attempt } from '../core/types'
import practice from '../practices/bioquimica-p7'
import { buildReport, reportFileName } from '../services/pdfReport'


const go = (path: string) => { window.location.hash = `#${path}` }
const open = (path: string) => {
  go(path)
  return render(<App />)
}

describe('acceso único de estudiante', () => {
  it('la bienvenida ofrece solo «Ingresar como estudiante»', async () => {
    open('/')
    expect(await screen.findByRole('link', { name: /Ingresar como estudiante/ })).toBeInTheDocument()
    expect(screen.queryByText(/docente/i, { selector: 'button, a, h1, h2' })).not.toBeInTheDocument()
    expect(screen.queryByText(/administrador/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Cerrar sesión|Registrarse/i)).not.toBeInTheDocument()
  })

  it('las rutas de docente y administración ya no existen', async () => {
    for (const route of ['/docente', '/admin', '/informes', '/login']) {
      document.body.innerHTML = ''
      open(route)
      expect(await screen.findByRole('link', { name: /Ingresar como estudiante/ })).toBeInTheDocument()
    }
  })
})

describe('recorrido del estudiante', () => {
  it('bienvenida → carrera → asignatura → catálogo → práctica', async () => {
    const user = userEvent.setup()
    open('/')
    await user.click(await screen.findByRole('link', { name: /Ingresar como estudiante/ }))
    // Siete carreras previstas
    for (const n of ['Enfermería', 'Medicina', 'Nutrición', 'Fisioterapia', 'Odontología', 'Psicología', 'Medicina Veterinaria']) {
      expect(await screen.findByRole('heading', { name: n })).toBeInTheDocument()
    }
    await user.click(screen.getByRole('link', { name: /Enfermería/ }))
    expect(await screen.findByRole('heading', { name: 'Biología Celular y Molecular' })).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: /Biología Celular y Molecular/ }))
    expect(await screen.findByText(/13 práctica\(s\) encontrada/)).toBeInTheDocument()
    await user.click(screen.getAllByRole('link', { name: /Iniciar práctica/ })[0])
    expect(await screen.findByRole('button', { name: /Iniciar práctica/ })).toBeInTheDocument()
  })

  it('una carrera sin prácticas muestra «Próximamente»', async () => {
    const user = userEvent.setup()
    open('/carreras')
    await user.click(await screen.findByRole('link', { name: /Psicología/ }))
    expect(await screen.findByText(/Próximamente/)).toBeInTheDocument()
  })

  it('el catálogo muestra las 31 prácticas y filtra por carrera', async () => {
    const user = userEvent.setup()
    open('/catalogo')
    expect(await screen.findByText(/31 práctica\(s\) encontrada/)).toBeInTheDocument()
    expect(practices).toHaveLength(31)
    expect(screen.getAllByText(/Pendiente de validar con la ficha/)).toHaveLength(practices.filter((p) => !p.meta.validated).length)
    await user.selectOptions(screen.getByLabelText('Carrera'), 'psicologia')
    expect(await screen.findByText(/0 práctica\(s\) encontrada/)).toBeInTheDocument()
    await user.selectOptions(screen.getByLabelText('Carrera'), 'medicina')
    expect(await screen.findByText(/17 práctica\(s\) encontrada/)).toBeInTheDocument()
  })
})

describe('práctica completa de Bioquímica (clic en lugar de arrastrar)', () => {
  it('realiza las dos mediciones, interpreta, evalúa y genera informe', async () => {
    const user = userEvent.setup()
    open('/practica/bioquimica-p7')

    await user.click(await screen.findByRole('button', { name: /Iniciar práctica/ }))

    const useOn = async (item: string | RegExp, target: string | RegExp) => {
      await user.click(screen.getByRole('button', { name: item }))
      await user.click(screen.getByRole('button', { name: target }))
    }

    // Un error a propósito: usar la lanceta antes de lavarse las manos
    for (let i = 0; i < 6; i++) await user.click(screen.getAllByRole('button', { name: 'Usar' })[0])
    await useOn('Lanceta', /sobre: Dedo/)
    expect(screen.getAllByText(/fuera de orden/i)[0]).toBeInTheDocument()

    const round = async () => {
      if (screen.queryAllByRole('button', { name: 'Usar' }).length) {
        for (let i = 0; i < 6; i++) await user.click(screen.getAllByRole('button', { name: 'Usar' })[0])
      }
      await user.click(screen.getByRole('button', { name: 'Lavar con agua y jabón' }))
      await user.click(screen.getByRole('button', { name: 'Secar completamente' }))
      await useOn('Tira reactiva', /sobre: Gluc/)
      await user.click(screen.getByRole('button', { name: 'Preparar lanceta' }))
      await useOn('Alcohol', 'Algodón')
      await useOn('Algodón con alcohol', /sobre: Dedo/)
      await useOn('Lanceta', /sobre: Dedo/)
      await useOn('Gota de sangre', /sobre: Gluc/)
      await new Promise((r) => setTimeout(r, 2800))
      await user.click(await screen.findByRole('button', { name: 'Leer resultado' }))
      await useOn('Algodón con alcohol', /sobre: Dedo/) // detener el sangrado
      await useOn('Lanceta', /sobre: Recipiente/)
      await useOn('Tira usada', /sobre: Recipiente/)
      await useOn('Algodón con alcohol', /sobre: Recipiente/)
      const screenText = within(screen.getByRole('status', { name: 'Pantalla del glucómetro' })).getByText(/^\d+$/).textContent!
      // un valor incorrecto primero
      const input = screen.getByLabelText(/Registro de resultados/)
      await user.type(input, String(Number(screenText) + 1))
      await user.click(screen.getByRole('button', { name: 'Registrar' }))
      expect(screen.getAllByText(/no coincide/i)[0]).toBeInTheDocument()
      await user.clear(input)
      await user.type(input, screenText)
      await user.click(screen.getByRole('button', { name: 'Registrar' }))
    }

    await round()
    await waitFor(() => expect(screen.getByText(/Medición «Glucemia en ayunas» completada/)).toBeInTheDocument())
    await round()

    // Resultados e interpretación
    expect((await screen.findAllByText(/¿Cómo clasificas/, {}, { timeout: 4000 })).length).toBe(2)
    const groups = screen.getAllByRole('group')
    expect(groups.length).toBeGreaterThanOrEqual(2)
    for (const g of groups.filter((x) => x.tagName === 'FIELDSET')) {
      await user.click(within(g).getAllByRole('radio')[0])
    }
    expect(screen.getAllByText(/Interpretación automática/).length).toBeGreaterThanOrEqual(2)
    await user.click(screen.getByRole('button', { name: /Continuar a la evaluación/ }))

    // Evaluación: enviar sin responder muestra aviso
    await user.click(await screen.findByRole('button', { name: /Enviar evaluación/ }))
    expect(screen.getByRole('alert')).toHaveTextContent(/pendientes/)
    for (const fs of screen.getAllByRole('group')) {
      const radios = within(fs).queryAllByRole('radio')
      if (radios.length) await user.click(radios[0])
    }
    await user.type(screen.getAllByRole('textbox')[0], 'Respuesta abierta de prueba')
    await user.click(screen.getByRole('button', { name: /Enviar evaluación/ }))
    expect(await screen.findByText('Evaluación enviada.')).toBeInTheDocument()
    expect(screen.getAllByText(/Criterios que revisará el docente/).length).toBe(2)
    await user.click(screen.getByRole('button', { name: /Continuar al informe/ }))

    // Informe
    expect(await screen.findByText('Resumen de la evaluación')).toBeInTheDocument()
    expect(screen.getByText('Provisional')).toBeInTheDocument()

    // Datos del estudiante: son obligatorios y se revisan antes de generar el PDF
    const downloads: { name: string; blob: Blob }[] = []
    let lastBlob: Blob | null = null
    URL.createObjectURL = vi.fn((b: Blob) => { lastBlob = b; return 'blob:test' })
    URL.revokeObjectURL = vi.fn()
    const spy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      downloads.push({ name: this.download, blob: lastBlob as unknown as Blob })
    })
    const readBlob = (b: Blob) => new Promise<string>((res) => { const r = new FileReader(); r.onload = () => res(String(r.result)); r.readAsText(b) })
    expect(screen.queryByRole('button', { name: /GENERAR INFORME PDF/ })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Revisar datos/ }))
    expect(screen.getByRole('alert')).toHaveTextContent(/Nombres y apellidos.*Docente/)
    await user.type(screen.getByLabelText('Nombres y apellidos'), 'Maria Test Lopez')
    await user.type(screen.getByLabelText('Docente'), 'Docente Prueba')
    await user.type(screen.getByLabelText(/Tus observaciones/), 'Observacion de prueba')
    await user.click(screen.getByRole('button', { name: /Revisar datos/ }))
    expect(await screen.findByText(/Revisa tus datos/)).toBeInTheDocument()
    expect(screen.getByText(/ECOTEC_Practica_7_Bioqu.*mica_Maria_Test_Lopez\.pdf/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /GENERAR INFORME PDF/ }))
    expect(downloads).toHaveLength(1)
    expect(downloads[0].name).toBe('ECOTEC_Practica_7_Bioquimica_Maria_Test_Lopez.pdf')
    const pdfText = await readBlob(downloads[0].blob)
    expect(pdfText.startsWith('%PDF-')).toBe(true)
    expect(pdfText).toContain('Maria Test Lopez')
    expect(pdfText).toContain('Docente Prueba')
    expect(pdfText).toContain('Observacion de prueba')
    spy.mockRestore()

    // Nada se almacena en el navegador
    expect(localStorage.length).toBe(0)
    expect(sessionStorage.length).toBe(0)
    expect(document.cookie).toBe('')
  }, 40_000)

  it('reiniciar la práctica vuelve al paso 1', async () => {
    const user = userEvent.setup()
    open('/practica/bioquimica-p7')
    await user.click(await screen.findByRole('button', { name: /Iniciar práctica/ }))
    for (let i = 0; i < 6; i++) await user.click(screen.getAllByRole('button', { name: 'Usar' })[0])
    expect(screen.getByText(/Paso 2 de 6/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Reiniciar práctica/ }))
    await user.click(screen.getByRole('button', { name: /Sí, reiniciar/ }))
    expect(screen.getByText(/Paso 1 de 6/)).toBeInTheDocument()
  })
})

describe('informe PDF', () => {
  const finishedAttempt = (): Attempt => {
    let eng = startRun(createInitialState(practice, 'a', 7), 0)
    eng = enginePerform(practice, eng, 'no-existe', undefined, 5) // un error
    return {
      id: 'x', practiceId: practice.meta.id, scenarioId: 'a', status: 'completed', startedAt: 0, finishedAt: 1,
      errors: eng.errors, results: [], completedSteps: eng.completedSteps, log: eng.log, interpretation: {},
      quizAnswers: { [practice.quiz.questions[0].id]: 'zzz' }, quizSubmitted: true, openGrade: null,
      conclusions: 'Conclusion de prueba', observations: 'Observacion de prueba', weightsUsed: practice.defaultWeights,
    }
  }
  const info = { fullName: 'Maria Test Lopez', career: 'Medicina', subject: 'Bioquímica', teacher: 'Docente Prueba', date: '2025-07-09' }

  it('incluye los datos del estudiante, las secciones pedidas y el nombre sugerido', () => {
    const doc = buildReport(finishedAttempt(), practice, info)
    const text = doc.output()
    for (const t of ['Maria Test Lopez', 'Docente Prueba', 'Medicina', 'Fundamento te', 'Materiales y equipos', 'Respuestas de la evaluaci', 'Observaciones', 'Conclusiones', 'Referencias bibliogr', 'SIMULADOS']) {
      expect(text, t).toContain(t)
    }
    expect(doc.getNumberOfPages()).toBeGreaterThanOrEqual(2)
    expect(doc.output('arraybuffer').byteLength).toBeGreaterThan(3000)
    expect(text.startsWith('%PDF-')).toBe(true)
    expect(reportFileName(practice, info)).toBe('ECOTEC_Practica_7_Bioquimica_Maria_Test_Lopez.pdf')
  })

  it('numera las páginas y repite el encabezado', () => {
    const doc = buildReport(finishedAttempt(), practice, info)
    const text = doc.output()
    expect(text).toContain('Página 1 de')
    expect(text).toContain(`Página ${doc.getNumberOfPages()} de ${doc.getNumberOfPages()}`)
  })

  it('la calificación del procedimiento se calcula sin almacenar nada', () => {
    const a = finishedAttempt()
    expect(computeGrade(a, practice).breakdown.length).toBeGreaterThan(0)
    expect(localStorage.length + sessionStorage.length).toBe(0)
  })
})
