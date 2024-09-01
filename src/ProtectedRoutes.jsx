import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  console.log(isAuthenticated);

  if (loading) {
    return <div>Loading...</div>; // Puedes reemplazar esto con un spinner o cualquier indicador de carga
  }
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default ProtectedRoute;
