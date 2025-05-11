import { BaseModal } from "./BaseModel";
import { User } from "./User";


export interface Project extends BaseModal {
    id: number,
    name: string,
    description: string,
    members: Array<User>,
    managed_by: User,
    provider: any
}

export interface CreateUpdateProject {
    id?: number,
    name: string,
    description: string,
    members: Array<number>,
    managed_by_id: number,
    provider_id: number
}