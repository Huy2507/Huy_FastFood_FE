import Cookies from "js-cookie"; // Import js-cookie for managing cookies
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GetCartItemsApi } from "../services/customerService/Cart";
import { ListCategoryApi } from "../services/customerService/Home";
import { useCart } from "./CartContext";
import LogoNav from "./LogoNav";
import SidebarLogo from "./SidebarLogo"; // Import SidebarLogo

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [userName, setUserName] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const { cartCount, updateCartCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Scroll to category section based on URL
        const categorySlug = location.pathname.split("/")[2]; // Assuming URL format is /menu/:slug
        if (categorySlug) {
            const categoryElement = document.getElementById(categorySlug);
            if (categoryElement) {
                categoryElement.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    useEffect(() => {
        // Load danh sách category
        const fetchCategories = async (page = 1) => {
            try {
                const data = await ListCategoryApi(page);
                setCategories(data.data);
            } catch (error) {
                toast.error("Không thể tải danh mục.");
                console.log(error.message);
            }
        };

        fetchCategories();
        const token = Cookies.get("accessToken");
        if (token) {
            const decodedToken = jwtDecode(token);

            // Lấy thông tin cần thiết từ token
            const role =
                decodedToken[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ];
            if (
                role === "Admin" ||
                (Array.isArray(role) && role.includes("Admin"))
            ) {
                setIsAdmin(true);
            }
        }

        // Get user name and cart from cookies
        var storedName = Cookies.get("name");
        if (storedName === "undefined") {
            storedName = "Admin";
        }
        setUserName(storedName);
    }, []);

    useEffect(() => {
        const fetchCartItemsCount = async () => {
            try {
                const data = await GetCartItemsApi();
                if (data) {
                    updateCartCount(data.cartItems.length);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchCartItemsCount();
    }, [cartCount]);

    const handleLogout = () => {
        // Clear cookies on logout
        Cookies.remove("name");
        Cookies.remove("cart");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        toast.success("Đăng xuất thành công.");
        navigate("/login");
    };

    return (
        <nav className="z-[101] flex items-center justify-between bg-white px-4 py-3 font-bold text-gray-600 shadow-lg">
            <div className="flex w-full items-center md:flex-row">
                {/* Hamburger Icon */}
                <button
                    className="text-2xl transition duration-500 md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <i className="fa-solid fa-bars"></i>
                </button>

                {/* Logo */}
                <h1 className="z-10 mx-auto flex cursor-pointer text-sm font-bold hover:scale-105 md:mx-0">
                    {/* Logo changes based on screen size */}
                    <Link to="/" className="text-sm">
                        <div className="pl-11 md:hidden">
                            <SidebarLogo /> {/* For mobile */}
                        </div>
                        <div className="hidden md:block">
                            <LogoNav /> {/* For larger screens */}
                        </div>
                    </Link>
                </h1>

                {/* Navigation Links */}
                <div className="absolute left-0 top-[8%] z-10 w-full justify-between bg-white shadow-lg md:static md:top-0 md:flex md:shadow-none">
                    <ul
                        className={`mr-3 flex transform flex-col gap-5 pl-4 transition-all duration-500 ease-in-out md:flex md:flex-row md:items-center md:text-xl ${
                            isMenuOpen
                                ? "max-h-screen opacity-100"
                                : "max-h-0 opacity-0"
                        } md:block md:max-h-screen md:opacity-100`}
                    >
                        <li className="md:hover:scale-105">
                            <Link
                                to="/"
                                className="text-nowrap border-b-2 hover:text-slate-700 md:border-none md:px-6"
                            >
                                Trang Chủ
                            </Link>
                        </li>
                        <li className="group relative mb-4 md:mb-0 md:hover:scale-105">
                            <Link
                                to="/menu"
                                className="cursor-pointer text-nowrap border-b-2 hover:text-slate-700 md:border-none md:px-6"
                            >
                                Thực Đơn
                            </Link>
                            {/* Dropdown Categories */}
                            <ul className="absolute left-0 z-10 hidden w-full min-w-full rounded-md bg-white p-2 shadow-lg md:group-hover:block">
                                {categories?.map((category) => (
                                    <li
                                        key={category.categoryId}
                                        className="px-4 py-2 hover:bg-gray-200"
                                    >
                                        <Link
                                            to={`/menu/${category.slug}`}
                                            className="block"
                                        >
                                            {category.categoryName}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        {isAdmin && (
                            <li className="md:hover:scale-105">
                                <Link
                                    to="/admin"
                                    className="border-b-2 hover:text-slate-700 md:border-none md:px-6"
                                >
                                    Admin
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className="mr-20 flex hidden flex-col md:block">
                        <p>
                            <i className="fa-solid fa-phone mr-2"></i> +84
                            838780712
                        </p>
                        <p>
                            <i className="fa-solid fa-envelope mr-2"></i>{" "}
                            HuyFastFood@fastfood.com
                        </p>
                    </div>
                </div>
            </div>

            {/* Cart and User */}
            <div className="flex items-center space-x-6">
                {/* Cart */}
                <Link
                    to="/cart"
                    title="Giỏ hàng của bạn"
                    className="group relative"
                >
                    <i className="fa-solid fa-cart-shopping text-2xl"></i>
                    {cartCount > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {/* User */}
                {userName ? (
                    <div className="group relative">
                        <button className="flex items-center space-x-2">
                            <Link
                                to="/my-account"
                                className="fas fa-user text-2xl"
                            ></Link>
                            <span className="hidden md:block">{userName}</span>
                        </button>
                        <ul className="absolute -right-3 z-10 hidden w-44 rounded-md bg-white shadow-lg md:group-hover:block">
                            <li className="px-4 py-2 hover:bg-gray-200">
                                <Link to="/my-account">Tài khoản của tôi</Link>
                            </li>
                            <li
                                className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        title="Đăng nhập"
                        className="group flex items-center space-x-2"
                    >
                        <i className="fa-regular fa-user text-2xl"></i>
                        <span className="hidden text-nowrap md:block">
                            Đăng nhập
                        </span>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
