import { CreateEdge, CreateProjectComponent } from "@/types/models/ProjectComponent";
import axiosInstance from "../../config/AxiosInstance";

const API_PREFIX = "projects-components/"

const createProjectComponent = async (projectComponent: CreateProjectComponent) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX,
        data: projectComponent
    });
    return data
};


const updateProjectComponent = async (projectComponent: any) => {
    const { data } = await axiosInstance({
        method: "PUT",
        url: API_PREFIX + `${projectComponent.id}/`,
        data: projectComponent
    });
    return data
};

const patchProjectComponent = async (id: number, value: any) => {
    const { data } = await axiosInstance({
        method: "PATCH",
        url: API_PREFIX + `${id}/`,
        data: value
    });
    return data
};

const deleteProjectComponent = async (id: number) => {
    const { data } = await axiosInstance({
        method: "DELETE",
        url: API_PREFIX + `${id}/`,
    });
    return data
};
const getProjectComponent = async (id: number) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const projectComponentServices = {
    deleteProjectComponent,
    updateProjectComponent,
    createProjectComponent,
    getProjectComponent,
    patchProjectComponent,
};

export default projectComponentServices;