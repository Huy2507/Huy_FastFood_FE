import { jwtDecode } from "jwt-decode";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginApi } from "../../services/auth";
import Register from "./Register";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLogin, setIsLogin] = useState(true); // Để theo dõi trạng thái login/register
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const loginData = { username, password };

        try {
            const data = await LoginApi(loginData); // Gọi API login
            // Lưu token vào localStorage
            localStorage.setItem("accessToken", data.accessToken);
            if (data.refreshToken) {
                localStorage.setItem("refreshToken", data.refreshToken);
            }
            // Decode token để lấy thông tin người dùng
            const decodedToken = jwtDecode(data.accessToken);

            // Lấy thông tin cần thiết từ token
            const role =
                decodedToken[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ];
            const userName =
                decodedToken[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                ];

            // Hiển thị thông báo thành công
            toast.success(`Xin chào ${userName}, đăng nhập thành công!`);

            // Thực hiện chuyển hướng sau 1 giây
            setTimeout(() => {
                if (role === "Admin") {
                    navigate("/admin");
                } else if (role === "Customer") {
                    navigate("/");
                }
            }, 1000); // 1 giây
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Đăng nhập thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-orange-100 to-lime-100">
                {isLogin ? (
                    <div className="relative mx-3 grid w-96 grid-cols-1 overflow-hidden rounded-xl border-2 border-black bg-white p-10 shadow-2xl md:w-5/12 md:grid-cols-2">
                        {/* Form bên trái (Đăng nhập) */}
                        <div
                            className={`transition-all duration-700 ${isLogin ? "opacity-100" : "translate-x-[-100%] opacity-0"}`}
                        >
                            <h1 className="mb-6 text-3xl font-bold text-gray-800">
                                Đăng Nhập
                            </h1>
                            <form onSubmit={handleLogin}>
                                <div className="relative mb-6">
                                    <input
                                        type="text"
                                        id="userNameInput"
                                        className="peer block w-full rounded-b-md border-b-2 border-gray-300 bg-transparent px-3 py-2 pr-10 text-sm text-gray-800 placeholder-transparent focus:border-teal-500 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-teal-400"
                                        placeholder="aa"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="userNameInput"
                                        className="absolute -top-4 left-1 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-teal-500 dark:text-gray-400 dark:peer-focus:text-teal-400"
                                    >
                                        Tài khoản
                                    </label>
                                    <i className="fas fa-user absolute right-3 top-3 text-gray-400 peer-focus:text-teal-500 dark:text-gray-500 dark:peer-focus:text-teal-400"></i>
                                </div>

                                <div className="relative mb-6">
                                    <input
                                        type="password"
                                        id="passwordInput"
                                        className="peer block w-full rounded-b-md border-b-2 border-gray-300 bg-transparent px-3 py-2 pr-10 text-sm text-gray-800 placeholder-transparent focus:border-teal-500 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-teal-400"
                                        placeholder="aa"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="passwordInput"
                                        className="absolute -top-4 left-1 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-teal-500 dark:text-gray-400 dark:peer-focus:text-teal-400"
                                    >
                                        Mật khẩu
                                    </label>
                                    <i className="fas fa-lock absolute right-3 top-3 text-gray-400 peer-focus:text-teal-500 dark:text-gray-500 dark:peer-focus:text-teal-400"></i>
                                </div>

                                {error && (
                                    <div className="mb-4 text-red-500">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-teal-500 py-2 font-bold text-white hover:bg-teal-600"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Đang đăng nhập..."
                                        : "Đăng Nhập"}
                                </button>
                            </form>
                            <div className="mt-4 pb-3 text-center text-sm text-gray-600">
                                <Link
                                    to="/forgot-password"
                                    className="text-teal-500 hover:underline"
                                >
                                    Quên mật khẩu?
                                </Link>
                            </div>
                            <div className="absolute bottom-5 left-1 w-full text-center">
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-teal-500 hover:underline"
                                >
                                    {isLogin ? (
                                        <span>
                                            Chuyển sang <strong>Đăng ký</strong>
                                        </span>
                                    ) : (
                                        <span>
                                            Chuyển sang{" "}
                                            <strong>Đăng Nhập</strong>
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="ml-3 hidden grid-cols-1 justify-center border-l-4 object-cover md:grid">
                            <h1 className="ml-4 text-center text-2xl font-bold">
                                Chào mừng quay trở lại !!!
                            </h1>
                            <div className="ml-4 grid grid-cols-3 justify-center *:text-center *:text-5xl">
                                <i className="fa-solid fa-burger fa-beat text-orange-400"></i>
                                <i className="fa-solid fa-pizza-slice fa-spin text-orange-500"></i>
                                <i className="fa-solid fa-drumstick-bite fa-shake text-orange-300"></i>
                            </div>
                            <div className="ml-4 grid grid-cols-2 justify-center *:text-center *:text-5xl">
                                <i className="fa-solid fa-cookie fa-flip text-yellow-400"></i>
                                <i className="fa-solid fa-mug-hot fa-fa-bounce text-orange-400"></i>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Register setIsLogin={setIsLogin} />
                )}
            </div>
        </Fragment>
    );
}

export default Login;
