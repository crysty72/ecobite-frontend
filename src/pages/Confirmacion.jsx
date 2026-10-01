import { useNavigate } from "react-router-dom";

function Confirmacion() {
  const navigate = useNavigate();

  return (
    <main className="bg-white min-h-screen">
      <section className="bg-eco-50 min-h-[70vh] flex items-center">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          {/* Icono */}
          <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-8">
            <span
              className="text-5xl"
              role="img"
              aria-label="Pedido confirmado"
            >
              ✓
            </span>
          </div>

          {/* Mensaje */}
          <span className="inline-flex items-center bg-white text-primary px-5 py-2 rounded-full text-sm font-bold shadow-sm mb-5">
            🌱 Compra realizada
          </span>

          <h1 className="font-coiny text-4xl md:text-6xl text-eco-900 mb-6">
            ¡Pedido confirmado!
          </h1>

          <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Gracias por elegir EcoBite. Tu pedido fue recibido
            correctamente.
          </p>

          {/* Mensaje sustentable */}
          <div className="bg-white border border-eco-100 rounded-2xl p-6 mt-8 max-w-xl mx-auto shadow-sm">
            <p className="text-eco-800 font-semibold">
              🌎 Cada elección cuenta.
            </p>

            <p className="text-gray-500 mt-2">
              Gracias por elegir alternativas más conscientes y
              contribuir a un consumo más sustentable.
            </p>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-eco-700 transition-colors"
            >
              Volver al inicio
            </button>

            <button
              type="button"
              onClick={() => navigate("/productos")}
              className="border-2 border-primary text-primary px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Confirmacion;