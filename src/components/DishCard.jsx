function DishCard({
  id,
  name,
  description,
  price,
}) {
  const agregarAlCarrito = () => {
    const carritoActual =
      JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carritoActual.find(
      (producto) => String(producto.id) === String(id)
    );

    let nuevoCarrito;

    if (productoExistente) {
      nuevoCarrito = carritoActual.map((producto) =>
        String(producto.id) === String(id)
          ? {
              ...producto,
              cantidad: Number(producto.cantidad) + 1,
            }
          : producto
      );
    } else {
      nuevoCarrito = [
        ...carritoActual,
        {
          id,
          nombre: name,
          precio: price,
          cantidad: 1,
        },
      ];
    }

    localStorage.setItem(
      "carrito",
      JSON.stringify(nuevoCarrito)
    );

    alert(`${name} fue agregado al carrito`);
  };

  return (
    <article className="bg-white rounded-2xl border border-eco-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Imagen */}
      <div className="w-full h-52 bg-eco-50 flex items-center justify-center">
        <span
          className="text-6xl"
          role="img"
          aria-label="Plato de comida"
        >
          🥗
        </span>
      </div>

      {/* Información */}
      <div className="p-6">
        <h3 className="font-coiny text-2xl text-eco-900">
          {name}
        </h3>

        <p className="mt-3 text-gray-600 leading-relaxed">
          {description}
        </p>

        <p className="mt-5 text-xl font-bold text-primary">
          ${Number(price).toLocaleString("es-AR")}
        </p>

        <button
          type="button"
          onClick={agregarAlCarrito}
          className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold hover:bg-eco-700 transition-colors"
        >
          🛒 Agregar al carrito
        </button>
      </div>
    </article>
  );
}

export default DishCard;