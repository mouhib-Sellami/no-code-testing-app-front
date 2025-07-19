import AppCard from "@/components/cards/AppCard";
import UserDataTable from "@/components/data-table/user-dataTable/UserDataTable";
import CreateUserModal from "@/components/modals/user-modals/CreateUserModal";
import PageContentLayout from "@/components/ui/content-layout/PageContentLayout";
import PermissionGuard from "@/guards/PermissionGuard";
import usePagination from "@/hooks/app/usePagination";
import useUsers from "@/hooks/useUsers";
import { fetchUsers } from "@/redux/slices/userSlice/userSliceBaseServices";
import { ActionIcon, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import React from "react";

const UsersPage: React.FC = () => {
    const USER_STATE = useUsers();
    const [opened, { open, close }] = useDisclosure();
    const { onPageChange, onSearch, fetchData } = usePagination(fetchUsers);

    return (
        <PageContentLayout title="Team Squad 🌟">
            <AppCard
                withoutPadding={true}
                permission="can_view_all_user"
                title={
                    <Group align="center" justify="space-between" w={"100%"}>
                        <Title order={5}>Crew 🚀</Title>
                        <PermissionGuard permission="can_create_user">
                            <ActionIcon onClick={() => open()} variant="filled" aria-label="Add new team member">
                                <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </PermissionGuard>
                    </Group>
                }
            >
                <UserDataTable
                    height={390}
                    isLoading={USER_STATE.isLoading}
                    records={USER_STATE.users}
                    count={USER_STATE.count}
                    onChange={fetchData}
                    onPageChanges={onPageChange}
                    onQuerySearch={onSearch}
                />
            </AppCard>
            {opened && <CreateUserModal visible={opened} onCancel={close} onSubmit={() => { close(); fetchData() }} />}
        </PageContentLayout>
    );
};

export default UsersPage;