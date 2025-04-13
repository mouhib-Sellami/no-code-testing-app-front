import { notifications } from "@mantine/notifications";
import { IconInfoCircle } from "@tabler/icons-react";

const infoNotification = (props: ShowNotificationProps) => {
    return notifications.show({
        title: "Info",
        color: "blue",
        message: props.content,
        autoClose: 2500,
        onClose: () => props.onClose(),
        icon: <IconInfoCircle />,

    });
}

export default infoNotification;