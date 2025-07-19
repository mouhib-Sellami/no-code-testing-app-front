import { BaseModal } from "./BaseModel";
import { Provider } from "./Provider";
import { User } from "./User";


export interface Project extends BaseModal {
    id: number,
    name: string,
    description: string,
    members: Array<User>,
    managed_by: User,
    provider: Provider,
    status: string
}

export interface CreateUpdateProject {
    id?: number,
    name: string,
    description: string,
    members: Array<number>,
    managed_by: number,
    provider: number
}