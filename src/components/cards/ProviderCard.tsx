import { Provider } from "@/types/models/Provider";
import { Avatar, Card, Grid, Group, Indicator, Text, Title, useMantineTheme } from "@mantine/core";
import React from "react";

export interface ProviderCardProps {
    provider: Provider,
    onSelect: (p: Provider) => void,
    selected: boolean
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onSelect, selected = false }) => {
    const { colors } = useMantineTheme();

    return (
        <Card
            w={"100%"}
            withBorder={true}
            p={"md"}
            h={"100%"}
            onClick={() => { onSelect(provider) }}
            styles={{
                root: {
                    backgroundColor: colors.mainContentColor[9],
                    borderColor: 'var(--mantine-color-dividerBorderColorDark-9)',
                    cursor: 'pointer'
                },
            }}
        >
            <Indicator disabled={!selected}>

                <Group align="center" justify="space-between">
                    <Group>

                        <Avatar name={provider.name} radius="xl" size={"2rem"} styles={{
                            placeholder: {
                                fontSize: "0.8rem"
                            }
                        }}
                            bg={"primary"} color='white' />

                        <Title order={5}> {provider.name}</Title>
                    </Group>
                    <Text size="xs" c={"dimmed"}>V {provider.version}</Text>
                </Group>

            </Indicator>
        </Card>
    )
}

export default ProviderCard;