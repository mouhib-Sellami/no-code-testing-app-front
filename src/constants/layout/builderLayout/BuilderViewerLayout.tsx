import { ActionIcon, AppShell, Badge, Box, Group, Pill, px, ScrollArea, Stack, useMantineTheme } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { useLocation, useNavigate } from 'react-router';
import React, { JSX, PropsWithChildren, useEffect, useRef } from 'react';
import { IconRefresh, IconArrowLeft } from '@tabler/icons-react';
import useProjectLogs from '@/hooks/useProjectLogs';
import useConfirmModal from '@/hooks/modals-hooks/useConfirmModal';
import RunTestCaseModal from '@/components/modals/project-modals/RunTestCaseModal';
import { BuilderViewerContext } from '@/contexts/BuilderViewerContext';

export interface BuilderLayoutProps extends PropsWithChildren {
    sideBard: JSX.Element | JSX.Element[];
}

const BuilderViewerLayout: React.FC<BuilderLayoutProps> = ({ children, sideBard }) => {
    const [opened] = useDisclosure();
    const theme = useMantineTheme();
    const pinned = useHeadroom({ fixedAt: 20 });
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const mainRef = useRef<HTMLDivElement>(null);
    const { colors } = useMantineTheme();
    const { selectedProjectLogs } = useProjectLogs();
    const { openDeleteModal } = useConfirmModal();
    const [openedForRun, { open: openForRun, close: closeForRun }] = useDisclosure();
    const { resetSelectedTestCase, selectedTestCase } = React.useContext(BuilderViewerContext);

    useEffect(() => {
        if (mainRef.current) {
            mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [pathname]);

    const handleGoBack = React.useCallback(() => {
        if (selectedTestCase) {
            resetSelectedTestCase()
        } else {
            navigate(-1);
        }
    }, [selectedTestCase]);

    const getPilColor = React.useMemo(() => {
        if (!selectedProjectLogs)
            return colors.gray[9]

        if (selectedProjectLogs.is_running)
            return "orange"
        if (selectedProjectLogs.is_failed)
            return "red"
        if (selectedProjectLogs.is_finish)
            return "green"

        return colors.gray[9]
    }, [selectedProjectLogs])

    const getPilMessage = React.useMemo(() => {
        if (!selectedProjectLogs)
            return "Queued"
        if (selectedProjectLogs.is_running)
            return "Running"
        if (selectedProjectLogs.is_failed)
            return "Failed"
        if (selectedProjectLogs.is_finish)
            return "Complete"
        return "Queued"
    }, [selectedProjectLogs])


    const openModal = React.useCallback(() => {
        if (!selectedProjectLogs)
            return
        if (selectedProjectLogs.is_failed) {
            openDeleteModal({
                title: "Are you sure",
                content: "this excution contains errors ! are you sure you want to reexcute it !",
                confirmText: "Force excution",
                onConfirm: () => {
                    openForRun()
                }
            })
        } else {
            openForRun()
        }
    }, [selectedProjectLogs])
    return (
        <AppShell
            layout="alt"
            header={{ height: 60, offset: true, collapsed: !pinned }}

            padding="md"
        >
            <AppShell.Header bg={"transparent"}>
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <ActionIcon
                            variant="filled"
                            radius="md"
                            color={colors.activeLinkBgColor[9]}
                            onClick={handleGoBack}
                            title="Go Back"
                            size={30}
                        >
                            <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                    <Group gap="xs">
                        <Pill size="md" bg={getPilColor}>
                            {getPilMessage}
                        </Pill>
                        <ActionIcon
                            variant="filled"
                            radius="md"
                            color={colors.activeLinkBgColor[9]}
                            title="Sync from remote"
                            size={30}
                            onClick={openModal}
                            disabled={selectedProjectLogs && selectedProjectLogs?.is_running}
                        >
                            <IconRefresh style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>

                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Main bg={theme.colors.mainContentColor[9]} styles={{
                main: {
                    margin: 0,
                    padding: 0,
                }
            }}>
                <Box style={{
                    height: '100vh', overflow: 'auto', backgroundImage: `radial-gradient(circle at 1px 1px, rgba(186, 45, 11, 0.15) 1px, transparent 0)`,
                    backgroundSize: "20px 20px",
                }} m={0} pt={"70"} pb={10} px={"sm"}>
                    {children}
                    {openedForRun && selectedProjectLogs.project && <RunTestCaseModal onCancel={closeForRun} onSubmit={() => { closeForRun(); }} project={selectedProjectLogs.project} visible={openedForRun} />}
                </Box>
            </AppShell.Main>
        </AppShell>
    );
};

export default BuilderViewerLayout;