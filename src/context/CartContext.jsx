
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

function obtenerPrecio(producto) {
  const valor = producto.precio ?? producto.price ?? 0;

  if (typeof valor === "string") {
    // Admite precios como "$ 3.500" y "3500".
    const limpio = valor
      .replace(/\$/g, "")
      .replace(/\s/g, "")
      .replace(/\./g, "")
      .replace(",", ".");

    const numero = Number(limpio);
    return Number.isFinite(numero) ? numero : 0;
  }

  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : 0;
}

function obtenerCarritoInicial() {
  try {
    const carritoGuardado = localStorage.getItem("carrito");
    const carrito = carritoGuardado
      ? JSON.parse(carritoGuardado)
      : [];

    if (!Array.isArray(carrito)) {
      return [];
    }

    return carrito.map((item) => ({
      ...item,
      precio: obtenerPrecio(item),
      cantidad: Math.max(1, Number(item.cantidad) || 1),
    }));
  } catch (error) {
    console.error("Error al recuperar el carrito:", error);
    return [];
  }
}

function idsIguales(idA, idB) {
  return String(idA) === String(idB);
}

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(obtenerCarritoInicial);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.dispatchEvent(new Event("carritoActualizado"));
  }, [carrito]);

  function addToCart(producto) {
    const precioNuevo = obtenerPrecio(producto);

    setCarrito((carritoActual) => {
      const existente = carritoActual.find((item) =>
        idsIguales(item.id, producto.id)
      );

      if (existente) {
        return carritoActual.map((item) =>
          idsIguales(item.id, producto.id)
            ? {
                ...item,
                precio: precioNuevo,
                cantidad: (Number(item.cantidad) || 0) + 1,
              }
            : item
        );
      }

      return [
        ...carritoActual,
        {
          id: producto.id,
          nombre: producto.nombre ?? producto.name ?? "Producto",
          precio: precioNuevo,
          restauranteId: producto.restauranteId,
          cantidad: 1,
        },
      ];
    });
  }

  function removeFromCart(productoId) {
    setCarrito((carritoActual) =>
      carritoActual.filter(
        (item) => !idsIguales(item.id, productoId)
      )
    );
  }

  function updateQuantity(productoId, cantidad) {
    const nuevaCantidad = Number(cantidad);

    if (!Number.isFinite(nuevaCantidad) || nuevaCantidad <= 0) {
      removeFromCart(productoId);
      return;
    }

    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        idsIguales(item.id, productoId)
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  }

  function clearCart() {
    setCarrito([]);
  }

  const total = useMemo(
    () =>
      carrito.reduce(
        (acumulado, item) =>
          acumulado +
          obtenerPrecio(item) * (Number(item.cantidad) || 0),
        0
      ),
    [carrito]
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const contexto = useContext(CartContext);

  if (!contexto) {
    throw new Error(
      "useCart debe utilizarse dentro de CartProvider"
    );
  }

  return contexto;
}
