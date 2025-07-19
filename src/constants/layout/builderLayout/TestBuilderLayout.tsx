import { ActionIcon, AppShell, Box, Group, px, Stack, useMantineTheme } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { useLocation, useNavigate } from 'react-router';
import React, { JSX, PropsWithChildren, useEffect, useRef } from 'react';
import NavbarFooter from '../navbar/NavbarFooter';
import { IconCloudUpload, IconRefresh, IconArrowLeft, IconCloudCog } from '@tabler/icons-react';
import { dispatch } from '@/redux/store';
import { WorkFlowContext } from '@/contexts/WorkflowContext';
import { getTestFlowComponents } from '@/redux/slices/projectSlice/projectTestFlowSliceBaseServices';
import RunTestFlowModal from '@/components/modals/project-modals/RunTestFlowModal';

export interface BuilderLayoutProps extends PropsWithChildren {
    sideBard: JSX.Element | JSX.Element[];
}

const TestBuilderLayout: React.FC<BuilderLayoutProps> = ({ children, sideBard }) => {
    const [opened] = useDisclosure();
    const theme = useMantineTheme();
    const pinned = useHeadroom({ fixedAt: 20 });
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const mainRef = useRef<HTMLDivElement>(null);
    const { colors } = useMantineTheme();
    const { isSyncing, selectedFlow } = React.useContext(WorkFlowContext);
    const [openedForRun, { open: openForRun, close: closeForRun }] = useDisclosure();

    useEffect(() => {
        if (mainRef.current) {
            mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [pathname]);

    const resync = React.useCallback(async () => {
        if (!selectedFlow)
            return
        await dispatch(getTestFlowComponents(selectedFlow.id))
    }, [selectedFlow])

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <AppShell
            layout="alt"
            header={{ height: 60, offset: true, collapsed: !pinned }}
            navbar={{
                width: px("20rem"),
                breakpoint: 'sm',
                collapsed: { mobile: !opened }
            }}
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
                        <ActionIcon
                            variant="filled"
                            radius="md"
                            color={colors.activeLinkBgColor[9]}
                            title="Run Project"
                            size={30}
                            onClick={openForRun}
                        >
                            <IconCloudCog style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon
                            variant="filled"
                            radius="md"
                            color={colors.activeLinkBgColor[9]}
                            onClick={resync}
                            title="Sync from remote"
                            size={30}
                        >
                            <IconRefresh style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon
                            variant="filled"
                            radius="md"
                            color={colors.activeLinkBgColor[9]}
                            title="Sync to remote"
                            loading={isSyncing}
                            size={30}
                        >
                            <IconCloudUpload style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar
                p={5}
                withBorder={false}
                bg={theme.colors.sideNavBar[9]}
                styles={{
                    navbar: { zIndex: 2 }
                }}
            >
                <Stack style={{
                    height: "100%",
                    overflow: "hidden",
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: "var(--mantine-spacing-md)",
                    borderColor: theme.colors.NavbarDividerColor[9],
                    borderStyle: "solid",
                    zIndex: -1
                }}>
                    <AppShell.Section grow my="md">
                        {sideBard}
                    </AppShell.Section>
                    <AppShell.Section>
                        <NavbarFooter />
                    </AppShell.Section>
                </Stack>
            </AppShell.Navbar>

            <AppShell.Main bg={theme.colors.mainContentColor[9]} styles={{
                main: {
                    margin: 0,
                    padding: 0,
                    paddingLeft: px("20.3rem"),
                }
            }}>
                <Box style={{
                    height: '100vh', overflow: 'auto', backgroundImage: `radial-gradient(circle at 1px 1px, rgba(186, 45, 11, 0.15) 1px, transparent 0)`,
                    backgroundSize: "20px 20px",
                }} m={0} pt={"70"} pb={10} px={"sm"}>
                    {children}
                    {openedForRun && selectedFlow && <RunTestFlowModal onCancel={closeForRun} onSubmit={() => { closeForRun(); }} flow={selectedFlow} visible={openedForRun} />}
                </Box>
            </AppShell.Main>
        </AppShell>
    );
};

export default TestBuilderLayout;