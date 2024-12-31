import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Sửa lại import jwtDecode
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, requiredRole }) => {
    const token = Cookies.get("accessToken");

    if (token) {
        try {
            const decodedToken = jwtDecode(token);

            // Lấy thông tin role từ token
            const role =
                decodedToken[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ];

            // Kiểm tra trạng thái đăng nhập
            if (!decodedToken) {
                return <Navigate to="/login" />;
            }

            // Kiểm tra quyền truy cập
            if (requiredRole) {
                if (typeof role === "string") {
                    // Trường hợp role là chuỗi
                    if (role !== requiredRole) {
                        return <Navigate to="/forbidden" />;
                    }
                } else if (Array.isArray(role)) {
                    // Trường hợp role là mảng
                    if (!role.includes(requiredRole)) {
                        return <Navigate to="/forbidden" />;
                    }
                } else {
                    // Trường hợp role không hợp lệ
                    return <Navigate to="/forbidden" />;
                }
            }
        } catch (error) {
            console.error("Failed to decode token:", error.message);
            return <Navigate to="/login" />;
        }
    }

    // Nếu không có token, chuyển hướng đến trang login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Render component được bảo vệ
    return <Component />;
};

ProtectedRoute.propTypes = {
    element: PropTypes.elementType.isRequired, // Xác nhận 'element' là một React component
    requiredRole: PropTypes.string, // Xác nhận 'requiredRole' là string (có thể không bắt buộc)
};

export default ProtectedRoute;
