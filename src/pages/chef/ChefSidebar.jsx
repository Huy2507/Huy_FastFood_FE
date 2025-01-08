import PropTypes from "prop-types"; // Import PropTypes
import { Link, useLocation } from "react-router-dom";
import Logo from "../../components/Logo";
import SidebarLogo from "../../components/SidebarLogo";

function ChefSidebar({ isOpen }) {
    const location = useLocation(); // Get the current path

    const menuItems = [
        {
            path: "/chef/order",
            label: "Đơn Hàng",
            icon: "fa-regular fa-rectangle-list",
        },
        { path: "/chef/food", label: "Sản Phẩm", icon: "fas fa-burger" },
    ];

    return (
        <div
            className={`flex ${isOpen ? "w-64" : "w-16"} z-10 h-screen bg-white text-2xl shadow-lg transition-all duration-300 dark:bg-gray-800 dark:text-gray-200`}
        >
            <div className="flex w-full flex-col">
                {/* Logo */}
                <Link to="/">
                    <div className="my-3 flex items-center justify-center">
                        <div
                            className={`${isOpen ? "scale-100 opacity-100" : "scale-50 opacity-50"} transition-all duration-300`}
                        >
                            {isOpen && <Logo />}
                        </div>
                        {!isOpen && <SidebarLogo />}
                    </div>
                </Link>

                {/* Menu Items */}
                <div className="flex-1">
                    <ul className="space-y-1 p-2">
                        {menuItems.map((item) => (
                            <li
                                key={item.label}
                                className={`group rounded-lg ${
                                    location.pathname.startsWith(item.path) ||
                                    location.pathname === item.path2
                                        ? "border-4 border-orange-500 bg-orange-100 text-gray-600 dark:bg-gray-700 dark:text-orange-400"
                                        : "border-4 border-transparent hover:border-orange-500 hover:bg-orange-100 dark:hover:bg-gray-700 dark:hover:text-orange-400"
                                }`}
                            >
                                <Link
                                    to={item.path}
                                    className={`flex items-center ${
                                        isOpen ? "" : "justify-center"
                                    } space-x-2 rounded-lg p-2 transition-all duration-200`}
                                >
                                    <i
                                        className={` ${item.icon} flex min-h-8 min-w-8 items-center justify-center`}
                                    ></i>
                                    {isOpen && (
                                        <span className="overflow-hidden whitespace-nowrap transition-all duration-300">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

ChefSidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

export default ChefSidebar;
