import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../../../components/footer";
import { ChangePasswordApi } from "../../../services/customerService/MyAccount";
import Sidebar from "./Sidebar";

function ChangePassword() {
    const [changePasswordInfo, setChangePasswordInfo] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [activeButton, setActiveButton] = useState("changePassword");
    const [isMobile, setIsMobile] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true); // Control sidebar visibility

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

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setChangePasswordInfo({
            ...changePasswordInfo,
            [name]: value,
        });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm(
            "Bạn có chắc chắn muốn đổi mật khẩu?",
        );

        if (!isConfirmed) return;

        if (
            changePasswordInfo.newPassword !==
            changePasswordInfo.confirmNewPassword
        ) {
            toast.error("Mật khẩu mới và xác nhận mật khẩu không trùng khớp!");
            return;
        }

        setLoading(true);

        try {
            await ChangePasswordApi(changePasswordInfo);
            toast.success("Đổi mật khẩu thành công!");
            setChangePasswordInfo({
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: "",
            });
        } catch (err) {
            toast.error(err.message || "Đổi mật khẩu thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen flex-col">
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
                <div className="relative flex-grow p-8 sm:relative">
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
                    {activeButton === "changePassword" && (
                        <form
                            onSubmit={handleChangePassword}
                            className="mt-10 space-y-6 sm:mt-0"
                        >
                            <div>
                                <label className="block text-lg font-medium">
                                    Mật khẩu cũ:
                                </label>
                                <input
                                    type="password"
                                    className="block w-full rounded rounded-b-md border-b-2 border-gray-300 bg-transparent p-2 text-lg text-green-800 placeholder-transparent focus:border-teal-500 focus:outline-none"
                                    value={changePasswordInfo.oldPassword}
                                    name="oldPassword"
                                    onChange={handlePasswordChange}
                                    placeholder="Mật khẩu cũ"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium">
                                    Mật khẩu mới:
                                </label>
                                <input
                                    type="password"
                                    className="block w-full rounded rounded-b-md border-b-2 border-gray-300 bg-transparent p-2 text-lg text-green-800 placeholder-transparent focus:border-teal-500 focus:outline-none"
                                    value={changePasswordInfo.newPassword}
                                    name="newPassword"
                                    onChange={handlePasswordChange}
                                    placeholder="Mật khẩu mới"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium">
                                    Xác nhận mật khẩu mới:
                                </label>
                                <input
                                    type="password"
                                    className="block w-full rounded rounded-b-md border-b-2 border-gray-300 bg-transparent p-2 text-lg text-green-800 placeholder-transparent focus:border-teal-500 focus:outline-none"
                                    value={
                                        changePasswordInfo.confirmNewPassword
                                    }
                                    name="confirmNewPassword"
                                    onChange={handlePasswordChange}
                                    placeholder="Xác nhận mật khẩu mới"
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    className="mt-6 w-[80%] rounded bg-teal-500 py-2 text-white hover:bg-teal-600 sm:absolute sm:bottom-10 sm:left-24"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Đang đổi mật khẩu..."
                                        : "Đổi mật khẩu"}
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

export default ChangePassword;