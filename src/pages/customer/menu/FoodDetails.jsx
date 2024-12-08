import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getFullUrl } from "../../../services/api/axiosInstance";
import { AddToCartApi } from "../../../services/customerService/Cart";
import { FoodByIdApi } from "../../../services/customerService/Menu";

function FoodDetails({ id, onClose }) {
    const [foodDetails, setFoodDetails] = useState(null);

    useEffect(() => {
        const fetchFood = async () => {
            try {
                const response = await FoodByIdApi(id);
                setFoodDetails(response);
            } catch (error) {
                toast.error(error.message || "Có lỗi xảy ra!");
            }
        };

        fetchFood();
    }, [id]);

    // Hiển thị loading trong khi chờ dữ liệu
    if (!foodDetails) {
        return (
            <div className="modal">
                <div className="modal-content">
                    <p>Đang tải thông tin món ăn...</p>
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            onClick={onClose}
        >
            <div
                className="relative w-11/12 max-w-lg rounded-lg bg-white p-6 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute right-3 top-3 text-gray-500 hover:text-red-500"
                    onClick={onClose}
                >
                    <i className="fas fa-close text-2xl"></i>
                </button>
                <img
                    src={getFullUrl(foodDetails.imageUrl)}
                    alt={foodDetails.name}
                    className="mb-4 h-48 w-full rounded-lg object-cover"
                />
                <h2 className="mb-2 text-xl font-bold text-teal-700">
                    {foodDetails.name}
                </h2>
                <p className="text-gray-700">
                    {foodDetails.description || "No description available."}
                </p>
                <div className="mt-4 space-y-2 text-gray-600">
                    <p>
                        <span className="font-bold">Giá:</span>{" "}
                        {foodDetails.price.toLocaleString("vi-VN")} VND
                    </p>
                    <p>
                        <span className="font-bold">Loại:</span>{" "}
                        {foodDetails.categoryName}
                    </p>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                        onClick={onClose}
                    >
                        Đóng
                    </button>
                    <button
                        className="rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-600"
                        onClick={() => AddToCartApi(foodDetails.foodId, 1)}
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
}

// Kiểm tra kiểu dữ liệu của props
FoodDetails.propTypes = {
    id: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default FoodDetails;
