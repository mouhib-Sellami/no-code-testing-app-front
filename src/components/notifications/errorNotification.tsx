import { notifications } from "@mantine/notifications";
import { IconAlertHexagon } from "@tabler/icons-react";

const errorNotification = (props: ShowNotificationProps) => {
    return notifications.show({
        title: 'Error',
        color: "red",
        autoClose: 2500,
        message: props.content,
        onClose: () => props.onClose(),
        icon: <IconAlertHexagon />,
    });
}

export default errorNotification;