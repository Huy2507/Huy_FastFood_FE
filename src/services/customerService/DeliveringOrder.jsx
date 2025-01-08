import axiosInstance from "../api/axiosInstance";

export const getCustomerOrders = async () => {
    try {
        const response = await axiosInstance.get("/Order/DeliveringOrder");
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "An error occurred while fetching orders." };
    }
};
