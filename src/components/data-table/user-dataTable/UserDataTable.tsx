import React from "react";
import DataTableConfig from "@/config/DataTableConfig";
import { Box, Group, px, TextInput } from "@mantine/core";
import AppDataTable from "../base-dataTable/AppDataTable";
import { AppDataTableProps } from "../base-dataTable/types";
import useConfirmModal from "@/hooks/modals-hooks/useConfirmModal";
import { IconBackspace, IconEye, IconPasswordFingerprint, IconPencil, IconSearch } from "@tabler/icons-react";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import UserDataTableConfig from "./UserDataTableConfig";
import { AppUser } from "@/types/models/User";
import { dispatch } from "@/redux/store";
import { onShowNotification } from "@/redux/slices/notificationSlice/notificationSlice";
import { deleteUser, requestChangePassword } from "@/redux/slices/userSlice/userSliceBaseServices";
import ViewUserDetails from "@/components/modals/user-modals/ViewUserDetails";
import EditUserModal from "@/components/modals/user-modals/EditUserModal";


const UserDataTable: React.FC<AppDataTableProps<AppUser>> = ({ records, isLoading, count, onChange, onQuerySearch, onPageChanges, ...item }) => {
    const [page, setPage] = React.useState(1);
    const [RECORDS, setRECORDS] = React.useState<Array<AppUser>>(records);
    const { openDeleteModal, openConfirmModal } = useConfirmModal();
    const [query, setQuery] = React.useState('');
    const [selected, setSelected] = React.useState<AppUser | null>(null);
    const [openForUpdate, { open: openUpdate, close: closeUpdate }] = useDisclosure(false);
    const [openForView, { open: openView, close: closeView }] = useDisclosure(false);

    const [debouncedQuery] = useDebouncedValue(query, 250);

    React.useEffect(() => {
        setRECORDS(records)
    }, [records])

    React.useEffect(() => {
        onQuerySearch?.(debouncedQuery)
    }, [debouncedQuery])

    React.useEffect(() => {
        onPageChanges?.(page)
    }, [page])

    const deleteUser_ = React.useCallback(async (id: number) => {
        const res = await dispatch(deleteUser(id))
        if (res.meta.requestStatus == "fulfilled") {
            dispatch(onShowNotification({
                content: "User delete with success",
                level: "SUCCESS",
                type: "role"
            }))
        } else {
            dispatch(onShowNotification({
                content: "Self deleting is prohibited !",
                level: "ERROR",
                type: "role"
            }))
        }
    }, [])

    const requestChangePassword_ = React.useCallback(async (id: number, user: AppUser) => {
        const res = await dispatch(requestChangePassword(id))
        if (res.meta.requestStatus == "fulfilled") {
            dispatch(onShowNotification({
                content: `An email has been sended to ${user.email}.`,
                level: "SUCCESS",
                type: "role"
            }))
        } else {
            dispatch(onShowNotification({
                content: `Cannot request a rest password for user ${user.email}.`,
                level: "ERROR",
                type: "role"
            }))
        }
    }, [])

    const { COLUMNS } = UserDataTableConfig({
        actions: [
            {
                icon: IconPasswordFingerprint,
                color: "gray",
                permission: 'can_change_user',
                action(record: AppUser) {
                    openConfirmModal({
                        content: `Are you sure you want to request a new Password for ${record.email} ?`,
                        onConfirm: async () => {
                            await requestChangePassword_(record.id, record)
                        },
                        onCancel: () => { },
                        title: "Request password change",
                        confirmText: "Confirm",
                        cancelText: "Cancel",
                        withCancel: true
                    })
                },
            },
            {
                icon: IconBackspace,
                color: "gray",
                permission: 'can_delete_user',
                action(record: AppUser) {
                    openDeleteModal({
                        content: `Are you sure you want to delete ${record.email} ?`,
                        onConfirm: async () => {
                            await deleteUser_(record.id)
                            onChange?.()
                        },
                        onCancel: () => { },
                        title: "Delete role",
                        confirmText: "Delete"
                    })
                },
            },

            {
                icon: IconPencil,
                color: "gray",
                permission: 'can_change_user',
                action(record: AppUser) {
                    setSelected(record);
                    openUpdate();
                },
            },
            {
                icon: IconEye,
                color: "gray",
                permission: 'can_view_user',
                action(record: AppUser) {
                    setSelected(record);
                    openView();
                },
            },
        ]
    });

    return (
        <Box p={0} m={0}>
            <Group style={{ flexDirection: "column" }} align="flex-end" w={"100%"} p={"md"}>
                <TextInput
                    w={300}
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    placeholder="search member by username, email, first_name ..."
                    withErrorStyles={false}
                    leftSection={<IconSearch size={px("1.3rem")} />}
                />
            </Group>
            <AppDataTable isLoading={isLoading} columns={COLUMNS} pageSize={DataTableConfig.MAX_PAGE_SIZE} total={count} records={RECORDS} page={page} {...item} onPageChanges={(p) => { setPage(p) }} />
            {openForView && selected && <ViewUserDetails user={selected} isVisible={openForView} onClose={() => { closeView(); setSelected(null); }} />}
            {openForUpdate && selected &&
                <EditUserModal
                    user={selected}
                    visible={openForUpdate}
                    onCancel={() => { closeUpdate(); setSelected(null); }}
                    onSubmit={() => { closeUpdate(); setSelected(null); onChange?.(); }}
                />
            }
        </Box>
    )
}
export default UserDataTable;