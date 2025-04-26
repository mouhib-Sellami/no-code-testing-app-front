import React from "react";
import DataTableConfig from "@/config/DataTableConfig";
import { Box, Group, px, TextInput } from "@mantine/core";
import AppDataTable from "../base-dataTable/AppDataTable";
import { AppDataTableProps } from "../base-dataTable/types";
import { Role } from "@/types/models/Role";
import useConfirmModal from "@/hooks/modals-hooks/useConfirmModal";
import { IconBackspace, IconEye, IconPasswordFingerprint, IconPencil, IconSearch } from "@tabler/icons-react";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import UserDataTableConfig from "./UserDataTableConfig";
import { AppUser } from "@/types/models/User";
import { DataTableColumn } from "mantine-datatable";


const UserDataTable: React.FC<AppDataTableProps<AppUser>> = ({ records, isLoading, count, onChange, onQuerySearch, ...item }) => {
    const [page, setPage] = React.useState(1);
    const [RECORDS, setRECORDS] = React.useState<Array<AppUser>>(records);
    const { openDeleteModal } = useConfirmModal();
    const [query, setQuery] = React.useState('');
    const [selected, setSelected] = React.useState<Role | null>(null);
    const [openForUpdate, { open: openUpdate, close: closeUpdate }] = useDisclosure(false);
    const [openForView, { open: openView, close: closeView }] = useDisclosure(false);

    const [debouncedQuery] = useDebouncedValue(query, 250);

    React.useEffect(() => {
        setRECORDS(records)
    }, [records])

    React.useEffect(() => {
        onQuerySearch?.(debouncedQuery)
    }, [records, debouncedQuery])

    const deleteRole_ = React.useCallback(async (id: number) => {
        // const res = await dispatch(deleteRole(id))
        // if (res.meta.requestStatus == "fulfilled") {
        //     dispatch(onShowNotification({
        //         content: "Role delete with success",
        //         level: "SUCCESS",
        //         type: "role"
        //     }))
        // } else {
        //     dispatch(onShowNotification({
        //         content: "Organization default roles cannot be delete !",
        //         level: "WARNING",
        //         type: "role"
        //     }))
        // }
    }, [])

    const { COLUMNS } = UserDataTableConfig({
        actions: [
            {
                icon: IconPasswordFingerprint,
                color: "gray",
                action(record: AppUser) {
                    // setSelected(record);
                    // openUpdate();
                },
            },
            {
                icon: IconBackspace,
                color: "gray",
                action(record: AppUser) {
                    // openDeleteModal({
                    //     content: "Are you sure you want to delete this role ?",
                    //     onConfirm: async () => {
                    //         await deleteRole_(record.id)
                    //         onChange?.()
                    //     },
                    //     onCancel: () => { },
                    //     title: "Delete role",
                    //     confirmText: "Delete"
                    // })
                },
            },

            {
                icon: IconPencil,
                color: "gray",
                action(record: AppUser) {
                    // setSelected(record);
                    // openUpdate();
                },
            },
            {
                icon: IconEye,
                color: "gray",
                action(record: AppUser) {
                    // setSelected(record);
                    // openView();
                },
            },
        ]
    });
    console.log("RECORDS");
    console.log(RECORDS);

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
        </Box>
    )
}
export default UserDataTable;