import errorNotification from "@/components/notifications/errorNotification";
import infoNotification from "@/components/notifications/infoNotficiation";
import successNotification from "@/components/notifications/successNotification";
import warningNotification from "@/components/notifications/warningNotification";

const showNotification = (props: RenderNotificationProps) => {
    switch (props.notification.level) {
        case 'ERROR':
            errorNotification({
                content: props.notification.content, onClose: () => {
                    props.onClose()
                }
            })
            break;
        case "WARNING":
            warningNotification({
                content: props.notification.content, onClose: () => {
                    props.onClose()
                }
            })
            break;
        case "ALERT":
            infoNotification({
                content: props.notification.content, onClose: () => {
                    props.onClose()
                }
            })
            break;
        case "SUCCESS":
            successNotification({
                content: props.notification.content, onClose: () => {
                    props.onClose()
                }
            })
            break;
        default:
            infoNotification({
                content: props.notification.content, onClose: () => {
                    props.onClose()
                }
            })
            break;
    }
}

export default showNotification;