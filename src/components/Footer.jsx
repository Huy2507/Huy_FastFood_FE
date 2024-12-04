function Footer() {
    return (
        <footer className="bg-red-600 text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Top Section */}
                <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                    {/* Logo and About */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold">FastFood</h1>
                        <p className="text-sm">
                            Serving you delicious meals with speed and quality.
                            Your satisfaction is our priority!
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="mb-4 text-xl font-semibold">
                            Quick Links
                        </h2>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <a href="/" className="hover:text-yellow-300">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/menu"
                                    className="hover:text-yellow-300"
                                >
                                    Menu
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/order"
                                    className="hover:text-yellow-300"
                                >
                                    Order Now
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className="hover:text-yellow-300"
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h2 className="mb-4 text-xl font-semibold">
                            Contact Us
                        </h2>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <i className="fa-solid fa-phone mr-2"></i> +84
                                838780712
                            </li>
                            <li>
                                <i className="fa-solid fa-envelope mr-2"></i>{" "}
                                HuyFastFood@fastfood.com
                            </li>
                            <li>
                                <i className="fa-solid fa-location-dot mr-2"></i>{" "}
                                71/35/6 Điện Biên Phủ, Phường 15, Bình Thạnh,
                                Tp.HCM
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-white opacity-30"></div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-between md:flex-row">
                    <p className="text-sm">
                        © {new Date().getFullYear()} FastFood. All rights
                        reserved.
                    </p>
                    <div className="mt-4 flex gap-4 md:mt-0">
                        <a
                            href="#"
                            className="text-white hover:text-yellow-300"
                            aria-label="Facebook"
                        >
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-yellow-300"
                            aria-label="Twitter"
                        >
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-yellow-300"
                            aria-label="Instagram"
                        >
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
