import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DarkModeToggle from "../../components/DarkModeToggle";
import ChefSidebar from "./ChefSidebar";

function ChefLayout() {
    const [isOpen, setIsOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const darkModeState = localStorage.getItem("darkMode");
        if (darkModeState === "true") {
            setIsDarkMode(true);
        }
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleToggle = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const handleLogout = () => {
        // Clear cookies on logout
        Cookies.remove("name");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        toast.success("Đăng xuất thành công.");
        navigate("/login");
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <ChefSidebar isOpen={isOpen} />

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 dark:bg-gray-600">
                {/* Navigation Bar */}
                <nav className="flex items-center justify-between bg-white p-2 shadow-md dark:bg-gray-800">
                    {/* Toggle Button */}
                    <button
                        onClick={toggleSidebar}
                        className="text-2xl focus:outline-none dark:text-gray-200"
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <div className="flex flex-row">
                        <DarkModeToggle
                            isDarkMode={isDarkMode}
                            onToggle={handleToggle}
                        />
                        <button
                            className="ml-6 font-bold text-red-500"
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </button>
                    </div>
                </nav>

                {/* Children Content */}
                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default ChefLayout;
