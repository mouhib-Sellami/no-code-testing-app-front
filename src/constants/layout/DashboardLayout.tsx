import { AppShell, Box, px, ScrollArea, Stack, useMantineTheme } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { Outlet, useLocation } from 'react-router';
import { Navbar } from './navbar/Navbar';
import NavbarFooter from './navbar/NavbarFooter';
import NavbarHeader from './navbar/NavbarHeader';
import { useEffect, useRef } from 'react';
import { navLinks } from './navbar/navLinks';

export function DashboardLayout() {
    const [opened] = useDisclosure();
    const theme = useMantineTheme();
    const pinned = useHeadroom({ fixedAt: 20 });
    const { pathname } = useLocation();
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mainRef.current) {
            mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [pathname]);

    return (
        <AppShell
            layout="alt"
            header={{ height: 0, offset: true, collapsed: !pinned }}
            navbar={{
                width: px("16.3rem"),
                breakpoint: 'sm',
                collapsed: { mobile: !opened }
            }}
            padding="md"
        >
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
                    <AppShell.Section>
                        <NavbarHeader />
                    </AppShell.Section>
                    <AppShell.Section grow my="md" component={ScrollArea}>
                        <Navbar data={navLinks} hidden={!opened} />
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
                    paddingLeft: px("16.3rem"),
                }
            }}>
                <Box style={{
                    height: '100vh', overflow: 'auto', backgroundImage: `radial-gradient(circle at 1px 1px, rgba(186, 45, 11, 0.15) 1px, transparent 0)`,
                    backgroundSize: "20px 20px",
                }} m={0} pt={"xl"} px={"sm"}>
                    <Outlet />
                </Box>
            </AppShell.Main>
        </AppShell >
    );
}