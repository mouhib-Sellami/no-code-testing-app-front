import { CreateUpdateProject } from "@/types/models/Project";
import axiosInstance from "../../config/AxiosInstance";
import { paginationRequestParams } from "@/types/requests/PaginationRequestParams";

const API_PREFIX = "projects/"

const fetchProjects = async (p: paginationRequestParams) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX,
        params: p
    });
    return data
};

const createProject = async (project: CreateUpdateProject) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX,
        data: project
    });
    return data
};

const updateProject = async (project: CreateUpdateProject) => {
    const { data } = await axiosInstance({
        method: "PUT",
        url: API_PREFIX + `${project.id}/`,
        data: project
    });
    return data
};

const deleteProject = async (id: number) => {
    const { data } = await axiosInstance({
        method: "DELETE",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const projectServices = {
    fetchProjects,
    createProject,
    deleteProject,
    updateProject
};

export default projectServices;