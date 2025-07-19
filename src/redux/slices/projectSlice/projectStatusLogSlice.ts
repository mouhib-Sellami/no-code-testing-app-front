import { ProjectStatusLogState } from "@/types/redux/ProjectStatusLogState";
import { createSlice } from "@reduxjs/toolkit";
import { getProjectLogs, getProjectLogsDetails } from "./projectStatusLogSliceBaseServices";

const initialState: ProjectStatusLogState = {
    projectLogs: [],
    selectedProjectLogs: null,
    isError: false,
    isLoading: false,
    message: '',
    count: 0
};

const projectStatusLogSlice = createSlice({
    name: 'projectStatusLogs',
    initialState,
    reducers: {
        resetProjectStatusLogs: (state) => {
            state.projectLogs = [];
            state.isLoading = false;
            state.isError = false;
            state.message = '';
            state.selectedProjectLogs = null;
            state.count = 0
        },
        setSelectedProjectLogs: (state, action) => {
            state.selectedProjectLogs = action.payload
        },
        resetSelectedProjectLogs: (state) => {
            state.selectedProjectLogs = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjectLogs.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getProjectLogs.fulfilled, (state, action) => {
                state.projectLogs = action.payload?.results || action.payload;
                state.isLoading = false;
                state.isError = false;
                state.message = '';
                state.count = action.payload.count || 0
            })
            .addCase(getProjectLogs.rejected, (state) => {
                state.projectLogs = [];
                state.isLoading = false;
                state.isError = true;
                state.message = '';
                state.count = 0
            })
            .addCase(getProjectLogsDetails.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getProjectLogsDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
                state.selectedProjectLogs = action.payload
            })
            .addCase(getProjectLogsDetails.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})


export const { resetProjectStatusLogs, resetSelectedProjectLogs, setSelectedProjectLogs } = projectStatusLogSlice.actions;

export default projectStatusLogSlice.reducer;
