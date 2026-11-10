# Laboratorios Virtuales ECOTEC

Plataforma web de prácticas de laboratorio virtuales (React + TypeScript + Vite + Tailwind CSS, Lucide, Recharts, jsPDF).
Versión 1 demostrativa: datos locales en el navegador y arquitectura lista para conectar backend (Node + PostgreSQL).

## Instalación y ejecución

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # pruebas (lógica, flujo completo de la práctica, roles, PDF)
npm run build      # compilación de producción en dist/
npm run preview    # sirve dist/
```

Entra eligiendo un perfil de demostración (estudiante, docente o administrador); no se piden credenciales.

## Qué incluye

- Dashboard, carreras y asignaturas, catálogo con filtros.
- Entorno de laboratorio 2D interactivo (arrastrar y soltar, o seleccionar y pulsar: accesible por teclado).
- **Bioquímica – Práctica 7**: glucómetro, tiras, lancetas, algodón, alcohol y cortopunzantes; glucemia en ayunas y posprandial; registro, interpretación automática, evaluación (múltiple, V/F, abierta), informe PDF.
- **Otras prácticas de la ficha** (Bioquímica): P2 gravedad específica de la orina (refractómetro), P5 clasificación de carbohidratos (Molisch, Barfoed, Seliwanoff, Lugol), P6 hidrólisis del almidón, P8 proteínas (Biuret, xantoproteica), P10 lípidos (Sudán III, papel filtro, solubilidad), P11 marcadores de lípidos (informe evaluado por el docente), P12 y P13 manejo de dispositivos (extracción de sangre, centrífuga, baño maría, micropipetas; la ficha 13 es idéntica a la 12) y P14 vitaminas (solubilidad y yodo). Las prácticas de procedimiento usan la plantilla `src/core/protocolBench.tsx`. P5/6/8/10 comparten una plantilla de tubos de ensayo (`src/core/tubeLab.tsx`).
- Panel docente: resultados, calificación de preguntas abiertas, ponderación configurable.
- Administración de contenidos: estado de validación de cada módulo.

## Arquitectura

```
src/core/        motor de simulación (puro), tipos, calificación ponderada
src/practices/   un módulo por práctica (config, quiz, escena). Se registran solos.
src/data/        carreras, asignaturas, usuarios demo
src/services/    Repository (local hoy, API REST mañana), PDF, datos demo
src/pages/       pantallas · src/components/ interfaz compartida
database/        schema.sql propuesto · docs/API.md contrato REST
```

Agregar una práctica: copiar `src/practices/bioquimica-p7` (o, si es de tubos de ensayo, `bioquimica-p5` con la plantilla `tubePractice`), completar `config.ts` y `quiz.ts` con la ficha oficial.
El catálogo, el panel docente y los informes la incorporan automáticamente.

## Contenido académico (Práctica 7)

El módulo sigue la **ficha VAC-FOR-006 (Rev. 01), práctica N°7**: datos generales (1 h 20), objetivo, resultado de aprendizaje,
fundamentación, insumos y equipos, procedimiento, valores de referencia, rúbrica y bibliografía.

Procedimiento simulado (paso 1 de la ficha, «reunirse en grupos», queda fuera del simulador):
preparar materiales → lavado de manos con agua y jabón y secado → tira en el glucómetro, lanceta preparada y dedo limpio con alcohol →
punción, sangre en la tira y espera del resultado → detener sangrado y desechar materiales usados → registrar el valor con fecha y hora.

Valores de referencia (únicos que usa el sistema): ayunas <100 normal, 100–125 prediabetes, ≥126 umbral de diabetes;
posprandial <140 normal, ≥200 umbral de diabetes; 140–199 se informa como «no especificado en la ficha».

## Pendientes por confirmar con ECOTEC

- **Ficha corregida:** el contenido sigue la ficha corregida (carrera Medicina, docente María Gracia Yturralde, Laboratorio de nutrición). Todas las prácticas están asociadas a Medicina.
- **Banco de preguntas:** redactado a partir de la ficha; debe revisarlo el docente.
- **Desecho de tira y algodón usados:** la ficha solo menciona el recipiente de cortopunzantes; se usa ese.
- Los perfiles de «sujeto simulado» generan valores ilustrativos, no clínicos.
- Identidad visual provisional: reemplazar colores en `src/index.css` y el logo con los oficiales.
- Los registros marcados «demo» del panel docente son datos ficticios.
- El nombre «Universidad ECOTEC» del informe no figura en la ficha (solo «Vicerrectorado Académico»): confirmar.
- **Prácticas no incorporadas** (la ficha no trae datos suficientes o no son simulables sin inventar resultados): P1 (bioseguridad, sin resultados medibles), P3, P4 y P9. Se pueden agregar al entregar la información faltante.
- **P8 (proteínas) sin validar:** la ficha no indica el resultado de la gelatina en xantoproteica; se asumió presencia de aminoácidos aromáticos en clara y leche; el paso 1 de la ficha parece copiado de otra práctica.
- **P5:** se excluyeron las soluciones tónicas y no se simula Benedict (la ficha no da sus resultados).
- **P5:** la ficha corregida ya no lista el almidón entre los insumos pero lo sigue usando en el procedimiento; confirmar su concentración.
- **P2 sin validar:** la ficha no incluye los rangos normales de gravedad específica; no hay interpretación automática y los valores son ilustrativos.
- Numeración de la ficha con anomalías (la práctica 14 aparece numerada 9 y hay una 13 duplicada): confirmar.

Simulador educativo: no constituye una herramienta de diagnóstico clínico.

- **P11:** la ficha no trae valores de referencia ni los exámenes simulados; el contenido se evalúa con preguntas abiertas que califica el docente.
- **P14:** la ficha no describe colores, olores ni el resultado del yodo con vitamina C; no se simulan. En la ficha figura numerada «9».
- **P12/P13:** contenido idéntico en la ficha; confirmar si es un duplicado.

## Farmacología Básica (Medicina)

Siete prácticas de la «Guía práctica de farmacología básica» (docente MD. Erik Gabriel Barberán Alcívar, MSc.; Laboratorio de farmacología):

1. Inducción al laboratorio y simulación en farmacología.
2. Formas farmacéuticas y soluciones parenterales (cálculo de gramos y volúmenes por concentración %).
3. Canalización de vía venosa periférica (9 pasos con orden obligatorio y errores típicos).
4. Curvas farmacocinéticas oral / IM / IV (curvas ilustrativas).
5. Metabolismo y excreción: casos hepático y renal (respuestas abiertas calificadas por el docente).
6. Antagonismo farmacológico (curvas dosis-respuesta ilustrativas).
7. Integración PD/PK: velocidad de goteo y balance hídrico (caso ilustrativo).

Usan la plantilla `src/core/protocolBench.tsx` (tablero de acciones, ejercicios de cálculo y gráfico opcional).

**Importante:** la guía no incluye curvas, datos de casos clínicos, dosis ni factores de goteo. Todo valor numérico de P2, P4, P6 y P7 es ilustrativo y está marcado así en la práctica y en el informe. Las prácticas 2, 4, 5, 6 y 7 quedan «Pendientes de validar». El objetivo de la práctica 4 en la guía contiene texto de otra sección (se redactó a partir del título y los resultados de aprendizaje).

### Paciente virtual (estilo simulador clínico)

`src/core/patientPanel.tsx` + `protocolPractice({ patient, Stage, scenarios, rules })` añaden a cualquier práctica de procedimiento: caso clínico por escenario, monitor de signos vitales que cambia con las acciones, escena visual del paciente (`Stage`, un SVG que reacciona a cada paso), alertas clínicas ante errores y registro de eventos. Se usa en F3 (canalización: antebrazo, catéter por color de calibre, flashback, fijación, infusión; dos casos que exigen distinto calibre) y en F7 (bolsa y cámara de goteo). Para reutilizarlo en otra práctica basta definir su `PatientSpec` (caso, signos, textos del registro) y, opcionalmente, un `Stage`. Los signos vitales y los casos son ilustrativos y deben validarse con el docente.

### Arrastrar y soltar / seleccionar y pulsar (`dnd`)

`protocolPractice` acepta la opción `dnd` (reutilizable): una bandeja de elementos y zonas sobre la escena del paciente.
Se arrastra el elemento a la zona, o se selecciona (clic o teclado) y se pulsa la zona. El mapa `elemento->zona` indica la
acción del motor; las combinaciones no listadas cuentan como error. Ejemplo: `src/practices/farmacologia-p3/index.ts`.

Cada elemento de `dnd` admite `icon` (ReactNode, p. ej. ilustraciones SVG) o `image` (URL/ruta en `public/`) para usar fotos reales de los materiales. Las prácticas con paciente virtual usan `wideBench`: escena y bandeja a la izquierda, monitor de signos al costado.

### Enfermería Básica y Seguridad del Paciente (carrera Enfermería)

- **P15** Administración de medicamentos por vía intravenosa y canalización de vía periférica (`src/practices/enfermeria-p15`). Reutiliza el paciente virtual, el arrastrar y soltar y la escena del antebrazo de Farmacología P3.
- Marcada como «pendiente de validar»: la ficha no enumera los «10 correctos», no da criterios de calibre (G18–G24) ni datos para el cálculo de infusión (se usan valores ilustrativos: 500 mL en 4 h, 20 gotas/mL) y su bibliografía está vacía.

### Auditoría y rediseño interactivo (noviembre 2026)

- Las prácticas de procedimiento (`protocolPractice`) muestran sus acciones como tarjetas con icono (`src/core/actionIcons.tsx`) y estado, y admiten simulaciones propias mediante `Extra`, `Stage` y `dnd`.
- Simulaciones: Farmacología P1 (vestidor, lavado de manos, plano), P2 (frascos y gráfico de concentración), P3 y Enfermería P15 (paciente virtual, arrastrar y soltar), P5 (esquema hígado/riñón), P7 (goteo); Bioquímica P11 (informe de laboratorio), P12/P13 (centrífuga, baño maría, micropipeta, extracción).
- Las prácticas de tubos (Bioquímica P5, P6, P8, P10, P14) y Bioquímica P2/P7 ya contaban con escena visual.
- Todo dato que la ficha no incluye está rotulado como ilustrativo o pendiente de validación.

## Biología Celular y Molecular (Enfermería, 12 prácticas)

Fuente: «Ficha práctica – Biología Celular y Molecular» (VAC-FOR-006, docente Mgs. Héctor Gavilanes Pinela, Ordinario 1-2025). Prácticas `biologia-p1` … `biologia-p12`: bioseguridad, micropipetas, microscopio, células vegetales, mucosa bucal, tinción de Gram, Wright, ósmosis en eritrocitos, uniones de anclaje, tipificación sanguínea (casos ilustrativos), mitosis y extracción de ADN.

Componentes reutilizables (`src/core`): `microscope.tsx` (objetivos, enfoque, luz, desplazamiento), `classify.tsx` (arrastrar o seleccionar y pulsar), `identify.tsx` (rótulos sobre esquema), `actionIcons.tsx`. Todas están `validated:false`: las imágenes y datos son esquemáticos/ilustrativos; ver `validationNotes` de cada práctica (numeración de la ficha, bibliografía cortada, reactivos de Gram, etc.).

### Práctica 13 · Osmolaridad y fragilidad osmótica de los glóbulos rojos
Añadida desde el documento Word adjunto (`biologia-p13`, 5 partes: láminas, toma de muestra capilar, cubreobjetos, observación B→A→C a 10×/40× y registro e interpretación). Sin docente, fecha ni bibliografía en el documento: queda `validated:false`. Las prácticas pueden dividirse en partes con la opción `parts` de `protocolPractice` (ver Gram, P6, y P13).


## Arquitectura actual: plataforma solo para estudiantes, sin almacenamiento

- Un único acceso («Ingresar como estudiante») → carrera → asignatura → catálogo → práctica. No hay cuentas, docentes, administradores, base de datos ni backend.
- Todo el estado vive en memoria (React). No se usa `localStorage`, `sessionStorage`, IndexedDB ni cookies; al cerrar o actualizar la página el progreso y los datos se pierden. Un test (`src/test/privacy.test.ts`) lo verifica sobre el código fuente.
- Informe: el estudiante completa nombres, carrera, asignatura, docente y fecha, los revisa y pulsa «GENERAR INFORME PDF». El PDF se arma en el navegador (jsPDF) y se descarga como `ECOTEC_Practica_[n]_[asignatura]_[estudiante].pdf`. No se envía a ningún sitio.
- La calificación (automática) se muestra al finalizar y se incluye en el PDF; las preguntas abiertas las revisa el docente fuera de la plataforma.
- Rutas con `HashRouter` y `base: './'` (por ejemplo `#/practica/biologia-p6`): funcionan en GitHub Pages, también al recargar.
- Eliminado: `AuthContext`, `users`, `Login`, `Dashboard`, `Teacher`, `Admin`, `MyReports`, `services/` (repositorios y semilla), `useAttempts`, `database/`, `docs/`, `vercel.json`.
