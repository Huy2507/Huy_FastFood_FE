import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AdminGetCategories } from "../../../services/adminService/Category"; // Import API categories
import {
    AdminGetFoodById,
    AdminUpdateFood,
} from "../../../services/adminService/Food"; // Import API

const FoodForm = ({ foodId, onClose, onSave }) => {
    const [editFood, setEditFood] = useState({
        name: "",
        price: "",
        categoryId: "",
        description: "",
        imageFile: "",
        enable: true,
        isPopular: false,
        seoKeywords: "",
        seoDescription: "",
        seoTitle: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryData = await AdminGetCategories();
                console.log(categories);
                setCategories(categoryData);
            } catch (err) {
                toast.error(err.message || "Đã xảy ra lỗi khi tải dữ liệu");
            }
        };
        fetchData();
    }, []);

    // Fetch food details and categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (foodId) {
                    const foodData = await AdminGetFoodById(foodId);
                    setEditFood(foodData);
                    console.log(foodData);
                }
            } catch (err) {
                toast.error(err.message || "Đã xảy ra lỗi khi tải dữ liệu");
            }
        };
        fetchData();
    }, [foodId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare FormData for API
        const formData = new FormData();
        formData.append("name", editFood.name);
        formData.append("price", editFood.price);
        formData.append("categoryId", editFood.categoryId);
        formData.append("description", editFood.description);
        formData.append("imageFile", editFood.imageFile);
        formData.append("enable", editFood.enable);
        formData.append("isPopular", editFood.isPopular);
        formData.append("seoKeywords", editFood.seoKeywords);
        formData.append("seoDescription", editFood.seoDescription);
        formData.append("seoTitle", editFood.seoTitle);

        if (imageFile) {
            formData.append("imageFile", imageFile);
        }

        try {
            await AdminUpdateFood(foodId, formData);
            toast.success(
                foodId
                    ? "Cập nhật món ăn thành công"
                    : "Thêm món ăn thành công",
            );
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
                    {foodId ? "Chỉnh sửa món ăn" : "Thêm món ăn"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Tên món ăn
                            </label>
                            <input
                                type="text"
                                value={editFood.name}
                                onChange={(e) =>
                                    setEditFood({
                                        ...editFood,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Giá
                            </label>
                            <input
                                type="number"
                                value={editFood.price}
                                onChange={(e) =>
                                    setEditFood({
                                        ...editFood,
                                        price: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Loại
                            </label>
                            <select
                                value={editFood.categoryId}
                                onChange={(e) =>
                                    setEditFood({
                                        ...editFood,
                                        categoryId: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                required
                            >
                                <option value="">-- Chọn loại --</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.categoryId}
                                        value={category.categoryId}
                                    >
                                        {category.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Ảnh
                            </label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setImageFile(e.target.files[0])
                                }
                                className="w-full rounded border border-gray-300 p-1 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Mô tả
                            </label>
                            <textarea
                                value={editFood.description}
                                onChange={(e) =>
                                    setEditFood({
                                        ...editFood,
                                        description: e.target.value,
                                    })
                                }
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
                                value={editFood.seoDescription}
                                onChange={(e) =>
                                    setEditFood({
                                        ...editFood,
                                        seoDescription: e.target.value,
                                    })
                                }
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
                                value={editFood.seoTitle}
                                onChange={(e) =>
                                    setEditFood({
                                        ...editFood,
                                        seoTitle: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                SEO Keywords
                            </label>
                            <input
                                type="text"
                                value={editFood.seoKeywords}
                                onChange={(e) =>
                                    setEditFood({
                                        ...editFood,
                                        seoKeywords: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={editFood.enable}
                                onChange={(e) =>
                                    setEditFood({
                                        ...editFood,
                                        enable: e.target.checked,
                                    })
                                }
                                id="enable-checkbox"
                                className="hidden"
                            />
                            <label
                                htmlFor="enable-checkbox"
                                className="relative flex cursor-pointer items-center"
                            >
                                <span className="mx-2 font-medium text-gray-700 dark:text-gray-300">
                                    Khả dụng:
                                </span>
                                <div
                                    className={`relative h-5 w-10 rounded-full ${
                                        editFood.enable
                                            ? "bg-green-500"
                                            : "bg-gray-300"
                                    } transition-colors duration-300`}
                                >
                                    <div
                                        className={`absolute left-1 top-1 h-3 w-3 rounded-full bg-white transition-transform duration-300 ${
                                            editFood.enable
                                                ? "translate-x-5"
                                                : ""
                                        }`}
                                    ></div>
                                </div>
                            </label>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={editFood.isPopular}
                                onChange={(e) =>
                                    setEditFood({
                                        ...editFood,
                                        isPopular: e.target.checked,
                                    })
                                }
                                id="popular-checkbox"
                                className="hidden"
                            />
                            <label
                                htmlFor="popular-checkbox"
                                className="relative flex cursor-pointer items-center"
                            >
                                <span className="mx-2 font-medium text-gray-700 dark:text-gray-300">
                                    Phổ biến:
                                </span>
                                <div
                                    className={`relative h-5 w-10 rounded-full ${
                                        editFood.isPopular
                                            ? "bg-green-500"
                                            : "bg-gray-300"
                                    } transition-colors duration-300`}
                                >
                                    <div
                                        className={`absolute left-1 top-1 h-3 w-3 rounded-full bg-white transition-transform duration-300 ${
                                            editFood.isPopular
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
                            className="px-4 py-2 font-bold text-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-white"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="rounded bg-green-500 px-4 py-2 font-bold text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                            {foodId ? "Lưu" : "Thêm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

FoodForm.propTypes = {
    foodId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default FoodForm;
