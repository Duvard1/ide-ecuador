export const ideData = [
  { year: 2020, EGDI: 0.70, ACC: 0.62, SED: 0.42, IDE: 0.58 },
  { year: 2021, EGDI: 0.70, ACC: 0.62, SED: 0.63, IDE: 0.65 },
  { year: 2022, EGDI: 0.69, ACC: 0.62, SED: 0.72, IDE: 0.68 },
  { year: 2023, EGDI: 0.73, ACC: 0.63, SED: 0.74, IDE: 0.71 },
  { year: 2024, EGDI: 0.78, ACC: 0.65, SED: 0.79, IDE: 0.75 },
];

export const ideInfo = {
  title: "Índice de Digitalización del Ecuador (IDE)",
  description:
    "Índice compuesto multidimensional que integra tres dimensiones fundamentales de la transformación digital. Mide no solo la existencia de infraestructura digital, sino también su uso real y su integración en la economía.",
  formula: "IDE = 0.4 × EGDI + 0.25 × ACC + 0.35 × SED",
  weights: {
    EGDI: { value: 0.4, label: "40%", justification: "Base institucional del ecosistema digital. El Estado es actor estructural clave en la transformación digital." },
    ACC: { value: 0.25, label: "25%", justification: "Condición habilitante. Sin acceso no hay digitalización, pero acceso no implica uso." },
    SED: { value: 0.35, label: "35%", justification: "Captura la integración digital en la economía real. Es impacto concreto." },
  },
  methodologicalPrinciples: [
    "Relevancia directa: mayor peso a mediciones directas de digitalización.",
    "Separación entre capacidad y uso.",
    "Equilibrio entre institucionalidad y economía real.",
  ],
  validations: [
    "Respeta estructura dimensional (no mezcla variables sin jerarquía).",
    "Normaliza adecuadamente las escalas.",
    "Justifica cada ponderación con criterios conceptuales.",
    "Evita doble conteo.",
    "Permite análisis temporal consistente.",
  ],
};