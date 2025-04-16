import axiosInstance from "../../config/AxiosInstance";

const API_PREFIX = "permissions/"

const getAppPermissions = async () => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX,
    });
    return data
};

const permissionServices = {
    getAppPermissions,
};

export default permissionServices;