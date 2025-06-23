import { ActionIcon, Card, Group, Loader, Text } from "@mantine/core";
import { IconCheck, IconClock, IconPictureInPictureFilled, IconX } from "@tabler/icons-react";
import React, { useCallback, useMemo } from "react";
import useConfirmModal from "@/hooks/modals-hooks/useConfirmModal";
import { BuilderViewerContext } from "@/contexts/BuilderViewerContext";

enum TestCaseStatus {
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    ERROR = "ERROR",
    FINISH = "FINISH",
}

interface CustomTestCaseNodeProps {
    data: {
        label: string;
        status?: TestCaseStatus;
        component: any
    };
    isConnectable: boolean;
}

const CustomTestCaseNode: React.FC<CustomTestCaseNodeProps> = ({ data, isConnectable }) => {
    const status = data.status ?? TestCaseStatus.PENDING;
    const { openConfirmModal } = useConfirmModal();
    const { selectTestCase } = React.useContext(BuilderViewerContext);

    const onSelect = useCallback(() => {
        openConfirmModal({
            title: "View Test Case",
            content: `You are about to view the test case: ${data.label}`,
            onConfirm: () => {
                selectTestCase?.(data.component)
            },
        });
    }, [data]);

    const statusIcon = useMemo(() => {
        switch (status) {
            case TestCaseStatus.PENDING:
                return (
                    <ActionIcon size={15} color="orange" onClick={onSelect}>
                        <IconClock size={8} />
                    </ActionIcon>
                );
            case TestCaseStatus.RUNNING:
                return (
                    <ActionIcon size={15} color="transparent" onClick={onSelect}>
                        <Loader size={10} color="blue" />
                    </ActionIcon>
                );
            case TestCaseStatus.ERROR:
                return (
                    <ActionIcon size={15} color="red" onClick={onSelect}>
                        <IconX size={8} />
                    </ActionIcon>
                );
            case TestCaseStatus.FINISH:
                return (
                    <ActionIcon size={15} color="green" onClick={onSelect}>
                        <IconCheck size={8} />
                    </ActionIcon>
                );
            default:
                return null;
        }
    }, [status]);

    return (
        <Card withBorder p={6} bg="transparent" style={{ width: "fit-content" }} draggable>
            <Group align="center" justify="space-between" wrap="nowrap">
                <Text size="xs" fz={8} truncate>
                    {data.label}
                </Text>
                <Group align="center" justify="center" gap={2} wrap="nowrap">
                    <ActionIcon size={15} onClick={onSelect}>
                        <IconPictureInPictureFilled size={8} />
                    </ActionIcon>
                    {statusIcon}
                </Group>
            </Group>
        </Card>
    );
};

export default CustomTestCaseNode;