import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import iconoBicicleta from "../assets/iconos-ecobite/bicicleta_verde.svg";
import iconoBicicletaBlanco from "../assets/iconos-ecobite/bicicleta_blanco.svg";
import iconoRestaurante from "../assets/iconos-ecobite/restaurante_verde.svg";
import iconoRestauranteBlanco from "../assets/iconos-ecobite/restaurante_blanco.svg";
import iconoProducto from "../assets/iconos-ecobite/comida_verde.svg";
import iconoProductoBlanco from "../assets/iconos-ecobite/comida_blanco.svg";
import iconoImpacto from "../assets/iconos-ecobite/impacto_ambiental_verde.svg";
import iconoImpactoBlanco from "../assets/iconos-ecobite/impacto_ambiental_blanco.svg";
import iconoCo2 from "../assets/iconos-ecobite/co2_verde.svg";
import iconoCo2Blanco from "../assets/iconos-ecobite/co2_blanco.svg";
import iconoPackagingBlanco from "../assets/iconos-ecobite/packaging_blanco.svg";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

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

  const date = new Date(fecha);

  if (Number.isNaN(date.getTime())) {
    return "Fecha no disponible";
  }

  return date.toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const obtenerLista = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return null;
};

const normalizarEstado = (estado) =>
  String(estado ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const esPedidoCompletado = (pedido) =>
  [
    "completado",
    "completada",
    "entregado",
    "entregada",
    "finalizado",
    "finalizada",
  ].includes(normalizarEstado(pedido.estadoNombre));

const esRestauranteActivo = (restaurante) =>
  restaurante.fechaDesactivacion == null &&
  restaurante.activo !== false &&
  !["inactivo", "inactiva", "desactivado", "desactivada"].includes(
    normalizarEstado(restaurante.estadoNombre ?? restaurante.estado)
  );

// Los íconos oficiales se cargan desde los SVG de Diseño Gráfico.
// Los íconos sin equivalente directo conservan sus trazados originales.
function Icono({ tipo, className = "h-6 w-6", variante = "verde" }) {
  if (tipo === "carrito") {
    return (
      <img
        src="/carrito-verde.svg"
        alt=""
        aria-hidden="true"
        className={className}
      />
    );
  }

  const iconosOficiales = {
    hoja: variante === "blanco" ? iconoImpactoBlanco : iconoImpacto,
    co2: variante === "blanco" ? iconoCo2Blanco : iconoCo2,
    bicicleta: variante === "blanco" ? iconoBicicletaBlanco : iconoBicicleta,
    restaurante: variante === "blanco" ? iconoRestauranteBlanco : iconoRestaurante,
    producto: variante === "blanco" ? iconoProductoBlanco : iconoProducto,
    packaging: iconoPackagingBlanco,
  };

  if (iconosOficiales[tipo]) {
    return (
      <img
        src={iconosOficiales[tipo]}
        alt=""
        aria-hidden="true"
        className={className}
      />
    );
  }

  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const dibujos = {
    dinero: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M7 6V4h10v2M12 10v5m2-4c0-2-4-2-4 0s4 1 4 3-4 2-4 0" />
      </>
    ),
    pedidos: (
      <>
        <path d="M4 7h16l-1 13H5L4 7Z" />
        <path d="M9 9V5a3 3 0 0 1 6 0v4" />
      </>
    ),
    flecha: <path d="M5 12h14m-6-6 6 6-6 6" />,
    dashboard: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="5" rx="1" />
        <rect x="13" y="10" width="8" height="11" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
      </>
    ),
  };

  return <svg {...props}>{dibujos[tipo] || dibujos.dashboard}</svg>;
}

