import { RootState, useSelector } from "../redux/store";


const useProjects = () => {
    const useProjects = useSelector(
        (state: RootState) => state.projects
    )
    return useProjects;
};
export default useProjects;
