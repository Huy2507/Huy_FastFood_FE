import axiosInstance from "../api/axiosInstance";

export const AdminGetAllFood = async ({ search, enable, isPopular }) => {
    try {
        const params = {};
        if (search) params.search = search;
        if (enable) params.enable = enable;
        if (isPopular) params.isPopular = isPopular;

        const response = await axiosInstance.get("/AdminFood", { params });
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const AdminGetFoodById = async (foodId) => {
    try {
        const response = await axiosInstance.get(`/AdminFood/${foodId}`);
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const AdminCreateFood = async (foodData) => {
    try {
        const response = await axiosInstance.post("/AdminFood", foodData, {
            headers: {
                "Content-Type": "multipart/form-data", // Ensure this is set
            },
        });
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const AdminUpdateFood = async (foodId, foodData) => {
    try {
        const response = await axiosInstance.put(
            `/AdminFood/${foodId}`,
            foodData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Ensure this is set
                },
            },
        );
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};
