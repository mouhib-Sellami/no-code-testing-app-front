import { UserState } from "@/types/redux/UserState";
import { createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUser, fetchUsers, updateUser } from "./userSliceBaseServices";

const initialState: UserState = {
    users: [],
    isError: false,
    isLoading: false,
    message: '',
    count: 0
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetUsers: (state: UserState) => {
            state.users = [];
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload?.results || action.payload;
                state.isLoading = false;
                state.isError = false;
                state.message = '';
                state.count = action.payload.count || 0
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.users = [];
                state.isLoading = false;
                state.isError = true;
                state.message = '';
                state.count = 0
            })
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})

export const { resetUsers } = userSlice.actions;

export default userSlice.reducer;