function TarjetaMetrica({
  titulo,
  valor,
  descripcion,
  icono,
  cargando,
  error,
  tono = "verde",
  destacada = false,
}) {
  const tonos = {
    verde: "bg-[#e8f5cf] text-[#285d2a]",
    lima: "bg-[#d7f36b] text-[#263b1c]",
    oscuro: "bg-[#243d2d] text-white",
    crema: "bg-[#f6f1e5] text-[#344a35]",
  };

  return (
    <article
      className={`rounded-2xl border p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6 ${
        destacada
          ? "border-[#b7d66a] bg-[#f0f8df]"
          : "border-[#e8ebdf] bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#687267]">
            {titulo}
          </p>

          {cargando ? (
            <div
              className="mt-3 h-8 w-32 animate-pulse rounded-lg bg-[#edf0e8]"
              aria-label={`Cargando ${titulo}`}
            />
          ) : (
            <p className="mt-3 break-words text-2xl font-bold tracking-tight text-[#26392a] sm:text-3xl">
              {error ? "—" : valor}
            </p>
          )}

          <p
            className="mt-2 text-xs leading-5 text-[#7b8377]"
            role={error ? "status" : undefined}
          >
            {cargando ? "Consultando información..." : error || descripcion}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tonos[tono]}`}
        >
          <Icono tipo={icono} variante={tono === "oscuro" ? "blanco" : "verde"} />
        </div>
      </div>
    </article>
  );
}

