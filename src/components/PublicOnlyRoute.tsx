import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/workspaces" replace />;
  }

  return <>{children}</>;
};
