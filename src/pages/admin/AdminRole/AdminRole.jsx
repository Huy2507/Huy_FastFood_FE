import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
    AdminDeleteRole,
    AdminGetRoles,
} from "../../../services/adminService/Role";
import RoleForm from "./RoleForm";

function AdminRole() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editRoleId, setEditRoleId] = useState(null);
    const [isAddingRole, setIsAddingRole] = useState(false);

    const searchInputRef = useRef(null);

    const fetchRoles = async () => {
        setLoading(true);
        try {
            const data = await AdminGetRoles();
            setRoles(data);
        } catch (err) {
            toast.error(err.message || "Đã xảy ra lỗi");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    useEffect(() => {
        if (!loading && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [loading]);

    const handleAddRole = () => {
        setEditRoleId(null);
        setIsAddingRole(true);
    };

    const handleEditRole = (roleId) => {
        setEditRoleId(roleId);
        setIsAddingRole(false);
    };

    const handleCloseForm = () => {
        setEditRoleId(null);
        setIsAddingRole(false);
    };

    const handleDeleteRole = async (roleId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa vai trò này?")) {
            try {
                await AdminDeleteRole(roleId);
                toast.success("Xóa vai trò thành công");
                fetchRoles();
            } catch (err) {
                toast.error(err.message || "Đã xảy ra lỗi khi xóa vai trò");
            }
        }
    };

    const handleSaveRole = () => {
        fetchRoles();
        handleCloseForm();
    };

    return (
        <div className="px-4 pb-4 dark:bg-gray-600 dark:text-white">
            <h1 className="mb-4 text-center text-3xl font-bold">
                Quản lý Vai trò
            </h1>

            {/* Search and Add */}
            <div className="flex justify-end">
                <button
                    onClick={handleAddRole}
                    className="mb-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                    <i className="fas fa-plus"></i>
                </button>
            </div>

            {roles.length > 0 ? (
                <table className="w-full table-auto border-collapse dark:bg-gray-800 dark:text-white">
                    <thead className="bg-orange-200 dark:bg-teal-900 dark:text-white">
                        <tr>
                            <th className="border px-4 py-2 text-left">ID</th>
                            <th className="border px-4 py-2 text-left">
                                Tên vai trò
                            </th>
                            <th className="border px-4 py-2 text-left">Sửa</th>
                            <th className="border px-4 py-2 text-left">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr
                                key={role.roleId}
                                className="odd:bg-white even:bg-gray-100 hover:bg-orange-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-600"
                            >
                                <td className="border px-4 py-2">
                                    {role.roleId}
                                </td>
                                <td className="border px-4 py-2">
                                    {role.roleName}
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() =>
                                            handleEditRole(role.roleId)
                                        }
                                        className="fa-solid fa-pen-to-square mr-2 text-orange-500 hover:scale-105"
                                    ></button>
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() =>
                                            handleDeleteRole(role.roleId)
                                        }
                                        className="fa-solid fa-trash-can text-red-500 hover:scale-105"
                                    ></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">
                    Không có vai trò nào để hiển thị.
                </p>
            )}

            {(editRoleId || isAddingRole) && (
                <RoleForm
                    roleId={editRoleId}
                    onClose={handleCloseForm}
                    onSave={handleSaveRole}
                />
            )}
        </div>
    );
}

export default AdminRole;
