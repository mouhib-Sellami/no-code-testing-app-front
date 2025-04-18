import { Box, Grid, Group, MantineSize, Text, Title } from "@mantine/core";
import React, { JSX } from "react";

export interface ContentHeaderLayoutProps {
    title: string,
    subTitle?: string,
    titleOrder?: 1 | 2 | 3 | 4 | 5 | 6,
    subtitleSize?: MantineSize | string,
    showAssistance?: boolean,
    rowFilter?: JSX.Element | JSX.Element[] | null
}

const ContentHeaderLayout: React.FC<ContentHeaderLayoutProps> = (props) => {
    const { title, subTitle, titleOrder = 3, subtitleSize = "sm", showAssistance = true, rowFilter = null } = props;
    return (
        <Box w={"100%"}>
            <Group p={0} m={0} wrap="wrap" align="flex-start" justify="flex-start" style={{ flexDirection: "column", gap: 5 }}>
                <Title order={titleOrder} >{title}</Title>
                <Text c={"dimmed"} size={subtitleSize}>{subTitle}</Text>
            </Group>
            {showAssistance && <Grid w={"100%"} p={0} mt={"xs"}>
                <Grid.Col span={10}>
                    <Group justify="flex-start">
                        {rowFilter}
                    </Group>
                </Grid.Col>
                <Grid.Col span={2}>
                    <Group justify="flex-end">
                        docs goes here
                    </Group>
                </Grid.Col>
            </Grid>
            }
        </Box >
    )
}

export default ContentHeaderLayout;