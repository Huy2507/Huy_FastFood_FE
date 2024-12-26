import { Link } from "react-router-dom";

function ForbiddenPage() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            <h1 className="text-9xl font-bold text-red-500">403</h1>
            <h2 className="mt-4 text-3xl font-semibold">Access Denied</h2>
            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
                Bạn không có quyền truy cập vào trang này.
            </p>
            <Link
                to="/"
                className="mt-6 rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-blue-700"
            >
                Trở về trang chủ
            </Link>
            <Link
                to="/login"
                className="mt-6 rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-blue-700"
            >
                Đến đăng nhập
            </Link>
        </div>
    );
}

export default ForbiddenPage;
