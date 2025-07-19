import projectServices from "@/redux/services/projectServices";
import { CreateUpdateProject } from "@/types/models/Project";
import { paginationRequestParams } from "@/types/requests/PaginationRequestParams";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (p: paginationRequestParams, thunkAPI) => {
    try {
        const response = await projectServices.fetchProjects(p);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const createProject = createAsyncThunk('projects/createProject', async (data: CreateUpdateProject, thunkAPI) => {
    try {
        const response = await projectServices.createProject(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {

            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (data: number, thunkAPI) => {
    try {
        const response = await projectServices.deleteProject(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateProject = createAsyncThunk('projects/updateProject', async (data: CreateUpdateProject, thunkAPI) => {
    try {
        const response = await projectServices.updateProject(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const recentProjects = createAsyncThunk('projects/recentProjects', async (_, thunkAPI) => {
    try {
        const response = await projectServices.recentProjects();
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const getProjectComponents = createAsyncThunk('projects/projectComponents', async (id: number, thunkAPI) => {
    try {
        const response = await projectServices.getProjectComponents(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const getProjectTestCases = createAsyncThunk('projects/getProjectTestCases', async (id: number, thunkAPI) => {
    try {
        const response = await projectServices.getProjectTestCases(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const getProjectTestFlows = createAsyncThunk('projects/getProjectTestFlows', async (id: number, thunkAPI) => {
    try {
        const response = await projectServices.getProjectTestFlows(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const executeProject = createAsyncThunk('projects/executeProject', async (data: any, thunkAPI) => {
    try {
        const response = await projectServices.executeProject(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
