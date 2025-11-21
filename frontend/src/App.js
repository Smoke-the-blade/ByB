import { Routes, Route } from "react-router-dom";

// Páginas
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Stock from "./pages/Stock";
import Ventas from "./pages/Ventas";
import Empleados from "./pages/Empleados";
import Informes from "./pages/Informes";

import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <div>
      <Routes>
        {/* Ruta de login */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas */}
        {user && (
          <>
            <Route path="/menu" element={<Menu />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/informes" element={<Informes />} />
          </>
        )}

        {/* Si el usuario intenta navegar sin login */}
        {!user && (
          <>
            <Route path="/menu" element={<Login />} />
            <Route path="/stock" element={<Login />} />
            <Route path="/ventas" element={<Login />} />
            <Route path="/empleados" element={<Login />} />
            <Route path="/informes" element={<Login />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
