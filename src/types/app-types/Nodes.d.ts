import { ProjectComponent } from "../models/ProjectComponent";


export interface Node {
    id: string,
    type: string,
    position: { x: number, y: number },
    data: { label: string, component: ProjectComponent, status?: string },
}