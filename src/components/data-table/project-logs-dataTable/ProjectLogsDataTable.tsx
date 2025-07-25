import React from "react";
import DataTableConfig from "@/config/DataTableConfig";
import { Box, Group, px, TextInput } from "@mantine/core";
import AppDataTable from "../base-dataTable/AppDataTable";
import { AppDataTableProps } from "../base-dataTable/types";
import { IconEye, IconSearch } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import ProjectLogsDataTableConfig from "./ProjectLogsDataTableConfig";
import { useNavigate } from "react-router";
import { PATH_APP } from "@/routes/paths";
import { ProjectStatusLog } from "@/types/models/ProjectStatusLog";


export interface ProjectLogsDataTableProps extends AppDataTableProps<ProjectStatusLog> {
    withSearch?: boolean
}

const ProjectLogsDataTable: React.FC<ProjectLogsDataTableProps> = ({ records, isLoading, count, onChange, onQuerySearch, onPageChanges, withSearch = true, ...item }) => {
    const [page, setPage] = React.useState(1);
    const [RECORDS, setRECORDS] = React.useState<Array<ProjectStatusLog>>(records);
    const [query, setQuery] = React.useState('');
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