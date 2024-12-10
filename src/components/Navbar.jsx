import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        // Attach the event listener
        window.addEventListener("resize", handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className="flex items-center justify-between bg-red-600 px-4 py-2 text-2xl text-white">
            <div className="flex w-full items-center md:flex-row">
                {/* Hamburger Icon */}
                <button
                    className="text-2xl transition duration-500 md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <i className="fa-solid fa-bars"></i>
                </button>
                {/* Logo */}
                <h1 className="mx-auto flex cursor-pointer text-2xl font-bold hover:scale-105 md:mx-0">
                    <Link to="/">FastFood</Link>
                </h1>

                {/* Navigation Links */}
                <div className="absolute left-0 top-[6%] z-10 w-full bg-red-600 md:static md:top-0 md:flex">
                    <ul
                        className={`mr-3 flex transform flex-col gap-5 pl-4 transition-all duration-500 ease-in-out md:flex md:flex-row md:items-center ${
                            isMenuOpen
                                ? "max-h-screen opacity-100"
                                : "max-h-0 overflow-hidden opacity-0"
                        } md:ml-0 md:block md:max-h-screen md:opacity-100`}
                    >
                        <Link
                            to="/"
                            className="border-b-2 hover:text-yellow-300 md:border-none md:pl-9"
                        >
                            Trang Chủ
                        </Link>
                        <Link
                            to="/menu"
                            className="border-b-2 hover:text-yellow-300 md:border-none"
                        >
                            Thực Đơn
                        </Link>
                        <Link
                            to="/order"
                            className="mb-4 border-b-2 hover:text-yellow-300 md:mb-0 md:border-none"
                        >
                            Order Now
                        </Link>
                    </ul>
                </div>
            </div>
            {/* Cart and Account Icons */}
            <div className="flex items-center justify-center">
                <ul className="flex items-center justify-center">
                    <li className="pr-9">
                        <Link
                            to="/cart"
                            title="Giỏ hàng của bạn."
                            className="group"
                        >
                            <i className="fa-solid fa-cart-shopping group-hover:hidden"></i>
                            <i className="fa-solid fa-cart-flatbed hidden group-hover:block"></i>
                        </Link>
                    </li>
                    <li className="pr-4">
                        <Link
                            to="/my-account"
                            title="Thông tin tài khoản của bạn."
                            className="group"
                        >
                            <i className="fa-regular fa-user group-hover:hidden"></i>
                            <i className="fas fa-user hidden group-hover:block"></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
