

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:3000/api/v1";

const accesos = [
  {
    titulo: "Productos",
    descripcion: "Consultar productos disponibles",
    ruta: "/productos",
    icono: "🍃",
  },
  {
    titulo: "Restaurantes",
    descripcion: "Consultar restaurantes",
    ruta: "/restaurantes",
    icono: "🏪",
  },
  {
    titulo: "Pedidos",
    descripcion: "Consultar el listado de pedidos",
    ruta: "/admin/dashboard",
    icono: "📦",
  },
  {
    titulo: "Impacto ambiental",
    descripcion: "Consultar el impacto de CO₂",
    ruta: "/co2",
    icono: "🌎",
  },
];

const formatearMoneda = (valor) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(Number(valor) || 0);

const formatearKg = (valor) =>
  `${Number(valor ?? 0).toLocaleString("es-AR", {
    maximumFractionDigits: 4,
  })} kg`;

const formatearFecha = (fecha) => {
  if (!fecha) return "Sin fecha";

  const fechaValida = new Date(fecha);

  if (Number.isNaN(fechaValida.getTime())) {
    return "Fecha no disponible";
  }

  return fechaValida.toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const normalizarEstado = (estado) =>
  String(estado ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const pedidoCompletado = (pedido) => {
  const estado = normalizarEstado(pedido.estadoNombre);

  return [
    "completado",
    "completada",
    "entregado",
    "entregada",
    "finalizado",
    "finalizada",
  ].includes(estado);
};

const obtenerClaseEstado = (estado) => {
  const normalizado = normalizarEstado(estado);

  if (
    ["completado", "completada", "entregado", "entregada",
      "finalizado", "finalizada"].includes(normalizado)
  ) {
    return "bg-green-100 text-green-800";
  }

  if (["cancelado", "cancelada"].includes(normalizado)) {
    return "bg-red-100 text-red-800";
  }

  if (
    ["pendiente", "en preparacion", "en camino", "procesando"].includes(
      normalizado
    )
  ) {
    return "bg-amber-100 text-amber-800";
  }

  return "bg-gray-100 text-gray-700";
};

function TarjetaMetrica({
  icono,
  titulo,
  valor,
  descripcion,
  cargando = false,
  error = "",
}) {
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{titulo}</p>

          {cargando ? (
            <div
              className="mt-3 h-8 w-28 animate-pulse rounded-lg bg-gray-200"
              aria-label={`Cargando ${titulo}`}
            />
          ) : (
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {error ? "—" : valor}
            </p>
          )}

          <p className="mt-2 text-xs text-gray-500">
            {error || descripcion}
          </p>
        </div>

        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl"
          aria-hidden="true"
        >
          {icono}
        </div>
      </div>
    </article>
  );
}

function AdminDashboard() {
  const { usuario, logout } = useAuth();

  const [totalProductos, setTotalProductos] = useState(0);
  const [productosExcedentes, setProductosExcedentes] = useState(0);
  const [errorProductos, setErrorProductos] = useState("");
  const [cargandoProductos, setCargandoProductos] = useState(true);

  const [totalRestaurantes, setTotalRestaurantes] = useState(0);
  const [errorRestaurantes, setErrorRestaurantes] = useState("");
  const [cargandoRestaurantes, setCargandoRestaurantes] = useState(true);

  const [pedidos, setPedidos] = useState([]);
  const [errorPedidos, setErrorPedidos] = useState("");
  const [cargandoPedidos, setCargandoPedidos] = useState(true);

  const [kpisAmbientales, setKpisAmbientales] = useState(null);
  const [errorImpacto, setErrorImpacto] = useState("");
  const [cargandoImpacto, setCargandoImpacto] = useState(true);

  useEffect(() => {
    let activo = true;

    async function cargarProductos() {
      try {
        setCargandoProductos(true);
        setErrorProductos("");

        const response = await fetch(`${API_URL}/productos`);

        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}`);
        }

        const data = await response.json();
        const lista = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : null;

        if (!lista) {
          throw new Error("La respuesta de productos no es válida.");
        }

        if (activo) {
          const activos = lista.filter(
            (producto) => producto.activo !== false
          );

          setTotalProductos(activos.length);
          setProductosExcedentes(
            activos.filter((producto) => producto.esExcedente === true).length
          );
        }
      } catch (error) {
        if (activo) {
          setErrorProductos(error.message || "No se pudieron cargar los productos.");
        }
      } finally {
        if (activo) setCargandoProductos(false);
      }
    }

    async function cargarRestaurantes() {
      try {
        setCargandoRestaurantes(true);
        setErrorRestaurantes("");

        const response = await fetch(`${API_URL}/restaurantes`);

        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}`);
        }

        const data = await response.json();
        const lista = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : null;

        if (!lista) {
          throw new Error("La respuesta de restaurantes no es válida.");
        }

        if (activo) {
          const activos = lista.filter(
            (restaurante) =>
              restaurante.fechaDesactivacion == null &&
              restaurante.activo !== false
          );

          setTotalRestaurantes(activos.length);
        }
      } catch (error) {
        if (activo) {
          setErrorRestaurantes(
            error.message || "No se pudieron cargar los restaurantes."
          );
        }
      } finally {
        if (activo) setCargandoRestaurantes(false);
      }
    }

    cargarProductos();
    cargarRestaurantes();

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    let activo = true;

    async function cargarPedidos() {
      try {
        setCargandoPedidos(true);
        setErrorPedidos("");

        const token = localStorage.getItem("ecobite-token");

        if (!token) {
          throw new Error("No hay una sesión activa. Iniciá sesión nuevamente.");
        }

        const response = await fetch(`${API_URL}/pedidos`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            response.status === 401 || response.status === 403
              ? "La sesión no está autorizada. Iniciá sesión nuevamente."
              : `Error al consultar pedidos: ${response.status}`
          );
        }

        const data = await response.json();
        const lista = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : null;

        if (!lista) {
          throw new Error("La respuesta de pedidos no es válida.");
        }

        if (activo) setPedidos(lista);
      } catch (error) {
        if (activo) {
          setErrorPedidos(error.message || "No se pudieron cargar los pedidos.");
        }
      } finally {
        if (activo) setCargandoPedidos(false);
      }
    }

    cargarPedidos();

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    let activo = true;

    async function cargarImpactoAmbiental() {
      try {
        setCargandoImpacto(true);
        setErrorImpacto("");

        const token = localStorage.getItem("ecobite-token");

        if (!token) {
          throw new Error("No hay una sesión activa.");
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
          throw new Error(`Error al consultar el impacto: ${response.status}`);
        }

        const data = await response.json();

        if (activo) setKpisAmbientales(data);
      } catch (error) {
        if (activo) {
          setErrorImpacto(
            error.message || "No se pudieron cargar las métricas ambientales."
          );
        }
      } finally {
        if (activo) setCargandoImpacto(false);
      }
    }

    cargarImpactoAmbiental();

    return () => {
      activo = false;
    };
  }, []);

  const pedidosCompletados = pedidos.filter(pedidoCompletado);

  const totalRecaudado = pedidosCompletados.reduce(
    (total, pedido) => total + (Number(pedido.totalPrecio) || 0),
    0
  );

  const pedidosRecientes = [...pedidos]
    .sort((a, b) => {
      const fechaA = new Date(a.fechaCreacion || 0).getTime();
      const fechaB = new Date(b.fechaCreacion || 0).getTime();
      return fechaB - fechaA;
    })
    .slice(0, 5);

  function cerrarSesion() {
    logout();
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="w-full border-b border-gray-200 bg-white p-5 md:w-64 md:border-b-0 md:border-r">
          <a href="/admin/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-2xl">
              🌱
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-700">EcoBite</h1>
              <p className="text-xs text-gray-500">Panel de administración</p>
            </div>
          </a>

          <nav className="mt-8 space-y-2" aria-label="Navegación principal">
            <a
              href="/admin/dashboard"
              className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3 font-semibold text-green-700"
              aria-current="page"
            >
              <span aria-hidden="true">📊</span>
              Dashboard
            </a>

            {accesos.map((acceso) => (
              <a
                key={acceso.titulo}
                href={acceso.ruta}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-green-700"
              >
                <span aria-hidden="true">{acceso.icono}</span>
                {acceso.titulo}
              </a>
            ))}
          </nav>

          <div className="mt-8 rounded-xl bg-green-50 p-4">
            <p className="text-sm font-semibold text-green-800">
              Gestión sustentable
            </p>
            <p className="mt-1 text-xs leading-5 text-green-700">
              Seguimiento de pedidos, productos e impacto ambiental.
            </p>
          </div>

          <button
            type="button"
            onClick={cerrarSesion}
            className="mt-6 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
          >
            Cerrar sesión
          </button>
        </aside>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-green-700">
                EcoBite · Administración
              </p>
              <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                Dashboard
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Resumen de actividad e impacto de la plataforma.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
              <p className="text-xs text-gray-500">Sesión iniciada</p>
              <p className="mt-1 font-semibold text-gray-800">
                {usuario?.nombre || usuario?.email || "Administrador"}
              </p>
            </div>
          </header>

          <section aria-labelledby="metricas-titulo">
            <div className="mb-4">
              <h3 id="metricas-titulo" className="text-lg font-bold text-gray-900">
                Métricas principales
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Datos obtenidos de los servicios disponibles del backend.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <TarjetaMetrica
                icono="💰"
                titulo="Total recaudado"
                valor={formatearMoneda(totalRecaudado)}
                descripcion="Pedidos completados"
                cargando={cargandoPedidos}
                error={errorPedidos}
              />

              <TarjetaMetrica
                icono="📦"
                titulo="Pedidos completados"
                valor={pedidosCompletados.length}
                descripcion={`De ${pedidos.length} pedidos registrados`}
                cargando={cargandoPedidos}
                error={errorPedidos}
              />

              <TarjetaMetrica
                icono="🌎"
                titulo="CO₂ ahorrado"
                valor={formatearKg(kpisAmbientales?.totalCo2AhorradoKg)}
                descripcion="Indicador ambiental global"
                cargando={cargandoImpacto}
                error={errorImpacto}
              />

              <TarjetaMetrica
                icono="🥗"
                titulo="Productos activos"
                valor={totalProductos}
                descripcion={`${productosExcedentes} productos excedentes`}
                cargando={cargandoProductos}
                error={errorProductos}
              />

              <TarjetaMetrica
                icono="🏪"
                titulo="Restaurantes activos"
                valor={totalRestaurantes}
                descripcion="Restaurantes disponibles"
                cargando={cargandoRestaurantes}
                error={errorRestaurantes}
              />

              <TarjetaMetrica
                icono="🚲"
                titulo="CO₂ del transporte"
                valor={formatearKg(kpisAmbientales?.totalCo2TransporteKg)}
                descripcion={`CO₂ de empaques: ${formatearKg(
                  kpisAmbientales?.totalCo2EmpaqueKg
                )}`}
                cargando={cargandoImpacto}
                error={errorImpacto}
              />
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Pedidos recientes
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Los últimos cinco pedidos registrados.
                </p>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                {pedidos.length} pedidos
              </span>
            </div>

            {cargandoPedidos ? (
              <div className="flex items-center justify-center gap-3 py-12 text-sm text-gray-500">
                <span
                  className="h-5 w-5 animate-spin rounded-full border-2 border-green-600 border-t-transparent"
                  aria-hidden="true"
                />
                Cargando pedidos...
              </div>
            ) : errorPedidos ? (
              <div
                role="alert"
                className="rounded-xl bg-red-50 p-4 text-sm text-red-700"
              >
                {errorPedidos}
              </div>
            ) : pedidosRecientes.length === 0 ? (
              <p className="py-10 text-center text-sm text-gray-500">
                Todavía no hay pedidos registrados.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                      <th className="px-3 py-3 font-semibold">Pedido</th>
                      <th className="px-3 py-3 font-semibold">Fecha</th>
                      <th className="px-3 py-3 font-semibold">Productos</th>
                      <th className="px-3 py-3 font-semibold">Total</th>
                      <th className="px-3 py-3 font-semibold">Estado</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {pedidosRecientes.map((pedido) => (
                      <tr key={pedido.id} className="transition hover:bg-gray-50">
                        <td className="px-3 py-4 font-semibold text-gray-900">
                          #{pedido.id}
                        </td>

                        <td className="px-3 py-4 text-gray-600">
                          {formatearFecha(pedido.fechaCreacion)}
                        </td>

                        <td className="max-w-xs px-3 py-4 text-gray-600">
                          {Array.isArray(pedido.detalles) &&
                          pedido.detalles.length > 0 ? (
                            <span title={pedido.detalles
                              .map((detalle) => detalle.productoNombre)
                              .filter(Boolean)
                              .join(", ")}
                            >
                              {pedido.detalles
                                .map((detalle) => detalle.productoNombre)
                                .filter(Boolean)
                                .join(", ")}
                            </span>
                          ) : (
                            "Sin detalle"
                          )}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 font-medium text-gray-800">
                          {formatearMoneda(pedido.totalPrecio)}
                        </td>

                        <td className="px-3 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${obtenerClaseEstado(
                              pedido.estadoNombre
                            )}`}
                          >
                            {pedido.estadoNombre || "Sin estado"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="mt-8">
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Accesos rápidos
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {accesos.map((acceso) => (
                <a
                  key={acceso.titulo}
                  href={acceso.ruta}
                  className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {acceso.icono}
                  </span>

                  <h4 className="mt-3 font-bold text-gray-900 group-hover:text-green-700">
                    {acceso.titulo}
                  </h4>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {acceso.descripcion}
                  </p>
                </a>
              ))}
            </div>
          </section>

          <footer className="mt-10 border-t border-gray-200 py-5 text-center text-xs text-gray-500">
            EcoBite · Panel de administración · Alimentación responsable y
            sustentabilidad.
          </footer>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
