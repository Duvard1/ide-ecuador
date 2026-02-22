import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import HeroSection from "./components/sections/HeroSection";
import EGDISection from "./components/sections/EGDISection";
import ACCSection from "./components/sections/ACCSection";
import SEDSection from "./components/sections/SEDSection";
import IDESection from "./components/sections/IDESection";
import PredictionSection from "./components/sections/PredictionSection";
import MethodologySection from "./components/sections/MethodologySection";

const SECTIONS = [
  { id: "hero",        label: "Resumen General",     icon: "🇪🇨" },
  { id: "ide",         label: "IDE Compuesto",        icon: "📊" },
  { id: "egdi",        label: "EGDI — Estado Digital",icon: "🏛️" },
  { id: "acc",         label: "ACC — Acceso Digital", icon: "📡" },
  { id: "sed",         label: "SED — Economía Digital",icon: "💳" },
  { id: "prediction",  label: "Predicción 2025–2026", icon: "🔮" },
  { id: "methodology", label: "Metodología",          icon: "📋" },
];

export default function App() {
  const [active, setActive] = useState("hero");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const scrollTo = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar onMenuClick={() => setSidebarOpen((v) => !v)} />
      <div className="flex pt-16">
        <Sidebar
          sections={SECTIONS}
          active={active}
          onSelect={scrollTo}
          open={sidebarOpen}
        />
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-0"
          } px-6 py-8 max-w-screen-xl`}
        >
          <div id="hero">        <HeroSection /></div>
          <div id="ide"  className="mt-12"><IDESection /></div>
          <div id="egdi" className="mt-12"><EGDISection /></div>
          <div id="acc"  className="mt-12"><ACCSection /></div>
          <div id="sed"  className="mt-12"><SEDSection /></div>
          <div id="prediction"  className="mt-12"><PredictionSection /></div>
          <div id="methodology" className="mt-12"><MethodologySection /></div>
          <footer className="mt-16 pb-8 text-center text-xs text-gray-400">
            © 2025 · Índice de Digitalización del Ecuador · Datos 2020–2024
          </footer>
        </main>
      </div>
    </div>
  );
}