import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'

import Home from './pages/Home'
import Productos from './pages/Productos'
import Restaurantes from './pages/Restaurantes'
import DetalleProducto from './pages/DetalleProducto'
import DetalleRestaurante from './pages/DetalleRestaurante'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import Confirmacion from './pages/Confirmacion'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/restaurantes" element={<Restaurantes />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/restaurante/:id" element={<DetalleRestaurante />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;