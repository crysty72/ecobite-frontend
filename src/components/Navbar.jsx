
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { usuario, estaAutenticado, logout } = useAuth();

  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  const actualizarCarrito = () => {
    const carritoGuardado = localStorage.getItem("carrito");

    if (!carritoGuardado) {
      setCantidadCarrito(0);
      return;
    }

    try {
      const carrito = JSON.parse(carritoGuardado);

      const cantidadTotal = carrito.reduce(
        (total, producto) =>
          total + Number(producto.cantidad || 0),
        0
      );

      setCantidadCarrito(cantidadTotal);
    } catch (error) {
      console.error("Error al leer el carrito:", error);
      setCantidadCarrito(0);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    actualizarCarrito();

    window.addEventListener("storage", actualizarCarrito);
    window.addEventListener(
      "carritoActualizado",
      actualizarCarrito
    );

    return () => {
      window.removeEventListener(
        "storage",
        actualizarCarrito
      );

      window.removeEventListener(
        "carritoActualizado",
        actualizarCarrito
      );
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white border-b border-eco-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* LOGO */}
          <Link
            to="/"
            className="group flex items-center gap-3 w-fit"
            aria-label="EcoBite - Inicio"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-eco-50 group-hover:bg-eco-100 transition-colors">
              <span
                className="text-3xl"
                role="img"
                aria-hidden="true"
              >
                🌱
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-coiny text-3xl leading-none text-primary group-hover:text-eco-700 transition-colors">
                EcoBite
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-eco-600 mt-1">
                Comer · Cuidar · Conectar
              </span>
            </div>
          </Link>

          {/* NAVEGACIÓN */}
          <div className="flex flex-wrap items-center gap-3 md:gap-5">

            <Link
              to="/"
              className="font-semibold text-gray-600 hover:text-primary transition-colors px-2 py-1"
            >
              Inicio
            </Link>

            <Link
              to="/productos"
              className="font-semibold text-gray-600 hover:text-primary transition-colors px-2 py-1"
            >
              Productos
            </Link>

            <Link
              to="/restaurantes"
              className="font-semibold text-gray-600 hover:text-primary transition-colors px-2 py-1"
            >
              Restaurantes
            </Link>

            <Link
              to="/carrito"
              className="relative font-semibold text-gray-600 hover:text-primary transition-colors px-2 py-1"
            >
              🛒 Carrito

              {cantidadCarrito > 0 && (
                <span className="ml-2 inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full bg-primary text-white text-xs font-bold">
                  {cantidadCarrito}
                </span>
              )}
            </Link>

            {/* USUARIO AUTENTICADO */}
            {estaAutenticado ? (
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700">
                  👋 Hola, {usuario?.nombre}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="border border-primary text-primary px-4 py-2 rounded-xl font-bold hover:bg-eco-50 transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-eco-700 transition-colors shadow-sm"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


