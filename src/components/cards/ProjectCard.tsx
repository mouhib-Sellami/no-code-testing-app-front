import { Project } from "@/types/models/Project";
import { Avatar, Group, Pill, Text } from "@mantine/core";
import React from "react";
import OverlapCard from "./OverlapCard";


export interface ProjectCardProps {
    project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = (props) => {
    const { project, ...item } = props;
    return (

        <OverlapCard title={project.name}>
            <Text size="sm" c="dimmed" mb="sm" lineClamp={2}>
                {project.description || "No description available"}
            </Text>
            <Group gap="xs" mb="sm">
                <Avatar
                    size="sm"
                    radius="xl"
                    name={`${project.managed_by.first_name} ${project.managed_by.last_name}`}
                />
                <Text size="sm" truncate>
                    {project.managed_by.first_name} {project.managed_by.last_name}
                </Text>
            </Group>
            <Pill
                variant="light"
                size="sm"
            >
                {project.status}
            </Pill>
        </OverlapCard>
    )

};

export default ProjectCard;