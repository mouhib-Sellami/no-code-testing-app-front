import { BuilderContext } from "@/contexts/BuilderContext";
import { Accordion, SimpleGrid, Title, useMantineTheme } from "@mantine/core";
import React from "react";
import ProviderComponent from "./ProviderComponent";

export interface ProviderComponentSelectorProps { }

const ProviderComponentSelector: React.FC<ProviderComponentSelectorProps> = ({ }) => {
    const { selectedProvider } = React.useContext(BuilderContext);
    const { colors } = useMantineTheme();

    const categories = React.useMemo(() => {
        if (!selectedProvider) return [];
        return selectedProvider.categories;
    }, [selectedProvider]);

    const items = categories.map((item) => (
        <Accordion.Item key={item.id} value={item.id.toString()}>
            <Accordion.Control
                style={{
                    borderRadius: 8,
                    '&:hover': {
                        backgroundColor: colors.activeLinkBgColor[9],
                    },
                }}
                my={5}
            >
                {item.name}
            </Accordion.Control>
            <Accordion.Panel>
                <SimpleGrid cols={2}>
                    {item.components.map((elm, idx) => (
                        <ProviderComponent key={idx} component={elm} />
                    ))}
                </SimpleGrid>
            </Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <>
            <Title order={4} pb={"md"}>
                {selectedProvider.name}
            </Title>
            <Accordion
                styles={{

                    item: {
                        border: 'none',
                        '&:not(:last-child)': {
                            borderBottom: `1px solid ${colors.activeLinkBgColor[2]}`,
                        },
                    },
                    control: {
                        '&:hover': {
                            backgroundColor: colors.activeLinkBgColor[0],
                        },
                    },
                }}
            >
                {items}
            </Accordion>
        </>
    );
};

export default ProviderComponentSelector;