import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getFullUrl } from "../../../services/api/axiosInstance";
import {
    AddToCartApi,
    DecreaseQuantityApi,
    DeleteCartItemApi,
} from "../../../services/customerService/Cart";

function CartItem({ item, isExpanded, onToggleDetails, updateCart }) {
    const handleQuantityChange = async (delta) => {
        try {
            if (delta < 0) {
                await DecreaseQuantityApi(item.foodId, 1);
            } else {
                await AddToCartApi(item.foodId, 1);
            }
            updateCart(); // Reload cart after updating quantity
        } catch (error) {
            toast.error(
                error.message || "Có lỗi xảy ra khi thay đổi số lượng!",
            );
        }
    };

    const handleDeleteCartItem = async () => {
        try {
            await DeleteCartItemApi(item.foodId);
            updateCart(); // Reload cart after deleting item
        } catch (error) {
            toast.error(
                error.message || "Có lỗi xảy ra khi thay đổi số lượng!",
            );
        }
    };

    return (
        <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div
                className="flex items-center space-x-4"
                onClick={onToggleDetails}
            >
                <img
                    src={getFullUrl(item.imageUrl)}
                    alt={item.foodName}
                    className="h-20 w-20 rounded-md object-cover"
                />
                <div className="flex-1">
                    <p className="text-lg font-semibold">{item.foodName}</p>
                    <p className="text-sm text-gray-600">
                        Số lượng: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                        Giá:{" "}
                        <span className="font-semibold text-teal-600">
                            {item.price.toLocaleString("vi-VN")} VND
                        </span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Tổng:{" "}
                        <span className="font-semibold text-teal-600">
                            {item.totalPrice.toLocaleString("vi-VN")} VND
                        </span>
                    </p>
                </div>
            </div>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                } mt-4 space-y-2`}
            >
                <div className="mb-4 flex items-center justify-between">
                    <button
                        className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={item.quantity <= 1}
                    >
                        <i className="fas fa-minus"></i>
                    </button>
                    <span>{item.quantity}</span>
                    <button
                        className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
                        onClick={() => handleQuantityChange(1)}
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
                <button
                    onClick={handleDeleteCartItem}
                    className="mt-2 w-full border-4 border-red-500 text-red-500 hover:underline"
                >
                    <i className="fas fa-trash-can text-2xl"></i>
                </button>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    item: PropTypes.any.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    onToggleDetails: PropTypes.func.isRequired,
    updateCart: PropTypes.func.isRequired,
};

export default CartItem;
