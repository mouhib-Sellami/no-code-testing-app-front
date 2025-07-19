

import { useWorkflowDnD } from '@/hooks/app/useWorkflowDnD';
import useConfirmModal from '@/hooks/modals-hooks/useConfirmModal';
import useProjects from '@/hooks/useProjects';
import { getProjectTestCases } from '@/redux/slices/projectSlice/projectSliceBaseServices';
import { onSelectTestCase } from '@/redux/slices/projectSlice/ProjectTestCaseSlice';
import { deleteTestCase } from '@/redux/slices/projectSlice/projectTestCaseSliceBaseServices';
import { dispatch } from '@/redux/store';
import { PATH_APP } from '@/routes/paths';
import { TestCase } from '@/types/models/TestCase';
import { ActionIcon, Box, Divider, Group, Text, useMantineTheme } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import React from 'react'
import { useNavigate } from 'react-router';

export interface TestCaseCardProps {
    data: TestCase,
    onSelect: (testCase: TestCase) => void
}

const TestCaseCard: React.FC<TestCaseCardProps> = ({ data, onSelect }) => {
    const { setWorkFlowDnD } = useWorkflowDnD();
    const { colors } = useMantineTheme();
    const { openDeleteModal } = useConfirmModal();
    const { selectedProject } = useProjects();
    const navigate = useNavigate();

    const onDragStart = (event: React.DragEvent, component: TestCase) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify({
            type: "app-test-case",
            name: component.name,
            component: component
        }));
        event.dataTransfer.effectAllowed = 'move';
        setWorkFlowDnD("app-test-case", component.name, component);
    };


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
        openDeleteModal({
            title: "Modify Test Case",
            content: "Modifying this test case will only affect new instances. Existing instances will retain their original test flows.",
            onConfirm: () => {
                onSelect(item)
            }
        })
    }, [])

    return (
        <Box p={0} m={0} mb={10}
            onDragStart={(event) => onDragStart(event, data)}
            draggable
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
                    {data.name}
                </Text>
                <Group align='center' justify='center' gap={10}>
                    <ActionIcon
                        variant="filled"
                        radius="md"
                        color={colors.activeLinkBgColor[9]}
                        title="Sync from remote"
                        size={30}
                        onClick={() => goEdit(data)}
                    >
                        <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon
                        variant="filled"
                        radius="md"
                        color={colors.activeLinkBgColor[9]}
                        title="Sync from remote"
                        size={30}
                        onClick={() => { deleteTestCase_(data.id) }}
                    >
                        <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Group>
        </Box>
    )
}

export default TestCaseCard