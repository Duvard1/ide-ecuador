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
    EGDI: { value: 0.4, label: "40%", justification: "El Estado es el actor estructural más importante en cualquier transformación digital. Sin un Estado digital, el resto no puede avanzar." },
    ACC: { value: 0.25, label: "25%", justification: "el acceso es condición necesaria pero no suficiente. Tener internet en casa no significa usarlo productivamente." },
    SED: { value: 0.35, label: "35%", justification: "Captura la integración digital en la economía real. Es impacto concreto." },
  },
};