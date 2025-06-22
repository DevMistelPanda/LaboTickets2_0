import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner"; 

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  const isAuthenticated = (() => {
    try {
      if (!token) return false;

      const { exp } = jwtDecode<{ exp: number }>(token);
      const isExpired = Date.now() >= exp * 1000;

      if (isExpired) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
        return false;
      }

      return true;
    } catch {
      localStorage.removeItem("token");
      toast.error("Invalid token. Please log in again.");
      return false;
    }
  })();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
