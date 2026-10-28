

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Registro inicial de eventos para comprobarlos en la consola.
const registrarEvento = (nombreEvento) => {
  console.info("[EcoBite Analytics]", nombreEvento);
};

function Registro() {
  const navigate = useNavigate();
  const { registrar } = useAuth();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState("");
  
const emailRegistrado = useRef(false);
const botonRegistrado = useRef(false);
const envioEnCurso = useRef(false);
const registroCompletado = useRef(false);
const temporizadorRedireccion = useRef(null);
  // Evento 1: visita a la pantalla de registro.
  useEffect(() => {
    registrarEvento("vista_pantalla_registro");
  }, []);
  useEffect(() => {
  return () => {
    if (temporizadorRedireccion.current !== null) {
      clearTimeout(temporizadorRedireccion.current);
    }
  };
}, []);

const handleSubmit = async (event) => {
  event.preventDefault();

  if (envioEnCurso.current || registroCompletado.current) return;

  envioEnCurso.current = true;
  setError("");
  setCargando(true)

    try {
      await registrar({
        rolId: 1,
        nombre,
        apellido,
        email,
        telefono,
        password,
      });
registroCompletado.current = true;
      // Evento 4: registro completado correctamente.
registrarEvento("exito_registro_cuenta");

setExito(
  "¡Cuenta creada con éxito! Ya sos parte de la comunidad EcoBite."
);

temporizadorRedireccion.current = setTimeout(() => {
  navigate("/restaurantes", { replace: true });
}, 2000);
  } catch (error) {
  if (error.status === 409) {
    setError(
      "Este correo electrónico ya está registrado. Iniciá sesión o utilizá otro correo."
    );
  } else if (error.status === 400) {
    setError(
      error.message || "Los datos ingresados no son válidos."
    );
  } else if (error.status === 401) {
    setError(
      "No se pudo completar el registro. Verificá los datos ingresados."
    );
  } else {
    setError(
  "No pudimos conectar con el servidor en este momento. Revisá tu conexión a internet o volvé a intentar en unos segundos."
);
  }
} finally {
  envioEnCurso.current = false;
  setCargando(false);
}
  };

  return (
    <main className="bg-eco-50 min-h-[75vh] flex items-center justify-center px-6 py-14">
      <section className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="inline-flex items-center bg-white text-primary px-5 py-2 rounded-full text-sm font-bold shadow-sm mb-5">
            🌱 Unite a EcoBite
          </span>

          <h1 className="font-coiny text-4xl md:text-5xl text-eco-900 mb-4">
            Crear una cuenta
          </h1>

          <p className="text-gray-600">
            Registrate para comenzar a disfrutar EcoBite.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-eco-100 shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="nombre"
                className="block font-bold text-gray-700 mb-2"
              >
                Nombre
              </label>

              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                placeholder="Tu nombre"
                required
                autoComplete="given-name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-eco-100"
              />
            </div>

            <div>
              <label
                htmlFor="apellido"
                className="block font-bold text-gray-700 mb-2"
              >
                Apellido
              </label>

              <input
                id="apellido"
                type="text"
                value={apellido}
                onChange={(event) => setApellido(event.target.value)}
                placeholder="Tu apellido"
                required
                autoComplete="family-name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-eco-100"
              />
            </div>

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
                onFocus={() => {
  if (!emailRegistrado.current) {
    registrarEvento("click_campo_email_registro");
    emailRegistrado.current = true;
  }
}}
                
                placeholder="tu@email.com"
                required
                autoComplete="email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-eco-100"
              />
            </div>

            <div>
              <label
                htmlFor="telefono"
                className="block font-bold text-gray-700 mb-2"
              >
                Teléfono
              </label>

              <input
                id="telefono"
                type="tel"
                value={telefono}
                onChange={(event) => setTelefono(event.target.value)}
                placeholder="11 1234 5678"
                autoComplete="tel"
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
                autoComplete="new-password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-eco-100"
              />

              <p className="text-sm text-gray-500 mt-2">
                La contraseña debe tener al menos 6 caracteres.
              </p>
            </div>
{exito && (
  <div
    role="status"
    aria-live="polite"
    className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm"
  >
    {exito}
  </div>
)}
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
             onClick={() => {
  if (!botonRegistrado.current) {
    registrarEvento("click_boton_crear_cuenta");
    botonRegistrado.current = true;
  }
}}
              disabled={cargando || !!exito}
              className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-eco-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {cargando ? "Registrando..." : "Crear cuenta"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-eco-100 text-center">
            <p className="text-sm text-gray-500">
              ¿Ya tenés una cuenta?
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-2 text-primary font-bold hover:text-eco-700 transition-colors"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Registro;
