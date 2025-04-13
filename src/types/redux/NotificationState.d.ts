interface NotificationInitialState {
    content: string,
    isVisible?: boolean,
    type: "AUTH" | "NETWORK" | string,
    level: "ERROR" | "WARNING" | "ALERT" | "SUCCESS",
    render?: "NOTIFICATION" | "MODAL"
}

interface NotificationActionPayload {
    payload: NotificationInitialState
}

interface RenderNotificationProps {
    notification: NotificationInitialState, 
    onClose: () => void
}

interface ShowNotificationProps {
    content: string, 
    onClose: () => void
}
