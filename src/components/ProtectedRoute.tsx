import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useContext/AuthContext";

function ProtectedRoute() {
  const { userData, isLoading } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  setTimeout(() => {
    if (!userData) {
      return <Navigate to="/auth/login" replace />;
    }
  }, 500);

  return <Outlet />;
}

export default ProtectedRoute;
