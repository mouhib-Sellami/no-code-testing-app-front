import useAppPermissions from "@/hooks/useAppPermissions";
import useAuth from "@/hooks/useAuth";
import { dispatch } from "@/redux/store";
import { Button, Group, MultiSelect, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { AppModalProps } from "../base-model/types";
import BaseAppModal from "../base-model/BaseAppModal";
import { createRole } from "@/redux/slices/accessSlices/roleSliceBaseServices";
import { onShowNotification } from "@/redux/slices/notificationSlice/notificationSlice";
import { getAppPermissions } from "@/redux/slices/accessSlices/permissionSlice";


const CreateRoleModal: React.FC<AppModalProps> = (props) => {
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
        if (organization)
            return {
                organization: organization.id,
                name: "",
                slug: "",
                permissions: []
            }
    }, [organization])

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
        const res = await dispatch(createRole(values))
        if (res?.type == "roles/createOrgRoles/rejected") {
            setTimeout(() => dispatch(onShowNotification({
                content: "Cannot create role , try again later! ",
                level: "WARNING",
                render: "NOTIFICATION",
                type: "user creation"
            })), 500)
        } else {
            props.onSubmit()
        }
    }, [])

    const submit = React.useCallback(() => {
        form.validate()
        if (form.isValid()) {
            onSubmit(form.values)
        }
    }, [form])

    return (
        <BaseAppModal
            {...props}
            title="Create new role"
            onCancel={() => props.onCancel()}
            onSubmit={() => submit()}
        >
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
                searchable
                label="Permissions"
                placeholder="Pick value"
                hidePickedOptions
                data={permissionsOptions}
                {...form.getInputProps('permissions')}
            />
        </BaseAppModal>
    )
}

export default CreateRoleModal;
