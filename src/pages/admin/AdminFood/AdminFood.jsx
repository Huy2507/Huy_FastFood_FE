import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify"; // Không cần import ToastContainer nữa
import { AdminGetAllFood } from "../../../services/adminService/Food";
import { getFullUrl } from "../../../services/api/axiosInstance";
import FoodForm from "./FoodForm";

function AdminFood() {
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedFoodId, setExpandedFoodId] = useState(null);

    const [search, setSearch] = useState("");
    const [enable, setEnable] = useState("");
    const [isPopular, setIsPopular] = useState("");

    const [editFoodId, setEditFoodId] = useState(null); // Lưu ID món ăn đang chỉnh sửa
    const [isAddingFood, setIsAddingFood] = useState(false); // Trạng thái thêm món ăn

    const searchInputRef = useRef(null);

    const fetchFood = async () => {
        setLoading(true);
        try {
            const data = await AdminGetAllFood({ search, enable, isPopular });
            setFoodItems(data);
        } catch (err) {
            toast.error(err.message || "Đã xảy ra lỗi");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFood();
    }, [search, enable, isPopular]);

    useEffect(() => {
        if (!loading && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [search]);

    const toggleExpandFood = (foodId) => {
        setExpandedFoodId((prev) => (prev === foodId ? null : foodId));
    };

    const handleAddFood = () => {
        setEditFoodId(null);
        setIsAddingFood(true);
        console.log(isAddingFood);
    };

    const handleEditFood = (foodId) => {
        setEditFoodId(foodId);
        setIsAddingFood(false);
    };

    const handleCloseEditForm = () => {
        setEditFoodId(null);
        setIsAddingFood(false);
    };

    const handleSaveEditFood = (updatedFood) => {
        console.log("Lưu món ăn:", updatedFood);
        setEditFoodId(null);
        setIsAddingFood(false); // Đóng form sau khi lưu
        fetchFood(); // Tải lại danh sách món ăn
    };

    // if (loading) {
    //     return <Loading />;
    // }

    return (
        <div className="px-4 pb-4 dark:bg-gray-600 dark:text-white">
            <h1 className="mb-4 text-center text-3xl font-bold">
                Quản lý Sản phẩm
            </h1>
            {/* Bộ lọc */}
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm kiếm món ăn..."
                        className="mb-4 rounded border p-2 dark:bg-gray-800 dark:text-white"
                        ref={searchInputRef}
                    />
                    <select
                        className="h-10 border px-4 dark:bg-gray-800 dark:text-white"
                        value={enable}
                        onChange={(e) => setEnable(e.target.value)}
                    >
                        <option value="">Tất cả (Khả dụng)</option>
                        <option value="true">Khả dụng</option>
                        <option value="false">Không khả dụng</option>
                    </select>
                    <select
                        className="h-10 border px-4 dark:bg-gray-800 dark:text-white"
                        value={isPopular}
                        onChange={(e) => setIsPopular(e.target.value)}
                    >
                        <option value="">Tất cả (Phổ biến)</option>
                        <option value="true">Phổ biến</option>
                        <option value="false">Không phổ biến</option>
                    </select>
                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            setEnable("");
                            setIsPopular("");
                        }}
                        className="mx-3 mb-[17.6px] flex items-start border px-2 text-4xl text-gray-500 hover:text-red-500 dark:text-white dark:hover:text-red-500"
                    >
                        <i className="fas fa-close"></i>
                    </button>
                </div>

                <div className="mr-4 flex items-center">
                    <button
                        onClick={handleAddFood}
                        className="mb-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>

            {foodItems.length > 0 ? (
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
                                <th className="border px-4 py-2 text-left">
                                    Tên
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Giá
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Loại
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Mô Tả
                                </th>
                                <th className="whitespace-nowrap border px-4 py-2 text-left">
                                    Khả dụng
                                </th>
                                <th className="whitespace-nowrap border px-4 py-2 text-left">
                                    Phổ biến
                                </th>
                                <th className="whitespace-nowrap border px-4 py-2 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodItems.map((food) => (
                                <React.Fragment key={food.foodId}>
                                    {/* Hàng hiển thị thông tin cơ bản */}
                                    <tr
                                        key={food.foodId}
                                        className="cursor-pointer p-3 odd:bg-white even:bg-gray-100 hover:bg-orange-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-600"
                                        onClick={() =>
                                            toggleExpandFood(food.foodId)
                                        }
                                    >
                                        <td className="border px-4 py-2">
                                            {food.foodId}
                                        </td>
                                        <td className="mr-3 border object-cover px-2 py-2">
                                            <img
                                                className="h-20 w-20 rounded-md object-cover"
                                                src={getFullUrl(food.imageUrl)}
                                                alt={food.name}
                                            />
                                        </td>
                                        <td className="border px-4 py-2">
                                            {food.name}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {food.price.toLocaleString("vi-VN")}
                                            đ
                                        </td>
                                        <td className="border px-4 py-2">
                                            {food.categoryName}
                                        </td>
                                        <td className="max-h-[80px] overflow-hidden border px-4 py-2">
                                            <div className="line-clamp-3">
                                                {food.description}
                                            </div>
                                        </td>
                                        {/* Khả dụng và Phổ biến */}
                                        <td className="border px-4 py-2 text-center">
                                            {food.enable ? "✅" : "❌"}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {food.isPopular ? "⭐" : "—"}
                                        </td>
                                        <td
                                            className="border px-4 py-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditFood(food.foodId);
                                            }}
                                        >
                                            <button className="fa-solid fa-pen-to-square text-xl text-orange-500 hover:scale-105"></button>
                                        </td>
                                    </tr>

                                    {/* Hàng hiển thị chi tiết (nếu mở rộng) */}
                                    {expandedFoodId === food.foodId && (
                                        <tr>
                                            <td
                                                colSpan="9"
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
                                                            {food.seoTitle}
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            <strong>
                                                                SEO Description:
                                                            </strong>{" "}
                                                            {
                                                                food.seoDescription
                                                            }
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            <strong>
                                                                SEO Keywords:
                                                            </strong>{" "}
                                                            {food.seoKeywords}
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            <strong>
                                                                Slug:
                                                            </strong>{" "}
                                                            {food.slug}
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            <strong>
                                                                Thời gian tạo:
                                                            </strong>{" "}
                                                            {new Date(
                                                                food.createdAt,
                                                            ).toLocaleString()}
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            <strong>
                                                                Cập nhật lần
                                                                cuối:
                                                            </strong>{" "}
                                                            {new Date(
                                                                food.updatedAt,
                                                            ).toLocaleString()}
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
                    Không có món ăn nào để hiển thị.
                </p>
            )}
            {(editFoodId || isAddingFood) && (
                <FoodForm
                    foodId={editFoodId}
                    onClose={handleCloseEditForm}
                    onSave={handleSaveEditFood}
                />
            )}
        </div>
    );
}

export default AdminFood;
