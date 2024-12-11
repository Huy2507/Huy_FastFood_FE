import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

export const CreateOrderApi = async (addressId, note) => {
    try {
        const response = await axiosInstance.post("/Order/create-order", {
            addressId,
            note,
        });
        toast.success(response.message || "Đặt hàng thành công.");
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const GetCustomerOrdersApi = async () => {
    try {
        const response = await axiosInstance.get("/Order/orders");
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};
