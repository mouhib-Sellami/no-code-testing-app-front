import { BaseModal } from "./BaseModel"

export interface CreateTestEdge {
    source_component: number,
    target_component: number,
    dependency_type: "PRECONDITION" | "RUN_AFTER" | string
}


export interface CreateUpdateTestCase {
    id?: number,
    project: number,
    name: string,
    is_reference: boolean
}

export interface TestCase extends BaseModal {
    id: number,
    project: number,
    name: string,
    is_reference: boolean
}


export interface FlowTestComponent extends TestCase {
    builder_config: any
}