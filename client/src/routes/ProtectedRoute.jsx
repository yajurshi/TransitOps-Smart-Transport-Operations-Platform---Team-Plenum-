import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="grid min-h-screen place-items-center bg-slate-50 text-sm font-medium text-slate-500">Loading TransitOps…</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};