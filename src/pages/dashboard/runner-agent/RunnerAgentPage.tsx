import React from "react";
import { ActionIcon, Group, Title, Text, Badge, Tooltip } from "@mantine/core";
import { IconPlus, IconRefresh } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import AppCard from "@/components/cards/AppCard";
import PageContentLayout from "@/components/ui/content-layout/PageContentLayout";
import PermissionGuard from "@/guards/PermissionGuard";
import usePagination from "@/hooks/app/usePagination";
import useRunners from "@/hooks/useRunners";
import { fetchRunnerAgents } from "@/redux/slices/runnerAgentSlice/runnerAgentSliceBaseServices";
import RunnerAgentDataTable from "@/components/data-table/runner-agent-datatable/RunnerAgentDataTable";
import { modals } from "@mantine/modals";
import CreateRunnerAgentModal from "@/components/modals/runnerAgents-modals/CreateRunnerAgentModal";

const RunnerAgentPage: React.FC = () => {
    const RUNNERS_STATES = useRunners();
    const [opened, { open, close }] = useDisclosure(false);
    const { onPageChange, onSearch, fetchData } = usePagination(fetchRunnerAgents);

    const activeRunnerCounts = React.useMemo(() => {
        if (!RUNNERS_STATES.runners)
            return 0
        return RUNNERS_STATES.runners.filter(elm => elm.status.toLowerCase() == "active").length
    }, [RUNNERS_STATES.runners])

    const handleRefresh = () => {
        modals.openConfirmModal({
            title: "🔄 Refresh Runners?",
            children: (
                <Text size="sm">
                    Ready to reload the CI grid? This will fetch the latest runner statuses! 🛠️
                </Text>
            ),
            labels: { confirm: "Refresh Now", cancel: "Hold Off" },
            confirmProps: { color: "teal" },
            onConfirm: () => fetchData(),
        });
    };

    return (
        <PageContentLayout title="CI Runner Command Center 🚀">
            <AppCard
                withoutPadding={true}
                title={
                    <Group align="center" justify="space-between" w="100%">
                        <Group>
                            <Title order={5}>
                                Pipeline Sorcerers 🧙‍♂️
                            </Title>
                            <Badge color="blue" variant="light">
                                {activeRunnerCounts} Active Runners
                            </Badge>
                        </Group>
                        <Group gap="xs">
                            <PermissionGuard permission="can_create_runner_agent">
                                <Tooltip label="Add a new CI Runner">
                                    <ActionIcon
                                        onClick={open}
                                        aria-label="Add new runner"
                                        variant="filled"
                                    >
                                        <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
                                    </ActionIcon>
                                </Tooltip>
                            </PermissionGuard>
                            <Tooltip label="Refresh Runner Status">
                                <ActionIcon
                                    onClick={handleRefresh}
                                    variant="outline"
                                    color="gray"
                                    aria-label="Refresh runners"
                                >
                                    <IconRefresh style={{ width: "70%", height: "70%" }} stroke={1.5} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    </Group>
                }
                permission="can_view_all_runner_agent"
            >
                <RunnerAgentDataTable
                    onChange={fetchData}
                    height={500}
                    onPageChanges={onPageChange}
                    onQuerySearch={onSearch}
                    count={RUNNERS_STATES.count}
                    records={RUNNERS_STATES.runners}
                    isLoading={RUNNERS_STATES.isLoading}
                />
            </AppCard>
            {opened && <CreateRunnerAgentModal visible={opened} onCancel={close} onSubmit={() => { close(); fetchData() }} />}
        </PageContentLayout>
    );
};

export default RunnerAgentPage;