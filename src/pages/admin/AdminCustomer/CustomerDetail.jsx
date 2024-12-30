import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    AdminGetCustomerDetails,
    AdminGetCustomerOrders,
} from "../../../services/adminService/Customer";

function CustomerDetail() {
    const { id } = useParams(); // Get the customer ID from the URL
    const [details, setDetails] = useState({});
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("order");
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const navigate = useNavigate();

    const fetchDetails = async () => {
        try {
            const data = await AdminGetCustomerDetails({ id });
            setDetails(data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await AdminGetCustomerOrders({
                    id,
                    search,
                    status,
                });
                setOrders(data);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchOrders();
    }, [id, search, status]);

    const toggleExpand = (orderId) => {
        setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
    };

    if (!details) return <p>Loading...</p>;

    const handleOrderClick = (orderId) => {
        navigate(`/admin/customer/${id}/order/${orderId}`); // Navigate to the order detail page
    };

    return (
        <div className="px-4 pb-4 dark:bg-gray-600 dark:text-white">
            <div className="mb-4 flex flex-row">
                {/* Nút trở về */}
                <button
                    onClick={() => navigate(`/admin/customer`)} // Đường dẫn về danh sách đơn hàng
                >
                    <i className="fas fa-arrow-left text-3xl"></i>
                </button>

                {/* Tiêu đề */}
                <h2 className="ml-6 text-3xl font-bold">
                    Chi tiết Khách Hàng #{id}
                </h2>

                {/* Nội dung chi tiết đơn hàng */}
                <div>{/* Thông tin chi tiết đơn hàng */}</div>
            </div>

            {/* Tabs for Address and Orders */}
            <div className="mb-4 flex space-x-4">
                <button
                    onClick={() => setActiveTab("order")}
                    className={`rounded-lg px-4 py-2 ${
                        activeTab === "order"
                            ? "bg-orange-500 text-white dark:bg-orange-600"
                            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                >
                    Đơn hàng
                </button>
                <button
                    onClick={() => setActiveTab("address")}
                    className={`rounded-lg px-4 py-2 ${
                        activeTab === "address"
                            ? "bg-orange-500 text-white dark:bg-orange-600"
                            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                >
                    Địa chỉ
                </button>
            </div>

            {/* Bộ lọc */}
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <input
                        type="number"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm kiếm món ăn..."
                        className="mb-4 rounded border p-2 dark:bg-gray-800 dark:text-white"
                    />
                    <select
                        className="h-10 border px-4 dark:bg-gray-800 dark:text-white"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Tất cả (Status)</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Shipping">Shipping</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Returned">Returned</option>
                        <option value="Refunded">Refunded</option>
                    </select>
                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                        }}
                        className="mx-3 mb-[17.6px] flex items-start border px-2 text-4xl text-gray-500 hover:text-red-500 dark:text-white dark:hover:text-red-500"
                    >
                        <i className="fas fa-close"></i>
                    </button>
                </div>
            </div>
            {/* Content for the active tab */}
            <div className="tab-content">
                {activeTab === "address" &&
                    (details.addresses && details.addresses.length > 0 ? (
                        <div className="relative max-h-[500px] overflow-y-auto">
                            <table className="w-full table-auto border-collapse dark:bg-gray-800 dark:text-white">
                                <thead className="sticky top-0 bg-orange-200 dark:bg-teal-900">
                                    <tr>
                                        <th className="border px-4 py-2 text-left">
                                            ID
                                        </th>
                                        <th className="border px-4 py-2">
                                            Địa Chỉ
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Phường
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Quận
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Thành Phố
                                        </th>
                                        <th className="border px-4 py-2">
                                            Mặc Định
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details.addresses.map((addr) => (
                                        <tr
                                            key={addr.id}
                                            className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                                        >
                                            <td className="border px-4 py-2">
                                                {addr.id}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {addr.street}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {addr.ward}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {addr.district}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {addr.city}
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                {addr.isDefault ? "✅" : "❌"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">
                            Không có địa chỉ nào để hiển thị.
                        </p>
                    ))}

                {activeTab === "order" &&
                    (orders && orders.length > 0 ? (
                        <div className="relative max-h-[500px] overflow-y-auto">
                            <table className="w-full table-auto border-collapse dark:bg-gray-800 dark:text-white">
                                <thead className="sticky top-0 bg-orange-200 dark:bg-teal-900">
                                    <tr>
                                        <th className="border px-4 py-2 text-left">
                                            Mã Đơn Hàng
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Ngày Đặt
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Trạng Thái
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Tổng Tiền
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Ghi Chú
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Chi Tiết
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <React.Fragment key={order.orderId}>
                                            <tr
                                                className="cursor-pointer odd:bg-white even:bg-gray-100 hover:bg-orange-100 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                                                onClick={() =>
                                                    toggleExpand(order.orderId)
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
                                                    <span
                                                        className={`text-sm ${order.status === "Completed" ? "text-green-500" : "text-yellow-500"}`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {order.totalAmount.toLocaleString(
                                                        "vi-VN",
                                                    )}{" "}
                                                    đ
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {order.note}
                                                </td>
                                                <td
                                                    className="border px-4 py-2 text-center"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOrderClick(
                                                            order.orderId,
                                                        );
                                                    }}
                                                >
                                                    <i className="fas fa-circle-info text-xl text-orange-500"></i>
                                                </td>
                                            </tr>

                                            {expandedOrderId ===
                                                order.orderId && (
                                                <tr>
                                                    <td
                                                        colSpan="6"
                                                        className="border bg-gray-100 px-4 py-2 dark:bg-gray-900"
                                                    >
                                                        <strong>
                                                            Thông Tin Thanh
                                                            Toán:
                                                        </strong>
                                                        <div className="mt-4">
                                                            <p>
                                                                <strong>
                                                                    Phương thức
                                                                    thanh toán:
                                                                </strong>{" "}
                                                                {
                                                                    order
                                                                        .payment[0]
                                                                        ?.paymentMethod
                                                                }
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Trạng thái
                                                                    thanh toán:
                                                                </strong>{" "}
                                                                {
                                                                    order
                                                                        .payment[0]
                                                                        ?.paymentStatus
                                                                }
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Mã giao
                                                                    dịch:
                                                                </strong>{" "}
                                                                {
                                                                    order
                                                                        .payment[0]
                                                                        ?.transactionId
                                                                }
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Số tiền:
                                                                </strong>{" "}
                                                                {order.totalAmount
                                                                    ? order.totalAmount.toLocaleString(
                                                                          "vi-VN",
                                                                      )
                                                                    : "N/A"}{" "}
                                                                đ
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Ngày tạo:
                                                                </strong>{" "}
                                                                {new Date(
                                                                    order.payment[0]?.createdAt,
                                                                ).toLocaleString()}
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Ngày cập
                                                                    nhật:
                                                                </strong>{" "}
                                                                {order.payment
                                                                    .updatedAt
                                                                    ? new Date(
                                                                          order.payment[0]?.updatedAt,
                                                                      ).toLocaleString()
                                                                    : "Chưa có cập nhật"}
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">
                            Không có đơn hàng nào để hiển thị.
                        </p>
                    ))}
            </div>
        </div>
    );
}

export default CustomerDetail;
