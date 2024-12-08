import axiosInstance from "../api/axiosInstance";

export const ListBanner = async () => {
    try {
        const response = await axiosInstance.get("/Home/banner");
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const ListCategoryApi = async (page = 1) => {
    try {
        const response = await axiosInstance.get(
            `/Home/GetPagedCategories?page=${page}`,
        );
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const FavoriteFoodApi = async () => {
    try {
        const data = await axiosInstance.get("/Home/favorites");
        return data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const RecentFoodsApi = async () => {
    try {
        const response = await axiosInstance.get("/Home/recent-orders");
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};
