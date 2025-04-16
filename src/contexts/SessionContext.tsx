import React, { createContext, ReactNode, useCallback, useContext, useEffect } from 'react';
import { RootState, dispatch, useSelector } from '@/redux/store';
import useAuth from '@/hooks/useAuth';
import { login, logout, retrieve } from '@/redux/slices/authSlices/authSliceThunk';
import { User } from '@/types/models/User';
import secureLocalStorage from 'react-secure-storage';
import { handleNewTenant } from '@/redux/slices/TenantSlice/TenantSlice';
import { loginResponse } from '@/types/response/authResponses';

type SessionContextProps = {
    signIn: (data: UserAuth) => Promise<any>;
    signOut: () => Promise<void>;
    retrieveUser: () => Promise<any>;
    isLoading: boolean;
    isAuthenticated: boolean;
    user: User | null,
}

type SessionProviderProps = {
    children?: ReactNode;
}

const SessionContext = createContext<Partial<SessionContextProps>>({
    isAuthenticated: false,
    isLoading: false,
    signIn: (_: UserAuth) => null,
    signOut: () => null,
    retrieveUser: () => null
});

const SessionProvider = ({ children }: SessionProviderProps) => {
    const { isLoading, user, isAuthenticated } = useAuth();

    const TOKEN = React.useMemo(() => {
        return secureLocalStorage.getItem(import.meta.env.VITE_AUTH_TOKEN || '@token');
    }, [])

    const { isAlive } = useSelector(
        (state: RootState) => state.session
    )

    useEffect(() => {
        if (!isAlive && TOKEN) {
            signOut().then().catch()
        }
    }, [isAlive, TOKEN])
    useEffect(() => {
        if (!isAlive) {
            signOut().then().catch()
        }
    }, [isAlive])

    const signIn = useCallback(async (data: UserAuth) => {
        const res = await dispatch(login(data))
        if (res.meta.requestStatus == "fulfilled") {
            const { organization } = res.payload as loginResponse;
            dispatch(handleNewTenant(organization))
        }
        return res
    }, [])

    const signOut = useCallback(async () => {
        await dispatch(logout());
    }, [])

    const retrieveUser = React.useCallback(async () => {
        return await dispatch(retrieve())
    }, [])

    useEffect(() => {
        if (isAlive && TOKEN) {
            retrieveUser();
        }
    }, [isAlive, TOKEN])

    return (
        <SessionContext.Provider
            value={{
                isLoading,
                user,
                isAuthenticated,
                retrieveUser,
                signOut,
                signIn
            }}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => {
    const context = useContext(SessionContext);
    if (import.meta.env.DEV) {
        if (!context) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }
    return context;
}

export { SessionProvider, SessionContext };