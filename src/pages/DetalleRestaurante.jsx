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
      <main className="bg-white min-h-screen">
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="text-7xl mb-6">🍽️</div>

          <h1 className="font-coiny text-4xl text-eco-900 mb-4">
            Restaurante no encontrado
          </h1>

          <p className="text-gray-600 mb-8">
            No existe un restaurante con el ID {id}.
          </p>

          <button
            type="button"
            onClick={() => navigate("/restaurantes")}
            className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-eco-700 transition-colors"
          >
            Volver a restaurantes
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Encabezado */}
      <section className="bg-eco-50">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <span className="inline-flex items-center bg-white text-primary px-5 py-2 rounded-full text-sm font-bold shadow-sm mb-5">
            🌱 Restaurante EcoBite
          </span>

          <h1 className="font-coiny text-4xl md:text-6xl text-eco-900 mb-5">
            {restaurant.name}
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            {restaurant.description}
          </p>

          <span className="inline-flex mt-5 bg-eco-100 text-eco-700 px-4 py-2 rounded-full text-sm font-bold">
            {restaurant.category}
          </span>
        </div>
      </section>

      {/* Información */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="bg-white border border-eco-100 rounded-3xl shadow-sm p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-24 h-24 bg-eco-50 rounded-2xl flex items-center justify-center shrink-0">
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

              <p className="text-gray-600 mt-2 leading-relaxed">
                Descubrí los platos disponibles de este restaurante y
                elegí tus favoritos.
              </p>
            </div>
          </div>
        </div>

        {/* Platos */}
        <div className="mb-8">
          <h2 className="font-coiny text-3xl text-eco-900">
            Platos disponibles
          </h2>

          <p className="text-gray-500 mt-2">
            Elegí una opción y agregala a tu carrito.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {platos.map((plato) => (
            <DishCard
              key={plato.id}
              id={`restaurante-${id}-plato-${plato.id}`}
              name={plato.name}
              description={plato.description}
              price={plato.price}
            />
          ))}
        </div>

        {/* Volver */}
        <div className="mt-12">
          <button
            type="button"
            onClick={() => navigate("/restaurantes")}
            className="border-2 border-primary text-primary px-6 py-3 rounded-xl font-bold hover:bg-eco-50 transition-colors"
          >
            ← Volver a restaurantes
          </button>
        </div>
      </section>
    </main>
  );
}

export default DetalleRestaurante;