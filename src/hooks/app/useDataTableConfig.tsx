import { DataTableActionType } from "@/components/data-table/base-dataTable/types";
import DataTableConfig from "@/config/DataTableConfig";
import PermissionGuard from "@/guards/PermissionGuard";
import { ActionIcon, Group, useMantineTheme } from "@mantine/core";
import React from "react";

const useDataTableConfig = () => {
    const { colors } = useMantineTheme();

    const PAGE_SIZE = React.useMemo(() => {
        return DataTableConfig.MAX_PAGE_SIZE
    }, []);

    const generateActions = React.useCallback((ACTIONS: Array<DataTableActionType<any>>, width = '10%') => {
        if (!ACTIONS)
            return null;
        return {
            accessor: 'Actions',
            title: "Actions",
            textAlign: 'center',
            width: width,
            render: (record: any) => {
                return (
                    <Group align="center" justify="center" gap={10}>
                        {ACTIONS?.map((elm, idx) => {
                            return (
                                <PermissionGuard permission={elm.permission || "PUBLIC"} key={idx}>
                                    <ActionIcon onClick={() => { elm.action(record) }} variant="transparent">
                                        <elm.icon color={elm.color || colors.primary[0]}></elm.icon>
                                    </ActionIcon>
                                </PermissionGuard>
                            )
                        })}
                    </Group>
                )
            }
        }
    }, [])



    return {
        generateActions,
        PAGE_SIZE
    }
}

export default useDataTableConfig;