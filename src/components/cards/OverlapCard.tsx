import CustomLoadingOverlay from "@/components/custom-loading/CustomLoadingOverlay";
import { Box, Card, useMantineTheme } from "@mantine/core";
import React from "react";
import CardHeaderSection from "./CardHeaderSection";
import { AppChartCardProps } from "./types";

const OverlapCard: React.FC<AppChartCardProps> = (props) => {
    const { colors } = useMantineTheme();
    const { children, withBorder = true, withoutPadding, contentHeader, isLoading, ...other } = props;

    return (
        <Box
            p={2}
            style={{
                background: colors.activeLinkBgColor[9],
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}

        >
            <CardHeaderSection {...other} />
            <Card>
                <Card.Section style={{ background: colors.sideNavBar[9], borderRadius: 8 }} pos={"relative"}>
                    <Box w={"100%"} h={"100%"} p={!withoutPadding ? "md" : 0} hidden={!contentHeader}>
                        {contentHeader}
                    </Box>
                    <Box w={"100%"} h={"100%"} p={!withoutPadding ? "md" : 0} pos={"relative"}>
                        {isLoading && <CustomLoadingOverlay />}
                        {children}
                    </Box>
                </Card.Section>
            </Card>
        </Box>
    )
}
export default OverlapCard;