import React from "react";
import { Checkbox, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AppModalProps } from "../base-modal/types";
import BaseAppModal from "../base-modal/BaseAppModal";
import CustomLoadingOverlay from "@/components/custom-loading/CustomLoadingOverlay";
import AppCard from "@/components/cards/AppCard";
import { Role } from "@/types/models/Role";
import useRoles from "@/hooks/useRoles";
import useRoleFormatter from "@/hooks/roles/useRoleFormatter";

export interface ViewRoleModalProps extends AppModalProps {
    role: Role
}

const ViewRoleModal: React.FC<ViewRoleModalProps> = (props) => {
    const { isLoading } = useRoles();
    const { formPermission, loadingPermissions, PERMISSION_GROUP_BY, checkPermissionSelection } = useRoleFormatter();

    const initialValues = React.useMemo(() => {
        if (props.role)
            return {
                id: props.role.id,
                name: props.role?.name,
                slug: props.role.slug,
                permissions: props.role.permissions.map(elm => elm.id?.toString())
            }
    }, [props.role])

    const form = useForm({
        mode: 'controlled',
        initialValues: initialValues,
        enhanceGetInputProps: () => ({ disabled: true }),
    });

    return (
        <BaseAppModal
            {...props}
            submitText={'Close'}
            size={"xl"}
            title="Role details"
            onCancel={() => props.onCancel()}
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
                    withAsterisk
                    label="Slug"
                    placeholder=""
                    {...form.getInputProps('slug')}
                />
                <Stack w={"100%"} gap={"sm"}>
                    <Text>Permissions</Text>
                    <SimpleGrid cols={2} pos={"relative"} >
                        {PERMISSION_GROUP_BY.length == 0 || loadingPermissions && <CustomLoadingOverlay />}
                        {PERMISSION_GROUP_BY.map((elm, idx) => {
                            return (
                                <AppCard title={<Text tt={'capitalize'} >{elm.model}</Text>} key={idx}>
                                    <SimpleGrid cols={2}>
                                        {elm.permissions.map((per, index) => {
                                            return (<Checkbox key={index} disabled={true} label={formPermission(per.label)} checked={checkPermissionSelection(per.value, form)} value={per.value} styles={{ label: { fontSize: 14, textTransform: "capitalize" } }} />)
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

export default ViewRoleModal;
