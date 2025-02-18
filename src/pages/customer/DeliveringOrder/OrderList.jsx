import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { getFullUrl } from "../../../services/api/axiosInstance";
import { getCustomerOrders } from "../../../services/customerService/DeliveringOrder";
import { getOrderProgress } from "./ProgressStatus";

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getCustomerOrders();
            setOrders(data);
        } catch (err) {
            setError(err.message || "Đã xảy ra lỗi khi tải đơn hàng.");
            toast.error(err.message || "Đã xảy ra lỗi khi tải đơn hàng.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

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

        // Dọn dẹp khi component unmount
        return () => {
            if (newConnection) {
                newConnection.stop();
            }
        };
    }, []);

    useEffect(() => {
        // Kết nối SignalR
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7290/deliveryOrderHub") // Thay đổi URL với URL SignalR Hub của bạn
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

        // Dọn dẹp khi component unmount
        return () => {
            if (newConnection) {
                newConnection.stop();
            }
        };
    }, []);

    if (loading) {
        return <div>Đang tải danh sách đơn hàng...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!orders.length) {
        return (
            <div>
                <Helmet>
                    <title>Đơn hàng đang giao</title>
                </Helmet>
                <Navbar />
                <div>Không có đơn hàng nào để hiển thị.</div>
                <Footer />
            </div>
        );
    }
    console.log(orders);
    return (
        <div className="p-4">
            <Helmet>
                <title>Đơn hàng đang giao</title>
            </Helmet>
            <Navbar />
            <h1 className="my-4 text-center text-2xl font-bold">
                Danh sách đơn hàng
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {orders.map((order) => (
                    <div
                        key={order.orderId}
                        className="rounded-lg border p-4 shadow dark:bg-gray-700 dark:text-white"
                    >
                        <h2 className="text-lg font-bold">
                            Mã đơn: {order.orderId}
                        </h2>
                        <p>
                            Ngày đặt:{" "}
                            {new Date(order.orderDate).toLocaleString()}
                        </p>
                        <p>Ghi chú: {order.note || "Không có ghi chú."}</p>
                        <p className="font-bold">
                            Tổng tiền: {order.totalAmount} VND
                        </p>

                        <div className="mt-4">
                            <h3 className="mb-2 text-sm font-bold">
                                Trạng thái:
                            </h3>
                            <div className="relative w-full bg-gray-200 dark:bg-gray-500">
                                <div
                                    className="h-4 rounded bg-blue-500"
                                    style={{
                                        width: `${getOrderProgress(order.status)}%`
                                    }}
                                ></div>
                            </div>
                            <p className="mt-2 text-center text-sm">
                                {order.status === "Pending" && "Chờ xử lý"}
                                {order.status === "Is Delivering" &&
                                    "Đang giao hàng"}
                                {order.status === "Done" && "Đã hoàn thành"}
                            </p>
                        </div>

                        <div className="mt-4">
                            <h3 className="mb-2 text-sm font-bold">
                                Sản phẩm:
                            </h3>
                            <ul>
                                {order.orderItems.map((item) => (
                                    <li
                                        key={item.foodId}
                                        className="flex items-center space-x-4"
                                    >
                                        <img
                                            src={getFullUrl(item.imageUrl)}
                                            alt={item.name}
                                            className="h-12 w-12 rounded object-cover"
                                        />
                                        <div>
                                            <p className="font-bold">
                                                {item.name}
                                            </p>
                                            <p>
                                                Số lượng: {item.quantity} |
                                                Tổng: {item.totalPrice} VND
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default OrderList;
