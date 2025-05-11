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