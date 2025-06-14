import { CreateUpdateTestCase } from "@/types/models/TestCase";
import axiosInstance from "../../config/AxiosInstance";

const API_PREFIX = "projects-tests/"

const createTestCase = async (testCase: CreateUpdateTestCase) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX,
        data: testCase
    });
    return data
};


const updateTestCase = async (testCase: CreateUpdateTestCase) => {
    const { data } = await axiosInstance({
        method: "PUT",
        url: API_PREFIX + `${testCase.id}/`,
        data: testCase
    });
    return data
};

const patchTestCase = async (id: number, value: any) => {
    const { data } = await axiosInstance({
        method: "PATCH",
        url: API_PREFIX + `${id}/`,
        data: value
    });
    return data
};

const deleteTestCase = async (id: number) => {
    const { data } = await axiosInstance({
        method: "DELETE",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const getTestCase = async (id: number) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const getTestCaseComponents = async (id: number) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `${id}/components/`,
    });
    return data
};

const projectTestCaseServices = {
    deleteTestCase,
    updateTestCase,
    createTestCase,
    getTestCase,
    patchTestCase,
    getTestCaseComponents
};

export default projectTestCaseServices;