import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getFullUrl } from "../../../services/api/axiosInstance";
import { GetCartItemsApi } from "../../../services/customerService/Cart";

function Cart() {
    const [cart, setCart] = useState(null); // Lưu giỏ hàng
    const [loading, setLoading] = useState(true); // Trạng thái loading

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await GetCartItemsApi();
                setCart(response);
            } catch (error) {
                toast.error(error.message || "Có lỗi xảy ra!");
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-lg font-semibold text-gray-600">
                    Đang tải...
                </p>
            </div>
        );
    }

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-lg font-semibold text-gray-600">
                    Giỏ hàng của bạn đang trống.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-2xl font-bold text-teal-700">
                Giỏ hàng của bạn
            </h1>

            {/* Danh sách các món ăn trong giỏ hàng */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cart.cartItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col rounded-lg border border-gray-200 p-4 shadow-md"
                    >
                        {/* Hình ảnh món ăn */}
                        <img
                            src={getFullUrl(item.imageUrl)}
                            alt={item.foodName}
                            className="h-40 w-full rounded-md object-cover"
                        />

                        {/* Thông tin món ăn */}
                        <div className="mt-4 flex flex-col gap-2">
                            <h3 className="text-lg font-bold text-teal-700">
                                {item.foodName}
                            </h3>
                            <p className="text-sm text-gray-600">
                                Số lượng:{" "}
                                <span className="font-semibold">
                                    {item.quantity}
                                </span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Giá mỗi món:{" "}
                                <span className="font-semibold">
                                    {item.price.toLocaleString("vi-VN")} VND
                                </span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Tổng giá:{" "}
                                <span className="font-semibold">
                                    {item.totalPrice.toLocaleString("vi-VN")}{" "}
                                    VND
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tổng giá giỏ hàng */}
            <div className="mt-8 flex justify-end">
                <div className="text-right">
                    <p className="text-lg font-bold text-gray-700">
                        Tổng cộng:{" "}
                        <span className="text-teal-600">
                            {cart.totalPrice.toLocaleString("vi-VN")} VND
                        </span>
                    </p>
                    <button className="mt-4 rounded bg-teal-500 px-6 py-3 text-white hover:bg-teal-600">
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
