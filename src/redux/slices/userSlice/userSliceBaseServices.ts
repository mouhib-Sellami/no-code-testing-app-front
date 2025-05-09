import userServices from "@/redux/services/usersServices";
import { createUpdateUser } from "@/types/models/User";
import { paginationRequestParams } from "@/types/requests/PaginationRequestParams";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (p: paginationRequestParams, thunkAPI) => {
    try {
        const response = await userServices.fetchUsers(p);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const createUser = createAsyncThunk('users/createUser', async (data: createUpdateUser, thunkAPI) => {
    try {
        const response = await userServices.createUser(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {

            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (data: number, thunkAPI) => {
    try {
        const response = await userServices.deleteUser(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateUser = createAsyncThunk('users/updateUser', async (data: createUpdateUser, thunkAPI) => {
    try {
        const response = await userServices.updateUser(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const requestChangePassword = createAsyncThunk('users/requestChangePassword', async (data: number, thunkAPI) => {
    try {
        const response = await userServices.requestChangePassword(data);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
