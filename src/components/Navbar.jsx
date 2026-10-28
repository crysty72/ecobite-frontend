
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoEcoBite from "../assets/Ecobite_Isologotipo_.png";

function Navbar() {
  const { usuario, estaAutenticado, logout } = useAuth();

  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Actualizar cantidad de productos del carrito
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

  // Cerrar menú móvil
  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  // Cerrar sesión
  const handleLogout = () => {
    logout();
    cerrarMenu();
  };

  const claseEnlace =
    "rounded-lg px-2 py-1 font-semibold text-gray-600 transition-colors hover:text-primary";

  return (
    <nav
      className="sticky top-0 z-50 border-b border-eco-100 bg-white"
      aria-label="Navegación principal"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">

        <div className="flex items-center justify-between gap-4">

          {/* LOGO */}
          <Link
            to="/"
            onClick={cerrarMenu}
            className="group flex w-fit shrink-0 items-center"
            aria-label="EcoBite - Inicio"
          >
            <img
              src={logoEcoBite}
              alt="EcoBite"
              className="h-14 w-auto max-w-[180px] object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* BOTÓN HAMBURGUESA - SOLO MÓVIL */}
          <button
            type="button"
            onClick={() => setMenuAbierto((anterior) => !anterior)}
            className="rounded-lg border border-eco-100 p-2 text-2xl text-primary transition-colors hover:bg-eco-50 md:hidden"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
            aria-controls="menu-principal"
          >
            {menuAbierto ? "✕" : "☰"}
          </button>

          {/* NAVEGACIÓN */}
          <div
            id="menu-principal"
            className={`${
              menuAbierto ? "flex" : "hidden"
            } absolute left-0 right-0 top-full flex-col items-start gap-3 border-b border-eco-100 bg-white px-6 py-4 shadow-md md:static md:flex md:flex-row md:flex-wrap md:items-center md:justify-end md:gap-x-5 md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none`}
          >

            <Link
              to="/"
              onClick={cerrarMenu}
              className={claseEnlace}
            >
              Inicio
            </Link>

            <Link
              to="/productos"
              onClick={cerrarMenu}
              className={claseEnlace}
            >
              Productos
            </Link>

            <Link
              to="/restaurantes"
              onClick={cerrarMenu}
              className={claseEnlace}
            >
              Restaurantes
            </Link>

            {/* IMPACTO AMBIENTAL */}
            <Link
              to="/co2"
              onClick={cerrarMenu}
              className={claseEnlace}
            >
              🌱 Impacto ambiental
            </Link>

            {/* CARRITO */}
            <Link
              to="/carrito"
              onClick={cerrarMenu}
              className={`relative ${claseEnlace}`}
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
                onClick={cerrarMenu}
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