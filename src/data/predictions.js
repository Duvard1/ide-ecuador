// ─────────────────────────────────────────────────────────────────────────────
// MODELO PREDICTIVO — Regresión Lineal por Mínimos Cuadrados (OLS)
// ─────────────────────────────────────────────────────────────────────────────
// Justificación metodológica:
//   1. Serie corta (n=5, años 2020–2024): descarta modelos más complejos como
//      ARIMA o redes neuronales sin riesgo de sobreajuste.
//   2. Los índices muestran tendencias aproximadamente lineales o suavemente
//      crecientes, lo que valida el supuesto de linealidad.
//   3. OLS es reproducible, transparente y justificable académicamente.
//   4. El R² se reporta para que el lector evalúe la bondad del ajuste.
//   5. El intervalo de confianza se calcula con ±1.96·SE (nivel 95%).
//
// Fórmula OLS: ŷ = β₀ + β₁·x
//   donde x = año − 2020  (centrado para estabilidad numérica)
//         β₁ = Σ(xi−x̄)(yi−ȳ) / Σ(xi−x̄)²
//         β₀ = ȳ − β₁·x̄
// ─────────────────────────────────────────────────────────────────────────────

function olsPredict(years, values) {
  const n = years.length;
  const xArr = years.map((y) => y - 2020); // centrado
  const xMean = xArr.reduce((a, b) => a + b, 0) / n;
  const yMean = values.reduce((a, b) => a + b, 0) / n;

  let num = 0, den = 0;
  for (let i = 0; i < n; i++) {
    num += (xArr[i] - xMean) * (values[i] - yMean);
    den += (xArr[i] - xMean) ** 2;
  }
  const beta1 = num / den;
  const beta0 = yMean - beta1 * xMean;

  // R²
  const yHat = xArr.map((x) => beta0 + beta1 * x);
  const ssTot = values.reduce((a, yi) => a + (yi - yMean) ** 2, 0);
  const ssRes = values.reduce((a, yi, i) => a + (yi - yHat[i]) ** 2, 0);
  const r2 = 1 - ssRes / ssTot;

  // Error estándar residual
  const se = Math.sqrt(ssRes / (n - 2));

  // Predicción para un año dado
  const predict = (year) => {
    const x = year - 2020;
    const yPred = beta0 + beta1 * x;
    // Intervalo de confianza: ŷ ± 1.96·se·√(1/n + (x−x̄)²/den)
    const margin = 1.96 * se * Math.sqrt(1 / n + (x - xMean) ** 2 / den);
    return {
      value: Math.min(Math.max(parseFloat(yPred.toFixed(4)), 0), 1),
      lower: Math.min(Math.max(parseFloat((yPred - margin).toFixed(4)), 0), 1),
      upper: Math.min(Math.max(parseFloat((yPred + margin).toFixed(4)), 0), 1),
    };
  };

  return { beta0, beta1, r2, se, predict };
}

// ── Datos históricos ─────────────────────────────────────────────────────────
const years = [2020, 2021, 2022, 2023, 2024];

const seriesRaw = {
  IDE:  [0.58, 0.65, 0.68, 0.71, 0.75],
  EGDI: [0.70, 0.70, 0.69, 0.73, 0.78],
  ACC:  [0.62, 0.62, 0.62, 0.63, 0.65],
  SED:  [0.42, 0.63, 0.72, 0.74, 0.79],
};

// ── Ajuste OLS por serie ─────────────────────────────────────────────────────
const models = {};
for (const [key, vals] of Object.entries(seriesRaw)) {
  models[key] = olsPredict(years, vals);
}

// ── Construcción de la tabla completa 2020–2026 ──────────────────────────────
export const predictionTable = [2020, 2021, 2022, 2023, 2024, 2025, 2026].map((year) => {
  const isReal = year <= 2024;
  const row = { year, isReal };
  for (const [key, model] of Object.entries(models)) {
    if (isReal) {
      const idx = years.indexOf(year);
      row[key] = seriesRaw[key][idx];
      row[`${key}_lower`] = null;
      row[`${key}_upper`] = null;
    } else {
      const p = model.predict(year);
      row[key] = p.value;
      row[`${key}_lower`] = p.lower;
      row[`${key}_upper`] = p.upper;
    }
  }
  return row;
});

// ── Métricas del modelo ───────────────────────────────────────────────────────
export const modelMetrics = Object.fromEntries(
  Object.entries(models).map(([key, m]) => [
    key,
    {
      beta0: parseFloat(m.beta0.toFixed(4)),
      beta1: parseFloat(m.beta1.toFixed(4)),
      r2: parseFloat(m.r2.toFixed(4)),
      se: parseFloat(m.se.toFixed(4)),
    },
  ])
);

// ── Documentación metodológica exportada ─────────────────────────────────────
export const predictionInfo = {
  method: "Regresión Lineal por Mínimos Cuadrados (OLS)",
  formula: "ŷ = β₀ + β₁·(año − 2020)",
  confidenceLevel: "95% — margen ±1.96·SE",
  justification: [
    "Serie corta (n=5): OLS es el método más parsimonioso y evita sobreajuste.",
    "Las tendencias observadas son aproximadamente lineales en todas las series.",
    "OLS es transparente, reproducible y estándar en análisis de índices compuestos.",
    "El intervalo de confianza del 95% cuantifica la incertidumbre de la predicción.",
    "Los valores se acotaron al rango [0, 1] coherente con la escala de los índices.",
  ],
  limitations: [
    "Basado en solo 5 observaciones; intervalos amplios son esperables.",
    "No captura shocks externos (crisis, cambios de política, pandemia).",
    "Asume continuidad de las tendencias estructurales observadas.",
    "Las predicciones son orientativas, no deterministas.",
  ],
  disclaimer:
    "Los valores de 2025 y 2026 son proyecciones estadísticas basadas en tendencias históricas 2020–2024. No constituyen datos oficiales.",
};