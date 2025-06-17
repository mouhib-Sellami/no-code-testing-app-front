import { createSlice } from "@reduxjs/toolkit";
import { ProjectTestFlowComponentState } from "@/types/redux/ProjectTestFlowComponentState";
import { createProjectTestFlowComponent, createTestFlowEdge, deleteProjectTestFlowComponent, deleteTestFlowEdge, getTestFlowEdges, patchProjectTestFlowComponent } from "./projectComponentSliceBaseServices";
import { deleteProjectComponent } from "../projectComponentsSlice/projectComponentSliceBaseServices";

const initialState: ProjectTestFlowComponentState = {
    isError: false,
    isLoading: false,
    message: '',
};

const projectTestFlowComponentSlice = createSlice({
    name: 'projectTestFlowComponentSlice',
    initialState,
    reducers: {
        resetProjectsTestFlowComponent: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProjectTestFlowComponent.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createProjectTestFlowComponent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(createProjectTestFlowComponent.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(patchProjectTestFlowComponent.pending, (state) => {
                // state.isLoading = true;
                state.message = '';
            })
            .addCase(patchProjectTestFlowComponent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(patchProjectTestFlowComponent.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(deleteProjectTestFlowComponent.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(deleteProjectTestFlowComponent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(deleteProjectComponent.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(createTestFlowEdge.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createTestFlowEdge.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(createTestFlowEdge.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(getTestFlowEdges.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getTestFlowEdges.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(getTestFlowEdges.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(deleteTestFlowEdge.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(deleteTestFlowEdge.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(deleteTestFlowEdge.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})



export const { resetProjectsTestFlowComponent, } = projectTestFlowComponentSlice.actions;

export default projectTestFlowComponentSlice.reducer;
