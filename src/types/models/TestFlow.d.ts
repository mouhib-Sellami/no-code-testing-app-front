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


export interface CreateProjectTestFlowComponent {
    flow_id: number,
    test_case_id: number,
    extra_data: Object
}

export interface CreateTestFlowEdge {
    source_component: number,
    target_component: number,
}