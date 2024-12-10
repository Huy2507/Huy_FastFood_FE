import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { toast } from "react-toastify";
import { getFullUrl } from "../../../services/api/axiosInstance.js";
import { CheckAccessTokenApi } from "../../../services/auth.jsx";
import { AddToCartApi } from "../../../services/customerService/Cart.jsx";
import { RecentFoodsApi } from "../../../services/customerService/Home.jsx";
import FoodDetails from "../menu/FoodDetails.jsx";

function RecentFoods() {
    const [recentFoods, setRecentFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedFoodId, setSelectedFoodId] = useState(null);
    const scrollContainerRef = useRef(null);

    // Kiểm tra token khi load component
    useEffect(() => {
        const checkAccessToken = async () => {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                setIsAuthenticated(false); // Không có token thì không xác thực
                return;
            }

            const isValid = await CheckAccessTokenApi(accessToken);
            setIsAuthenticated(isValid);
        };

        checkAccessToken(); // Gọi kiểm tra token ngay khi component load
    }, []);

    // Lấy dữ liệu món ăn gần đây nếu người dùng đã đăng nhập
    useEffect(() => {
        const fetchRecentFoods = async () => {
            try {
                if (isAuthenticated) {
                    // Chỉ lấy dữ liệu nếu người dùng đã đăng nhập
                    setLoading(true);
                    const data = await RecentFoodsApi();
                    setRecentFoods(data.data);
                }
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentFoods();
    }, [isAuthenticated]);

    // Hàm cuộn ngang
    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        const scrollAmount = container.offsetWidth / 2; // Cuộn 50% chiều rộng container
        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => scroll("right"),
        onSwipedRight: () => scroll("left"),
        trackMouse: true, // Cho phép kéo chuột trên desktop
    });

    // Nếu đang tải dữ liệu, hiển thị thông báo
    if (loading) return <p>Loading recent orders...</p>;

    return (
        isAuthenticated && (
            <div className="container mx-auto p-4">
                <div className="mb-8">
                    <h2 className="mb-4 text-center text-2xl font-bold text-teal-700">
                        Món ăn đã đặt gần đây
                    </h2>
                    <div className="relative">
                        {/* Nút cuộn trái */}
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-3"
                        >
                            <i className="fas fa-angle-left text-2xl"></i>
                        </button>

                        {/* Container có thể cuộn ngang */}
                        <div
                            {...swipeHandlers} // Kích hoạt vuốt
                            ref={scrollContainerRef}
                            className="scrollbar-hide flex touch-pan-x snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
                            style={{
                                WebkitOverflowScrolling: "touch",
                                scrollBehavior: "smooth",
                            }}
                        >
                            {recentFoods.map((food, index) => (
                                <div
                                    key={index}
                                    className="flex min-w-[250px] snap-center flex-col items-center rounded-lg border border-solid border-yellow-500 shadow-xl"
                                    onClick={() =>
                                        setSelectedFoodId(food.foodId)
                                    }
                                >
                                    <img
                                        src={getFullUrl(food.imageUrl)}
                                        alt={food.name}
                                        className="mb-2 h-36 w-full rounded-lg object-cover md:h-44"
                                    />
                                    <div className="flex flex-col items-center p-2 text-center">
                                        <h3 className="text-lg font-bold">
                                            {food.foodName}
                                        </h3>
                                        <p className="p-2 text-lg font-bold text-gray-700">
                                            {food.price.toLocaleString("vi-VN")}{" "}
                                            VND
                                        </p>
                                        <button
                                            className="rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-600"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                AddToCartApi(food.foodId, 1);
                                            }}
                                        >
                                            Thêm
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

                        {/* Nút cuộn phải */}
                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-3"
                        >
                            <i className="fa-solid fa-angle-right text-2xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default RecentFoods;
