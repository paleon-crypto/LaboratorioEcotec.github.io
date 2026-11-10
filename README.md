# Laboratorios Virtuales ECOTEC

Plataforma educativa de prácticas virtuales para estudiantes de las carreras de la Facultad de Ciencias de la Salud y Desarrollo Humano de la Universidad ECOTEC. Está construida con React, TypeScript, Vite y Tailwind CSS.

## Alcance de esta versión

- Acceso único para estudiantes, sin cuentas de docentes ni administradores.
- Selección de carrera, asignatura y práctica.
- Simulaciones interactivas, ejercicios y evaluación formativa.
- Generación y descarga local de informes PDF mediante jsPDF.
- Sin backend ni base de datos.
- El estado de la práctica y los datos de identificación se mantienen en memoria durante la sesión; no se guardan en el navegador ni se transmiten a un servidor.

La plataforma es un recurso educativo y **no constituye una herramienta de diagnóstico ni sustituye los protocolos institucionales o la supervisión docente**. Los contenidos señalados como ilustrativos o pendientes de validación deben ser revisados por los docentes responsables antes de su uso académico definitivo.

## Prácticas incluidas

El código fuente contiene 31 módulos de prácticas:

- **Biología Celular y Molecular:** 13 módulos (`biologia-p1` a `biologia-p13`).
- **Bioquímica:** módulos P2, P5, P6, P7, P8 y P10 a P14.
- **Farmacología Básica:** 7 módulos (`farmacologia-p1` a `farmacologia-p7`).
- **Enfermería Básica y Seguridad del Paciente:** P15.

Las fichas y notas de validación de cada módulo deben considerarse la referencia para la revisión académica. No se deben interpretar los datos ilustrativos como valores clínicos reales.

## Requisitos

- Node.js **24.15.0 o superior**.
- npm incluido con Node.js.

## Instalación y ejecución local

```bash
npm ci
npm run dev
```

Para comprobar el proyecto:

```bash
npm test
npm run build
npm run preview
```

La compilación de producción se genera en `dist/`.

## Publicación en GitHub Pages

El proyecto utiliza `HashRouter` y `base: './'`, por lo que las rutas de la aplicación funcionan bajo la URL de un repositorio de GitHub Pages.

1. En GitHub, abrir **Settings → Pages**.
2. En **Build and deployment → Source**, seleccionar **GitHub Actions**.
3. Guardar. El flujo `.github/workflows/deploy.yml` compila el proyecto y publica `dist/` cuando se actualiza `main` o se ejecuta manualmente.

URL prevista para este repositorio: <https://paleon-crypto.github.io/Laboratorio.github.io/>.

## Estructura principal

```text
src/
  components/   componentes compartidos
  context/      estado temporal del estudiante
  core/         motor, tipos y componentes reutilizables
  data/         catálogo de carreras y asignaturas
  pages/        navegación y pantallas de prácticas
  practices/    módulos de las 31 prácticas
  services/     generación local de informes PDF
  test/         pruebas automatizadas
public/         recursos estáticos
.github/        flujo de publicación
```

## Privacidad

La prueba `src/test/privacy.test.ts` comprueba que el código fuente no utilice almacenamiento persistente del navegador, cookies, solicitudes de red ni módulos de autenticación o administración. Los informes PDF se generan en el dispositivo del estudiante y este los entrega manualmente por el canal académico que corresponda.

## Estado de validación académica

La presencia de un módulo en el catálogo no implica que haya sido aprobado académicamente. Cada práctica conserva sus observaciones y marcas de validación en el código. Los docentes responsables deben revisar procedimientos, materiales, reactivos, resultados, rangos, bibliografía y cualquier dato ilustrativo antes de autorizar su aplicación.
