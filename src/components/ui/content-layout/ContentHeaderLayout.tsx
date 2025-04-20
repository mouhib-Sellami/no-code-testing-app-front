import { ActionIcon, Box, Grid, Group, MantineSize, Text, Title, useMantineTheme } from "@mantine/core";
import { IconBrandGithub, IconFileOrientation } from "@tabler/icons-react";
import React, { JSX } from "react";

export interface ContentHeaderLayoutProps {
    title: string,
    subTitle?: string,
    titleOrder?: 1 | 2 | 3 | 4 | 5 | 6,
    subtitleSize?: MantineSize | string,
    showDocs?: boolean,
    rowFilter?: JSX.Element | JSX.Element[] | null
}

const ContentHeaderLayout: React.FC<ContentHeaderLayoutProps> = (props) => {
    const { title, subTitle, titleOrder = 3, subtitleSize = "sm", showDocs = true, rowFilter = null } = props;
    const { colors } = useMantineTheme();

    return (
        <Box w={"100%"} mb={"xl"} p={0}>
            <Group p={0} w={"100%"} m={0} wrap="wrap" align="flex-start" justify="flex-start" style={{ flexDirection: "column", gap: 5 }}>
                <Title order={titleOrder} >{title}</Title>
                <Text c={"dimmed"} size={subtitleSize}>{subTitle}</Text>
            </Group>
            <Grid w={"100%"} p={0} mt={"lg"} m={0} align="center" justify="center" styles={{ inner: { width: "100%", margin: "0" } }}>
                <Grid.Col span={10} p={0}>
                    <Group justify="flex-start">
                        {rowFilter}
                    </Group>
                </Grid.Col>
                <Grid.Col span={2} p={0}>
                    {showDocs &&
                        <Group justify="flex-end" align="center" gap={10}>
                            <ActionIcon
                                color={colors.activeLinkBgColor[9]}
                                variant="filled"
                                size={35}
                                aria-label="github"
                                p={0}
                            >
                                <IconBrandGithub style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                            <ActionIcon
                                color={colors.activeLinkBgColor[9]}
                                variant="filled"
                                size={35}
                                aria-label="Documentation"
                                p={0}
                                aria-describedby="Docs"
                            >
                                <IconFileOrientation style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                    }
                </Grid.Col>
            </Grid>
        </Box >
    )
}

export default ContentHeaderLayout;