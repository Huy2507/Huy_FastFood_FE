import axiosInstance from "../api/axiosInstance";

// Thêm review mới
export const addReviewApi = async (review) => {
    try {
        const response = await axiosInstance.post(`/reviews`, review);
        return response.data; // Trả về dữ liệu thành công
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

// Lấy danh sách review của một món ăn
export const getReviewsByFoodApi = async (foodId) => {
    try {
        const response = await axiosInstance.get(`/reviews/food/${foodId}`);
        return response.data; // Trả về danh sách review
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};
