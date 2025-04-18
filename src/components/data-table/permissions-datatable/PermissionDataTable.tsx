import React from "react";
import DataTableConfig from "@/config/DataTableConfig";
import { Box } from "@mantine/core";
import AppDataTable from "../base-dataTable/AppDataTable";
import PermissionDataTableConfig from "./PermissionDataTableConfig";
import { AppDataTableProps } from "../base-dataTable/types";
import { Permission } from "@/types/models/Role";

const PermissionDataTable: React.FC<AppDataTableProps<Permission>> = ({ records, isLoading, count, ...item }) => {
    const [page, setPage] = React.useState(1);
    const [RECORDS, setRECORDS] = React.useState(records.slice(0, DataTableConfig.MAX_PAGE_SIZE));
    const { COLUMNS } = PermissionDataTableConfig({});


    React.useEffect(() => {
        const from = (page - 1) * DataTableConfig.MAX_PAGE_SIZE;
        const to = from + DataTableConfig.MAX_PAGE_SIZE;
        setRECORDS(records.slice(from, to));
    }, [page, DataTableConfig.MAX_PAGE_SIZE, records]);

    return (
        <Box p={0} m={0}>
            <AppDataTable isLoading={isLoading} columns={COLUMNS} pageSize={DataTableConfig.MAX_PAGE_SIZE} total={count} records={RECORDS} page={page} {...item} onPageChanges={(p) => { setPage(p) }} />
        </Box>
    )
}
export default PermissionDataTable;