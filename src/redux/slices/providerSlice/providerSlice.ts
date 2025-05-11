import providerServices from "@/redux/services/providerServices";
import { ProviderState } from "@/types/redux/ProviderState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ProviderState = {
    providers: [],
    isError: false,
    isLoading: false,
    message: '',
};

const providerSlice = createSlice({
    name: 'provider',
    initialState,
    reducers: {
        resetProvider: (state) => {
            state.providers = [];
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProviders.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(fetchProviders.fulfilled, (state, action) => {
                state.providers = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(fetchProviders.rejected, (state) => {
                state.providers = [];
                state.isLoading = false;
                state.isError = true;
                state.message = '';
            })
    }
})


export const fetchProviders = createAsyncThunk('providers/fetchProviders', async (_, thunkAPI) => {
    try {
        const response = await providerServices.fetchProviders();
        return response;
    } catch (error: any) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const { resetProvider } = providerSlice.actions;

export default providerSlice.reducer;
