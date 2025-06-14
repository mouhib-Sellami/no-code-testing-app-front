import CustomLoadingOverlay from '@/components/custom-loading/CustomLoadingOverlay';
import useProjects from '@/hooks/useProjects'
import { getProjectTestCases } from '@/redux/slices/projectSlice/projectSliceBaseServices';
import { dispatch } from '@/redux/store';
import { ActionIcon, Box, Divider, Group, rem, ScrollArea, Text, TextInput, Title, useMantineTheme } from '@mantine/core'
import { IconPencil, IconPlus, IconTrash, IconX } from '@tabler/icons-react';
import React from 'react'
import { CustomTabsProps } from './types';
import { useDisclosure } from '@mantine/hooks';
import useConfirmModal from '@/hooks/modals-hooks/useConfirmModal';
import { useForm } from '@mantine/form';
import { onShowNotification } from '@/redux/slices/notificationSlice/notificationSlice';
import { createTestCase, deleteTestCase } from '@/redux/slices/projectSlice/projectTestCaseSliceBaseServices';
import { CreateUpdateTestCase, TestCase } from '@/types/models/TestCase';
import { useNavigate } from 'react-router';
import { PATH_APP } from '@/routes/paths';
import { onSelectTestCase } from '@/redux/slices/projectSlice/ProjectTestCaseSlice';

const CasesTab: React.FC<CustomTabsProps> = ({ active }) => {
    const { selectedProject, projectTests, isLoadingTests } = useProjects();
    const { colors } = useMantineTheme();
    const [opened, { open, close }] = useDisclosure();
    const { openDeleteModal } = useConfirmModal();
    const navigate = useNavigate();
    const fetchTestCases = React.useCallback(async () => {
        if (!selectedProject)
            return
        await dispatch(getProjectTestCases(selectedProject.id))
    }, [selectedProject])

    const initialValues = React.useMemo(() => {
        if (!selectedProject)
            return {
                project: -1,
                name: "",
                is_reference: true
            }
        return {
            project: selectedProject.id,
            name: "",
            is_reference: true
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
            form.setFieldValue('name', "Test case " + (projectTests.length + 1))
        }
    }, [opened, projectTests])

    React.useEffect(() => {
        if (!selectedProject)
            return
        if (!active)
            return
        fetchTestCases()
    }, [selectedProject, active])

    const submit = React.useCallback(async (v: CreateUpdateTestCase) => {
        if (!selectedProject)
            return
        const res = await dispatch(createTestCase(v))
        if (res.meta.requestStatus == "fulfilled") {
            await dispatch(getProjectTestCases(selectedProject.id))
            form.reset()
            close()
            dispatch(onShowNotification({
                content: "Test flow created succesfully",
                level: "SUCCESS",
                type: "Project workflows"
            }))
        } else {
            dispatch(onShowNotification({
                content: "Test flow failed",
                level: "ERROR",
                type: "Project workflows"
            }))
        }


    }, [selectedProject])

    const deleteTestCase_ = React.useCallback(async (id: number) => {
        openDeleteModal({
            content: "Are you sure?",
            title: "Delete Test flow",
            onConfirm: async () => {
                await dispatch(deleteTestCase(id))
                await dispatch(getProjectTestCases(selectedProject.id))
            }
        });
    }, [])

    const goEdit = React.useCallback((item: TestCase) => {
        dispatch(onSelectTestCase(item))
        navigate(PATH_APP.general.dashboard.builder.replaceAll(":test_id", item.id.toString()))
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
                {isLoadingTests && <CustomLoadingOverlay />}
                {
                    projectTests.map((elm, idx) => {
                        return (
                            <Box p={0} m={0} mb={10} key={idx}
                                style={{ cursor: "pointer" }}>
                                <Group
                                    p={"sm"}
                                    bg={colors.activeLinkBgColor[0]}
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
                                            onClick={() => goEdit(elm)}
                                        >
                                            <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </ActionIcon>
                                        <ActionIcon
                                            variant="filled"
                                            radius="md"
                                            color={colors.activeLinkBgColor[9]}
                                            title="Sync from remote"
                                            size={30}
                                            onClick={() => { deleteTestCase_(elm.id) }}
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

export default CasesTab;