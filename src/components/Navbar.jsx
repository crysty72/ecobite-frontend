import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo / nombre */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-600"
        >
          EcoBite
        </Link>

        {/* Navegación */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-green-600"
          >
            Inicio
          </Link>

          <Link
            to="/productos"
            className="text-gray-700 hover:text-green-600"
          >
            Productos
          </Link>

          <Link
            to="/restaurantes"
            className="text-gray-700 hover:text-green-600"
          >
            Restaurantes
          </Link>

          <Link
            to="/carrito"
            className="text-gray-700 hover:text-green-600"
          >
            Carrito
          </Link>

          <Link
            to="/login"
            className="text-gray-700 hover:text-green-600"
          >
            Iniciar sesión
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar