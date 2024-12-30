import { useEffect, useState } from "react";
import { getFullUrl } from "../../../services/api/axiosInstance";
import { FavoriteFoodApi } from "../../../services/customerService/Home.jsx";
import FoodDetails from "../menu/FoodDetails.jsx";

function FavoriteFood() {
    const [favoriteFoods, setFavoriteFoods] = useState([]);
    const [selectedFoodId, setSelectedFoodId] = useState(null);

    useEffect(() => {
        const fetchFavoriteFoods = async () => {
            try {
                const response = await FavoriteFoodApi();
                setFavoriteFoods(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchFavoriteFoods();
    }, []);
    return (
        <div className="container mx-auto p-4 pb-7">
            <div className="flex items-center justify-center">
                <h1 className="mb-4 text-2xl font-bold text-teal-700">
                    Món ăn phổ biến
                </h1>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {favoriteFoods.map((favoriteFood) => (
                    <div
                        key={favoriteFood.foodId}
                        className="group relative flex h-auto max-h-60 flex-row overflow-hidden rounded-lg border border-solid border-yellow-500 bg-white shadow-lg hover:shadow-xl md:flex-col"
                        onClick={() => setSelectedFoodId(favoriteFood.foodId)}
                    >
                        {/* Hình ảnh hiển thị trước */}
                        <div className="group relative flex h-auto max-h-56 min-h-24 w-1/3 cursor-pointer items-center justify-center overflow-hidden rounded-t-lg shadow-lg md:h-auto md:w-full md:rounded-l-lg lg:rounded-t-lg">
                            <img
                                src={getFullUrl(favoriteFood.imageUrl)}
                                alt={favoriteFood.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex w-2/3 flex-col justify-center bg-white md:w-full">
                            {/* Thông tin ẩn ban đầu */}
                            <div className="absolute left-0 top-0 hidden h-full w-full transform flex-col items-center justify-center bg-white px-4 duration-500 ease-in-out lg:block lg:translate-y-full lg:hover:translate-y-0 lg:group-hover:translate-y-0">
                                <div className="py-3 text-center text-5xl">
                                    {/* Icon placeholder */}🍔
                                </div>
                                <h2 className="text-lg font-semibold">
                                    {favoriteFood.name}
                                </h2>
                                <p className="line-clamp-2 overflow-hidden pb-3 text-gray-500">
                                    {favoriteFood.description ||
                                        "Không có mô tả"}
                                </p>
                                <p className="py-3 text-right">
                                    {favoriteFood.price.toLocaleString("vi-VN")}
                                    đ
                                </p>
                            </div>
                            {/* Hiển thị chữ mặc định */}
                            <div className="p-3 lg:hidden">
                                <h2 className="text-lg font-semibold">
                                    {favoriteFood.name}
                                </h2>
                                <p className="line-clamp-2 text-gray-500">
                                    {favoriteFood.description ||
                                        "Không có mô tả"}
                                </p>
                                <p className="py-3 text-right">
                                    {favoriteFood.price.toLocaleString("vi-VN")}
                                    đ
                                </p>
                            </div>
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
    );
}

export default FavoriteFood;
