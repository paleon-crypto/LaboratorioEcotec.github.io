import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { StudentProvider } from './context/StudentContext'
import CareerSubjects from './pages/CareerSubjects'
import Careers from './pages/Careers'
import Catalog from './pages/Catalog'
import PracticeLab from './pages/PracticeLab'
import Welcome from './pages/Welcome'

/**
 * Plataforma solo para estudiantes, sin cuentas ni almacenamiento.
 * HashRouter: las rutas funcionan al recargar en GitHub Pages sin configuración del servidor.
 */
export default function App() {
  return (
    <StudentProvider>
      <HashRouter>
        <Routes>
          <Route index element={<Welcome />} />
          <Route element={<Layout />}>
            <Route path="carreras" element={<Careers />} />
            <Route path="carreras/:careerId" element={<CareerSubjects />} />
            <Route path="catalogo" element={<Catalog />} />
            <Route path="practica/:id" element={<PracticeLab />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </StudentProvider>
  )
}
