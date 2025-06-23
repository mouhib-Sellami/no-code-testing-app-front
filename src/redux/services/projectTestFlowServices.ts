import { CreateUpdateTestFlow } from "@/types/models/TestFlow";
import axiosInstance from "../../config/AxiosInstance";

const API_PREFIX = "project-test-flows/"

const createTestFlow = async (TestFlow: CreateUpdateTestFlow) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX,
        data: TestFlow
    });
    return data
};


const updateTestFlow = async (TestFlow: CreateUpdateTestFlow) => {
    const { data } = await axiosInstance({
        method: "PUT",
        url: API_PREFIX + `${TestFlow.id}/`,
        data: TestFlow
    });
    return data
};

const patchTestFlow = async (id: number, value: any) => {
    const { data } = await axiosInstance({
        method: "PATCH",
        url: API_PREFIX + `${id}/`,
        data: value
    });
    return data
};

const deleteTestFlow = async (id: number) => {
    const { data } = await axiosInstance({
        method: "DELETE",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const getTestFlow = async (id: number) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const getTestFlowComponents = async (id: number) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `${id}/components/`,
    });
    return data
};

const executeTestFlow = async (values: any) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX + `${values.id}/execute-test-flow/`,
        data: values
    });
    return data
};

const projectTestFlowServices = {
    deleteTestFlow,
    updateTestFlow,
    createTestFlow,
    getTestFlow,
    patchTestFlow,
    getTestFlowComponents,
    executeTestFlow
};

export default projectTestFlowServices;