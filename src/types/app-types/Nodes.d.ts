import { ProjectComponent } from "../models/ProjectComponent";
import { FlowTestComponent } from "../models/TestCase";


export interface Node {
    id: string,
    type: string,
    position: { x: number, y: number },
    data: { label: string, component: ProjectComponent, status?: string },
}

export interface TestNode {
    id: string,
    type: string,
    position: { x: number, y: number },
    data: { label: string, component: FlowTestComponent, status?: string },
}