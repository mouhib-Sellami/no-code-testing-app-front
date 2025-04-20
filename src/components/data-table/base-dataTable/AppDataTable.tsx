import React from "react";
import { DataTable } from "mantine-datatable";
import classes from "./style.module.css";
import { Box, useMantineTheme } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";
import { CustomDataTableProps } from "./types";

const AppDataTable: React.FC<CustomDataTableProps> = (props) => {
    const { columns, pageSize, records, total, page, onPageChanges, isLoading, ...defaultProps } = props;
    const theme = useMantineTheme();

    return (
        <Box p={0} bg={"transparent"} m={0}>
            <DataTable
                fetching={isLoading}
                withTableBorder
                withRowBorders
                highlightOnHover
                horizontalSpacing="xs"
                verticalAlign="center"
                striped
                records={records}
                columns={columns}
                totalRecords={total}
                recordsPerPage={pageSize}
                page={page}
                onPageChange={onPageChanges}
                loadingText="Loading ..."
                noRecordsText="No data found"
                styles={{
                    table: {
                        backgroundColor: theme.colors.mainContentColor[9],
                    },
                    header: {
                        backgroundColor: theme.colors.mainContentColor[9],
                    },
                    root: {
                        backgroundColor: theme.colors.mainContentColor[9],
                        borderRight: "none",
                        borderLeft: "none",
                        borderBottom: "none",
                    }
                }}
                noRecordsIcon={
                    <Box p={4} mb={4} className={classes.noRecordsBox}>
                        <IconMoodSad size={36} strokeWidth={1.5} />
                    </Box>
                }
                scrollAreaProps={{ type: 'never' }}
                w={"100%"}
                {...defaultProps}
            />
        </Box>

    )
}

export default AppDataTable;
