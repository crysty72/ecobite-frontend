
const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

export async function getProductos() {
  const response = await fetch(
    `${API_URL}/productos/excedentes/activos`
  );

  if (!response.ok) {
    throw new Error("No se pudieron obtener los productos.");
  }

  return response.json();
}
