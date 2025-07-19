import { RunnerAgent } from "../models/RunningAgent";


export interface AgentRunnerState extends BaseState {
    runners: Array<RunnerAgent>,
    count: number
}