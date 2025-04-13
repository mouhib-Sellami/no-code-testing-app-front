import { PATH_APP } from '@/routes/paths';
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router';

interface RoleGuardProps {
    roles: string[];
    children: ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ roles, children }) => {

    // return roles.includes(user?.role!) ? children : <Navigate to={PATH_APP.general.dashboard.home} />
    return children;
}

export default RoleGuard