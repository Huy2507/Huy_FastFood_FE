import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";
import {
    acceptOrder,
    getCompletedOrders,
} from "../../../services/delivererService/Deliverer";
import DelivererOrderCard from "./DelivererOrderCard";

function DelivererOrder() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [connection, setConnection] = useState(null);
    const navigate = useNavigate(); // Khởi tạo navigate

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await getCompletedOrders();
            setOrders(data);
        } catch (err) {
            toast.error(err.message || "Đã xảy ra lỗi");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Kết nối SignalR
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7290/deliveryOrderHub")
            .build();

        newConnection
            .start()
            .then(() => console.log("Connected to SignalR"))
            .catch((err) => console.error("Error connecting to SignalR:", err));

        // Lắng nghe sự kiện 'RefreshDeliveryOrderList' từ server
        newConnection.on("RefreshDeliveryOrderList", () => {
            toast.info("Danh sách đơn hàng đã được cập nhật.");
            fetchOrders();
        });

        setConnection(newConnection);

        return () => {
            if (newConnection) {
                newConnection.stop();
            }
        };
    }, []);

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleAcceptOrder = async (orderId) => {
        try {
            const isConfirmed = window.confirm(
                "Bạn có chắc chắn muốn nhận đơn hàng này?",
            );
            if (!isConfirmed) return;

            const data = await acceptOrder(orderId);
            toast.success(`Đơn hàng ${orderId} đã được nhận.`);
            // Chuyển hướng sang trang CurrentOrder
            navigate(`/deliverer/current-order`, {
                state: { order: data.data },
            });
        } catch (err) {
            toast.error(err.message || "Đã xảy ra lỗi");
        }
    };

    if (loading) {
        return <p>Đang tải...</p>;
    }

    // Màn hình danh sách đơn hàng
    return (
        <div className="max-h-[calc(100vh-100px)] overflow-y-auto px-4 pb-4 dark:bg-gray-600 dark:text-white">
            <h1 className="mb-4 text-center text-3xl font-bold">
                Danh sách Đơn hàng
            </h1>
            <div className="space-y-4">
                {orders.map((order) => (
                    <DelivererOrderCard
                        key={order.orderId}
                        order={order}
                        onAccept={handleAcceptOrder}
                    />
                ))}
            </div>
        </div>
    );
}

export default DelivererOrder;
