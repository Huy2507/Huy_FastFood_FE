import axiosInstance from "../api/axiosInstance";

export const ListBanner = async () => {
    const response = await axiosInstance.get("/Home/banner");
    return response.data;
};

export const ListCategoryApi = async (page = 1) => {
    const response = await axiosInstance.get(
        `/Home/GetPagedCategories?page=${page}`,
    );
    return response.data;
};

export const FavoriteFoodApi = async () => {
    const data = await axiosInstance.get("/Home/favorites");
    return data;
};
