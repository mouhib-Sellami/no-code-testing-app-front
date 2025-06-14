import { useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDnD } from "./useDnD";
import { BuilderContext } from "@/contexts/BuilderContext";
import { Node } from "@/types/app-types/Nodes";
import useConfirmModal from "../modals-hooks/useConfirmModal";
import { Select } from "@mantine/core";

const useBuilder = () => {
    const { screenToFlowPosition } = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { type, name, setDnD, component } = useDnD();
    const { createNewProjectComponent, rebuildProject, components, createNewEdge, updateProjectSyncing } = React.useContext(BuilderContext);
    const { openConfirmModal } = useConfirmModal();
    const [rebuild, setRebuild] = useState(false);
    const [rebuildEdges, setRebuildEdges] = useState(false);

    const onConnect = React.useCallback((params: { source: string; target: string }) => {
        if (!edges) return [];
        const exists = edges.some(
            (edge) => edge.source === params.source && edge.target === params.target
        );
        if (exists) return edges;
        let selectEdgeType = "DEPENDENCY";
        openConfirmModal({
            content: (
                <Select
                    defaultValue={selectEdgeType}
                    data={[
                        { label: "Depends", value: "DEPENDENCY" },
                        { label: "Run after", value: "RUN_AFTER" }
                    ]}
                    onChange={(value) => {
                        selectEdgeType = value;
                    }}
                />
            ),
            title: "Choose connection",
            onConfirm: async () => {
                updateProjectSyncing?.(true)
                await createNewEdge({
                    source_component: Number(params.source),
                    target_component: Number(params.target),
                    dependency_type: selectEdgeType
                });
                setRebuild(true);
                updateProjectSyncing?.(false)
            },

        });
    }, [edges])

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        async (event: React.DragEvent) => {
            event.preventDefault();
            if (!type || !name || !component) {
                return;
            }
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const res = await createNewProjectComponent?.(component.id, { position });
            if (res && res.component) {
                const newNode: Node = {
                    id: res.component.id.toString(),
                    type,
                    position,
                    data: { label: name, component: res.component },
                };

                setNodes((nds) => nds.concat(newNode));
                setDnD(null, null, null);
            }
        },
        [type, name, component,]
    );

    useEffect(() => {
        if (rebuild) {
            rebuildProject(false).then(res => {
                setEdges(res.edges);
                setRebuild(false);
            });
        }
    }, [components, rebuild,]);

    useEffect(() => {
        if (components) {
            rebuildProject(components.length == 0).then(res => {
                setNodes(res.nodes);
                setEdges(res.edges);
                setRebuild(false);
            });
        }
    }, [components]);

    const miniMapRendering = useCallback((n: Node) => {
        switch (n.type) {
            case 'app-input':
                return '#6c757d';
            case 'app-output':
                return '#edf6f9';
            case 'app-input-output':
                return '#b5e48c';
            default:
                return '#b5e48c';
        }
    }, []);



    const resetBuilderHooks = React.useCallback(() => {
        setNodes([])
        setEdges([])
    }, [])

    const rebuildWorkFlow = React.useCallback(() => {
        setRebuild(true)
    }, [])

    return {
        miniMapRendering,
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

export default useBuilder;