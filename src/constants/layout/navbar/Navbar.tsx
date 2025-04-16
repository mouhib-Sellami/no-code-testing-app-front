import { Box, Center, Divider, ScrollArea, } from "@mantine/core";
import classes from "@/components/navbar-components/Navbar.module.css";
import { NavItem } from "@/components/navbar-components/NavItem";
import { NavLinksGroup } from "@/components/navbar-components/NavLinksGroup";
import PermissionGuard from "@/guards/PermissionGuard";

interface Props {
    data: NavItem[];
    hidden?: boolean;
}

export function Navbar({ data }: Props) {

    const links = data.filter(elm => elm.isVisible).map((item, idx) => (
        <PermissionGuard permission={item.permission || "PUBLIC"}>
            <Box key={idx} p={0} m={0} bg={"transparent"}>
                <NavLinksGroup {...item} />
                <Center>
                    <Divider
                        styles={{
                            root: {
                                borderColor: "var(--mantine-color-NavbarDividerColor-9) !important"
                            }
                        }}
                        w={"95%"}
                        size="xs"
                    />
                </Center>
            </Box>
        </PermissionGuard>
    ));

    return (
        <>
            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>
        </>
    );
}
