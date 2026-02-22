import { useState } from "react";
import { accData, accInfo } from "../../data/acc";
import {
  SectionCard, MultiLineChart, GroupedBarChart,
  FormulaBox, DataTable, InfoBox,
} from "../charts/Charts";

const ACC_COLORS = {
  ETH: "#6366f1", HAI: "#0284c7", PUI: "#16a34a",
  PCA: "#ca8a04", PTI: "#dc2626", AD: "#7c3aed",
};

export default function ACCSection() {
  const [tab, setTab] = useState("bar");

  const tabs = [
    { id: "bar",  label: "Barras por componente" },
    { id: "line", label: "Líneas temporales" },
    { id: "acc",  label: "Índice ACC agregado" },
  ];

  // Normalized data (% → 0-1 for visual consistency)
  const normalizedData = accData.map((d) => ({
    ...d,
    ETH: d.ETH / 100, HAI: d.HAI / 100, PUI: d.PUI / 100,
    PCA: d.PCA / 100, PTI: d.PTI / 100, AD: d.AD / 100,
  }));

  // Raw % data for bar chart to show real magnitudes
  const rawBars = accData.map((d) => ({
    year: d.year, ETH: d.ETH, HAI: d.HAI, PUI: d.PUI, PCA: d.PCA, PTI: d.PTI, AD: d.AD,
  }));

  return (
    <SectionCard
      title={accInfo.title}
      subtitle={accInfo.description}
      badge="ACC · 25%"
      source={accInfo.source}
      sourceUrl={accInfo.sourceUrl}
    >
      <div className="space-y-6">
        <InfoBox
          items={[
            `Año interpolado: ${accInfo.interpolatedYears.join(", ")}. ${accInfo.interpolationNote}`,
          ]}
          color="amber"
        />

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Fórmula</p>
          <FormulaBox formula={accInfo.formula} />
        </div>

        {/* Components grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(accInfo.components).map(([k, desc]) => (
            <div key={k} className="rounded-xl border border-gray-200 p-3 bg-gray-50">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: ACC_COLORS[k] }} />
                <p className="text-sm font-bold text-gray-700">{k}</p>
              </div>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          ))}
        </div>

        {/* Chart tabs */}
        <div>
          <div className="flex gap-2 mb-4 border-b border-gray-200">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`pb-2 px-3 text-sm font-medium border-b-2 transition-colors ${
                  tab === t.id
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "bar" && (
            <>
              <p className="text-xs text-gray-400 mb-2">Valores en porcentaje (%)</p>
              <GroupedBarChart
                data={rawBars}
                bars={Object.keys(ACC_COLORS).map((k) => ({ key: k, label: k, color: ACC_COLORS[k] }))}
                height={340}
                yDomain={[0, 100]}
              />
            </>
          )}
          {tab === "line" && (
            <>
              <p className="text-xs text-gray-400 mb-2">Valores normalizados 0–1</p>
              <MultiLineChart
                data={normalizedData}
                lines={Object.entries(ACC_COLORS).map(([k, c]) => ({ key: k, label: k, color: c }))}
                height={320}
              />
            </>
          )}
          {tab === "acc" && (
            <MultiLineChart
              data={accData}
              lines={[{ key: "ACC", label: "ACC (Índice agregado)", bold: true, color: "#059669" }]}
              height={300}
            />
          )}
        </div>

        {/* Table */}
        <DataTable
          columns={[
            { key: "year", label: "Año" },
            ...Object.keys(ACC_COLORS).map((k) => ({ key: k, label: `${k} (%)`, format: (v) => v.toFixed(1) })),
            { key: "ACC", label: "ACC", format: (v) => v.toFixed(2) },
          ]}
          rows={accData}
          highlightLast
        />
      </div>
    </SectionCard>
  );
}