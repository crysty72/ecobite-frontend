


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoEcoBite from "../assets/Ecobite_Isologotipo_.png";

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

      const cantidadTotal = Array.isArray(carrito)
        ? carrito.reduce(
            (total, producto) =>
              total + Number(producto.cantidad || 0),
            0
          )
        : 0;

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
    window.addEventListener("carritoActualizado", actualizarCarrito);

    return () => {
      window.removeEventListener("storage", actualizarCarrito);
      window.removeEventListener("carritoActualizado", actualizarCarrito);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-eco-100 bg-white"
      aria-label="Navegación principal"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          {/* LOGO ORIGINAL DE DISEÑO */}
          <Link
            to="/"
            className="group flex w-fit shrink-0 items-center"
            aria-label="EcoBite - Inicio"
          >
            <img
              src={logoEcoBite}
              alt="EcoBite"
              className="h-14 w-auto max-w-[180px] object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* NAVEGACIÓN */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:justify-end md:gap-x-5">

            <Link
              to="/"
              className="rounded-lg px-2 py-1 font-semibold text-gray-600 transition-colors hover:text-primary"
            >
              Inicio
            </Link>

            <Link
              to="/productos"
              className="rounded-lg px-2 py-1 font-semibold text-gray-600 transition-colors hover:text-primary"
            >
              Productos
            </Link>

            <Link
              to="/restaurantes"
              className="rounded-lg px-2 py-1 font-semibold text-gray-600 transition-colors hover:text-primary"
            >
              Restaurantes
            </Link>

            <Link
              to="/carrito"
              className="relative rounded-lg px-2 py-1 font-semibold text-gray-600 transition-colors hover:text-primary"
              aria-label={`Carrito, ${cantidadCarrito} productos`}
            >
              <span aria-hidden="true">🛒</span> Carrito

              {cantidadCarrito > 0 && (
                <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-white">
                  {cantidadCarrito}
                </span>
              )}
            </Link>

            {/* USUARIO AUTENTICADO */}
            {estaAutenticado ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-semibold text-gray-700">
                  👋 Hola, {usuario?.nombre || "usuario"}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border border-primary px-4 py-2 font-bold text-primary transition-colors hover:bg-eco-50"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-xl bg-primary px-5 py-2.5 font-bold text-white shadow-sm transition-colors hover:bg-eco-700"
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