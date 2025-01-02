import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ResetPasswordApi } from "../../services/auth";

function VerifyResetCode() {
    const [resetPassword, setResetPassword] = useState({
        email: "",
        resetCode: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResetPassword({
            ...resetPassword,
            [name]: value,
        });
    };

    useEffect(() => {
        const storedEmail = localStorage.getItem("resetEmail");
        const storedResetCode = localStorage.getItem("resetCode");
        if (!storedEmail || !storedResetCode) {
            toast.error(
                "Email không tồn tại. Vui lòng thực hiện lại quy trình.",
            );
            navigate("/forgot-password");
        } else {
            setResetPassword((prev) => ({
                ...prev,
                email: storedEmail,
                resetCode: storedResetCode,
            }));
        }
    }, [navigate]);

    const handleVerifyResetCode = async (e) => {
        e.preventDefault();

        // Kiểm tra phía client trước khi gọi API
        if (resetPassword.newPassword.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự.");
            return;
        }

        if (resetPassword.newPassword !== resetPassword.confirmNewPassword) {
            toast.error("Mật khẩu xác nhận không trùng khớp.");
            return;
        }

        setLoading(true);

        try {
            const data = await ResetPasswordApi(resetPassword);
            toast.success(data); // Hoặc `data.message` nếu backend trả về
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data || "Có lỗi xảy ra."); // Hiển thị lỗi từ backend hoặc lỗi mặc định
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Helmet>
                <title>Quên mật khẩu</title>
            </Helmet>
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-orange-100 to-lime-100">
                <div className="relative mx-3 grid w-96 grid-cols-1 overflow-hidden rounded-xl border-2 border-black bg-white p-10 shadow-2xl md:w-5/12 md:grid-cols-2">
                    <h1 className="mb-6 mr-5 text-3xl font-bold text-gray-800">
                        Nhập mật khẩu mới của bạn.
                    </h1>
                    <form
                        onSubmit={handleVerifyResetCode}
                        className="md:border-l-4 md:pl-3"
                    >
                        {/* Mật khẩu mới */}
                        <div className="relative mb-6">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="newPasswordInput"
                                className="peer block w-full rounded-b-md border-b-2 border-gray-300 bg-transparent px-3 py-2 pr-10 text-sm text-gray-800 placeholder-transparent focus:border-teal-500 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-teal-400"
                                placeholder="aa"
                                value={resetPassword.newPassword}
                                name="newPassword"
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="newPasswordInput"
                                className="absolute -top-4 left-1 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-teal-500 dark:text-gray-400 dark:peer-focus:text-teal-400"
                            >
                                Mật khẩu mới
                            </label>
                            <i
                                className={`fas ${
                                    showPassword ? "fa-eye-slash" : "fa-eye"
                                } absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-teal-500 dark:text-gray-500 dark:hover:text-teal-400`}
                                onClick={() => setShowPassword((prev) => !prev)}
                            ></i>
                        </div>

                        {/* Nhập lại mật khẩu */}
                        <div className="relative mb-6">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmNewPasswordInput"
                                className="peer block w-full rounded-b-md border-b-2 border-gray-300 bg-transparent px-3 py-2 pr-10 text-sm text-gray-800 placeholder-transparent focus:border-teal-500 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-teal-400"
                                placeholder="aa"
                                value={resetPassword.confirmNewPassword}
                                name="confirmNewPassword"
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="confirmNewPasswordInput"
                                className="absolute -top-4 left-1 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-teal-500 dark:text-gray-400 dark:peer-focus:text-teal-400"
                            >
                                Nhập lại mật khẩu
                            </label>
                            <i
                                className={`fas ${
                                    showConfirmPassword
                                        ? "fa-eye-slash"
                                        : "fa-eye"
                                } absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-teal-500 dark:text-gray-500 dark:hover:text-teal-400`}
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                            ></i>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-md bg-teal-500 py-2 font-bold text-white hover:bg-teal-600"
                            disabled={loading}
                        >
                            {loading ? "Đang xác nhận..." : "Xác nhận"}
                        </button>
                    </form>
                    <div className="mr-2 mt-4 pb-3 text-center text-sm text-gray-600">
                        <Link
                            to="/login"
                            className="text-teal-500 hover:underline"
                        >
                            Trở về <strong>Đăng nhập</strong>
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default VerifyResetCode;
