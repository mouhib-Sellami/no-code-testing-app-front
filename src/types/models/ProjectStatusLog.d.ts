import { BaseModal } from "./BaseModel";
import { Project } from "./Project";


export interface ProjectStatusLog extends BaseModal {
    project: Project,
    workflow: any,
    failure_reason: string,
    new_status: string,
    old_status: string,
    agent_key: string
}