function EstadoPedido({ estado }) {
  const normalizado = normalizarEstado(estado);

  let estilo = "bg-[#fff2cc] text-[#876315]";

  if (
    [
      "completado",
      "completada",
      "entregado",
      "entregada",
      "finalizado",
      "finalizada",
    ].includes(normalizado)
  ) {
    estilo = "bg-[#e5f5d7] text-[#315e32]";
  } else if (
    [
      "en camino",
      "encamino",
      "en transito",
      "en tránsito",
      "en reparto",
    ].includes(normalizado)
  ) {
    estilo = "bg-blue-100 text-blue-800";
  } else if (["cancelado", "cancelada"].includes(normalizado)) {
    estilo = "bg-red-100 text-red-700";
  }

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${estilo}`}
    >
      {estado || "Sin estado"}
    </span>
  );
}

function AdminDashboard() {
  const { usuario, logout } = useAuth();

  const [productos, setProductos] = useState([]);
  const [errorProductos, setErrorProductos] = useState("");
  const [cargandoProductos, setCargandoProductos] = useState(true);

  const [restaurantes, setRestaurantes] = useState([]);
  const [errorRestaurantes, setErrorRestaurantes] = useState("");
  const [cargandoRestaurantes, setCargandoRestaurantes] = useState(true);

  const [pedidos, setPedidos] = useState([]);
  const [errorPedidos, setErrorPedidos] = useState("");
  const [cargandoPedidos, setCargandoPedidos] = useState(true);

  const [kpisAmbientales, setKpisAmbientales] = useState(null);
  const [errorImpacto, setErrorImpacto] = useState("");
  const [cargandoImpacto, setCargandoImpacto] = useState(true);

  const [statsDashboard, setStatsDashboard] = useState(null);
  const [errorStats, setErrorStats] = useState("");
  const [cargandoStats, setCargandoStats] = useState(true);

  useEffect(() => {
    let activo = true;

    async function cargarCatalogos() {
      const solicitudes = [
        {
          url: `${API_URL}/productos`,
          setDatos: setProductos,
          setError: setErrorProductos,
          setCargando: setCargandoProductos,
          transformar: (lista) =>
            lista.filter((producto) => producto.activo !== false),
          nombre: "productos",
        },
        {
          url: `${API_URL}/restaurantes`,
          setDatos: setRestaurantes,
          setError: setErrorRestaurantes,
          setCargando: setCargandoRestaurantes,
          transformar: (lista) => lista,
          nombre: "restaurantes",
        },
      ];

      await Promise.all(
        solicitudes.map(async (solicitud) => {
          try {
            const response = await fetch(solicitud.url);

            if (!response.ok) {
              throw new Error(`Error HTTP ${response.status}`);
            }

            const data = await response.json();
            const lista = obtenerLista(data);

            if (!lista) {
              throw new Error(
                `La respuesta de ${solicitud.nombre} no es válida.`
              );
            }

            if (activo) {
              solicitud.setDatos(solicitud.transformar(lista));
            }
          } catch (error) {
            if (activo) {
              solicitud.setError(
                error.message ||
                  `No se pudieron cargar los ${solicitud.nombre}.`
              );
            }
          } finally {
            if (activo) solicitud.setCargando(false);
          }
        })
      );
    }

    cargarCatalogos();

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    let activo = true;

    async function cargarPedidos() {
      try {
        const token = localStorage.getItem("ecobite-token");

        if (!token) {
          throw new Error(
            "Iniciá sesión nuevamente para consultar los pedidos."
          );
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
        const lista = obtenerLista(data);

        if (!lista) {
          throw new Error("La respuesta de pedidos no es válida.");
        }

        if (activo) setPedidos(lista);
      } catch (error) {
        if (activo) {
          setErrorPedidos(
            error.message || "No se pudieron cargar los pedidos."
          );
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
        const token = localStorage.getItem("ecobite-token");

        if (!token) {
          throw new Error(
            "Iniciá sesión nuevamente para consultar el impacto ambiental."
          );
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
          throw new Error(
            `Error al consultar el impacto ambiental: ${response.status}`
          );
        }

        const data = await response.json();

        if (activo) setKpisAmbientales(data);
      } catch (error) {
        if (activo) {
          setErrorImpacto(
            error.message ||
              "No se pudieron cargar las métricas ambientales."
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

  useEffect(() => {
    let activo = true;

    async function cargarStatsDashboard() {
      try {
        const token = localStorage.getItem("ecobite-token");

        if (!token) {
          throw new Error(
            "Iniciá sesión nuevamente para consultar las estadísticas."
          );
        }

        const response = await fetch(`${API_URL}/dashboard/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            response.status === 401 || response.status === 403
              ? "La sesión no está autorizada para ver las estadísticas."
              : `Error al consultar las estadísticas: ${response.status}`
          );
        }

        const data = await response.json();

        const totalOrders = Number(data.totalOrders);
        const totalRevenue = Number(data.totalRevenue);
        const totalCo2Saved = Number(data.totalCo2Saved);

        if (
          !Number.isFinite(totalOrders) ||
          !Number.isFinite(totalRevenue) ||
          !Number.isFinite(totalCo2Saved)
        ) {
          throw new Error(
            "La respuesta de estadísticas no tiene el formato esperado."
          );
        }

        if (activo) {
          setStatsDashboard({
            totalOrders,
            totalRevenue,
            totalCo2Saved,
          });
        }
      } catch (error) {
        if (activo) {
          setErrorStats(
            error.message ||
              "No se pudieron cargar las estadísticas del dashboard."
          );
        }
      } finally {
        if (activo) setCargandoStats(false);
      }
    }

    cargarStatsDashboard();

    return () => {
      activo = false;
    };
  }, []);

  const productosExcedentes = productos.filter(
    (producto) => producto.esExcedente === true
  ).length;

  const restaurantesActivos = restaurantes.filter(esRestauranteActivo);

  const restaurantesInactivos = restaurantes.filter(
    (restaurante) => !esRestauranteActivo(restaurante)
  );

  const pedidosCompletados = pedidos.filter(esPedidoCompletado);

  const totalRecaudado = pedidosCompletados.reduce(
    (total, pedido) => total + (Number(pedido.totalPrecio) || 0),
    0
  );

  const pedidosRecientes = [...pedidos]
    .sort((a, b) => {
      const fechaA = new Date(a.fechaCreacion || 0).getTime();
      const fechaB = new Date(b.fechaCreacion || 0).getTime();

      return (
        (Number.isFinite(fechaB) ? fechaB : 0) -
        (Number.isFinite(fechaA) ? fechaA : 0)
      );
    })
    .slice(0, 5);

  async function cerrarSesion() {
    try {
      await logout();
    } finally {
      window.location.href = "/login";
    }
  }

  const accesos = [
    {
      titulo: "Productos",
      descripcion: "Administrá los alimentos disponibles.",
      ruta: "/productos",
      icono: "producto",
    },
    {
      titulo: "Restaurantes",
      descripcion: "Consultá los comercios adheridos.",
      ruta: "/restaurantes",
      icono: "restaurante",
    },
    {
      titulo: "Carrito",
      descripcion: "Accedé al flujo de compra.",
      ruta: "/carrito",
      icono: "carrito",
    },
    {
      titulo: "Impacto ambiental",
      descripcion: "Conocé el impacto sustentable.",
      ruta: "/co2",
      icono: "hoja",
    },
  ];

  const totalPedidos = statsDashboard?.totalOrders ?? pedidos.length;


const ticketPromedio =
  statsDashboard && statsDashboard.totalOrders > 0
    ? statsDashboard.totalRevenue / statsDashboard.totalOrders
    : 0;

