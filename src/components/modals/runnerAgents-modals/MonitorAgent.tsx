import React from "react";
import BaseAppModal from "../base-modal/BaseAppModal";
import { RunnerAgent } from "@/types/models/RunningAgent";
import { AppModalProps } from "../base-modal/types";
import { MQTTContext } from "@/contexts/MQTTContext";
import { Box, Center, Grid, SegmentedControl, Text } from "@mantine/core";
import { DonutChart, LineChart, BarChart } from "@mantine/charts";
import AppCard from "@/components/cards/AppCard";

export interface MonitorAgentModalProps extends AppModalProps {
    runner: RunnerAgent;
}

const MonitorAgent: React.FC<MonitorAgentModalProps> = (props) => {
    const { MQTTClient, handleSubscribe, isConnected } = React.useContext(MQTTContext);
    const [heath, setHealth] = React.useState<any>(null);
    const [value, setValue] = React.useState("Node");
    const [memoryHistory, setMemoryHistory] = React.useState<number[]>([]);
    const [threadsHistory, setThreadsHistory] = React.useState<number[]>([]);
    const [networkSentHistory, setNetworkSentHistory] = React.useState<number[]>([]);
    const [networkRecvHistory, setNetworkRecvHistory] = React.useState<number[]>([]);
    const [connectionsHistory, setConnectionsHistory] = React.useState<number[]>([]);

    const toMB = (bytes: number) => Number((bytes / (1024 * 1024)).toFixed(2));

    const SystemMemory = React.useMemo(() => {
        if (!heath) {
            return [
                { name: "Available", value: 0, color: "blue.5" },
                { name: "Used", value: 0, color: "red.5" },
                { name: "Total", value: 0, color: "green.5" },
            ];
        }

        const { available, used, total } = heath?.system?.virtual_memory || {};
        return [
            { name: "Available", value: toMB(available || 0), color: "blue.5" },
            { name: "Used", value: toMB(used || 0), color: "red.5" },
            { name: "Total", value: toMB(total || 0), color: "green.5" },
        ];
    }, [heath]);

    const SystemCpuSwap = React.useMemo(() => {
        if (!heath) {
            return [
                { metric: "CPU Usage (%)", value: 0 },
                { metric: "Swap Usage (%)", value: 0 },
            ];
        }
        return [
            { metric: "CPU Usage (%)", value: heath?.system?.cpu_percent || 0 },
            { metric: "Swap Usage (%)", value: heath?.system?.swap_memory?.percent || 0 },
        ];
    }, [heath]);

    const SystemDiskUsage = React.useMemo(() => {
        if (!heath) {
            return [
                { name: "Used", value: 0, color: "orange.5" },
                { name: "Free", value: 0, color: "cyan.5" },
            ];
        }
        const { used, free } = heath?.system?.disk_usage || {};
        return [
            { name: "Used", value: toMB(used || 0), color: "orange.5" },
            { name: "Free", value: toMB(free || 0), color: "cyan.5" },
        ];
    }, [heath]);

    const SystemNetworkHistory = React.useMemo(() => {
        return networkSentHistory.map((sent, index) => ({
            measurement: `${index + 1}`,
            bytesSent: toMB(sent),
            bytesRecv: toMB(networkRecvHistory[index] || 0),
        }));
    }, [networkSentHistory, networkRecvHistory]);

    const ProcessMemoryHistory = React.useMemo(() => {
        return memoryHistory.map((value, index) => ({
            measurement: `${index + 1}`,
            memoryPercent: value,
        }));
    }, [memoryHistory]);

    const ProcessThreadsHistory = React.useMemo(() => {
        return threadsHistory.map((value, index) => ({
            measurement: `${index + 1}`,
            threads: value,
        }));
    }, [threadsHistory]);

    const ProcessCpuMemory = React.useMemo(() => {
        if (!heath) {
            return [{ metric: "CPU Usage (%)", value: 0 }, { metric: "Memory Usage (%)", value: 0 }];
        }
        return [
            { metric: "CPU Usage (%)", value: heath?.self?.cpu_percent || 0 },
            { metric: "Memory Usage (%)", value: heath?.self?.memory_percent || 0 },
        ];
    }, [heath]);

    const ProcessMemoryInfo = React.useMemo(() => {
        if (!heath) {
            return [
                { name: "Resident Memory (RSS)", value: 0, color: "indigo.5" },
                { name: "Virtual Memory (VMS)", value: 0, color: "teal.5" },
            ];
        }
        const { rss, vms } = heath?.self?.memory_info || {};
        return [
            { name: "Resident Memory (RSS)", value: toMB(rss || 0), color: "indigo.5" },
            { name: "Virtual Memory (VMS)", value: toMB(vms || 0), color: "teal.5" },
        ];
    }, [heath]);

    const ProcessFilesConnections = React.useMemo(() => {
        if (!heath) {
            return [
                { metric: "Open Files", value: 0 },
                { metric: "Connections", value: 0 },
            ];
        }
        return [
            { metric: "Open Files", value: heath?.self?.open_files?.length || 0 },
            { metric: "Connections", value: heath?.self?.connections?.length || 0 },
        ];
    }, [heath]);

    const ProcessConnectionsHistory = React.useMemo(() => {
        return connectionsHistory.map((value, index) => ({
            measurement: `${index + 1}`,
            connections: value,
        }));
    }, [connectionsHistory]);

    const selectedRunner = React.useMemo(() => {
        return props.runner;
    }, [props]);

    React.useEffect(() => {
        if (!MQTTClient || !isConnected) return;

        handleSubscribe?.(`${selectedRunner.agent_key}_HEART_BEAT`, 0, async (topic: string, message: Buffer) => {
            const newHealth = JSON.parse(message.toString());
            setHealth(newHealth);

            setMemoryHistory((prev) => [...prev, newHealth?.self?.memory_percent || 0].slice(-20));
            setThreadsHistory((prev) => [...prev, newHealth?.self?.threads || 0].slice(-20));
            setNetworkSentHistory((prev) => [...prev, newHealth?.system?.network_io?.bytes_sent || 0].slice(-20));
            setNetworkRecvHistory((prev) => [...prev, newHealth?.system?.network_io?.bytes_recv || 0].slice(-20));
            setConnectionsHistory((prev) => [...prev, newHealth?.self?.connections?.length || 0].slice(-20));
        });
    }, [MQTTClient, isConnected, selectedRunner]);

    return (
        <BaseAppModal
            {...props}
            withCancelButton
            title="Agent HeartBeat"
            onCancel={() => props.onCancel()}
            onSubmit={() => { }}
            SubmitButtonLoading={false}
            fullScreen
        >
            <SegmentedControl data={["Node", "Process"]} value={value} onChange={setValue} />

            {value === "Node" && (
                <Box pt={"md"}>
                    <Grid grow styles={{
                        col: {
                            marginBottom: 20
                        }
                    }}>
                        <Grid.Col span={6}>
                            <AppCard title={"System Memory Usage"}>
                                <Center><DonutChart data={SystemMemory} size={250} thickness={50} paddingAngle={3} mt={10} /></Center>
                            </AppCard>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <AppCard title={"CPU & Swap Usage (%)"}>
                                <BarChart
                                    h={300}
                                    data={SystemCpuSwap}
                                    dataKey="metric"
                                    series={[{ name: "value", color: "blue.5" }]}
                                    withLegend
                                    legendProps={{ verticalAlign: "top" }}
                                    yAxisLabel="Usage (%)"
                                    xAxisLabel="Metric"
                                    tooltipProps={{ labelFormatter: (label) => label }}
                                />
                            </AppCard>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <AppCard title={"Disk Usage"}>
                                <Center><DonutChart data={SystemDiskUsage} size={250} thickness={50} paddingAngle={3} mt={10} /></Center>
                            </AppCard>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <AppCard title={"Network I/O Over Time"}>

                                <LineChart
                                    h={300}
                                    data={SystemNetworkHistory}
                                    dataKey="measurement"
                                    series={[
                                        { name: "bytesSent", color: "indigo.5" },
                                        { name: "bytesRecv", color: "teal.5" },
                                    ]}
                                    withLegend
                                    legendProps={{ verticalAlign: "top" }}
                                    yAxisLabel="Data (MB)"
                                    xAxisLabel="Measurement Interval"
                                    tooltipProps={{ labelFormatter: (label) => `Interval ${label}` }}
                                    curveType="monotone"
                                />
                            </AppCard>
                        </Grid.Col>
                    </Grid>
                </Box>
            )}

            {value === "Process" && (
                <Box pt={"md"}>
                    <Grid grow styles={{
                        col: {
                            marginBottom: 20
                        }
                    }}>
                        <Grid.Col span={6}>
                            <AppCard title={"Process CPU & Memory Usage"}>
                                <BarChart
                                    h={250}
                                    data={ProcessCpuMemory}
                                    dataKey="metric"
                                    series={[{ name: "value", color: "blue.5" }]}
                                    withLegend
                                    yAxisLabel="Usage (%)"
                                    xAxisLabel="Metric"
                                    tooltipProps={{ labelFormatter: (label) => label }}
                                />
                            </AppCard>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <AppCard title={"Process Memory Info"}>
                                <Center><DonutChart data={ProcessMemoryInfo} size={200} thickness={30} paddingAngle={3} mt={10} /></Center>
                            </AppCard>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <AppCard title={"Memory Usage Over Time"}>

                                <LineChart
                                    h={200}
                                    data={ProcessMemoryHistory}
                                    dataKey="measurement"
                                    series={[{ name: "memoryPercent", color: "blue.5" }]}
                                    withLegend
                                    legendProps={{ verticalAlign: "top" }}
                                    yAxisLabel="Memory Usage (%)"
                                    xAxisLabel="Measurement Interval"
                                    tooltipProps={{ labelFormatter: (label) => `Interval ${label}` }}
                                    curveType="monotone"
                                />
                            </AppCard>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <AppCard title={"Threads Over Time"}>
                                <LineChart
                                    h={200}
                                    data={ProcessThreadsHistory}
                                    dataKey="measurement"
                                    series={[{ name: "threads", color: "teal.5" }]}
                                    withLegend
                                    legendProps={{ verticalAlign: "top" }}
                                    yAxisLabel="Threads"
                                    xAxisLabel="Measurement Interval"
                                    tooltipProps={{ labelFormatter: (label) => `Interval ${label}` }}
                                    curveType="monotone"
                                />
                            </AppCard>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <AppCard title={"Open Files & Connections"}>
                                <BarChart
                                    h={200}
                                    data={ProcessFilesConnections}
                                    dataKey="metric"
                                    series={[{ name: "value", color: "cyan.5" }]}
                                    withLegend
                                    legendProps={{ verticalAlign: "top" }}
                                    yAxisLabel="Count"
                                    xAxisLabel="Metric"
                                    tooltipProps={{ labelFormatter: (label) => label }}
                                />
                            </AppCard>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <AppCard title={"Connections Over Time"}>
                                <LineChart
                                    h={200}
                                    data={ProcessConnectionsHistory}
                                    dataKey="measurement"
                                    series={[{ name: "connections", color: "orange.5" }]}
                                    withLegend
                                    legendProps={{ verticalAlign: "top" }}
                                    yAxisLabel="Connections"
                                    xAxisLabel="Measurement Interval"
                                    tooltipProps={{ labelFormatter: (label) => `Interval ${label}` }}
                                    curveType="monotone"
                                />
                            </AppCard>
                        </Grid.Col>
                    </Grid>
                </Box>
            )
            }
        </BaseAppModal >
    );
};

export default MonitorAgent;
