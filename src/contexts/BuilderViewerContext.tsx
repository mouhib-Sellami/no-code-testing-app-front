import useProjectLogs from "@/hooks/useProjectLogs";
import { Node } from "@/types/app-types/Nodes";
import { Edge, useNodesState } from "@xyflow/react";
import React, { PropsWithChildren } from "react";
import { MQTTContext } from "./MQTTContext";
import { ProjectStatusLog } from "@/types/models/ProjectStatusLog";
import { dispatch } from "@/redux/store";
import { getProjectLogsDetails } from "@/redux/slices/projectSlice/projectStatusLogSliceBaseServices";
import { Component } from "@/types/models/Provider";

type BuilderViewerContextProps = {
    nodes: Array<Node>,
    edges: Array<Edge>,
    isBuilding: boolean,
    isQueued: boolean,
    selectTestCase: (data: any) => void | null
    resetSelectedTestCase: () => void | null
    selectedTestCase: any
}

const BuilderViewerContext = React.createContext<Partial<BuilderViewerContextProps>>({
    nodes: [],
    edges: [],
    isBuilding: false,
    isQueued: true,
    selectTestCase: (_: any) => null,
    resetSelectedTestCase: () => null,
    selectedTestCase: null
})

const BuilderViewerProvider = (props: PropsWithChildren) => {
    const { selectedProjectLogs } = useProjectLogs();
    const [isBuilding, setIsBuilding] = React.useState(false);
    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = React.useState<Array<Edge>>([]);
    const { handleSubscribe, isConnected, MQTTClient } = React.useContext(MQTTContext);
    const [selectedTestCase, setSelectedTestCase] = React.useState<any>(null);
    const [workflow, setWorkflow] = React.useState<any>([])
    const [enableBuilding, setEnableBuilding] = React.useState(true)

    React.useEffect(() => {
        setEnableBuilding(true)
    }, [selectedTestCase])

    React.useEffect(() => {
        if (!selectedProjectLogs)
            return
        setWorkflow(selectedProjectLogs.workflow.flows)
    }, [selectedProjectLogs])

    React.useEffect(() => {
        setSelectedTestCase((prev) => {
            if (prev == null) {
                return prev;
            }
            const testcase = workflow.find((elm) => elm.test_case?.id === prev.test_case_id);
            if (testcase) {
                return testcase.workflow;
            }
            return prev;
        });
    }, [workflow]);

    const handleProjectStatus = React.useCallback(async (topic: string, message: Buffer<ArrayBufferLike>, selectedProjectLogs: ProjectStatusLog) => {
        const data = JSON.parse(message.toString())
        if (data.execution_id == selectedProjectLogs.id) {
            const res = await dispatch(getProjectLogsDetails(data.execution_id))
        }
    }, [])

    const handleExecutionState = React.useCallback(async (topic: string, message: Buffer<ArrayBufferLike>) => {
        const data = JSON.parse(message.toString())
        setEnableBuilding(false)
        setWorkflow(data?.flows)
    }, [])

    React.useEffect(() => {
        if (!isConnected || !selectedProjectLogs)
            return
        handleSubscribe?.(selectedProjectLogs.agent_key + "_project_" + selectedProjectLogs.id, 1, (topic, message) => handleProjectStatus(topic, message, selectedProjectLogs))
        handleSubscribe?.(selectedProjectLogs.agent_key + "_project_state_" + selectedProjectLogs.id, 1, handleExecutionState)
        //reset selected project logs to free the subscriptions
    }, [isConnected, selectedProjectLogs])

    const rebuildTestCase = React.useCallback(async (): Promise<{ nodes: Array<Node>, edges: any }> => {
        if (enableBuilding)
            setIsBuilding(true)
        const nodes = Object.values(selectedTestCase.components).map((elm: Component) => {
            return {
                id: elm?.id?.toString(),
                data: { label: elm.name, component: elm, status: elm.status || "PENDING" },
                position: elm.builder_config?.position,
                type: `app-${elm.type}`
            }
        })
        setNodes(nodes as Array<Node>)
        const edges = selectedTestCase.dependencies.map(elm => {
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
        return
    }, [selectedProjectLogs, selectedTestCase, isBuilding, enableBuilding])

    React.useEffect(() => {
        if (!selectedProjectLogs || !workflow)
            return
        if (selectedTestCase) {
            rebuildTestCase()
        } else {
            rebuildTestFlow()
        }
    }, [workflow, selectedProjectLogs, selectedTestCase])

    const rebuildTestFlow = React.useCallback(async (): Promise<{ nodes: Array<Node>, edges: any }> => {
        if (!workflow)
            return
        if (enableBuilding)
            setIsBuilding(true)

        const nodes = workflow.map((elm: any) => {
            return {
                id: elm.test_case.id.toString(),
                data: {
                    label: elm.test_case.name,
                    component: elm.workflow,
                    status: elm.test_case.status || "PENDING",
                    monitoring: elm.test_case.monitoring || {}
                },
                position: elm.test_case.builder_config?.position,
                type: `app-test-case`
            }
        })


        setNodes(nodes as Array<Node>)
        const edges = selectedProjectLogs.workflow?.dependencies?.map(elm => {
            return {
                id: `${elm.source_id.toString()}-${elm.target_id.toString()}`,
                source: elm.source_id.toString(),
                sourceHandle: null,
                target: elm.target_id.toString(),
                targetHandle: null,
                type: elm.dependency_type,
            }
        })
        setEdges(edges)

        setTimeout(() => setIsBuilding(false), 1000)
    }, [workflow, selectedProjectLogs, isBuilding, enableBuilding])

    const selectTestCase = React.useCallback((data: any) => {
        setSelectedTestCase(data)
    }, [])
    const resetSelectedTestCase = React.useCallback(() => {
        setSelectedTestCase(null)
    }, [])

    return (
        <BuilderViewerContext.Provider value={{
            nodes,
            edges,
            isBuilding,
            selectedTestCase,
            selectTestCase,
            resetSelectedTestCase
        }}>
            {props.children}
        </BuilderViewerContext.Provider>
    )
};
const BuilderConsumer = BuilderViewerContext.Consumer
export { BuilderViewerContext, BuilderViewerProvider, BuilderConsumer };