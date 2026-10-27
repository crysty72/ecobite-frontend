import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="min-h-screen w-full min-w-0">
      {/* Barra de navegación */}
      <Navbar />

      {/* Contenido principal */}
      <main className="w-full min-w-0">
        {children}
      </main>

      {/* Pie de página */}
      <Footer />
    </div>
  )
}

export default Layout