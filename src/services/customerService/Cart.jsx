import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

export const AddToCartApi = async (foodId, quantity) => {
    try {
        const response = await axiosInstance.post("/Cart/add-to-cart", {
            foodId,
            quantity,
        });
        if (response.status === 200) {
            toast.success("Thêm món ăn vào giỏ hàng thành công!");
        }
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const GetCartItemsApi = async () => {
    try {
        const response = await axiosInstance.get("/Cart/cart-items");
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};
