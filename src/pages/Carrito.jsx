
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useCart } from "../context/CartContext";

function Carrito() {
  const navigate = useNavigate();

  const {
    carrito: productos,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
  } = useCart();

  const aumentarCantidad = (producto) => {
    addToCart(producto);
  };

  const disminuirCantidad = (producto) => {
    const cantidadActual = Number(producto.cantidad) || 1;

    if (cantidadActual <= 1) {
      removeFromCart(producto.id);
      return;
    }

    updateQuantity(producto.id, cantidadActual - 1);
  };

  const cantidadTotal = productos.reduce(
    (acumulado, producto) =>
      acumulado + (Number(producto.cantidad) || 0),
    0
  );

  // Comprobación temporal del cálculo del carrito.
  console.log("Carrito:", productos, "Total calculado:", total);

  // Calcula el importe directamente a partir de los productos.
  const totalCalculado = productos.reduce(
    (acumulado, producto) =>
      acumulado +
      (Number(producto.precio ?? producto.price) || 0) *
        (Number(producto.cantidad) || 0),
    0
  );

  const formatoPrecio = (precio) =>
    Number(precio || 0).toLocaleString("es-AR");

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-eco-50">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-primary shadow-sm">
            <img
              src="/carrito-verde.svg"
              alt=""
              aria-hidden="true"
              className="h-5 w-5 object-contain"
            />
            Tu compra
          </span>

          <h1 className="mb-5 font-coiny text-4xl text-eco-900 md:text-6xl">
            Mi carrito
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
            Revisá tus productos antes de confirmar tu compra.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        {productos.length === 0 ? (
          <div className="py-16 text-center">
            <img
              src="/carrito-verde.svg"
              alt="Carrito de compras vacío"
              className="mx-auto mb-6 h-20 w-20 object-contain"
            />

            <h2 className="mb-4 font-coiny text-3xl text-eco-900">
              Tu carrito está vacío
            </h2>

            <p className="mb-8 text-gray-500">
              Todavía no agregaste ningún producto.
            </p>

            <Button onClick={() => navigate("/productos")}>
              Ver productos
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-5 lg:col-span-2">
              {productos.map((producto) => (
                <article
                  key={String(producto.id)}
                  className="rounded-2xl border border-eco-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-eco-50 sm:w-28">
                      <span
                        className="text-5xl"
                        role="img"
                        aria-label="Producto"
                      >
                        🥗
                      </span>
                    </div>

                    <div className="flex-1">
                      <h2 className="font-coiny text-2xl text-eco-900">
                        {producto.nombre || producto.name}
                      </h2>

                      <p className="mt-2 text-lg font-bold text-primary">
                        $
                        {formatoPrecio(
                          producto.precio ?? producto.price
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => disminuirCantidad(producto)}
                        className="h-10 w-10 rounded-xl border-2 border-primary text-xl font-bold text-primary transition-colors hover:bg-eco-50"
                        aria-label={`Disminuir cantidad de ${
                          producto.nombre || producto.name
                        }`}
                      >
                        −
                      </button>

                      <span className="min-w-8 text-center text-lg font-bold">
                        {producto.cantidad}
                      </span>

                      <button
                        type="button"
                        onClick={() => aumentarCantidad(producto)}
                        className="h-10 w-10 rounded-xl bg-primary text-xl font-bold text-white transition-colors hover:bg-eco-700"
                        aria-label={`Aumentar cantidad de ${
                          producto.nombre || producto.name
                        }`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(producto.id)}
                      className="font-semibold text-red-500 transition-colors hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}

              <div className="pt-3">
                <button
                  type="button"
                  onClick={clearCart}
                  className="font-semibold text-red-500 transition-colors hover:text-red-700"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-eco-50 p-6">
                <h2 className="mb-6 font-coiny text-2xl text-eco-900">
                  Resumen
                </h2>

                <div className="mb-3 flex justify-between text-gray-600">
                  <span>Productos</span>
                  <span>{cantidadTotal}</span>
                </div>

                <div className="mt-4 border-t border-eco-200 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-gray-700">
                      Total
                    </span>

                    <span className="font-coiny text-2xl text-primary">
                      ${formatoPrecio(totalCalculado)}
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
