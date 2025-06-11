import permissionServices from "@/redux/services/permissionServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTestFlow, deleteTestFlow } from "./projectTestFlowSliceBaseServices";

const initialState: ProjectTestFlowState = {
    isError: false,
    isLoading: false,
    message: '',
};

const ProjectTestFlowSlice = createSlice({
    name: 'projectTestFlowSlice',
    initialState,
    reducers: {
        restProjectFlows: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(createTestFlow.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createTestFlow.fulfilled, (state, action) => {
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
            .addCase(deleteTestFlow.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(deleteTestFlow.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})

export const { restProjectFlows } = ProjectTestFlowSlice.actions;

export default ProjectTestFlowSlice.reducer;
