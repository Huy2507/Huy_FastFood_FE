import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading1, setLoading] = useState(true); // Loading state to check user authentication
    const [errorMessage, setErrorMessage] = useState(null); // For handling error messages
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            try {
                const decodedUser = jwtDecode(token);

                // Check if the token is expired
                const expirationTime = decodedUser.exp * 1000; // Convert from seconds to milliseconds
                const currentTime = Date.now();

                if (currentTime > expirationTime) {
                    setErrorMessage("Session expired. Please log in again.");
                    localStorage.removeItem("accessToken");
                    setUser(null);
                    toast.error("Hết phiên đăng nhập. Vui lòng đăng nhập lại!");
                    navigate("/login");
                    return;
                }

                // Chuyển đổi key chứa role thành key đơn giản
                const userWithRole = {
                    ...decodedUser,
                    role: decodedUser[
                        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                    ],
                };
                setUser(userWithRole); // Update user state
            } catch (error) {
                console.log(error);
                localStorage.removeItem("accessToken"); // Remove invalid token
                setErrorMessage("Invalid token. Please log in again.");
                toast.error("Invalid token. Please log in again.");
                navigate("/login");
            }
        } else {
            setErrorMessage("You need to log in.");
        }

        setLoading(false); // Set loading to false once the check is complete
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null); // Set user to null upon logout
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{ user, setUser, logout, loading1, errorMessage }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
