import AppCard from "@/components/cards/AppCard";
import UserDataTable from "@/components/data-table/user-dataTable/UserDataTable";
import CreateUserModal from "@/components/modals/user-modals/CreateUserModal";
import PageContentLayout from "@/components/ui/content-layout/PageContentLayout";
import DataTableConfig from "@/config/DataTableConfig";
import PermissionGuard from "@/guards/PermissionGuard";
import useUsers from "@/hooks/useUsers";
import { fetchUsers } from "@/redux/slices/userSlice/userSliceBaseServices";
import { dispatch } from "@/redux/store";
import { ActionIcon, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import React from "react";

const UsersPage: React.FC = ({ }) => {
    const USER_STATE = useUsers();
    const [opened, { open, close }] = useDisclosure();
    const [page, setPage] = React.useState(1);
    const [query, setQuery] = React.useState("");

    const fetchUsersData = React.useCallback(async () => {
        await dispatch(fetchUsers({
            p: page,
            page_size: DataTableConfig.MAX_PAGE_SIZE,
            search: query
        }))
    }, [page, query])

    React.useEffect(() => {
        fetchUsersData()
    }, [page, query])

    const onPageChanges = React.useCallback((p: number) => {
        setPage(p)
    }, [])

    const onQuerySearch = React.useCallback((query: string) => {
        setPage(1);
        setQuery(query);
    }, [])

    return (
        <PageContentLayout title={`Organization Members`}>
            <AppCard
                withoutPadding={true}
                title={
                    <Group align="center" justify="space-between" w={"100%"}>
                        <Title order={5}>Members 🪪</Title>
                        <PermissionGuard permission="can_create_user">
                            <ActionIcon onClick={() => open()} variant="filled" aria-label="Create new role">
                                <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </PermissionGuard>
                    </Group>}
            >
                <UserDataTable height={390} isLoading={USER_STATE.isLoading} records={USER_STATE.users} count={USER_STATE.count} onChange={fetchUsersData} onPageChanges={onPageChanges} onQuerySearch={onQuerySearch} />
            </AppCard>
            {opened && <CreateUserModal visible={opened} onCancel={close} onSubmit={() => { close(); fetchUsersData() }} />}
        </PageContentLayout>
    )
}

export default UsersPage;