import axiosInstance from "../api/axiosInstance";

export const MenuApi = async (page = 1, search = "") => {
    const response = await axiosInstance.get(
        `/FoodList/menu-foods?page=${page}&searchTerm=${search}`,
    );
    return response;
};
