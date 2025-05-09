import useAuth from '@/hooks/useAuth';
import { AppUser } from '@/types/models/User';
import React, { ReactNode } from 'react';

interface SelfUserActionGuardProps {
    children: ReactNode;
    user: AppUser
}

const SelfUserActionGuard: React.FC<SelfUserActionGuardProps> = ({ children, user }) => {
    const { user: authUser } = useAuth();

    return user.id == authUser.tenant_user_id ? null : children;
}

export default SelfUserActionGuard;