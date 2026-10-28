
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/Layout'
import RutaProtegida from './components/RutaProtegida'
import CO2Calculator from './components/CO2Calculator'
import { CartProvider } from './context/CartContext'

import Home from './pages/Home'
import Productos from './pages/Productos'
import Restaurantes from './pages/Restaurantes'
import DetalleProducto from './pages/DetalleProducto'
import DetalleRestaurante from './pages/DetalleRestaurante'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Checkout from './pages/Checkout'

import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/restaurantes" element={<Restaurantes />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/restaurante/:id" element={<DetalleRestaurante />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/co2" element={<CO2Calculator />} />

            {/* Rutas exclusivas para administración */}
            <Route element={<RutaProtegida soloAdmin />}>
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />
              <Route
                path="/admin"
                element={<Navigate to="/admin/dashboard" replace />}
              />
            </Route>

            {/* Rutas que requieren sesión */}
           {/* Rutas que requieren sesión */}
<Route element={<RutaProtegida />}>
  <Route path="/carrito" element={<Carrito />} />
  <Route path="/checkout" element={<Checkout />} />
</Route>

{/* Evitar acceder a una confirmación sin pedido */}
<Route
  path="/confirmacion"
  element={<Navigate to="/carrito" replace />}
/>
{/* Página 404 para rutas inexistentes */}
<Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
