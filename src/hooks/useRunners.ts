import { RootState, useSelector } from "../redux/store";


const useRunners = () => {
    const useRunners = useSelector(
        (state: RootState) => state.runners
    )
    return useRunners;
};
export default useRunners;
