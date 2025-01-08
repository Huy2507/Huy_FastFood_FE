import PropTypes from "prop-types";
import { getFullUrl } from "../../../services/api/axiosInstance";

const OrderCard = ({ order, onPin, onUpdateStatus, pinnedOrder }) => {
    return (
        <div className="rounded-lg border bg-white p-4 shadow-md dark:bg-gray-800">
            <div className="flex justify-between">
                <h3 className="font-bold">Đơn hàng #{order.orderId}</h3>
                <button
                    onClick={() => onPin(order.orderId)}
                    className="font-bold text-red-500 hover:underline"
                >
                    {order.orderId === pinnedOrder ? "Bỏ ghim" : "Ghim"}
                </button>
            </div>
            <div className="flex flex-row gap-8">
                <p className="text-gray-500 dark:text-gray-400">
                    Ngày đặt:{" "}
                    {new Date(order.orderDate).toLocaleString("vi-VN")}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                    Tổng tiền: {order.totalAmount.toLocaleString("vi-VN")}₫
                </p>
            </div>
            {order.note && (
                <p className="text-orange-500">Ghi chú: {order.note}</p>
            )}
            <div className="mt-4">
                <h4 className="mb-4 font-semibold text-gray-700 dark:text-white">
                    Chi tiết đơn hàng:
                </h4>
                <ul>
                    {order.orderItems.map((item) => (
                        <li
                            key={item.foodId}
                            className="mb-2 flex items-center"
                        >
                            <img
                                src={getFullUrl(item.imageUrl)}
                                alt={item.foodName}
                                className="h-10 w-10 rounded object-cover"
                            />
                            <span className="ml-3">
                                {item.foodName} - Số lượng: {item.quantity}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-3 text-right">
                <button
                    onClick={() => onUpdateStatus(order.orderId, "Canceled")}
                    className="mr-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                    Hủy đơn hàng
                </button>
                <button
                    onClick={() => onUpdateStatus(order.orderId, "Done")}
                    className="mr-2 rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                >
                    Hoàn thành đơn hàng
                </button>
            </div>
        </div>
    );
};

// Thêm PropTypes
OrderCard.propTypes = {
    order: PropTypes.shape({
        orderId: PropTypes.number.isRequired,
        orderDate: PropTypes.string.isRequired,
        totalAmount: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        note: PropTypes.string.isRequired,
        isPinned: PropTypes.bool,
        orderItems: PropTypes.arrayOf(
            PropTypes.shape({
                foodId: PropTypes.number.isRequired,
                imageUrl: PropTypes.string.isRequired,
                foodName: PropTypes.string.isRequired,
                quantity: PropTypes.number.isRequired,
                price: PropTypes.number,
                totalPrice: PropTypes.number,
            }),
        ).isRequired,
    }).isRequired,
    onPin: PropTypes.func.isRequired,
    onUpdateStatus: PropTypes.func.isRequired,
    pinnedOrder: PropTypes.number,
};

export default OrderCard;
