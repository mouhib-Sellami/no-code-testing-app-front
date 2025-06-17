import projectTestFlowServices from "@/redux/services/projectTestFlowServices";
import { CreateUpdateTestFlow } from "@/types/models/TestFlow";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createTestFlow = createAsyncThunk('projectsTestFlows/createTestFlow', async (v: CreateUpdateTestFlow, thunkAPI) => {
    try {
        const response = await projectTestFlowServices.createTestFlow(v);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteTestFlow = createAsyncThunk('projectsTestFlows/deleteTestFlow', async (id: number, thunkAPI) => {
    try {
        const response = await projectTestFlowServices.deleteTestFlow(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const getTestFlowComponents = createAsyncThunk('projectsTestFlows/getTestFlowComponents', async (id: number, thunkAPI) => {
    try {
        const response = await projectTestFlowServices.getTestFlowComponents(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
