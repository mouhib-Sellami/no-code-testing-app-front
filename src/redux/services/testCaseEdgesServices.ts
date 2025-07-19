import { CreateTestEdge } from "@/types/models/TestCase";
import axiosInstance from "../../config/AxiosInstance";

const API_PREFIX = "test-edges/"

const createTestEdge = async (edge: CreateTestEdge) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX,
        data: edge
    });
    return data
};

const getTestEdges = async (id: number) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const deleteTestEdge = async (id: number) => {
    const { data } = await axiosInstance({
        method: "DELETE",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const updateTestEdgeType = async (id: number, value: any) => {
    const { data } = await axiosInstance({
        method: "PATCH",
        url: API_PREFIX + `${id}/`,
        data: value
    });
    return data
};


const testCaseEdgesServices = {
    createTestEdge,
    getTestEdges,
    deleteTestEdge,
    updateTestEdgeType
};

export default testCaseEdgesServices;