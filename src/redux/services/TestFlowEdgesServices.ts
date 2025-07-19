import { CreateTestFlowEdge } from "@/types/models/TestFlow";
import axiosInstance from "../../config/AxiosInstance";

const API_PREFIX = "test-flow-edges/"

const createTestFlowEdge = async (edge: CreateTestFlowEdge) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX,
        data: edge
    });
    return data
};

const getTestFlowEdges = async (id: number) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const deleteTestFlowEdge = async (id: number) => {
    const { data } = await axiosInstance({
        method: "DELETE",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const updateTestFlowEdgeType = async (id: number, value: any) => {
    const { data } = await axiosInstance({
        method: "PATCH",
        url: API_PREFIX + `${id}/`,
        data: value
    });
    return data
};


const TestFlowTestFlowEdgesServices = {
    createTestFlowEdge,
    getTestFlowEdges,
    deleteTestFlowEdge,
    updateTestFlowEdgeType
};

export default TestFlowTestFlowEdgesServices;