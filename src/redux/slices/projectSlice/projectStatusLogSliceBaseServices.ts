import projectLogServices from "@/redux/services/projectLogServices";
import { paginationRequestParams } from "@/types/requests/PaginationRequestParams";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProjectLogs = createAsyncThunk('projects/getProjectLogs', async (data: { project_id: string, p: paginationRequestParams }, thunkAPI) => {
    try {        
        const response = await projectLogServices.getProjectLogs(data.project_id, data.p);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
export const getProjectLogsDetails = createAsyncThunk('projects/getProjectLogsDetails', async (id: number, thunkAPI) => {
    try {
        const response = await projectLogServices.getProjectLogsDetails(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
