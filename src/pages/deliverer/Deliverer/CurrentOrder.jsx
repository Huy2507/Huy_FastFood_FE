import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    completeOrder,
    getCurrentOrders,
} from "../../../services/delivererService/Deliverer";
import DelivererOrderCard from "./DelivererOrderCard";

function CurrentOrder() {
    const [order, setOrder] = useState(null); // Lưu đơn hàng hiện tại
    const [loading, setLoading] = useState(true); // Trạng thái đang tải
    const [error, setError] = useState(null); // Lưu lỗi nếu có
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentOrder = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getCurrentOrders();
                setOrder(data);
            } catch (err) {
                setError(err.message || "Đã xảy ra lỗi khi tải đơn hàng.");
                toast.error(err.message || "Đã xảy ra lỗi khi tải đơn hàng.");
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentOrder();
    }, []);

    const handleCompleteOrder = async (deliveryId) => {
        try {
            await completeOrder(deliveryId);
            toast.success("Hoàn tất đơn hàng thành công!");
            navigate("/deliverer/order"); // Điều hướng tới danh sách đơn hàng đã hoàn tất
        } catch (err) {
            toast.error(err.message || "Đã xảy ra lỗi khi hoàn tất đơn hàng.");
        }
    };

    if (loading) {
        return (
            <div className="p-4 dark:bg-gray-600 dark:text-white">
                <p className="text-center text-xl">Đang tải đơn hàng...</p>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="p-4 dark:bg-gray-600 dark:text-white">
                <p className="text-center text-xl">
                    {"Không có đơn hàng để hiển thị."}
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    Quay lại
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 dark:bg-gray-600 dark:text-white">
            <h1 className="mb-4 text-center text-3xl font-bold">
                Đơn hàng đang giao
            </h1>
            <DelivererOrderCard
                order={order}
                onComplete={handleCompleteOrder}
            />
        </div>
    );
}

export default CurrentOrder;
