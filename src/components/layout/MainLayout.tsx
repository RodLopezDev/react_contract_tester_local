import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
  Sidebar: () => React.ReactNode;
}

function MainLayout({ children, Sidebar }: MainLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Detectar si estamos en vista móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Comprobar al iniciar
    checkIfMobile();

    // Comprobar al cambiar el tamaño de la ventana
    window.addEventListener("resize", checkIfMobile);

    // Limpiar el event listener
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white fixed w-full border-b border-blue-700 px-4 py-2.5 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {isMobile && (
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="text-white p-1"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
            <Link to="/" className="text-white hover:text-blue-100">
              <span className="text-xl font-semibold">Contract Tester</span>
            </Link>
          </div>
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="User avatar"
            />
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Overlay para cerrar el drawer (solo en móvil) */}
        {isMobile && isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
        )}

        {/* Sidebar / Drawer */}
        <aside
          className={`${
            isMobile
              ? `fixed z-30 h-screen bg-white border-r border-gray-300 transition-transform duration-300 ${
                  isDrawerOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : "w-64 h-screen bg-white border-r border-gray-300 fixed"
          }`}
        >
          <h2 className="px-4 py-3 font-semibold text-lg border-b border-gray-300">
            Tipos de Contratos
          </h2>
          <ul className="py-2">{Sidebar()}</ul>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-4 ${!isMobile ? "ml-64" : ""}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
