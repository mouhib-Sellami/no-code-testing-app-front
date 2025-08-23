import React from "react";
import { Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AppModalProps } from "../base-modal/types";
import BaseAppModal from "../base-modal/BaseAppModal";
import { CreateUpdateRunnerAgent, RunnerAgent } from "@/types/models/RunningAgent";
import useRunners from "@/hooks/useRunners";
import { dispatch } from "@/redux/store";
import { onShowNotification } from "@/redux/slices/notificationSlice/notificationSlice";
import { updateRunnerAgent } from "@/redux/slices/runnerAgentSlice/runnerAgentSliceBaseServices";
import { notifications } from "@mantine/notifications";
import { IconRocket, IconStar } from "@tabler/icons-react";
import { useClipboard } from "@mantine/hooks";
import useConfirmModal from "@/hooks/modals-hooks/useConfirmModal";

export interface EditRunnerAgentModalProps extends AppModalProps {
    runner: RunnerAgent
}

const EditRunnerAgentModal: React.FC<EditRunnerAgentModalProps> = (props) => {
    const { isLoading } = useRunners();
    const clipboard = useClipboard({ timeout: 500 });

    const ENV = React.useMemo(() => [
        { label: "🖥️ Local", value: "Local" },
        { label: "☁️ Cloud", value: "Cloud" },
        { label: "🐳 Docker", value: "Docker" }
    ], []);

    const initialValues: CreateUpdateRunnerAgent = React.useMemo(() => ({
        id: props.runner.id,
        name: props.runner?.name,
        environment: props.runner.environment,
        description: props.runner.description
    }), [props.runner]);

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
        const res = await dispatch(updateRunnerAgent(values));
        if (res.meta.requestStatus === "rejected") {
            dispatch(onShowNotification({
                content: "Oops, the agent launch failed! Try again, superstar! 🌟",
                level: "ERROR",
                render: "NOTIFICATION",
                type: "user role"
            }));
        } else {
            props.onSubmit();
            notifications.show({
                title: "Agent Update! 🚀",
                message: "Your new CI agent is updated successfully !",
                color: "violet",
                icon: <IconRocket size={20} />,
            });
        }
    }, [clipboard, props]);

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
    }, [form]);

    return (
        <BaseAppModal
            {...props}
            withCancelButton
            title="Update Agent! 🚀"
            onCancel={() => props.onCancel()}
            onSubmit={() => submit()}
            SubmitButtonLoading={isLoading}
            submitText="Update"
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

export default EditRunnerAgentModal;