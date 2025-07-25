import React from "react";
import { dispatch } from "@/redux/store";
import { recentProjects } from "@/redux/slices/projectSlice/projectSliceBaseServices";
import PageContentLayout from "@/components/ui/content-layout/PageContentLayout";
import {
    SimpleGrid,
    Group,
    Skeleton,
    Title,
} from "@mantine/core";
import useProjects from "@/hooks/useProjects";
import ProjectCard from "@/components/cards/ProjectCard";
import AppCard from "@/components/cards/AppCard";
import ProjectDataTable from "@/components/data-table/project-dataTable/ProjectDataTable";

const HomePage: React.FC = () => {
    const { projects, isLoading } = useProjects();

    const fetchRecentProjects = React.useCallback(async () => {
        await dispatch(recentProjects());
    }, []);

    React.useEffect(() => {
        fetchRecentProjects();
    }, []);

    return (
        <PageContentLayout title="Your Vibe Hub ✨">
            {isLoading ? (
                <SimpleGrid cols={4} spacing="sm">
                    {[...Array(4)].map((_, index) => (
                        <Skeleton key={index} height={200} radius="md" />
                    ))}
                </SimpleGrid>
            ) : (
                <SimpleGrid cols={4} spacing="sm">
                    {projects.slice(0, 4).map((project, idx) => (
                        <ProjectCard key={idx} project={project} />
                    ))}
                </SimpleGrid>
            )}

            <AppCard
                permission="can_view_all_project"
                withoutPadding={true}
                title={
                    <Group align="center" justify="space-between" w={"100%"}>
                        <Title order={5}>Hot Projects 🔥</Title>
                    </Group>
                }
            >
                <ProjectDataTable
                    withSearch={false}
                    height={500}
                    isLoading={isLoading}
                    records={projects}
                    count={projects.length}
                    onChange={fetchRecentProjects}
                />
            </AppCard>
        </PageContentLayout>
    );
};

export default HomePage;