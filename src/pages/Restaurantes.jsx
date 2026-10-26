
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";

const API_URL = "http://localhost:3000/api/v1";

const IMAGENES_RESTAURANTES = {
  hamburguesa:
    "/imagenes/restaurantes/Ecobite_Foto_restaurantes_Hamburguesa-optimized.webp",
  pizza:
    "/imagenes/restaurantes/Ecobite_Foto_restaurantes_Pizza-optimized.webp",
  sushi:
    "/imagenes/restaurantes/Ecobite_Foto_restaurantes_sushi-optimized.webp",
};

function obtenerImagenRestaurante(nombre = "") {
  const nombreNormalizado = nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  if (
    nombreNormalizado.includes("verde") ||
    nombreNormalizado.includes("sabor")
  ) {
    return IMAGENES_RESTAURANTES.hamburguesa;
  }

  if (
    nombreNormalizado.includes("ecobistro") ||
    nombreNormalizado.includes("organico")
  ) {
    return IMAGENES_RESTAURANTES.pizza;
  }

  if (nombreNormalizado.includes("sushi")) {
    return IMAGENES_RESTAURANTES.sushi;
  }

  return "";
}

function Restaurantes() {
  const navigate = useNavigate();

  const [restaurantes, setRestaurantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerRestaurantes = async () => {
      try {
        setCargando(true);
        setError("");

        const response = await fetch(`${API_URL}/restaurantes`);

        if (!response.ok) {
          throw new Error(
            `Error al consultar restaurantes (${response.status}).`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "La respuesta del servidor no tiene el formato esperado."
          );
        }

        // fechaDesactivacion null significa que el restaurante está activo.
        const activos = data.filter(
          (restaurante) =>
            restaurante.fechaDesactivacion == null
        );

        setRestaurantes(activos);
      } catch (err) {
        setError(
          err.message || "No se pudieron cargar los restaurantes."
        );
      } finally {
        setCargando(false);
      }
    };

    obtenerRestaurantes();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-eco-50">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <span className="mb-5 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-bold text-primary shadow-sm">
            🌱 Descubrí nuevas opciones
          </span>

          <h1 className="mb-5 font-coiny text-4xl text-eco-900 md:text-6xl">
            Restaurantes
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
            Encontrá lugares donde disfrutar buena comida y
            descubrir alternativas más sustentables.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-16">
        <div className="mb-10">
          <h2 className="font-coiny text-3xl text-eco-900">
            Restaurantes disponibles
          </h2>

          <p className="mt-2 text-gray-500">
            Explorá nuestras opciones y descubrí tu próximo
            lugar favorito.
          </p>
        </div>

        {cargando && (
          <div className="py-12 text-center" role="status">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-eco-200 border-t-primary" />
            <p className="font-semibold text-eco-800">
              Cargando restaurantes...
            </p>
          </div>
        )}

        {!cargando && error && (
          <div
            className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center"
            role="alert"
          >
            <p className="font-semibold text-red-800">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-primary px-5 py-3 font-bold text-white hover:bg-eco-700"
            >
              Intentar nuevamente
            </button>
          </div>
        )}

        {!cargando && !error && restaurantes.length === 0 && (
          <div className="rounded-2xl bg-eco-50 px-6 py-12 text-center">
            <p className="text-4xl" aria-hidden="true">
              🌿
            </p>

            <h3 className="mt-4 font-coiny text-2xl text-eco-900">
              Todavía no hay restaurantes disponibles
            </h3>

            <p className="mt-2 text-gray-600">
              Volvé a consultar más adelante.
            </p>
          </div>
        )}

        {!cargando && !error && restaurantes.length > 0 && (
          <>
            <p className="mb-6 text-sm text-gray-500">
              {restaurantes.length}{" "}
              {restaurantes.length === 1
                ? "restaurante disponible"
                : "restaurantes disponibles"}
            </p>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {restaurantes.map((restaurante) => (
                <article
                  key={restaurante.id}
                  className="rounded-2xl border border-eco-100 p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <RestaurantCard
                    name={restaurante.nombreComercial}
                    description={
                      restaurante.utilizaEnvasesBiodegradables
                        ? "Comprometido con el uso de envases biodegradables."
                        : "Conocé las opciones disponibles de este restaurante."
                    }
                    image={obtenerImagenRestaurante(
                      restaurante.nombreComercial
                    )}
                    badges={
                      restaurante.utilizaEnvasesBiodegradables
                        ? ["Envases biodegradables"]
                        : []
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/restaurante/${restaurante.id}`)
                    }
                    className="mt-4 w-full rounded-xl bg-primary py-3 font-bold text-white transition-colors hover:bg-eco-700 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:ring-offset-2"
                  >
                    Ver restaurante
                  </button>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Restaurantes;
