export type Role = {
    id?: number,
    name: string,
    slug?: string,
    active?: boolean,
    permissions: Array<Permission>
}

export type Permission = {
    id?: number,
    label: string
}