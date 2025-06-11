import { createSlice } from "@reduxjs/toolkit";
import { createTestCase, deleteTestCase } from "./ProjectTestCaseSliceBaseServices";

const initialState: ProjectTestCaseState = {
    isError: false,
    isLoading: false,
    message: '',
};

const projectTestCaseSlice = createSlice({
    name: 'projectTestCaseSlice',
    initialState,
    reducers: {
        restProjectTestCases: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(createTestCase.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createTestCase.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(createTestCase.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(deleteTestCase.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(deleteTestCase.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(deleteTestCase.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})

export const { restProjectTestCases } = projectTestCaseSlice.actions;

export default projectTestCaseSlice.reducer;
