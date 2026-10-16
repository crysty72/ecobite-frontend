
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductos } from "../services/productService";
import { useCart } from "../context/CartContext";

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarProducto() {
      try {
        setCargando(true);
        setError("");

        const productos = await getProductos();

        const encontrado = productos.find(
          (item) => Number(item.id) === Number(id)
        );

        if (activo) {
          setProducto(encontrado || null);
        }
      } catch (err) {
        console.error("Error al cargar el producto:", err);

        if (activo) {
          setError("No pudimos cargar el producto. Intentá nuevamente.");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarProducto();

    return () => {
      activo = false;
    };
  }, [id]);

  const agregarAlCarrito = () => {
    if (!producto) return;

    addToCart(producto);
    navigate("/carrito");
  };

  if (cargando) {
    return (
      <main className="min-h-screen bg-white px-6 py-20 text-center">
        <p className="text-gray-600">Cargando producto...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white px-6 py-20 text-center">
        <p className="text-red-600 mb-6">{error}</p>

        <button
          type="button"
          onClick={() => navigate("/productos")}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-eco-700 transition-colors"
        >
          Volver a productos
        </button>
      </main>
    );
  }

  if (!producto) {
    return (
      <main className="bg-white min-h-screen">
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="text-7xl mb-6">🥗</div>

          <h1 className="font-coiny text-4xl text-eco-900 mb-4">
            Producto no encontrado
          </h1>

          <p className="text-gray-600 mb-8">
            No existe un producto con el ID {id}.
          </p>

          <button
            type="button"
            onClick={() => navigate("/productos")}
            className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-eco-700 transition-colors"
          >
            Volver a productos
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <section className="bg-eco-50">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <span className="inline-flex items-center bg-white text-primary px-5 py-2 rounded-full text-sm font-bold shadow-sm mb-5">
            🥗 Detalle del producto
          </span>

          <h1 className="font-coiny text-4xl md:text-6xl text-eco-900">
            {producto.nombre}
          </h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="bg-eco-50 rounded-3xl min-h-[350px] flex items-center justify-center">
            <span
              className="text-8xl"
              role="img"
              aria-label="Producto"
            >
              🥗
            </span>
          </div>

          <div>
            <span className="inline-flex bg-eco-100 text-eco-700 px-4 py-2 rounded-full text-sm font-bold mb-5">
              {producto.categoria?.nombre || "Alimentos"}
            </span>

            <h2 className="font-coiny text-4xl text-eco-900 mb-5">
              {producto.nombre}
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {producto.descripcion}
            </p>

            <p className="font-coiny text-3xl text-primary mb-8">
              ${Number(producto.precio).toLocaleString("es-AR")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={agregarAlCarrito}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-eco-700 transition-colors"
              >
                🛒 Agregar al carrito
              </button>

              <button
                type="button"
                onClick={() => navigate("/productos")}
                className="flex-1 border-2 border-primary text-primary px-6 py-3 rounded-xl font-bold hover:bg-eco-50 transition-colors"
              >
                ← Volver a productos
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DetalleProducto;
