import useProjectLogs from "@/hooks/useProjectLogs";
import { Node } from "@/types/app-types/Nodes";
import { Component } from "@/types/models/Provider";
import { Edge, useNodesState } from "@xyflow/react";
import React, { PropsWithChildren } from "react";
import { MQTTContext } from "./MQTTContext";
import { ProjectStatusLog } from "@/types/models/ProjectStatusLog";
import { dispatch } from "@/redux/store";
import { getProjectLogs, getProjectLogsDetails } from "@/redux/slices/projectSlice/projectStatusLogSliceBaseServices";

type BuilderViewerContextProps = {
    nodes: Array<Node>,
    edges: Array<Edge>,
    isBuilding: boolean,
    isQueued: boolean
}

const BuilderViewerContext = React.createContext<Partial<BuilderViewerContextProps>>({
    nodes: [],
    edges: [],
    isBuilding: false,
    isQueued: true
})

const BuilderViewerProvider = (props: PropsWithChildren) => {
    const { selectedProjectLogs } = useProjectLogs();
    const [isBuilding, setIsBuilding] = React.useState(false);
    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = React.useState<Array<Edge>>([]);
    const { handleSubscribe, isConnected, MQTTClient } = React.useContext(MQTTContext);
    const [executing, setExecuting] = React.useState<any>(null);

    const workflow = React.useMemo(() => {
        if (!selectedProjectLogs)
            return
        return selectedProjectLogs.workflow.flows[0].workflow
    }, [selectedProjectLogs])

    console.log(selectedProjectLogs);
    

    React.useEffect(() => {
        if (!executing) return;

        setNodes((nodes) =>
            nodes.map((elm) => {
                if (elm.id.toString() === executing.component_id.toString()) {
                    return {
                        ...elm,
                        data: { ...elm.data, status: executing.status }
                    };
                }
                return elm;
            })
        );
    }, [executing]);

    const handleComponentStatus = React.useCallback((topic: string, message: Buffer<ArrayBufferLike>) => {
        
        const data = JSON.parse(message.toString())
        console.log(data);
        setExecuting(data)
    }, [])

    const handleEdgeStatus = React.useCallback(() => { }, [])

    const handleProjectStatus = React.useCallback(async (topic: string, message: Buffer<ArrayBufferLike>, selectedProjectLogs: ProjectStatusLog) => {
        const data = JSON.parse(message.toString())
        if (data.execution_id == selectedProjectLogs.id) {
            const res = await dispatch(getProjectLogsDetails(data.execution_id))
        }

    }, [])

    React.useEffect(() => {
        if (!isConnected || !selectedProjectLogs)
            return
        handleSubscribe?.(selectedProjectLogs.agent_key + "_project_" + selectedProjectLogs.id + "_component", 1, handleComponentStatus)
        handleSubscribe?.(selectedProjectLogs.agent_key + "_project_" + selectedProjectLogs.id + "_edge", 1, handleEdgeStatus)
        handleSubscribe?.(selectedProjectLogs.agent_key + "_project_" + selectedProjectLogs.id, 1, (topic, message) => handleProjectStatus(topic, message, selectedProjectLogs))
    }, [isConnected, selectedProjectLogs])

    const rebuildProject = React.useCallback(async (): Promise<{ nodes: Array<Node>, edges: any }> => {
        if (!workflow)
            return
        setIsBuilding(true)

        const nodes = Object.values(workflow.components).map((elm: Component) => {
            return {
                id: elm.id.toString(),
                data: { label: elm.name, component: elm, status: elm.status || "PENDING" },
                position: elm.builder_config?.position,
                type: `app-${elm.type}`
            }
        })

        setNodes(nodes as Array<Node>)
        const edges = workflow.dependencies.map(elm => {
            if (elm.dependency_type == "RUN_AFTER") {
                return {
                    id: elm.id,
                    source: elm.source_component.toString(),
                    sourceHandle: "run_after_source",
                    target: elm.target_component.toString(),
                    targetHandle: "run_after_target",
                    type: elm.dependency_type,
                }
            }
            return {
                id: elm.id,
                source: elm.source_component.toString(),
                sourceHandle: "source",
                target: elm.target_component.toString(),
                targetHandle: "target",
                type: elm.dependency_type,
            }
        })
        setEdges(edges)

        setTimeout(() => setIsBuilding(false), 1000)
    }, [workflow, selectedProjectLogs, isBuilding])

    React.useEffect(() => {
        if (!selectedProjectLogs || !workflow)
            return
        rebuildProject()
    }, [workflow, selectedProjectLogs])

    return (
        <BuilderViewerContext.Provider value={{
            nodes,
            edges,
            isBuilding
        }}>
            {props.children}
        </BuilderViewerContext.Provider>
    )
};
const BuilderConsumer = BuilderViewerContext.Consumer
export { BuilderViewerContext, BuilderViewerProvider, BuilderConsumer };