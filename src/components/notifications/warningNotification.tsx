import { notifications } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons-react";

const warningNotification = (props: ShowNotificationProps) => {
    return notifications.show({
        title: 'Warning',
        color: "orange",
        message: props.content,
        autoClose: 2500,
        onClose: () => props.onClose(),
        icon: <IconAlertTriangle />,
    });
}

export default warningNotification;