function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Marca */}
          <div>
            <h2 className="text-xl font-bold mb-2">
              EcoBite 🌱
            </h2>

            <p className="text-green-100">
              Delivery sustentable para una alimentación consciente.
            </p>
          </div>

          {/* Enlaces institucionales */}
          <div>
            <h3 className="font-semibold mb-3">
              Institucional
            </h3>

            <ul className="space-y-2 text-green-100">
              <li>
                <a href="#" className="hover:text-white">
                  Sobre EcoBite
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Términos y condiciones
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Política de privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h3 className="font-semibold mb-3">
              Seguinos
            </h3>

            <div className="flex gap-4 text-green-100">
              <a href="#" className="hover:text-white">
                Instagram
              </a>

              <a href="#" className="hover:text-white">
                Facebook
              </a>

              <a href="#" className="hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-green-700 mt-8 pt-4 text-center text-green-100">
          <p>
            © 2026 EcoBite. Delivery sustentable.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer