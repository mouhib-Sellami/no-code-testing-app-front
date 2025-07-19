import { Role } from "../models/Role";

interface RoleState extends BaseState {
    roles: Array<Role>;
    count: number
}