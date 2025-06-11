import { Project } from "../models/Project";
import { ProjectComponent } from "../models/ProjectComponent";
import { Permission } from "../models/Role";
import { TestCase } from "../models/TestCase";
import { TestFlow } from "../models/TestFlow";

export interface ProjectState extends BaseState {
    projects: Array<Project>;
    count: number;
    selectedProject?: Project,
    projectComponents: Array<ProjectComponent>,
    projectTests: Array<TestCase>,
    projectFlows: Array<TestFlow>,
    isLoadingForRunning: boolean,
    isLoadingFlows: boolean,
    isLoadingTests: boolean
}