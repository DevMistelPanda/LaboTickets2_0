import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '@/utils/auth';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
