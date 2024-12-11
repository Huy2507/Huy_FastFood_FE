import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../../../components/footer";
import { getFullUrl } from "../../../services/api/axiosInstance";
import { GetCustomerOrdersApi } from "../../../services/customerService/Order";
import Sidebar from "./Sidebar";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedOrderId, setExpandedOrderId] = useState(null); // Đơn hàng đang mở rộng
    const [activeButton, setActiveButton] = useState("orders");
    const [isMobile, setIsMobile] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);

    useEffect(() => {
        // Xử lý thay đổi kích thước màn hình
        const handleResize = () => {
            const mobileView = window.innerWidth <= 640;
            setIsMobile(mobileView);
            if (!mobileView) setShowSidebar(true); // Hiển thị Sidebar trên màn hình lớn
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await GetCustomerOrdersApi();
            setOrders(response.data || []); // Đảm bảo orders luôn là mảng
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Không thể tải danh sách đơn hàng.",
            );
            setOrders([]); // Gán mảng trống nếu lỗi xảy ra
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const toggleExpandOrder = (orderId) => {
        setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
    };

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                Đang tải dữ liệu...
            </div>
        );
    }

    return (
        <div className="flex h-screen flex-col">
            <div className={`flex flex-grow ${isMobile ? "flex-col" : ""}`}>
                {showSidebar && !isMobile && (
                    <Sidebar
                        activeButton={activeButton}
                        setActiveButton={setActiveButton}
                        onBack={() => setShowSidebar(false)}
                        isMobile={isMobile}
                    />
                )}
                <div className="relative flex-grow p-8">
                    {isMobile && (
                        <Sidebar
                            activeButton={activeButton}
                            setActiveButton={(id) => {
                                setActiveButton(id);
                                if (isMobile) setShowSidebar(false);
                            }}
                            onBack={() => setShowSidebar(false)}
                            isMobile={isMobile}
                        />
                    )}
                    <div className="mb-4 mt-10 flex items-center justify-between sm:mt-0">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Danh sách đơn hàng
                        </h2>
                    </div>

                    {isMobile ? (
                        <div className="grid gap-4">
                            {orders.map((order) => (
                                <div
                                    key={order.orderId}
                                    className="rounded-lg border p-4 shadow hover:bg-gray-100"
                                    onClick={() =>
                                        toggleExpandOrder(order.orderId)
                                    }
                                >
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Đơn hàng #{order.orderId}
                                    </h3>
                                    <p className="text-gray-600">
                                        Thời gian:{" "}
                                        {new Date(
                                            order.orderDate,
                                        ).toLocaleString()}
                                    </p>
                                    <p className="text-gray-600">
                                        Địa chỉ:{" "}
                                        {order.deliveryAddress?.fullAddress}
                                    </p>
                                    <p className="text-gray-600">
                                        Trạng thái: {order.status}
                                    </p>
                                    <p className="text-gray-600">
                                        Tổng tiền:{" "}
                                        {order.totalPrice.toLocaleString()} VNĐ
                                    </p>

                                    {expandedOrderId === order.orderId && (
                                        <div className="mt-4">
                                            <h4 className="mb-2 font-semibold text-gray-700">
                                                Chi tiết sản phẩm:
                                            </h4>
                                            <div className="grid gap-2">
                                                {order.items.map((item) => (
                                                    <div
                                                        key={item.foodId}
                                                        className="flex items-center rounded border p-2 shadow"
                                                    >
                                                        <img
                                                            src={getFullUrl(
                                                                item.imageUrl,
                                                            )}
                                                            alt={item.foodName}
                                                            className="mr-4 h-12 w-12 rounded"
                                                        />
                                                        <div>
                                                            <p className="font-medium text-gray-800">
                                                                {item.foodName}
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Số lượng:{" "}
                                                                {item.quantity}
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Giá:{" "}
                                                                {item.price.toLocaleString()}{" "}
                                                                VNĐ
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Tổng:{" "}
                                                                {(
                                                                    item.quantity *
                                                                    item.price
                                                                ).toLocaleString()}{" "}
                                                                VNĐ
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="relative max-h-[600px] overflow-y-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead className="sticky top-0 bg-gray-300">
                                    <tr>
                                        <th className="border px-4 py-2 text-left">
                                            ID
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Thời gian
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Địa chỉ
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Trạng thái
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Tổng tiền
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <>
                                            {/* Hàng hiển thị thông tin cơ bản */}
                                            <tr
                                                key={order.orderId}
                                                className="cursor-pointer odd:bg-white even:bg-gray-100 hover:bg-teal-100"
                                                onClick={() =>
                                                    toggleExpandOrder(
                                                        order.orderId,
                                                    )
                                                }
                                            >
                                                <td className="border px-4 py-2">
                                                    {order.orderId}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {new Date(
                                                        order.orderDate,
                                                    ).toLocaleString()}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {
                                                        order.deliveryAddress
                                                            ?.fullAddress
                                                    }
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {order.status}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {order.totalPrice.toLocaleString()}{" "}
                                                    VNĐ
                                                </td>
                                            </tr>

                                            {/* Hàng hiển thị chi tiết sản phẩm (nếu mở rộng) */}
                                            {expandedOrderId ===
                                                order.orderId && (
                                                <tr>
                                                    <td
                                                        colSpan="5"
                                                        className="border px-4 py-2"
                                                    >
                                                        <div className="overflow-hidden transition-all duration-300 ease-in-out">
                                                            <h3 className="mb-2 font-semibold text-gray-700">
                                                                Chi tiết sản
                                                                phẩm:
                                                            </h3>
                                                            <table className="w-full table-auto border-collapse">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="border px-4 py-2 text-left">
                                                                            Hình
                                                                            ảnh
                                                                        </th>
                                                                        <th className="border px-4 py-2 text-left">
                                                                            Tên
                                                                        </th>
                                                                        <th className="border px-4 py-2 text-left">
                                                                            Số
                                                                            lượng
                                                                        </th>
                                                                        <th className="border px-4 py-2 text-left">
                                                                            Giá
                                                                        </th>
                                                                        <th className="border px-4 py-2 text-left">
                                                                            Tổng
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {order.items.map(
                                                                        (
                                                                            item,
                                                                        ) => (
                                                                            <tr
                                                                                key={
                                                                                    item.foodId
                                                                                }
                                                                            >
                                                                                <td className="border px-4 py-2">
                                                                                    <img
                                                                                        src={getFullUrl(
                                                                                            item.imageUrl,
                                                                                        )}
                                                                                        alt={
                                                                                            item.foodName
                                                                                        }
                                                                                        className="h-12 w-12 rounded"
                                                                                    />
                                                                                </td>
                                                                                <td className="border px-4 py-2">
                                                                                    {
                                                                                        item.foodName
                                                                                    }
                                                                                </td>
                                                                                <td className="border px-4 py-2">
                                                                                    {
                                                                                        item.quantity
                                                                                    }
                                                                                </td>
                                                                                <td className="border px-4 py-2">
                                                                                    {item.price.toLocaleString()}{" "}
                                                                                    VNĐ
                                                                                </td>
                                                                                <td className="border px-4 py-2">
                                                                                    {(
                                                                                        item.quantity *
                                                                                        item.price
                                                                                    ).toLocaleString()}{" "}
                                                                                    VNĐ
                                                                                </td>
                                                                            </tr>
                                                                        ),
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Orders;
