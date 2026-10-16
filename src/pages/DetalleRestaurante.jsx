
import { useParams, useNavigate } from "react-router-dom";
import DishCard from "../components/DishCard";

function DetalleRestaurante() {
  const { id } = useParams();
  const navigate = useNavigate();

  const restaurants = [
    {
      id: 1,
      name: "Restaurante Verde",
      description:
        "Comida casera y opciones saludables elaboradas con ingredientes frescos.",
      category: "Cercanos",
    },
    {
      id: 2,
      name: "Sabores Naturales",
      description:
        "Alimentos sustentables y frescos para disfrutar todos los días.",
      category: "Sustentables",
    },
    {
      id: 3,
      name: "Eco Cocina",
      description:
        "Comida saludable y productos locales preparados con conciencia.",
      category: "Productos locales",
    },
  ];

  const platos = [
    {
      id: 1,
      name: "Ensalada de estación",
      description:
        "Vegetales frescos de temporada con ingredientes naturales.",
      price: 4500,
    },
    {
      id: 2,
      name: "Bowl vegetariano",
      description:
        "Una combinación equilibrada de vegetales, cereales y semillas.",
      price: 5200,
    },
    {
      id: 3,
      name: "Wrap saludable",
      description:
        "Wrap elaborado con vegetales frescos y una preparación casera.",
      price: 4800,
    },
  ];

  const restaurant = restaurants.find(
    (item) => item.id === Number(id)
  );

  if (!restaurant) {
    return (
      <main className="min-h-screen bg-white">
        <section className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="mb-6 text-7xl">🍽️</div>

          <h1 className="mb-4 font-coiny text-4xl text-eco-900">
            Restaurante no encontrado
          </h1>

          <p className="mb-8 text-gray-600">
            No existe un restaurante con el ID {id}.
          </p>

          <button
            type="button"
            onClick={() => navigate("/restaurantes")}
            className="rounded-xl bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-eco-700"
          >
            Volver a restaurantes
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Encabezado */}
      <section className="bg-eco-50">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <span className="mb-5 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-bold text-primary shadow-sm">
            🌱 Restaurante EcoBite
          </span>

          <h1 className="mb-5 font-coiny text-4xl text-eco-900 md:text-6xl">
            {restaurant.name}
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
            {restaurant.description}
          </p>

          <span className="mt-5 inline-flex rounded-full bg-eco-100 px-4 py-2 text-sm font-bold text-eco-700">
            {restaurant.category}
          </span>
        </div>
      </section>

      {/* Información del restaurante */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-12 rounded-3xl border border-eco-100 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-eco-50">
              <span
                className="text-5xl"
                role="img"
                aria-label="Restaurante"
              >
                🍽️
              </span>
            </div>

            <div>
              <h2 className="font-coiny text-3xl text-eco-900">
                Una propuesta consciente
              </h2>

              <p className="mt-2 leading-relaxed text-gray-600">
                Descubrí los platos disponibles de este restaurante y
                elegí tus favoritos.
              </p>
            </div>
          </div>
        </div>

        {/* Platos disponibles */}
        <div className="mb-8">
          <h2 className="font-coiny text-3xl text-eco-900">
            Platos disponibles
          </h2>

          <p className="mt-2 text-gray-500">
            Elegí una opción y agregala a tu carrito.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {platos.map((plato) => (
  <DishCard
    key={`restaurante-${restaurant.id}-plato-${plato.id}`}
    id={`restaurante-${restaurant.id}-plato-${plato.id}`}
    name={plato.name}
    description={plato.description}
    price={plato.price}
    restauranteId={restaurant.id}
  />
))}
        </div>

        {/* Volver */}
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
