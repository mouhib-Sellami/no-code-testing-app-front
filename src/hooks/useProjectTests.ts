import { RootState, useSelector } from "../redux/store";


const useProjectTests = () => {
    const useProjectTests = useSelector(
        (state: RootState) => state.projectTestCase
    )
    return useProjectTests;
};
export default useProjectTests;
