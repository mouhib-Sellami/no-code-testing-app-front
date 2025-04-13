
import { appConfigSliceState } from "@/types/redux/AppConfigState";
import { createSlice } from "@reduxjs/toolkit";

const initialState: appConfigSliceState = {
    schemaMode: "dark"
};

const appConfigSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        resetAppConfig: (state) => {
            state.schemaMode = "dark";
        },
        setColorSchemaConfig: (state, action) => {
            state.schemaMode = action.payload;
        }
    },
});

export const { resetAppConfig, setColorSchemaConfig } = appConfigSlice.actions;

export default appConfigSlice.reducer;
