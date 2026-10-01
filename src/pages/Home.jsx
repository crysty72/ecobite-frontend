
import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="bg-eco-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">

          <div className="max-w-3xl">

            <span className="inline-flex items-center bg-white text-primary px-5 py-2 rounded-full text-sm font-bold shadow-sm mb-6">
              🌱 Delivery sustentable
            </span>

            <h1 className="font-coiny text-5xl md:text-7xl text-eco-900 leading-tight mb-6">
              Comé rico.
              <span className="block text-primary">
                Cuidá el planeta.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
              Descubrí restaurantes y productos que combinan buena comida
              con decisiones más sustentables.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">

              <Link
                to="/restaurantes"
                className="inline-flex justify-center items-center bg-primary text-white px-7 py-3.5 rounded-xl font-bold hover:bg-eco-700 transition-colors shadow-sm"
              >
                Ver restaurantes
              </Link>

              <Link
                to="/productos"
                className="inline-flex justify-center items-center border-2 border-primary text-primary px-7 py-3.5 rounded-xl font-bold hover:bg-eco-100 transition-colors"
              >
                Explorar productos
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">

        <div className="text-center mb-12">

          <h2 className="font-coiny text-3xl md:text-4xl text-eco-900 mb-3">
            Elegí EcoBite
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Una forma simple de disfrutar tus comidas y generar un impacto
            positivo.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <article className="bg-white rounded-2xl p-7 border border-eco-100 shadow-sm hover:shadow-md transition-shadow">

            <div className="w-14 h-14 flex items-center justify-center bg-eco-100 rounded-2xl text-3xl mb-5">
              🥗
            </div>

            <h3 className="text-xl font-bold text-eco-900 mb-2">
              Comida rica
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Encontrá opciones variadas para disfrutar todos los días.
            </p>

          </article>

          <article className="bg-white rounded-2xl p-7 border border-eco-100 shadow-sm hover:shadow-md transition-shadow">

            <div className="w-14 h-14 flex items-center justify-center bg-eco-100 rounded-2xl text-3xl mb-5">
              🌱
            </div>

            <h3 className="text-xl font-bold text-eco-900 mb-2">
              Elecciones sustentables
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Elegí alternativas que buscan reducir el impacto ambiental.
            </p>

          </article>

          <article className="bg-white rounded-2xl p-7 border border-eco-100 shadow-sm hover:shadow-md transition-shadow">

            <div className="w-14 h-14 flex items-center justify-center bg-eco-100 rounded-2xl text-3xl mb-5">
              🚴
            </div>

            <h3 className="text-xl font-bold text-eco-900 mb-2">
              Delivery simple
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Explorá, elegí tus productos y realizá tu pedido fácilmente.
            </p>

          </article>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-eco-800">

        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <h2 className="font-coiny text-3xl md:text-4xl text-white mb-4">
            Empezá a descubrir EcoBite
          </h2>

          <p className="text-eco-100 mb-8">
            Conocé nuestras opciones y elegí tu próxima comida.
          </p>

          <Link
            to="/restaurantes"
            className="inline-flex bg-white text-primary px-7 py-3.5 rounded-xl font-bold hover:bg-eco-50 transition-colors shadow-sm"
          >
            Explorar restaurantes
          </Link>

        </div>

      </section>

    </main>
  )
}

export default Home

