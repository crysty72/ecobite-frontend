import { useParams, useNavigate } from "react-router-dom";

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const productos = [
    {
      id: 1,
      name: "Ensalada fresca",
      description:
        "Una opción liviana preparada con ingredientes frescos.",
      category: "Alimentos",
      price: 4500,
    },
    {
      id: 2,
      name: "Bowl saludable",
      description:
        "Combinación equilibrada de vegetales y alimentos naturales.",
      category: "Alimentos",
      price: 5200,
    },
    {
      id: 3,
      name: "Wrap vegetal",
      description:
        "Una alternativa práctica, rica y consciente.",
      category: "Alimentos",
      price: 4800,
    },
    {
      id: 4,
      name: "Plato del día",
      description:
        "Una propuesta casera elaborada con ingredientes seleccionados.",
      category: "Alimentos",
      price: 5500,
    },
    {
      id: 5,
      name: "Smoothie natural",
      description:
        "Frutas frescas combinadas en una bebida nutritiva.",
      category: "Bebidas",
      price: 3500,
    },
    {
      id: 6,
      name: "Postre saludable",
      description:
        "Una opción dulce para cerrar tu comida.",
      category: "Postres",
      price: 3200,
    },
  ];

  const producto = productos.find(
    (item) => item.id === Number(id)
  );

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

  const agregarAlCarrito = () => {
    const carritoActual =
      JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carritoActual.find(
      (item) => Number(item.id) === Number(producto.id)
    );

    let nuevoCarrito;

    if (productoExistente) {
      nuevoCarrito = carritoActual.map((item) =>
        Number(item.id) === Number(producto.id)
          ? {
              ...item,
              cantidad: Number(item.cantidad) + 1,
            }
          : item
      );
    } else {
      nuevoCarrito = [
        ...carritoActual,
        {
          id: producto.id,
          nombre: producto.name,
          precio: producto.price,
          cantidad: 1,
        },
      ];
    }

    localStorage.setItem(
      "carrito",
      JSON.stringify(nuevoCarrito)
    );

    navigate("/carrito");
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Encabezado */}
      <section className="bg-eco-50">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <span className="inline-flex items-center bg-white text-primary px-5 py-2 rounded-full text-sm font-bold shadow-sm mb-5">
            🥗 Detalle del producto
          </span>

          <h1 className="font-coiny text-4xl md:text-6xl text-eco-900">
            {producto.name}
          </h1>
        </div>
      </section>

      {/* Detalle */}
      <section className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Imagen */}
          <div className="bg-eco-50 rounded-3xl min-h-[350px] flex items-center justify-center">
            <span
              className="text-8xl"
              role="img"
              aria-label="Producto"
            >
              🥗
            </span>
          </div>

          {/* Información */}
          <div>
            <span className="inline-flex bg-eco-100 text-eco-700 px-4 py-2 rounded-full text-sm font-bold mb-5">
              {producto.category}
            </span>

            <h2 className="font-coiny text-4xl text-eco-900 mb-5">
              {producto.name}
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {producto.description}
            </p>

            <p className="font-coiny text-3xl text-primary mb-8">
              ${producto.price.toLocaleString("es-AR")}
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