import React from "react";
import { ActionIcon, CopyButton, Group, PasswordInput, Select, Stack, Textarea, TextInput, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AppModalProps } from "../base-modal/types";
import BaseAppModal from "../base-modal/BaseAppModal";
import { CreateUpdateRunnerAgent } from "@/types/models/RunningAgent";
import useRunners from "@/hooks/useRunners";
import { dispatch } from "@/redux/store";
import { onShowNotification } from "@/redux/slices/notificationSlice/notificationSlice";
import { createRunnerAgent } from "@/redux/slices/runnerAgentSlice/runnerAgentSliceBaseServices";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCopy, IconRocket, IconStar } from "@tabler/icons-react";
import { useClipboard } from "@mantine/hooks";
import useConfirmModal from "@/hooks/modals-hooks/useConfirmModal";

const CreateRunnerAgentModal: React.FC<AppModalProps> = (props) => {
    const { isLoading } = useRunners();
    const clipboard = useClipboard({ timeout: 500 });
    const { openConfirmModal } = useConfirmModal();

    const ENV = React.useMemo(() => [
        { label: "🖥️ Local", value: "Local" },
        { label: "☁️ Cloud", value: "Cloud" },
        { label: "🐳 Docker", value: "Docker" }
    ], []);

    const initialValues: CreateUpdateRunnerAgent = React.useMemo(() => ({
        name: "",
        environment: "Local",
        description: ""
    }), []);

    const form = useForm({
        mode: 'controlled',
        initialValues,
        enhanceGetInputProps: () => ({ disabled: isLoading }),
        validate: {
            name: (value) => (value.length === 0 ? "Gimme a cool name" : null),
            environment: (value) => (value.length === 0 ? "Pick an environment" : null),
            description: (value) => (value.length === 0 ? "Tell me about this agent's superpowers! ✍️" : null),
        },
    });

    const onSubmit = React.useCallback(async (values: CreateUpdateRunnerAgent) => {
        const res = await dispatch(createRunnerAgent(values));
        if (res.meta.requestStatus === "rejected") {
            dispatch(onShowNotification({
                content: "Oops, the agent launch failed! Try again, superstar! 🌟",
                level: "ERROR",
                render: "NOTIFICATION",
                type: "user role"
            }));
        } else {
            props.onSubmit();
            openConfirmModal({
                title: "Your Shiny New Agent Token! 🎉",
                content: (

                    <Group w="100%" align="flex-start" justify="flex-start">
                        <TextInput
                            label="Agent key"
                            w={350}
                            value={res.payload.agent_key}
                            readOnly
                        />
                        <Group w="100%" align="center" wrap="nowrap" justify="center">
                            <PasswordInput
                                w={300}
                                value={res.payload.auth_token}
                                readOnly
                                placeholder="Your secret agent code! 🕵️"
                            />

                            <CopyButton value={res.payload.auth_token} timeout={2000}>
                                {({ copied, copy }) => (
                                    <Tooltip label={copied ? "Copied to clipboard! 🎉" : "Copy the secret code! 📋"} withArrow position="right">
                                        <ActionIcon color={copied ? "teal" : "primary.9"} variant="filled" size={35} onClick={copy}>
                                            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </CopyButton>
                        </Group>
                    </Group>
                ),
                onConfirm: () => {
                    clipboard.copy(res.payload.auth_token);
                },
            });
            notifications.show({
                title: "Agent Launched! 🚀",
                message: "Your new CI agent is ready to conquer the pipeline! ⚡️",
                color: "violet",
                icon: <IconRocket size={20} />,
            });
        }
    }, [clipboard, dispatch, openConfirmModal, props]);

    const submit = React.useCallback(() => {
        form.validate();
        if (form.isValid()) {
            onSubmit({ ...form.values });
        } else {
            notifications.show({
                title: "Whoops!",
                message: "Check the form for some missing details! 🕵️‍♀️",
                color: "red",
                icon: <IconStar size={20} />,
            });
        }
    }, [form, onSubmit]);

    return (
        <BaseAppModal
            {...props}
            withCancelButton
            title="Launch a New Super Agent! 🚀"
            onCancel={() => props.onCancel()}
            onSubmit={() => submit()}
            SubmitButtonLoading={isLoading}
        >
            <Stack w="100%" gap="sm">
                <TextInput
                    withAsterisk
                    label="Agent Name"
                    placeholder="Give your agent a heroic name!"
                    autoFocus
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
                <Textarea
                    withAsterisk
                    label="Agent Mission"
                    placeholder="Describe your agent's epic quest!"
                    rows={3}
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                />
                <Select
                    label="Agent Environment"
                    placeholder="Choose your agent's home base!"
                    data={ENV}
                    {...form.getInputProps('environment')}
                    key={form.key('environment')}
                />
            </Stack>
        </BaseAppModal>
    );
};

export default CreateRunnerAgentModal;