import React from "react";
import DataTableConfig from "@/config/DataTableConfig";
import { Box, Group, px, TextInput } from "@mantine/core";
import AppDataTable from "../base-dataTable/AppDataTable";
import { AppDataTableProps } from "../base-dataTable/types";
import useConfirmModal from "@/hooks/modals-hooks/useConfirmModal";
import { IconBackspace, IconEye, IconPasswordFingerprint, IconPencil, IconSearch } from "@tabler/icons-react";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { AppUser } from "@/types/models/User";
import { dispatch } from "@/redux/store";
import { onShowNotification } from "@/redux/slices/notificationSlice/notificationSlice";
import { deleteUser, requestChangePassword } from "@/redux/slices/userSlice/userSliceBaseServices";
import ViewUserDetails from "@/components/modals/user-modals/ViewUserDetails";
import EditUserModal from "@/components/modals/user-modals/EditUserModal";
import ProjectDataTableConfig from "./ProjectDataTableConfig";
import { Project } from "@/types/models/Project";


const ProjectDataTable: React.FC<AppDataTableProps<Project>> = ({ records, isLoading, count, onChange, onQuerySearch, ...item }) => {
    const [page, setPage] = React.useState(1);
    const [RECORDS, setRECORDS] = React.useState<Array<Project>>(records);
    const { openDeleteModal, openConfirmModal } = useConfirmModal();
    const [query, setQuery] = React.useState('');
    const [selected, setSelected] = React.useState<Project | null>(null);
    const [openForUpdate, { open: openUpdate, close: closeUpdate }] = useDisclosure(false);
    const [openForView, { open: openView, close: closeView }] = useDisclosure(false);

    const [debouncedQuery] = useDebouncedValue(query, 250);

    React.useEffect(() => {
        setRECORDS(records)
    }, [records])

    React.useEffect(() => {
        onQuerySearch?.(debouncedQuery)
    }, [records, debouncedQuery])


    const { COLUMNS } = ProjectDataTableConfig({
        actions: [

        ]
    });

    return (
        <Box p={0} m={0}>
            <Group style={{ flexDirection: "column" }} align="flex-end" w={"100%"} p={"md"}>
                <TextInput
                    w={300}
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    placeholder="search project by name, members ..."
                    withErrorStyles={false}
                    leftSection={<IconSearch size={px("1.3rem")} />}
                />
            </Group>
            <AppDataTable isLoading={isLoading} columns={COLUMNS} pageSize={DataTableConfig.MAX_PAGE_SIZE} total={count} records={RECORDS} page={page} {...item} onPageChanges={(p) => { setPage(p) }} />
            {/* {openForView && selected && <ViewUserDetails user={selected} isVisible={openForView} onClose={() => { closeView(); setSelected(null); }} />}
            {openForUpdate && selected &&
                <EditUserModal
                    user={selected}
                    visible={openForUpdate}
                    onCancel={() => { closeUpdate(); setSelected(null); }}
                    onSubmit={() => { closeUpdate(); setSelected(null); onChange?.();}}
                />
            } */}
        </Box>
    )
}
export default ProjectDataTable;