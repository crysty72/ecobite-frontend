
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Carrito() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");

    if (!carritoGuardado) {
      return [];
    }

    try {
      return JSON.parse(carritoGuardado);
    } catch (error) {
      console.error("Error al leer el carrito:", error);
      return [];
    }
  });

  // Guardar automáticamente los cambios
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(productos));

    // Avisar al Navbar que el carrito cambió
    window.dispatchEvent(new Event("carritoActualizado"));
  }, [productos]);

  // Aumentar cantidad
  const aumentarCantidad = (id) => {
    setProductos((productosActuales) =>
      productosActuales.map((producto) =>
        String(producto.id) === String(id)
          ? {
              ...producto,
              cantidad: Number(producto.cantidad || 0) + 1,
            }
          : producto
      )
    );
  };

  // Disminuir cantidad
  const disminuirCantidad = (id) => {
    setProductos((productosActuales) =>
      productosActuales
        .map((producto) =>
          String(producto.id) === String(id)
            ? {
                ...producto,
                cantidad: Number(producto.cantidad || 0) - 1,
              }
            : producto
        )
        .filter(
          (producto) => Number(producto.cantidad || 0) > 0
        )
    );
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    setProductos((productosActuales) =>
      productosActuales.filter(
        (producto) =>
          String(producto.id) !== String(id)
      )
    );
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setProductos([]);
    localStorage.removeItem("carrito");

    // Actualizar inmediatamente el contador
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  // Cantidad total de unidades
  const cantidadTotal = productos.reduce(
    (total, producto) =>
      total + Number(producto.cantidad || 0),
    0
  );

  // Calcular total
  const total = productos.reduce(
    (acumulado, producto) =>
      acumulado +
      Number(producto.precio || 0) *
        Number(producto.cantidad || 0),
    0
  );

  return (
    <main className="bg-white min-h-screen">
      {/* Encabezado */}
      <section className="bg-eco-50">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <span className="inline-flex items-center bg-white text-primary px-5 py-2 rounded-full text-sm font-bold shadow-sm mb-5">
            🛒 Tu compra
          </span>

          <h1 className="font-coiny text-4xl md:text-6xl text-eco-900 mb-5">
            Mi carrito
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Revisá tus productos antes de confirmar tu compra.
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        {productos.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-7xl mb-6">🛒</div>

            <h2 className="font-coiny text-3xl text-eco-900 mb-4">
              Tu carrito está vacío
            </h2>

            <p className="text-gray-500 mb-8">
              Todavía no agregaste ningún producto.
            </p>

            <Button
              onClick={() => navigate("/productos")}
            >
              Ver productos
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Productos */}
            <div className="lg:col-span-2 space-y-5">
              {productos.map((producto) => (
                <article
                  key={String(producto.id)}
                  className="bg-white border border-eco-100 rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    {/* Imagen */}
                    <div className="w-full sm:w-28 h-28 bg-eco-50 rounded-xl flex items-center justify-center shrink-0">
                      <span
                        className="text-5xl"
                        role="img"
                        aria-label="Producto"
                      >
                        🥗
                      </span>
                    </div>

                    {/* Información */}
                    <div className="flex-1">
                      <h2 className="font-coiny text-2xl text-eco-900">
                        {producto.nombre || producto.name}
                      </h2>

                      <p className="text-primary font-bold text-lg mt-2">
                        $
                        {Number(
                          producto.precio || 0
                        ).toLocaleString("es-AR")}
                      </p>
                    </div>

                    {/* Cantidad */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          disminuirCantidad(producto.id)
                        }
                        className="w-10 h-10 rounded-xl border-2 border-primary text-primary font-bold text-xl hover:bg-eco-50 transition-colors"
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>

                      <span className="min-w-8 text-center font-bold text-lg">
                        {producto.cantidad}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          aumentarCantidad(producto.id)
                        }
                        className="w-10 h-10 rounded-xl bg-primary text-white font-bold text-xl hover:bg-eco-700 transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    {/* Eliminar */}
                    <button
                      type="button"
                      onClick={() =>
                        eliminarProducto(producto.id)
                      }
                      className="text-red-500 font-semibold hover:text-red-700 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}

              {/* Vaciar */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={vaciarCarrito}
                  className="text-red-500 font-semibold hover:text-red-700 transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>

            {/* Resumen */}
            <aside className="lg:col-span-1">
              <div className="bg-eco-50 rounded-2xl p-6 sticky top-24">
                <h2 className="font-coiny text-2xl text-eco-900 mb-6">
                  Resumen
                </h2>

                <div className="flex justify-between text-gray-600 mb-3">
                  <span>Productos</span>

                  <span>{cantidadTotal}</span>
                </div>

                <div className="border-t border-eco-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-700">
                      Total
                    </span>

                    <span className="font-coiny text-2xl text-primary">
                      ${total.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    className="w-full"
                    onClick={() => navigate("/checkout")}
                  >
                    Continuar compra
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

export default Carrito;

