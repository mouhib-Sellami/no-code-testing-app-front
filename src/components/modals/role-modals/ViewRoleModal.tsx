import useAppPermissions from "@/hooks/useAppPermissions";
import useAuth from "@/hooks/useAuth";
import { onError } from "@/redux/slices/errorSlice";
import { createOrgRoles } from "@/redux/slices/orgRoleSlice";
import { getAppPermissions } from "@/redux/slices/permissionSlice";
import { dispatch } from "@/redux/store";
import { Role } from "@/types/Role";
import { Button, Group, Modal, MultiSelect, Select, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";


export interface ViewRoleModalProps extends BaseModalProps {
    role: Role
}

const ViewRoleModal: React.FC<ViewRoleModalProps> = (props) => {
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
    return (
        <Modal size="xl"
            closeOnClickOutside
            opened={props.isVisible}
            onClose={props.onClose}
            centered>
            <Title style={{ textAlign: "center" }} order={3}>Role</Title>
            <form>
                <TextInput
                    readOnly
                    disabled={true}
                    label="Name"
                    placeholder="Role name"
                    autoFocus

                    {...form.getInputProps('name')}
                />
                <TextInput
                    readOnly
                    disabled={true}
                    label="Slug"
                    placeholder=""
                    {...form.getInputProps('slug')}
                />
                <MultiSelect
                    readOnly
                    disabled={true}
                    label="Permissions"
                    data={permissionsOptions}
                    {...form.getInputProps('permissions')}
                />

            </form>
        </Modal>
    )
}

export default ViewRoleModal;
