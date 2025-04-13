import { RootState, useSelector } from "../redux/store";


const useTenant = () => {
    const useTenant = useSelector(
        (state: RootState) => state.tenant
    )
    return useTenant;
};
export default useTenant;
