import AppCard from "@/components/cards/AppCard";
import ProjectDataTable from "@/components/data-table/project-dataTable/ProjectDataTable";
import CreateProjectModal from "@/components/modals/project-modals/CreateProjectModal";
import PageContentLayout from "@/components/ui/content-layout/PageContentLayout";
import DataTableConfig from "@/config/DataTableConfig";
import PermissionGuard from "@/guards/PermissionGuard";
import useProjects from "@/hooks/useProjects";
import { fetchProjects } from "@/redux/slices/projectSlice/projectSliceBaseServices";
import { dispatch } from "@/redux/store";
import { ActionIcon, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import React from "react";

const ProjectsPage: React.FC = ({ }) => {
    const PROJECT_STATE = useProjects();
    const [opened, { open, close }] = useDisclosure();
    const [page, setPage] = React.useState(1);
    const [query, setQuery] = React.useState("");

    const fetProjectsData = React.useCallback(async () => {
        await dispatch(fetchProjects({
            p: page,
            page_size: DataTableConfig.MAX_PAGE_SIZE,
            search: query
        }))
    }, [page, query])

    React.useEffect(() => {
        fetProjectsData()
    }, [page, query])

    const onPageChanges = React.useCallback((p: number) => {
        setPage(c => c + 1)
    }, [])

    const onQuerySearch = React.useCallback((query: string) => {
        setPage(1)
        setQuery(query)
    }, [])

    return (
        <PageContentLayout title={`Projects`}>
            <AppCard
                withoutPadding={true}
                title={
                    <Group align="center" justify="space-between" w={"100%"}>
                        <Title order={5}>Projects 🪪</Title>
                        <PermissionGuard permission="can_create_user">
                            <ActionIcon onClick={() => open()} variant="filled" aria-label="Create new role">
                                <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </PermissionGuard>
                    </Group>}
            >
                <ProjectDataTable height={390} isLoading={PROJECT_STATE.isLoading} records={PROJECT_STATE.projects} count={PROJECT_STATE.count} onChange={fetProjectsData} onPageChanges={onPageChanges} onQuerySearch={onQuerySearch} />
            </AppCard>
            {opened && <CreateProjectModal visible={opened} onCancel={close} onSubmit={() => { close(); fetProjectsData() }} />}
        </PageContentLayout>
    )
}

export default ProjectsPage;