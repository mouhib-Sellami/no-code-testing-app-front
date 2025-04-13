import domainServices from "@/redux/services/domainServices";
import { TenantState } from "@/types/redux/TenantState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: TenantState = {
    is_valid: true,
    is_loading: false
};

const tenantSlice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(check_domain.pending, (state) => {
                state.is_loading = true;
                state.is_valid = true;
            })
            .addCase(check_domain.fulfilled, (state, action) => {
                state.is_loading = false;
                state.is_valid = true;
            })
            .addCase(check_domain.rejected, (state, action) => {
                state.is_loading = false;
                state.is_valid = false;
            })
    }
});

export const check_domain = createAsyncThunk('domains/check_domain', async (_, thunkAPI) => {
    try {
        const response = await domainServices.check_domain();
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const { } = tenantSlice.actions;

export default tenantSlice.reducer;