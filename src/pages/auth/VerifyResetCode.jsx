import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VerifyResetCodeApi } from "../../services/auth";

function VerifyResetCode() {
    const [resetCode, setResetCode] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem("resetEmail");
        if (!storedEmail) {
            toast.error(
                "Email không tồn tại. Vui lòng thực hiện lại quy trình.",
            );
            navigate("/forgot-password"); // Quay lại nếu không có email
        } else {
            setEmail(storedEmail);
        }
    }, [navigate]);

    const handleVerifyResetCode = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await VerifyResetCodeApi({ email, resetCode });
            toast.success(data); // Hoặc `data.message` nếu backend trả về
            localStorage.setItem("resetCode", resetCode);
            navigate("/reset-password");
        } catch (err) {
            toast.error(err.response?.data || "Có lỗi xảy ra."); // Hiển thị thông báo lỗi từ backend hoặc thông báo mặc định
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Helmet>
                <title>Xác thực mã code</title>
            </Helmet>
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-orange-100 to-lime-100">
                <div className="relative mx-3 grid w-96 grid-cols-1 overflow-hidden rounded-xl border-2 border-black bg-white p-10 shadow-2xl md:w-5/12 md:grid-cols-2">
                    {/* Form bên trái (Đăng nhập) */}
                    <h1 className="mb-6 mr-5 text-3xl font-bold text-gray-800">
                        Nhập mã đặt lại mật khẩu của bạn.
                    </h1>
                    <form
                        onSubmit={handleVerifyResetCode}
                        className="md:border-l-4 md:pl-3"
                    >
                        <div className="relative mb-6">
                            <input
                                type="text"
                                id="resetCodeInput"
                                className="peer block w-full rounded-b-md border-b-2 border-gray-300 bg-transparent px-3 py-2 pr-10 text-sm text-gray-800 placeholder-transparent focus:border-teal-500 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-teal-400"
                                placeholder="aa"
                                value={resetCode}
                                onChange={(e) => setResetCode(e.target.value)}
                            />
                            <label
                                htmlFor="resetCodeInput"
                                className="absolute -top-4 left-1 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-teal-500 dark:text-gray-400 dark:peer-focus:text-teal-400"
                            >
                                Mã làm mới
                            </label>
                            <i className="fas fa-user absolute right-3 top-3 text-gray-400 peer-focus:text-teal-500 dark:text-gray-500 dark:peer-focus:text-teal-400"></i>
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
                            to="/Login"
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
