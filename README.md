# 🇪🇨 Índice de Digitalización del Ecuador (IDE)

Dashboard web interactivo que visualiza el avance de la transformación digital del Ecuador entre 2020 y 2024, incluyendo proyecciones estadísticas para 2025 y 2026.

---

## ¿Qué es el IDE?

El **Índice de Digitalización del Ecuador (IDE)** es un índice compuesto multidimensional que mide no solo si existe infraestructura digital en el país, sino también si esa infraestructura se usa realmente y cómo se integra en la economía.

Se construye combinando tres grandes dimensiones:

| Dimensión | Sigla | Peso en el IDE |
|-----------|-------|----------------|
| Digitalización del Estado | EGDI | 40% |
| Acceso e infraestructura digital | ACC | 25% |
| Digitalización económica y de pagos | SED | 35% |

**Fórmula:**
```
IDE = 0.4 × EGDI + 0.25 × ACC + 0.35 × SED
```

Todos los indicadores están normalizados en escala **0 a 1** para poder compararlos entre sí.

---

## 📊 Dimensiones del índice

### 1. EGDI — E-Government Development Index (40%)

Mide el nivel de gobierno electrónico del Ecuador. Proviene del informe de **Naciones Unidas** y se publica cada dos años. Tiene tres subíndices:

- **OSI** — Calidad y disponibilidad de servicios públicos digitales
- **TII** — Infraestructura de telecomunicaciones
- **HCI** — Capital humano y capacidades educativas

> Los años 2021 y 2023 se estimaron por interpolación simple (promedio del año anterior y siguiente) porque el informe de la ONU solo se publica en años pares.

---

### 2. ACC — Acceso y Conectividad (25%)

Mide la capacidad real de la población para acceder a lo digital. Se calcula como el promedio de seis variables del **INEC**:

| Variable | Significado |
|----------|-------------|
| ETH | Hogares con computadora, laptop o tablet |
| HAI | Hogares con acceso a internet |
| PUI | Personas que usaron internet (últimos 12 meses) |
| PCA | Personas con celular activado |
| PTI | Personas con smartphone |
| AD | Alfabetismo digital (100 − % de analfabetismo digital) |

```
ACC = (ETH + HAI + PUI + PCA + PTI + AD) / 6
```

> El año 2021 fue interpolado por ausencia de datos completos.

---

### 3. SED — Subíndice Económico Digital (35%)

Mide la digitalización en la economía real. Combina dos indicadores:

**Grado de Desarrollo (GD) — 40% del SED**
Relación entre el sistema de pagos interbancarios y el PIB. Mide la profundidad estructural del sistema de pagos digitales. Normalizado con Min-Max:
```
GD_norm = (GD − 115.37) / (139.55 − 115.37)
```

**Índice de Digitalización Transaccional (IDT) — 60% del SED**
Proporción de transacciones digitales sobre el total de transacciones financieras:
```
IDT = Transacciones Digitales / Transacciones Totales
```

Los canales digitales incluyen: banca celular, internet, plataforma de pagos móviles, POS crédito, POS débito, POS prepago y terminal autoservicio. Se excluyen cajeros, ventanillas y corresponsales no bancarios porque implican intervención física.

```
SED = 0.6 × IDT + 0.4 × GD_norm
```

---

## 🔮 Predicción 2025–2026

Las proyecciones se calculan con **Regresión Lineal por Mínimos Cuadrados (OLS)**, aplicada sobre los 5 puntos históricos (2020–2024).

**¿Por qué OLS?**

- La serie es corta (n=5), lo que descarta modelos más complejos como ARIMA sin riesgo de sobreajuste
- Las tendencias observadas son aproximadamente lineales en todas las series
- Es transparente, reproducible y estándar en análisis de índices compuestos

**Fórmula:**
```
ŷ = β₀ + β₁ × (año − 2020)
```

El dashboard muestra los parámetros del modelo (β₀, β₁, R²) y un **intervalo de confianza del 95%** visualizado como banda sombreada.

> ⚠️ Los valores de 2025 y 2026 son proyecciones estadísticas basadas en tendencias históricas. No constituyen datos oficiales.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| **React 18** | Framework principal de UI |
| **Vite** | Bundler y servidor de desarrollo |
| **Tailwind CSS v3.4.4** | Estilos y diseño del dashboard |
| **Recharts** | Gráficos estadísticos interactivos |
| **JavaScript (ES6+)** | Lógica del modelo predictivo OLS |

