// handle ALL INCOMMING NOTIFICATION FROM AGENT AND DISPLAY IN NOTIFCATION SECTION

import React, { PropsWithChildren } from "react";

type NotificationContextProps = {

}

const NotificationContext = React.createContext<Partial<NotificationContextProps>>({


})

const NotificationProvider = (props: PropsWithChildren) => {

    return (
        <NotificationContext.Provider value={{}}>
            {props.children}
        </NotificationContext.Provider>
    )
};
const NotificationConsumer = NotificationContext.Consumer
export { NotificationContext, NotificationProvider, NotificationConsumer };