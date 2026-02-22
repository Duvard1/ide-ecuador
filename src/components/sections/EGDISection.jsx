import { useState } from "react";
import { egdiData, egdiInfo } from "../../data/egdi";
import {
  SectionCard, MultiLineChart, GroupedBarChart, SpiderChart,
  FormulaBox, DataTable, InfoBox,
} from "../charts/Charts";

export default function EGDISection() {
  const [tab, setTab] = useState("line");

  // Radar: each datapoint = subindex, columns = years
  const radarData = ["OSI", "TII", "HCI"].map((comp) => {
    const entry = { component: comp };
    egdiData.forEach((d) => { entry[d.year] = d[comp]; });
    return entry;
  });

  const tabs = [
    { id: "line",  label: "Líneas" },
    { id: "bar",   label: "Barras agrupadas" },
    { id: "radar", label: "Diagrama araña" },
  ];

  return (
    <SectionCard
      title={egdiInfo.title}
      subtitle={egdiInfo.description}
      badge="EGDI · 40%"
      source={egdiInfo.source}
      sourceUrl={egdiInfo.sourceUrl}
    >
      <div className="space-y-6">
        {/* Interpolation note */}
        <InfoBox
          items={[
            `Años interpolados: ${egdiInfo.interpolatedYears.join(", ")}. ${egdiInfo.interpolationNote}`,
          ]}
          color="amber"
        />

        {/* Component descriptions */}
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(egdiInfo.components).map(([k, desc]) => (
            <div key={k} className="rounded-xl border border-gray-200 p-3 bg-gray-50">
              <p className="text-sm font-bold text-gray-700 mb-1">{k}</p>
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
                    ? "border-purple-600 text-purple-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "line" && (
            <MultiLineChart
              data={egdiData}
              lines={[
                { key: "EGDI", label: "EGDI Total", bold: true, color: "#7c3aed" },
                { key: "OSI",  label: "OSI",  color: "#0891b2" },
                { key: "TII",  label: "TII",  color: "#db2777" },
                { key: "HCI",  label: "HCI",  color: "#65a30d" },
              ]}
              height={320}
            />
          )}
          {tab === "bar" && (
            <GroupedBarChart
              data={egdiData}
              bars={[
                { key: "OSI",  label: "OSI",  color: "#0891b2" },
                { key: "TII",  label: "TII",  color: "#db2777" },
                { key: "HCI",  label: "HCI",  color: "#65a30d" },
                { key: "EGDI", label: "EGDI Total", color: "#7c3aed" },
              ]}
              height={320}
            />
          )}
          {tab === "radar" && (
            <SpiderChart
              data={radarData}
              keys={egdiData.map((d) => ({ key: String(d.year), label: String(d.year) }))}
              colors={["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626"]}
              height={360}
            />
          )}
        </div>

        {/* Table */}
        <DataTable
          columns={[
            { key: "year", label: "Año" },
            { key: "OSI",  label: "OSI",  format: (v) => v.toFixed(2) },
            { key: "TII",  label: "TII",  format: (v) => v.toFixed(2) },
            { key: "HCI",  label: "HCI",  format: (v) => v.toFixed(2) },
            { key: "EGDI", label: "EGDI", format: (v) => v.toFixed(2) },
          ]}
          rows={egdiData}
          highlightLast
        />
      </div>
    </SectionCard>
  );
}