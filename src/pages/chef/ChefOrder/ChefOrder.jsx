import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    ChefGetPendingOrders,
    ChefUpdateOrderStatus,
} from "../../../services/chefService/ChefOrder";
import OrderCard from "./OrderCard";

function ChefOrder() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pinnedOrderId, setPinnedOrderId] = useState(null);
    const [connection, setConnection] = useState(null);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await ChefGetPendingOrders();
            setOrders(data);
        } catch (err) {
            console.log(err.message || "Đã xảy ra lỗi");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Kết nối SignalR
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7290/orderHub") // Thay đổi URL với URL SignalR Hub của bạn
            .build();

        newConnection
            .start()
            .then(() => console.log("Connected to SignalR"))
            .catch((err) => console.error("Error connecting to SignalR:", err));

        // Lắng nghe sự kiện 'ReceiveOrderUpdate' từ server
        newConnection.on("ReceiveOrderUpdate", (message) => {
            toast.info(message); // Hiển thị thông báo khi có cập nhật
            fetchOrders(); // Cập nhật lại danh sách đơn hàng
        });

        setConnection(newConnection);
        console.log("ok");
        // Dọn dẹp khi component unmount
        return () => {
            if (newConnection) {
                newConnection.stop();
            }
        };
    }, []);

    useEffect(() => {
        fetchOrders();
    }, []);

    const handlePinOrder = (orderId) => {
        setPinnedOrderId((prev) => (prev === orderId ? null : orderId));
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            const isConfirmed = window.confirm(
                "Bạn có chắc chắn muốn cập nhật đơn hàng?",
            );
            if (!isConfirmed) return;
            await ChefUpdateOrderStatus(orderId, newStatus);
            toast.success(`Trạng thái đơn hàng ${orderId} đã được cập nhật.`);
            fetchOrders();
        } catch (err) {
            toast.error(err.message || "Đã xảy ra lỗi");
        }
    };

    const pinnedOrder = orders.find((order) => order.orderId === pinnedOrderId);
    const otherOrders = orders.filter(
        (order) => order.orderId !== pinnedOrderId,
    );

    return (
        <div className="max-h-[calc(100vh-100px)] overflow-y-auto px-4 pb-4 dark:bg-gray-600 dark:text-white">
            <h1 className="mb-4 text-center text-3xl font-bold">
                Quản lý Đơn hàng
            </h1>
            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <div className="space-y-4">
                    {pinnedOrder && (
                        <div className="rounded-lg border bg-orange-100 p-4 shadow-md dark:bg-teal-900">
                            <h3 className="mb-2 text-lg font-bold">
                                🌟 Đơn hàng ghim:
                            </h3>
                            <OrderCard
                                order={pinnedOrder}
                                onPin={handlePinOrder}
                                onUpdateStatus={handleUpdateOrderStatus}
                                pinnedOrder={pinnedOrderId} // Truyền pinnedOrderId vào đây
                            />
                        </div>
                    )}
                    {otherOrders.map((order) => (
                        <OrderCard
                            key={order.orderId}
                            order={order}
                            onPin={handlePinOrder}
                            onUpdateStatus={handleUpdateOrderStatus}
                            pinnedOrder={pinnedOrderId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChefOrder;
