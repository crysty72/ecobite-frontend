import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [metodoPago, setMetodoPago] = useState("tarjeta");

  const carrito = JSON.parse(
    localStorage.getItem("carrito") || "[]"
  );

  const total = carrito.reduce(
    (acumulado, producto) =>
      acumulado +
      Number(producto.precio || 0) *
        Number(producto.cantidad || 0),
    0
  );

  const confirmarPedido = (event) => {
    event.preventDefault();

    if (!nombre.trim() || !direccion.trim()) {
      alert("Completá tu nombre y dirección.");
      return;
    }

    navigate("/confirmacion");
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Encabezado */}
      <section className="bg-eco-50">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <span className="inline-flex items-center bg-white text-primary px-5 py-2 rounded-full text-sm font-bold shadow-sm mb-5">
            🛒 Finalizá tu compra
          </span>

          <h1 className="font-coiny text-4xl md:text-6xl text-eco-900 mb-5">
            Checkout
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl">
            Completá tus datos para confirmar tu pedido.
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <form
              onSubmit={confirmarPedido}
              className="bg-white border border-eco-100 rounded-2xl shadow-sm p-6 md:p-8"
            >
              <h2 className="font-coiny text-3xl text-eco-900 mb-8">
                Datos de entrega
              </h2>

              <div className="space-y-6">
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="nombre"
                    className="block font-bold text-gray-700 mb-2"
                  >
                    Nombre completo
                  </label>

                  <input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={(event) =>
                      setNombre(event.target.value)
                    }
                    placeholder="Ingresá tu nombre"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-eco-100"
                  />
                </div>

                {/* Dirección */}
                <div>
                  <label
                    htmlFor="direccion"
                    className="block font-bold text-gray-700 mb-2"
                  >
                    Dirección
                  </label>

                  <input
                    id="direccion"
                    type="text"
                    value={direccion}
                    onChange={(event) =>
                      setDireccion(event.target.value)
                    }
                    placeholder="Ingresá tu dirección"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-eco-100"
                  />
                </div>

                {/* Método de pago */}
                <div>
                  <p className="font-bold text-gray-700 mb-3">
                    Método de pago
                  </p>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 border border-eco-100 rounded-xl p-4 cursor-pointer hover:bg-eco-50 transition-colors">
                      <input
                        type="radio"
                        name="metodoPago"
                        value="tarjeta"
                        checked={metodoPago === "tarjeta"}
                        onChange={(event) =>
                          setMetodoPago(event.target.value)
                        }
                      />

                      <span className="font-semibold text-gray-700">
                        💳 Tarjeta
                      </span>
                    </label>

                    <label className="flex items-center gap-3 border border-eco-100 rounded-xl p-4 cursor-pointer hover:bg-eco-50 transition-colors">
                      <input
                        type="radio"
                        name="metodoPago"
                        value="efectivo"
                        checked={metodoPago === "efectivo"}
                        onChange={(event) =>
                          setMetodoPago(event.target.value)
                        }
                      />

                      <span className="font-semibold text-gray-700">
                        💵 Efectivo
                      </span>
                    </label>
                  </div>
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-eco-700 transition-colors"
                >
                  Confirmar pedido
                </button>
              </div>
            </form>
          </div>

          {/* Resumen */}
          <aside>
            <div className="bg-eco-50 rounded-2xl p-6 sticky top-24">
              <h2 className="font-coiny text-2xl text-eco-900 mb-6">
                Resumen del pedido
              </h2>

              {carrito.length === 0 ? (
                <p className="text-gray-500">
                  No hay productos en el carrito.
                </p>
              ) : (
                <div className="space-y-4">
                  {carrito.map((producto) => (
                    <div
                      key={String(producto.id)}
                      className="flex justify-between gap-4"
                    >
                      <div>
                        <p className="font-bold text-gray-700">
                          {producto.nombre || producto.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          Cantidad: {producto.cantidad}
                        </p>
                      </div>

                      <span className="font-semibold text-primary">
                        $
                        {(
                          Number(producto.precio || 0) *
                          Number(producto.cantidad || 0)
                        ).toLocaleString("es-AR")}
                      </span>
                    </div>
                  ))}

                  <div className="border-t border-eco-200 pt-4 mt-4 flex justify-between items-center">
                    <span className="font-bold text-gray-700">
                      Total
                    </span>

                    <span className="font-coiny text-2xl text-primary">
                      ${total.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Checkout;