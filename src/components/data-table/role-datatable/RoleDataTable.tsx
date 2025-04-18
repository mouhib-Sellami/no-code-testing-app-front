import React from "react";
import DataTableConfig from "@/config/DataTableConfig";
import { Box, Group, TextInput } from "@mantine/core";
import AppDataTable from "../base-dataTable/AppDataTable";
import { AppDataTableProps } from "../base-dataTable/types";
import { Role } from "@/types/models/Role";
import RoleDataTableConfig from "./RoleDataTableConfig";
import useConfirmModal from "@/hooks/modals-hooks/useConfirmModal";
import { IconBackspace, IconEye, IconPencil, IconSearch } from "@tabler/icons-react";
import { dispatch } from "@/redux/store";
import { deleteRole } from "@/redux/slices/accessSlices/roleSliceBaseServices";
import { onShowNotification } from "@/redux/slices/notificationSlice/notificationSlice";
import { useDebouncedValue } from "@mantine/hooks";

const RoleDataTable: React.FC<AppDataTableProps<Role>> = ({ records, isLoading, count, onChange, ...item }) => {
    const [page, setPage] = React.useState(1);
    const [RECORDS, setRECORDS] = React.useState<Array<Role>>(records.slice(0, DataTableConfig.MAX_PAGE_SIZE));
    const { openDeleteModal } = useConfirmModal();
    const [query, setQuery] = React.useState('');
    const [debouncedQuery] = useDebouncedValue(query, 200);
    
    React.useEffect(() => {
        setRECORDS(
            records.filter(({ name }) => {
                if (
                    debouncedQuery !== '' &&
                    !`${name}`.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
                )
                    return false;
                return true;
            })
        )

    }, [records, debouncedQuery])

    const deleteRole_ = React.useCallback(async (id: number) => {
        const res = await dispatch(deleteRole(id))
        if (res.meta.requestStatus == "fulfilled") {
            dispatch(onShowNotification({
                content: "Role delete with success",
                level: "SUCCESS",
                type: "role"
            }))
        } else {
            dispatch(onShowNotification({
                content: "Organization default roles cannot be delete !",
                level: "WARNING",
                type: "role"
            }))
        }
    }, [])

    const { COLUMNS } = RoleDataTableConfig({
        actions: [
            {
                icon: IconBackspace,
                color: "gray",
                action(record: Role) {
                    openDeleteModal({
                        content: "Are you sure you want to delete this role ?",
                        onConfirm: async () => {
                            await deleteRole_(record.id)
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
                action(record) {

                },
            },
            {
                icon: IconEye,
                color: "gray",
                action(record) {

                },
            },
        ]
    });


    React.useEffect(() => {
        const from = (page - 1) * DataTableConfig.MAX_PAGE_SIZE;
        const to = from + DataTableConfig.MAX_PAGE_SIZE;
        setRECORDS(records.slice(from, to));
    }, [page, DataTableConfig.MAX_PAGE_SIZE, records]);

    return (
        <Box p={0} m={0}>
            <Group style={{ flexDirection: "column" }} align="flex-end" w={"100%"} p={"md"}>
                <TextInput
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    placeholder="search Role"
                    withErrorStyles={false}
                    leftSection={<IconSearch />}
                />
            </Group>
            <AppDataTable isLoading={isLoading} columns={COLUMNS} pageSize={DataTableConfig.MAX_PAGE_SIZE} total={count} records={RECORDS} page={page} {...item} onPageChanges={(p) => { setPage(p) }} />
        </Box>
    )
}
export default RoleDataTable;