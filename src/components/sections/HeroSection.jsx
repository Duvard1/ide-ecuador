import { ideData } from "../../data/ide";
import { KPICard, MultiAreaChart, SectionCard } from "../charts/Charts";

export default function HeroSection() {
  const latest = ideData[ideData.length - 1]; // 2024
  const earliest = ideData[0];                // 2020

  const kpis = [
    { key: "IDE",  label: "IDE 2024",  color: "#2563eb", subtitle: "Índice compuesto final" },
    { key: "EGDI", label: "EGDI 2024", color: "#7c3aed", subtitle: "E-Gov (peso 40%)" },
    { key: "ACC",  label: "ACC 2024",  color: "#059669", subtitle: "Acceso digital (peso 25%)" },
    { key: "SED",  label: "SED 2024",  color: "#d97706", subtitle: "Economía digital (peso 35%)" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero header */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 shadow-lg">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-blue-200 text-sm font-medium mb-1">Dashboard Analítico</p>
            <h1 className="text-3xl font-extrabold mb-2">
              Índice de Digitalización del Ecuador
            </h1>
            <p className="text-blue-100 text-sm max-w-xl leading-relaxed">
              Índice compuesto multidimensional que mide el avance de la transformación digital
              del Ecuador integrando tres dimensiones: digitalización del Estado, acceso e
              infraestructura digital, y digitalización económica y de pagos.
            </p>
            <p className="text-blue-300 text-xs mt-3">Período: 2020 – 2024 · Escala: 0 a 1</p>
          </div>
          <div className="text-right">
            <p className="text-blue-300 text-xs mb-1">IDE 2024</p>
            <p className="text-6xl font-black text-white">{latest.IDE.toFixed(2)}</p>
            <p className="text-blue-200 text-sm mt-1">
              +{(latest.IDE - earliest.IDE).toFixed(2)} desde 2020
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <KPICard
            key={k.key}
            title={k.label}
            value={latest[k.key]}
            subtitle={k.subtitle}
            color={k.color}
            trend={latest[k.key] - earliest[k.key]}
          />
        ))}
      </div>

      {/* Overview area chart */}
      <SectionCard
        title="Evolución de todos los índices 2020–2024"
        subtitle="Vista panorámica de las cuatro dimensiones del IDE superpuestas en escala 0–1."
      >
        <MultiAreaChart
          data={ideData}
          areas={[
            { key: "IDE",  label: "IDE",  color: "#2563eb" },
            { key: "EGDI", label: "EGDI", color: "#7c3aed" },
            { key: "ACC",  label: "ACC",  color: "#059669" },
            { key: "SED",  label: "SED",  color: "#d97706" },
          ]}
          height={340}
        />
      </SectionCard>
    </div>
  );
}