import AppCard from "@/components/cards/AppCard";
import ProjectDataTable from "@/components/data-table/project-dataTable/ProjectDataTable";
import ProjectLogsDataTable from "@/components/data-table/project-logs-dataTable/ProjectLogsDataTable";
import PageContentLayout from "@/components/ui/content-layout/PageContentLayout";
import DataTableConfig from "@/config/DataTableConfig";
import usePagination from "@/hooks/app/usePagination";
import useProjectLogs from "@/hooks/useProjectLogs";
import { resetProjectStatusLogs, resetSelectedProjectLogs } from "@/redux/slices/projectSlice/projectStatusLogSlice";
import { getProjectLogs } from "@/redux/slices/projectSlice/projectStatusLogSliceBaseServices";
import { dispatch } from "@/redux/store";
import React from "react";
import { useLocation, useParams } from "react-router";

const ProjectLogs: React.FC = () => {
    const PROJECT_STATE = useProjectLogs();
    const [page, setPage] = React.useState(1);
    const [query, setQuery] = React.useState("");
    const params = useParams();

    const onPageChange = React.useCallback((p: number) => {
        setPage(p);
    }, []);

    const onSearch = React.useCallback((q: string) => {
        setPage(1);
        setQuery(q);
    }, []);

    const fetchData = React.useCallback(async () => {
        await dispatch(getProjectLogs({
            project_id: params.project_id,
            p: {
                p: page,
                page_size: DataTableConfig.MAX_PAGE_SIZE,
                search: query,
            }
        }));
    }, [page, query, params]);

    React.useEffect(() => {
        fetchData();
    }, [page, query, params]);

    React.useEffect(() => () => {
        dispatch(resetSelectedProjectLogs());
    }, []);

    return (
        <PageContentLayout title="Innovate Hub 🚀">
            <AppCard
                permission="can_view_all_project"
                withoutPadding={true}
                title="Project Pulse 🌩️"
            >
                <ProjectLogsDataTable
                    withSearch={false}
                    height={500}
                    isLoading={PROJECT_STATE.isLoading}
                    records={PROJECT_STATE.projectLogs}
                    count={PROJECT_STATE.count}
                    onChange={fetchData}
                    onPageChanges={onPageChange}
                    onQuerySearch={onSearch}
                />
            </AppCard>
        </PageContentLayout>
    );
};

export default ProjectLogs;