import React from "react";
import { Card, Divider, Drawer, Fieldset, Group, Pill, ScrollArea, Stack, Text, Textarea, TextInput, Title, useMantineTheme } from "@mantine/core";
import { DateInput } from '@mantine/dates';
import { Project } from "@/types/models/Project";

export interface ViewProjectDetailsProps {
    project: Project,
    onClose: () => void,
    isVisible: boolean
}

const ViewProjectDetails: React.FC<ViewProjectDetailsProps> = ({ project, onClose, isVisible }) => {
    const { colors } = useMantineTheme();
    return (
        <Drawer opened={isVisible} onClose={onClose} title={"Project details"} transitionProps={{ duration: 150, timingFunction: 'linear' }}>
            <Stack
                w={"100%"} gap={"md"} >
                <Group align="center" justify="space-between">
                    <Title order={4}>{project.name}</Title>
                    <Pill>{project.status}</Pill>
                </Group>
                <Group align="flex-start" justify="flex-start" style={{ flexDirection: "column" }}>
                    <Card withBorder p={6} px={"md"} bg={"transparent"} style={{ width: "fit-content" }}>
                        <Group align="center" justify="space-between">
                            <Text size='sm'>{project.provider.name}</Text>
                            <Text size='xs' c={"dimmed"}>V {project.provider.version}</Text>
                        </Group>
                    </Card>
                    <Text size="xs" c={"dimmed"}>Last update : {new Date(project.updated_at).toLocaleString()}</Text>
                </Group>
            </Stack>
            <Divider my={"md"} />
            <ScrollArea>
                <Stack gap={"md"}>
                    <Fieldset legend="General" bg={colors.mainContentColor[9]}>
                        <Stack w={"100%"} gap={"sm"}>
                            <TextInput label="Managed by" disabled value={project.managed_by.first_name + " " + project.managed_by.last_name} />
                            <TextInput label="Provider" disabled value={project.provider.name} />
                            <Textarea label="Description" rows={3} disabled value={project.description} />
                        </Stack>
                    </Fieldset>
                    <Fieldset legend="Collaborators" bg={colors.mainContentColor[9]}>
                        <Stack w={"100%"} gap={"sm"}>
                            {project.members.map((elm, idx) => {
                                return <TextInput key={idx} disabled value={elm.first_name + " " + elm.last_name} />
                            })}
                        </Stack>
                    </Fieldset>
                    <Fieldset legend="Interaction" bg={colors.mainContentColor[9]}>
                        <DateInput label="Created at" disabled value={new Date(project.created_at)} valueFormat="YYYY-MM-DD" />
                        <DateInput label="Last interaction at" disabled value={new Date(project.updated_at)} valueFormat="YYYY-MM-DD" />
                    </Fieldset>
                </Stack>
            </ScrollArea>
        </Drawer >
    )
}

export default ViewProjectDetails;
