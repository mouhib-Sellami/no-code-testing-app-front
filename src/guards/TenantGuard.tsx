import { TenantContext } from '@/contexts/TenantContext';
import { PATH_APP } from '@/routes/paths';
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router';

interface TenantGuardProps {
    children: ReactNode;
}

const TenantGuard: React.FC<TenantGuardProps> = ({ children }) => {
    const { IS_TENANT } = React.useContext(TenantContext);

    return IS_TENANT ? <Navigate to={PATH_APP.general.notFound} /> : children;
}

export default TenantGuard;