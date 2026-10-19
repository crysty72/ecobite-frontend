

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:3000/api/v1";

const accesos = [
  {
    titulo: "Productos",
    descripcion: "Gestionar el catálogo de productos",
    ruta: "/productos",
    icono: "🥗",
  },
  {
    titulo: "Restaurantes",
    descripcion: "Consultar los restaurantes registrados",
    ruta: "/restaurantes",
    icono: "🏪",
  },
  {
    titulo: "Pedidos",
    descripcion: "Consultar los pedidos registrados",
    ruta: "/carrito",
    icono: "📦",
  },
  {
    titulo: "Impacto ambiental",
    descripcion: "Consultar las métricas de sostenibilidad",
    ruta: "/co2",
    icono: "🌱",
  },
];

function formatearKg(valor) {
  return Number(valor ?? 0).toLocaleString("es-AR", {
    maximumFractionDigits: 4,
  });
}

function AdminDashboard() {
  const { usuario, logout } = useAuth();

  const [totalProductos, setTotalProductos] = useState(null);
  const [productosExcedentes, setProductosExcedentes] = useState(null);
  const [errorProductos, setErrorProductos] = useState(false);

  const [totalRestaurantes, setTotalRestaurantes] = useState(null);
  const [errorRestaurantes, setErrorRestaurantes] = useState(false);

  const [totalPedidos, setTotalPedidos] = useState(null);
  const [errorPedidos, setErrorPedidos] = useState(false);

  const [kpisAmbientales, setKpisAmbientales] = useState(null);
  const [errorImpacto, setErrorImpacto] = useState(false);

  // Cargar productos
  useEffect(() => {
    async function cargarProductos() {
      try {
        const response = await fetch(`${API_URL}/productos`);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const productos = await response.json();

        if (!Array.isArray(productos)) {
          throw new Error("La respuesta de productos no es una lista");
        }

        const productosActivos = productos.filter(
          (producto) => producto.activo !== false
        );

        const excedentes = productosActivos.filter(
          (producto) => producto.esExcedente === true
        );

        setTotalProductos(productosActivos.length);
        setProductosExcedentes(excedentes.length);
        setErrorProductos(false);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setErrorProductos(true);
      }
    }

    cargarProductos();
  }, []);

  // Cargar restaurantes
  useEffect(() => {
    async function cargarRestaurantes() {
      try {
        const response = await fetch(`${API_URL}/restaurantes`);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const restaurantes = await response.json();

        if (!Array.isArray(restaurantes)) {
          throw new Error(
            "La respuesta de restaurantes no es una lista"
          );
        }

        const restaurantesActivos = restaurantes.filter(
          (restaurante) => restaurante.fechaDesactivacion == null
        );

        setTotalRestaurantes(restaurantesActivos.length);
        setErrorRestaurantes(false);
      } catch (error) {
        console.error("Error al cargar restaurantes:", error);
        setErrorRestaurantes(true);
      }
    }

    cargarRestaurantes();
  }, []);

  // Cargar pedidos con autenticación
  useEffect(() => {
    async function cargarPedidos() {
      try {
        const token = localStorage.getItem("ecobite-token");

        if (!token) {
          throw new Error("No se encontró el token de autenticación");
        }

        const response = await fetch(`${API_URL}/pedidos`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const pedidos = await response.json();

        if (!Array.isArray(pedidos)) {
          throw new Error("La respuesta de pedidos no es una lista");
        }

        setTotalPedidos(pedidos.length);
        setErrorPedidos(false);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
        setErrorPedidos(true);
      }
    }

    cargarPedidos();
  }, []);

  // Cargar indicadores globales de impacto ambiental
  useEffect(() => {
    async function cargarImpactoAmbiental() {
      try {
        const token = localStorage.getItem("ecobite-token");

        if (!token) {
          throw new Error("No se encontró el token de autenticación");
        }

        const response = await fetch(
          `${API_URL}/impacto-ambiental/kpis`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const datos = await response.json();

        setKpisAmbientales(datos);
        setErrorImpacto(false);
      } catch (error) {
        console.error(
          "Error al cargar las métricas ambientales:",
          error
        );
        setErrorImpacto(true);
      }
    }

    cargarImpactoAmbiental();
  }, []);

  function cerrarSesion() {
    logout();
    window.location.href = "/login";
  }

  const indicadores = [
    {
      titulo: "Productos",
      icono: "🥗",
      valor: errorProductos
        ? "Error"
        : totalProductos === null
          ? "..."
          : totalProductos,
      descripcion: errorProductos
        ? "No se pudieron cargar los productos"
        : productosExcedentes === null
          ? "Consultando productos..."
          : `${productosExcedentes} productos excedentes disponibles`,
      color: "bg-green-100 text-green-700",
    },
    {
      titulo: "Restaurantes",
      icono: "🏪",
      valor: errorRestaurantes
        ? "Error"
        : totalRestaurantes === null
          ? "..."
          : totalRestaurantes,
      descripcion: errorRestaurantes
        ? "No se pudieron cargar los restaurantes"
        : "Restaurantes activos",
      color: "bg-lime-100 text-lime-700",
    },
    {
      titulo: "Pedidos",
      icono: "📦",
      valor: errorPedidos
        ? "Error"
        : totalPedidos === null
          ? "..."
          : totalPedidos,
      descripcion: errorPedidos
        ? "No se pudieron consultar los pedidos"
        : totalPedidos === null
          ? "Consultando el servidor..."
          : `${totalPedidos} pedidos registrados`,
      color: "bg-amber-100 text-amber-700",
    },
    {
      titulo: "Huella de CO₂",
      icono: "🌱",
      valor: errorImpacto
        ? "Error"
        : kpisAmbientales === null
          ? "..."
          : `${formatearKg(kpisAmbientales.totalCo2AhorradoKg)} kg`,
      descripcion: errorImpacto
        ? "No se pudieron cargar las métricas ambientales"
        : kpisAmbientales === null
          ? "Consultando métricas..."
          : `Ahorrado · Transporte: ${formatearKg(
              kpisAmbientales.totalCo2TransporteKg
            )} kg · Empaques: ${formatearKg(
              kpisAmbientales.totalCo2EmpaqueKg
            )} kg`,
      color: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      {/* Barra lateral */}
      <aside className="flex w-full flex-col bg-green-950 p-6 text-white md:min-h-screen md:w-64">
        <div className="mb-10">
          <h1 className="text-2xl font-bold">EcoBite</h1>
          <p className="mt-1 text-sm text-green-200">
            Panel de administración
          </p>
        </div>

        <nav className="flex-1 space-y-2">
          <a
            href="/admin"
            className="block rounded-xl bg-green-800 px-4 py-3 font-semibold"
          >
            🏠 Inicio
          </a>

          <a
            href="/productos"
            className="block rounded-xl px-4 py-3 transition hover:bg-green-900"
          >
            🥗 Productos
          </a>

          <a
            href="/restaurantes"
            className="block rounded-xl px-4 py-3 transition hover:bg-green-900"
          >
            🏪 Restaurantes
          </a>

          <a
            href="/carrito"
            className="block rounded-xl px-4 py-3 transition hover:bg-green-900"
          >
            📦 Pedidos
          </a>

          <a
            href="/co2"
            className="block rounded-xl px-4 py-3 transition hover:bg-green-900"
          >
            🌱 Impacto ambiental
          </a>
        </nav>

        <div className="mt-8 border-t border-green-800 pt-5">
          <p className="mb-3 break-words text-sm text-green-200">
            Sesión iniciada como
          </p>

          <p className="mb-4 break-words font-semibold">
            {usuario?.nombre || usuario?.email || "Administrador"}
          </p>

          <button
            type="button"
            onClick={cerrarSesion}
            className="w-full rounded-xl border border-green-700 px-4 py-3 text-left transition hover:bg-green-900"
          >
            ↩ Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm font-medium text-green-700">
              ECOBITE / ADMINISTRACIÓN
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              Panel de control
            </h2>

            <p className="mt-2 text-gray-600">
              Resumen general de la plataforma EcoBite.
            </p>
          </div>

          <div className="rounded-xl border border-green-100 bg-white px-5 py-3 shadow-sm">
            <p className="text-sm text-gray-500">
              Tu espacio de trabajo
            </p>
            <p className="font-semibold text-green-800">
              Administrador
            </p>
          </div>
        </header>

        {/* Banner principal */}
        <section className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-green-800 to-green-600 p-6 text-white shadow-sm md:p-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-100">
            Gestión EcoBite
          </p>

          <h3 className="text-2xl font-bold md:text-3xl">
            Bienvenida al panel de administración
          </h3>

          <p className="mt-3 max-w-2xl leading-relaxed text-green-50">
            Desde aquí podés consultar los datos de productos,
            restaurantes y pedidos, además de las métricas de
            sostenibilidad de la plataforma.
          </p>
        </section>

        {/* Indicadores */}
        <section className="mb-10">
          <div className="mb-5">
            <h3 className="text-xl font-bold text-gray-900">
              Resumen general
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Datos consultados desde el backend.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {indicadores.map((indicador) => (
              <article
                key={indicador.titulo}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex items-center justify-between gap-2">
                  <span className="font-medium text-gray-600">
                    {indicador.titulo}
                  </span>

                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${indicador.color}`}
                  >
                    {indicador.icono}
                  </span>
                </div>

                <p className="break-words text-3xl font-bold text-gray-900">
                  {indicador.valor}
                </p>

                <p className="mt-2 min-h-10 text-sm text-gray-500">
                  {indicador.descripcion}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Accesos rápidos */}
        <section className="mb-8">
          <div className="mb-5">
            <h3 className="text-xl font-bold text-gray-900">
              Accesos rápidos
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Ingresá a las secciones disponibles.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {accesos.map((acceso) => (
              <a
                key={acceso.titulo}
                href={acceso.ruta}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-green-200 hover:shadow-md"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl">
                  {acceso.icono}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-gray-900 group-hover:text-green-700">
                    {acceso.titulo}
                  </span>

                  <span className="mt-1 block text-sm text-gray-500">
                    {acceso.descripcion}
                  </span>
                </span>

                <span className="text-xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-700">
                  →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Estado de conexión */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 className="font-bold text-gray-900">
            Estado de los datos
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <p className="flex items-center gap-2 text-sm text-gray-600">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  errorProductos ? "bg-red-500" : "bg-green-500"
                }`}
              />
              Productos:{" "}
              {errorProductos
                ? "Error"
                : totalProductos === null
                  ? "Cargando"
                  : "Conectado"}
            </p>

            <p className="flex items-center gap-2 text-sm text-gray-600">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  errorRestaurantes ? "bg-red-500" : "bg-green-500"
                }`}
              />
              Restaurantes:{" "}
              {errorRestaurantes
                ? "Error"
                : totalRestaurantes === null
                  ? "Cargando"
                  : "Conectado"}
            </p>

            <p className="flex items-center gap-2 text-sm text-gray-600">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  errorPedidos ? "bg-red-500" : "bg-green-500"
                }`}
              />
              Pedidos:{" "}
              {errorPedidos
                ? "Error de autorización o conexión"
                : totalPedidos === null
                  ? "Cargando"
                  : "Conectado"}
            </p>

            <p className="flex items-center gap-2 text-sm text-gray-600">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  errorImpacto ? "bg-red-500" : "bg-green-500"
                }`}
              />
              Impacto ambiental:{" "}
              {errorImpacto
                ? "Error de autorización o conexión"
                : kpisAmbientales === null
                  ? "Cargando"
                  : "Conectado"}
            </p>
          </div>

          <p className="mt-4 border-t border-gray-100 pt-4 text-xs text-gray-400">
            Los indicadores reflejan los datos recibidos del backend.
            Las métricas ambientales dependen de los registros que
            procese la API.
          </p>
        </section>

        <footer className="mt-8 text-center text-sm text-gray-400">
          EcoBite © 2026 · Comé rico. Cuidá el planeta. 🌱
        </footer>
      </main>
    </div>
  );
}

export default AdminDashboard;
