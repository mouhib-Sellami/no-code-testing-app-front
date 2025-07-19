import CustomLoadingOverlay from '@/components/custom-loading/CustomLoadingOverlay';
import useProjects from '@/hooks/useProjects'
import { getProjectTestCases } from '@/redux/slices/projectSlice/projectSliceBaseServices';
import { dispatch } from '@/redux/store';
import { ActionIcon, Box, Divider, Group, rem, ScrollArea, TextInput, Title, useMantineTheme } from '@mantine/core'
import { IconPlus, IconX } from '@tabler/icons-react';
import React from 'react'
import { CustomTabsProps } from './types';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { onShowNotification } from '@/redux/slices/notificationSlice/notificationSlice';
import { createTestCase } from '@/redux/slices/projectSlice/projectTestCaseSliceBaseServices';
import { CreateUpdateTestCase, TestCase, } from '@/types/models/TestCase';
import TestCaseCard from './TestCaseCard';
import { PATH_APP } from '@/routes/paths';
import { onSelectTestCase } from '@/redux/slices/projectSlice/ProjectTestCaseSlice';
import { useNavigate } from 'react-router';

const CasesTab: React.FC<CustomTabsProps> = ({ active }) => {
    const { selectedProject, projectTests, isLoadingTests } = useProjects();
    const { colors } = useMantineTheme();
    const [opened, { open, close }] = useDisclosure();
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
            onSelect(res.payload)
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

    const onSelect = React.useCallback((item: TestCase) => {
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
            <ScrollArea pos={"relative"} h={rem("60vh")}>
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
                            <TestCaseCard key={idx} data={elm} onSelect={onSelect} />
                        )
                    })
                }
            </ScrollArea>
        </Box >
    )
}

export default CasesTab;