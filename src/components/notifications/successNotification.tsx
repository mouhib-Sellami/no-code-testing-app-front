import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

const successNotification = (props: ShowNotificationProps) => {
    return notifications.show({
        title: 'Success',
        color: "green",
        message: props.content,
        autoClose: 2500,
        onClose: () => props.onClose(),
        icon: <IconCheck />,

    });
}

export default successNotification;