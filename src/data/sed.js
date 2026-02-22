export const gdData = [
  { year: 2020, GD_raw: 115.37, GD_norm: 0.00 },
  { year: 2021, GD_raw: 127.74, GD_norm: 0.51 },
  { year: 2022, GD_raw: 134.66, GD_norm: 0.80 },
  { year: 2023, GD_raw: 136.80, GD_norm: 0.89 },
  { year: 2024, GD_raw: 139.55, GD_norm: 1.00 },
];

export const idtData = [
  { year: 2020, digitales: 2239574597, totales: 3173962893, IDT: 0.71 },
  { year: 2021, digitales: 2604488104, totales: 3707855303, IDT: 0.70 },
  { year: 2022, digitales: 3067979149, totales: 4647458629, IDT: 0.66 },
  { year: 2023, digitales: 3016644015, totales: 4709957947, IDT: 0.64 },
  { year: 2024, digitales: 3498803730, totales: 5403063992, IDT: 0.65 },
];

export const sedData = [
  { year: 2020, GD: 0.00, IDT: 0.71, SED: 0.42 },
  { year: 2021, GD: 0.51, IDT: 0.70, SED: 0.63 },
  { year: 2022, GD: 0.80, IDT: 0.66, SED: 0.72 },
  { year: 2023, GD: 0.89, IDT: 0.64, SED: 0.74 },
  { year: 2024, GD: 1.00, IDT: 0.65, SED: 0.79 },
];

export const sedInfo = {
  title: "Subíndice Económico Digital (SED)",
  description:
    "Combina el Grado de Desarrollo (GD) y el Índice de Digitalización Transaccional (IDT) para capturar tanto la profundidad estructural del sistema de pagos como el uso efectivo de canales digitales.",
  weight: "35% del IDE",
  formula: "SED = 0.6 × IDT + 0.4 × GD",
  ponderationJustification:
    "60% IDT porque la digitalización no es solo infraestructura, es uso efectivo. 40% GD porque representa capacidad estructural habilitante.",
};

export const gdInfo = {
  title: "Grado de Desarrollo (GD)",
  description:
    "Mide la profundidad y relevancia del sistema de pagos electrónicos respecto al tamaño de la economía (Sistema de Pagos Interbancarios / PIB). Normalizado con Min-Max para comparabilidad.",
  formula: "GD = Sistema de Pagos Interbancarios / PIB",
  normalization: "X_norm = (X − X_min) / (X_max − X_min)",
  xmin: 115.37,
  xmax: 139.55,
  source: "Banco Central del Ecuador",
  sourceUrl:
    "https://contenido.bce.fin.ec/documentos/informacioneconomica/indicadores/pagos/SPI_PIB.html",
};

export const idtInfo = {
  title: "Índice de Digitalización Transaccional (IDT)",
  description:
    "Mide el uso efectivo de canales digitales como proporción del total de transacciones. Captura la adopción real del sistema digital por parte de los usuarios.",
  formula: "IDT = Transacciones Digitales / Transacciones Totales",
  canalesDigitales: [
    "Banca celular",
    "Internet",
    "Plataforma de pagos móviles",
    "POS crédito",
    "POS débito",
    "POS prepago",
    "Terminal autoservicio",
  ],
  canalesExcluidos: [
    "Cajeros automáticos",
    "Corresponsales no bancarios",
    "Banca telefónica",
    "Oficina / Ventanillas",
    "Empresas auxiliares",
  ],
  exclusionReason:
    "Se excluyeron porque implican intervención física o retiro de efectivo, lo cual no refleja digitalización plena.",
  source: "Superintendencia de Bancos del Ecuador",
  sourceUrl: "https://www.superbancos.gob.ec/estadisticas/portalestudios/serviciosfinancieros/",
};