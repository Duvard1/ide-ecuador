import { ideInfo } from "../../data/ide";
import { egdiInfo } from "../../data/egdi";
import { accInfo } from "../../data/acc";
import { sedInfo, gdInfo, idtInfo } from "../../data/sed";
import { SectionCard, FormulaBox, InfoBox } from "../charts/Charts";

const SOURCE_LINKS = [
  { label: "Naciones Unidas – EGDI", url: "https://publicadministration.un.org/egovkb/en-us/Data/Country-Information/id/52-Ecuador/dataYear/2024" },
  { label: "INEC – Encuesta TIC / Ecuador en Cifras", url: "https://www.ecuadorencifras.gob.ec/tecnologias-de-la-informacion-y-comunicacion-tic/" },
  { label: "Banco Central del Ecuador – Pagos Interbancarios / PIB", url: "https://contenido.bce.fin.ec/documentos/informacioneconomica/indicadores/pagos/SPI_PIB.html#:~:text=2022%2C%202023%2C%202024.%20Sistema%20de%20Pagos%20Interbancarios,%C3%A1mbito%20nacional%2C%20la%20transferencia%20electr%C3%B3nica%20de%20dinero" },
  { label: "Superintendencia de Bancos – Servicios Financieros", url: "https://www.superbancos.gob.ec/estadisticas/portalestudios/servicios-financieros/" },
];

const DIMENSIONS = [
  {
    title: "1. Digitalización del Estado (EGDI)",
    color: "purple",
    items: [
      "Fuente: E-Government Development Index (EGDI) – Naciones Unidas. Publicación bienal.",
      "Subíndices: OSI (servicios digitales), TII (infraestructura telecomunicaciones), HCI (capital humano).",
      "Ya se encuentra en escala 0–1. No requiere normalización adicional.",
      "Años 2021 y 2023 estimados por interpolación: valor_t = (valor_(t-1) + valor_(t+1)) / 2.",
      "Ponderación en IDE: 40% — representa la base institucional del ecosistema digital.",
    ],
  },
  {
    title: "2. Acceso e Infraestructura Digital (ACC)",
    color: "green",
    items: [
      "Fuente: INEC – Encuesta Nacional de TIC. Cobertura: población de 5+ años.",
      "Variables: ETH, HAI, PUI, PCA, PTI, AD — todas expresadas como porcentaje (0–100).",
      "ACC = promedio simple de las 6 variables / 100 → escala 0–1.",
      "Año 2021 interpolado por ausencia de datos completos.",
      "Ponderación en IDE: 25% — condición habilitante, no garantiza uso efectivo.",
    ],
  },
  {
    title: "3. Economía Digital (SED = 0.6·IDT + 0.4·GD)",
    color: "amber",
    items: [
      "GD: Sistema de Pagos Interbancarios / PIB. Fuente: BCE. Normalizado Min-Max.",
      "IDT: Transacciones Digitales / Transacciones Totales. Fuente: Superintendencia de Bancos.",
      "SED combina profundidad estructural (GD) y uso efectivo real (IDT).",
      "IDT recibe mayor ponderación (60%) porque el uso real prima sobre la capacidad instalada.",
      "Ponderación en IDE: 35% — captura impacto concreto en la economía.",
    ],
  },
];

export default function MethodologySection() {
  return (
    <SectionCard title="Metodología completa" subtitle="Fundamentos, construcción y validación del Índice de Digitalización del Ecuador (IDE)" badge="📋 Metodología">
      <div className="space-y-8">

        {/* General approach */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2">Enfoque general</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            El IDE es un índice compuesto multidimensional construido con tres dimensiones fundamentales
            de la transformación digital. Mide no solo la existencia de infraestructura digital, sino
            también su uso real y su integración en la economía. Todos los indicadores fueron llevados a
            una escala común (0–1) garantizando comparabilidad y evitando sesgos por diferencias de magnitud.
          </p>
        </div>

        {/* Master formula */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2">Fórmula maestra del IDE</h3>
          <FormulaBox formula="IDE = 0.4 × EGDI + 0.25 × ACC + 0.35 × SED" />
          <FormulaBox formula="SED = 0.6 × IDT + 0.4 × GD_normalizado" />
          <FormulaBox formula="GD_normalizado = (GD − 115.37) / (139.55 − 115.37)" />
          <FormulaBox formula="IDT = Transacciones_Digitales / Transacciones_Totales" />
          <FormulaBox formula="ACC = (ETH + HAI + PUI + PCA + PTI + AD) / 600" />
        </div>

        {/* Dimensions */}
        {DIMENSIONS.map((d) => (
          <div key={d.title}>
            <h3 className="text-sm font-bold text-gray-800 mb-2">{d.title}</h3>
            <InfoBox items={d.items} color={d.color} />
          </div>
        ))}

        {/* Interpolation */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2">Tratamiento de datos faltantes</h3>
          <p className="text-sm text-gray-600 mb-2">
            Para años sin datos oficiales se aplicó interpolación simple por promedio:
          </p>
          <FormulaBox formula="Valor_t = (Valor_(t−1) + Valor_(t+1)) / 2" />
          <p className="text-xs text-gray-500 mt-1">
            Este método mantiene coherencia temporal sin introducir sesgos estructurales.
          </p>
        </div>

        {/* Validation */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2">Validación del modelo</h3>
          <InfoBox
            items={[
              "Respeta estructura dimensional: no mezcla variables sin jerarquía conceptual.",
              "Normalización adecuada: todos los indicadores en escala 0–1 antes de ponderar.",
              "Ponderaciones justificadas con criterios conceptuales explícitos.",
              "Evita doble conteo: cada variable aparece en una sola dimensión.",
              "Permite análisis temporal consistente: metodología estable 2020–2024.",
              "Los pesos suman 1, garantizando consistencia matemática.",
            ]}
            color="blue"
          />
        </div>

        {/* Sources */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3">Fuentes oficiales</h3>
          <div className="space-y-2">
            {SOURCE_LINKS.map((s) => (
              <div key={s.url} className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                <span className="text-blue-500 text-xs">🔗</span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  {s.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}