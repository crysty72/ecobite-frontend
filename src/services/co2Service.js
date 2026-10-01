const FACTOR_TRANSPORTE_TRADICIONAL = 0.10;

const FACTORES_TRANSPORTE_ALTERNATIVO = {
  Bicicleta: 0.00,
  "Auto Electrico": 0.03,
};

const EMISION_PEDIDO_TRADICIONAL = 0.21;
const PORCENTAJE_AHORRO = 0.25;

export function calcularCO2Ahorrado({
  distancia_km,
  tipo_transporte,
  estado_pedido,
}) {
  if (estado_pedido !== "Completado") {
    return {
      co2_ahorrado_transporte_kg: 0,
      co2_ahorrado_empaque_kg: 0,
      total_co2_ahorrado_kg: 0,
    };
  }

  const factorAlternativo =
    FACTORES_TRANSPORTE_ALTERNATIVO[tipo_transporte] ?? 0;

  const co2_ahorrado_transporte_kg =
    distancia_km *
    (FACTOR_TRANSPORTE_TRADICIONAL - factorAlternativo);

  const co2_ahorrado_empaque_kg =
    EMISION_PEDIDO_TRADICIONAL * PORCENTAJE_AHORRO;

  const total_co2_ahorrado_kg =
    co2_ahorrado_transporte_kg +
    co2_ahorrado_empaque_kg;

  return {
    co2_ahorrado_transporte_kg:
      Number(co2_ahorrado_transporte_kg.toFixed(4)),

    co2_ahorrado_empaque_kg:
      Number(co2_ahorrado_empaque_kg.toFixed(4)),

    total_co2_ahorrado_kg:
      Number(total_co2_ahorrado_kg.toFixed(4)),
  };
}