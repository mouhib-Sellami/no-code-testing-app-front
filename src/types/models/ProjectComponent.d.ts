import { Component } from "./Provider";


export interface ProjectComponent extends Component {
    project: number,
    builder_config: any
}

export interface CreateProjectComponent {
    project_id: number,
    component_id: number,
    extra_data: Object,
    test_case_id: number
}

export interface CreateEdge {
    source_component: number,
    target_component: number,
    dependency_type: "DEPENDENCY" | "RUN_AFTER" | string
}