import React from "react";
import DataTableConfig from "@/config/DataTableConfig";
import { Box, Group, px, TextInput } from "@mantine/core";
import AppDataTable from "../base-dataTable/AppDataTable";
import { AppDataTableProps } from "../base-dataTable/types";
import { RunnerAgent } from "@/types/models/RunningAgent";
import useConfirmModal from "@/hooks/modals-hooks/useConfirmModal";
import { IconBackspace, IconHeartRateMonitor, IconPencil, IconSearch } from "@tabler/icons-react";
import { dispatch } from "@/redux/store";
import { deleteRunnerAgent } from "@/redux/slices/runnerAgentSlice/runnerAgentSliceBaseServices";
import { onShowNotification } from "@/redux/slices/notificationSlice/notificationSlice";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import RunnerAgentDataTableConfig from "./RunnerAgentDataTableConfig";
import { notifications } from "@mantine/notifications";
import { IconRocket } from "@tabler/icons-react";
import EditRunnerAgentModal from "@/components/modals/runnerAgents-modals/EditRunnerAgentModal";
import MonitorAgent from "@/components/modals/runnerAgents-modals/MonitorAgent";

const RunnerAgentDataTable: React.FC<AppDataTableProps<RunnerAgent>> = ({
    records,
    isLoading,
    count,
    onQuerySearch,
    onPageChanges,
    onChange,
    ...item
}) => {
    const [page, setPage] = React.useState(1);
    const [RECORDS, setRECORDS] = React.useState<Array<RunnerAgent>>(records);
    const { openDeleteModal } = useConfirmModal();
    const [query, setQuery] = React.useState("");
    const [debouncedQuery] = useDebouncedValue(query, 200);
    const [openForView, { open: openView, close: closeView }] = useDisclosure(false);
    const [openForUpdate, { open: openUpdate, close: closeUpdate }] = useDisclosure(false);
    const [selected, setSelected] = React.useState<RunnerAgent | null>(null);

    React.useEffect(() => {
        setRECORDS(records);
    }, [records]);

    React.useEffect(() => {
        onQuerySearch?.(debouncedQuery);
    }, [debouncedQuery]);

    React.useEffect(() => {
        onPageChanges?.(page);
    }, [page]);

    const deleteRunningAgent = React.useCallback(
        async (id: number) => {
            const res = await dispatch(deleteRunnerAgent(id));
            if (res.meta.requestStatus === "fulfilled") {
                notifications.show({
                    title: "Agent Retired! 🚀",
                    message: "This agent has been sent to the cosmic scrapyard! 🌌",
                    color: "teal",
                    icon: <IconRocket size={20} />,
                });
            } else {
                dispatch(
                    onShowNotification({
                        content: "Cannot decommission this agent! It might be on a critical mission! 🛑",
                        level: "ERROR",
                        type: "runner_agent",
                        render: "NOTIFICATION",
                    })
                );
            }
            onChange?.();
        },
        []
    );

    const { COLUMNS } = RunnerAgentDataTableConfig({
        actions: [
            {
                icon: IconBackspace,
                color: "gray",
                action(record) {
                    openDeleteModal({
                        content: `Are you sure you want to decommission agent "${record?.name}"? This action cannot be undone! 🚨`,
                        onConfirm: async () => {
                            await deleteRunningAgent(record.id);
                        },
                        onCancel: () => { },
                        title: "Decommission Agent 🚀",
                        confirmText: "Decommission",
                    });
                },
                permission: "can_delete_runner_agent",
            },
            {
                icon: IconPencil,
                color: "gray",
                action(record: RunnerAgent) {
                    setSelected(record);
                    openUpdate();
                },
                permission: "can_change_runner_agent"
            },
            {
                icon: IconHeartRateMonitor,
                color: "gray",
                action(record: RunnerAgent) {
                    setSelected(record);
                    openView();
                },
                permission: "can_view_runner_agent"
            },
        ],
    });

    return (
        <Box p={0} m={0}>
            <Group style={{ flexDirection: "column" }} align="flex-end" w="100%" p="md">
                <TextInput
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    placeholder="Search for an Agent"
                    withErrorStyles={false}
                    leftSection={<IconSearch size={px("1.3rem")} />}
                />
            </Group>
            <AppDataTable
                isLoading={isLoading}
                columns={COLUMNS}
                pageSize={DataTableConfig.MAX_PAGE_SIZE}
                total={count}
                records={RECORDS}
                page={page}
                {...item}
                onPageChanges={(p) => setPage(p)}
            />
            {openForUpdate && selected && <EditRunnerAgentModal runner={selected} visible={openForUpdate} onCancel={closeUpdate} onSubmit={() => {
                closeUpdate()
                onChange?.()
            }} />}
            {openForView && selected && <MonitorAgent runner={selected} visible={openForView} onCancel={closeView} onSubmit={() => {
                closeView()
            }} />}

        </Box>
    );
};

export default RunnerAgentDataTable;