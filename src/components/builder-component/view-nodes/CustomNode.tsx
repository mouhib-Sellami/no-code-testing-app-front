import { ActionIcon, Card, Group, Loader, Text } from "@mantine/core";
import { IconCheck, IconClock, IconX } from "@tabler/icons-react";
import { Handle, Position } from "@xyflow/react";
import React from "react";

const CustomNode: React.FC<any> = ({ data, isConnectable }) => {
    const status = data.status || "PENDING";

    const getStatus = React.useMemo(() => {
        switch (status) {
            case "PENDING":
                return (
                    <ActionIcon size={15} color="orange">
                        <IconClock size={8} />
                    </ActionIcon>
                );
            case "RUNNING":
                return (
                    <ActionIcon size={15} color="transparent">
                        <Loader size={10} color="blue" />
                    </ActionIcon>
                );
            case "ERROR":
                return (
                    <ActionIcon size={15} color="red">
                        <IconX size={8} />
                    </ActionIcon>
                );
            case "FINISH":
                return (
                    <ActionIcon size={15} color="green">
                        <IconCheck size={8} />
                    </ActionIcon>
                );
            default:
                return null;
        }
    }, [status]);

    return (
        <>
            <Handle
                type="target"
                id="run_after_target"
                position={Position.Left}
                onConnect={(params) => console.log("handle onConnect", params)}
                isConnectable={isConnectable}
            />
            <Card withBorder p={6} bg="transparent" style={{ width: "fit-content" }} draggable>
                <Group align="center" justify="space-between">
                    <Text size="xs" fz={8}>
                        {data.label}
                    </Text>
                    {getStatus}
                </Group>
            </Card>
            <Handle
                type="source"
                id="run_after_source"
                position={Position.Right}
                onConnect={(params) => console.log("handle onConnect", params)}
                isConnectable={isConnectable}
            />
        </>
    );
};

export default CustomNode;