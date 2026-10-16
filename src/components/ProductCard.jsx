import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({
  id,
  name,
  description,
  precio,
  restauranteId,
}) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const agregarAlCarrito = () => {
    addToCart({
      id,
      nombre: name,
      precio: Number(precio),
      restauranteId,
    });

    alert(`${name} fue agregado al carrito`);
  };

  return (
    <article className="bg-white rounded-2xl border border-eco-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-48 bg-eco-50 flex items-center justify-center">
        <span
          className="text-5xl"
          role="img"
          aria-label="Producto"
        >
          🥗
        </span>
      </div>

      <div className="p-6">
        <h2 className="font-coiny text-2xl text-eco-900">
          {name}
        </h2>

        <p className="mt-3 text-gray-600 leading-relaxed">
          {description}
        </p>

        <p className="mt-4 text-xl font-bold text-primary">
          ${precio}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => navigate(`/producto/${id}`)}
            className="w-full border-2 border-primary text-primary py-3 rounded-xl font-bold hover:bg-eco-50 transition-colors"
          >
            Ver producto
          </button>

          <button
            type="button"
            onClick={agregarAlCarrito}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-eco-700 transition-colors"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;