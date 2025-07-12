import React from "react";

import { Alert, Image, Modal, px } from "@mantine/core";

export interface RunTestFlowModalProps {
    image_link: string,
    video_link: string,
    visible: boolean,
    onCancel: () => void
}

const MonitoringModal: React.FC<RunTestFlowModalProps> = (props) => {
    console.log(props);

    const renderMonitoring = React.useMemo(() => {
        if (props.video_link == "" && props.image_link == "") {
            return <Alert color="orange">Be patient , job still isQueued</Alert>
        } else
            if (props.video_link == "") {
                return <Image src={props.image_link} />
            } else {
                return <video width={"100%"} height={"100%"} autoPlay controls >
                    <source src={props.video_link} type="video/mp4"></source>
                </video>

            }
    }, [props])

    return (
        <Modal
            opened={props.visible}
            onClose={props.onCancel}
            centered
            size={"xl"}
            h={px("50rem")}
            title="Monitoring"
        >
            {renderMonitoring}
        </Modal>
    )
}

export default MonitoringModal;
