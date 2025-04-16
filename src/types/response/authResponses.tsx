import { Organization } from "../models/Organization";
import { Role } from "../models/Role";
import { User } from "../models/User";

export interface loginResponse {
    token: string,
    user: User,
    organization: Organization,
    role: Role
}