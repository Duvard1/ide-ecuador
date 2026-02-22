export default function Sidebar({ sections, active, onSelect, open }) {
  if (!open) return null;

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto z-40">
      <nav className="p-4 space-y-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
          Secciones
        </p>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left ${
              active === s.id
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <span className="text-base">{s.icon}</span>
            <span className="leading-tight">{s.label}</span>
            {active === s.id && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 mx-4 mb-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
        <p className="text-xs font-semibold text-blue-800 mb-1">Período de análisis</p>
        <p className="text-xs text-blue-600">2020 – 2024 (datos reales)</p>
        <p className="text-xs text-amber-600 mt-1">2025 – 2026 (proyección OLS)</p>
      </div>
    </aside>
  );
}