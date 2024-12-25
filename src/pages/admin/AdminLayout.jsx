import PropTypes from "prop-types"; // Import PropTypes
import { useState } from "react";
import DarkModeToggle from "../../components/DarkModeToggle";
import Sidebar from "./Sidebar";

function AdminLayout({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

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
            <div className="flex-1 bg-gray-100">
                {/* Navigation Bar */}
                <nav className="mb-6 flex items-center justify-between bg-white p-4 shadow-md">
                    {/* Toggle Button */}
                    <button
                        onClick={toggleSidebar}
                        className="text-2xl focus:outline-none"
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <DarkModeToggle
                        isDarkMode={isDarkMode}
                        onToggle={handleToggle}
                    />
                </nav>

                {/* Children Content */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

// Add PropTypes validation
AdminLayout.propTypes = {
    children: PropTypes.node.isRequired, // 'children' should be any valid React node
};

export default AdminLayout;
