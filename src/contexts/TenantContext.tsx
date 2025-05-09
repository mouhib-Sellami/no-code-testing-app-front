import React, { PropsWithChildren } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { dispatch } from '@/redux/store';
import useTenant from '@/hooks/useTenant';
import { handleNewSession } from '@/redux/slices/sessionSlice/sessionSlice';
import { check_domain } from '@/redux/slices/TenantSlice/TenantSlice';
import secureLocalStorage from 'react-secure-storage';
import { PATH_APP } from '@/routes/paths';
import { retrieve } from '@/redux/slices/authSlices/authSliceThunk';

type TenantContextProps = {
    IS_TENANT: boolean
};

const TenantContext = React.createContext<Partial<TenantContextProps>>({
    IS_TENANT: false
});

const TenantProvider = (props: PropsWithChildren) => {
    const navigate = useNavigate();
    const { tenant } = useTenant();
    const [searchParams] = useSearchParams();

    const TOKEN = React.useMemo(() => searchParams.get('token'), [searchParams]);
    const ACTION = React.useMemo(() => searchParams.get('action'), [searchParams]);
    const NEXT = React.useMemo(() => searchParams.get('next'), [searchParams]);

    const IS_TENANT = React.useMemo(() => {

        var regex = new RegExp(/^([a-z]+:\/\/)?([\w-]+\.)*([\w-]+\.)?(localhost|\w+\.\w+)(\/.*)?$/);

        if (!regex.test(window.location.hostname)) return false;

        var hostname = window.location.hostname.replace(/^([a-z]+:\/\/)?/, '').replace(/\/.*$/, '');

        var parts = hostname.split('.');

        if (hostname.endsWith('localhost')) {
            return parts.length > 1;
        }
        return parts.length > 2;
    }, []);

    const IS_CORRESPONDED_TENANT = React.useMemo(() => {
        if (!tenant) return false;
        return tenant.domain.domain === window.location.hostname;
    }, [tenant]);

    React.useEffect(() => {
        if (TOKEN && ACTION == "login") {
            secureLocalStorage.setItem(import.meta.env.VITE_AUTH_TOKEN || '@token', TOKEN);
            dispatch(handleNewSession());
        }
    }, [TOKEN, ACTION, NEXT, IS_CORRESPONDED_TENANT]);

    const check_domain_validation = React.useCallback(async () => {
        const res = await dispatch(check_domain());
        if (res.meta.requestStatus === 'rejected') {
            navigate(PATH_APP.general.notFound);
        }
    }, []);

    React.useEffect(() => {
        if (!tenant) {
            check_domain_validation();
        }
    }, [tenant]);

    const handleTenantAuth = React.useCallback(async () => {
        const res = await dispatch(retrieve());
        if (res.meta.requestStatus === 'fulfilled' && tenant && !IS_CORRESPONDED_TENANT) {
            const new_url = window.location.href.replace(window.location.hostname, tenant.domain.domain);
            const TOKEN = secureLocalStorage.getItem(import.meta.env.VITE_AUTH_TOKEN || '@token');
            const queryParams = new URLSearchParams({
                next: new_url,
                token: TOKEN as string,
                action: ACTION || 'login',
                ...(NEXT && { next: NEXT }),
            });
            window.location.replace(`${new_url}?${queryParams.toString()}`);
        }
    }, [tenant, IS_CORRESPONDED_TENANT, ACTION, NEXT]);

    React.useEffect(() => {
        if (tenant && !TOKEN) {
            handleTenantAuth();
        }
    }, [tenant, TOKEN]);

    return <TenantContext.Provider value={{ IS_TENANT }}>{props.children}</TenantContext.Provider>;
};

const TenantConsumer = TenantContext.Consumer;

export { TenantContext, TenantProvider, TenantConsumer };