import permissionServices from "@/redux/services/permissionServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AppPermissionState = {
    permissions: [],
    isError: false,
    isLoading: false,
    message: '',
};

const permissionSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
        resetPermissions: (state) => {
            state.permissions = [];
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAppPermissions.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getAppPermissions.fulfilled, (state, action) => {
                state.permissions = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(getAppPermissions.rejected, (state) => {
                state.permissions = [];
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})


export const getAppPermissions = createAsyncThunk('permissions/getAppPermissions', async (_, thunkAPI) => {
    try {
        const response = await permissionServices.getAppPermissions();
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const { resetPermissions } = permissionSlice.actions;

export default permissionSlice.reducer;
