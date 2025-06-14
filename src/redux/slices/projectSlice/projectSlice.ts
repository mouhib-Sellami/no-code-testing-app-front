import { createSlice } from "@reduxjs/toolkit";
import { createProject, deleteProject, executeProject, fetchProjects, getProjectComponents, getProjectTestCases, getProjectTestFlows, recentProjects, updateProject } from "./projectSliceBaseServices";
import { ProjectState } from "@/types/redux/ProjectState";

const initialState: ProjectState = {
    projects: [],
    isError: false,
    isLoading: false,
    message: '',
    count: 0,
    selectedProject: null,
    // projectComponents: [],
    projectTests: [],
    projectFlows: [],
    isLoadingForRunning: false,
    isLoadingFlows: false,
    isLoadingTests: false
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
            state.selectedProject = null;
            // state.projectComponents = [];
            state.projectTests = [];
            state.projectFlows = [];
            state.isLoadingForRunning = false;
            state.isLoadingFlows = false;
            state.isLoadingTests = false;
        },
        onSelectProject: (state, action) => {
            state.selectedProject = action.payload;
        },
        resetSelectedProject: (state) => {
            state.selectedProject = null;
            // state.projectComponents = []
            state.projectTests = []
            state.projectFlows = []
        },
        resetSelectedProjectComponent: (state) => {
            // state.projectComponents = []
            state.projectTests = []
            state.projectFlows = []
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
            .addCase(recentProjects.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(recentProjects.fulfilled, (state, action) => {
                state.projects = action.payload?.results || action.payload;
                state.isLoading = false;
                state.isError = false;
                state.message = '';
                state.count = action.payload.count || action.payload.length
            })
            .addCase(recentProjects.rejected, (state) => {
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
            // .addCase(getProjectComponents.pending, (state) => {
            //     state.isLoading = true;
            //     state.message = '';
            // })
            // .addCase(getProjectComponents.fulfilled, (state, action) => {
            //     state.projectComponents = action.payload
            //     state.isLoading = false;
            //     state.isError = false;
            //     state.message = '';
            // })
            // .addCase(getProjectComponents.rejected, (state) => {
            //     state.isLoading = false;
            //     state.isError = true;
            //     state.message = '';
            // })
            .addCase(getProjectTestCases.pending, (state) => {
                state.isLoadingTests = true;
                state.message = '';
            })
            .addCase(getProjectTestCases.fulfilled, (state, action) => {
                state.projectTests = action.payload
                state.isLoadingTests = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(getProjectTestCases.rejected, (state) => {
                state.isLoadingTests = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(getProjectTestFlows.pending, (state) => {
                state.isLoadingFlows = true;
                state.message = '';
            })
            .addCase(getProjectTestFlows.fulfilled, (state, action) => {
                state.projectFlows = action.payload
                state.isLoadingFlows = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(getProjectTestFlows.rejected, (state) => {
                state.isLoadingFlows = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(executeProject.pending, (state) => {
                state.isLoadingForRunning = true;
                state.message = '';
            })
            .addCase(executeProject.fulfilled, (state, action) => {
                state.isLoadingForRunning = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(executeProject.rejected, (state) => {
                state.isLoadingForRunning = false;
                state.isError = true;
                state.message = '';
            })
    }
})



export const { resetProjects, onSelectProject, resetSelectedProject, resetSelectedProjectComponent } = projectSlice.actions;

export default projectSlice.reducer;
