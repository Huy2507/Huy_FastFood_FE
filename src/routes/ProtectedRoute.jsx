import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/auth/useAuth"; // Đảm bảo đúng đường dẫn

const ProtectedRoute = ({ element: Component, requiredRole }) => {
    const { user, loading } = useAuth();

    // Hiển thị loading khi chưa xác định trạng thái user
    if (loading) {
        return <div>Loading...</div>;
    }

    // Chưa đăng nhập
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Không đủ quyền
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/forbidden" />;
    }

    return <Component />;
};

ProtectedRoute.propTypes = {
    element: PropTypes.elementType.isRequired, // Xác nhận 'element' là một React component
    requiredRole: PropTypes.string, // Xác nhận 'requiredRole' là string (có thể không bắt buộc)
};

export default ProtectedRoute;
