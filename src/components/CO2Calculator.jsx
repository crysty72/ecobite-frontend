import { calcularCO2Ahorrado } from "../services/co2Service";

function CO2Calculator() {
  const resultado = calcularCO2Ahorrado({
    distancia_km: 6.57,
    tipo_transporte: "Bicicleta",
    estado_pedido: "Completado",
  });

  return (
    <section className="mx-auto w-full max-w-3xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-700">
          Tu impacto ambiental 🌱
        </h2>

        <p className="mt-2 text-gray-600">
          Con EcoBite, cada elección puede ayudar a cuidar el planeta.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-xl border border-green-100 bg-green-50 p-5">
          <p className="text-sm text-gray-600">
            Ahorro por transporte
          </p>

          <p className="mt-2 text-2xl font-bold text-green-700">
            {resultado.co2_ahorrado_transporte_kg.toFixed(4)} kg
          </p>
        </article>

        <article className="rounded-xl border border-green-100 bg-green-50 p-5">
          <p className="text-sm text-gray-600">
            Ahorro por empaque
          </p>

          <p className="mt-2 text-2xl font-bold text-green-700">
            {resultado.co2_ahorrado_empaque_kg.toFixed(4)} kg
          </p>
        </article>
      </div>

      <div className="mt-4 rounded-xl bg-green-700 p-6 text-white">
        <p className="text-sm">
          Total de CO₂ ahorrado
        </p>

        <p className="mt-2 text-3xl font-bold">
          {resultado.total_co2_ahorrado_kg.toFixed(4)} kg
        </p>

        <p className="mt-2 text-sm text-green-100">
          Un pequeño cambio puede generar un impacto positivo.
        </p>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Cálculo de demostración basado en un pedido completado de
        6,57 km con transporte en bicicleta. Los valores son estimaciones.
      </p>
    </section>
  );
}

export default CO2Calculator;