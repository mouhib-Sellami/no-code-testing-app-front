import { Organization } from "./Organization";
import { Role } from "./Role";

export interface User {
    id: number;
    email: string;
    username: string;
    email: string;
    full_name: string;
    is_active?: boolean;
    profession: string;
    role?: Role;
    organization?: Organization;
}

export interface createUpdateUser {
    id?: number,
    user: {
        username: string,
        email: string
    }
    first_name: string,
    last_name: string,
    profession: string
}

export interface AppUser {
    id: number;
    email: string;
    username: string;
    email: string;
    full_name: string;
    profession: string;
    is_active?: boolean;
    role?: Role;
    create_at: Date,
    updated_at: Date
}