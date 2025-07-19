import roleServices from "@/redux/services/roleServices";
import { Role } from "@/types/models/Role";
import { paginationRequestParams } from "@/types/requests/PaginationRequestParams";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async (params: paginationRequestParams, thunkAPI) => {
    try {
        const response = await roleServices.fetchRoles(params);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const createRole = createAsyncThunk('roles/createRole', async (data: Role, thunkAPI) => {
    try {
        const response = await roleServices.createRole(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {

            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteRole = createAsyncThunk('roles/deleteRole', async (data: number, thunkAPI) => {
    try {
        const response = await roleServices.deleteRole(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
export const updateRole = createAsyncThunk('roles/updateRole', async (data: Role, thunkAPI) => {
    try {
        const response = await roleServices.updateRole(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
