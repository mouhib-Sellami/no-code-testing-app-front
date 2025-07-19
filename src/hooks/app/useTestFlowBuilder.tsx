import React from "react";
import { useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import { useWorkflowDnD } from "./useWorkflowDnD";
import { WorkFlowContext } from "@/contexts/WorkflowContext";
import useConfirmModal from "../modals-hooks/useConfirmModal";
import { Node, TestNode } from "@/types/app-types/Nodes";
import { createTestFlowEdge } from "@/redux/slices/projectTestFlowComponentsSlice/projectComponentSliceBaseServices";
import { dispatch } from "@/redux/store";

const useTestFlowBuilder = () => {
    const { screenToFlowPosition, fitView } = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { type, name, setWorkFlowDnD, component } = useWorkflowDnD();
    const { createNewFlowComponent, testComponents, rebuildTestFlow, updateProjectSyncing, fetchComponents, selectedFlow } = React.useContext(WorkFlowContext);

    const { openConfirmModal } = useConfirmModal();
    const [rebuild, setRebuild] = React.useState(false);
    const [rebuildEdges, setRebuildEdges] = React.useState(false);

    const onConnect = React.useCallback(async (params: { source: string; target: string }) => {
        if (!edges) return [];
        const exists = edges.some(
            (edge) => edge.source === params.source && edge.target === params.target
        );
        if (exists) return edges;
        updateProjectSyncing?.(true)

        await dispatch(createTestFlowEdge({
            source_component: Number(params.source),
            target_component: Number(params.target),
        }));
        await fetchComponents()
        setRebuild(true);
        updateProjectSyncing?.(false)
    }, [edges])

    const onDragOver = React.useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);


    const onDrop = React.useCallback(
        async (event: React.DragEvent) => {
            event.preventDefault();
            if (!type || !name || !component) {
                return;
            }
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const res = await createNewFlowComponent?.(component.id, { position });
            if (res && res.component) {
                const newNode: TestNode = {
                    id: res.component.id.toString(),
                    type,
                    position,
                    data: { label: name, component: res.component },
                };

                setNodes((nds) => nds.concat(newNode));
                setWorkFlowDnD(null, null, null);
            }
        },
        [type, name, component,]
    );

    React.useEffect(() => {
        if (rebuild) {
            rebuildTestFlow(false).then(res => {
                setEdges(res.edges);
                setNodes(res.nodes)
                setRebuild(false);
                fitView()
            });
        }
    }, [testComponents, rebuild,]);

    React.useEffect(() => {
        if (testComponents) {

            rebuildTestFlow(testComponents.length == 0).then(res => {
                setNodes(res.nodes);
                setEdges(res.edges);
                setRebuild(false);
                fitView()
            });
        }
    }, [testComponents]);

    const resetBuilderHooks = React.useCallback(() => {
        setNodes([])
        setEdges([])
    }, [])

    const rebuildWorkFlow = React.useCallback(async () => {
        await fetchComponents()
        setRebuild(true)
    }, [])

    return {
        // miniMapRendering,
        onConnect,
        onDragOver,
        onDrop,
        nodes,
        edges,
        onEdgesChange,
        onNodesChange,
        resetBuilderHooks,
        rebuildWorkFlow
    };
};

export default useTestFlowBuilder;