
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setCargando(true);

    try {
      const data = await login(email, password);

      if (Number(data.usuario?.rolId) === 3) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/restaurantes", { replace: true });
      }
    } catch (error) {
      if (error.status === 401) {
        setError(
  "El correo o la contraseña no coinciden. Revisá los datos e intentá de nuevo."
);
      } else if (error.status === 400) {
        setError(error.message || "Los datos ingresados no son válidos.");
      } else {
        setError(
  "No pudimos conectar con el servidor en este momento. Revisá tu conexión a internet o volvé a intentar en unos segundos."
);
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="bg-eco-50 min-h-[75vh] flex items-center justify-center px-6 py-14">
      <section className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="inline-flex items-center bg-white text-primary px-5 py-2 rounded-full text-sm font-bold shadow-sm mb-5">
            🌱 Bienvenido a EcoBite
          </span>

          <h1 className="font-coiny text-4xl md:text-5xl text-eco-900 mb-4">
            Iniciar sesión
          </h1>

          <p className="text-gray-600">
            Ingresá a tu cuenta para continuar.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-eco-100 shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block font-bold text-gray-700 mb-2"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="tu@email.com"
                required
                autoComplete="email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-eco-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-bold text-gray-700 mb-2"
              >
                Contraseña
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete="current-password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-eco-100"
              />

              <p className="text-sm text-gray-500 mt-2">
                La contraseña debe tener al menos 6 caracteres.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-eco-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {cargando ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-eco-100 text-center">
            <p className="text-sm text-gray-500">
              ¿Todavía no tenés una cuenta?
            </p>

            <button
              type="button"
              onClick={() => navigate("/registro")}
              className="mt-2 text-primary font-bold hover:text-eco-700 transition-colors"
            >
              Crear una cuenta
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
