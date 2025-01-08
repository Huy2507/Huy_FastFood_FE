import PropTypes from "prop-types";
import { getFullUrl } from "../../../services/api/axiosInstance";

const DelivererOrderCard = ({ order, onAccept, onComplete }) => {
    console.log(order);
    return (
        <div className="rounded-lg border bg-white p-4 shadow-md dark:bg-gray-800">
            <h3 className="font-bold">Đơn hàng #{order.orderId}</h3>
            <div className="flex flex-col md:flex-row md:gap-8">
                <p className="text-gray-500 dark:text-gray-400">
                    Ngày đặt:{" "}
                    {new Date(order.orderDate).toLocaleString("vi-VN")}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                    Tổng tiền: {order.totalAmount}₫
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
                {onAccept && (
                    <button
                        onClick={() => onAccept(order.orderId)}
                        className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    >
                        Chấp nhận đơn hàng
                    </button>
                )}
                {onComplete && (
                    <button
                        onClick={() => onComplete(order.orderId)}
                        className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                    >
                        Hoàn thành giao hàng
                    </button>
                )}
            </div>
        </div>
    );
};

DelivererOrderCard.propTypes = {
    order: PropTypes.shape({
        orderId: PropTypes.number.isRequired,
        orderDate: PropTypes.string.isRequired,
        totalAmount: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        note: PropTypes.string,
        orderItems: PropTypes.arrayOf(
            PropTypes.shape({
                foodId: PropTypes.number.isRequired,
                imageUrl: PropTypes.string.isRequired,
                foodName: PropTypes.string.isRequired,
                quantity: PropTypes.number.isRequired,
            }),
        ).isRequired,
    }).isRequired,
    onAccept: PropTypes.func,
    onComplete: PropTypes.func,
};

export default DelivererOrderCard;
