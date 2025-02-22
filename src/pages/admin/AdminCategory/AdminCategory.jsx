import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AdminGetCategories } from "../../../services/adminService/Category";
import CategoryForm from "./CategoryForm"; // Giả sử bạn có một form quản lý Category

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function AdminCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedCategoryId, setExpandedCategoryId] = useState(null);

    const [search, setSearch] = useState("");
    const [editCategoryId, setEditCategoryId] = useState(null); // Lưu ID category đang chỉnh sửa
    const [isAddingCategory, setIsAddingCategory] = useState(false); // Trạng thái thêm danh mục mới

    const searchInputRef = useRef(null);

    // Lấy danh sách category
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await AdminGetCategories(search);
            setCategories(data);
        } catch (err) {
            toast.error(err.message || "Đã xảy ra lỗi");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [search]);

    useEffect(() => {
        if (!loading && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [search]);

    const toggleExpandCategory = (categoryId) => {
        setExpandedCategoryId((prev) =>
            prev === categoryId ? null : categoryId
        );
    };

    const handleAddCategory = () => {
        setEditCategoryId(null);
        setIsAddingCategory(true);
    };

    const handleEditCategory = (categoryId) => {
        setEditCategoryId(categoryId);
        setIsAddingCategory(false);
    };

    const handleCloseEditForm = () => {
        setEditCategoryId(null);
        setIsAddingCategory(false);
    };

    const handleSaveEditCategory = (updatedCategory) => {
        console.log("Lưu danh mục:", updatedCategory);
        setEditCategoryId(null);
        setIsAddingCategory(false); // Đóng form sau khi lưu
        fetchCategories(); // Tải lại danh sách category
    };

    return (
        <div className="px-4 pb-4 dark:bg-gray-600 dark:text-white">
            <h1 className="mb-4 text-center text-3xl font-bold">
                Quản lý Danh mục
            </h1>
            {/* Bộ lọc */}
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm kiếm danh mục..."
                        className="mb-4 rounded border p-2 dark:bg-gray-800 dark:text-white"
                        ref={searchInputRef}
                    />
                    <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="mx-3 mb-[17.6px] flex items-start border px-2 text-4xl text-gray-500 hover:text-red-500 dark:text-white dark:hover:text-red-500"
                    >
                        <i className="fas fa-close"></i>
                    </button>
                </div>

                <div className="mr-4 flex items-center">
                    <button
                        onClick={handleAddCategory}
                        className="mb-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>

            {categories.length > 0 ? (
                <div className="relative max-h-[500px] overflow-y-auto">
                    <table className="w-full table-auto border-collapse dark:bg-gray-800 dark:text-white">
                        <thead className="sticky -top-1 bg-orange-200 dark:bg-teal-900 dark:text-white">
                            <tr>
                                <th className="border px-4 py-2 text-left">
                                    ID
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Ảnh
                                </th>
                                <th className="whitespace-nowrap border px-4 py-2 text-left">
                                    Tên danh mục
                                </th>
                                <th className="whitespace-nowrap border px-4 py-2 text-left">
                                    Mô tả
                                </th>
                                <th className="whitespace-nowrap border px-4 py-2 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <React.Fragment key={category.categoryId}>
                                    {/* Hàng hiển thị thông tin cơ bản */}
                                    <tr
                                        className="cursor-pointer p-3 odd:bg-white even:bg-gray-100 hover:bg-orange-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-600"
                                        onClick={() =>
                                            toggleExpandCategory(
                                                category.categoryId
                                            )
                                        }
                                    >
                                        <td className="border px-4 py-2">
                                            {category.categoryId}
                                        </td>
                                        <td className="mr-3 border object-cover px-2 py-2">
                                            <img
                                                className="h-20 w-20 rounded-md object-cover"
                                                src={`${API_BASE_URL}${category.imgUrl}`}
                                                alt={category.categoryName}
                                            />
                                        </td>
                                        <td className="border px-4 py-2">
                                            {category.categoryName}
                                        </td>
                                        <td className="max-h-[80px] overflow-hidden border px-4 py-2">
                                            <div className="line-clamp-3">
                                                {category.description}
                                            </div>
                                        </td>
                                        <td
                                            className="border px-4 py-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditCategory(
                                                    category.categoryId
                                                );
                                            }}
                                        >
                                            <button className="fa-solid fa-pen-to-square text-xl text-orange-500 hover:scale-105"></button>
                                        </td>
                                    </tr>

                                    {/* Hàng hiển thị chi tiết (nếu mở rộng) */}
                                    {expandedCategoryId ===
                                        category.categoryId && (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="border px-4 py-2"
                                            >
                                                <div className="overflow-hidden transition-all duration-300 ease-in-out">
                                                    <h3 className="mb-2 font-semibold text-gray-700 dark:text-white">
                                                        Chi tiết:
                                                    </h3>
                                                    <div className="grid gap-2">
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            <strong>
                                                                SEO Title:
                                                            </strong>{" "}
                                                            {category.seoTitle}
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            <strong>
                                                                SEO Description:
                                                            </strong>{" "}
                                                            {
                                                                category.seoDescription
                                                            }
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            <strong>
                                                                SEO Keywords:
                                                            </strong>{" "}
                                                            {
                                                                category.seoKeywords
                                                            }
                                                        </p>
                                                    </div>
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
                    Không có danh mục nào để hiển thị.
                </p>
            )}
            {(editCategoryId || isAddingCategory) && (
                <CategoryForm
                    categoryId={editCategoryId}
                    onClose={handleCloseEditForm}
                    onSave={handleSaveEditCategory}
                />
            )}
        </div>
    );
}

export default AdminCategory;
