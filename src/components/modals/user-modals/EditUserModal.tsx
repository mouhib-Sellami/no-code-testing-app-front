import React from "react";
import { dispatch } from "@/redux/store";
import { Grid, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AppModalProps } from "../base-modal/types";
import BaseAppModal from "../base-modal/BaseAppModal";
import { onShowNotification } from "@/redux/slices/notificationSlice/notificationSlice";
import useRoles from "@/hooks/useRoles";
import useUsers from "@/hooks/useUsers";
import { AppUser, createUpdateUser } from "@/types/models/User";
import { updateUser } from "@/redux/slices/userSlice/userSliceBaseServices";
import { fetchRoles } from "@/redux/slices/accessSlices/roleSliceBaseServices";
import { useDebouncedValue } from "@mantine/hooks";
import DataTableConfig from "@/config/DataTableConfig";


export interface EditUserModalProps extends AppModalProps {
    user: AppUser
}

const EditUserModal: React.FC<EditUserModalProps> = (props) => {
    const { isLoading } = useUsers();
    const ROLE_HOOKS = useRoles();
    const [query, setQuery] = React.useState("");
    const [debouncedQuery] = useDebouncedValue(query, 200);

    const RoleOptions = React.useMemo(() => {
        return ROLE_HOOKS.roles.flatMap(elm => ({ value: elm.id ? elm.id?.toString() : "0", label: elm.name }))
    }, [ROLE_HOOKS.roles])

    const initialValues: createUpdateUser = React.useMemo(() => {
        return {
            id: props.user.id,
            role_id: props.user.role.id + "",
            first_name: props.user.first_name,
            user: {
                email: props.user.email,
                username: props.user.username,
            },
            last_name: props.user.last_name,
            profession: props.user.profession,
        }
    }, [props.user])


    const fetchRolesData = React.useCallback(async () => {
        await dispatch(fetchRoles({
            p: 1,
            page_size: DataTableConfig.MAX_PAGE_SIZE,
            search: debouncedQuery
        }))
    }, [debouncedQuery])

    React.useEffect(() => {
        fetchRolesData()
    }, [debouncedQuery])

    const form = useForm({
        enhanceGetInputProps: () => ({ disabled: isLoading }),
        mode: 'controlled',
        initialValues: initialValues,
        validate: {
            user: {
                email: (value) => (/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(value) ? null : 'Invalid email'),
                username: (value) => value.length > 0 ? null : 'Invalid field',
            },
            role_id: (value) => (value == "" ? "Role need to be specified" : null),
            first_name: (value) => value.length > 0 ? null : 'Invalid field',
            last_name: (value) => value.length > 0 ? null : 'Invalid field',
            profession: (value) => value.length > 0 ? null : 'Invalid field',
        },
    });

    const onSubmit = React.useCallback(async (values) => {
        const res = await dispatch(updateUser(values))
        if (res.meta.requestStatus == "rejected") {
            dispatch(onShowNotification({
                content: "Cannot update member , try again later !",
                level: "WARNING",
                render: "NOTIFICATION",
                type: "user role"
            }))
        } else {
            dispatch(onShowNotification({
                content: "Member updated successfully 🥳",
                level: "SUCCESS",
                render: "NOTIFICATION",
                type: "user role"
            }))
            props.onSubmit()
        }
    }, [])

    const submit = React.useCallback(() => {
        form.validate()
        if (form.isValid()) {
            onSubmit({ ...form.values })
        }
    }, [form])

    return (
        <BaseAppModal
            {...props}
            withCancelButton
            size={"xl"}
            title="Add new member to the team 🤙"
            onCancel={() => props.onCancel()}
            onSubmit={() => submit()}
            SubmitButtonLoading={isLoading}
        >
            <Stack w={"100%"} gap={"sm"}>
                <Grid>
                    <Grid.Col span={6}>
                        <TextInput
                            label="First name"
                            placeholder="Jhon"
                            withAsterisk
                            required
                            key={form.key('first_name')}
                            {...form.getInputProps('first_name')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Last name"
                            placeholder="Doe"
                            withAsterisk
                            required
                            key={form.key('last_name')}
                            {...form.getInputProps('last_name')}
                        />
                    </Grid.Col>
                </Grid>
                <TextInput
                    label="Username"
                    placeholder="jhon.doe"
                    withAsterisk
                    required
                    key={form.key('user.username')}
                    {...form.getInputProps('user.username')}
                />
                <TextInput
                    label="E-mail"
                    placeholder="jhon.doe@example.com"
                    withAsterisk
                    required
                    key={form.key('user.email')}
                    {...form.getInputProps('user.email')}
                />
                <TextInput
                    label="Profession"
                    placeholder="Dev"
                    withAsterisk
                    required
                    key={form.key('profession')}
                    {...form.getInputProps('profession')}
                />
                <Select
                    label="Role"
                    placeholder="tester"
                    searchable
                    data={RoleOptions}
                    nothingFoundMessage="No role found"
                    onSearchChange={setQuery}
                    {...form.getInputProps('role_id')} />
            </Stack>
        </BaseAppModal>
    )
}

export default EditUserModal;
