import axiosInstance from "../../config/AxiosInstance";

const API_PREFIX = "domains/"

const check_domain = async () => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + "retrieve/",
    });
    return data
};

const domainServices = {
    check_domain
}

export default domainServices;