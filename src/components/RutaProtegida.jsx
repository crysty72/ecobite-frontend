
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RutaProtegida({ soloAdmin = false }) {
  const { estaAutenticado, usuario, cargando } = useAuth();
  const location = useLocation();

  if (cargando) {
    return <p className="p-6 text-center">Verificando sesión...</p>;
  }

  if (!estaAutenticado) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (soloAdmin && Number(usuario?.rolId) !== 3) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
