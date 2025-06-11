import TestSelectorSideBar from "@/components/builder-component/test-selector/TestSelectorSideBar";
import WorkFlowSideBar from "@/components/builder-component/wrokflow-sidebar/WorkFlowSideBar";
import CustomLoadingOverlay from "@/components/custom-loading/CustomLoadingOverlay";
import TestEdgeTypes from "@/config/TestEdgeTypes";
import TestNodeTypes from "@/config/TestNodeTypes";
import TestBuilderLayout from "@/constants/layout/builderLayout/TestBuilderLayout";
import useProjects from "@/hooks/useProjects";
import { getProjectTestCases } from "@/redux/slices/projectSlice/projectSliceBaseServices";
import { dispatch } from "@/redux/store";
import { useMantineTheme } from "@mantine/core";
import { Background, Controls, MiniMap, ReactFlow, useReactFlow } from "@xyflow/react";
import React from "react";


const ProjectWorkflowPage: React.FC = ({ }) => {
    const { colors } = useMantineTheme();

    const { projectTests, selectedProject, isLoading } = useProjects();
    const { setEdges } = useReactFlow();

    const fetchTest = React.useCallback(async () => {
        if (!selectedProject)
            return
        await dispatch(getProjectTestCases(selectedProject.id))
    }, [selectedProject])

    React.useEffect(() => {
        fetchTest()
    }, [selectedProject])

    return (
        <TestBuilderLayout sideBard={<WorkFlowSideBar />}>
            <ReactFlow
                // nodes={nodes}
                // edges={edges}
                // onNodesChange={onNodesChange}
                // onEdgesChange={onEdgesChange}
                // onConnect={onConnect}
                // onDrop={onDrop}
                // onDragOver={onDragOver}
                nodeTypes={TestNodeTypes}
                edgeTypes={TestEdgeTypes}
                onBeforeDelete={async ({ nodes: nodesToDelete, edges: edgesToDelete }) => {
                    // for (const node of nodesToDelete) {
                    //     await deleteSelectedComponent(Number(node.id));
                    // }
                    // return false
                    return false
                }}
                fitView
                style={{ height: "100vh", width: "100vw", position: "relative" }}
            >
                {isLoading && <CustomLoadingOverlay />}
                <Background color={colors.primary[9]} />
                {/* <Panel>
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
                </Panel> */}
                <MiniMap
                    bgColor='transparent'
                // nodeStrokeColor={miniMapRendering}
                // nodeColor={miniMapRendering}
                />
                <Controls />
            </ReactFlow>
        </TestBuilderLayout>
    )
}

export default ProjectWorkflowPage;