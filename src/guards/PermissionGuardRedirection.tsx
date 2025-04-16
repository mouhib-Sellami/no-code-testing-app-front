import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import useCheckPermission from '@/hooks/useCheckPermission';
import { Navigate } from 'react-router';
import { PATH_APP } from '@/routes/paths';

interface PermissionGuardRedirectionProps extends React.PropsWithChildren {
    permission: string,
    children: ReactElement | ReactElement[]
}


PermissionGuardRedirection.propTypes = {
    children: PropTypes.node
};

export default function PermissionGuardRedirection(props: PermissionGuardRedirectionProps) {
    const { hasPermission } = useCheckPermission();

    if (hasPermission(props.permission)) {
        return props.children
    } else {
        return <Navigate to={PATH_APP.general.notFound} />
    }
}
