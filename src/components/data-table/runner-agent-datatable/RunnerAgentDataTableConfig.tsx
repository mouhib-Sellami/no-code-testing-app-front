import React from "react";
import { DataTableColumn } from "mantine-datatable";
import { ActionIcon, Group, Pill, Text, useMantineTheme } from "@mantine/core";
import { DataTableActions } from "../base-dataTable/types";
import useDataTableConfig from "@/hooks/app/useDataTableConfig";
import { IconCopy } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useClipboard } from "@mantine/hooks";
import { RunnerAgent } from "@/types/models/RunningAgent";

const RunnerAgentDataTableConfig = (props: DataTableActions<RunnerAgent>) => {
    const { generateActions, PAGE_SIZE } = useDataTableConfig();
    const theme = useMantineTheme();
    const clipboard = useClipboard({ timeout: 500 });

    const ACTIONS = React.useMemo(() => {
        return props.actions
    }, [props])

    const ENVIRONMENT_EMOJIS: Record<string, string> = React.useMemo(() => ({
        Local: "🖥️",
        Cloud: "☁️",
        Docker: "🐳",
    }), []);

    const maskAgentKey = (key: string) => {
        if (!key || key.length < 6) return "********";
        return `${key.slice(0, 3)}*****${key.slice(-3)}`;
    };

    const handleCopy = (key: string) => {
        clipboard.copy(key)
        notifications.show({
            message: "Agent key copied to clipboard",
            color: "blue",
        });
    };

    const BASE_COLUMNS: Array<DataTableColumn> = React.useMemo(() => {
        return [
            {
                accessor: "id",
                title: "#",
                width: "5%",
                textAlign: "center",
                render(_, index) {
                    return (
                        index + 1
                    )
                }
            },
            {
                accessor: "name",
                title: "Name",
                width: "10%"
            },
            {
                accessor: "host_machine_name",
                title: "Host machine",
                width: "10%"
            },
            {
                accessor: "host_machine_ip",
                title: "Host IP",
                width: "10%",
                render: (record: any) => (
                    <Pill>{record.host_machine_ip}</Pill>
                )
            },
            {
                accessor: "agent_key",
                title: "Agent Key",
                width: "5%",
                render: (record: any) => (
                    <Group gap="xs" wrap="nowrap">
                        <Text size="sm">{maskAgentKey(record.agent_key)}</Text>
                        <ActionIcon
                            variant="subtle"
                            color={theme.colors.gray[6]}
                            onClick={() => handleCopy(record.agent_key)}
                            title="Copy agent key"
                        >
                            <IconCopy size={16} />
                        </ActionIcon>
                    </Group>
                )
            },
            {
                accessor: "status",
                title: "Status",
                width: "5%",
                render: (record: any) => (
                    <Pill>{record.status}</Pill>
                )
            },
            {
                accessor: "environment",
                title: "Environment 🏠",
                width: "5%",
                render: (record: any) => (
                    <Pill>
                        {ENVIRONMENT_EMOJIS[record.environment]} {record.environment}
                    </Pill>
                ),
            },
            {
                accessor: "last_heartbeat",
                title: "Last Ping ⏰",
                width: "10%",
                render: (record: any) => (
                    <Text size="sm">
                        {record.last_heartbeat
                            ? new Date(record.last_heartbeat).toLocaleString()
                            : "No pings yet!"}
                    </Text>
                ),
            },
        ]
    }, [props, theme])

    const COLUMNS = React.useMemo(() => {
        if (ACTIONS && ACTIONS.length > 0) {
            const actions = generateActions(ACTIONS);
            if (actions) {
                if (props.order != null) {
                    BASE_COLUMNS.splice(props.order - 1, 0, actions as DataTableColumn)
                } else {
                    BASE_COLUMNS.push(actions as DataTableColumn)
                }
            }
        }
        return BASE_COLUMNS
    }, [props, ACTIONS, BASE_COLUMNS])

    return {
        COLUMNS,
        PAGE_SIZE
    }
}

export default RunnerAgentDataTableConfig;