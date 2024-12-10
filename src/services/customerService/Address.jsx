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

export const AddAddressesApi = async (formData) => {
    try {
        const response = await axiosInstance.post(
            "/MyAddress/addresses",
            formData,
        );
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const UpdateAddressesApi = async (id, formData) => {
    try {
        const response = await axiosInstance.put(
            `/MyAddress/addresses/${id}`,
            formData,
        );
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const DeleteAddressesApi = async (id) => {
    try {
        const response = await axiosInstance.delete(
            `/MyAddress/addresses/${id}`,
        );
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};
