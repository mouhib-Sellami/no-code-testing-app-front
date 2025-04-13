import { RootState, useSelector } from "../redux/store";


const useAppConfigs = () => {
    const useAppConfigs = useSelector(
        (state: RootState) => state.appConfigs
    )
    return useAppConfigs;
};
export default useAppConfigs;
