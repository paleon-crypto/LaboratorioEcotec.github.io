import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import DevicesExtra from '../practices/devicesExtra'
import type { EngineState } from '../core/types'

const st = (stepIndex: number, doneActions: string[] = []) => ({ status: 'running', stepIndex, data: { doneActions } }) as unknown as EngineState

describe('simulaciones de dispositivos (P12/P13)', () => {
  it('la centrífuga exige un rotor balanceado antes de confirmar', () => {
    const perform = vi.fn()
    render(<DevicesExtra state={st(5)} perform={perform} disabled={false} />)
    fireEvent.click(screen.getByText('Confirmar balanceo'))
    expect(screen.getByRole('alert')).toBeTruthy()
    expect(perform).not.toHaveBeenCalled()
    for (const n of [4, 5, 6]) fireEvent.click(screen.getByLabelText(`Ranura ${n}: vacía`))
    fireEvent.click(screen.getByText('Confirmar balanceo'))
    expect(perform).toHaveBeenCalledWith('balance')
  })
  it('el baño maría envía las acciones de temperatura y tiempo de la ficha', () => {
    const perform = vi.fn()
    render(<DevicesExtra state={st(7)} perform={perform} disabled={false} />)
    fireEvent.click(screen.getByText('37 ºC'))
    fireEvent.click(screen.getByText('20 min'))
    expect(perform).toHaveBeenCalledWith('temp:37')
    expect(perform).toHaveBeenCalledWith('time:20')
  })
  it('la micropipeta ofrece 10, 100 y 1000 μL', () => {
    render(<DevicesExtra state={st(8)} perform={vi.fn()} disabled={false} />)
    for (const v of ['10 μL', '100 μL', '1000 μL']) expect(screen.getByText(v)).toBeTruthy()
  })
})
