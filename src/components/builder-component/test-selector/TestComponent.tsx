import React from 'react';
import { Card, Group, Text } from '@mantine/core';
import { TestCase } from '@/types/models/TestCase';
import { useTestCaseDnD } from '@/hooks/app/useTestCaseDnD';


export interface TestComponentProps {
    testCase: TestCase;
}

const TestComponent: React.FC<TestComponentProps> = ({ testCase }) => {
    const { setDnD } = useTestCaseDnD();

    const onDragStart = (event: React.DragEvent, testCase: TestCase) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify({
            type: "app-" + testCase.type,
            name: testCase.name,
            component: testCase
        }));
        event.dataTransfer.effectAllowed = 'move';
        setDnD("app-" + testCase.type, testCase.name, testCase);
    };

    return (
        <Card
            withBorder
            p={6}
            px="md"
            bg="transparent"
            style={{ width: 'fit-content' }}
            onDragStart={(event) => onDragStart(event, testCase)}
            draggable
        >
            <Group align="center" justify="space-between">
                <Text size="sm">{testCase.name}</Text>
            </Group>
        </Card>
    );
};

export default TestComponent;