
import {
    Collapse,
    Group,
    Text,
    ThemeIcon,
    UnstyledButton,
    useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import classes from "./NavLinksGroup.module.css";
import { Link, useLocation } from "react-router-dom";
import AppNavLink from "./AppNavLink";
import { LinksGroupProps } from "./NavItem";


export function NavLinksGroup({
    icon: Icon,
    label,
    link,
    initiallyOpened,
    links,
    isVisible
}: LinksGroupProps) {
    const { pathname } = useLocation();
    const theme = useMantineTheme();

    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);

    React.useEffect(() => {
        autoOpenNav()
    }, [pathname, link])

    const autoOpenNav = React.useCallback(() => {
        if (!hasLinks)
            return

        const check = links.findIndex(elm => elm.link === pathname);
        setOpened(check != -1);
    }, [pathname, links, hasLinks])

    const items = (hasLinks ? links : []).map((link, index) => {
        if (link?.isVisible != false)
            return (
                <Group
                    key={index}
                    p={0}
                    bg={link.link == pathname ? theme.colors.activeLinkBgColor[0] : ""}
                    style={{
                        borderRadius: 6,
                    }}
                    m={0}
                >

                    <Link
                        to={link.link}
                        className={`${classes.link} ${link.link === pathname && classes.activeLink}`}
                    >
                        <Group align="center" justify="center" wrap="nowrap" p={0} m={0}>
                            <ThemeIcon variant="transparent" size={20}>
                                <link.icon size="1.3rem" color={theme.colors.sideNavBarLinksColor[0]} />
                            </ThemeIcon>
                            <Text className={`${classes.controlLink}`} fz={{ xl: 14, lg: 12, md: 10 }}>
                                {link.label}
                            </Text>
                        </Group>
                    </Link>
                </Group>
            );
    });

    return (
        <>
            {isVisible ?
                <>
                    {
                        link ? (
                            <Link
                                to={link}
                                className={`${classes.control} ${link === pathname && classes.activeControl}`}
                            >
                                <AppNavLink Icon={Icon} active={link === pathname} hasLinks={false} label={label} opened={false} />
                            </Link >
                        ) : (
                            <UnstyledButton
                                onClick={() => {
                                    if (hasLinks) {
                                        setOpened((o) => !o);
                                        return;
                                    }
                                }}
                                className={classes.control}
                            >
                                <AppNavLink Icon={Icon} active={link === pathname} hasLinks={hasLinks} label={label} opened={opened} />
                            </UnstyledButton>
                        )
                    }
                    {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
                </>
                : null}
        </>
    );
}
