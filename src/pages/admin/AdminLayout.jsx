import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DarkModeToggle from "../../components/DarkModeToggle";
import Sidebar from "./Sidebar";

function AdminLayout() {
    const [isOpen, setIsOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

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

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar isOpen={isOpen} />

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
                    <DarkModeToggle
                        isDarkMode={isDarkMode}
                        onToggle={handleToggle}
                    />
                </nav>

                {/* Children Content */}
                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
