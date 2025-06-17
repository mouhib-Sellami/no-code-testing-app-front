import { createSlice } from "@reduxjs/toolkit";
import { createTestFlow, deleteTestFlow, getTestFlowComponents } from "./projectTestFlowSliceBaseServices";
import { executeTestCase } from "./projectTestCaseSliceBaseServices";

const initialState: ProjectTestFlowState = {
    isError: false,
    isLoading: false,
    message: '',
    testComponents: []
};

const ProjectTestFlowSlice = createSlice({
    name: 'projectTestFlowSlice',
    initialState,
    reducers: {
        restProjectFlows: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
            state.testComponents = []
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(createTestFlow.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createTestFlow.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(createTestFlow.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(deleteTestFlow.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(deleteTestFlow.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(deleteTestFlow.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(getTestFlowComponents.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getTestFlowComponents.fulfilled, (state, action) => {
                state.testComponents = action.payload
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(getTestFlowComponents.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(executeTestCase.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(executeTestCase.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(executeTestCase.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})

export const { restProjectFlows } = ProjectTestFlowSlice.actions;

export default ProjectTestFlowSlice.reducer;
