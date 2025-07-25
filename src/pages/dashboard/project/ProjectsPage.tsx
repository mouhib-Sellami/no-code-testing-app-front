import AppCard from "@/components/cards/AppCard";
import ProjectDataTable from "@/components/data-table/project-dataTable/ProjectDataTable";
import CreateProjectModal from "@/components/modals/project-modals/CreateProjectModal";
import PageContentLayout from "@/components/ui/content-layout/PageContentLayout";
import PermissionGuard from "@/guards/PermissionGuard";
import usePagination from "@/hooks/app/usePagination";
import useProjects from "@/hooks/useProjects";
import { fetchProjects } from "@/redux/slices/projectSlice/projectSliceBaseServices";
import { ActionIcon, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import React from "react";

const ProjectsPage: React.FC = () => {
    const PROJECT_STATE = useProjects();
    const [opened, { open, close }] = useDisclosure();
    const { onPageChange, onSearch, fetchData, reset } = usePagination(fetchProjects);

    return (
        <PageContentLayout title="Creative Cosmos ✨">
            <AppCard
                permission="can_view_all_project"
                withoutPadding={true}
                title={
                    <Group align="center" justify="space-between" w={"100%"}>
                        <Title order={5}>Project Sparks ⚡</Title>
                        <PermissionGuard permission="can_create_project">
                            <ActionIcon onClick={() => open()} variant="filled" aria-label="Ignite new project">
                                <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </PermissionGuard>
                    </Group>
                }
            >
                <ProjectDataTable
                    height={500}
                    isLoading={PROJECT_STATE.isLoading}
                    records={PROJECT_STATE.projects}
                    count={PROJECT_STATE.count}
                    onChange={fetchData}
                    onPageChanges={onPageChange}
                    onQuerySearch={onSearch}
                />
            </AppCard>
            {opened && <CreateProjectModal visible={opened} onCancel={close} onSubmit={() => { close(); fetchData(); reset() }} />}
        </PageContentLayout>
    );
};

export default ProjectsPage;