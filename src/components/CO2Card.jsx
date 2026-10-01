function CO2Card({ totalCO2 = 0 }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="text-xl font-bold">
        Impacto ambiental
      </h2>

      <p className="mt-2 text-gray-600">
        CO₂ ahorrado
      </p>

      <p className="mt-1 text-3xl font-bold">
        {Number(totalCO2).toFixed(2)} kg
      </p>
    </div>
  );
}

export default CO2Card;