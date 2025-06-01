import { BaseModal } from "./BaseModel";


export interface RunnerAgent extends BaseModal {
    id: number,
    agent_key: string,
    name: string,
    last_heartbeat: Date,
    VITE_AUTH_TOKEN: string,
    description: string,
    host_machine_name: string,
    host_machine_ip: string,
    status: string,
    environment: string
}
export interface CreateUpdateRunnerAgent {
    id?: number,
    name: string,
    description: string,
    environment: string
}