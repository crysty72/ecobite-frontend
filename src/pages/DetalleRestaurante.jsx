
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DishCard from "../components/DishCard";

const API_URL = "http://localhost:3000/api/v1";

function DetalleRestaurante() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurante, setRestaurante] = useState(null);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarDatos() {
      try {
        setCargando(true);
        setError("");

        const [respuestaRestaurantes, respuestaProductos] =
          await Promise.all([
            fetch(`${API_URL}/restaurantes`),
            fetch(`${API_URL}/productos`),
          ]);

        if (!respuestaRestaurantes.ok) {
          throw new Error("No se pudieron cargar los restaurantes.");
        }

        if (!respuestaProductos.ok) {
          throw new Error("No se pudieron cargar los productos.");
        }

        const [restaurantesData, productosData] = await Promise.all([
          respuestaRestaurantes.json(),
          respuestaProductos.json(),
        ]);

        if (!Array.isArray(restaurantesData) ||
            !Array.isArray(productosData)) {
          throw new Error("El servidor devolvió datos inesperados.");
        }

        const restauranteEncontrado = restaurantesData.find(
          (item) => String(item.id) === String(id)
        );

        if (!restauranteEncontrado ||
            restauranteEncontrado.fechaDesactivacion != null) {
          throw new Error("Restaurante no encontrado o no disponible.");
        }

        const productosDelRestaurante = productosData.filter(
          (producto) =>
            String(producto.restauranteId) === String(id) &&
            producto.activo === true &&
            Number.isFinite(Number(producto.id)) &&
            Number(producto.id) > 0 &&
            Number.isFinite(Number(producto.precio)) &&
            Number(producto.precio) > 0
        );

        if (activo) {
          setRestaurante(restauranteEncontrado);
          setProductos(productosDelRestaurante);
        }
      } catch (err) {
        if (activo) {
          setError(
            err.message || "No se pudo cargar el restaurante."
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarDatos();

    return () => {
      activo = false;
    };
  }, [id]);

if (cargando) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-20">
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-4"
      >
        <div
          aria-hidden="true"
          className="h-12 w-12 animate-spin rounded-full border-4 border-eco-100 border-t-primary"
        />

        <p className="text-center font-semibold text-eco-800">
          Cargando restaurante y productos...
        </p>
      </div>
    </main>
  );
}
  if (error || !restaurante) {
    return (
      <main className="min-h-screen bg-white px-6 py-20 text-center">
        <h1 className="font-coiny text-3xl text-eco-900">
          No se pudo cargar el restaurante
        </h1>

        <p className="mt-4 text-gray-600" role="alert">
          {error || "Restaurante no encontrado."}
        </p>

        <button
          type="button"
          onClick={() => navigate("/restaurantes")}
          className="mt-6 rounded-xl bg-primary px-6 py-3 font-bold text-white hover:bg-eco-700"
        >
          Volver a restaurantes
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-eco-50">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <span className="mb-5 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-bold text-primary shadow-sm">
            🌱 Restaurante EcoBite
          </span>

          <h1 className="mb-5 font-coiny text-4xl text-eco-900 md:text-6xl">
            {restaurante.nombreComercial}
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
            Descubrí los productos disponibles de este restaurante
            y elegí tus favoritos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8">
          <h2 className="font-coiny text-3xl text-eco-900">
            Productos disponibles
          </h2>

          <p className="mt-2 text-gray-500">
            Elegí una opción y agregala a tu carrito.
          </p>
        </div>

        {productos.length === 0 ? (
          <div className="rounded-2xl bg-eco-50 px-6 py-12 text-center">
            <p className="text-4xl" aria-hidden="true">🌿</p>
            <h3 className="mt-4 font-coiny text-2xl text-eco-900">
              No hay productos disponibles
            </h3>
            <p className="mt-2 text-gray-600">
              Este restaurante todavía no tiene productos activos para comprar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {productos.map((producto) => (
              <DishCard
                key={producto.id}
                id={producto.id}
                name={producto.nombre}
                description={producto.descripcion}
                price={producto.precio}
                restauranteId={producto.restauranteId}
              />
            ))}
          </div>
        )}

        <div className="mt-12">
          <button
            type="button"
            onClick={() => navigate("/restaurantes")}
            className="rounded-xl border-2 border-primary px-6 py-3 font-bold text-primary transition-colors hover:bg-eco-50"
          >
            ← Volver a restaurantes
          </button>
        </div>
      </section>
    </main>
  );
}

export default DetalleRestaurante;
