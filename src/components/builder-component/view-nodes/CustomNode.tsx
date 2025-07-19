
import { Card, Group, Text } from "@mantine/core";
import React from "react";

const CustomNode: React.FC<any> = (props) => {
    const data = React.useMemo(() => {
        return props.data
    }, [props])

    return (
        <>
            <Card
                withBorder
                p={6}
                bg="transparent"
                style={{ width: 'fit-content' }}
                draggable
            >
                <Group align="center" justify="space-between">
                    <Text size="xs" fz={8}>{data.label}</Text>
                    <Group align="center" justify="center" gap={5}>
                    </Group>
                </Group>
            </Card>
        </>
    )
}

export default CustomNode;