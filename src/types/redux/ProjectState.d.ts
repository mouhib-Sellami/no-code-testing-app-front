import { Project } from "../models/Project";
import { Permission } from "../models/Role";

export interface ProjectState extends BaseState {
    projects: Array<Project>;
    count: number;
}