const totalCO2 =
  statsDashboard?.totalCo2Saved ??
  kpisAmbientales?.totalCo2AhorradoKg;

  const errorRecaudacion =
    errorStats && !statsDashboard && errorPedidos && pedidos.length === 0
      ? errorStats
      : "";

  const errorCO2 =
    errorStats && !statsDashboard && errorImpacto && !kpisAmbientales
      ? errorStats
      : "";

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f5f6ef] text-[#26392a]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="flex w-full shrink-0 flex-col bg-[#20382a] p-5 text-white lg:min-h-screen lg:w-64 lg:p-6">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d7f36b] text-[#20382a]">
              <Icono tipo="hoja" className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                EcoBite
              </h1>
              <p className="text-xs text-[#c2d0bc]">
                Alimentación sustentable
              </p>
            </div>
          </Link>

          <div className="mt-9">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a8b9a5]">
              Menú principal
            </p>

            <nav
              className="space-y-2"
              aria-label="Menú de administración"
            >
              <Link
                to="/admin/dashboard"
                aria-current="page"
                className="flex items-center gap-3 rounded-xl bg-[#d7f36b] px-4 py-3 text-sm font-bold text-[#20382a]"
              >
                <Icono tipo="dashboard" className="h-5 w-5" />
                Dashboard
              </Link>

              {accesos.map((acceso) => (
                <Link
                  key={acceso.titulo}
                  to={acceso.ruta}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#e0e9dc] transition hover:bg-white/10"
                >
                  <Icono tipo={acceso.icono} className="h-5 w-5" variante="blanco" />
                  {acceso.titulo}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#d7f36b]" />
              <p className="text-xs font-semibold text-[#d7f36b]">
                Compromiso EcoBite
              </p>
            </div>

            <p className="mt-3 text-sm leading-6 text-[#e0e9dc]">
              Cada elección consciente ayuda a construir un sistema
              alimentario más responsable.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-[#c2d0bc]">
              <Icono tipo="bicicleta" className="h-5 w-5" variante="blanco" />
              Menos impacto, más futuro.
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-5 lg:mt-auto">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d7f36b] font-bold text-[#20382a]">
                {(usuario?.nombre || usuario?.email || "A")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {usuario?.nombre || "Administrador"}
                </p>
                <p className="truncate text-xs text-[#bdcbbb]">
                  {usuario?.email || "Panel de administración"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={cerrarSesion}
              className="w-full rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Cerrar sesión
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#64804a]">
                Panel de control
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#20382a] sm:text-3xl">
                ¡Hola, {usuario?.nombre || "administrador"}!
              </h2>

              <p className="mt-2 text-sm text-[#737d70]">
                Este es el resumen de actividad de EcoBite.
              </p>
            </div>

            <div className="rounded-xl border border-[#e1e6d8] bg-white px-4 py-3">
              <p className="text-xs text-[#7b8377]">Estado del panel</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#75ae38]" />
                <span className="text-sm font-semibold text-[#315e32]">
                  Panel de administración
                </span>
              </div>
            </div>
          </header>

          <section className="relative mb-8 overflow-hidden rounded-3xl bg-[#d7f36b] p-6 sm:p-8">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex rounded-full border border-[#34552a]/20 bg-white/40 px-3 py-1 text-xs font-bold text-[#34552a]">
                ALIMENTACIÓN CONSCIENTE
              </span>

              <h3 className="mt-4 max-w-xl text-2xl font-extrabold leading-tight text-[#20382a] sm:text-3xl">
                Una mejor elección para vos y para el planeta.
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-6 text-[#40583a] sm:text-base">
                Seguí los pedidos, los comercios y el impacto ambiental
                de la plataforma desde un solo lugar.
              </p>

              <Link
                to="/co2"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#20382a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#31563b]"
              >
                Ver impacto ambiental
                <Icono tipo="flecha" className="h-4 w-4" />
              </Link>
            </div>

            <div
              className="pointer-events-none absolute -right-8 -top-10 hidden h-64 w-64 items-center justify-center rounded-full border-[24px] border-[#b5d54f] opacity-70 sm:flex"
              aria-hidden="true"
            >
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[#c5e85a]">
                <Icono
                  tipo="hoja"
                  className="h-24 w-24 text-[#315b31]"
                />
              </div>
            </div>
          </section>

          <section aria-labelledby="metricas-principales">
            <div className="mb-4">
              <h3
                id="metricas-principales"
                className="text-lg font-extrabold text-[#26392a]"
              >
                Indicadores principales
              </h3>
              <p className="mt-1 text-sm text-[#788174]">
                Impacto ambiental, ventas y cumplimiento de pedidos.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <TarjetaMetrica
                titulo="CO₂ ahorrado"
                valor={formatearKg(totalCO2)}
                descripcion="Impacto ambiental registrado por la plataforma"
                icono="co2"
                tono="oscuro"
                destacada
                cargando={cargandoStats || cargandoImpacto}
                error={errorCO2}
              />

              <TarjetaMetrica
                titulo="Total recaudado"
                valor={formatearMoneda(
                  statsDashboard?.totalRevenue ?? totalRecaudado
                )}
                descripcion="Importe informado por las estadísticas del dashboard"
                icono="dinero"
                tono="verde"
                cargando={cargandoStats || cargandoPedidos}
                error={errorRecaudacion}
              />

              <TarjetaMetrica
                titulo="Pedidos completados"
                valor={pedidosCompletados.length}
                descripcion={`De ${totalPedidos} pedidos registrados`}
                icono="pedidos"
                tono="lima"
                cargando={cargandoPedidos || cargandoStats}
                error={errorPedidos}
              />
              <TarjetaMetrica
  titulo="Ticket promedio por pedido"
  valor={formatearMoneda(ticketPromedio)}
  descripcion="Promedio de todos los pedidos registrados, incluidos los pendientes"
  icono="dinero"
  tono="crema"
  cargando={cargandoStats}
  error={errorStats}
/>
            </div>
          </section>

          <section className="mt-8" aria-labelledby="metricas-secundarias">
            <div className="mb-4">
              <h3
                id="metricas-secundarias"
                className="text-lg font-extrabold text-[#26392a]"
              >
                Indicadores operativos
              </h3>
              <p className="mt-1 text-sm text-[#788174]">
                Información adicional sobre comercios y transporte.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <TarjetaMetrica
                titulo="Productos activos"
                valor={productos.length}
                descripcion={`${productosExcedentes} productos excedentes`}
                icono="producto"
                tono="crema"
                cargando={cargandoProductos}
                error={errorProductos}
              />

              <TarjetaMetrica
                titulo="Restaurantes activos"
                valor={restaurantesActivos.length}
                descripcion={`${restaurantesInactivos.length} inactivos`}
                icono="restaurante"
                tono="verde"
                cargando={cargandoRestaurantes}
                error={errorRestaurantes}
              />

              <TarjetaMetrica
                titulo="CO₂ del transporte"
                valor={formatearKg(kpisAmbientales?.totalCo2TransporteKg)}
                descripcion={`CO₂ de empaques: ${formatearKg(
                  kpisAmbientales?.totalCo2EmpaqueKg
                )}`}
                icono="bicicleta"
                tono="lima"
                cargando={cargandoImpacto}
                error={errorImpacto}
              />
            </div>
          </section>

          <section className="mt-8" aria-labelledby="pedidos-recientes">
            <article className="rounded-2xl border border-[#e5e9de] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3
                    id="pedidos-recientes"
                    className="text-lg font-extrabold text-[#26392a]"
                  >
                    Últimos pedidos
                  </h3>
                  <p className="mt-1 text-sm text-[#788174]">
                    Los cinco pedidos más recientes registrados.
                  </p>
                </div>

                <span className="rounded-full bg-[#e8f5cf] px-3 py-1 text-xs font-bold text-[#315e32]">
                  {pedidos.length} pedidos
                </span>
              </div>

              {cargandoPedidos ? (
                <div className="flex items-center justify-center gap-3 py-12 text-sm text-[#788174]">
                  <span
                    className="h-5 w-5 animate-spin rounded-full border-2 border-[#5c8c35] border-t-transparent"
                    aria-hidden="true"
                  />
                  Cargando pedidos...
                </div>
              ) : errorPedidos ? (
                <p
                  role="alert"
                  className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700"
                >
                  {errorPedidos}
                </p>
              ) : pedidosRecientes.length === 0 ? (
                <p className="py-12 text-center text-sm text-[#788174]">
                  Todavía no hay pedidos registrados.
                </p>
              ) : (
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[620px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#e9ece5] text-xs uppercase tracking-wide text-[#7b8377]">
                        <th scope="col" className="px-3 py-3 font-semibold">
                          Pedido
                        </th>
                        <th scope="col" className="px-3 py-3 font-semibold">
                          Fecha
                        </th>
                        <th scope="col" className="px-3 py-3 font-semibold">
                          Total
                        </th>
                        <th scope="col" className="px-3 py-3 font-semibold">
                          Estado
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#edf0e9]">
                      {pedidosRecientes.map((pedido, indice) => (
                        <tr
                          key={pedido.id ?? `${pedido.fechaCreacion}-${indice}`}
                          className="transition hover:bg-[#f8faf4]"
                        >
                          <td className="px-3 py-4 font-bold text-[#26392a]">
                            #{pedido.id ?? "—"}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-[#697367]">
                            {formatearFecha(pedido.fechaCreacion)}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 font-semibold text-[#26392a]">
                            {formatearMoneda(pedido.totalPrecio)}
                          </td>

                          <td className="px-3 py-4">
                            <EstadoPedido estado={pedido.estadoNombre} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          </section>

          <section className="mt-8" aria-labelledby="impacto-detalle">
            <article className="rounded-2xl bg-[#20382a] p-6 text-white sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d7f36b] text-[#20382a]">
                    <Icono tipo="hoja" className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d7f36b]">
                      Sustentabilidad
                    </p>
                    <h3
                      id="impacto-detalle"
                      className="mt-1 text-xl font-extrabold"
                    >
                      Nuestro impacto ambiental
                    </h3>
                  </div>
                </div>

                <Link
                  to="/co2"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#d7f36b] px-4 py-3 text-sm font-bold text-[#20382a] transition hover:bg-[#c8e65c]"
                >
                  Ver detalle
                  <Icono tipo="flecha" className="h-4 w-4" />
                </Link>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#d1ddce]">
                Seguimos las emisiones asociadas al transporte y los
                empaques para comprender mejor el impacto de cada pedido.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <Icono tipo="bicicleta" className="h-6 w-6" variante="blanco" />
                    <p className="text-sm font-semibold">Transporte</p>
                  </div>

                  <p className="mt-3 text-xl font-bold text-[#d7f36b]">
                    {cargandoImpacto
                      ? "Calculando..."
                      : errorImpacto
                        ? "No disponible"
                        : formatearKg(
                            kpisAmbientales?.totalCo2TransporteKg
                          )}
                  </p>
                  <p className="mt-1 text-xs text-[#bdcbbb]">
                    Emisiones asociadas al traslado.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <Icono tipo="packaging" className="h-6 w-6" variante="blanco" />
                    <p className="text-sm font-semibold">Envases y empaques</p>
                  </div>

                  <p className="mt-3 text-xl font-bold text-[#d7f36b]">
                    {cargandoImpacto
                      ? "Calculando..."
                      : errorImpacto
                        ? "No disponible"
                        : formatearKg(
                            kpisAmbientales?.totalCo2EmpaqueKg
                          )}
                  </p>
                  <p className="mt-1 text-xs text-[#bdcbbb]">
                    Impacto registrado de los empaques.
                  </p>
                </div>
              </div>
            </article>
          </section>

          <section className="mt-8" aria-labelledby="accesos-rapidos">
            <div className="mb-4">
              <h3
                id="accesos-rapidos"
                className="text-lg font-extrabold text-[#26392a]"
              >
                Accesos rápidos
              </h3>
              <p className="mt-1 text-sm text-[#788174]">
                Secciones disponibles de EcoBite.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {accesos.map((acceso) => (
                <Link
                  key={acceso.titulo}
                  to={acceso.ruta}
                  className="group rounded-2xl border border-[#e5e9de] bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-[#b6d96a] hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f5cf] text-[#315e32] transition group-hover:bg-[#d7f36b]">
                    <Icono tipo={acceso.icono} />
                  </div>

                  <h4 className="mt-4 font-bold text-[#26392a]">
                    {acceso.titulo}
                  </h4>

                  <p className="mt-2 text-sm leading-5 text-[#788174]">
                    {acceso.descripcion}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#507c36]">
                    Ir a la sección
                    <Icono
                      tipo="flecha"
                      className="h-4 w-4 transition group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <footer className="mt-10 border-t border-[#e1e6d8] py-5 text-center text-xs text-[#7b8377]">
            EcoBite · Alimentación responsable · Tecnología para un futuro
            sustentable.
          </footer>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
