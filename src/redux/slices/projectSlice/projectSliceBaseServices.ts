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
