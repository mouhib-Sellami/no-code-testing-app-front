import React from 'react';
import { Card, Group, Text } from '@mantine/core';
import { Component } from '@/types/models/Provider';
import { useDnD } from '@/hooks/app/useDnD';


export interface ProviderComponentProps {
    component: Component;
}

const ProviderComponent: React.FC<ProviderComponentProps> = ({ component }) => {
    const { setDnD } = useDnD();

    const onDragStart = (event: React.DragEvent, component: Component) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify({
            type: "app-" + component.type,
            name: component.name,
            component: component
        }));
        event.dataTransfer.effectAllowed = 'move';
        setDnD("app-" + component.type, component.name, component);
    };

    return (
        <Card
            withBorder
            p={6}
            px="md"
            bg="transparent"
            style={{ width: 'fit-content' }}
            onDragStart={(event) => onDragStart(event, component)}
            draggable
        >
            <Group align="center" justify="space-between">
                <Text size="sm">{component.name}</Text>
            </Group>
        </Card>
    );
};

export default ProviderComponent;