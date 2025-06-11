import React from "react";
import { TestFlow } from "@/types/models/TestFlow";

type WorkFlowContextProps = {
    selectedFlow: TestFlow | null,
    updateSelectedFlow: (v: TestFlow | null) => void
}

const WorkFlowContext = React.createContext<Partial<WorkFlowContextProps>>({
    selectedFlow: null,
    updateSelectedFlow: (_: TestFlow | null) => null
});

interface MQTTProviderProps {
    children: React.ReactNode;
}

const WorkFlowProvider = ({ children }: MQTTProviderProps) => {
    const [selectedFlow, setSelectedFlow] = React.useState<TestFlow | null>(null);

    const updateSelectedFlow = React.useCallback((v: TestFlow | null) => {
        setSelectedFlow(v)
    }, [])

    return (
        <WorkFlowContext.Provider value={{ updateSelectedFlow, selectedFlow }}>
            {children}
        </WorkFlowContext.Provider>
    );
};

const MQTTConsumer = WorkFlowContext.Consumer;

export { WorkFlowContext, WorkFlowProvider, MQTTConsumer };