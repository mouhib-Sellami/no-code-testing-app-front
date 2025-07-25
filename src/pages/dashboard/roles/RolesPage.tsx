import React from "react";
import AppCard from "@/components/cards/AppCard";
import RoleDataTable from "@/components/data-table/role-datatable/RoleDataTable";
import PageContentLayout from "@/components/ui/content-layout/PageContentLayout";
import useRoles from "@/hooks/useRoles";
import { fetchRoles } from "@/redux/slices/accessSlices/roleSliceBaseServices";
import { ActionIcon, Group, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import PermissionGuard from "@/guards/PermissionGuard";
import CreateRoleModal from "@/components/modals/role-modals/CreateRoleModal";
import usePagination from "@/hooks/app/usePagination";

const RolePage: React.FC = () => {
    const ROLE_STATES = useRoles();
    const [opened, { open, close }] = useDisclosure();
    const { onPageChange, onSearch, fetchData } = usePagination(fetchRoles);

    return (
        <PageContentLayout title="Crew Permissions 🌟">
            <AppCard
                withoutPadding={true}
                title={
                    <Group align="center" justify="space-between" w={"100%"}>
                        <Title order={5}>Role Magic ✨</Title>
                        <PermissionGuard permission="can_create_role">
                            <ActionIcon onClick={() => open()} variant="filled" aria-label="Add awesome role">
                                <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </PermissionGuard>
                    </Group>
                }
                permission="can_view_all_role"
            >
                <RoleDataTable
                    onChange={fetchData}
                    height={500}
                    onPageChanges={onPageChange}
                    onQuerySearch={onSearch}
                    count={ROLE_STATES.count}
                    records={ROLE_STATES.roles}
                    isLoading={ROLE_STATES.isLoading}
                />
            </AppCard>
            {opened && <CreateRoleModal onCancel={close} onSubmit={() => { fetchData(); close() }} visible={opened} permission="can_create_role" />}
        </PageContentLayout>
    );
};

export default RolePage;