import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import { AdminGetCustomerOrders } from "../../../services/adminService/Customer";
import { getFullUrl } from "../../../services/api/axiosInstance";

function OrderDetail() {
    const { id } = useParams();
    const { orderid } = useParams(); // Get the order ID from the URL
    const [orderDetails, setOrderDetails] = useState(null); // State for order details
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    const selectedOrder = orderDetails
        ? orderDetails.find((order) => order.orderId === parseInt(orderid))
        : null;

    // Kiểm tra nếu không tìm thấy order

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const data = await AdminGetCustomerOrders({ id });
                setOrderDetails(data);
                console.log("aa", data);
            } catch (err) {
                console.error("Failed to fetch order details:", err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [orderid]);

    if (!selectedOrder) {
        return <div>Order not found</div>;
    }

    const orderItems = selectedOrder.orderItems;
    if (loading) return <Loading />;

    if (!orderDetails) {
        return (
            <p className="text-gray-500 dark:text-gray-400">
                Không tìm thấy thông tin đơn hàng.
            </p>
        );
    }

    return (
        <div className="px-4 pb-4 dark:bg-gray-600 dark:text-white">
            <div className="flex flex-row">
                {/* Nút trở về */}
                <button
                    onClick={() => navigate(`/admin/customer/${id}`)} // Đường dẫn về danh sách đơn hàng
                >
                    <i className="fas fa-arrow-left text-3xl"></i>
                </button>

                {/* Tiêu đề */}
                <h2 className="ml-6 text-3xl font-bold">
                    Chi tiết Đơn Hàng #{orderid}
                </h2>

                {/* Nội dung chi tiết đơn hàng */}
                <div>{/* Thông tin chi tiết đơn hàng */}</div>
            </div>

            {/* Ordered Items */}
            <h3 className="mb-4 mt-6 text-2xl font-semibold">
                Chi tiết sản phẩm
            </h3>
            <div className="relative max-h-[500px] overflow-y-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="sticky -top-1 bg-orange-200 dark:bg-teal-900">
                        <tr>
                            <th className="border px-4 py-2 text-left">
                                Id món ăn
                            </th>
                            <th className="border px-4 py-2 text-left">Ảnh</th>
                            <th className="border px-4 py-2 text-left">
                                Tên món ăn
                            </th>
                            <th className="border px-4 py-2 text-center">
                                Số lượng
                            </th>
                            <th className="border px-4 py-2 text-right">
                                Đơn giá
                            </th>
                            <th className="border px-4 py-2 text-right">
                                Thành tiền
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems.map((item) => (
                            <tr
                                key={item.foodId}
                                className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                            >
                                <td className="border px-4 py-2">
                                    {item.foodId}
                                </td>
                                <td className="mr-3 border object-cover px-2 py-2">
                                    <img
                                        className="h-20 w-20 rounded-md object-cover"
                                        src={getFullUrl(item.imageUrl)}
                                        alt={item.name}
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    {item.foodName}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    {item.quantity}
                                </td>
                                <td className="border px-4 py-2 text-right">
                                    {item.price.toLocaleString("vi-VN")} đ
                                </td>
                                <td className="border px-4 py-2 text-right">
                                    {item.totalPrice.toLocaleString("vi-VN")} đ
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderDetail;
