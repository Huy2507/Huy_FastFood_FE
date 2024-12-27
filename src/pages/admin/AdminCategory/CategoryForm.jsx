import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    AdminCreateCategory,
    AdminGetCategoryById,
    AdminUpdateCategory,
} from "../../../services/adminService/Category"; // Import API categories

const CategoryForm = ({ categoryId, onClose, onSave }) => {
    const [categoryData, setCategoryData] = useState({
        categoryName: "",
        description: "",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
        imageFile: "",
    });
    const [imageFile, setImageFile] = useState(null);

    // Fetch category details if categoryId exists
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                if (categoryId) {
                    const data = await AdminGetCategoryById(categoryId);
                    setCategoryData(data);
                }
            } catch (err) {
                toast.error(err.message || "Đã xảy ra lỗi khi tải danh mục");
            }
        };
        fetchCategory();
    }, [categoryId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData({ ...categoryData, [name]: value });
        console.log(categoryData);
        console.log(name, value);
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmMessage = categoryId
            ? "Bạn có chắc chắn muốn cập nhật thông tin món ăn này không?"
            : "Bạn có chắc chắn muốn thêm món ăn này không?";
        const confirmed = window.confirm(confirmMessage);

        if (!confirmed) {
            return; // Nếu người dùng bấm 'Hủy', dừng xử lý
        }

        console.log(categoryData.categoryName);
        try {
            if (categoryId) {
                await AdminUpdateCategory(categoryId, categoryData, imageFile);
                toast.success("Cập nhật danh mục thành công");
            } else {
                await AdminCreateCategory(categoryData, imageFile);
                toast.success("Thêm danh mục thành công");
            }
            onSave(); // Notify parent component
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
                className="w-full max-w-5xl rounded bg-white p-6 shadow-lg dark:bg-gray-900 dark:text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
                    {categoryId ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Tên danh mục
                            </label>
                            <input
                                type="text"
                                name="categoryName"
                                value={categoryData.categoryName}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Ảnh
                            </label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="w-full rounded border border-gray-300 p-1 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Mô tả
                            </label>
                            <textarea
                                name="description"
                                value={categoryData.description}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                SEO Description
                            </label>
                            <textarea
                                name="seoDescription"
                                value={categoryData.seoDescription}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                rows="3"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                SEO Title
                            </label>
                            <input
                                type="text"
                                name="seoTitle"
                                value={categoryData.seoTitle}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                SEO Keywords
                            </label>
                            <input
                                type="text"
                                name="seoKeywords"
                                value={categoryData.seoKeywords}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 font-bold text-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-white"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="rounded bg-green-500 px-4 py-2 font-bold text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                            {categoryId ? "Lưu" : "Thêm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

CategoryForm.propTypes = {
    categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default CategoryForm;
