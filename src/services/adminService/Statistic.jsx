import axiosInstance from "../api/axiosInstance";

/**
 * Gọi API lấy danh sách món ăn bán chạy nhất
 * @param {Object} options - Tham số tùy chọn
 * @param {number} options.year - Năm cần lọc (tùy chọn)
 * @param {number} options.month - Tháng cần lọc (tùy chọn)
 * @param {string} options.period - Khoảng thời gian ("day", "week", "month", "year") (mặc định: "month")
 * @param {number} options.limit - Số lượng món ăn lấy về (mặc định: 10)
 * @returns {Promise<Object>} - Dữ liệu từ API
 */
export const AdminGetBestSellingFoods = async ({
    year,
    month,
    period = "month",
    limit = 10,
} = {}) => {
    try {
        const response = await axiosInstance.get(
            "/AdminStatistic/best-selling-foods",
            {
                params: { year, month, period, limit },
            },
        );
        console.log("year", year);
        console.log(response.data);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || "Đã xảy ra lỗi không xác định.";
        throw new Error(message);
    }
};

/**
 * Gọi API lấy danh sách danh mục phổ biến
 * @param {Object} options - Tham số tùy chọn
 * @param {number} options.year - Năm cần lọc (tùy chọn)
 * @param {number} options.month - Tháng cần lọc (tùy chọn)
 * @param {string} options.period - Khoảng thời gian ("day", "week", "month", "year") (mặc định: "month")
 * @param {number} options.limit - Số lượng danh mục lấy về (mặc định: 5)
 * @returns {Promise<Object>} - Dữ liệu từ API
 */
export const AdminGetPopularCategories = async ({
    year,
    month,
    period = "month",
    limit = 5,
} = {}) => {
    try {
        const response = await axiosInstance.get(
            "/AdminStatistic/popular-categories",
            {
                params: { year, month, period, limit },
            },
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || "Đã xảy ra lỗi không xác định.";
        throw new Error(message);
    }
};

/**
 * Gọi API lấy thống kê số lượng đơn hàng
 * @param {number} year - Năm cụ thể (ví dụ: 2023)
 * @param {number} month - Tháng cụ thể (1-12)
 * @param {string} period - Kiểu thống kê ("day", "week", "month")
 * @returns {Promise<Object>} - Dữ liệu từ API
 */
export const AdminGetOrderCountStatistics = async ({
    year,
    month,
    period = "day",
}) => {
    try {
        const params = { year, month, period };
        const response = await axiosInstance.get(
            "/AdminStatistic/order-count",
            { params },
        );
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

/**
 * Gọi API lấy thống kê doanh thu đơn hàng
 * @param {number} year - Năm cụ thể (ví dụ: 2023)
 * @param {number} month - Tháng cụ thể (1-12)
 * @param {string} period - Kiểu thống kê ("day", "week", "month")
 * @returns {Promise<Object>} - Dữ liệu từ API
 */
export const AdminGetOrderRevenueStatistics = async ({
    year,
    month,
    period = "month",
}) => {
    try {
        const params = { year, month, period };
        const response = await axiosInstance.get(
            "/AdminStatistic/order-revenue",
            { params },
        );
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};
