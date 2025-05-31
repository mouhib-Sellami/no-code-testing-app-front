import { Project } from "../models/Project";
import { ProjectComponent } from "../models/ProjectComponent";
import { Permission } from "../models/Role";

export interface ProjectState extends BaseState {
    projects: Array<Project>;
    count: number;
    selectedProject?: Project,
    projectComponents: Array<ProjectComponent>,
    isLoadingForRunning: boolean
}