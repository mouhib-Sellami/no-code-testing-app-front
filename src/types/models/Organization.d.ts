import { Domain } from "./Domain";


export interface Organization {
    id: number,
    name: string,
    slug: string,
    domain: Domain,
}