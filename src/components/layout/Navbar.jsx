export default function Navbar({ onMenuClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm h-16 flex items-center px-6 gap-4">
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
        aria-label="Toggle sidebar"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-sm font-bold shadow">
          IDE
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-800 leading-tight">
            Índice de Digitalización del Ecuador
          </h1>
          <p className="text-xs text-gray-500">Dashboard Analítico · 2020–2024</p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-medium">
          Datos verificados
        </span>
        <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-medium">
          Predicción 2025–2026
        </span>
      </div>
    </header>
  );
}