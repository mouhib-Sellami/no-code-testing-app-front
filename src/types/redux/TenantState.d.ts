import { Organization } from "../models/Organization";

export interface TenantState {
    is_valid: boolean,
    is_loading: boolean,
    tenant: Organization | null
}