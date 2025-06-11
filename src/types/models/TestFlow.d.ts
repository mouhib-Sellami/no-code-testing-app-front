import { BaseModal } from "./BaseModel"

export interface TestFlow extends BaseModal {
    id: number,
    name: string
}

export interface CreateUpdateTestFlow {
    id?: number,
    name: string,
    project: number
}
