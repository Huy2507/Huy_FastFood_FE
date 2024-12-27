import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    AdminCreateRole,
    AdminGetRoleById,
    AdminUpdateRole,
} from "../../../services/adminService/Role";

const RoleForm = ({ roleId, onClose, onSave }) => {
    const [roleData, setRoleData] = useState({
        roleName: "",
    });

    useEffect(() => {
        const fetchRole = async () => {
            if (roleId) {
                try {
                    const data = await AdminGetRoleById(roleId);
                    setRoleData(data);
                } catch (err) {
                    toast.error(err.message || "Đã xảy ra lỗi khi tải vai trò");
                }
            }
        };
        fetchRole();
    }, [roleId]);

    const handleChange = (e) => {
        setRoleData({ ...roleData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmMessage = roleId
            ? "Bạn có chắc chắn muốn cập nhật thông tin role này không?"
            : "Bạn có chắc chắn muốn thêm role này không?";
        const confirmed = window.confirm(confirmMessage);

        if (!confirmed) {
            return;
        }

        try {
            if (roleId) {
                await AdminUpdateRole(roleId, roleData);
                toast.success("Cập nhật vai trò thành công");
            } else {
                await AdminCreateRole(roleData);
                toast.success("Thêm vai trò thành công");
            }
            onSave();
        } catch (err) {
            toast.error(err.message || "Đã xảy ra lỗi khi lưu dữ liệu");
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-70"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg rounded bg-white p-6 shadow-lg dark:bg-gray-900 dark:text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-4 text-2xl font-bold">
                    {roleId ? "Chỉnh sửa vai trò" : "Thêm vai trò"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="block font-medium">Tên vai trò</label>
                        <input
                            type="text"
                            name="roleName"
                            value={roleData.roleName}
                            onChange={handleChange}
                            className="w-full rounded border p-2 dark:bg-slate-600"
                            required
                        />
                    </div>
                    <div className="mt-4 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 font-bold text-gray-700 dark:text-white"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="rounded bg-green-500 px-4 py-2 font-bold text-white"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

RoleForm.propTypes = {
    roleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default RoleForm;
