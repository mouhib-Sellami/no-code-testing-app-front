import React from "react";
import { AppModalProps } from "../base-modal/types";
import BaseAppModal from "../base-modal/BaseAppModal";
import { useForm } from "@mantine/form";
import { CreateUpdateProject, Project } from "@/types/models/Project";
import useUsers from "@/hooks/useUsers";
import { dispatch } from "@/redux/store";
import DataTableConfig from "@/config/DataTableConfig";
import { fetchUsers } from "@/redux/slices/userSlice/userSliceBaseServices";
import { fetchProviders } from "@/redux/slices/providerSlice/providerSlice";
import useProviders from "@/hooks/useProviders";
import {
    Box,
    Button,
    Group,
    px,
    ScrollArea,
    Select,
    Stack,
    Stepper,
    Textarea,
    TextInput,
    Title,
    Text,
    CloseButton,
    Divider
} from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { updateProject } from "@/redux/slices/projectSlice/projectSliceBaseServices";
import { onShowNotification } from "@/redux/slices/notificationSlice/notificationSlice";
import useProjects from "@/hooks/useProjects";

export interface EditProjectModalModalProps extends AppModalProps {
    project: Project
}

const EditProjectModal: React.FC<EditProjectModalModalProps> = (props) => {
    const USER_STATE = useUsers();
    const PROVIDER_STATE = useProviders();
    const PROJECT_STATE = useProjects();

    const [active, setActive] = React.useState(0);
    const [query, setQuery] = React.useState("");
    const [debouncedQuery] = useDebouncedValue(query, 200);

    const USERS = React.useMemo(() => {
        return USER_STATE.users.map(elm => ({
            value: elm.id.toString(),
            label: elm.first_name + " " + elm.last_name
        }));
    }, [USER_STATE.users]);


    const initialValues: CreateUpdateProject = React.useMemo(() => ({
        id: props.project.id,
        name: props.project.name,
        description: props.project.description,
        managed_by: props.project.managed_by.id,
        members: props.project.members.map(elm => elm.id),
    }), [props.project]);

    const fetchUsersData = React.useCallback(async () => {
        await dispatch(fetchUsers({
            p: 1,
            page_size: DataTableConfig.MAX_PAGE_SIZE,
            search: debouncedQuery
        }));
    }, [debouncedQuery]);

    const fetchProviders_ = React.useCallback(async () => {
        await dispatch(fetchProviders());
    }, []);

    React.useEffect(() => {
        fetchProviders_();
        fetchUsersData();
    }, []);

    React.useEffect(() => {
        fetchUsersData();
    }, [debouncedQuery]);

    const form = useForm({
        mode: 'controlled',
        initialValues: initialValues,
        enhanceGetInputProps: () => ({ disabled: PROJECT_STATE.isLoading }),
        validate: (values) => {
            if (active === 0) {
                return {
                    name: values.name.trim().length < 3
                        ? "Project name must be at least 3 characters"
                        : values.name.length > 100
                            ? "Project name cannot exceed 100 characters"
                            : null,
                    description: values.description.trim().length < 10
                        ? "Description must be at least 10 characters"
                        : values.description.length > 500
                            ? "Description cannot exceed 500 characters"
                            : null,
                    managed_by: values.managed_by === -1 || !USERS.some(user => user.value === values.managed_by.toString())
                        ? "Please select a valid project manager"
                        : null,
                };
            }

            if (active === 2) {
                return {
                    provider: values.provider === -1 || !PROVIDER_STATE.providers.some(p => p.id.toString() === values.provider.toString())
                        ? "Please select a valid provider"
                        : null,
                };
            }

            return {};
        },
    });

    const fields = form.getValues().members.map((item, index) => (
        <Group key={form.key(`members.${index}`)} align="center" gap="sm" wrap="nowrap">
            <Select
                placeholder="Select member"
                data={USERS}
                searchable
                onSearchChange={setQuery}
                nothingFoundMessage="No member found"
                {...form.getInputProps(`members.${index}`)}
                style={{ flex: 1 }}
            />
            <CloseButton
                onClick={() => form.removeListItem('members', index)}
                disabled={PROJECT_STATE.isLoading}
                title="Remove member"
            />
        </Group>
    ));

    const nextStep = React.useCallback(() => {
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            if (current === 1) {
                onSubmit(form.values);
                return current;
            }
            return current < 1 ? current + 1 : current;
        });
    }, [form]);

    const onSubmit = React.useCallback(async (values: CreateUpdateProject) => {
        const res = await dispatch(updateProject(values));
        if (res.meta.requestStatus === "rejected") {
            dispatch(onShowNotification({
                content: "Cannot update project, try again later!",
                level: "WARNING",
                render: "NOTIFICATION",
                type: "user creation"
            }));
        } else {
            dispatch(onShowNotification({
                content: "Project updated successfully! let's start cracking 🥳",
                level: "SUCCESS",
                render: "NOTIFICATION",
                type: "user role"
            }));
            props.onSubmit();
        }
    }, [props]);

    return (
        <BaseAppModal
            {...props}
            withCancelButton
            size={px("70rem")}
            title="Edit project 🤙"
            onCancel={() => props.onCancel()}
            onSubmit={nextStep}
            SubmitButtonLoading={PROJECT_STATE.isLoading}
            submitText={active === 1 ? "Update Project" : "Next"}
        >
            <Box p={0} m={0} h={px("30rem")}>
                <Stepper active={active}>
                    <Stepper.Step label="Project details" description="Provide project details">
                        <Stack w={"100%"} gap={"sm"} mt={"md"}>
                            <TextInput
                                label="Project name"
                                placeholder="Enter project name"
                                withAsterisk
                                required
                                key={form.key('name')}
                                {...form.getInputProps('name')}
                            />
                            <Select
                                data={USERS}
                                searchable
                                onSearchChange={setQuery}
                                label="Managed By"
                                placeholder="Select project manager"
                                withAsterisk
                                required
                                key={form.key('managed_by')}
                                {...form.getInputProps('managed_by')}
                            />
                            <Textarea
                                label="Project description"
                                placeholder="Describe your project"
                                withAsterisk
                                rows={5}
                                required
                                key={form.key('description')}
                                {...form.getInputProps('description')}
                            />
                        </Stack>
                    </Stepper.Step>
                    <Stepper.Step label="Assign project" description="Add team members">
                        <Stack gap="md" mt="md" w="100%">
                            <Group justify="space-between" align="center">
                                <Title order={4}>Team</Title>
                                <Button
                                    leftSection={<IconUserPlus size={20} />}
                                    onClick={() => form.insertListItem('members', -1)}
                                    disabled={PROJECT_STATE.isLoading}
                                    variant="filled"
                                >
                                    Add Member
                                </Button>
                            </Group>
                            <Divider />
                            {fields.length === 0 ? (
                                <Text c="dimmed" ta="center" mt="lg">
                                    No members added yet. Click "Add Member" to start.
                                </Text>
                            ) : (
                                <ScrollArea h={px("15rem")} mah={px("15rem")}>
                                    <Stack gap="sm">
                                        {fields}
                                    </Stack>
                                </ScrollArea>
                            )}
                        </Stack>
                    </Stepper.Step>
                </Stepper>
            </Box>
        </BaseAppModal>
    );
};

export default EditProjectModal;