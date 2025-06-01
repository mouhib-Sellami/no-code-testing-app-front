import { ProjectStatusLogState } from "@/types/redux/ProjectStatusLogState";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProjectStatusLogState = {
    projectLogs: [],
    selectedProjectLogs: null,
    isError: false,
    isLoading: false,
    message: '',
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

    }
})


export const { resetProjectStatusLogs, resetSelectedProjectLogs, setSelectedProjectLogs } = projectStatusLogSlice.actions;

export default projectStatusLogSlice.reducer;
