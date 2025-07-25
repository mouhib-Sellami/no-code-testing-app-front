import React from "react";
import { DataTableColumn } from "mantine-datatable";
import { Badge, Center, useMantineTheme } from "@mantine/core";
import { DataTableActions } from "../base-dataTable/types";
import { Role } from "@/types/models/Role";
import useDataTableConfig from "@/hooks/app/useDataTableConfig";

const RoleDataTableConfig = (props: DataTableActions<Role>) => {
    const { colors } = useMantineTheme();
    const { generateActions, PAGE_SIZE } = useDataTableConfig();

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
                width: "20%"
            },
            {
                accessor: "slug", title: "slug",
                width: "10%"
            },
            {
                accessor: 'permissions', title: "Permissions", textAlign: 'center',
                width: "10%",
                render: (role: Role) => (
                    <Center w={"100%"} h={"100%%"}>
                        <Badge>{role.permissions.length} permissions</Badge>
                    </Center>
                )
            },
            {
                accessor: 'active', title: "Active", width: '10%', textAlign: 'center',
                render: (role: Role) => (
                    <Badge color={role.active ? 'green' : 'red'}>
                        {role.active ? 'Active' : 'deactivated'}
                    </Badge>
                )
            },

        ]
    }, [props])

    const COLUMNS = React.useMemo(() => {
        if (ACTIONS && ACTIONS.length > 0) {
            const actions = generateActions(ACTIONS);
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


export default RoleDataTableConfig;