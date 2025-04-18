import { JSX } from "react";
import { Box, Card, CardProps, useMantineTheme } from "@mantine/core";
import React, { PropsWithChildren } from "react";
import CardHeaderSection from "./CardHeaderSection";
import PermissionGuardAlert from "@/guards/PermissionGuardAlert";

export interface AppCardProps extends PropsWithChildren, CardProps {
    title: string | JSX.Element,
    subTitle?: string,
    withBorder?: boolean,
    permission?: string,
    withoutPadding?: boolean,
    contentHeader?: JSX.Element,
}

const AppCard: React.FC<AppCardProps> = (props) => {
    const { children, withBorder = true, permission = "PUBLIC", withoutPadding, contentHeader, ...other } = props;
    const { colors } = useMantineTheme();

    return (
        <Card
            w={"100%"}
            withBorder={withBorder}
            p={0}
            h={"100%"}
            styles={{
                root: {
                    backgroundColor: colors.mainContentColor[9],
                    borderColor: 'var(--mantine-color-dividerBorderColorDark-9)'
                },
            }}
        >
            <CardHeaderSection {...other} />
            <Box w={"100%"} h={"100%"} p={!withoutPadding ? "md" : 0} hidden={!contentHeader}>
                {contentHeader}
            </Box>
            <Box w={"100%"} h={"100%"}>
                <PermissionGuardAlert permission={permission}>
                    {children}
                </PermissionGuardAlert>
            </Box>
        </Card>
    )
}

export default AppCard;