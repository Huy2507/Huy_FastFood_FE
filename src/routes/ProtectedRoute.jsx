import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, requiredRole }) => {
    // Hiển thị loading khi chưa xác định trạng thái user

    const token = localStorage.getItem("accessToken");
    const decodedToken = jwtDecode(token);

    // Lấy thông tin cần thiết từ token
    const role =
        decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

    // Chưa đăng nhập
    if (!decodedToken) {
        return <Navigate to="/login" />;
    }

    // Không đủ quyền
    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/forbidden" />;
    }

    return <Component />;
};

ProtectedRoute.propTypes = {
    element: PropTypes.elementType.isRequired, // Xác nhận 'element' là một React component
    requiredRole: PropTypes.string, // Xác nhận 'requiredRole' là string (có thể không bắt buộc)
};

export default ProtectedRoute;
