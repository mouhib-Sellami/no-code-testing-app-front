import axiosInstance from "@/config/AxiosInstance";


const API_PREFIX = "auth/"

const login = async (user: UserAuth) => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX + "login/",
        data: user,
    });
    return data
};

const logout = async () => {
    const { data } = await axiosInstance({
        method: "POST",
        url: API_PREFIX + "logout/",
    });
    return data
};

const retrieve = async () => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + "retrieve/",
    });
    return data
};


const authServices = {
    login,
    logout,
    retrieve
};

export default authServices;