import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from './AuthContext';

export default function ServiceGuard() {
  const { selectedService } = useAuth();

  if (!selectedService) {
    return <Navigate to="/select-service" replace />;
  }

  return <Outlet />;
}
