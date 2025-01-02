import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../../components/CartContext";
import Footer from "../../../components/footer";
import Loading from "../../../components/Loading";
import Navbar from "../../../components/Navbar";
import { getFullUrl } from "../../../services/api/axiosInstance";
import {
    AddToCartFromFoodDetailsApi,
    GetCartItemsApi,
} from "../../../services/customerService/Cart";
import { FoodByIdApi } from "../../../services/customerService/Menu";

function FoodDetails() {
    const { id } = useParams(); // Lấy ID từ URL
    const [foodDetails, setFoodDetails] = useState(null);
    const [quantity, setQuantity] = useState(1); // Số lượng người dùng muốn thêm
    const { updateCartCount } = useCart();

    useEffect(() => {
        const fetchFood = async () => {
            try {
                const response = await FoodByIdApi(id);
                setFoodDetails(response);
            } catch (error) {
                toast.error(error.message || "Có lỗi xảy ra!");
            }
        };

        const fetchCartItems = async () => {
            try {
                const response = await GetCartItemsApi();
                // Tìm xem món ăn hiện tại có trong giỏ không và lấy số lượng
                const cartItem = response.cartItems.find(
                    (item) => item.foodId === parseInt(id),
                );
                setQuantity(cartItem ? cartItem.quantity : 0);
            } catch (error) {
                toast.error(
                    error.message ||
                        "Có lỗi xảy ra khi lấy thông tin giỏ hàng!",
                );
            }
        };

        fetchFood();
        fetchCartItems();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await AddToCartFromFoodDetailsApi(id, quantity);

            const updatedCart = await GetCartItemsApi();
            if (Array.isArray(updatedCart.cartItems)) {
                updateCartCount(updatedCart.cartItems.length);
            } else {
                updateCartCount(0);
            }
        } catch (error) {
            console.log(error);
            toast.error("Không thể thêm món vào giỏ hàng.");
        }
    };

    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (!foodDetails) {
        return <Loading />;
    }

    return (
        <div className="flex h-screen flex-col bg-gray-100">
            <Helmet>
                <title>{foodDetails.seoTitle || foodDetails.name}</title>
                <meta
                    name="description"
                    content={
                        foodDetails.seoDescription || foodDetails.description
                    }
                />
                <meta name="keywords" content={foodDetails.seoKeywords || ""} />
            </Helmet>
            <Navbar />
            <div className="container mx-auto my-10 flex flex-col rounded-lg bg-white p-4 shadow-lg md:flex-row">
                <div className="mb-4 flex items-center justify-center md:mb-0 md:w-1/2">
                    <img
                        src={getFullUrl(foodDetails.imageUrl)}
                        alt={foodDetails.name}
                        className="h-80 w-full transform rounded-lg object-cover shadow-md transition-transform duration-500 hover:scale-105"
                    />
                </div>
                <div className="ml-5 flex flex-col md:w-1/2">
                    <h2 className="mb-4 text-3xl font-bold text-teal-700">
                        {foodDetails.name}
                    </h2>
                    <p className="mb-6 text-lg text-gray-600">
                        {foodDetails.description || "No description available."}
                    </p>
                    <div className="space-y-4 text-gray-700">
                        <p className="text-lg">
                            <span className="font-semibold">Giá:</span>{" "}
                            {foodDetails.price.toLocaleString("vi-VN")} VND
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold">Loại:</span>{" "}
                            {foodDetails.categoryName}
                        </p>
                    </div>

                    <div className="mt-6 flex items-center gap-4 text-xl">
                        <button
                            className="rounded-full bg-gray-300 px-4 py-2 hover:bg-gray-400"
                            onClick={handleDecrease}
                        >
                            -
                        </button>
                        <span className="text-2xl">{quantity}</span>
                        <button
                            className="rounded-full bg-gray-300 px-4 py-2 hover:bg-gray-400"
                            onClick={handleIncrease}
                        >
                            +
                        </button>
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            className="rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-teal-600"
                            onClick={handleAddToCart}
                        >
                            {quantity > 0
                                ? "Cập nhật giỏ hàng"
                                : "Thêm vào giỏ hàng"}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default FoodDetails;
