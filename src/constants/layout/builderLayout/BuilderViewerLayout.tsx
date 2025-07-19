import { ActionIcon, AppShell, Box, Group, px, ScrollArea, Stack, useMantineTheme } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { useLocation, useNavigate } from 'react-router';
import React, { JSX, PropsWithChildren, useEffect, useRef } from 'react';
import NavbarFooter from '../navbar/NavbarFooter';
import { IconCloudUpload, IconRefresh, IconArrowLeft, IconReceiptPound, IconCloudCog } from '@tabler/icons-react';
import { BuilderContext } from '@/contexts/BuilderContext';
import { dispatch } from '@/redux/store';
import { getProjectComponents } from '@/redux/slices/projectSlice/projectSliceBaseServices';
import { resetProjectsComponent } from '@/redux/slices/projectComponentsSlice/projectComponentSlice';
import { resetSelectedProjectComponent } from '@/redux/slices/projectSlice/projectSlice';
import RunProjectModal from '@/components/modals/project-modals/RunProjectModal';
import { PATH_APP } from '@/routes/paths';

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

    useEffect(() => {
        if (mainRef.current) {
            mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [pathname]);
    const handleGoBack = () => {
        navigate(PATH_APP.general.dashboard.projects);
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
                            title="Sync from remote"
                            size={30}
                        >
                            <IconRefresh style={{ width: '70%', height: '70%' }} stroke={1.5} />
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
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: "var(--mantine-spacing-md)",
                    borderColor: theme.colors.NavbarDividerColor[9],
                    borderStyle: "solid",
                    zIndex: -1
                }}>
                    <AppShell.Section grow my="md" component={ScrollArea}>
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

                    {/* {openedForRun && selectedProject && <RunProjectModal onCancel={closeForRun} onSubmit={() => { closeForRun(); navigate(PATH_APP.general.dashboard.projectLogs) }} project={selectedProject} visible={openedForRun} />} */}
                </Box>
            </AppShell.Main>
        </AppShell>
    );
};

export default BuilderViewerLayout;