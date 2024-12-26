import PropTypes from "prop-types"; // Import PropTypes
import { Link, useLocation } from "react-router-dom";
import Logo from "../../components/Logo";
import SidebarLogo from "../../components/SidebarLogo";

function Sidebar({ isOpen }) {
    const location = useLocation(); // Get the current path

    const menuItems = [
        {
            path: "/admin/statistic",
            path2: "/admin",
            label: "Thống Kê",
            icon: "fa-chart-simple",
        },
        { path: "/admin/food", label: "Sản Phẩm", icon: "fa-burger" },
        { path: "/admin/category", label: "Danh Mục", icon: "fa-list" },
        { path: "/admin/banner", label: "Banner", icon: "fa-square-minus" },
        { path: "/admin/user", label: "Tài Khoản", icon: "fa-user" },
        {
            path: "/admin/customer",
            label: "Khách Hàng",
            icon: "fa-people-group",
        },
        {
            path: "/admin/employee",
            label: "Nhân Viên",
            icon: "fa-person-praying",
        },
        {
            path: "/admin/role",
            label: "Vai Trò",
            icon: "fa-screwdriver-wrench",
        },
    ];

    return (
        <div
            className={`flex ${isOpen ? "w-64" : "w-16"} z-10 h-screen bg-white text-2xl shadow-lg transition-all duration-300 dark:bg-gray-800 dark:text-gray-200`}
        >
            <div className="flex w-full flex-col">
                {/* Logo */}
                <div className="my-3 flex items-center justify-center">
                    <div
                        className={`${isOpen ? "scale-100 opacity-100" : "scale-50 opacity-50"} transition-all duration-300`}
                    >
                        {isOpen && <Logo />}
                    </div>
                    {!isOpen && <SidebarLogo />}
                </div>

                {/* Menu Items */}
                <div className="flex-1">
                    <ul className="space-y-1 p-2">
                        {menuItems.map((item) => (
                            <li
                                key={item.label}
                                className={`group rounded-lg ${
                                    location.pathname === item.path ||
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
                                        className={`fa-solid ${item.icon} flex min-h-8 min-w-8 items-center justify-center`}
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

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
