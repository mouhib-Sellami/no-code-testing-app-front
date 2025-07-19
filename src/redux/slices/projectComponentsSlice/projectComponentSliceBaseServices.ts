import componentEdgesServices from "@/redux/services/componentEdgesServices";
import projectComponentServices from "@/redux/services/projectComponentServices";
import { CreateEdge, CreateProjectComponent } from "@/types/models/ProjectComponent";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createProjectComponent = createAsyncThunk('projectComponents/createProjectComponent', async (data: CreateProjectComponent, thunkAPI) => {
    try {
        const response = await projectComponentServices.createProjectComponent(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const patchProjectComponent = createAsyncThunk('projectComponents/patchProjectComponent', async (data: { id: number, builder_config: any }, thunkAPI) => {
    try {
        const response = await projectComponentServices.patchProjectComponent(data.id, data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteProjectComponent = createAsyncThunk('projectComponents/deleteProjectComponent', async (id: number, thunkAPI) => {
    try {
        const response = await projectComponentServices.deleteProjectComponent(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const createEdge = createAsyncThunk('projectComponents/createEdge', async (data: CreateEdge, thunkAPI) => {
    try {
        const response = await componentEdgesServices.createEdge(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const getEdges = createAsyncThunk('projectComponents/getEdges', async (id: number, thunkAPI) => {
    try {
        const response = await componentEdgesServices.getEdges(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteEdge = createAsyncThunk('projectComponents/deleteEdge', async (id: number, thunkAPI) => {
    try {
        const response = await componentEdgesServices.deleteEdge(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
export const updateEdgeType = createAsyncThunk('projectComponents/updateEdgeType', async (values: { id: number, data: { dependency_type: string } }, thunkAPI) => {
    try {
        const response = await componentEdgesServices.updateEdgeType(values.id, values.data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
