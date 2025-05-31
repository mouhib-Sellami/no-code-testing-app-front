import { createSlice } from "@reduxjs/toolkit";
import { ProjectComponentState } from "@/types/redux/ProjectComponentState";
import { createEdge, createProjectComponent, deleteEdge, deleteProjectComponent, getEdges, patchProjectComponent, updateEdgeType } from "./projectComponentSliceBaseServices";

const initialState: ProjectComponentState = {
    isError: false,
    isLoading: false,
    message: '',
};

const projectComponentSlice = createSlice({
    name: 'projectComponents',
    initialState,
    reducers: {
        resetProjectsComponent: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProjectComponent.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createProjectComponent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(createProjectComponent.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(patchProjectComponent.pending, (state) => {
                // state.isLoading = true;
                state.message = '';
            })
            .addCase(patchProjectComponent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(patchProjectComponent.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(deleteProjectComponent.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(deleteProjectComponent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(deleteProjectComponent.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(createEdge.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createEdge.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(createEdge.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(getEdges.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getEdges.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(getEdges.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(deleteEdge.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(deleteEdge.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(deleteEdge.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(updateEdgeType.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(updateEdgeType.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(updateEdgeType.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})



export const { resetProjectsComponent, } = projectComponentSlice.actions;

export default projectComponentSlice.reducer;
