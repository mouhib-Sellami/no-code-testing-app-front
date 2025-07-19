import React from "react";
import { Card, Drawer, Fieldset, Group, ScrollArea, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import { ProjectComponent } from "@/types/models/ProjectComponent";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { useForm } from "@mantine/form";

import useProjectComponents from "@/hooks/useProjectComponents";
import { dispatch } from "@/redux/store";
import { patchProjectComponent } from "@/redux/slices/projectComponentsSlice/projectComponentSliceBaseServices";
import { onShowNotification } from "@/redux/slices/notificationSlice/notificationSlice";

export interface ViewProjectDetailsProps {
    component: ProjectComponent,
    onClose: () => void,
    isVisible: boolean,
    onSubmit: (component: ProjectComponent) => void
}

const EditComponentConfigModal: React.FC<ViewProjectDetailsProps> = ({ component, onClose, isVisible, onSubmit }) => {
    const { colors } = useMantineTheme();
    const { isLoading } = useProjectComponents();

    const initialValues = React.useMemo(() => ({
        id: component?.id || '',
        name: component?.name || '',
        extra_arguments: component?.extra_arguments?.map(arg => ({
            label: arg.label,
            value: arg.value,
            ...arg
        })) || []
    }), [component]);

    const form = useForm({
        mode: 'controlled',
        initialValues: initialValues,
        enhanceGetInputProps: () => ({ disabled: isLoading }),
        validate: {
            name: (value) => (value.length === 0 ? 'Name is required!' : null),
            extra_arguments: {
                value: (value) => (value.length === 0 ? 'Value is required!' : null)
            }
        },
    });

    const handleSubmit = React.useCallback(async (values: typeof form.values) => {
        const res = await dispatch(patchProjectComponent(values as ProjectComponent))
        if (res.meta.requestStatus == "fulfilled") {
            onSubmit(res.payload)
            dispatch(onShowNotification({
                content: "Component Updated !",
                level: "SUCCESS",
                render: "NOTIFICATION",
                type: "builder"
            }))
        } else {
            dispatch(onShowNotification({
                content: "Cannot update now , try again later !",
                level: "ERROR",
                render: "NOTIFICATION",
                type: "builder"
            }))
        }
    }, []);


    return (
        <Drawer
            opened={isVisible}
            onClose={onClose}
            title={component.name}
            transitionProps={{ duration: 150, timingFunction: 'linear' }}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack w={"100%"} gap={"md"}>
                    <Group align="center" justify="space-between">
                        <Card withBorder p={6} px={"md"} bg={"transparent"} style={{ width: "fit-content" }}>
                            <Group align="center" justify="space-between">
                                <Text size='sm'>{component.action_name}</Text>
                                <Text size='xs' c={"dimmed"}>{component.is_function ? "FN" : "ATTR"}</Text>
                            </Group>
                        </Card>
                    </Group>
                    <ScrollArea>
                        <Stack gap={"md"}>
                            <Fieldset legend="General" bg={colors.mainContentColor[9]}>
                                <Stack w={"100%"} gap={"sm"}>
                                    <TextInput
                                        label="Component Name"
                                        withAsterisk
                                        required
                                        key={form.key('name')}
                                        {...form.getInputProps('name')}
                                    />
                                    <TextInput label="Module" disabled value={component.module || ''} />
                                    <TextInput label="Type" disabled value={component.type || ''} />
                                </Stack>
                            </Fieldset>
                            <Fieldset legend="Component fields" bg={colors.mainContentColor[9]}>
                                <Stack w={"100%"} gap={"sm"}>
                                    {component.extra_arguments.length === 0 ? (
                                        <Text ta={"center"}>Nothing to show here</Text>
                                    ) : (
                                        component.extra_arguments.map((elm, idx) => (
                                            <TextInput
                                                label={elm.label}
                                                required
                                                key={form.key(`extra_arguments.${idx}.value`)}
                                                {...form.getInputProps(`extra_arguments.${idx}.value`)}
                                            />
                                        ))
                                    )}
                                </Stack>
                            </Fieldset>
                            <Fieldset legend="Default fields" bg={colors.mainContentColor[9]}>
                                <Stack w={"100%"} gap={"sm"}>
                                    {component.default_arguments.length === 0 ? (
                                        <Text ta={"center"}>Nothing to show here</Text>
                                    ) : (
                                        component.default_arguments.map((elm, idx) => (
                                            <TextInput
                                                label={elm.label}
                                                value={elm.value}
                                                disabled
                                                key={`default_arg-${idx}`}
                                            />
                                        ))
                                    )}
                                </Stack>
                            </Fieldset>
                        </Stack>
                    </ScrollArea>
                    <Group>
                        <Group align="center" justify="center" w={"100%"} wrap="nowrap" gap={10} px={"md"}>
                            <PrimaryButton
                                type="submit"
                                fullWidth
                                color={"primary.9"}
                                loading={isLoading}
                            >
                                Update
                            </PrimaryButton>
                            <SecondaryButton
                                fullWidth
                                onClick={onClose}
                            >
                                Cancel
                            </SecondaryButton>
                        </Group>
                    </Group>
                </Stack>
            </form>
        </Drawer>
    )
}

export default EditComponentConfigModal;