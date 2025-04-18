import { AppShell, px, ScrollArea, useMantineTheme } from '@mantine/core';
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
            mainRef.current.scrollTo({ top: 0, behavior: "instant" });
        }
    }, [pathname]);
    return (
        <AppShell

            layout="alt"
            header={{ height: 0, offset: true, collapsed: !pinned }}
            navbar={{
                width: px("18rem"),
                breakpoint: 'sm',
                collapsed: { mobile: !opened }
            }}
            padding="md"
        >
            <AppShell.Navbar
                p={{ xl: "sm", lg: "xs", md: "xs" }}
                m={5}
                h={"98%"}
                withBorder={true}
                bg={theme.colors.sideNavBar[9]}
                styles={{
                    navbar: {
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: "var(--mantine-spacing-md)",
                        borderColor: theme.colors.NavbarDividerColor[9],
                        borderStyle: "solid",
                        zIndex: 2
                    }
                }}
            >
                <AppShell.Section>
                    <NavbarHeader />
                </AppShell.Section>
                <AppShell.Section grow my="md" component={ScrollArea}>
                    <Navbar data={navLinks} hidden={!opened} />
                </AppShell.Section>
                <AppShell.Section>
                    <NavbarFooter />
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main bg={theme.colors.mainContentColor[9]} m={0} py={"md"} ref={mainRef} style={{ overflowY: "auto", height: "100vh" }} pos={"relative"}>
                <Outlet />
            </AppShell.Main>
        </AppShell >
    );
}