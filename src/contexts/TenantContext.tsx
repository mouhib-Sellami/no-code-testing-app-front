import { check_domain } from "@/redux/slices/TenantSlice/TenantSlice";
import { dispatch } from "@/redux/store";
import { PATH_APP } from "@/routes/paths";
import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router";

type TenantContextProps = {

}

const TenantContext = React.createContext<Partial<TenantContextProps>>({

})

const TenantProvider = (props: PropsWithChildren) => {
    const navigate = useNavigate()

    const check_domain_validation = React.useCallback(async () => {
        const res = await dispatch(check_domain());
        if (res.meta.requestStatus == 'rejected') {
            navigate(PATH_APP.general.notFound)
        }
    }, [])

    React.useEffect(() => {
        check_domain_validation()
    }, [])

    return (
        <TenantContext.Provider value={{}}>
            {props.children}
        </TenantContext.Provider>
    )
};
const TenantConsumer = TenantContext.Consumer
export { TenantContext, TenantProvider, TenantConsumer };