import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AdminGetEmployees } from "../../../services/adminService/Employee";
import EmployeeForm from "./EmployeeForm";

function AdminEmployee() {
    const [employees, setEmployees] = useState([]);
    const [expandedEmployeeId, setExpandedEmployeeId] = useState(null);

    const [search, setSearch] = useState("");
    const [isActive, setIsActive] = useState("");

    const [editEmployeeId, setEditEmployeeId] = useState(null);
    const [isAddingEmployee, setIsAddingEmployee] = useState(false);

    const searchInputRef = useRef(null);

    const fetchEmployees = async () => {
        try {
            const data = await AdminGetEmployees({ search, isActive });
            setEmployees(data);
        } catch (err) {
            toast.error(err.message || "Đã xảy ra lỗi");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [search, isActive]);

    const toggleExpandEmployee = (employeeId) => {
        setExpandedEmployeeId((prev) =>
            prev === employeeId ? null : employeeId,
        );
    };

    const handleAddEmployee = () => {
        setEditEmployeeId(null);
        setIsAddingEmployee(true);
    };

    const handleEditEmployee = (employeeId) => {
        setEditEmployeeId(employeeId);
        setIsAddingEmployee(false);
    };

    const handleCloseEditForm = () => {
        setEditEmployeeId(null);
        setIsAddingEmployee(false);
    };

    const handleSaveEditEmployee = () => {
        fetchEmployees();
        setEditEmployeeId(null);
        setIsAddingEmployee(false);
    };

    return (
        <div className="px-4 pb-4 dark:bg-gray-600 dark:text-white">
            <h1 className="mb-4 text-center text-3xl font-bold">
                Quản lý Nhân viên
            </h1>
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm kiếm nhân viên..."
                        className="mb-4 rounded border p-2 dark:bg-gray-800 dark:text-white"
                        ref={searchInputRef}
                    />
                    <select
                        className="h-10 border px-4 dark:bg-gray-800 dark:text-white"
                        value={isActive}
                        onChange={(e) => setIsActive(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        <option value="true">Hoạt động</option>
                        <option value="false">Không hoạt động</option>
                    </select>
                </div>
                <button
                    onClick={handleAddEmployee}
                    className="mb-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                    <i className="fas fa-plus"></i>
                </button>
            </div>

            {employees.length > 0 ? (
                <div className="relative max-h-[500px] overflow-y-auto">
                    <table className="w-full table-auto border-collapse dark:bg-gray-800 dark:text-white">
                        <thead className="sticky -top-1 bg-orange-200 dark:bg-teal-900">
                            <tr>
                                <th className="border px-4 py-2 text-left">
                                    ID
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Tên
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Vị trí
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    SĐT
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Email
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Trạng thái
                                </th>
                                <th className="border px-4 py-2 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <React.Fragment key={employee.employeeId}>
                                    <tr
                                        className="cursor-pointer odd:bg-white even:bg-gray-100 hover:bg-orange-100 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                                        onClick={() =>
                                            toggleExpandEmployee(
                                                employee.employeeId,
                                            )
                                        }
                                    >
                                        <td className="border px-4 py-2">
                                            {employee.employeeId}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {employee.name}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {employee.position}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {employee.phone}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {employee.email}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {employee.isActive ? "✅" : "❌"}
                                        </td>
                                        <td
                                            className="border px-4 py-2 text-center"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditEmployee(
                                                    employee.employeeId,
                                                );
                                            }}
                                        >
                                            <i className="fas fa-pen-to-square text-xl text-orange-500"></i>
                                        </td>
                                    </tr>
                                    {expandedEmployeeId ===
                                        employee.employeeId && (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="border px-4 py-2"
                                            >
                                                <div className="text-gray-600 dark:text-gray-400">
                                                    <p>
                                                        <strong>
                                                            Tài khoản ID:
                                                        </strong>{" "}
                                                        {employee.accountId}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Username:
                                                        </strong>{" "}
                                                        {employee.username}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Ngày Được Thuê:
                                                        </strong>{" "}
                                                        {new Date(
                                                            employee.hireDate,
                                                        ).toLocaleDateString()}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Ngày rời:
                                                        </strong>{" "}
                                                        {employee.leaveDate
                                                            ? new Date(
                                                                  employee.leaveDate,
                                                              ).toLocaleDateString()
                                                            : "N/A"}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Tạo Lúc:
                                                        </strong>{" "}
                                                        {new Date(
                                                            employee.createdAt,
                                                        ).toLocaleString()}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Cập nhật lần cuối:
                                                        </strong>{" "}
                                                        {new Date(
                                                            employee.updatedAt,
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
                <p className="text-gray-500 dark:text-gray-400">
                    Không có nhân viên nào để hiển thị.
                </p>
            )}
            {(editEmployeeId || isAddingEmployee) && (
                <EmployeeForm
                    employeeId={editEmployeeId}
                    onClose={handleCloseEditForm}
                    onSave={handleSaveEditEmployee}
                />
            )}
        </div>
    );
}

export default AdminEmployee;
