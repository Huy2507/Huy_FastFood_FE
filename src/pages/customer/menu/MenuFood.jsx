import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; //
import { getFullUrl } from "../../../services/api/axiosInstance";
import { AddToCartApi } from "../../../services/customerService/Cart";
import { MenuApi } from "../../../services/customerService/Menu";
import FoodDetails from "./FoodDetails";

function MenuFood() {
    const { slug } = useParams();
    const [foodsByCategory, setFoodsByCategory] = useState([]);
    const [popularFoods, setPopularFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFoodId, setSelectedFoodId] = useState(null);
    const categoryRefs = useRef({});
    const navigate = useNavigate();

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

    // Hàm để cuộn đến phần danh mục khi URL chứa slug
    useEffect(() => {
        if (slug) {
            // Kiểm tra xem slug có trùng với slug trong URL không
            const category = foodsByCategory.find(
                (cat) => cat.category.slug.toLowerCase() === slug.toLowerCase(), // Sử dụng slug thay vì categoryName
            );
            if (
                category &&
                categoryRefs.current[category.category.categoryId]
            ) {
                // Cuộn đến phần danh mục đó
                categoryRefs.current[
                    category.category.categoryId
                ].scrollIntoView({
                    behavior: "smooth",
                    block: "start", // Cuộn đến vị trí đầu của phần danh mục
                });
            }
        }
    }, [foodsByCategory]);

    useEffect(() => {
        const handleScroll = () => {
            const popularFoodsElement =
                document.getElementById("popular-foods");
            if (popularFoodsElement) {
                const rect = popularFoodsElement.getBoundingClientRect();
                if (
                    rect.top <= window.innerHeight / 2 &&
                    rect.bottom >= window.innerHeight / 2
                ) {
                    navigate("/menu");
                    return;
                }
            }

            foodsByCategory.forEach((category) => {
                const categoryElement =
                    categoryRefs.current[category.category.categoryId];
                if (categoryElement) {
                    const rect = categoryElement.getBoundingClientRect();
                    if (
                        rect.top <= window.innerHeight / 2 &&
                        rect.bottom >= window.innerHeight / 2
                    ) {
                        // Cập nhật URL với slug của danh mục
                        navigate(`/menu/${category.category.slug}`);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [foodsByCategory, navigate]);

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
            <div id="popular-foods" className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-teal-700">
                    Món ăn phổ biến
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {popularFoods.map((food) => (
                        <div
                            key={food.foodId}
                            className="flex cursor-pointer flex-row items-center rounded-lg border border-solid border-yellow-500 shadow-xl md:flex-col"
                            onClick={() => setSelectedFoodId(food.foodId)}
                        >
                            <img
                                src={getFullUrl(food.imageUrl)}
                                alt={food.name}
                                className="mb-2 h-36 w-1/3 rounded-lg object-cover md:h-44 md:w-full"
                            />
                            <div className="flex w-2/3 flex-col p-1 pl-3 text-left md:w-full md:pl-1 md:text-center">
                                <h3 className="text-lg font-bold">
                                    {food.name}
                                </h3>
                                <h4 className="line-clamp-2 md:hidden">
                                    {food.description || "Không có mô tả."}
                                </h4>
                                <p className="p-2 text-right font-bold text-gray-600 md:text-center">
                                    {food.price.toLocaleString("vi-VN")} VND
                                </p>
                                <button
                                    className="rounded bg-teal-500 px-4 py-2 pb-2 text-white hover:bg-teal-600 md:rounded-b"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        AddToCartApi(food.foodId, 1);
                                    }}
                                >
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* Hiển thị modal khi có món ăn được chọn */}
                    {selectedFoodId && (
                        <FoodDetails
                            id={selectedFoodId}
                            onClose={() => setSelectedFoodId(null)}
                        />
                    )}
                </div>
            </div>

            {/* Các danh mục món ăn */}
            {foodsByCategory.map((category) => (
                <div
                    key={category.category.categoryId}
                    className="mb-12"
                    ref={(el) =>
                        (categoryRefs.current[category.category.categoryId] =
                            el)
                    } // Gán tham chiếu cho mỗi danh mục
                >
                    <h2 className="mb-4 text-2xl font-bold text-teal-700">
                        {category.category.categoryName}
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {category.foods.map((food) => (
                            <div
                                key={food.foodId}
                                className="flex cursor-pointer flex-row items-center rounded-lg border border-solid border-yellow-500 shadow-xl md:flex-col"
                                onClick={() => setSelectedFoodId(food.foodId)}
                            >
                                <img
                                    src={getFullUrl(food.imageUrl)}
                                    alt={food.name}
                                    className="mb-2 h-36 w-1/3 rounded-t-lg object-cover md:h-44 md:w-full"
                                />
                                <div className="flex w-2/3 flex-col p-1 pl-3 text-left md:w-full md:pl-1 md:text-center">
                                    <h3 className="text-left text-lg font-bold md:text-center">
                                        {food.name}
                                    </h3>
                                    <h4 className="line-clamp-2 md:hidden">
                                        {food.description || "Không có mô tả."}
                                    </h4>
                                    <p className="p-2 text-right font-bold text-gray-600 md:text-center">
                                        {food.price.toLocaleString("vi-VN")} VND
                                    </p>
                                    <button
                                        className="rounded bg-teal-500 px-4 py-2 pb-2 text-white hover:bg-teal-600 md:rounded-b"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            AddToCartApi(food.foodId, 1);
                                        }}
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>
                        ))}
                        {selectedFoodId && (
                            <FoodDetails
                                id={selectedFoodId}
                                onClose={() => setSelectedFoodId(null)}
                            />
                        )}
                    </div>

                    {category.pagination.totalPages > 1 && (
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                            {/* Các nút phân trang */}
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
                                    >
                                        {index + 1}
                                    </button>
                                ),
                            )}

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
