import { AgentRunnerState } from "@/types/redux/AgentRunnerState";
import { createSlice } from "@reduxjs/toolkit";
import { createRunnerAgent, deleteRunnerAgent, fetchRunnerAgents, updateRunnerAgent } from "./runnerAgentSliceBaseServices";

const initialState: AgentRunnerState = {
    runners: [],
    isError: false,
    isLoading: false,
    message: '',
    count: 0
};

const runnerAgentSlice = createSlice({
    name: 'runnerAgent',
    initialState,
    reducers: {
        resetRunnerAgent: (state: AgentRunnerState) => {
            state.runners = [];
            state.isLoading = false;
            state.isError = false;
            state.message = '';
            state.count = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRunnerAgents.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(fetchRunnerAgents.fulfilled, (state, action) => {
                state.runners = action.payload?.results || action.payload;
                state.isLoading = false;
                state.isError = false;
                state.message = '';
                state.count = action.payload.count || 0;
            })
            .addCase(fetchRunnerAgents.rejected, (state, action) => {
                state.runners = [];
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(createRunnerAgent.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createRunnerAgent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(createRunnerAgent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(deleteRunnerAgent.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(deleteRunnerAgent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(deleteRunnerAgent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(updateRunnerAgent.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(updateRunnerAgent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(updateRunnerAgent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})

export const { resetRunnerAgent } = runnerAgentSlice.actions;

export default runnerAgentSlice.reducer;