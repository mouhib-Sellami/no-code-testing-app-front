import React from "react";
import AppCard from "@/components/cards/AppCard";
import RoleDataTable from "@/components/data-table/role-datatable/RoleDataTable";
import PageContentLayout from "@/components/ui/content-layout/PageContentLayout";
import useRoles from "@/hooks/useRoles";
import { fetchRoles } from "@/redux/slices/accessSlices/roleSliceBaseServices";
import { dispatch } from "@/redux/store";
import { ActionIcon, Group, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import PermissionGuard from "@/guards/PermissionGuard";
import CreateRoleModal from "@/components/modals/role-modals/CreateRoleModal";

const RolePage: React.FC = ({ }) => {
    const ROLE_STATES = useRoles();
    const [opened, { open, close }] = useDisclosure();

    const fetchRolesData = React.useCallback(async () => {
        await dispatch(fetchRoles())
    }, [])

    React.useEffect(() => {
        fetchRolesData()
    }, [])

    return (
        <PageContentLayout title={`Your Members privileges`}>
            <AppCard
                withoutPadding={true}
                title={
                    <Group align="center" justify="space-between" w={"100%"}>
                        <Title order={5}>Organization roles 🪪</Title>
                        <PermissionGuard permission="can_create_role">
                            <ActionIcon onClick={() => open()} variant="filled" aria-label="Create new role">
                                <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </PermissionGuard>
                    </Group>}
                permission="can_view_all_role">
                <RoleDataTable
                    onChange={fetchRolesData}
                    height={390}
                    count={ROLE_STATES.roles.length}
                    records={ROLE_STATES.roles}
                    isLoading={ROLE_STATES.isLoading}
                />
            </AppCard>
            {opened && <CreateRoleModal onCancel={close} onSubmit={() => { fetchRolesData(); close() }} visible={opened} permission="can_create_role" />}
        </PageContentLayout>
    )
}

export default RolePage;