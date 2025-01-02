import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

export const AddToCartApi = async (foodId, quantity) => {
    try {
        const response = await axiosInstance.post("/Cart/add-to-cart", {
            foodId,
            quantity,
        });
        if (response.status >= 200 && response.status < 300) {
            if (response.status === 204) {
                return;
            } else {
                // Nếu có dữ liệu trả về, thông báo thành công
                toast.success("Thêm món ăn vào giỏ hàng thành công!");
            }
        }
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const AddToCartFromFoodDetailsApi = async (foodId, quantity) => {
    try {
        const response = await axiosInstance.post(
            "/Cart/add-to-cart-from-food-details",
            {
                foodId,
                quantity,
            },
        );
        if (response.status >= 200 && response.status < 300) {
            if (response.status === 204) {
                return;
            } else {
                // Nếu có dữ liệu trả về, thông báo thành công
                toast.success("Thêm món ăn vào giỏ hàng thành công!");
            }
        }
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const DecreaseQuantityApi = async (foodId, quantity) => {
    try {
        const response = await axiosInstance.put("/Cart/decrease-quantity", {
            foodId,
            quantity,
        });
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

export const DeleteCartItemApi = async (foodId) => {
    try {
        const response = await axiosInstance.delete(
            `/Cart/remove-item/${foodId}`,
            {},
        );
        toast.success(response.message);
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};
