import React from "react";
import { DataTableColumn } from "mantine-datatable";
import { Pill } from "@mantine/core";
import { DataTableActions } from "../base-dataTable/types";
import useDataTableConfig from "@/hooks/app/useDataTableConfig";
import useAppHooks from "@/hooks/useAppHooks";
import { ProjectStatusLog } from "@/types/models/ProjectStatusLog";

const ProjectLogsDataTableConfig = (props: DataTableActions<ProjectStatusLog>) => {
    const { generateActions, PAGE_SIZE } = useDataTableConfig();
    const { formateDate } = useAppHooks();

    const ACTIONS = React.useMemo(() => props.actions, [props.actions]);

    const BASE_COLUMNS: Array<DataTableColumn> = React.useMemo(
        () => [
            {
                accessor: "id",
                title: "#",
                width: "5%",
                textAlign: "center",
                render: (_, index) => index + 1,
            },
            {
                accessor: "project?.name",
                title: "Project Name",
                width: "15%",
                render: (record: any) => record.project??.name || "N/A",
            },
            {
                accessor: "project.managed_by.username",
                title: "Managed by",
                width: "15%",
                render: (record: any) => record.project?.managed_by?.username || "N/A",
            },
            {
                accessor: "project.provider?.name",
                title: "Provider",
                width: "15%",
                render: (record: any) => record.project?.provider??.name || "N/A",
            },
            {
                accessor: "new_status",
                title: "Status",
                width: "15%",
                render: (record: any) => <Pill>{record.new_status || "N/A"}</Pill>,
            },
            {
                accessor: "updated_at",
                title: "Last Update",
                width: "20%",
                render: (record: any) => formateDate(record.updated_at.toString()) || "N/A",
            },
        ],
        []
    );

    const COLUMNS = React.useMemo(() => {
        const columns = [...BASE_COLUMNS];
        if (ACTIONS?.length > 0) {
            const actions = generateActions(ACTIONS, "15%");
            if (actions) {
                if (props.order != null && props.order >= 0 && props.order <= columns.length) {
                    columns.splice(props.order, 0, actions as DataTableColumn);
                } else {
                    columns.push(actions as DataTableColumn);
                }
            }
        }
        return columns;
    }, [ACTIONS, BASE_COLUMNS, props.order]);

    return {
        COLUMNS,
        PAGE_SIZE,
    };
};

export default ProjectLogsDataTableConfig;