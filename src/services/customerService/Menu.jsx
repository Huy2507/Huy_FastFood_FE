import axiosInstance from "../api/axiosInstance";

export const MenuApi = async (page = 1, search = "") => {
    try {
        const response = await axiosInstance.get(
            `/FoodList/menu-foods?page=${page}&searchTerm=${search}`,
        );
        return response;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const FoodByIdApi = async (id) => {
    try {
        const response = await axiosInstance.get(`/FoodList/${id}`);
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};
