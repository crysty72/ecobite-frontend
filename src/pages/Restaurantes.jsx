import { useNavigate } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";

function Restaurantes() {
  const navigate = useNavigate();

  const restaurantes = [
    {
      id: 1,
      name: "Restaurante Verde",
      description:
        "Opciones frescas y sustentables para disfrutar.",
      image: "",
      rating: 4.8,
      badges: [
        "Envases reutilizables",
        "Productos locales",
      ],
    },
    {
      id: 2,
      name: "Sabores Naturales",
      description:
        "Comida rica elaborada con ingredientes seleccionados.",
      image: "",
      rating: 4.6,
      badges: [
        "Ingredientes locales",
      ],
    },
    {
      id: 3,
      name: "Eco Cocina",
      description:
        "Propuestas caseras y conscientes para todos los días.",
      image: "",
      rating: 4.7,
      badges: [
        "Cocina sustentable",
        "Sin plástico",
      ],
    },
  ];

  return (
    <main className="bg-white min-h-screen">
      {/* Encabezado */}
      <section className="bg-eco-50">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <span className="inline-flex items-center bg-white text-primary px-5 py-2 rounded-full text-sm font-bold shadow-sm mb-5">
            🌱 Descubrí nuevas opciones
          </span>

          <h1 className="font-coiny text-4xl md:text-6xl text-eco-900 mb-5">
            Restaurantes
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Encontrá lugares donde disfrutar buena comida y
            descubrir alternativas más sustentables.
          </p>
        </div>
      </section>

      {/* Restaurantes */}
      <section className="max-w-7xl mx-auto px-6 py-14 md:py-16">
        <div className="mb-10">
          <h2 className="font-coiny text-3xl text-eco-900">
            Restaurantes disponibles
          </h2>

          <p className="text-gray-500 mt-2">
            Explorá nuestras opciones y descubrí tu próximo
            lugar favorito.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {restaurantes.map((restaurante) => (
            <div key={restaurante.id}>
              <RestaurantCard
                name={restaurante.name}
                description={restaurante.description}
                image={restaurante.image}
                rating={restaurante.rating}
                badges={restaurante.badges}
              />

              {/* Botón para entrar al restaurante */}
              <button
                type="button"
                onClick={() =>
                  navigate(`/restaurante/${restaurante.id}`)
                }
                className="w-full mt-3 bg-primary text-white py-3 rounded-xl font-bold hover:bg-eco-700 transition-colors"
              >
                Ver restaurante
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Restaurantes;