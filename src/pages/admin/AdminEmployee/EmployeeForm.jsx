import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    AdminCreateEmployee,
    AdminGetEmployeeById,
    AdminUpdateEmployee,
} from "../../../services/adminService/Employee"; // Import API
import { AdminGetRoles } from "../../../services/adminService/Role"; // Import API roles

const EmployeeForm = ({ employeeId, onClose, onSave }) => {
    const [editEmployee, setEditEmployee] = useState({
        username: "",
        password: "",
        name: "",
        phone: "",
        email: "",
        hireDate: "",
        leaveDate: "", // Added leaveDate for update
        roleIds: [], // Always initialize as an array
        isActive: true,
    });
    const [roles, setRoles] = useState([]);

    // Fetch roles on component mount
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await AdminGetRoles();
                setRoles(rolesData);
            } catch (err) {
                toast.error(
                    err.message || "Đã xảy ra lỗi khi tải dữ liệu roles",
                );
            }
        };
        fetchRoles();
    }, []);

    // Fetch employee details if `employeeId` is provided
    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                if (employeeId) {
                    const employeeData = await AdminGetEmployeeById(employeeId);
                    setEditEmployee({
                        username: employeeData.username || "",
                        name: employeeData.name || "",
                        phone: employeeData.phone || "",
                        email: employeeData.email || "",
                        hireDate: employeeData.hireDate || "",
                        leaveDate: employeeData.leaveDate || "", // Set leaveDate
                        roleIds: employeeData.roleIds || [], // Ensure roleIds is an array
                        isActive: employeeData.isActive,
                    });
                }
            } catch (err) {
                toast.error(
                    err.message || "Đã xảy ra lỗi khi tải dữ liệu nhân viên",
                );
            }
        };
        fetchEmployeeDetails();
    }, [employeeId]);

    const handleRoleChange = (roleId) => {
        setEditEmployee((prev) => {
            const roleIds = prev.roleIds.includes(roleId)
                ? prev.roleIds.filter((id) => id !== roleId) // Remove role
                : [...prev.roleIds, roleId]; // Add role

            return { ...prev, roleIds };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmMessage = employeeId
            ? "Bạn có chắc chắn muốn cập nhật thông tin nhân viên này không?"
            : "Bạn có chắc chắn muốn thêm nhân viên này không?";
        const confirmed = window.confirm(confirmMessage);

        if (!confirmed) {
            return; // Stop execution if user cancels
        }
        console.log(editEmployee);
        try {
            if (employeeId) {
                await AdminUpdateEmployee(employeeId, editEmployee);
                toast.success("Cập nhật nhân viên thành công");
            } else {
                await AdminCreateEmployee(editEmployee);
                toast.success("Thêm nhân viên thành công");
            }
            onSave(); // Notify parent component
        } catch (err) {
            toast.error(err.message || "Đã xảy ra lỗi khi lưu dữ liệu");
        }
    };

    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toISOString().split("T")[0]; // Convert to "yyyy-MM-dd" format
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
            onClick={onClose}
        >
            <div
                className="w-full max-w-3xl rounded bg-white p-6 shadow-lg dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {employeeId ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Tên nhân viên
                            </label>
                            <input
                                type="text"
                                value={editEmployee.name}
                                onChange={(e) =>
                                    setEditEmployee({
                                        ...editEmployee,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-gray-300 p-2 dark:bg-gray-700 dark:text-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Số điện thoại
                            </label>
                            <input
                                type="tel"
                                value={editEmployee.phone}
                                onChange={(e) =>
                                    setEditEmployee({
                                        ...editEmployee,
                                        phone: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-gray-300 p-2 dark:bg-gray-700 dark:text-gray-200"
                            />
                        </div>
                        {!employeeId && (
                            <div>
                                <label className="block font-medium text-gray-700 dark:text-gray-300">
                                    Tài khoản
                                </label>
                                <input
                                    type="text"
                                    value={editEmployee.username}
                                    onChange={(e) =>
                                        setEditEmployee({
                                            ...editEmployee,
                                            username: e.target.value,
                                        })
                                    }
                                    className="w-full rounded border border-gray-300 p-2 dark:bg-gray-700 dark:text-gray-200"
                                    disabled={employeeId} // Disable if editing
                                />
                            </div>
                        )}
                        {!employeeId && (
                            <div>
                                <label className="block font-medium text-gray-700 dark:text-gray-300">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    value={editEmployee.password}
                                    onChange={(e) =>
                                        setEditEmployee({
                                            ...editEmployee,
                                            password: e.target.value,
                                        })
                                    }
                                    className="w-full rounded border border-gray-300 p-2 dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                value={editEmployee.email}
                                onChange={(e) =>
                                    setEditEmployee({
                                        ...editEmployee,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-gray-300 p-2 dark:bg-gray-700 dark:text-gray-200"
                            />
                        </div>
                        {!employeeId && (
                            <div>
                                <label className="block font-medium text-gray-700 dark:text-gray-300">
                                    Ngày tuyển dụng
                                </label>
                                <input
                                    type="date"
                                    value={formatDate(editEmployee.hireDate)}
                                    onChange={(e) =>
                                        setEditEmployee({
                                            ...editEmployee,
                                            hireDate: e.target.value
                                                ? new Date(e.target.value)
                                                : null,
                                        })
                                    }
                                    className="w-full rounded border border-gray-300 p-2 dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>
                        )}
                        {/* Show LeaveDate only for updating employee */}
                        {employeeId && (
                            <div>
                                <label className="block font-medium text-gray-700 dark:text-gray-300">
                                    Ngày nghỉ việc
                                </label>
                                <input
                                    type="date"
                                    value={formatDate(editEmployee.leaveDate)}
                                    onChange={(e) =>
                                        setEditEmployee({
                                            ...editEmployee,
                                            leaveDate: e.target.value
                                                ? new Date(e.target.value)
                                                : null,
                                        })
                                    }
                                    className="w-full rounded border border-gray-300 p-2 dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Quyền
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {roles.map((role) => (
                                    <div
                                        key={role.roleId}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`role-${role.roleId}`}
                                            checked={editEmployee.roleIds.includes(
                                                role.roleId,
                                            )}
                                            onChange={() =>
                                                handleRoleChange(role.roleId)
                                            }
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor={`role-${role.roleId}`}
                                            className="flex cursor-pointer items-center"
                                        >
                                            <div
                                                className={`relative h-5 w-10 rounded-full ${
                                                    editEmployee.roleIds.includes(
                                                        role.roleId,
                                                    )
                                                        ? "bg-green-500"
                                                        : "bg-gray-300 dark:bg-gray-600"
                                                }`}
                                            >
                                                <div
                                                    className={`absolute left-1 top-1 h-3 w-3 transform rounded-full bg-white transition-transform ${
                                                        editEmployee.roleIds.includes(
                                                            role.roleId,
                                                        )
                                                            ? "translate-x-5"
                                                            : ""
                                                    }`}
                                                ></div>
                                            </div>
                                            <span className="ml-2 text-gray-700 dark:text-gray-300">
                                                {role.roleName}
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {employeeId && (
                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    checked={editEmployee.isActive}
                                    onChange={(e) =>
                                        setEditEmployee({
                                            ...editEmployee,
                                            isActive: e.target.checked,
                                        })
                                    }
                                    id="active-checkbox"
                                    className="hidden"
                                />
                                <label
                                    htmlFor="active-checkbox"
                                    className="flex cursor-pointer items-center"
                                >
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                        Kích hoạt:
                                    </span>
                                    <div
                                        className={`relative ml-2 h-5 w-10 rounded-full ${
                                            editEmployee.isActive
                                                ? "bg-green-500"
                                                : "bg-gray-300 dark:bg-gray-600"
                                        }`}
                                    >
                                        <div
                                            className={`absolute left-1 top-1 h-3 w-3 transform rounded-full bg-white transition-transform ${
                                                editEmployee.isActive
                                                    ? "translate-x-5"
                                                    : ""
                                            }`}
                                        ></div>
                                    </div>
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 font-bold text-gray-700 dark:text-gray-300"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="rounded bg-green-500 px-4 py-2 font-bold text-white"
                        >
                            {employeeId ? "Lưu" : "Thêm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

EmployeeForm.propTypes = {
    employeeId: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default EmployeeForm;
