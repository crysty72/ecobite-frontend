
import { Link } from 'react-router-dom'

const beneficios = [
  {
    icono: '🥗',
    titulo: 'Comida para disfrutar',
    descripcion:
      'Explorá las opciones disponibles y encontrá tu próxima comida favorita.',
  },
  {
    icono: '🌱',
    titulo: 'Consumo consciente',
    descripcion:
      'Descubrí alternativas que promueven hábitos de consumo más responsables.',
  },
  {
    icono: '🚲',
    titulo: 'Delivery sustentable',
    descripcion:
      'Conocé cómo el transporte y los empaques forman parte de una entrega más consciente.',
  },
]

function IlustracionEco() {
  return (
    <div
      className="relative mx-auto w-full max-w-lg"
      role="img"
      aria-label="Ilustración de alimentos frescos, hojas y una bicicleta que representan la alimentación sustentable"
    >
      <div className="absolute inset-5 rounded-full bg-[#d7f36b]/60 blur-2xl" />

      <svg
        viewBox="0 0 440 390"
        className="relative z-10 w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="220" cy="190" r="155" fill="#D7F36B" />
        <circle cx="220" cy="190" r="125" fill="#EDF7D9" />

        {/* Plato */}
        <ellipse cx="220" cy="220" rx="112" ry="91" fill="#FFFFFF" />
        <ellipse
          cx="220"
          cy="220"
          rx="94"
          ry="73"
          fill="#E8F5CF"
          stroke="#B7D77C"
          strokeWidth="3"
        />

        {/* Vegetales */}
        <path
          d="M170 229C143 198 171 166 199 188C207 155 247 162 248 196C280 183 297 217 271 239C251 264 192 260 170 229Z"
          fill="#438849"
        />
        <path
          d="M187 215C194 198 203 196 215 203C229 185 249 196 246 214C263 219 258 238 240 242C216 254 192 240 187 215Z"
          fill="#75B94D"
        />
        <circle cx="168" cy="217" r="17" fill="#F3A64B" />
        <circle cx="265" cy="226" r="16" fill="#E98669" />
        <circle cx="220" cy="247" r="13" fill="#F3A64B" />
        <circle cx="193" cy="180" r="10" fill="#E98669" />
        <circle cx="244" cy="177" r="10" fill="#F3A64B" />

        {/* Hoja decorativa */}
        <path
          d="M96 115C96 75 133 59 159 67C157 103 134 124 96 115Z"
          fill="#438849"
        />
        <path
          d="M97 115L143 78"
          stroke="#D7F36B"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M318 102C346 73 376 90 378 119C350 139 328 128 318 102Z"
          fill="#75B94D"
        />
        <path
          d="M322 105L366 119"
          stroke="#D7F36B"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Bicicleta */}
        <g
          stroke="#20382A"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="120" cy="302" r="28" />
          <circle cx="190" cy="302" r="28" />
          <path d="M120 302L143 265L164 302H120L150 283L178 265" />
          <path d="M136 265H151M178 265H190M143 265L137 254" />
        </g>

        {/* Caja de entrega */}
        <path
          d="M145 236L175 246L171 275L141 264Z"
          fill="#D7F36B"
          stroke="#20382A"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M145 236L158 225L188 236L175 246Z"
          fill="#F6F1E5"
          stroke="#20382A"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Brillos */}
        <path
          d="M315 183V199M307 191H323M333 153V163M328 158H338"
          stroke="#438849"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="104" cy="170" r="5" fill="#F3A64B" />
        <circle cx="334" cy="254" r="6" fill="#F3A64B" />
      </svg>

      <div className="absolute bottom-3 right-0 z-20 rounded-2xl border border-[#e5ebd8] bg-white px-4 py-3 shadow-lg sm:right-2">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f5cf] text-xl">
            ♻️
          </span>
          <div>
            <p className="text-sm font-bold text-[#20382a]">
              Elegí consciente
            </p>
            <p className="text-xs text-gray-500">
              Cada elección cuenta
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Home() {
  return (
    <main className="overflow-hidden bg-white text-[#26392a]">
      {/* PORTADA */}
      <section className="relative overflow-hidden bg-[#f5f7ed]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-20">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#dce8c8] bg-white px-4 py-2 text-sm font-bold text-[#386b35] shadow-sm">
              <span aria-hidden="true">🌱</span>
              Alimentación más consciente
            </span>

            <h1 className="mt-6 font-coiny text-5xl leading-[1.08] tracking-tight text-[#20382a] sm:text-6xl lg:text-7xl">
              Comé rico.
              <span className="mt-2 block text-[#438849]">
                Cuidá el planeta.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#647064] sm:text-lg sm:leading-8">
              Descubrí restaurantes y productos, elegí lo que más te gusta y
              sumate a una forma más consciente de disfrutar la comida.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/restaurantes"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#27843b] px-6 py-3 font-bold text-white shadow-md transition hover:bg-[#206c31] focus:outline-none focus:ring-4 focus:ring-[#b8dba7]"
              >
                Ver restaurantes
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/productos"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-[#438849] bg-white px-6 py-3 font-bold text-[#315e32] transition hover:bg-[#e8f5cf] focus:outline-none focus:ring-4 focus:ring-[#b8dba7]"
              >
                Explorar productos
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-[#5d6e5b]">
              <span className="flex items-center gap-2">
                <span className="text-[#438849]" aria-hidden="true">✓</span>
                Opciones para descubrir
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#438849]" aria-hidden="true">✓</span>
                Conciencia ambiental
              </span>
            </div>
          </div>

          <IlustracionEco />
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#64804a]">
            ¿Por qué EcoBite?
          </span>

          <h2 className="mt-3 font-coiny text-3xl leading-tight text-[#20382a] sm:text-4xl">
            Disfrutá más. Desperdiciá menos.
          </h2>

          <p className="mt-4 leading-7 text-[#697367]">
            Una experiencia para descubrir opciones de comida y prestar
            atención al impacto de nuestras decisiones.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {beneficios.map((beneficio, indice) => (
            <article
              key={beneficio.titulo}
              className="group rounded-3xl border border-[#e7ecdf] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#c8dfa4] hover:shadow-lg sm:p-7"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${
                  indice === 1
                    ? 'bg-[#d7f36b]'
                    : 'bg-[#e8f5cf]'
                }`}
                aria-hidden="true"
              >
                {beneficio.icono}
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-[#26392a]">
                {beneficio.titulo}
              </h3>

              <p className="mt-3 leading-7 text-[#697367]">
                {beneficio.descripcion}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* IMPACTO AMBIENTAL */}
      <section className="border-y border-[#e2eacb] bg-[#f5f7ed]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:gap-16 lg:px-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#386b35] shadow-sm">
              <span aria-hidden="true">🌍</span>
              Nuestro compromiso
            </span>

            <h2 className="mt-5 font-coiny text-3xl leading-tight text-[#20382a] sm:text-4xl lg:text-5xl">
              Cada elección cuenta.
              <span className="mt-2 block text-[#438849]">
                Cada pedido importa.
              </span>
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-[#697367] sm:text-lg sm:leading-8">
              El transporte y los empaques también forman parte de la
              experiencia. Conocé el impacto ambiental que registra EcoBite
              y descubrí por qué cada decisión consciente importa.
            </p>

            <Link
              to="/co2"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#20382a] px-6 py-3 font-bold text-white transition hover:bg-[#31563b] focus:outline-none focus:ring-4 focus:ring-[#b8dba7]"
            >
              Conocé el impacto ambiental
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="rounded-3xl border border-[#e3e9d8] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d7f36b] text-3xl">
              🌿
            </div>

            <h3 className="mt-5 font-coiny text-2xl text-[#20382a] sm:text-3xl">
              Pequeños gestos, grandes cambios
            </h3>

            <p className="mt-3 leading-7 text-[#697367]">
              Elegir con conciencia, reducir el desperdicio y considerar
              alternativas de entrega son pasos que ayudan a construir
              hábitos más responsables.
            </p>

            <div className="mt-6 space-y-4 border-t border-[#e8ecdf] pt-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f5cf] text-xl">
                  🚲
                </span>
                <div>
                  <h4 className="font-bold text-[#315e32]">
                    Transporte consciente
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-[#697367]">
                    Conocé cómo influye el traslado de los pedidos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f5cf] text-xl">
                  ♻️
                </span>
                <div>
                  <h4 className="font-bold text-[#315e32]">
                    Envases y empaques
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-[#697367]">
                    Prestá atención a los materiales y al desperdicio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVITACIÓN FINAL */}
      <section className="bg-[#20382a]">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <span className="text-4xl" aria-hidden="true">🌱</span>

          <h2 className="mt-4 font-coiny text-3xl leading-tight text-white sm:text-4xl">
            Tu próxima comida puede empezar acá.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#d7e2d2]">
            Explorá las opciones disponibles en EcoBite y encontrá algo rico
            para disfrutar.
          </p>

          <Link
            to="/restaurantes"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#d7f36b] px-7 py-3 font-bold text-[#20382a] transition hover:bg-[#c6e65a] focus:outline-none focus:ring-4 focus:ring-white/40"
          >
            Descubrir restaurantes
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Home
