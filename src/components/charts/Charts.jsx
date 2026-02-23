import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Area, AreaChart,
  ReferenceLine, Cell,
} from "recharts";

// ── Palette ─────────────────────────────────────────────────────────────────
export const COLORS = {
  IDE:  "#2563eb",
  EGDI: "#7c3aed",
  ACC:  "#059669",
  SED:  "#d97706",
  OSI:  "#0891b2",
  TII:  "#db2777",
  HCI:  "#65a30d",
  ETH:  "#6366f1",
  HAI:  "#0284c7",
  PUI:  "#16a34a",
  PCA:  "#ca8a04",
  PTI:  "#dc2626",
  AD:   "#7c3aed",
  GD:   "#d97706",
  IDT:  "#2563eb",
};

// ── KPI Card ─────────────────────────────────────────────────────────────────
export function KPICard({ title, value, subtitle, color = "#2563eb", trend }) {
  const formatted = typeof value === "number" ? value.toFixed(2) : value;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
      <p className="text-3xl font-bold" style={{ color }}>{formatted}</p>
      {trend !== undefined && (
        <p className={`text-xs mt-1 font-medium ${trend >= 0 ? "text-emerald-600" : "text-red-500"}`}>
          {trend >= 0 ? "▲" : "▼"} {Math.abs(trend).toFixed(2)} vs 2020
        </p>
      )}
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}

// ── Section Wrapper ───────────────────────────────────────────────────────────
export function SectionCard({ title, subtitle, children, badge, source, sourceUrl }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {badge && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {badge}
                </span>
              )}
              <h2 className="text-lg font-bold text-gray-800">{title}</h2>
            </div>
            {subtitle && <p className="text text-gray-500 max-w-2xl">{subtitle}</p>}
          </div>
        </div>
        
        {source && (
          <p className="text-xs text-gray-400 mt-2">
            Fuente:{" "}
            <a href={sourceUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
              {source}
            </a>
          </p>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// ── Custom Tooltip ────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-bold text-gray-700 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-600">{p.name}:</span>
          <span className="font-semibold text-gray-800">{typeof p.value === "number" ? p.value.toFixed(4) : p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ── Multi-Line Chart ──────────────────────────────────────────────────────────
export function MultiLineChart({ data, lines, height = 320 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#6b7280" }} />
        <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} domain={[0, 1]} tickFormatter={(v) => v.toFixed(2)} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {lines.map((l) => (
          <Line
            key={l.key}
            type="monotone"
            dataKey={l.key}
            name={l.label || l.key}
            stroke={l.color || COLORS[l.key] || "#2563eb"}
            strokeWidth={l.bold ? 3 : 2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            strokeDasharray={l.dashed ? "5 5" : undefined}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

// ── Area Chart ────────────────────────────────────────────────────────────────
export function MultiAreaChart({ data, areas, height = 320 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <defs>
          {areas.map((a) => (
            <linearGradient key={a.key} id={`grad-${a.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={a.color || COLORS[a.key]} stopOpacity={0.15} />
              <stop offset="95%" stopColor={a.color || COLORS[a.key]} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#6b7280" }} />
        <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} domain={[0, 1]} tickFormatter={(v) => v.toFixed(2)} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {areas.map((a) => (
          <Area
            key={a.key}
            type="monotone"
            dataKey={a.key}
            name={a.label || a.key}
            stroke={a.color || COLORS[a.key]}
            fill={`url(#grad-${a.key})`}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ── Grouped Bar Chart ─────────────────────────────────────────────────────────
export function GroupedBarChart({ data, bars, height = 320, yDomain }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }} barCategoryGap="25%">
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#6b7280" }} />
        <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} domain={yDomain || [0, 1]} tickFormatter={(v) => typeof v === "number" && v < 2 ? v.toFixed(2) : v} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {bars.map((b) => (
          <Bar key={b.key} dataKey={b.key} name={b.label || b.key} fill={b.color || COLORS[b.key]} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Radar Chart ───────────────────────────────────────────────────────────────
export function SpiderChart({ data, keys, colors, height = 320 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="component" tick={{ fontSize: 11, fill: "#6b7280" }} />
        <PolarRadiusAxis angle={30} domain={[0, 1]} tick={{ fontSize: 10, fill: "#9ca3af" }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {keys.map((k, i) => (
          <Radar
            key={k.key}
            name={k.label}
            dataKey={k.key}
            stroke={colors?.[i] || "#2563eb"}
            fill={colors?.[i] || "#2563eb"}
            fillOpacity={0.15}
            strokeWidth={2}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
}

// ── Info Box ──────────────────────────────────────────────────────────────────
export function InfoBox({ items, color = "blue" }) {
  const classes = {
    blue:   "bg-blue-50 border-blue-200 text-blue-800",
    amber:  "bg-amber-50 border-amber-200 text-amber-800",
    green:  "bg-emerald-50 border-emerald-200 text-emerald-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
  };
  return (
    <ul className={`rounded-xl border p-4 space-y-1.5 text-xs ${classes[color] || classes.blue}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-0.5 shrink-0">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ── Formula Display ───────────────────────────────────────────────────────────
export function FormulaBox({ formula, label }) {
  return (
    <div className="my-3 rounded-lg bg-blue-100 text-black px-5 py-3 font-mono text flex items-center gap-3">
      {label && <span className="text-gray-400 text-xs shrink-0">{label}</span>}
      <span>{formula}</span>
    </div>
  );
}

// ── Data Table ────────────────────────────────────────────────────────────────
export function DataTable({ columns, rows, highlightLast }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full text-xs">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-2.5 text-left font-semibold text-gray-600 whitespace-nowrap">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-t border-gray-100 ${
                highlightLast && i === rows.length - 1 ? "bg-blue-50 font-semibold" : "hover:bg-gray-50"
              }`}
            >
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-2 text-gray-700 whitespace-nowrap">
                  {c.format ? c.format(row[c.key]) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}