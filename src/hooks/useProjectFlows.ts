import { RootState, useSelector } from "../redux/store";


const useProjectFlows = () => {
    const useProjectFlows = useSelector(
        (state: RootState) => state.projectTestFlow
    )
    return useProjectFlows;
};
export default useProjectFlows;
