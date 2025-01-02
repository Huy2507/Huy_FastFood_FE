import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "./api/axiosInstance";

export const LoginApi = async (loginData) => {
    try {
        const response = await axiosInstance.post("/Auth/Login", loginData);
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const RegisterApi = async (registerData) => {
    try {
        const response = await axiosInstance.post(
            "/Auth/Register",
            registerData,
        );
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const ForgotPasswordApi = async (email) => {
    try {
        const response = await axiosInstance.post("/Auth/forgot-password", {
            email: email, // Truyền dưới dạng đối tượng
        });
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw error; // Đảm bảo lỗi được ném ra để xử lý ở phía gọi API
    }
};

export const VerifyResetCodeApi = async ({ email, resetCode }) => {
    try {
        const response = await axiosInstance.post("/Auth/verify-reset-code", {
            email,
            resetCode,
        });
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw error; // Ném lỗi ra ngoài để xử lý trong `catch`
    }
};

export const ResetPasswordApi = async (ResetPasswordData) => {
    try {
        const response = await axiosInstance.post(
            "/Auth/reset-password",
            ResetPasswordData,
        );
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw error; // Ném lỗi ra ngoài để xử lý trong `catch`
    }
};

export const CheckAccessTokenApi = async (accessToken) => {
    try {
        const response = await axiosInstance.post("/Auth/verify-access-token", {
            accessToken: accessToken,
        });

        if (response.data.message === "Access token is valid.") {
            return true; // Token hợp lệ
        } else if (response.data.message === "Access token has expired.") {
            return false; // Token hết hạn
        } else {
            return false; // Trường hợp khác
        }
    } catch (error) {
        console.error("Error verifying access token", error);
        return false; // Nếu có lỗi xảy ra trong quá trình kiểm tra
    }
};

export const RefreshAccessToken = async () => {
    try {
        const refreshToken = Cookies.get("refreshToken");
        const userId = getUserIdFromToken(); // Lấy userId từ AccessToken

        if (!refreshToken || !userId) {
            throw new Error("RefreshToken hoặc UserId không tồn tại");
        }

        const response = await axiosInstance.post("/Auth/RefreshToken", {
            refreshToken,
            userId,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Cập nhật cookies với token mới
        Cookies.set("accessToken", accessToken, {
            secure: true,
            sameSite: "Strict",
        });
        Cookies.set("refreshToken", newRefreshToken, {
            secure: true,
            sameSite: "Strict",
        });

        return accessToken;
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw error;
    }
};

const getUserIdFromToken = () => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
        console.error("AccessToken không tồn tại");
        return null;
    }

    try {
        const decodedToken = jwtDecode(accessToken);
        return decodedToken.UserId || null; // Trích xuất userId từ token
    } catch (error) {
        console.error("Lỗi khi giải mã token:", error);
        return null;
    }
};
