import React from "react";
import DataTableConfig from "@/config/DataTableConfig";
import { Box, Group, px, TextInput } from "@mantine/core";
import AppDataTable from "../base-dataTable/AppDataTable";
import { AppDataTableProps } from "../base-dataTable/types";
import useConfirmModal from "@/hooks/modals-hooks/useConfirmModal";
import { IconBackspace, IconEye, IconHammer, IconLogs, IconSearch } from "@tabler/icons-react";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { dispatch } from "@/redux/store";
import { onShowNotification } from "@/redux/slices/notificationSlice/notificationSlice";
import ProjectLogsDataTableConfig from "./ProjectLogsDataTableConfig";
import { Project } from "@/types/models/Project";
import { deleteProject } from "@/redux/slices/projectSlice/projectSliceBaseServices";
import ViewProjectDetails from "@/components/modals/project-modals/ViewProjectDetails";
import { onSelectProject } from "@/redux/slices/projectSlice/projectSlice";
import { useNavigate } from "react-router";
import { PATH_APP } from "@/routes/paths";
import { ProjectStatusLog } from "@/types/models/ProjectStatusLog";


export interface ProjectLogsDataTableProps extends AppDataTableProps<ProjectStatusLog> {
    withSearch?: boolean
}

const ProjectLogsDataTable: React.FC<ProjectLogsDataTableProps> = ({ records, isLoading, count, onChange, onQuerySearch, onPageChanges, withSearch = true, ...item }) => {
    const [page, setPage] = React.useState(1);
    const [RECORDS, setRECORDS] = React.useState<Array<ProjectStatusLog>>(records);
    const { openDeleteModal } = useConfirmModal();
    const [query, setQuery] = React.useState('');
    const [selected, setSelected] = React.useState<Project | null>(null);
    const [openForUpdate, { open: openUpdate, close: closeUpdate }] = useDisclosure(false);
    const [openForView, { open: openView, close: closeView }] = useDisclosure(false);
    const navigate = useNavigate();

    const [debouncedQuery] = useDebouncedValue(query, 200);


    React.useEffect(() => {
        setRECORDS(records)
    }, [records])

    React.useEffect(() => {
        onQuerySearch?.(debouncedQuery)
    }, [debouncedQuery])

    React.useEffect(() => {
        onPageChanges?.(page)
    }, [page])

    const deleteProject_ = React.useCallback(async (id: number) => {
        const res = await dispatch(deleteProject(id))
        if (res.meta.requestStatus == "fulfilled") {
            dispatch(onShowNotification({
                content: "Project delete with success",
                level: "SUCCESS",
                type: "role"
            }))
        } else {
            dispatch(onShowNotification({
                content: "You don't have permission to delete !",
                level: "WARNING",
                type: "role"
            }))
        }
    }, [])
    const { COLUMNS } = ProjectLogsDataTableConfig({
        actions: [
            {
                icon: IconEye,
                color: "gray",
                permission: 'can_view_project',
                action(record: ProjectStatusLog) {
                    navigate(PATH_APP.general.dashboard.projectLog.replace(":id", record.id.toString()))
                },
            },
        ]
    });

    return (
        <Box p={0} m={0}>
            {withSearch && <Group style={{ flexDirection: "column" }} align="flex-end" w={"100%"} p={"md"}>
                <TextInput
                    w={300}
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    placeholder="search project by name, members ..."
                    withErrorStyles={false}
                    leftSection={<IconSearch size={px("1.3rem")} />}
                />
            </Group>}
            <AppDataTable isLoading={isLoading} columns={COLUMNS} pageSize={DataTableConfig.MAX_PAGE_SIZE} total={count} records={RECORDS} page={page} {...item} onPageChanges={(p) => { setPage(p) }} />
        </Box>
    )
}
export default ProjectLogsDataTable;