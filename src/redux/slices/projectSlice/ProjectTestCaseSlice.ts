import { createSlice } from "@reduxjs/toolkit";
import { createTestCase, deleteTestCase, executeTestCase, getTestCase, getTestCaseComponents } from "./projectTestCaseSliceBaseServices";
import { ProjectTestCaseState } from "@/types/redux/ProjectTestCaseState";

const initialState: ProjectTestCaseState = {
    isError: false,
    isLoading: false,
    message: '',
    components: [],
    selectedTest: null
};

const projectTestCaseSlice = createSlice({
    name: 'projectTestCaseSlice',
    initialState,
    reducers: {
        restProjectTestCases: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
            state.components = [];
            state.selectedTest = null
        },
        onSelectTestCase: (state, action) => {
            state.selectedTest = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(createTestCase.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createTestCase.fulfilled, (state) => {
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
            .addCase(deleteTestCase.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(deleteTestCase.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(getTestCaseComponents.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getTestCaseComponents.fulfilled, (state, action) => {
                state.components = action.payload
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(getTestCaseComponents.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(getTestCase.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getTestCase.fulfilled, (state, action) => {
                state.selectedTest = action.payload
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(getTestCase.rejected, (state) => {
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

export const { restProjectTestCases, onSelectTestCase } = projectTestCaseSlice.actions;

export default projectTestCaseSlice.reducer;
