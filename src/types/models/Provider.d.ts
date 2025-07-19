import { BaseModal } from "./BaseModel";

export interface Provider extends BaseModal {
    id: number,
    name: string,
    version: string,
    image: string,
    initial_config: Record,
    extra_download_assets: string,
    is_active: boolean,
    categories: Array<number>,
    dependencies: Array<number>

}

export interface Kwarg {
    label: string,
    value: string
}
export interface Component extends BaseModal {
    id: number,
    is_function: boolean,
    name: string,
    module: string,
    is_default: boolean,
    action_name: string,
    extra_arguments: Array<Kwarg>,
    default_arguments: Array<Kwarg>,
    builder_config: any,
    type: 'input' | 'output' | 'input-output',
    status?: string
}
export interface Category extends BaseModal {
    id: number,
    name: string,
    components: Array<Component>
}
export interface ProviderDetails extends BaseModal {
    id: number,
    name: string,
    version: string,
    image: string,
    initial_config: Record,
    extra_download_assets: string,
    is_active: boolean,
    categories: Array<Category>,
}