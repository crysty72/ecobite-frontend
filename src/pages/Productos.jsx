import ProductCard from "../components/ProductCard";

function Productos() {
  const productos = [
    {
      id: 1,
      name: "Ensalada fresca",
      description:
        "Una opción liviana preparada con ingredientes frescos.",
      precio: 4500,
    },
    {
      id: 2,
      name: "Bowl saludable",
      description:
        "Combinación equilibrada de vegetales y alimentos naturales.",
      precio: 5200,
    },
    {
      id: 3,
      name: "Wrap vegetal",
      description:
        "Una alternativa práctica, rica y consciente.",
      precio: 4800,
    },
    {
      id: 4,
      name: "Plato del día",
      description:
        "Una propuesta casera elaborada con ingredientes seleccionados.",
      precio: 5500,
    },
    {
      id: 5,
      name: "Smoothie natural",
      description:
        "Frutas frescas combinadas en una bebida nutritiva.",
      precio: 3500,
    },
    {
      id: 6,
      name: "Postre saludable",
      description:
        "Una opción dulce para cerrar tu comida.",
      precio: 3200,
    },
  ];

  return (
    <main className="bg-white min-h-screen">

      {/* ENCABEZADO */}
      <section className="bg-eco-50">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">

          <span className="inline-flex items-center bg-white text-primary px-5 py-2 rounded-full text-sm font-bold shadow-sm mb-5">
            🥗 Opciones para elegir
          </span>

          <h1 className="font-coiny text-4xl md:text-6xl text-eco-900 mb-5">
            Productos
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Explorá nuestra selección de productos y encontrá una
            opción que se adapte a vos.
          </p>

        </div>
      </section>

      {/* CATÁLOGO */}
      <section className="max-w-7xl mx-auto px-6 py-14 md:py-16">

        <div className="mb-10">

          <h2 className="font-coiny text-3xl text-eco-900">
            Nuestro catálogo
          </h2>

          <p className="text-gray-500 mt-2">
            Elegí un producto para conocer más detalles o agregarlo
            directamente al carrito.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

          {productos.map((producto) => (
            <ProductCard
              key={producto.id}
              id={producto.id}
              name={producto.name}
              description={producto.description}
              precio={producto.precio}
            />
          ))}

        </div>

      </section>

    </main>
  );
}

export default Productos;