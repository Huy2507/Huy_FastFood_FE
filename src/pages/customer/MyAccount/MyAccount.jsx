import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../../components/footer";
import Navbar from "../../../components/Navbar";
import {
    MyAccountApi,
    UpdateMyAccountApi,
} from "../../../services/customerService/MyAccount";
import Sidebar from "./Sidebar";

function MyAccount() {
    const [accountInfo, setAccountInfo] = useState(null);
    const [updateAccountInfo, setUpdateAccountInfo] = useState({
        name: "",
        phone: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);
    const [activeButton, setActiveButton] = useState("editInfo");
    const [isMobile, setIsMobile] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true); // Control sidebar visibility
    const navigate = useNavigate();

    // Check for mobile view
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 640);
            setShowSidebar(true); // Reset sidebar visibility when resizing
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Fetch account information
    useEffect(() => {
        const fetchAccountInfo = async () => {
            try {
                const response = await MyAccountApi();
                setAccountInfo(response);
                setUpdateAccountInfo({
                    name: response.name,
                    phone: response.phone,
                    email: response.email,
                });
            } catch (error) {
                toast.info(
                    error.message ||
                        "Đăng nhập trước để xem thông tin tài khoản!",
                );
                navigate("/Login");
            }
        };

        fetchAccountInfo();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateAccountInfo({
            ...updateAccountInfo,
            [name]: value,
        });
    };

    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm(
            "Bạn có chắc chắn muốn cập nhật thông tin tài khoản?",
        );

        if (!isConfirmed) return;

        setLoading(true);

        try {
            await UpdateMyAccountApi(updateAccountInfo);
            toast.success("Cập nhật tài khoản thành công!");
        } catch (err) {
            toast.error(err.message || "Cập nhật thất bại");
        } finally {
            setLoading(false);
        }
    };

    if (!accountInfo) {
        return <div className="flex h-[70vh]"></div>;
    }

    return (
        <div className="flex h-screen flex-col">
            <Navbar />
            <div className={`flex flex-grow ${isMobile ? "flex-col" : ""}`}>
                {/* Sidebar for Desktop and Mobile */}
                {showSidebar && !isMobile && (
                    <Sidebar
                        activeButton={activeButton}
                        setActiveButton={(id) => {
                            setActiveButton(id);
                            if (isMobile) setShowSidebar(false); // Hide sidebar when a button is clicked on mobile
                        }}
                        onBack={() => setShowSidebar(false)} // Close sidebar on mobile when back is clicked
                        isMobile={isMobile}
                    />
                )}

                {/* Content Section */}
                <div className="relative flex-grow p-8 pb-24 sm:relative">
                    {isMobile && (
                        <Sidebar
                            activeButton={activeButton}
                            setActiveButton={(id) => {
                                setActiveButton(id);
                                if (isMobile) setShowSidebar(false); // Hide sidebar when a button is clicked on mobile
                            }}
                            onBack={() => setShowSidebar(false)} // Close sidebar on mobile when back is clicked
                            isMobile={isMobile}
                        />
                    )}
                    {activeButton === "editInfo" && (
                        <form
                            onSubmit={handleUpdateInfo}
                            className="mt-10 space-y-6 sm:mt-0"
                        >
                            <div>
                                <label className="block text-lg font-medium">
                                    Tên của bạn:
                                </label>
                                <input
                                    type="text"
                                    id="nameInput"
                                    className="block w-full rounded rounded-b-md border-b-2 border-gray-300 bg-transparent p-2 text-lg text-green-800 placeholder-transparent focus:border-teal-500 focus:outline-none"
                                    placeholder="Tên của bạn"
                                    value={updateAccountInfo.name}
                                    name="name"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium">
                                    Số điện thoại:
                                </label>
                                <input
                                    type="text"
                                    id="phoneInput"
                                    className="block w-full rounded rounded-b-md border-b-2 border-gray-300 bg-transparent p-2 text-lg text-green-800 placeholder-transparent focus:border-teal-500 focus:outline-none"
                                    placeholder="Số điện thoại"
                                    value={updateAccountInfo.phone}
                                    name="phone"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium">
                                    Email:
                                </label>
                                <input
                                    type="text"
                                    id="emailInput"
                                    className="block w-full rounded rounded-b-md border-b-2 border-gray-300 bg-transparent p-2 text-lg text-green-800 placeholder-transparent focus:border-teal-500 focus:outline-none"
                                    placeholder="Email"
                                    value={updateAccountInfo.email}
                                    name="email"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    className="mt-6 w-[80%] rounded bg-teal-500 py-2 text-white hover:bg-teal-600 sm:absolute sm:bottom-10 sm:left-24"
                                    disabled={loading}
                                >
                                    {loading ? "Đang cập nhật..." : "Cập nhật"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MyAccount;
