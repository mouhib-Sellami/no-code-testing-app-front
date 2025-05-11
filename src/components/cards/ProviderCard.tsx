import { Provider } from "@/types/models/Provider";
import { Avatar, Card, Grid, Group, Text, useMantineTheme } from "@mantine/core";
import React from "react";

export interface ProviderCardProps {
    provider: Provider
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
    const { colors } = useMantineTheme();

    return (
        <Card
            w={"100%"}
            withBorder={true}
            p={"md"}
            h={"100%"}
            styles={{
                root: {
                    backgroundColor: colors.mainContentColor[9],
                    borderColor: 'var(--mantine-color-dividerBorderColorDark-9)'
                },
            }}
        >
            <Group align="center" justify="space-between">
                <Avatar name={provider.name} radius="xl" size={"2rem"} styles={{
                    placeholder: {
                        fontSize: "0.8rem"
                    }
                }}
                    bg={"primary"} color='white' />

                {provider.name}
                <Text size="sm" c={"dimmed"}>V {provider.version}</Text>
            </Group>

        </Card>
    )
}

export default ProviderCard;