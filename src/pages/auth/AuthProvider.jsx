import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Thêm loading để kiểm tra trạng thái

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decodedUser = jwtDecode(token);

                // Chuyển đổi key chứa role thành key đơn giản
                const userWithRole = {
                    ...decodedUser,
                    role: decodedUser[
                        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                    ],
                };
                setUser(userWithRole); // Cập nhật trạng thái user
            } catch (error) {
                console.log(error);
                localStorage.removeItem("accessToken"); // Xóa token không hợp lệ
            }
        }
        setLoading(false); // Đặt loading = false khi hoàn thành
    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null); // Đặt lại user thành null khi đăng xuất
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
