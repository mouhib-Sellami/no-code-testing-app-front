import React, { createContext, ReactNode, useCallback, useContext, useEffect } from 'react';
import { RootState, dispatch, useSelector } from '@/redux/store';
// import useAuth from '@/hooks/useAuth';

type SessionContextProps = {
    signIn: (data: UserAuth) => Promise<any>;
    signOut: () => Promise<void>;
    isLoading: boolean;
    isAuthenticated: boolean;
    user: User | null,
}

type SessionProviderProps = {
    children?: ReactNode;
}

const SessionContext = createContext<Partial<SessionContextProps>>({});

const SessionProvider = ({ children }: SessionProviderProps) => {
    // const { isLoading, user, isAuthenticated } = useAuth();
    const { isAlive } = useSelector(
        (state: RootState) => state.session
    )

    useEffect(() => {
        if (!isAlive) {
            signOut().then().catch()
        }
    }, [isAlive])

    const signIn = useCallback(async (data: UserAuth) => {
        // const res = await dispatch(login(data))
        // return res
    }, [])

    const signOut = useCallback(async () => {
        // await dispatch(logout())
    }, [])

    // const fetchUserDetails = React.useCallback(async () => {
    //     if (!user)
    //         return      
    //     // await dispatch(getUserDetails(user.id))
    // }, [user])

    // React.useEffect(() => {
    //     if (isAuthenticated && isAlive) {
    //         fetchUserDetails();
    //     }
    // }, [isAlive, isAuthenticated])
    return (
        <SessionContext.Provider
            value={{
                // isLoading,
                // user,
                // isAuthenticated,
                signOut,
                signIn,
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

export default SessionProvider;