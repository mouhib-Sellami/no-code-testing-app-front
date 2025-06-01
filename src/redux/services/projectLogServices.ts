import { paginationRequestParams } from "@/types/requests/PaginationRequestParams";
import axiosInstance from "../../config/AxiosInstance";

const API_PREFIX = "project-logs/"

const getProjectLogs = async (project_id: string, p: paginationRequestParams) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX,
        params: { ...p, project:project_id },
    });
    return data
};

const getProjectLogsDetails = async (id: number) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const projectLogServices = {
    getProjectLogs,
    getProjectLogsDetails
};

export default projectLogServices;