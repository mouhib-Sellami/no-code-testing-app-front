import CustomLoadingOverlay from "@/components/custom-loading/CustomLoadingOverlay";
import EdgeTypes from "@/config/EdgeTypes";
import MonitorNodeTypes from "@/config/MonitorNodeTypes";
import BuilderViewerLayout from "@/constants/layout/builderLayout/BuilderViewerLayout";
import { BuilderViewerContext } from "@/contexts/BuilderViewerContext";
import { getProjectLogsDetails } from "@/redux/slices/projectSlice/projectStatusLogSliceBaseServices";
import { dispatch } from "@/redux/store";
import { useMantineTheme } from "@mantine/core";
import { Background, Controls, ReactFlow, useReactFlow } from "@xyflow/react";
import React from "react";
import { useParams } from "react-router";



const ViewProjectLogPage: React.FC = () => {
    const { nodes, edges, isBuilding } = React.useContext(BuilderViewerContext);
    const { colors } = useMantineTheme();
    const { getNodes } = useReactFlow();
    const params = useParams();

    const fetchLogs = React.useCallback(async (id) => {
        if (!id)
            return
        await dispatch(getProjectLogsDetails(Number(id)))
    }, [])

    React.useEffect(() => {
        if (!params)
            return
        fetchLogs(params['id'])
    }, [params])

    return (
        <BuilderViewerLayout sideBard={null}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={MonitorNodeTypes}
                edgeTypes={EdgeTypes}
                onNodesChange={(changes) => console.log("update nodes", changes)}
                fitView
                style={{ height: "100vh", width: "100vw", position: "relative" }}
            >
                {isBuilding && <CustomLoadingOverlay />}
                <Background color={colors.primary[9]} />
                <Controls />
            </ReactFlow>
        </BuilderViewerLayout>
    );
};

export default ViewProjectLogPage;