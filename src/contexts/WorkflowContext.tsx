import React from "react";
import { TestFlow } from "@/types/models/TestFlow";
import useProjects from "@/hooks/useProjects";
import { dispatch } from "@/redux/store";
import { getTestFlowComponents } from "@/redux/slices/projectSlice/projectTestFlowSliceBaseServices";
import useProjectFlows from "@/hooks/useProjectFlows";
import { FlowTestComponent } from "@/types/models/TestCase";
import { createProjectTestFlowComponent, deleteProjectTestFlowComponent, getTestFlowEdges } from "@/redux/slices/projectTestFlowComponentsSlice/projectComponentSliceBaseServices";

type WorkFlowContextProps = {
    selectedFlow: TestFlow | null,
    updateSelectedFlow: (v: TestFlow | null) => void
    rebuildTestFlow: (enableLoader?: boolean) => Promise<{ nodes: Array<Node>, edges: any }> | null
    createNewFlowComponent: (test_case_id: number, extraData?: any) => Promise<{ component: FlowTestComponent } | null>;
    isSyncing: boolean,
    isBuilding: boolean,
    testComponents: Array<FlowTestComponent>
    resetBuilder: () => void | null
    updateProjectSyncing: (v: boolean) => void | null
    deleteTestFlowComponent: (id: number) => void | null
    value: string,
    updateActiveTab: (v: string) => void | null,
    fetchComponents: () => void | null

}

const WorkFlowContext = React.createContext<Partial<WorkFlowContextProps>>({
    selectedFlow: null,
    updateSelectedFlow: (_: TestFlow | null) => null,
    rebuildTestFlow: () => null,
    testComponents: [],
    resetBuilder: () => null,
    isSyncing: false,
    isBuilding: false,
    updateProjectSyncing: (_: boolean) => null,
    deleteTestFlowComponent: (_: number) => null,
    createNewFlowComponent: (_: number, __?: any) => null,
    value: '1',
    updateActiveTab: (_: string) => null,
    fetchComponents: () => null

});

interface MQTTProviderProps {
    children: React.ReactNode;
}

const WorkFlowProvider = ({ children }: MQTTProviderProps) => {
    const [selectedFlow, setSelectedFlow] = React.useState<TestFlow | null>(null);
    const { selectedProject } = useProjects();
    const { testComponents } = useProjectFlows();
    const [isSyncing, setIsSyncing] = React.useState(false);
    const [isBuilding, setIsBuilding] = React.useState(false);
    const [value, setValue] = React.useState<string | null>('1');

    const updateActiveTab = React.useCallback((v: string) => {
        setValue(v)
    }, [])

    const fetchComponents = React.useCallback(async () => {
        if (!selectedFlow)
            return
        if (!selectedProject)
            return
        await dispatch(getTestFlowComponents(selectedFlow.id))
    }, [selectedProject, selectedFlow])

    React.useEffect(() => {
        fetchComponents()
    }, [selectedProject, selectedFlow])

    const updateSelectedFlow = React.useCallback((v: TestFlow | null) => {
        setSelectedFlow(v)
    }, [])


    const getProjectTestFlowEdges_ = React.useCallback(async () => {
        if (!selectedProject)
            return []
        if (!selectedFlow)
            return []
        if (!selectedProject || !selectedProject.provider.id)
            return []
        const res = await dispatch(getTestFlowEdges(selectedFlow.id))
        if (res.meta.requestStatus == "fulfilled")
            return res.payload
        return []
    }, [selectedProject, selectedFlow])

    const rebuildTestFlow = React.useCallback(async (enableLoader?: boolean): Promise<{ nodes: Array<Node>, edges: any }> => {
        if (enableLoader)
            setIsBuilding(true)
        const nodes = testComponents.map(elm => {
            return {
                id: elm.id.toString(),
                data: { label: elm?.name, component: elm },
                position: elm.builder_config?.position,
                type: `app-test-case`
            }
        })
        const res = await getProjectTestFlowEdges_()
        const edges = res.map(elm => {
            return {
                id: elm.id,
                source: elm.source_component.toString(),
                sourceHandle: null,
                target: elm.target_component.toString(),
                targetHandle: null,
                type: elm.dependency_type,
            }
        })
        if (enableLoader)
            setTimeout(() => setIsBuilding(false), 1000)

        return {
            nodes: nodes,
            edges: edges
        } as { nodes: Array<Node>, edges: any }
    }, [testComponents])

    const createNewFlowComponent = React.useCallback(async (test_case_id: number, extra_data: any): Promise<{ component: FlowTestComponent } | null> => {
        if (!selectedProject)
            return
        if (!selectedFlow)
            return
        const res = await dispatch(createProjectTestFlowComponent({
            flow_id: selectedFlow.id,
            test_case_id: test_case_id,
            extra_data
        }))
        return res.payload as { component: FlowTestComponent }
    }, [selectedProject, selectedFlow])

    const deleteTestFlowComponent = React.useCallback(async (id: number) => {
        const res = await dispatch(deleteProjectTestFlowComponent(id))
        if (res.meta.requestStatus == "fulfilled") {
            fetchComponents()
        }
    }, [selectedProject, selectedFlow])

    const updateProjectSyncing = React.useCallback((v: boolean) => {
        if (v == false) {
            setTimeout(() => { setIsSyncing(v) }, 500)
        } else {
            setIsSyncing(v)
        }
    }, [])

    return (
        <WorkFlowContext.Provider value={{
            updateSelectedFlow,
            selectedFlow,
            testComponents,
            isSyncing,
            isBuilding,
            deleteTestFlowComponent,
            createNewFlowComponent,
            rebuildTestFlow,
            fetchComponents,
            updateProjectSyncing,
            updateActiveTab,
            value

        }}>
            {children}
        </WorkFlowContext.Provider>
    );
};

const MQTTConsumer = WorkFlowContext.Consumer;

export { WorkFlowContext, WorkFlowProvider, MQTTConsumer };