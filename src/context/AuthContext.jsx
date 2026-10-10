

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  login as loginService,
  registrar as registrarService,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    try {
      const usuarioGuardado = localStorage.getItem("ecobite-user");
      const tokenGuardado = localStorage.getItem("ecobite-token");

      if (usuarioGuardado && tokenGuardado) {
        const usuarioParseado = JSON.parse(usuarioGuardado);

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUsuario(usuarioParseado);
        setToken(tokenGuardado);
      }
    } catch (error) {
      console.error("Error al recuperar la sesión:", error);

      localStorage.removeItem("ecobite-user");
      localStorage.removeItem("ecobite-token");
    } finally {
      setCargando(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginService(email, password);

    setUsuario(data.usuario);
    setToken(data.tokenAcceso);

    localStorage.setItem(
      "ecobite-user",
      JSON.stringify(data.usuario)
    );
    localStorage.setItem("ecobite-token", data.tokenAcceso);

    return data;
  };

  const registrar = async (datosUsuario) => {
    const data = await registrarService(datosUsuario);

    setUsuario(data.usuario);
    setToken(data.tokenAcceso);

    localStorage.setItem(
      "ecobite-user",
      JSON.stringify(data.usuario)
    );
    localStorage.setItem("ecobite-token", data.tokenAcceso);

    return data;
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);

    localStorage.removeItem("ecobite-user");
    localStorage.removeItem("ecobite-token");
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        login,
        registrar,
        logout,
        estaAutenticado: Boolean(token && usuario),
        cargando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
