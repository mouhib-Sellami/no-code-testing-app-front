import React from "react";
import { DataTableColumn } from "mantine-datatable";
import { Badge, Text, useMantineTheme } from "@mantine/core";
import { DataTableActions } from "../base-dataTable/types";
import { AppUser } from "@/types/models/User";
import useDataTableConfig from "@/hooks/app/useDataTableConfig";

const UserDataTableConfig = (props: DataTableActions<AppUser>) => {
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
                accessor: "username", title: "Username",
                width: "10%"
            },
            {
                accessor: "email", title: "Email",
                width: "10%"
            },
            {
                accessor: "first_name", title: "First name",
                width: "10%"
            },
            {
                accessor: "last_name", title: "Last name",
                width: "10%"
            },
            {
                accessor: "role", title: "Role",
                width: "10%",
                render: (user: any) => (
                    <Badge>
                        {user.role.slug || user.role.name}
                    </Badge>
                )
            },
            {
                accessor: 'is_active', title: "Active", width: '10%', textAlign: 'center',
                render: (user) => (
                    <Badge color={user.is_active ? 'green' : 'red'}>
                        {user.is_active ? 'Active' : 'deactivated'}
                    </Badge>
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


export default UserDataTableConfig;