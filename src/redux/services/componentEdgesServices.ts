import { CreateEdge, CreateProjectComponent } from "@/types/models/ProjectComponent";
import axiosInstance from "../../config/AxiosInstance";

const API_PREFIX = "edges/"

const createEdge = async (edge: CreateEdge) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX,
        data: edge
    });
    return data
};

const getEdges = async (id: number) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const deleteEdge = async (id: number) => {
    const { data } = await axiosInstance({
        method: "DELETE",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const updateEdgeType = async (id: number, value: any) => {
    const { data } = await axiosInstance({
        method: "PATCH",
        url: API_PREFIX + `${id}/`,
        data: value
    });
    return data
};


const componentEdgesServices = {
    createEdge,
    getEdges,
    deleteEdge,
    updateEdgeType
};

export default componentEdgesServices;