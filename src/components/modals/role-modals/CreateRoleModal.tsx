import React from "react";
import { dispatch } from "@/redux/store";
import { Checkbox, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AppModalProps } from "../base-modal/types";
import BaseAppModal from "../base-modal/BaseAppModal";
import { createRole } from "@/redux/slices/accessSlices/roleSliceBaseServices";
import { onShowNotification } from "@/redux/slices/notificationSlice/notificationSlice";
import CustomLoadingOverlay from "@/components/custom-loading/CustomLoadingOverlay";
import AppCard from "@/components/cards/AppCard";
import useRoles from "@/hooks/useRoles";
import useRoleFormatter from "@/hooks/roles/useRoleFormatter";
import useAppHooks from "@/hooks/useAppHooks";


const CreateRoleModal: React.FC<AppModalProps> = (props) => {
    const { isLoading } = useRoles();
    const { formPermission, loadingPermissions, PERMISSION_GROUP_BY, checkPermissionSelection } = useRoleFormatter();
    const { createAcronym } = useAppHooks();

    const initialValues = React.useMemo(() => {
        return {
            name: "",
            slug: "",
            permissions: []
        }
    }, [])

    const form = useForm({
        mode: 'controlled',
        initialValues: initialValues,
        enhanceGetInputProps: () => ({ disabled: isLoading }),
        validate: {
            name: (value) => (value.length == 0
                ? 'name is required!' : null),
            permissions: (value) => (value.length == 0 ? "Select permissions" : null)
        },
    });

    const onSubmit = React.useCallback(async (values) => {
        const res = await dispatch(createRole(values))
        if (res.meta.requestStatus == "rejected") {
            dispatch(onShowNotification({
                content: "Cannot create role , try again later !",
                level: "WARNING",
                render: "NOTIFICATION",
                type: "user creation"
            }))
        } else {
            dispatch(onShowNotification({
                content: "Role created successfully !",
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
            onSubmit({ ...form.values, slug: createAcronym(form.values?.name) })
        }
    }, [form])

    const onSelectPermission = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.value;

        const find = form.values.permissions.find(x => x == id);
        let tmp = form.values.permissions;
        if (find) {
            tmp = tmp.filter(elm => elm != id)
        } else {
            tmp.push(id)
        }
        form.setFieldValue('permissions', tmp)
    }, [form.values])

    return (
        <BaseAppModal
            {...props}
            withCancelButton
            size={"xl"}
            title="Create new role"
            onCancel={() => props.onCancel()}
            onSubmit={() => submit()}
            SubmitButtonLoading={isLoading}
        >
            <Stack w={"100%"} gap={"sm"}>

                <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Role name"
                    autoFocus

                    {...form.getInputProps('name')}
                />
                <TextInput
                    readOnly
                    withAsterisk
                    label="Slug"
                    value={createAcronym(form.values?.name)}
                    placeholder=""
                />
                <Stack w={"100%"} gap={"sm"}>
                    <Text>Permissions</Text>
                    <SimpleGrid cols={2} pos={"relative"}>
                        {PERMISSION_GROUP_BY.length == 0 || loadingPermissions && <CustomLoadingOverlay />}
                        {PERMISSION_GROUP_BY.map((elm, idx) => {
                            return (
                                <AppCard title={<Text tt={'capitalize'} >{elm.model}</Text>} key={idx}>
                                    <SimpleGrid cols={2}>
                                        {elm.permissions.map((per, index) => {
                                            return (<Checkbox key={index} label={formPermission(per.label)} disabled={isLoading} checked={checkPermissionSelection(per.value, form)} value={per.value} styles={{ label: { fontSize: 14, textTransform: "capitalize" } }}
                                                onChange={onSelectPermission} />)
                                        })}
                                    </SimpleGrid>
                                </AppCard>
                            )
                        })}
                    </SimpleGrid>
                </Stack>
            </Stack>
        </BaseAppModal>
    )
}

export default CreateRoleModal;
