import axiosInstance from "../../config/AxiosInstance";

const API_PREFIX = "providers/"

const fetchProviders = async () => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX,
    });
    return data
};

const getProviderComponents = async (id: number) => {
    const { data } = await axiosInstance({
        method: "GET",
        url: API_PREFIX + `${id}/`,
    });
    return data
};

const providerServices = {
    fetchProviders,
    getProviderComponents
};

export default providerServices;