import { RoleState } from "@/types/redux/RoleState";
import { createSlice } from "@reduxjs/toolkit";
import { createRole, deleteRole, fetchRoles, updateRole } from "./roleSliceBaseServices";

const initialState: RoleState = {
    roles: [],
    isError: false,
    isLoading: false,
    message: '',
    count: 0
};

const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        resetRoles: (state: RoleState) => {
            state.roles = [];
            state.isLoading = false;
            state.isError = false;
            state.message = '';
            state.count = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.roles = action.payload?.results || action.payload;
                state.isLoading = false;
                state.isError = false;
                state.message = '';
                state.count = action.payload.count || 0;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.roles = [];
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(createRole.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createRole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(createRole.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(deleteRole.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(deleteRole.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(updateRole.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})

export const { resetRoles } = roleSlice.actions;

export default roleSlice.reducer;