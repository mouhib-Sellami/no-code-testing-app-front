import projectTestCaseServices from "@/redux/services/projectTestCaseServices";
import { CreateUpdateTestCase } from "@/types/models/TestCase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createTestCase = createAsyncThunk('projectsTestCases/createTestCase', async (v: CreateUpdateTestCase, thunkAPI) => {
    try {
        const response = await projectTestCaseServices.createTestCase(v);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteTestCase = createAsyncThunk('projectsTestCases/deleteTestCase', async (id: number, thunkAPI) => {
    try {
        const response = await projectTestCaseServices.deleteTestCase(id);
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});
