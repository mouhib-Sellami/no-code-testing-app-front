import React, { createContext, ReactNode, useCallback, useContext, useEffect } from 'react';
import { RootState, dispatch, useSelector } from '@/redux/store';
import useAuth from '@/hooks/useAuth';
import { login, logout, retrieve } from '@/redux/slices/authSlices/authSliceThunk';
import { User } from '@/types/models/User';
import secureLocalStorage from 'react-secure-storage';
import { handleNewTenant } from '@/redux/slices/TenantSlice/TenantSlice';
import { loginResponse } from '@/types/response/authResponses';
import { useSearchParams } from 'react-router-dom';

type SessionContextProps = {
    signIn: (data: UserAuth) => Promise<any>;
    signOut: () => Promise<void>;
    retrieveUser: () => Promise<any>;
    isLoading: boolean;
    isAuthenticated: boolean;
    user: User | null;
};

type SessionProviderProps = {
    children?: ReactNode;
};

const SessionContext = createContext<Partial<SessionContextProps>>({
    isAuthenticated: false,
    isLoading: false,
    signIn: (_: UserAuth) => null,
    signOut: () => null,
    retrieveUser: () => null,
});

const SessionProvider = ({ children }: SessionProviderProps) => {
    const { isLoading, user, isAuthenticated } = useAuth();
    const [searchParams] = useSearchParams();
    const { isAlive } = useSelector((state: RootState) => state.session);

    const TOKEN = React.useMemo(() => {
        return (
            searchParams.get('token') ||
            secureLocalStorage.getItem(import.meta.env.VITE_AUTH_TOKEN || '@token')
        );
    }, [searchParams]);

    const isRedirecting = React.useMemo(() => {
        return searchParams.has('next') && searchParams.has('action') && searchParams.has('token');
    }, [searchParams]);

    useEffect(() => {
        if (!isAlive && !isRedirecting) {
            signOut().then().catch();
        }
    }, [isAlive, TOKEN, isRedirecting, searchParams]);

    const signIn = useCallback(async (data: UserAuth) => {
        const res = await dispatch(login(data));
        if (res.meta.requestStatus === 'fulfilled') {
            const { organization } = res.payload as loginResponse;
            dispatch(handleNewTenant(organization));
        }
        return res;
    }, []);

    const signOut = useCallback(async () => {
        await dispatch(logout());
    }, []);

    const retrieveUser = useCallback(async () => {
        const res = await dispatch(retrieve());
        return res
    }, []);

    useEffect(() => {
        if (isAlive && TOKEN && !isRedirecting) {
            retrieveUser();
        }
    }, [isAlive, TOKEN, isRedirecting]);

    useEffect(() => {
        if (isAlive) {
            retrieveUser();
        }
    }, [isAlive,]);

    return (
        <SessionContext.Provider
            value={{
                isLoading,
                user,
                isAuthenticated,
                retrieveUser,
                signOut,
                signIn,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (import.meta.env.DEV) {
        if (!context) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }
    return context;
};

export { SessionProvider, SessionContext };