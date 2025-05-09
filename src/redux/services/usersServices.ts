import { createUpdateUser, User } from "@/types/models/User";
import axiosInstance from "../../config/AxiosInstance";
import { paginationRequestParams } from "@/types/requests/PaginationRequestParams";

const API_PREFIX = "users/"

const fetchUsers = async (p: paginationRequestParams) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX,
        params: p
    });
    return data
};

const createUser = async (user: createUpdateUser) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX,
        data: user
    });
    return data
};

const updateUser = async (user: createUpdateUser) => {
    const { data } = await axiosInstance({
        method: "PUT",
        url: API_PREFIX + `${user.id}/`,
        data: user
    });
    return data
};

const deleteUser = async (id: number) => {
    const { data } = await axiosInstance({
        method: "DELETE",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const requestChangePassword = async (id: number) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `${id}/request-change-user-password/`,
    });
    return data
};

const userServices = {
    fetchUsers,
    createUser,
    deleteUser,
    updateUser,
    requestChangePassword
};

export default userServices;