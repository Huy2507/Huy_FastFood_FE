import axiosInstance from "../api/axiosInstance";

export const GetAddressesApi = async () => {
    try {
        const response = await axiosInstance.get("/MyAddress/addresses");
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};
