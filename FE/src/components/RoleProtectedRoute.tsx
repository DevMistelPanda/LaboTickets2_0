import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { toast } from 'sonner';

interface JwtPayload {
  exp: number;
  role: string;
}

interface RoleProtectedRouteProps {
  allowedRoles: string[];
  redirectPath?: string;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  allowedRoles,
  redirectPath = '/login',
}) => {
  const token = localStorage.getItem('token');
  const [redirect, setRedirect] = useState<string | null>(null);

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return <Navigate to={redirectPath} replace />;
    }

    if (!allowedRoles.includes(decoded.role)) {


      useEffect(() => {
        toast.error('Zugriff verweigert: Keine Berechtigung für diesen Bereich');
        const timer = setTimeout(() => setRedirect('/staff'), 1500); // 1.5s delay for toast visibility
        return () => clearTimeout(timer);
      }, []);

      if (redirect) {
        return <Navigate to={redirect} replace />;
      }
      return null; // render nothing while waiting for redirect
    }

    return <Outlet />;
  } catch (err) {
    localStorage.removeItem('token');
    return <Navigate to={redirectPath} replace />;
  }
};

export default RoleProtectedRoute;
