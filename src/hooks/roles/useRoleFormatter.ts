import React from "react"
import useAppPermissions from "../useAppPermissions";
import { dispatch } from "@/redux/store";
import { getAppPermissions } from "@/redux/slices/accessSlices/permissionSlice";


const useRoleFormatter = () => {
    const { permissions, isLoading: loadingPermissions } = useAppPermissions();

    const permissionsOptions = React.useMemo(() => {
        return permissions.flatMap(elm => ({ value: elm.id ? elm.id?.toString() : "0", label: elm.label }))
    }, [permissions])

    const PERMISSION_GROUP_BY = React.useMemo(() => {
        let tmp = new Set();
        let result = [];
        permissionsOptions.map(elm => {
            const model_name = elm.label.split('_').at(-1)
            if (!tmp.has(model_name)) {
                result.push({
                    model_name
                });
                tmp.add(model_name);
            }
        })
        const res = result.reduce((acc, item) => {
            acc.push({
                model: item.model_name.toLowerCase(),
                permissions: permissionsOptions.filter(elm => elm.label.includes(item.model_name))
            })
            return acc;
        }, [])
        return res
    }, [permissionsOptions])


    const fetchPermissions = React.useCallback(async () => {
        await dispatch(getAppPermissions())
    }, [])

    React.useEffect(() => {
        fetchPermissions().then().catch()
    }, [])

    const formPermission = React.useCallback((permission: string) => {
        const label = permission.toLowerCase().split('_')
        label.pop()
        const x = label.join(' ')
        return x
    }, [])

    const checkPermissionSelection = React.useCallback((id: number, form) => {
        return form.values.permissions.find(elm => elm.toString() == id.toString()) ? true : false
    }, [])
    return {
        formPermission,
        loadingPermissions,
        permissions,
        PERMISSION_GROUP_BY,
        checkPermissionSelection
    }
}

export default useRoleFormatter;