
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const API_URL = "http://localhost:3000/api/v1";

function Checkout() {
  const navigate = useNavigate();

  const {
    usuario,
    token,
    estaAutenticado,
    cargando: cargandoSesion,
  } = useAuth();

  const { carrito, clearCart, total } = useCart();

  const [direcciones, setDirecciones] = useState([]);
  const [transportes, setTransportes] = useState([]);
  const [zonas, setZonas] = useState([]);

  const [direccionId, setDireccionId] = useState("");
  const [transporteId, setTransporteId] = useState("");
  const [zonaId, setZonaId] = useState("");
  const [distanciaKm, setDistanciaKm] = useState("");

  const [cargandoDatos, setCargandoDatos] = useState(false);
  const [cargandoZonas, setCargandoZonas] = useState(false);
  const [reintentoZonas, setReintentoZonas] = useState(0);

  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [errorZonas, setErrorZonas] = useState("");

  const [pedidoCreado, setPedidoCreado] = useState(null);
  const [impacto, setImpacto] = useState(null);
  const [avisoImpacto, setAvisoImpacto] = useState("");

  const restaurantes = [
    ...new Set(
      carrito
        .map((producto) => Number(producto.restauranteId))
        .filter((id) => Number.isInteger(id) && id > 0)
    ),
  ];

  const zonaSeleccionada = zonas.find(
    (zona) => String(zona.id) === String(zonaId)
  );

  useEffect(() => {
    if (
      cargandoSesion ||
      !estaAutenticado ||
      !usuario?.id ||
      !token
    ) {
      return;
    }

    let cancelado = false;

    async function cargarDatos() {
      setCargandoDatos(true);
      setCargandoZonas(true);
      setError("");
      setErrorZonas("");

      try {
        const opciones = {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        };

        const [
          respuestaDirecciones,
          respuestaTransportes,
        ] = await Promise.all([
          fetch(
            `${API_URL}/direcciones/usuario/${usuario.id}`,
            opciones
          ),
          fetch(`${API_URL}/tipos-transporte`, opciones),
        ]);

        if (!respuestaDirecciones.ok) {
          throw new Error(
            "No se pudieron cargar tus direcciones."
          );
        }

        if (!respuestaTransportes.ok) {
          throw new Error(
            "No se pudieron cargar los medios de transporte."
          );
        }

        const [
          datosDirecciones,
          datosTransportes,
        ] = await Promise.all([
          respuestaDirecciones.json(),
          respuestaTransportes.json(),
        ]);

        if (cancelado) return;

        const listaDirecciones = Array.isArray(datosDirecciones)
          ? datosDirecciones
          : [];

        const listaTransportes = Array.isArray(datosTransportes)
          ? datosTransportes
          : [];

        setDirecciones(listaDirecciones);
        setTransportes(listaTransportes);

        setDireccionId((actual) => {
          if (
            actual &&
            listaDirecciones.some(
              (direccion) => String(direccion.id) === actual
            )
          ) {
            return actual;
          }

          return listaDirecciones.length
            ? String(listaDirecciones[0].id)
            : "";
        });

        const bicicleta = listaTransportes.find(
          (transporte) =>
            String(transporte.nombre).toLowerCase() ===
            "bicicleta"
        );

        setTransporteId((actual) => {
          if (
            actual &&
            listaTransportes.some(
              (transporte) => String(transporte.id) === actual
            )
          ) {
            return actual;
          }

          return bicicleta
            ? String(bicicleta.id)
            : listaTransportes.length
              ? String(listaTransportes[0].id)
              : "";
        });
      } catch (err) {
        if (!cancelado) {
          setError(
            err.message ||
              "No se pudieron cargar los datos de entrega."
          );
        }
      } finally {
        if (!cancelado) {
          setCargandoDatos(false);
        }
      }

      // Las zonas se cargan por separado para que un error
      // en este servicio no oculte los demás datos del checkout.
      try {
        const respuestaZonas = await fetch(
          `${API_URL}/zonas`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!respuestaZonas.ok) {
          throw new Error(
            "El servicio de zonas no está disponible."
          );
        }

        const datosZonas = await respuestaZonas.json();

        if (!Array.isArray(datosZonas)) {
          throw new Error(
            "El servicio de zonas devolvió una respuesta inválida."
          );
        }

        if (cancelado) return;

        const listaZonas = datosZonas.filter(
          (zona) => zona.habilitada === true
        );

        setZonas(listaZonas);
        setErrorZonas("");

        setZonaId((actual) => {
          if (
            actual &&
            listaZonas.some(
              (zona) => String(zona.id) === actual
            )
          ) {
            return actual;
          }

          return listaZonas.length
            ? String(listaZonas[0].id)
            : "";
        });
      } catch (err) {
        if (!cancelado) {
          setZonas([]);
          setZonaId("");
          setErrorZonas(
            err.message ||
              "No se pudieron cargar las zonas de entrega."
          );
        }
      } finally {
        if (!cancelado) {
          setCargandoZonas(false);
        }
      }
    }

    cargarDatos();

    return () => {
      cancelado = true;
    };
  }, [
    usuario?.id,
    token,
    estaAutenticado,
    cargandoSesion,
    reintentoZonas,
  ]);

  async function confirmarPedido(event) {
    event.preventDefault();
    setError("");
    setAvisoImpacto("");

    if (!estaAutenticado || !usuario?.id || !token) {
      setError("Iniciá sesión para realizar tu pedido.");
      return;
    }

    if (carrito.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    if (restaurantes.length !== 1) {
      setError(
        "Todos los productos del pedido deben pertenecer a un único restaurante. Revisá tu carrito."
      );
      return;
    }

    if (cargandoDatos || cargandoZonas) {
      setError(
        "Esperá a que terminen de cargar los datos de entrega."
      );
      return;
    }

    if (errorZonas) {
      setError(
        "No se pueden confirmar pedidos hasta que se carguen correctamente las zonas."
      );
      return;
    }

    if (!direccionId || !transporteId || !zonaId) {
      setError(
        "Seleccioná una dirección, un medio de transporte y una zona habilitada."
      );
      return;
    }

    const zonaValida = zonas.find(
      (zona) =>
        String(zona.id) === String(zonaId) &&
        zona.habilitada === true
    );

    if (!zonaValida) {
      setError(
        "La zona seleccionada no está habilitada. Elegí otra zona."
      );
      return;
    }

    const distancia = Number(distanciaKm);

    if (
      distanciaKm.trim() === "" ||
      !Number.isFinite(distancia) ||
      distancia < 0
    ) {
      setError(
        "Ingresá una distancia válida en kilómetros."
      );
      return;
    }

    const productoInvalido = carrito.find((producto) => {
      const productoId = Number(producto.id);
      const cantidad = Number(producto.cantidad);
      const precio = Number(producto.precio);

      return (
        !Number.isInteger(productoId) ||
        productoId <= 0 ||
        !Number.isInteger(cantidad) ||
        cantidad < 1 ||
        !Number.isFinite(precio) ||
        precio < 0
      );
    });

    if (productoInvalido) {
      const nombre =
        productoInvalido.nombre ||
        productoInvalido.name ||
        "Producto sin nombre";

      setError(
        `El producto "${nombre}" no tiene un ID numérico válido. Los platos de ejemplo no se pueden confirmar como pedidos reales. Usá un producto del catálogo conectado al backend.`
      );
      return;
    }

    const items = carrito.map((producto) => ({
      productoId: Number(producto.id),
      cantidad: Number(producto.cantidad),
    }));

    setEnviando(true);

    try {
      const respuesta = await fetch(`${API_URL}/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clienteId: Number(usuario.id),
          restauranteId: restaurantes[0],
          direccionEntregaId: Number(direccionId),
          tipoTransporteId: Number(transporteId),
          zoneId: Number(zonaId),
          distanciaKm: distancia,
          items,
        }),
      });

      const datosPedido = await respuesta
        .json()
        .catch(() => ({}));

      if (!respuesta.ok) {
        console.error("Error al crear el pedido:", {
          status: respuesta.status,
          respuesta: datosPedido,
        });

        const mensaje = Array.isArray(datosPedido.message)
          ? datosPedido.message.join(" ")
          : datosPedido.message;

        throw new Error(
          mensaje ||
            `No se pudo crear el pedido (HTTP ${respuesta.status}).`
        );
      }

      clearCart();
      setPedidoCreado(datosPedido);

      if (datosPedido.id != null) {
        try {
          const respuestaImpacto = await fetch(
            `${API_URL}/impacto-ambiental/pedido/${datosPedido.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
          );

          if (respuestaImpacto.ok) {
            const datosImpacto =
              await respuestaImpacto.json();

            setImpacto(datosImpacto);
          } else {
            setAvisoImpacto(
              "El pedido se creó, pero no se pudo consultar su impacto ambiental."
            );
          }
        } catch {
          setAvisoImpacto(
            "El pedido se creó, pero no se pudo consultar su impacto ambiental."
          );
        }
      } else {
        setAvisoImpacto(
          "El pedido se creó, pero la respuesta no incluyó su identificador para consultar el impacto."
        );
      }
    } catch (err) {
      setError(
        err.message || "Ocurrió un error al crear el pedido."
      );
    } finally {
      setEnviando(false);
    }
  }

  if (cargandoSesion) {
    return (
      <p className="p-6">Verificando tu sesión...</p>
    );
  }

  if (!estaAutenticado) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <h1 className="mb-4 text-2xl font-bold">
          Finalizar compra
        </h1>

        <p className="mb-4">
          Necesitás iniciar sesión para confirmar tu pedido.
        </p>

        <Link
          to="/login"
          className="inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white"
        >
          Iniciar sesión
        </Link>
      </main>
    );
  }

  if (pedidoCreado) {
    const kgTransporte =
      impacto?.co2_ahorrado_transporte_kg;

    const kgEmpaque =
      impacto?.co2_ahorrado_empaque_kg;

    const kgTotal =
      impacto?.total_co2_ahorrado_kg;

    return (
      <main className="mx-auto max-w-2xl p-6">
        <section className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
          <h1 className="mb-3 text-2xl font-bold text-green-700">
            ¡Pedido creado correctamente!
          </h1>

          {pedidoCreado.id != null && (
            <p className="mb-2">
              Número de pedido:{" "}
              <strong>{pedidoCreado.id}</strong>
            </p>
          )}

          <p className="mb-4">
            Total del pedido:{" "}
            <strong>
              $
              {Number(
                pedidoCreado.totalPrecio ?? total
              ).toLocaleString("es-AR")}
            </strong>
          </p>

          <p className="mb-4">
            Zona de entrega:{" "}
            <strong>
              {pedidoCreado.zona?.nombre ||
                zonaSeleccionada?.nombre ||
                "Zona seleccionada"}
            </strong>
          </p>

          {impacto && (
            <section className="mb-5 rounded-xl bg-green-50 p-4">
              <h2 className="mb-3 text-lg font-bold">
                Impacto ambiental
              </h2>

              {kgTransporte != null && (
                <p>
                  Ahorro por transporte:{" "}
                  <strong>
                    {Number(kgTransporte).toFixed(4)} kg CO₂
                  </strong>
                </p>
              )}

              {kgEmpaque != null && (
                <p>
                  Ahorro por empaque:{" "}
                  <strong>
                    {Number(kgEmpaque).toFixed(4)} kg CO₂
                  </strong>
                </p>
              )}

              {kgTotal != null && (
                <p className="mt-2 text-lg">
                  Ahorro total:{" "}
                  <strong>
                    {Number(kgTotal).toFixed(4)} kg CO₂
                  </strong>
                </p>
              )}

              {kgTransporte == null &&
                kgEmpaque == null &&
                kgTotal == null && (
                  <p>
                    Se consultó el impacto ambiental, pero la
                    respuesta no contiene valores de CO₂
                    reconocidos por esta pantalla.
                  </p>
                )}
            </section>
          )}

          {avisoImpacto && (
            <p className="mb-4 text-amber-700">
              {avisoImpacto}
            </p>
          )}

          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white"
          >
            Volver al inicio
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Finalizar compra
      </h1>

      {error && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
        >
          {error}
        </div>
      )}

      {carrito.length === 0 ? (
        <section className="rounded-xl border p-6">
          <p className="mb-4">Tu carrito está vacío.</p>

          <Link
            to="/productos"
            className="font-semibold text-green-700"
          >
            Ver productos
          </Link>
        </section>
      ) : (
        <>
          <section className="mb-6 rounded-xl border p-5">
            <h2 className="mb-4 text-xl font-semibold">
              Resumen del pedido
            </h2>

            <ul className="space-y-3">
              {carrito.map((producto) => (
                <li
                  key={producto.id}
                  className="flex justify-between gap-4"
                >
                  <span>
                    {producto.nombre || producto.name} ×{" "}
                    {producto.cantidad}
                  </span>

                  <span className="font-medium">
                    $
                    {(
                      Number(producto.precio || 0) *
                      Number(producto.cantidad || 0)
                    ).toLocaleString("es-AR")}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-5 border-t pt-4 text-xl font-bold">
              Total: ${total.toLocaleString("es-AR")}
            </p>
          </section>

          {cargandoDatos ? (
            <p role="status">
              Cargando direcciones y medios de transporte...
            </p>
          ) : (
            <form
              onSubmit={confirmarPedido}
              className="space-y-5"
            >
              <section className="rounded-xl border p-5">
                <h2 className="mb-4 text-xl font-semibold">
                  Datos de entrega
                </h2>

                <label
                  htmlFor="direccion"
                  className="mb-2 block font-medium"
                >
                  Dirección guardada
                </label>

                <select
                  id="direccion"
                  value={direccionId}
                  onChange={(event) =>
                    setDireccionId(event.target.value)
                  }
                  required
                  className="mb-4 w-full rounded-lg border p-3"
                >
                  <option value="">
                    Seleccioná una dirección
                  </option>

                  {direcciones.map((direccion) => (
                    <option
                      key={direccion.id}
                      value={direccion.id}
                    >
                      {direccion.calle} {direccion.numero},{" "}
                      {direccion.ciudad} (
                      {direccion.codigoPostal})
                    </option>
                  ))}
                </select>

                {direcciones.length === 0 && (
                  <p className="mb-4 text-sm text-amber-700">
                    No tenés direcciones guardadas. Necesitás
                    registrar una dirección antes de continuar.
                  </p>
                )}

                <label
                  htmlFor="zona"
                  className="mb-2 block font-medium"
                >
                  Zona de entrega sustentable
                </label>

                {cargandoZonas ? (
                  <p
                    role="status"
                    className="mb-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600"
                  >
                    Cargando zonas de entrega...
                  </p>
                ) : errorZonas ? (
                  <div
                    role="alert"
                    className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4"
                  >
                    <p className="mb-3 text-sm text-red-700">
                      {errorZonas}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setReintentoZonas((valor) => valor + 1)
                      }
                      className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                    >
                      Reintentar carga de zonas
                    </button>
                  </div>
                ) : zonas.length === 0 ? (
                  <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <p className="mb-3 text-sm text-amber-800">
                      No hay zonas habilitadas disponibles.
                      Cuando se habilite una zona, podrás
                      seleccionarla para continuar.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setReintentoZonas((valor) => valor + 1)
                      }
                      className="rounded-lg border border-amber-600 px-4 py-2 font-semibold text-amber-800 hover:bg-amber-100"
                    >
                      Actualizar zonas
                    </button>
                  </div>
                ) : (
                  <>
                    <select
                      id="zona"
                      value={zonaId}
                      onChange={(event) =>
                        setZonaId(event.target.value)
                      }
                      required
                      className="mb-2 w-full rounded-lg border p-3"
                    >
                      <option value="">
                        Seleccioná una zona habilitada
                      </option>

                      {zonas.map((zona) => (
                        <option
                          key={zona.id}
                          value={zona.id}
                        >
                          {zona.nombre} — distancia media:{" "}
                          {zona.distanciaMediaKm} km
                        </option>
                      ))}
                    </select>

                    <p className="mb-4 text-sm text-gray-600">
                      Elegí una zona habilitada para tu entrega.
                    </p>

                    <section className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4">
                      <h3 className="mb-3 font-semibold text-green-800">
                        Información de la zona seleccionada
                      </h3>

                      {zonaSeleccionada ? (
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <span className="font-medium">
                              Zona:
                            </span>{" "}
                            {zonaSeleccionada.nombre}
                          </p>

                          <p>
                            <span className="font-medium">
                              Distancia media:
                            </span>{" "}
                            {zonaSeleccionada.distanciaMediaKm} km
                          </p>

                          <p>
                            <span className="font-medium">
                              Estado:
                            </span>{" "}
                            <span className="font-semibold text-green-700">
                              Habilitada
                            </span>
                          </p>

                          {zonaSeleccionada.factorEmisionCo2 != null && (
                            <p>
                              <span className="font-medium">
                                Factor de emisión de CO₂:
                              </span>{" "}
                              {zonaSeleccionada.factorEmisionCo2}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">
                          Seleccioná una zona para consultar sus datos.
                        </p>
                      )}
                    </section>
                  </>
                )}

                <label
                  htmlFor="transporte"
                  className="mb-2 block font-medium"
                >
                  Medio de transporte
                </label>

                <select
                  id="transporte"
                  value={transporteId}
                  onChange={(event) =>
                    setTransporteId(event.target.value)
                  }
                  required
                  className="mb-4 w-full rounded-lg border p-3"
                >
                  <option value="">
                    Seleccioná el transporte
                  </option>

                  {transportes.map((transporte) => (
                    <option
                      key={transporte.id}
                      value={transporte.id}
                    >
                      {String(transporte.nombre).toLowerCase() ===
                      "vehiculo_electrico"
                        ? "Vehículo eléctrico"
                        : transporte.nombre}
                    </option>
                  ))}
                </select>

                <label
                  htmlFor="distancia"
                  className="mb-2 block font-medium"
                >
                  Distancia de entrega (km)
                </label>

                <input
                  id="distancia"
                  type="number"
                  min="0"
                  step="0.1"
                  value={distanciaKm}
                  onChange={(event) =>
                    setDistanciaKm(event.target.value)
                  }
                  placeholder="Ingresá la distancia en kilómetros"
                  required
                  className="w-full rounded-lg border p-3"
                />

                <p className="mt-2 text-sm text-gray-600">
                  Ingresá la distancia de entrega que
                  corresponda al pedido. No se calcula
                  automáticamente.
                </p>
              </section>

              <button
                type="submit"
                disabled={
                  enviando ||
                  cargandoDatos ||
                  cargandoZonas ||
                  Boolean(errorZonas) ||
                  carrito.length === 0 ||
                  direcciones.length === 0 ||
                  transportes.length === 0 ||
                  zonas.length === 0
                }
                className="w-full rounded-lg bg-green-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {enviando
                  ? "Creando pedido..."
                  : "Confirmar pedido"}
              </button>
            </form>
          )}
        </>
      )}
    </main>
  );
}

export default Checkout;
