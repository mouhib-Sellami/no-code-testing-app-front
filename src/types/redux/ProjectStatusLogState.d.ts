import { ProjectStatusLog } from "../models/ProjectStatusLog";

interface ProjectStatusLogState extends BaseState {
    projectLogs: Array<ProjectStatusLog>;
    selectedProjectLogs: ProjectStatusLog;
}