import { createSlice } from "@reduxjs/toolkit";
import { createProject, deleteProject, fetchProjects, updateProject } from "./projectSliceBaseServices";
import { ProjectState } from "@/types/redux/ProjectState";

const initialState: ProjectState = {
    projects: [],
    isError: false,
    isLoading: false,
    message: '',
    count: 0
};

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        resetProjects: (state) => {
            state.projects = [];
            state.isLoading = false;
            state.isError = false;
            state.message = '';
            state.count = 0;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.projects = action.payload?.results || action.payload;
                state.isLoading = false;
                state.isError = false;
                state.message = '';
                state.count = action.payload.count || 0
            })
            .addCase(fetchProjects.rejected, (state) => {
                state.projects = [];
                state.isLoading = false;
                state.isError = true;
                state.message = '';
                state.count = 0
            })
            .addCase(createProject.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createProject.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(createProject.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(deleteProject.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(deleteProject.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(deleteProject.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(updateProject.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(updateProject.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(updateProject.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})



export const { resetProjects } = projectSlice.actions;

export default projectSlice.reducer;
