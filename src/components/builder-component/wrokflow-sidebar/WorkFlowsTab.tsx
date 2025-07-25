import CustomLoadingOverlay from '@/components/custom-loading/CustomLoadingOverlay';
import useProjects from '@/hooks/useProjects'
import { getProjectTestFlows } from '@/redux/slices/projectSlice/projectSliceBaseServices';
import { dispatch } from '@/redux/store';
import { ActionIcon, Box, Divider, Group, rem, ScrollArea, Text, TextInput, Title, useMantineTheme } from '@mantine/core'
import { IconPencil, IconPlus, IconTrash, IconX } from '@tabler/icons-react';
import React from 'react'
import { CustomTabsProps } from './types';
import { WorkFlowContext } from '@/contexts/WorkflowContext';
import { useDisclosure } from '@mantine/hooks';
import { CreateUpdateTestFlow } from '@/types/models/TestFlow';
import { useForm } from '@mantine/form';
import { createTestFlow, deleteTestFlow } from '@/redux/slices/projectSlice/projectTestFlowSliceBaseServices';
import { onShowNotification } from '@/redux/slices/notificationSlice/notificationSlice';
import useConfirmModal from '@/hooks/modals-hooks/useConfirmModal';

const WorkFlowsTab: React.FC<CustomTabsProps> = ({ active }) => {
    const { selectedProject, projectFlows, isLoadingFlows } = useProjects();
    const { colors } = useMantineTheme();
    const { selectedFlow, updateSelectedFlow } = React.useContext(WorkFlowContext);
    const [opened, { open, close }] = useDisclosure();
    const { openDeleteModal } = useConfirmModal();

    const fetchFlows = React.useCallback(async () => {
        if (!selectedProject)
            return
        await dispatch(getProjectTestFlows(selectedProject.id))
    }, [selectedProject])

    const initialValues = React.useMemo(() => {
        if (!selectedProject)
            return {
                project: -1,
                name: ""
            }
        return {
            project: selectedProject.id,
            name: ""
        }
    }, [selectedProject])
    const form = useForm({
        mode: 'controlled',
        initialValues: initialValues,
        validate: {
            name: (value) => value.length > 0 ? null : 'Invalid field',
        },
    });
    React.useEffect(() => {
        if (opened) {
            form.setFieldValue('name', "Test flow " + (projectFlows.length + 1))
        }
    }, [opened, projectFlows])

    React.useEffect(() => {
        if (!selectedProject)
            return
        if (!active)
            return
        fetchFlows()
    }, [selectedProject, active])

    React.useEffect(() => {
        if (selectedFlow == null && projectFlows.length > 0) {
            updateSelectedFlow?.(projectFlows[0])
        }
    }, [selectedFlow, projectFlows])


    const submit = React.useCallback(async (v: CreateUpdateTestFlow) => {
        if (!selectedProject)
            return
        const res = await dispatch(createTestFlow(v))
        if (res.meta.requestStatus == "fulfilled") {
            await dispatch(getProjectTestFlows(selectedProject.id))
            form.reset()
            close()
            dispatch(onShowNotification({
                content: "Test flow created succesfully",
                level: "SUCCESS",
                type: "Project workflows"
            }))
            updateSelectedFlow?.(res.payload)
        } else {
            dispatch(onShowNotification({
                content: "Test flow failed",
                level: "ERROR",
                type: "Project workflows"
            }))
        }


    }, [selectedProject])

    const deleteWorkFlow = React.useCallback(async (id: number) => {
        openDeleteModal({
            content: "Are you sure?",
            title: "Delete Test flow",
            onConfirm: async () => {
                await dispatch(deleteTestFlow(id))
                await dispatch(getProjectTestFlows(selectedProject.id))
                updateSelectedFlow?.(null)
            }
        });
    }, [])
    return (
        <Box w={"100%"} h={"100%"} p={0} m={0}>
            <Group align='center' justify='space-between' py={"md"}>
                <Title order={4}>Test Flows</Title>
                <ActionIcon
                    variant="filled"
                    radius="md"
                    color={colors.activeLinkBgColor[9]}
                    title="Sync from remote"
                    size={30}
                    onClick={open}
                >
                    <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Group>
            <Divider py={"md"} />
            <ScrollArea pos={"relative"} mih={rem("60vh")}>
                {opened && < form onSubmit={form.onSubmit((values) => submit(values))} style={{ width: "100%" }}>

                    <Box p={0} m={0} mb={10}
                    >
                        <Group
                            pt={8}
                            bg={
                                colors.activeLinkBgColor[0]}
                            style={{
                                borderRadius: 6,
                            }}
                            align='center' justify='space-between'
                        >
                            <TextInput
                                w={"100%"}
                                key={form.key('name')}
                                {...form.getInputProps('name')}
                                autoFocus
                                rightSection={
                                    <ActionIcon
                                        variant="filled"
                                        radius="md"
                                        color={colors.activeLinkBgColor[9]}
                                        title="Sync from remote"
                                        size={30}
                                        onClick={close}
                                    >
                                        <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                    </ActionIcon>
                                }
                            />
                        </Group>
                        <Divider />
                    </Box>
                </form>}
                {isLoadingFlows && <CustomLoadingOverlay />}
                {
                    projectFlows.map((elm, idx) => {
                        return (
                            <Box p={0} m={0} mb={10} key={idx}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    if (selectedFlow && selectedFlow.id != elm.id) {
                                        updateSelectedFlow?.(elm)
                                    }
                                }}>
                                <Group
                                    p={"sm"}
                                    bg={selectedFlow && selectedFlow.id == elm.id ? colors.primary[9] : colors.activeLinkBgColor[0]}
                                    style={{
                                        borderRadius: 6,
                                    }}
                                    align='center'
                                    justify='space-between'
                                >
                                    <Text fz={{ xl: 14, lg: 12, md: 10 }} truncate maw={"70%"}>
                                        {elm.name}
                                    </Text>
                                    <Group align='center' justify='center' gap={10}>
                                        <ActionIcon
                                            variant="filled"
                                            radius="md"
                                            color={colors.activeLinkBgColor[9]}
                                            title="Sync from remote"
                                            size={30}
                                        >
                                            <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </ActionIcon>
                                        <ActionIcon
                                            variant="filled"
                                            radius="md"
                                            color={colors.activeLinkBgColor[9]}
                                            title="Sync from remote"
                                            size={30}
                                            onClick={() => { deleteWorkFlow(elm.id) }}
                                        >
                                            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </ActionIcon>
                                    </Group>
                                </Group>
                                <Divider />
                            </Box>
                        )
                    })
                }
            </ScrollArea>
        </Box >
    )
}

export default WorkFlowsTab;