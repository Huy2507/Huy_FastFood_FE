import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterApi } from "../../services/auth";

function Register({ setIsLogin }) {
    const [register, setRegiter] = useState({
        username: "",
        password: "",
        confirmpassword: "",
        name: "",
        phone: "",
        email: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegiter({
            ...register,
            [name]: value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (register.password !== register.confirmpassword) {
            setError("Mật khẩu không khớp");
            setLoading(false);
            return;
        }

        try {
            const data = await RegisterApi(register);
            toast.success(data.message);

            setTimeout(() => {
                toast.dismiss();
                navigate("/Login");
            }, 3000);
            setIsLogin(true);
        } catch (err) {
            setError(err.message || "Đăng ký thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <div className="relative mx-3 grid w-96 grid-cols-1 overflow-hidden rounded-xl border-2 border-black bg-white p-10 shadow-2xl md:w-5/12">
                <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
                    Đăng Ký
                </h1>
                <form onSubmit={handleRegister}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="relative mb-6">
                            <input
                                type="text"
                                id="userNameInput"
                                className="peer block w-full rounded-b-md border-b-2 border-gray-300 bg-transparent px-3 py-2 pr-10 text-sm text-gray-800 placeholder-transparent focus:border-teal-500 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-teal-400"
                                placeholder="Tài khoản"
                                value={register.userName}
                                name="userName"
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="userNameInput"
                                className="absolute -top-4 left-1 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-teal-500 dark:text-gray-400 dark:peer-focus:text-teal-400"
                            >
                                Tài khoản
                            </label>
                        </div>

                        <div className="relative mb-6">
                            <input
                                type="text"
                                id="nameInput"
                                className="peer block w-full rounded-b-md border-b-2 border-gray-300 bg-transparent px-3 py-2 pr-10 text-sm text-gray-800 placeholder-transparent focus:border-teal-500 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-teal-400"
                                placeholder="Họ tên"
                                value={register.name}
                                name="name"
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="nameInput"
                                className="absolute -top-4 left-1 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-teal-500 dark:text-gray-400 dark:peer-focus:text-teal-400"
                            >
                                Họ tên
                            </label>
                        </div>

                        <div className="relative mb-6">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="passwordInput"
                                className="peer block w-full rounded-b-md border-b-2 border-gray-300 bg-transparent px-3 py-2 pr-10 text-sm text-gray-800 placeholder-transparent focus:border-teal-500 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-teal-400"
                                placeholder="Mật khẩu"
                                value={register.password}
                                name="password"
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="passwordInput"
                                className="absolute -top-4 left-1 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-teal-500 dark:text-gray-400 dark:peer-focus:text-teal-400"
                            >
                                Mật khẩu
                            </label>
                            <i
                                className={`fas ${
                                    showPassword ? "fa-eye-slash" : "fa-eye"
                                } absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-teal-500 dark:text-gray-500 dark:hover:text-teal-400`}
                                onClick={() => setShowPassword((prev) => !prev)}
                            ></i>
                            {register.password &&
                                register.password.length < 6 && (
                                    <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                                        Mật khẩu phải nhiều hơn 6 ký tự
                                    </p>
                                )}
                        </div>

                        <div className="relative mb-6">
                            <input
                                type="text"
                                id="phoneInput"
                                className="peer block w-full rounded-b-md border-b-2 border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 placeholder-transparent focus:border-teal-500 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-teal-400"
                                placeholder="Số điện thoại"
                                value={register.phone}
                                name="phone"
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="phoneInput"
                                className="absolute -top-4 left-1 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-teal-500 dark:text-gray-400 dark:peer-focus:text-teal-400"
                            >
                                Số điện thoại
                            </label>
                        </div>

                        <div className="relative mb-6">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPasswordInput"
                                className="peer block w-full rounded-b-md border-b-2 border-gray-300 bg-transparent px-3 py-2 pr-10 text-sm text-gray-800 placeholder-transparent focus:border-teal-500 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-teal-400"
                                placeholder="Nhập lại mật khẩu"
                                value={register.confirmpassword}
                                name="confirmpassword"
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="confirmPasswordInput"
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
                            {register.confirmpassword != register.password &&
                                register.confirmpassword.length >= 6 && (
                                    <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                                        Không trùng khớp với mật khẩu
                                    </p>
                                )}
                        </div>

                        <div className="relative mb-6">
                            <input
                                type="email"
                                id="emailInput"
                                className="peer block w-full rounded-b-md border-b-2 border-gray-300 bg-transparent px-3 py-2 pr-10 text-sm text-gray-800 placeholder-transparent focus:border-teal-500 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-teal-400"
                                placeholder="Email"
                                value={register.email}
                                name="email"
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="emailInput"
                                className="absolute -top-4 left-1 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-teal-500 dark:text-gray-400 dark:peer-focus:text-teal-400"
                            >
                                Email
                            </label>
                        </div>
                    </div>

                    {error && <div className="mb-4 text-red-500">{error}</div>}

                    <button
                        type="submit"
                        className="mb-3 w-full rounded-md bg-teal-500 py-2 font-bold text-white hover:bg-teal-600"
                        disabled={loading}
                    >
                        {loading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>
                </form>

                <div className="absolute bottom-5 left-1 w-full text-center">
                    <button
                        onClick={() => setIsLogin(true)}
                        className="text-teal-500 hover:underline"
                    >
                        Chuyển sang <strong>Đăng Nhập</strong>
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

// Define PropTypes for the component
Register.propTypes = {
    setIsLogin: PropTypes.func.isRequired, // Validates that setIsLogin is a required function
};

export default Register;
