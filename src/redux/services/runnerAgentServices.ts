import { CreateUpdateRunnerAgent, RunnerAgent } from "@/types/models/RunningAgent";
import axiosInstance from "../../config/AxiosInstance";
import { paginationRequestParams } from "@/types/requests/PaginationRequestParams";

const API_PREFIX = "runner-agents/"

const fetchRunnerAgents = async (params: paginationRequestParams) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX,
        params
    });
    return data
};

const createRunnerAgent = async (runnerAgent: CreateUpdateRunnerAgent) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX,
        data: runnerAgent
    });
    return data
};

const updateRunnerAgent = async (runnerAgent: CreateUpdateRunnerAgent) => {
    const { data } = await axiosInstance({
        method: "PUT",
        url: API_PREFIX + `${runnerAgent.id}/`,
        data: runnerAgent
    });
    return data
};

const deleteRunnerAgent = async (id: number) => {
    const { data } = await axiosInstance({
        method: "DELETE",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const runnerAgentServices = {
    fetchRunnerAgents,
    createRunnerAgent,
    deleteRunnerAgent,
    updateRunnerAgent
};

export default runnerAgentServices;