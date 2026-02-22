export const accData = [
  { year: 2020, ETH: 43.9, HAI: 53.2, PUI: 70.7, PCA: 62.9, PTI: 51.5, AD: 89.8, ACC: 0.62 },
  { year: 2021, ETH: 42.2, HAI: 56.8, PUI: 70.2, PCA: 60.9, PTI: 51.8, AD: 90.8, ACC: 0.62 },
  { year: 2022, ETH: 40.4, HAI: 60.4, PUI: 69.7, PCA: 58.8, PTI: 52.2, AD: 91.8, ACC: 0.62 },
  { year: 2023, ETH: 33.1, HAI: 62.2, PUI: 72.7, PCA: 59.6, PTI: 55.6, AD: 92.4, ACC: 0.63 },
  { year: 2024, ETH: 33.2, HAI: 66.0, PUI: 77.2, PCA: 61.3, PTI: 57.7, AD: 94.6, ACC: 0.65 },
];

export const accInfo = {
  title: "Acceso y Conectividad (ACC)",
  description:
    "Mide la capacidad estructural de acceso digital de la población. Se construye como el promedio de seis variables que cubren equipamiento, conectividad y alfabetismo digital. El ACC refleja infraestructura y capacidad de acceso, pero no garantiza uso efectivo.",
  source: "INEC – Encuesta TIC / Ecuador en Cifras",
  sourceUrl: "https://www.ecuadorencifras.gob.ec/tecnologias-de-la-informacion-ycomunicacion-tic/",
  weight: "25% del IDE",
  interpolatedYears: [2021],
  interpolationNote:
    "En 2021 no se encontraron datos completos, se aplicó interpolación promedio.",
  formula: "ACC = (ETH + HAI + PUI + PCA + PTI + AD) / 6",
  components: {
    ETH: "Equipamiento Tecnológico del Hogar – hogares con computadora de escritorio, laptop o tablet.",
    HAI: "Hogares con Acceso a Internet.",
    PUI: "Personas que Utilizan Internet – población de 5 años o más.",
    PCA: "Personas con Celular Activado.",
    PTI: "Personas con Smartphone (Teléfono Inteligente).",
    AD: "Alfabetismo Digital – calculado como 100 menos el porcentaje de analfabetismo digital.",
  },
};