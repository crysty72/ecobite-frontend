
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
import Confirmacion from './pages/Confirmacion'
import AdminDashboard from './pages/AdminDashboard'

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

            {/* Ruta exclusiva para administración */}
            <Route element={<RutaProtegida soloAdmin />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Rutas que requieren sesión */}
            <Route element={<RutaProtegida />}>
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmacion" element={<Confirmacion />} />
            </Route>
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
