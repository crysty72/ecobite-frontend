import { calcularCO2Ahorrado } from "../services/co2Service";

function CO2Calculator() {
  const resultado = calcularCO2Ahorrado({
    distancia_km: 6.57,
    tipo_transporte: "Bicicleta",
    estado_pedido: "Completado",
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Impacto ambiental
      </h2>

      <p>
        CO₂ ahorrado por transporte:{" "}
        {resultado.co2_ahorrado_transporte_kg} kg
      </p>

      <p>
        CO₂ ahorrado por empaque:{" "}
        {resultado.co2_ahorrado_empaque_kg} kg
      </p>

      <p className="font-bold mt-2">
        Total CO₂ ahorrado:{" "}
        {resultado.total_co2_ahorrado_kg} kg
      </p>
    </div>
  );
}

export default CO2Calculator;