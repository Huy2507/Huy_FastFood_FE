import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

export const CreateOrderApi = async (
    addressId,
    note,
    amount,
    PaymentMethod,
) => {
    try {
        // Tạo đơn hàng trước
        const orderResponse = await axiosInstance.post("/Order/create-order", {
            addressId,
            note,
            PaymentMethod,
        });

        toast.success(orderResponse.message || "Đặt hàng thành công.");

        const orderInfo = orderResponse.data.orderId;
        if (PaymentMethod === "VNPay") {
            // Gọi API VNPay để tạo URL thanh toán
            const paymentResponse = await axiosInstance.post(
                "/v1/vnpay/create-payment",
                null,
                {
                    params: { amount, orderInfo },
                },
            );

            // Redirect đến trang thanh toán của VNPay
            if (paymentResponse.data.paymentUrl) {
                window.location.href = paymentResponse.data.paymentUrl;
                console.log("aa", paymentResponse.data.paymentUrl);
            } else {
                throw { message: "Không thể tạo URL thanh toán VNPay" };
            }
        }

        return orderResponse.data;
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
