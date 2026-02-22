import { useState } from "react";
import { predictionTable, modelMetrics, predictionInfo } from "../../data/predictions";
import { SectionCard, FormulaBox, InfoBox, DataTable } from "../charts/Charts";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceArea, ReferenceLine,
} from "recharts";

const SERIES = [
  { key: "IDE",  color: "#2563eb", label: "IDE" },
  { key: "EGDI", color: "#7c3aed", label: "EGDI" },
  { key: "ACC",  color: "#059669", label: "ACC" },
  { key: "SED",  color: "#d97706", label: "SED" },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const isReal = label <= 2024;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs max-w-xs">
      <p className="font-bold text-gray-700 mb-1">
        {label}
        <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${isReal ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
          {isReal ? "Real" : "Proyectado"}
        </span>
      </p>
      {payload.map((p) => {
        if (p.dataKey.includes("_lower") || p.dataKey.includes("_upper")) return null;
        const val = p.value;
        const lower = payload.find((x) => x.dataKey === `${p.dataKey}_lower`)?.value;
        const upper = payload.find((x) => x.dataKey === `${p.dataKey}_upper`)?.value;
        return (
          <div key={p.dataKey} className="flex flex-col mb-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
              <span className="text-gray-600">{p.name}:</span>
              <span className="font-semibold text-gray-800">{typeof val === "number" ? val.toFixed(4) : "—"}</span>
            </div>
            {!isReal && lower != null && (
              <span className="text-gray-400 ml-4 text-xs">IC 95%: [{lower.toFixed(4)}, {upper.toFixed(4)}]</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function PredictionSection() {
  const [activeSeries, setActiveSeries] = useState(["IDE"]);

  const toggleSeries = (key) =>
    setActiveSeries((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  return (
    <SectionCard
      title="Predicción 2025–2026"
      subtitle={predictionInfo.disclaimer}
      badge="Proyección OLS · 95% IC"
    >
      <div className="space-y-6">
        {/* Disclaimer banner */}
        <div className="rounded-xl bg-amber-50 border border-amber-300 px-5 py-4 flex gap-3 items-start">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1">Sección de proyecciones estadísticas</p>
            <p className="text-xs text-amber-700">{predictionInfo.disclaimer}</p>
          </div>
        </div>

        {/* Method card */}
        <div className="rounded-xl border border-gray-200 p-5 bg-gray-50">
          <p className="text-sm font-bold text-gray-800 mb-2">
            Método: {predictionInfo.method}
          </p>
          <FormulaBox formula={predictionInfo.formula} label="ŷ =" />
          <p className="text-xs text-gray-500 mt-2">
            Intervalo de confianza: <strong>{predictionInfo.confidenceLevel}</strong>
          </p>
        </div>

        {/* Series toggle buttons */}
        <div className="flex flex-wrap gap-2">
          {SERIES.map((s) => (
            <button
              key={s.key}
              onClick={() => toggleSeries(s.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors ${
                activeSeries.includes(s.key)
                  ? "text-white border-transparent"
                  : "bg-white text-gray-500 border-gray-300"
              }`}
              style={activeSeries.includes(s.key) ? { background: s.color, borderColor: s.color } : {}}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Prediction chart */}
        <div>
          <p className="text-xs text-gray-400 mb-2">
            Zona gris = datos reales · Zona amarilla = proyección · Banda sombreada = intervalo de confianza 95%
          </p>
          <ResponsiveContainer width="100%" height={380}>
            <LineChart data={predictionTable} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              {/* Real data background */}
              <ReferenceArea x1={2020} x2={2024} fill="#f3f4f6" fillOpacity={0.5} />
              {/* Prediction background */}
              <ReferenceArea x1={2024} x2={2026} fill="#fef9c3" fillOpacity={0.6} />
              <ReferenceLine x={2024} stroke="#94a3b8" strokeDasharray="4 4" label={{ value: "2024", position: "top", fontSize: 11, fill: "#64748b" }} />

              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} domain={[0, 1]} tickFormatter={(v) => v.toFixed(2)} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />

              {SERIES.filter((s) => activeSeries.includes(s.key)).map((s) => (
                <>
                  {/* Confidence interval band */}
                  <Line
                    key={`${s.key}_upper`}
                    dataKey={`${s.key}_upper`}
                    stroke={s.color}
                    strokeWidth={0}
                    dot={false}
                    legendType="none"
                    strokeOpacity={0.3}
                    name={`${s.label} IC+`}
                  />
                  <Line
                    key={`${s.key}_lower`}
                    dataKey={`${s.key}_lower`}
                    stroke={s.color}
                    strokeWidth={0}
                    dot={false}
                    legendType="none"
                    strokeOpacity={0.3}
                    name={`${s.label} IC-`}
                  />
                  {/* Main line */}
                  <Line
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    stroke={s.color}
                    strokeWidth={2.5}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      const isReal = payload.year <= 2024;
                      return (
                        <circle
                          key={`dot-${s.key}-${payload.year}`}
                          cx={cx} cy={cy} r={4}
                          fill={isReal ? s.color : "white"}
                          stroke={s.color}
                          strokeWidth={2}
                        />
                      );
                    }}
                    name={s.label}
                    strokeDasharray={(d) => ""}
                  />
                </>
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Model metrics table */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Parámetros del modelo por serie</p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  {["Serie", "β₀ (intercepto)", "β₁ (pendiente)", "R²", "SE residual"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(modelMetrics).map(([key, m]) => (
                  <tr key={key} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold text-gray-800">{key}</td>
                    <td className="px-4 py-2 text-gray-600">{m.beta0}</td>
                    <td className="px-4 py-2 text-gray-600">{m.beta1}</td>
                    <td className="px-4 py-2">
                      <span className={`font-semibold ${m.r2 > 0.9 ? "text-emerald-600" : m.r2 > 0.7 ? "text-amber-600" : "text-red-500"}`}>
                        {m.r2.toFixed(4)}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">{m.se.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Projection values table */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Valores proyectados 2025–2026</p>
          <div className="overflow-x-auto rounded-xl border border-amber-200 bg-amber-50">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="border-b border-amber-200">
                  <th className="px-4 py-2.5 text-left font-semibold text-amber-800">Año</th>
                  {SERIES.map((s) => (
                    <th key={s.key} className="px-4 py-2.5 text-left font-semibold text-amber-800">
                      {s.key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {predictionTable.filter((r) => !r.isReal).map((row) => (
                  <tr key={row.year} className="border-t border-amber-100">
                    <td className="px-4 py-2 font-bold text-amber-800">{row.year} ⚡</td>
                    {SERIES.map((s) => (
                      <td key={s.key} className="px-4 py-2 text-amber-700">
                        {row[s.key].toFixed(4)}
                        {row[`${s.key}_lower`] != null && (
                          <span className="text-amber-400 ml-1 text-xs">
                            [{row[`${s.key}_lower`].toFixed(3)}, {row[`${s.key}_upper`].toFixed(3)}]
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Justification and limitations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">✅ Justificación del método</p>
            <InfoBox items={predictionInfo.justification} color="green" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">⚠️ Limitaciones</p>
            <InfoBox items={predictionInfo.limitations} color="amber" />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}