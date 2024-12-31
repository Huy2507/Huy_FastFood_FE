import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for managing cookies

const axiosInstance = axios.create({
    baseURL: "/api", // Đường dẫn gốc cho tất cả các request
    headers: {
        "Content-Type": "application/json",
    },
});

// Thêm interceptor để tự động chèn token vào headers
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get("accessToken"); // Lấy token từ cookies
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Thêm interceptor để xử lý lỗi nếu cần
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    },
);

const API_BASE_URL = "https://localhost:7290"; // URL gốc của backend

export const getFullUrl = (path) =>
    `${API_BASE_URL}/${path}`.replace(/\/+/g, "/");

export default axiosInstance;
