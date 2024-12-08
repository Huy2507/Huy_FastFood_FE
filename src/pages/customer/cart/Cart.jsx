import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getFullUrl } from "../../../services/api/axiosInstance";
import { GetAddressesApi } from "../../../services/customerService/Address";
import {
    AddToCartApi,
    DecreaseQuantityApi,
    DeleteCartItemApi,
    GetCartItemsApi,
} from "../../../services/customerService/Cart";
import CartItem from "./CartItem";

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses] = useState([]);
    const [note, setNote] = useState("");
    const [selectedAddress, setSelectedAddress] = useState([]);
    const [expandedItemId, setExpandedItemId] = useState(null);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await GetAddressesApi();
                setAddresses(response);
                if (response.length > 0) {
                    setSelectedAddress(
                        response.find((addr) => addr.isDefault) || response[0],
                    );
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách địa chỉ: ", error);
            }
        };
        fetchAddresses();
    }, []);

    // Hàm để tải lại dữ liệu giỏ hàng
    const updateCart = async () => {
        try {
            const response = await GetCartItemsApi();
            setCart(response);
        } catch (error) {
            toast.info(error.message || "Đăng nhập trước để xem giỏ hàng!");
            navigate("/Login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        updateCart();
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
            <div className="flex h-screen flex-col items-center justify-center">
                <p className="mb-6 text-lg font-semibold text-gray-600">
                    Giỏ hàng của bạn đang trống.
                </p>
                <Link to="/menu" className="text-teal-700 hover:scale-105">
                    Quay lại <strong>đặt hàng ?</strong>
                </Link>
            </div>
        );
    }

    // Hàm thay đổi số lượng (tăng hoặc giảm)
    const handleQuantityChange = async (itemId, delta) => {
        try {
            if (delta < 0) {
                await DecreaseQuantityApi(itemId, 1);
            } else {
                await AddToCartApi(itemId, 1);
            }

            // Sau khi thay đổi số lượng, load lại giỏ hàng
            updateCart();
        } catch (error) {
            toast.error(
                error.message || "Có lỗi xảy ra khi thay đổi số lượng!",
            );
        }
    };

    const handleDeleteCartItem = async (foodId) => {
        try {
            await DeleteCartItemApi(foodId);
            updateCart();
        } catch (error) {
            toast.error(
                error.message || "Có lỗi xảy ra khi thay đổi số lượng!",
            );
        }
    };

    const handleSelectAddress = (address) => {
        setSelectedAddress(address); // Gán giá trị đã chọn
        setDropdownOpen(false); // Đóng dropdown
    };

    const handleToggleDetails = (itemId) => {
        setExpandedItemId(expandedItemId === itemId ? null : itemId); // Toggle details
    };

    return (
        <div className="container mx-auto flex flex-col p-4 md:flex-row">
            <div className="w-full md:mr-6 md:w-1/3">
                <h1 className="mb-6 text-2xl font-bold text-teal-700">
                    Chọn địa chỉ giao hàng
                </h1>
                <div className="relative mb-4">
                    {/* Nút hiển thị lựa chọn */}
                    <button
                        className="block w-full truncate rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        onClick={() => setDropdownOpen(!dropdownOpen)} // Điều khiển dropdown
                    >
                        {selectedAddress
                            ? `${selectedAddress.street}, ${selectedAddress.ward}, ${selectedAddress.district}, ${selectedAddress.city}`
                            : "Chọn địa chỉ"}
                    </button>

                    {/* Danh sách tuỳ chọn */}
                    {dropdownOpen && (
                        <ul className="absolute z-10 mt-1 w-full rounded border border-gray-300 bg-white shadow-lg">
                            {addresses.map((address) => (
                                <li
                                    key={address.id}
                                    onClick={() => handleSelectAddress(address)}
                                    className="cursor-pointer truncate px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    title={`${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
                                >
                                    {`${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mx-auto mb-6 w-full max-w-md">
                    <h1 className="mb-6 text-2xl font-bold text-teal-700">
                        Ghi chú
                    </h1>
                    <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Nhập ghi chú của bạn..."
                        value={note}
                        onChange={(e) => {
                            setNote(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="md:w-2/3">
                <h1 className="mb-6 text-2xl font-bold text-teal-700">
                    Giỏ hàng của bạn
                </h1>

                {/* Bảng hiển thị giỏ hàng */}
                <div className="max-h-[450px] overflow-hidden overflow-y-auto rounded-lg">
                    {/* Dùng cho desktop */}
                    <table className="hidden w-full table-auto border-collapse rounded-lg border border-gray-200 text-left sm:table">
                        <thead className="sticky top-0 rounded-lg bg-teal-600 text-white shadow">
                            <tr>
                                <th className="px-4 py-2">Hình ảnh</th>
                                <th className="px-4 py-2">Tên món</th>
                                <th className="px-4 py-2">Số lượng</th>
                                <th className="px-4 py-2">Giá</th>
                                <th className="px-4 py-2">Tổng giá</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.cartItems.map((item) => (
                                <tr key={item.id} className="even:bg-gray-100">
                                    <td className="px-4 py-2">
                                        <img
                                            src={getFullUrl(item.imageUrl)}
                                            alt={item.foodName}
                                            className="h-20 w-20 rounded-md object-cover"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.foodName}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.foodId,
                                                        -1,
                                                    )
                                                }
                                                disabled={item.quantity <= 1}
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <span className="min-w-5 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.foodId,
                                                        1,
                                                    )
                                                }
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.price.toLocaleString("vi-VN")} VND
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.totalPrice.toLocaleString(
                                            "vi-VN",
                                        )}{" "}
                                        VND
                                    </td>
                                    <td className="pr-3">
                                        <button
                                            onClick={() =>
                                                handleDeleteCartItem(
                                                    item.foodId,
                                                )
                                            }
                                        >
                                            <i className="fas fa-trash-can hover:fa-shake text-2xl text-red-500"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Dùng cho mobile */}
                    <div className="space-y-4 sm:hidden">
                        {cart.cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                isExpanded={expandedItemId === item.id}
                                onToggleDetails={() =>
                                    handleToggleDetails(item.id)
                                }
                                updateCart={updateCart}
                            />
                        ))}
                    </div>
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
        </div>
    );
}

export default Cart;
