import React from "react";
import BaseAppModal from "../base-modal/BaseAppModal";
import { RunnerAgent } from "@/types/models/RunningAgent";
import { AppModalProps } from "../base-modal/types";


export interface MonitorAgentModalProps extends AppModalProps {
    runner: RunnerAgent
}

const MonitorAgent: React.FC<MonitorAgentModalProps> = (props) => {

    const selectedRunner = React.useMemo(() => {
        return props.runner
    }, [props])

    console.log(selectedRunner);

    return (
        <BaseAppModal
            {...props}
            withCancelButton
            title="Agent HeartBeat"
            onCancel={() => props.onCancel()}
            onSubmit={() => { }}
            SubmitButtonLoading={false}
        >

        </BaseAppModal>
    );
};

export default MonitorAgent;