import React, { useState, useEffect, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import CustomLoadingOverlay from '@/components/custom-loading/CustomLoadingOverlay';
import { PATH_AUTH } from '@/routes/paths';

interface AuthGuardProps {
    children: ReactNode;
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    // const { isLoading, isAuthenticated } = useAuth();
    const location = useLocation();
    const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
    
    // useEffect(() => {
    //     if (!isAuthenticated && location.pathname !== requestedLocation) {
    //         setRequestedLocation(location.pathname);
    //     }
    // }, [isAuthenticated, location.pathname, requestedLocation]);

    // if (isLoading) return <CustomLoadingOverlay />;


    // if (!isAuthenticated) return <Navigate to={PATH_AUTH.login} state={{ from: location }} replace />;


    // if (requestedLocation && location.pathname !== requestedLocation) {
    //     setRequestedLocation(null);
    //     return <Navigate to={requestedLocation} replace />;
    // }

    return children;
}

export default AuthGuard;