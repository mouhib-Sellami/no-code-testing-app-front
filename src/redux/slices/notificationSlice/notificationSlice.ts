
import showNotification from "@/hooks/showNotification";
import { createSlice } from "@reduxjs/toolkit";

const initialState: NotificationInitialState = {
    isVisible: false,
    content: "",
    type: "",
    level: "ALERT",
    render: "NOTIFICATION"
};

export const renderNotification = (state: NotificationInitialState) => {
    switch (state.render) {
        case "NOTIFICATION":
            showNotification({ notification: { ...state }, onClose: () => { } })
            break;
        // case modal notification
    }
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        resetNotificationHandler: (state) => {
            state.isVisible = false;
            state.content = "";
            state.type = "";
            state.level = "ALERT";
        },

        onShowNotification: (state, action: NotificationActionPayload) => {
            state.isVisible = true;
            state.content = action.payload.content;
            state.type = action.payload.type;
            state.level = action.payload.level;
            state.render = action.payload.render || 'NOTIFICATION'
            renderNotification(state)
        }
    },
});

export const { resetNotificationHandler, onShowNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
