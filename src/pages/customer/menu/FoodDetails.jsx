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
import {
    addReviewApi,
    getReviewsByFoodApi,
} from "../../../services/customerService/Review";

function FoodDetails() {
    const { id } = useParams(); // Lấy ID từ URL
    const [foodDetails, setFoodDetails] = useState(null);
    const [quantity, setQuantity] = useState(1); // Số lượng người dùng muốn thêm
    const { updateCartCount } = useCart();
    const [reviews, setReviews] = useState([]); // Danh sách bình luận
    const [newComment, setNewComment] = useState(""); // Nội dung bình luận mới
    const [newRating, setNewRating] = useState(5); // Đánh giá mới

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

        const fetchReviews = async () => {
            try {
                const response = await getReviewsByFoodApi(id);
                setReviews(response);
            } catch (error) {
                toast.error(error.message || "Không thể tải bình luận!");
            }
        };

        fetchFood();
        fetchCartItems();
        fetchReviews();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await AddToCartFromFoodDetailsApi(id, quantity);
            const updatedCart = await GetCartItemsApi();
            updateCartCount(updatedCart.cartItems?.length || 0);
        } catch (error) {
            toast.error(error.message || "Không thể thêm món vào giỏ hàng.");
        }
    };

    const handleAddReview = async () => {
        if (!newComment.trim()) {
            toast.warning("Vui lòng nhập bình luận!");
            return;
        }

        const review = {
            foodId: parseInt(id),
            customerId: 1, // Giả sử khách hàng ID là 1 (thay đổi tùy vào logic đăng nhập)
            rating: newRating,
            comment: newComment,
        };

        try {
            await addReviewApi(review);
            setNewComment(""); // Xóa nội dung bình luận sau khi thêm
            setNewRating(5); // Reset rating
            toast.success("Bình luận đã được thêm!");

            // Cập nhật danh sách bình luận
            const updatedReviews = await getReviewsByFoodApi(id);
            setReviews(updatedReviews);
        } catch (error) {
            toast.error(error.message || "Không thể thêm bình luận!");
        }
    };

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce(
            (acc, review) => acc + review.rating,
            0,
        );
        return (totalRating / reviews.length).toFixed(1); // Trả về giá trị trung bình (làm tròn 1 chữ số thập phân)
    };

    const averageRating = calculateAverageRating();
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
                {/* Food Details */}
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
                        <span className="ml-4 text-2xl text-yellow-500">
                            {averageRating}⭐
                        </span>
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
                            onClick={() =>
                                setQuantity((prev) =>
                                    prev > 1 ? prev - 1 : prev,
                                )
                            }
                        >
                            -
                        </button>
                        <span className="text-2xl">{quantity}</span>
                        <button
                            className="rounded-full bg-gray-300 px-4 py-2 hover:bg-gray-400"
                            onClick={() => setQuantity((prev) => prev + 1)}
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

            {/* Phần bình luận */}
            <div className="container mx-auto my-10 rounded-lg bg-white p-4 shadow-lg">
                <h3 className="mb-4 text-2xl font-bold text-teal-700">
                    Bình luận
                </h3>
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.reviewId} className="border-b pb-4">
                            <p className="font-semibold">
                                {review.customerName}
                            </p>
                            <p className="text-gray-600">{review.comment}</p>
                            <p className="text-yellow-500">
                                {"⭐".repeat(review.rating)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Thêm bình luận */}
                <div className="mt-6">
                    <textarea
                        className="w-full rounded-lg border p-3"
                        rows="3"
                        placeholder="Nhập bình luận..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <div className="mt-4 flex justify-between">
                        <select
                            className="rounded-lg border p-2"
                            value={newRating}
                            onChange={(e) =>
                                setNewRating(parseInt(e.target.value))
                            }
                        >
                            {[1, 2, 3, 4, 5].map((star) => (
                                <option key={star} value={star}>
                                    {star} Sao
                                </option>
                            ))}
                        </select>
                        <button
                            className="rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-teal-600"
                            onClick={handleAddReview}
                        >
                            Thêm bình luận
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default FoodDetails;
