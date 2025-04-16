import useAuth from "@/hooks/useAuth";
import useTenant from "@/hooks/useTenant";
import { handleNewSession, handleSessionExpired } from "@/redux/slices/sessionSlice/sessionSlice";
import { check_domain } from "@/redux/slices/TenantSlice/TenantSlice";
import { dispatch } from "@/redux/store";
import { PATH_APP } from "@/routes/paths";
import React, { PropsWithChildren } from "react";
import { useNavigate, useSearchParams } from "react-router";
import secureLocalStorage from "react-secure-storage";
import { SessionContext } from "./SessionContext";

type TenantContextProps = {

}

const TenantContext = React.createContext<Partial<TenantContextProps>>({

})

const TenantProvider = (props: PropsWithChildren) => {
    const navigate = useNavigate()
    const { tenant } = useTenant();
    const [searchParams, _] = useSearchParams();
    const { retrieveUser } = React.useContext(SessionContext);

    const TOKEN = React.useMemo(() => {
        return searchParams.get('token')
    }, [searchParams])

    React.useEffect(() => {
        if (TOKEN) {
            secureLocalStorage.setItem(import.meta.env.VITE_AUTH_TOKEN || '@token', TOKEN);
            dispatch(handleNewSession());
        }
    }, [TOKEN])


    const IS_CORRESPONDED_TENANT = React.useMemo(() => {
        if (!tenant)
            return false
        return tenant.domain.domain == window.location.hostname
    }, [tenant])

    const check_domain_validation = React.useCallback(async () => {
        const res = await dispatch(check_domain());
        if (res.meta.requestStatus == 'rejected') {
            navigate(PATH_APP.general.notFound)
        }
    }, [])

    React.useEffect(() => {
        if (!tenant)
            check_domain_validation()
    }, [tenant])

    const handleTenantAuth = React.useCallback(async () => {
        const res = await retrieveUser?.()
        if (res.meta.requestStatus == "fulfilled") {
            if (tenant && !IS_CORRESPONDED_TENANT) {
                const new_url = window.location.href.replace(window.location.hostname, tenant.domain.domain);
                const TOKEN = secureLocalStorage.getItem(import.meta.env.VITE_AUTH_TOKEN || '@token');
                window.location.replace(new_url + "?token=" + TOKEN);
            }
        }
    }, [tenant, IS_CORRESPONDED_TENANT])

    React.useEffect(() => {
        handleTenantAuth()
    }, [tenant, IS_CORRESPONDED_TENANT])

    return (
        <TenantContext.Provider value={{}}>
            {props.children}
        </TenantContext.Provider>
    )
};
const TenantConsumer = TenantContext.Consumer
export { TenantContext, TenantProvider, TenantConsumer };