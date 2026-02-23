import { useState } from "react";
import { ideData, ideInfo } from "../../data/ide";
import {
  SectionCard, MultiLineChart, GroupedBarChart, SpiderChart,
  FormulaBox, DataTable, InfoBox, KPICard,
} from "../charts/Charts";

const YEAR_COLORS = ["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626"];

export default function IDESection() {
  const [tab, setTab] = useState("line");

  // Radar data: one entry per component, values for each year
  const radarData = ["EGDI", "ACC", "SED"].map((comp) => {
    const entry = { component: comp };
    ideData.forEach((d) => { entry[d.year] = d[comp]; });
    return entry;
  });

  const tabs = [
    { id: "line", label: "Líneas" },
    { id: "bar",  label: "Barras" },
    { id: "radar",label: "Radar" },
  ];

  return (
    <SectionCard
      title={ideInfo.title}
      subtitle={ideInfo.description}
      badge="IDE"
    >
      <div className="space-y-6">
        {/* Formula */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Fórmula del índice</p>
          <FormulaBox formula={ideInfo.formula} />
        </div>

        {/* Weights */}
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(ideInfo.weights).map(([k, w]) => (
            <div key={k} className="rounded-xl border border-gray-200 p-4 bg-gray-50">
              <p className="text-2xl font-black text-blue-600 mb-1">{w.label}</p>
              <p className="text-sm font-bold text-gray-700">{k}</p>
              <p className="text-xs text-gray-500 mt-1">{w.justification}</p>
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
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "line" && (
            <MultiLineChart
              data={ideData}
              lines={[
                { key: "IDE",  label: "IDE",  bold: true },
                { key: "EGDI", label: "EGDI" },
                { key: "ACC",  label: "ACC" },
                { key: "SED",  label: "SED" },
              ]}
              height={340}
            />
          )}
          {tab === "bar" && (
            <GroupedBarChart
              data={ideData}
              bars={[
                { key: "EGDI", label: "EGDI" },
                { key: "ACC",  label: "ACC" },
                { key: "SED",  label: "SED" },
                { key: "IDE",  label: "IDE" },
              ]}
              height={340}
            />
          )}
          {tab === "radar" && (
            <SpiderChart
              data={radarData}
              keys={ideData.map((d, i) => ({ key: String(d.year), label: String(d.year) }))}
              colors={YEAR_COLORS}
              height={360}
            />
          )}
        </div>

        {/* Table */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Datos tabulares completos</p>
          <DataTable
            columns={[
              { key: "year", label: "Año" },
              { key: "EGDI", label: "EGDI", format: (v) => v.toFixed(2) },
              { key: "ACC",  label: "ACC",  format: (v) => v.toFixed(2) },
              { key: "SED",  label: "SED",  format: (v) => v.toFixed(2) },
              { key: "IDE",  label: "IDE",  format: (v) => v.toFixed(2) },
            ]}
            rows={ideData}
            highlightLast
          />
        </div>
      </div>
    </SectionCard>
  );
}