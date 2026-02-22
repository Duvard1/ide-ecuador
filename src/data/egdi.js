export const egdiData = [
  { year: 2020, OSI: 0.81, TII: 0.51, HCI: 0.78, EGDI: 0.70 },
  { year: 2021, OSI: 0.79, TII: 0.52, HCI: 0.78, EGDI: 0.70 },
  { year: 2022, OSI: 0.77, TII: 0.53, HCI: 0.77, EGDI: 0.69 },
  { year: 2023, OSI: 0.83, TII: 0.61, HCI: 0.77, EGDI: 0.73 },
  { year: 2024, OSI: 0.89, TII: 0.68, HCI: 0.77, EGDI: 0.78 },
];

export const egdiInfo = {
  title: "E-Government Development Index (EGDI)",
  description:
    "Mide el grado de desarrollo del gobierno electrónico. Compuesto por tres subíndices: OSI (calidad de servicios públicos digitales), TII (infraestructura de telecomunicaciones) y HCI (capital humano y capacidades educativas). Ya se encuentra en escala 0–1.",
  source: "Naciones Unidas – E-Government Knowledge Base",
  sourceUrl:
    "https://publicadministration.un.org/egovkb/en-us/Data/CountryInformation/id/52-Ecuador/dataYear/2024",
  weight: "40% del IDE",
  interpolatedYears: [2021, 2023],
  interpolationNote:
    "Los años 2021 y 2023 fueron estimados por interpolación simple (promedio del año anterior y siguiente), dado que el informe se publica de forma bienal.",
  components: {
    OSI: "Online Service Index – calidad y disponibilidad de servicios públicos digitales.",
    TII: "Telecommunication Infrastructure Index – infraestructura tecnológica.",
    HCI: "Human Capital Index – capacidades educativas y capital humano.",
  },
};