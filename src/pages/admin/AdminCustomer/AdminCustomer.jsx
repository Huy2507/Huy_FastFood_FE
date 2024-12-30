import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminGetCustomers } from "../../../services/adminService/Customer";

function AdminCustomer() {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [expandedCustomerId, setExpandedCustomerId] = useState(null);
    const navigate = useNavigate();

    const fetchCustomers = async () => {
        try {
            const data = await AdminGetCustomers({ search });
            setCustomers(data);
        } catch (err) {
            toast.error(err.message || "Đã xảy ra lỗi");
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [search]);

    const toggleExpandCustomer = (customerId) => {
        setExpandedCustomerId((prev) =>
            prev === customerId ? null : customerId,
        );
    };

    const handleViewDetail = (customerId) => {
        navigate(`/admin/customer/${customerId}`);
    };

    return (
        <div className="px-4 pb-4 dark:bg-gray-600 dark:text-white">
            <h1 className="mb-4 text-center text-3xl font-bold">
                Quản lý Khách hàng
            </h1>
            <div className="mb-4 flex justify-between">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm kiếm khách hàng..."
                    className="rounded border p-2 dark:bg-gray-800 dark:text-white"
                />
            </div>
            {customers.length > 0 ? (
                <div className="relative max-h-[500px] overflow-y-auto">
                    <table className="w-full table-auto border-collapse dark:bg-gray-800 dark:text-white">
                        <thead className="sticky -top-1 bg-orange-200 dark:bg-teal-900">
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Tên</th>
                                <th className="border px-4 py-2">SĐT</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <React.Fragment key={customer.customerId}>
                                    <tr
                                        className="cursor-pointer odd:bg-white even:bg-gray-100 hover:bg-orange-100 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                                        onClick={() =>
                                            toggleExpandCustomer(
                                                customer.customerId,
                                            )
                                        }
                                    >
                                        <td className="border px-4 py-2">
                                            {customer.customerId}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {customer.name}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {customer.phone}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {customer.email}
                                        </td>
                                        <td
                                            className="border px-4 py-2 text-center"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewDetail(
                                                    customer.customerId,
                                                );
                                            }}
                                        >
                                            <i className="fas fa-circle-info text-xl text-orange-500"></i>
                                        </td>
                                    </tr>
                                    {expandedCustomerId ===
                                        customer.customerId && (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="border px-4 py-2"
                                            >
                                                <div className="text-gray-600 dark:text-gray-400">
                                                    <p>
                                                        <strong>
                                                            Tài khoản ID:
                                                        </strong>{" "}
                                                        {customer.accountId}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Ngày Tạo:
                                                        </strong>{" "}
                                                        {new Date(
                                                            customer.createdAt,
                                                        ).toLocaleString()}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Cập Nhật Lần Cuối:
                                                        </strong>{" "}
                                                        {new Date(
                                                            customer.updatedAt,
                                                        ).toLocaleString()}
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
                <p className="text-gray-500">
                    Không có khách hàng nào để hiển thị.
                </p>
            )}
        </div>
    );
}

export default AdminCustomer;
