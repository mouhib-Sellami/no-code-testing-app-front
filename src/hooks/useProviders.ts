import { RootState, useSelector } from "../redux/store";


const useProviders = () => {
    const useProviders = useSelector(
        (state: RootState) => state.providers
    )
    return useProviders;
};
export default useProviders;
