import projectTestFlowComponentServices from "@/redux/services/projectTestFlowComponentServices";
import TestFlowTestFlowEdgesServices from "@/redux/services/TestFlowEdgesServices";
import { CreateProjectTestFlowComponent, CreateTestFlowEdge } from "@/types/models/TestFlow";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createProjectTestFlowComponent = createAsyncThunk('projectTestFlowComponents/createProjectTestFlowComponent', async (data: CreateProjectTestFlowComponent, thunkAPI) => {
    try {
        const response = await projectTestFlowComponentServices.createProjectTestFlowComponent(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const patchProjectTestFlowComponent = createAsyncThunk('projectTestFlowComponents/patchProjectTestFlowComponent', async (data: { id: number, builder_config: any }, thunkAPI) => {
    try {
        const response = await projectTestFlowComponentServices.patchProjectTestFlowComponent(data.id, data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteProjectTestFlowComponent = createAsyncThunk('projectTestFlowComponents/deleteProjectTestFlowComponent', async (id: number, thunkAPI) => {
    try {
        const response = await projectTestFlowComponentServices.deleteProjectTestFlowComponent(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const createTestFlowEdge = createAsyncThunk('projectTestFlowComponents/createTestFlowEdge', async (data: CreateTestFlowEdge, thunkAPI) => {
    try {
        const response = await TestFlowTestFlowEdgesServices.createTestFlowEdge(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const getTestFlowEdges = createAsyncThunk('projectTestFlowComponents/getTestFlowEdges', async (id: number, thunkAPI) => {
    try {
        const response = await TestFlowTestFlowEdgesServices.getTestFlowEdges(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteTestFlowEdge = createAsyncThunk('projectTestFlowComponents/deleteTestFlowEdge', async (id: number, thunkAPI) => {
    try {
        const response = await TestFlowTestFlowEdgesServices.deleteTestFlowEdge(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
