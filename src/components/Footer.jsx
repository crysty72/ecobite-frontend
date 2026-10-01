import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-eco-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Marca */}
          <div>
            <Link
              to="/"
              className="inline-block font-coiny text-3xl text-white hover:text-eco-200 transition-colors mb-4"
            >
              EcoBite 🌱
            </Link>

            <p className="text-eco-100 leading-relaxed max-w-sm">
              Delivery sustentable para una alimentación consciente.
              Elegí, disfrutá y ayudá al planeta.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="font-coiny text-xl mb-4">
              Navegación
            </h3>

            <ul className="space-y-3 text-eco-100">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition-colors"
                >
                  Inicio
                </Link>
              </li>

              <li>
                <Link
                  to="/productos"
                  className="hover:text-white transition-colors"
                >
                  Productos
                </Link>
              </li>

              <li>
                <Link
                  to="/restaurantes"
                  className="hover:text-white transition-colors"
                >
                  Restaurantes
                </Link>
              </li>

              <li>
                <Link
                  to="/carrito"
                  className="hover:text-white transition-colors"
                >
                  🛒 Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* EcoBite */}
          <div>
            <h3 className="font-coiny text-xl mb-4">
              EcoBite
            </h3>

            <p className="text-eco-100 leading-relaxed">
              🌎 Cada elección cuenta.
            </p>

            <p className="text-eco-200 text-sm leading-relaxed mt-3">
              Juntos podemos disfrutar de una alimentación más
              consciente y reducir nuestro impacto ambiental.
            </p>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-eco-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-eco-100">
            <p>
              © 2026 EcoBite. Delivery sustentable.
            </p>

            <div className="flex gap-5">
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                Privacidad
              </a>

              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                Términos
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;