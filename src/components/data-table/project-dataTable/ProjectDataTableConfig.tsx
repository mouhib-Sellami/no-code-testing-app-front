import React from "react";
import { DataTableColumn } from "mantine-datatable";
import { DataTableActions } from "../base-dataTable/types";
import useDataTableConfig from "@/hooks/app/useDataTableConfig";
import useAppHooks from "@/hooks/useAppHooks";
import { Project } from "@/types/models/Project";
import { Pill } from "@mantine/core";

const ProjectDataTableConfig = (props: DataTableActions<Project>) => {
    const { generateActions, PAGE_SIZE } = useDataTableConfig();
    const { formateDate } = useAppHooks();
    const ACTIONS = React.useMemo(() => {
        return props.actions
    }, [props])



    const BASE_COLUMNS: Array<DataTableColumn> = React.useMemo(() => {
        return [
            {
                accessor: "id",
                title: "#",
                width: "5%",
                textAlign: "center",
                render(_, index) {
                    return (
                        index + 1
                    )
                }
            },
            {
                accessor: "name", title: "Name",
                width: "10%"
            },
            {
                accessor: "managed_by.username", title: "Managed by",
                width: "10%"
            },
            {
                accessor: "provider?.name", title: "Provider",
                width: "10%"
            },
            {
                accessor: "status", title: "Status",
                width: "10%",
                render: (record: any) => (
                    <Pill> {record.status}</Pill>
                )
            },
            {
                accessor: "updated_at", title: "Last update",
                width: "15%",
                render: (record: any) => (
                    formateDate(record.updated_at)
                )
            },

        ]
    }, [props])

    const COLUMNS = React.useMemo(() => {
        if (ACTIONS && ACTIONS.length > 0) {
            const actions = generateActions(ACTIONS, '15%');
            if (actions) {
                if (props.order != null) {
                    BASE_COLUMNS.splice(props.order - 1, 0, actions as DataTableColumn)
                } else {
                    BASE_COLUMNS.push(actions as DataTableColumn)
                }
            }
        }
        return BASE_COLUMNS
    }, [props, ACTIONS, BASE_COLUMNS, props])

    return {
        COLUMNS,
        PAGE_SIZE
    }
}


export default ProjectDataTableConfig;