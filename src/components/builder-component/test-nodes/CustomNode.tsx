import EditComponentConfigModal from "@/components/modals/compoent-modals/EditComponentConfigModal";
import { BuilderContext } from "@/contexts/BuilderContext";
import { WorkFlowContext } from "@/contexts/WorkflowContext";
import useConfirmModal from "@/hooks/modals-hooks/useConfirmModal";
import { patchProjectComponent } from "@/redux/slices/projectComponentsSlice/projectComponentSliceBaseServices";
import { onSelectTestCase } from "@/redux/slices/projectSlice/ProjectTestCaseSlice";
import { patchProjectTestFlowComponent } from "@/redux/slices/projectTestFlowComponentsSlice/projectComponentSliceBaseServices";
import { dispatch } from "@/redux/store";
import { PATH_APP } from "@/routes/paths";
import { Node } from "@/types/app-types/Nodes";
import { ProjectComponent } from "@/types/models/ProjectComponent";
import { FlowTestComponent } from "@/types/models/TestCase";
import { ActionIcon, Card, Group, Text } from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import React from "react";
import { useNavigate } from "react-router";

const CustomNode: React.FC<any> = (props) => {
    const [builderData, setBuilderData] = React.useState<any>({})
    const [extra_data] = useDebouncedValue(builderData, 1000);
    const [propsData] = useDebouncedValue(props, 1000);
    const { getNode, updateNode } = useReactFlow();
    const { updateProjectSyncing, deleteTestFlowComponent } = React.useContext(WorkFlowContext);
    const [opened, { open, close }] = useDisclosure();
    const navigate = useNavigate()
    const { openDeleteModal } = useConfirmModal();

    const data = React.useMemo(() => {
        return propsData.data
    }, [propsData])

    const component: FlowTestComponent = React.useMemo(() => {
        return data.component
    }, [data])

    const node: Node | null = React.useMemo(() => {
        if (!component)
            return
        return getNode(component.id.toString()) as Node
    }, [data, component, propsData])

    React.useEffect(() => {
        setBuilderData(component.builder_config)
    }, [component])

    React.useEffect(() => {
        if (!node)
            return
        const { data, id, type, ...item } = node;
        setBuilderData(item)
    }, [node, data, component, propsData])

    const patchProjectComponentConfig = React.useCallback(async () => {
        if (!component || !component.builder_config)
            return
        if (!extra_data)
            return
        if (!extra_data.position)
            return
        if (extra_data.position != component.builder_config.position) {
            updateProjectSyncing?.(true)
            await dispatch(patchProjectTestFlowComponent({ id: component.id, builder_config: extra_data }))
            updateProjectSyncing?.(false)
        }
    }, [component, extra_data])

    React.useEffect(() => {
        if (extra_data)
            patchProjectComponentConfig()
    }, [extra_data])

    const deleteSelectedComponent = React.useCallback(async (id: number) => {
        openDeleteModal({
            content: "Are you sure ?, all inner config will be lost",
            title: "Delete Test Case",
            onConfirm: async () => {
                updateProjectSyncing?.(true)
                await deleteTestFlowComponent?.(id);
                updateProjectSyncing?.(false)
            }
        });
    }, []);

    const deleteSelectedComponent_ = React.useCallback(async () => {
        if (!component)
            return
        deleteSelectedComponent(component.id)
    }, [component])


    const goEdit = React.useCallback(() => {

        dispatch(onSelectTestCase(component))
        navigate(PATH_APP.general.dashboard.builder.replaceAll(":test_id", component.id.toString()))
    }, [component])
    return (
        <>
            {/* <Handle
                type="target"
                id="run_after_target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={props.isConnectable}
            /> */}
            <Card
                withBorder
                p={6}
                bg="transparent"
                style={{ width: 'fit-content' }}
                draggable
            >
                <Group align="center" justify="space-between">
                    <Text size="xs" fz={8}>{data.label}</Text>
                    <Group align="center" justify="center" gap={5}>
                        <ActionIcon size={15} onClick={goEdit}>
                            <IconEdit size={8} />
                        </ActionIcon>
                        <ActionIcon size={15} onClick={deleteSelectedComponent_}>
                            <IconTrash size={8} />
                        </ActionIcon>
                    </Group>
                </Group>

            </Card>
            {/* <Handle
                type="source"
                id="run_after_source"
                position={Position.Right}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={props.isConnectable}
            /> */}
            {/* {opened && component && <EditComponentConfigModal component={component} onClose={close} isVisible={opened} onSubmit={onSubmit} />} */}
        </>
    )
}

export default CustomNode;