> **Nota:** Se usa Tailwind CSS v3.4.4 específicamente porque versiones más nuevas tienen incompatibilidades con Node v24.

---

## 📁 Estructura del proyecto

```
ide-ecuador/
├── public/
├── src/
│   ├── data/                        # Datos y modelo predictivo
│   │   ├── egdi.js                  # Datos EGDI + subíndices OSI, TII, HCI
│   │   ├── acc.js                   # Datos ACC + 6 componentes
│   │   ├── sed.js                   # Datos GD, IDT y SED
│   │   ├── ide.js                   # IDE final compuesto
│   │   └── predictions.js           # Modelo OLS — predicción 2025-2026
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx           # Barra de navegación superior
│   │   │   └── Sidebar.jsx          # Menú lateral de secciones
│   │   ├── charts/
│   │   │   └── Charts.jsx           # Componentes reutilizables de gráficos
│   │   └── sections/
│   │       ├── HeroSection.jsx      # Resumen general con KPIs
│   │       ├── IDESection.jsx       # Índice compuesto final
│   │       ├── EGDISection.jsx      # Digitalización del Estado
│   │       ├── ACCSection.jsx       # Acceso e infraestructura
│   │       ├── SEDSection.jsx       # Economía digital (GD + IDT)
│   │       ├── PredictionSection.jsx # Proyecciones 2025-2026
│   │       └── MethodologySection.jsx # Metodología y fuentes
│   ├── App.jsx                      # Componente raíz y navegación
│   ├── main.jsx                     # Punto de entrada
│   └── index.css                    # Estilos globales (Tailwind)
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Cómo ejecutar el proyecto

### Requisitos previos

- Node.js 18 o superior (probado con Node v24)
- npm 9 o superior

### Instalación

```bash
# 1. Clonar o descargar el proyecto
cd ide-ecuador

# 2. Instalar dependencias
npm install

# 3. Instalar Recharts si no está instalado
npm install recharts

# 4. Iniciar el servidor de desarrollo
npm run dev
```

Luego abre tu navegador en: **http://localhost:5173**

### Build para producción

```bash
npm run build
```

Los archivos listos para subir a un servidor quedarán en la carpeta `dist/`.

---

## 📋 Secciones del dashboard

| Sección | Contenido |
|---------|-----------|
| **Resumen General** | KPIs del 2024, gráfico de área con los 4 índices superpuestos |
| **IDE Compuesto** | Gráficos de líneas, barras y radar del índice final. Tabla de datos completa |
| **EGDI** | Evolución de OSI, TII, HCI y EGDI con diagrama araña por año |
| **ACC** | Barras por componente (%), líneas temporales normalizadas, índice agregado |
| **SED** | Vista general SED, subvista GD con normalización, subvista IDT con canales |
| **Predicción** | Proyección OLS con bandas de confianza, métricas del modelo (R², β) |
| **Metodología** | Fórmulas completas, justificación de pesos, validaciones, fuentes enlazadas |

---

## 📚 Fuentes de datos

| Indicador | Fuente | Enlace |
|-----------|--------|--------|
| EGDI | Naciones Unidas — E-Government Knowledge Base | [Ver fuente](https://publicadministration.un.org/egovkb/en-us/Data/CountryInformation/id/52-Ecuador/dataYear/2024) |
| ACC | INEC — Encuesta Nacional de TIC | [Ver fuente](https://www.ecuadorencifras.gob.ec/tecnologias-de-la-informacion-ycomunicacion-tic/) |
| GD | Banco Central del Ecuador — Pagos Interbancarios/PIB | [Ver fuente](https://contenido.bce.fin.ec/documentos/informacioneconomica/indicadores/pagos/SPI_PIB.html) |
| IDT | Superintendencia de Bancos del Ecuador | [Ver fuente](https://www.superbancos.gob.ec/estadisticas/portalestudios/serviciosfinancieros/) |

---

## 📌 Notas técnicas importantes

- **Tailwind v3.4.4:** Usa esta versión específica con Node v24+ para evitar errores de compatibilidad (`npm install -D tailwindcss@3.4.4 postcss autoprefixer`)
- **Nombres de archivos:** Los archivos `.jsx` son sensibles a mayúsculas. `EGDISection.jsx` ≠ `EDGISection.jsx`
- **Datos interpolados:** Los años 2021 y 2023 del EGDI, y el año 2021 del ACC, son estimaciones por interpolación y están marcados visualmente en el dashboard

---

*Proyecto desarrollado para el análisis de la transformación digital del Ecuador · Universidad Central del Ecuador*