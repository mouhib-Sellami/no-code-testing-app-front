import { RootState, useSelector } from "../redux/store";


const useAppPermissions = () => {
    const useAppPermissions = useSelector(
        (state: RootState) => state.permissions
    )
    return useAppPermissions;
};
export default useAppPermissions;
