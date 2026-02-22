import { useState } from "react";
import { gdData, idtData, sedData, sedInfo, gdInfo, idtInfo } from "../../data/sed";
import {
  SectionCard, MultiLineChart, GroupedBarChart, MultiAreaChart,
  FormulaBox, DataTable, InfoBox,
} from "../charts/Charts";

export default function SEDSection() {
  const [tab, setTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "SED General" },
    { id: "gd",       label: "Grado de Desarrollo (GD)" },
    { id: "idt",      label: "Índice Transaccional (IDT)" },
  ];

  // For IDT: format numbers in billions for readability
  const idtFormatted = idtData.map((d) => ({
    ...d,
    digitales_B: parseFloat((d.digitales / 1e9).toFixed(2)),
    totales_B:   parseFloat((d.totales / 1e9).toFixed(2)),
  }));

  return (
    <SectionCard
      title={sedInfo.title}
      subtitle={sedInfo.description}
      badge="SED · 35%"
    >
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Fórmula</p>
          <FormulaBox formula={sedInfo.formula} />
          <p className="text-xs text-gray-500 mt-1">{sedInfo.ponderationJustification}</p>
        </div>

        {/* Tab navigation */}
        <div>
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`pb-2 px-3 text-sm font-medium border-b-2 transition-colors ${
                  tab === t.id
                    ? "border-amber-600 text-amber-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ── SED Overview ── */}
          {tab === "overview" && (
            <div className="space-y-5">
              <MultiAreaChart
                data={sedData}
                areas={[
                  { key: "SED", label: "SED",          color: "#d97706" },
                  { key: "IDT", label: "IDT (60%)",    color: "#2563eb" },
                  { key: "GD",  label: "GD norm (40%)", color: "#059669" },
                ]}
                height={320}
              />
              <DataTable
                columns={[
                  { key: "year", label: "Año" },
                  { key: "GD",   label: "GD Normalizado", format: (v) => v.toFixed(2) },
                  { key: "IDT",  label: "IDT",            format: (v) => v.toFixed(2) },
                  { key: "SED",  label: "SED",            format: (v) => v.toFixed(2) },
                ]}
                rows={sedData}
                highlightLast
              />
            </div>
          )}

          {/* ── GD Section ── */}
          {tab === "gd" && (
            <div className="space-y-5">
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                <p className="text-sm font-semibold text-amber-800 mb-1">{gdInfo.title}</p>
                <p className="text-xs text-amber-700 mb-2">{gdInfo.description}</p>
                <p className="text-xs text-amber-600">Fórmula: <code>{gdInfo.formula}</code></p>
                <p className="text-xs text-amber-600">Normalización: <code>{gdInfo.normalization}</code></p>
                <p className="text-xs text-amber-600">Xmin = {gdInfo.xmin} · Xmax = {gdInfo.xmax}</p>
              </div>

              <GroupedBarChart
                data={gdData}
                bars={[
                  { key: "GD_raw",  label: "Pagos/PIB (% crudo)", color: "#f59e0b" },
                  { key: "GD_norm", label: "GD Normalizado",       color: "#d97706" },
                ]}
                height={320}
                yDomain={[0, 150]}
              />

              <DataTable
                columns={[
                  { key: "year",    label: "Año" },
                  { key: "GD_raw",  label: "Pagos Interbancarios / PIB (%)", format: (v) => v.toFixed(2) },
                  { key: "GD_norm", label: "GD Normalizado (0–1)",           format: (v) => v.toFixed(2) },
                ]}
                rows={gdData}
                highlightLast
              />
              <p className="text-xs text-gray-400">
                Fuente:{" "}
                <a href={gdInfo.sourceUrl} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">
                  {gdInfo.source}
                </a>
              </p>
            </div>
          )}

          {/* ── IDT Section ── */}
          {tab === "idt" && (
            <div className="space-y-5">
              <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm font-semibold text-blue-800 mb-1">{idtInfo.title}</p>
                <p className="text-xs text-blue-700 mb-2">{idtInfo.description}</p>
                <p className="text-xs text-blue-600">Fórmula: <code>{idtInfo.formula}</code></p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-green-200 bg-green-50 p-3">
                  <p className="text-xs font-semibold text-green-700 mb-2">✅ Canales Digitales incluidos</p>
                  <ul className="space-y-1">
                    {idtInfo.canalesDigitales.map((c) => (
                      <li key={c} className="text-xs text-green-600">• {c}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-red-200 bg-red-50 p-3">
                  <p className="text-xs font-semibold text-red-700 mb-2">❌ Canales excluidos</p>
                  <ul className="space-y-1">
                    {idtInfo.canalesExcluidos.map((c) => (
                      <li key={c} className="text-xs text-red-500">• {c}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-red-400 mt-2 italic">{idtInfo.exclusionReason}</p>
                </div>
              </div>

              {/* Transactions in billions */}
              <GroupedBarChart
                data={idtFormatted}
                bars={[
                  { key: "digitales_B", label: "Transacciones Digitales (miles de mill.)", color: "#2563eb" },
                  { key: "totales_B",   label: "Transacciones Totales (miles de mill.)",   color: "#93c5fd" },
                ]}
                height={300}
                yDomain={[0, 6]}
              />

              <MultiLineChart
                data={idtData}
                lines={[{ key: "IDT", label: "IDT (proporción)", bold: true, color: "#2563eb" }]}
                height={260}
              />

              <DataTable
                columns={[
                  { key: "year",      label: "Año" },
                  { key: "digitales", label: "Trans. Digitales", format: (v) => v.toLocaleString() },
                  { key: "totales",   label: "Trans. Totales",   format: (v) => v.toLocaleString() },
                  { key: "IDT",       label: "IDT",              format: (v) => v.toFixed(2) },
                ]}
                rows={idtData}
                highlightLast
              />
              <p className="text-xs text-gray-400">
                Fuente:{" "}
                <a href={idtInfo.sourceUrl} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">
                  {idtInfo.source}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
}