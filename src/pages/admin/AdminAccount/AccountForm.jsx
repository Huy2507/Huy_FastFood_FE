import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    AdminCreateAccount,
    AdminGetAccountById,
    AdminUpdateAccount,
} from "../../../services/adminService/Account"; // Import API
import { AdminGetRoles } from "../../../services/adminService/Role"; // Import API roles

const AccountForm = ({ accountId, onClose, onSave }) => {
    const [editAccount, setEditAccount] = useState({
        userName: "",
        password: "",
        isActive: true,
        roleIds: [], // Always initialize as an array
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

    // Fetch account details if `accountId` is provided
    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                if (accountId) {
                    const accountData = await AdminGetAccountById(accountId);
                    setEditAccount({
                        password: "",
                        isActive: accountData.isActive,
                        roleIds: accountData.roles || [], // Ensure roleIds is an array
                    });
                }
            } catch (err) {
                toast.error(
                    err.message || "Đã xảy ra lỗi khi tải dữ liệu tài khoản",
                );
            }
        };
        fetchAccountDetails();
    }, [accountId]);

    const handleRoleChange = (roleId) => {
        setEditAccount((prev) => {
            const roleIds = prev.roleIds.includes(roleId)
                ? prev.roleIds.filter((id) => id !== roleId) // Remove role
                : [...prev.roleIds, roleId]; // Add role

            return { ...prev, roleIds };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmMessage = accountId
            ? "Bạn có chắc chắn muốn cập nhật thông tin tài khoản này không?"
            : "Bạn có chắc chắn muốn thêm tài khoản này không?";
        const confirmed = window.confirm(confirmMessage);

        if (!confirmed) {
            return; // Stop execution if user cancels
        }

        try {
            if (accountId) {
                await AdminUpdateAccount(accountId, editAccount);
                toast.success("Cập nhật tài khoản thành công");
            } else {
                await AdminCreateAccount(editAccount);
                toast.success("Thêm tài khoản thành công");
            }
            onSave(); // Notify parent component
        } catch (err) {
            toast.error(err.message || "Đã xảy ra lỗi khi lưu dữ liệu");
        }
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
                    {accountId ? "Chỉnh sửa tài khoản" : "Thêm tài khoản"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4">
                        {!accountId ? (
                            <div>
                                <label className="block font-medium text-gray-700 dark:text-gray-300">
                                    Tài khoản
                                </label>
                                <input
                                    type="text"
                                    value={editAccount.userName}
                                    onChange={(e) =>
                                        setEditAccount({
                                            ...editAccount,
                                            userName: e.target.value,
                                        })
                                    }
                                    className="w-full rounded border border-gray-300 p-2 dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                value={editAccount.password}
                                onChange={(e) =>
                                    setEditAccount({
                                        ...editAccount,
                                        password: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-gray-300 p-2 dark:bg-gray-700 dark:text-gray-200"
                            />
                        </div>
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
                                            checked={editAccount.roleIds.includes(
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
                                                    editAccount.roleIds.includes(
                                                        role.roleId,
                                                    )
                                                        ? "bg-green-500"
                                                        : "bg-gray-300 dark:bg-gray-600"
                                                }`}
                                            >
                                                <div
                                                    className={`absolute left-1 top-1 h-3 w-3 transform rounded-full bg-white transition-transform ${
                                                        editAccount.roleIds.includes(
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
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={editAccount.isActive}
                                onChange={(e) =>
                                    setEditAccount({
                                        ...editAccount,
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
                                        editAccount.isActive
                                            ? "bg-green-500"
                                            : "bg-gray-300 dark:bg-gray-600"
                                    }`}
                                >
                                    <div
                                        className={`absolute left-1 top-1 h-3 w-3 transform rounded-full bg-white transition-transform ${
                                            editAccount.isActive
                                                ? "translate-x-5"
                                                : ""
                                        }`}
                                    ></div>
                                </div>
                            </label>
                        </div>
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
                            {accountId ? "Lưu" : "Thêm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AccountForm.propTypes = {
    accountId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default AccountForm;
