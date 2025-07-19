import { RootState, useSelector } from "../redux/store";


const useProjectComponents = () => {
    const useProjectComponents = useSelector(
        (state: RootState) => state.projectComponents
    )
    return useProjectComponents;
};
export default useProjectComponents;
