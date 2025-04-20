import { RootState, useSelector } from "../redux/store";


const useRoles = () => {
    const useRoles = useSelector(
        (state: RootState) => state.roles
    )
    return useRoles;
};
export default useRoles;
