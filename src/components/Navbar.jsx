import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white border-b border-eco-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            className="font-coiny text-3xl text-primary hover:text-eco-700 transition-colors"
          >
            EcoBite
          </Link>

          {/* Navegación */}
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
              className="font-semibold text-gray-600 hover:text-primary transition-colors px-2 py-1"
            >
              🛒 Carrito
            </Link>

            <Link
              to="/login"
              className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-eco-700 transition-colors shadow-sm"
            >
              Iniciar sesión
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;