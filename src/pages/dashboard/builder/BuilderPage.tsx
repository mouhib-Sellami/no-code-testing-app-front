import React from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    MiniMap,
    Panel,
    EdgeProps,
    Edge,
    useEdges,
    useReactFlow,
} from '@xyflow/react';
import { ActionIcon, Group, Select, useMantineTheme } from '@mantine/core';
import BuilderLayout from '@/constants/layout/builderLayout/BuilderLayout';
import ProviderComponentSelector from '@/components/builder-component/provider-component-selector/ProviderComponentSelector';
import nodeTypes from '@/config/nodeTypes';
import useBuilder from '@/hooks/app/useBuilder';
import EdgeTypes from '@/config/EdgeTypes';
import { BuilderContext } from '@/contexts/BuilderContext';
import CustomLoadingOverlay from '@/components/custom-loading/CustomLoadingOverlay';
import useConfirmModal from '@/hooks/modals-hooks/useConfirmModal';
import { IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { deleteEdge, updateEdgeType } from '@/redux/slices/projectComponentsSlice/projectComponentSliceBaseServices';
import { dispatch } from '@/redux/store';


const BuilderPage: React.FC = () => {
    const { colors } = useMantineTheme();
    const { miniMapRendering, onConnect, onDragOver, onDrop, edges, nodes, onEdgesChange, onNodesChange, resetBuilderHooks, rebuildWorkFlow } = useBuilder();
    const { resetBuilder, isBuilding, updateProjectSyncing, deleteComponent } = React.useContext(BuilderContext);
    const { openDeleteModal, openConfirmModal } = useConfirmModal();
    const { setEdges } = useReactFlow();

    const selectedEdge = React.useMemo(() => {
        return edges.find(elm => elm.selected)
    }, [edges])

    // React.useEffect(() => () => {
    //     resetBuilder?.()
    //     resetBuilderHooks()
    // }, []);

    const deleteSelectedComponent = React.useCallback(async (id: number) => {
        openDeleteModal({
            content: "Are you sure?",
            title: "Delete Component",
            onConfirm: async () => {
                updateProjectSyncing?.(true)
                await deleteComponent(id);
                updateProjectSyncing?.(false)

            }
        });
    }, []);

    const deleteComponentEdge = React.useCallback(async () => {
        if (!selectedEdge)
            return
        openDeleteModal({
            content: "Are you sure?",
            title: "Delete Connection",
            onConfirm: async () => {
                updateProjectSyncing?.(true)
                await dispatch(deleteEdge(selectedEdge.id));
                updateProjectSyncing?.(false)
                setEdges((edges) => edges.filter((edge) => edge.id !== selectedEdge.id));
            }
        });
    }, [selectedEdge]);

    const updateComponentEdge = React.useCallback(async () => {
        if (!selectedEdge)
            return
        let selectEdgeType = selectedEdge.type
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
            title: "Update connection",
            onConfirm: async () => {
                await dispatch(updateEdgeType({
                    id: selectedEdge.id,
                    data: {
                        dependency_type: selectEdgeType
                    }
                }))
                rebuildWorkFlow()
            },

        });
    }, [selectedEdge]);


    return (
        <BuilderLayout sideBard={<ProviderComponentSelector />}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                edgeTypes={EdgeTypes}
                onBeforeDelete={async ({ nodes: nodesToDelete, edges: edgesToDelete }) => {
                    for (const node of nodesToDelete) {
                        await deleteSelectedComponent(Number(node.id));
                    }
                    return false
                }}
                fitView
                style={{ height: "100vh", width: "100vw", position: "relative" }}
            >
                {isBuilding && <CustomLoadingOverlay />}
                <Background color={colors.primary[9]} />
                <Panel>
                    {selectedEdge && <Group gap={"sm"} bg={colors.activeLinkBgColor[9]} p={4} style={{ borderRadius: 8 }}>
                        <ActionIcon
                            variant="filled"
                            radius="md"
                            color={colors.activeLinkBgColor[9]}
                            title="Delete"
                            size={30}
                            onClick={deleteComponentEdge}
                        >
                            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon
                            variant="filled"
                            radius="md"
                            color={colors.activeLinkBgColor[9]}
                            title="Edit"
                            size={30}
                            onClick={updateComponentEdge}
                        >
                            <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    </Group>}
                </Panel>
                <MiniMap
                    bgColor='transparent'
                    nodeStrokeColor={miniMapRendering}
                    nodeColor={miniMapRendering}
                />
                <Controls />
            </ReactFlow>

        </BuilderLayout>
    );
};

export default BuilderPage;