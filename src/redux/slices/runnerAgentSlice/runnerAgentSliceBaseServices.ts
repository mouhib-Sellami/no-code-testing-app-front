import runnerAgentServices from "@/redux/services/runnerAgentServices";
import { CreateUpdateRunnerAgent, RunnerAgent } from "@/types/models/RunningAgent";
import { paginationRequestParams } from "@/types/requests/PaginationRequestParams";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRunnerAgents = createAsyncThunk('runner-agents/fetchRunnerAgents', async (params: paginationRequestParams, thunkAPI) => {
    try {
        const response = await runnerAgentServices.fetchRunnerAgents(params);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const createRunnerAgent = createAsyncThunk('runner-agents/createRunnerAgent', async (data: CreateUpdateRunnerAgent, thunkAPI) => {
    try {
        const response = await runnerAgentServices.createRunnerAgent(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {

            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteRunnerAgent = createAsyncThunk('runner-agents/deleteRunnerAgent', async (id: number, thunkAPI) => {
    try {
        const response = await runnerAgentServices.deleteRunnerAgent(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
export const updateRunnerAgent = createAsyncThunk('runner-agents/updateRunnerAgent', async (data: CreateUpdateRunnerAgent, thunkAPI) => {
    try {
        const response = await runnerAgentServices.updateRunnerAgent(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
