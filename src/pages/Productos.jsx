

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProductos } from "../services/productService";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarProductos() {
      try {
        setCargando(true);
        setError("");

        const data = await getProductos();

        if (activo) {
          setProductos(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Error al cargar productos:", err);

        if (activo) {
          setError(
            "No pudimos cargar los productos. Intentá nuevamente."
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarProductos();

    return () => {
      activo = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-eco-50">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <span className="mb-5 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-bold text-primary shadow-sm">
            🥗 Opciones para elegir
          </span>

          <h1 className="mb-5 font-coiny text-4xl text-eco-900 md:text-6xl">
            Productos
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
            Explorá nuestra selección de productos y encontrá una
            opción que se adapte a vos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-16">
        <div className="mb-10">
          <h2 className="font-coiny text-3xl text-eco-900">
            Nuestro catálogo
          </h2>

          <p className="mt-2 text-gray-500">
            Elegí un producto para conocer más detalles o agregarlo
            directamente al carrito.
          </p>
        </div>

        {cargando && (
          <p className="text-gray-600" role="status">
            Cargando productos...
          </p>
        )}

        {!cargando && error && (
          <div className="py-10 text-center">
            <p className="mb-4 text-red-600" role="alert">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl bg-primary px-6 py-3 font-bold text-white hover:bg-eco-700"
            >
              Reintentar
            </button>
          </div>
        )}

        {!cargando && !error && productos.length === 0 && (
          <p className="text-gray-600">
            No hay productos disponibles por el momento.
          </p>
        )}

        {!cargando && !error && productos.length > 0 && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {productos.map((producto) => (
              <ProductCard
                key={producto.id}
                id={producto.id}
                name={producto.nombre}
                description={producto.descripcion}
                precio={producto.precio}
                restauranteId={producto.restauranteId}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Productos;
