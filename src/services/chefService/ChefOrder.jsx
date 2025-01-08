import axiosInstance from "../api/axiosInstance";

// Lấy tất cả đơn hàng có trạng thái "Pending"
export const ChefGetPendingOrders = async () => {
    try {
        const response = await axiosInstance.get("/ChefOrder/orders");
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

// Cập nhật trạng thái của đơn hàng
export const ChefUpdateOrderStatus = async (orderId, newStatus) => {
    try {
        const response = await axiosInstance.put(
            `/ChefOrder/orders/${orderId}/status`,
            newStatus,
            {
                headers: {
                    "Content-Type": "application/json", // Dữ liệu dạng JSON
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
