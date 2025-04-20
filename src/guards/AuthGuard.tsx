import React, { useState, useEffect, ReactNode } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '@/routes/paths';
import useAuth from '@/hooks/useAuth';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('token')) {
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, navigate, location.pathname]);

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }
  }, [isAuthenticated, location.pathname, requestedLocation]);

  if (!isAuthenticated) return <Navigate to={PATH_AUTH.login} state={{ from: location }} replace />;

  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} replace />;
  }

  return children;
};

export default AuthGuard;