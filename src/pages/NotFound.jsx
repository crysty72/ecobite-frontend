import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[75vh] bg-eco-50 flex items-center justify-center px-4 py-16">
      <section className="w-full max-w-xl rounded-3xl border border-eco-100 bg-white p-8 text-center shadow-sm sm:p-12">

        <span className="mb-5 inline-block rounded-full bg-eco-50 px-5 py-2 text-sm font-bold text-primary">
          🌱 EcoBite · Error 404
        </span>

        <h1 className="mb-5 font-coiny text-3xl text-eco-900 sm:text-4xl">
          ¿Buscabas comida sustentable por acá?
        </h1>

        <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
          Parece que esta página no existe o se movió de lugar.
          No te preocupes, el camino verde sigue por acá:
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="rounded-xl bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-eco-700"
        >
          Volver a la página principal
        </button>

      </section>
    </main>
  );
}

export default NotFound;