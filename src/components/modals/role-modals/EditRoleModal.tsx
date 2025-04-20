import useAppPermissions from "@/hooks/useAppPermissions";
import useAuth from "@/hooks/useAuth";
import { onError } from "@/redux/slices/errorSlice";
import { createOrgRoles, updateOrgRole } from "@/redux/slices/orgRoleSlice";
import { getAppPermissions } from "@/redux/slices/permissionSlice";
import { dispatch } from "@/redux/store";
import { Role } from "@/types/Role";
import { Button, Group, Modal, MultiSelect, Select, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";


export interface EditRoleModalProps extends BaseModalProps {
    role: Role,
    onUpdate: () => void
}

const EditRoleModal: React.FC<EditRoleModalProps> = (props) => {
    const { permissions } = useAppPermissions();
    const { organization } = useAuth();

    const permissionsOptions = React.useMemo(() => {
        return permissions.flatMap(elm => ({ value: elm.id ? elm.id?.toString() : "0", label: elm.label }))
    }, [permissions])

    const fetchPermissions = React.useCallback(async () => {
        await dispatch(getAppPermissions())
    }, [])

    React.useEffect(() => {
        fetchPermissions().then().catch()
    }, [])

    const initialValues = React.useMemo(() => {
        if (organization && props.role)
            return {
                id: props.role.id,
                organization: organization.id,
                name: props.role.name,
                slug: props.role.slug,
                permissions: props.role.permissions.map(elm => elm.id?.toString())
            }
    }, [organization, props.role])

    const form = useForm({
        mode: 'controlled',
        initialValues: initialValues,
        validate: {
            name: (value) => (value.length == 0
                ? 'name is required!' : null),
            permissions: (value) => (value.length == 0 ? "Select permissions" : null)
        },
    });

    const onSubmit = React.useCallback(async (values) => {
        const res = await dispatch(updateOrgRole(values))
        if (res?.type == "roles/updateOrgRole/rejected") {
            setTimeout(() => dispatch(onError({
                content: "Cannot update role , try again later! ",
                level: "WARNING",
                render: "NOTIFICATION",
                type: "user creation"
            })), 500)
        } else {
            props.onUpdate()

        }
    }, [props.role])
    return (
        <Modal size="xl"
            closeOnClickOutside
            opened={props.isVisible}
            onClose={props.onClose}
            centered>
            <Title style={{ textAlign: "center" }} order={3}>Edit Role</Title>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Role name"
                    autoFocus

                    {...form.getInputProps('name')}
                />
                <TextInput
                    withAsterisk
                    label="Slug"
                    placeholder=""
                    {...form.getInputProps('slug')}
                />
                <MultiSelect
                    label="Permissions"
                    placeholder="Pick value"
                    data={permissionsOptions}
                    {...form.getInputProps('permissions')}
                />
                <Group justify="center" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Modal>
    )
}

export default EditRoleModal;
