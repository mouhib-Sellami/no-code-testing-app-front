import React from "react";
import { DataTableColumn } from "mantine-datatable";
import { ActionIcon, Badge, Center, Collapse, Group, ScrollArea, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import { DataTableActions } from "../base-dataTable/types";
import { Role } from "@/types/models/Role";

const RoleDataTableConfig = (props: DataTableActions<Role>) => {
    const { colors } = useMantineTheme();
    const PAGE_SIZE = React.useMemo(() => {
        return 25
    }, []);

    const ACTIONS = React.useMemo(() => {
        return props.actions
    }, [props])

    const generateActions = React.useCallback(() => {
        if (!ACTIONS)
            return null;
        return {
            accessor: 'Actions',
            title: "Actions",
            textAlign: 'center',
            width: '10%',
            render: (record: any) => {
                return (
                    <Group align="center" justify="center" gap={10}>
                        {ACTIONS?.map((elm, idx) => {
                            return (
                                <ActionIcon onClick={() => { elm.action(record) }} variant="transparent" key={idx}>
                                    <elm.icon color={elm.color || colors.primary[0]}></elm.icon>
                                </ActionIcon>
                            )
                        })}
                    </Group>
                )
            }
        }
    }, [ACTIONS])

    const BASE_COLUMNS: Array<DataTableColumn> = React.useMemo(() => {
        return [
            {
                accessor: "id",
                title: "#",
                width: "5%",
                textAlign: "center",
                render(_, index) {
                    return (
                        <Text ta={"center"} > {index + 1}</Text >
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
            const actions = generateActions();
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