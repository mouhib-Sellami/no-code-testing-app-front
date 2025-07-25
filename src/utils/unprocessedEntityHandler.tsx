import { onShowNotification } from "@/redux/slices/notificationSlice/notificationSlice";

const unprocessedEntityHandler = (obj: Object, store) => {
    for (const [_, value] of Object.entries(obj)) {
        if (value instanceof Array) {
            value.map(elm =>
                store.dispatch(onShowNotification({
                    content: elm,
                    level: "WARNING",
                    type: "ERROR 422"
                }))
            )
        } else {
            unprocessedEntityHandler(value, store)
        }
    }
}

export default unprocessedEntityHandler;