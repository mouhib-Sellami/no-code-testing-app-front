import { CreateProjectTestFlowComponent } from "@/types/models/TestFlow";
import axiosInstance from "../../config/AxiosInstance";

const API_PREFIX = "projects-flows-components/"

const createProjectTestFlowComponent = async (testFlowComponent: CreateProjectTestFlowComponent) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX,
        data: testFlowComponent
    });
    return data
};


const updateProjectTestFlowComponent = async (testFlowComponent: any) => {
    const { data } = await axiosInstance({
        method: "PUT",
        url: API_PREFIX + `${testFlowComponent.id}/`,
        data: testFlowComponent
    });
    return data
};

const patchProjectTestFlowComponent = async (id: number, value: any) => {
    const { data } = await axiosInstance({
        method: "PATCH",
        url: API_PREFIX + `${id}/`,
        data: value
    });
    return data
};

const deleteProjectTestFlowComponent = async (id: number) => {
    const { data } = await axiosInstance({
        method: "DELETE",
        url: API_PREFIX + `${id}/`,
    });
    return data
};
const getProjectTestFlowComponent = async (id: number) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const projectTestFlowComponentServices = {
    deleteProjectTestFlowComponent,
    updateProjectTestFlowComponent,
    createProjectTestFlowComponent,
    getProjectTestFlowComponent,
    patchProjectTestFlowComponent,
};

export default projectTestFlowComponentServices;