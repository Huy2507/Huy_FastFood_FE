import { useEffect, useState } from "react";
import { getFullUrl } from "../../../services/api/axiosInstance";
import { MenuApi } from "../../../services/customerService/Menu";

function MenuFood() {
    const [foodsByCategory, setFoodsByCategory] = useState([]); // Danh sách món ăn theo danh mục
    const [popularFoods, setPopularFoods] = useState([]); // Danh sách món ăn phổ biến
    const [searchTerm, setSearchTerm] = useState(""); // Tìm kiếm

    const fetchMenuFood = async () => {
        try {
            const response = await MenuApi(1, searchTerm); // Lấy dữ liệu từ API
            setPopularFoods(response.data.popularFoods); // Lưu món ăn phổ biến
            setFoodsByCategory(
                response.data.foodsByCategory.filter(
                    (category) => category.foods.length > 0,
                ),
            ); // Lưu món ăn theo danh mục
        } catch (error) {
            console.error("Error fetching menu:", error.message);
        }
    };

    // Xử lý thay đổi trang trong danh mục
    const handlePageChange = async (categoryId, page) => {
        try {
            const response = await MenuApi(page, searchTerm);
            const updatedFoodsByCategory = foodsByCategory.map((category) => {
                if (category.category.categoryId === categoryId) {
                    const updatedCategory = response.data.foodsByCategory.find(
                        (cat) => cat.category.categoryId === categoryId,
                    );
                    return updatedCategory || category;
                }
                return category;
            });
            setFoodsByCategory(updatedFoodsByCategory);
        } catch (error) {
            console.error("Error changing page:", error.message);
        }
    };

    useEffect(() => {
        fetchMenuFood();
    }, [searchTerm]);

    return (
        <div className="container mx-auto p-4">
            {/* Input tìm kiếm */}
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm món ăn..."
                className="mb-4 rounded border p-2"
            />
            {/* Món ăn phổ biến */}
            <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-teal-700">
                    Món ăn phổ biến
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {popularFoods.map((food) => (
                        <div
                            key={food.foodId}
                            className="flex cursor-pointer flex-row items-center rounded-lg border border-solid border-yellow-500 shadow-xl md:flex-col"
                        >
                            <img
                                src={getFullUrl(food.imageUrl)}
                                alt={food.name}
                                className="mb-2 h-36 w-1/3 rounded-lg object-cover md:h-44 md:w-full"
                            />
                            <div className="flex w-2/3 flex-col pl-3 text-left md:w-full md:text-center">
                                <h3 className="text-lg font-bold">
                                    {food.name}
                                </h3>
                                <h4 className="line-clamp-2 md:hidden">
                                    {food.description || "Không có mô tả."}
                                </h4>
                                <p className="p-2 text-right font-bold text-gray-600 md:text-center">
                                    {food.price.toLocaleString("vi-VN")} VND
                                </p>
                                <button className="pb-2">Thêm</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {foodsByCategory.map((category) => (
                <div key={category.category.categoryId} className="mb-12">
                    <h2 className="mb-4 text-2xl font-bold text-teal-700">
                        {category.category.categoryName}
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {category.foods.map((food) => (
                            <div
                                key={food.foodId}
                                className="flex cursor-pointer flex-row items-center rounded-lg border border-solid border-yellow-500 shadow-xl md:flex-col"
                            >
                                <img
                                    src={getFullUrl(food.imageUrl)}
                                    alt={food.name}
                                    className="mb-2 h-36 w-1/3 rounded-t-lg object-cover md:h-44 md:w-full"
                                />
                                <div className="flex w-2/3 flex-col pl-3 text-left md:w-full md:text-center">
                                    <h3 className="text-left text-lg font-bold md:text-center">
                                        {food.name}
                                    </h3>
                                    <h4 className="line-clamp-2 md:hidden">
                                        {food.description || "Không có mô tả."}
                                    </h4>
                                    <p className="p-2 text-right font-bold text-gray-600 md:text-center">
                                        {food.price.toLocaleString("vi-VN")} VND
                                    </p>
                                    <button className="pb-2">Thêm</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {category.pagination.totalPages > 1 && (
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                            {/* Nút "Trang trước" */}
                            <button
                                onClick={() =>
                                    handlePageChange(
                                        category.category.categoryId,
                                        category.pagination.currentPage - 1,
                                    )
                                }
                                disabled={category.pagination.currentPage === 1}
                                className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
                            >
                                Trước
                            </button>

                            {/* Nút cho từng trang */}
                            {Array.from(
                                { length: category.pagination.totalPages },
                                (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() =>
                                            handlePageChange(
                                                category.category.categoryId,
                                                index + 1,
                                            )
                                        }
                                        className={`rounded px-4 py-2 ${
                                            category.pagination.currentPage ===
                                            index + 1
                                                ? "bg-teal-500 font-bold text-white"
                                                : "bg-gray-200 hover:bg-teal-200"
                                        }`}
                                        disabled={
                                            category.pagination.currentPage ===
                                            index + 1
                                        }
                                    >
                                        {index + 1}
                                    </button>
                                ),
                            )}

                            {/* Nút "Trang sau" */}
                            <button
                                onClick={() =>
                                    handlePageChange(
                                        category.category.categoryId,
                                        category.pagination.currentPage + 1,
                                    )
                                }
                                disabled={
                                    category.pagination.currentPage ===
                                    category.pagination.totalPages
                                }
                                className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
                            >
                                Sau
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default MenuFood;
