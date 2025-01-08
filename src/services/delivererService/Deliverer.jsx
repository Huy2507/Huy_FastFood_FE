import axiosInstance from "../api/axiosInstance";

export const getCompletedOrders = async () => {
    try {
        const response = await axiosInstance.get("/Deliverer/orders");
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "An error occurred while fetching completed orders." };
    }
};

export const acceptOrder = async (orderId) => {
    try {
        const response = await axiosInstance.post(
            `/Deliverer/accept/${orderId}`,
        );
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "An error occurred while accepting the order." };
    }
};

export const completeOrder = async (orderId) => {
    try {
        const response = await axiosInstance.post(
            `/Deliverer/complete/${orderId}`,
        );
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "An error occurred while completing the order." };
    }
};

export const getCurrentOrders = async () => {
    try {
        const response = await axiosInstance.get("/Deliverer/CurrentOrder");
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "An error occurred while fetching completed orders." };
    }
};
