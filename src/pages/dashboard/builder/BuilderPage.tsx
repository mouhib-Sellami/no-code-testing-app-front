import React from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    MiniMap,
    Panel,
    useReactFlow,
} from '@xyflow/react';
import { ActionIcon, Button, Group, Select, useMantineTheme } from '@mantine/core';
import BuilderLayout from '@/constants/layout/builderLayout/BuilderLayout';
import ProviderComponentSelector from '@/components/builder-component/provider-component-selector/ProviderComponentSelector';
import nodeTypes from '@/config/nodeTypes';
import useBuilder from '@/hooks/app/useBuilder';
import EdgeTypes from '@/config/EdgeTypes';
import { BuilderContext } from '@/contexts/BuilderContext';
import CustomLoadingOverlay from '@/components/custom-loading/CustomLoadingOverlay';
import useConfirmModal from '@/hooks/modals-hooks/useConfirmModal';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { deleteEdge, updateEdgeType } from '@/redux/slices/projectComponentsSlice/projectComponentSliceBaseServices';
import { dispatch } from '@/redux/store';
import { useParams } from 'react-router';
import { restProjectTestCases } from '@/redux/slices/projectSlice/ProjectTestCaseSlice';
import useProjectTests from '@/hooks/useProjectTests';
import { getTestCase } from '@/redux/slices/projectSlice/projectTestCaseSliceBaseServices';

const BuilderPage: React.FC = () => {
    const { colors } = useMantineTheme();
    const { miniMapRendering, onConnect, onDragOver, onDrop, edges, nodes, onEdgesChange, onNodesChange, resetBuilderHooks, rebuildWorkFlow } = useBuilder();
    const { isBuilding, updateProjectSyncing, deleteComponent } = React.useContext(BuilderContext);
    const { openDeleteModal, openConfirmModal } = useConfirmModal();
    const { setEdges } = useReactFlow();
    const params = useParams();
    const { selectedTest } = useProjectTests();
    console.log("nodes");
    console.log(nodes);
    console.log("edges");
    console.log(edges);

    const fetchTestCase = React.useCallback(async () => {
        if (!selectedTest)
            await dispatch(getTestCase(Number(params.test_id)))
    }, [selectedTest, params.test_id])

    React.useEffect(() => {
        fetchTestCase();
    }, []);

    React.useEffect(() => () => {
        dispatch(restProjectTestCases())
    }, []);

    const selectedEdge = React.useMemo(() => edges.find(elm => elm.selected), [edges]);

    const deleteSelectedComponent = React.useCallback(async (id: number) => {
        openDeleteModal({
            content: "Are you sure?",
            title: "Delete Component",
            onConfirm: async () => {
                updateProjectSyncing?.(true);
                await deleteComponent(id);
                updateProjectSyncing?.(false);
            }
        });
    }, [deleteComponent, openDeleteModal, updateProjectSyncing]);

    const deleteComponentEdge = React.useCallback(async () => {
        if (!selectedEdge) return;
        openDeleteModal({
            content: "Are you sure?",
            title: "Delete Connection",
            onConfirm: async () => {
                updateProjectSyncing?.(true);
                await dispatch(deleteEdge(selectedEdge.id));
                updateProjectSyncing?.(false);
                setEdges((edges) => edges.filter((edge) => edge.id !== selectedEdge.id));
            }
        });
    }, [selectedEdge, setEdges, openDeleteModal, updateProjectSyncing]);

    const updateComponentEdge = React.useCallback(async () => {
        if (!selectedEdge) return;
        let selectEdgeType = selectedEdge.type;
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
                    data: { dependency_type: selectEdgeType }
                }));
                rebuildWorkFlow();
            },
        });
    }, [selectedEdge, openConfirmModal, rebuildWorkFlow]);

    const arrangeNodes = React.useCallback(() => {
        const levelMap: Record<number, any[]> = {};
        const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
        const edgeMap = edges.reduce((acc: Record<string, string[]>, edge) => {
            if (!acc[edge.source]) acc[edge.source] = [];
            acc[edge.source].push(edge.target);
            return acc;
        }, {});
        const visited = new Set<string>();

        const dfs = (nodeId: string, depth: number) => {
            if (visited.has(nodeId)) return;
            visited.add(nodeId);
            if (!levelMap[depth]) levelMap[depth] = [];
            levelMap[depth].push(nodeMap[nodeId]);

            const children = edgeMap[nodeId] || [];
            children.forEach((childId) => dfs(childId, depth + 1));
        };

        const targetNodes = new Set(edges.map(e => e.target));
        const rootNodes = nodes.filter(n => !targetNodes.has(n.id));
        rootNodes.forEach(root => dfs(root.id, 0));

        const gapX = 250;
        const gapY = 150;
        Object.entries(levelMap).forEach(([depthStr, nodesAtLevel]) => {
            const depth = Number(depthStr);
            nodesAtLevel.forEach((node, index) => {
                node.position = { x: index * gapX, y: depth * gapY };
            });
        });

        onNodesChange([...nodes]);
        setEdges([...edges]);
    }, [nodes, edges, onNodesChange, setEdges]);


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
                onBeforeDelete={async ({ nodes: nodesToDelete }) => {
                    for (const node of nodesToDelete) {
                        await deleteSelectedComponent(Number(node.id));
                    }
                    return false;
                }}
                fitView
                style={{ height: "100vh", width: "100vw", position: "relative" }}
            >
                {isBuilding && <CustomLoadingOverlay />}
                <Background color={colors.primary[9]} />
                <Panel>
                    <Group gap="sm">
                        <Button size="sm" onClick={arrangeNodes}>Arrange Nodes</Button>
                        {selectedEdge && (
                            <Group gap={"sm"} bg={colors.activeLinkBgColor[9]} p={4} style={{ borderRadius: 8 }}>
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
                            </Group>
                        )}
                    </Group>
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
