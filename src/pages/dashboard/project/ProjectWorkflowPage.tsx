import WorkFlowSideBar from "@/components/builder-component/wrokflow-sidebar/WorkFlowSideBar";
import CustomLoadingOverlay from "@/components/custom-loading/CustomLoadingOverlay";
import TestEdgeTypes from "@/config/TestEdgeTypes";
import TestNodeTypes from "@/config/TestNodeTypes";
import TestBuilderLayout from "@/constants/layout/builderLayout/TestBuilderLayout";
import { WorkFlowContext } from "@/contexts/WorkflowContext";
import useTestFlowBuilder from "@/hooks/app/useTestFlowBuilder";
import useConfirmModal from "@/hooks/modals-hooks/useConfirmModal";
import useProjects from "@/hooks/useProjects";
import { useMantineTheme } from "@mantine/core";
import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import React from "react";


const ProjectWorkflowPage: React.FC = ({ }) => {
    const { colors } = useMantineTheme();
    const { isLoading } = useProjects();
    const { onDragOver, onDrop, edges, nodes, onNodesChange, onConnect, onEdgesChange, rebuildWorkFlow } = useTestFlowBuilder();
    const { openDeleteModal } = useConfirmModal();
    const { updateProjectSyncing, deleteTestFlowComponent } = React.useContext(WorkFlowContext);

    React.useEffect(() => {
        rebuildWorkFlow()
    }, [])

    const deleteSelectedComponent = React.useCallback(async (id: number) => {
        openDeleteModal({
            content: "Are you sure ?, all inner config will be lost",
            title: "Delete Test Case",
            onConfirm: async () => {
                updateProjectSyncing?.(true)
                await deleteTestFlowComponent?.(id);
                updateProjectSyncing?.(false)
                rebuildWorkFlow()
            }
        });
    }, []);

    const deleteSelectedComponent_ = React.useCallback(async (id: number) => {
        if (!id)
            return
        deleteSelectedComponent(id)
    }, [])

    return (
        <TestBuilderLayout sideBard={<WorkFlowSideBar />}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={TestNodeTypes}
                edgeTypes={TestEdgeTypes}
                onBeforeDelete={async ({ nodes: nodesToDelete, edges: edgesToDelete }) => {
                    for (const node of nodesToDelete) {
                        await deleteSelectedComponent_(Number(node.id));
                    }
                    return false
                }}
                fitView
                style={{ height: "100vh", width: "100vw", position: "relative" }}
            >
                {isLoading && <CustomLoadingOverlay />}
                <Background color={colors.primary[9]} />
                <MiniMap
                    bgColor='transparent'
                />
                <Controls />
            </ReactFlow>
        </TestBuilderLayout>
    )
}

export default ProjectWorkflowPage;