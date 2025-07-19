import { RootState, useSelector } from "../redux/store";


const useProjectLogs = () => {
    const useProjectLogs = useSelector(
        (state: RootState) => state.projectStatusLogs
    )
    return useProjectLogs;
};
export default useProjectLogs;
