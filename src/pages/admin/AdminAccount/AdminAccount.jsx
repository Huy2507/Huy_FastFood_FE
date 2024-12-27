import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AdminGetAccounts } from "../../../services/adminService/Account";
import { AdminGetRoles } from "../../../services/adminService/Role";
import AccountForm from "./AccountForm"; // Form for account management

function AdminAccount() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [isActive, setIsActive] = useState("");
    const [role, setRole] = useState("");

    const [editAccountId, setEditAccountId] = useState(null); // Store the account ID being edited
    const [isAddingAccount, setIsAddingAccount] = useState(false); // State for adding new account

    const searchInputRef = useRef(null);
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

    // Fetch account data
    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const data = await AdminGetAccounts(search, isActive, role);
            setAccounts(data);
        } catch (err) {
            toast.error(err.message || "Error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, [search, isActive, role]);

    useEffect(() => {
        if (!loading && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [search]);

    const handleAddAccount = () => {
        setEditAccountId(null);
        setIsAddingAccount(true);
    };

    const handleEditAccount = (accountId) => {
        setEditAccountId(accountId);
        setIsAddingAccount(false);
    };

    const handleCloseEditForm = () => {
        setEditAccountId(null);
        setIsAddingAccount(false);
    };

    const handleSaveEditAccount = (updatedAccount) => {
        console.log("Save account:", updatedAccount);
        setEditAccountId(null);
        setIsAddingAccount(false); // Close form after saving
        fetchAccounts(); // Reload account list
    };

    // Function to format date and time
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="px-4 pb-4 dark:bg-gray-600 dark:text-white">
            <h1 className="mb-4 text-center text-3xl font-bold">
                Quản lý Tài Khoản
            </h1>
            {/* Filter */}
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search account..."
                        className="mb-4 rounded border p-2 dark:bg-gray-800 dark:text-white"
                        ref={searchInputRef}
                    />
                    <select
                        className="h-10 border px-4 dark:bg-gray-800 dark:text-white"
                        value={isActive}
                        onChange={(e) => setIsActive(e.target.value)}
                    >
                        <option value="">Tất cả (Hoạt động)</option>
                        <option value="true">Hoạt động</option>
                        <option value="false">Không hoạt động</option>
                    </select>
                    <select
                        className="h-10 border px-4 dark:bg-gray-800 dark:text-white"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="">Tất cả (Vai trò)</option>
                        {roles.map((role) => (
                            <option key={role.roleId}>{role.roleName}</option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            setIsActive("");
                            setRole("");
                        }}
                        className="mx-3 mb-[17.6px] flex items-start border px-2 text-4xl text-gray-500 hover:text-red-500 dark:text-white dark:hover:text-red-500"
                    >
                        <i className="fas fa-close"></i>
                    </button>
                </div>

                <div className="mr-4 flex items-center">
                    <button
                        onClick={handleAddAccount}
                        className="mb-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>

            {accounts.length > 0 ? (
                <div className="relative max-h-[500px] overflow-y-auto">
                    <table className="w-full table-auto border-collapse dark:bg-gray-800 dark:text-white">
                        <thead className="sticky -top-1 bg-orange-200 dark:bg-teal-900 dark:text-white">
                            <tr>
                                <th className="border px-4 py-2 text-left">
                                    ID
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Tên tài khoản
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Các vai trò
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Ngày tạo
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Ngày cập nhật
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Hoạt động
                                </th>
                                <th className="border px-4 py-2 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account) => (
                                <React.Fragment key={account.accountId}>
                                    {/* Basic account information row */}
                                    <tr className="cursor-pointer p-3 odd:bg-white even:bg-gray-100 hover:bg-orange-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-600">
                                        <td className="border px-4 py-2">
                                            {account.accountId}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {account.username}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {account.roles.join(", ")}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {formatDateTime(account.createdAt)}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {formatDateTime(account.updatedAt)}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {account.isActive ? "✅" : "❌"}
                                        </td>
                                        <td
                                            className="border px-4 py-2 text-center"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditAccount(
                                                    account.accountId,
                                                );
                                            }}
                                        >
                                            <button className="fa-solid fa-pen-to-square text-xl text-orange-500 hover:scale-105"></button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">
                    No accounts to display.
                </p>
            )}
            {(editAccountId || isAddingAccount) && (
                <AccountForm
                    accountId={editAccountId}
                    onClose={handleCloseEditForm}
                    onSave={handleSaveEditAccount}
                />
            )}
        </div>
    );
}

export default AdminAccount;
