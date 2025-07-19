import { Role } from "@/types/models/Role";
import axiosInstance from "../../config/AxiosInstance";
import { paginationRequestParams } from "@/types/requests/PaginationRequestParams";

const API_PREFIX = "roles/"

const fetchRoles = async (params: paginationRequestParams) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX,
        params
    });
    return data
};

const createRole = async (role: Role) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX,
        data: role
    });
    return data
};

const updateRole = async (role: Role) => {
    const { data } = await axiosInstance({
        method: "PUT",
        url: API_PREFIX + `${role.id}/`,
        data: role
    });
    return data
};

const deleteRole = async (id: number) => {
    const { data } = await axiosInstance({
        method: "DELETE",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const roleServices = {
    fetchRoles,
    createRole,
    deleteRole,
    updateRole
};

export default roleServices;