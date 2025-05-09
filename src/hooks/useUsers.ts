import { RootState, useSelector } from "../redux/store";


const useUsers = () => {
    const useUsers = useSelector(
        (state: RootState) => state.users
    )
    return useUsers;
};
export default useUsers;
