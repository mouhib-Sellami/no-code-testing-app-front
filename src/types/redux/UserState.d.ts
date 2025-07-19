import { Role } from "../models/Role";
import { AppUser } from "../models/User";

interface UserState extends BaseState {
    users: Array<AppUser>;
    count: number
}