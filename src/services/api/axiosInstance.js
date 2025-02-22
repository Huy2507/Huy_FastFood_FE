import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for managing cookies
import { useNavigate } from "react-router-dom"; // Để điều hướng
import { RefreshAccessToken } from "../auth";

// URL gốc của backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper để tạo đường dẫn đầy đủ
export const getFullUrl = (path) => {
    // Bỏ đi các dấu / thừa ở đầu path
    const cleanPath = path.replace(/^\//, "");
    return `${API_BASE_URL}/${cleanPath}`.replace(/\/+/g, "/");
};

// Tạo một instance của axios
const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/api`, // Sử dụng URL gốc
    headers: {
        "Content-Type": "application/json"
    }
});

// Interceptor request để tự động chèn AccessToken
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor response để xử lý lỗi 401 và tự động làm mới AccessToken
axiosInstance.interceptors.response.use(
    (response) => response, // Trả về response nếu không có lỗi
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra nếu lỗi là 401 và chưa thử refresh token
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            Cookies.get("refreshToken") &&
            Cookies.remove("accessToken")
        ) {
            originalRequest._retry = true;

            try {
                // Gọi API để làm mới token
                const newAccessToken = await RefreshAccessToken();

                // Gắn token mới vào header và gửi lại request ban đầu
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);

                // Xóa cookies nếu refresh token thất bại
                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");

                // Điều hướng người dùng đến trang đăng nhập
                const navigate = useNavigate();
                navigate("/login");

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
