import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentStatus = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const paymentStatus = searchParams.get("status");
        if (paymentStatus) {
            setStatus(paymentStatus);
            if (paymentStatus === "completed") {
                toast.success("Thanh toán thành công!");
            } else if (paymentStatus === "Failed") {
                toast.error("Thanh toán thất bại!");
            }
        }
    }, [searchParams]);

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
            <Helmet>
                <title>Trạng thái thanh toán</title>
            </Helmet>
            {status === "completed" ? (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-green-600">
                        Thanh toán thành công!
                    </h2>
                    <p className="mt-2 text-gray-700">
                        Cảm ơn bạn đã thanh toán. Đơn hàng của bạn đã được xử
                        lý.
                    </p>
                    <button
                        className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        onClick={() => (window.location.href = "/")}
                    >
                        Quay lại trang chủ
                    </button>
                </div>
            ) : status === "Failed" ? (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600">
                        Thanh toán thất bại!
                    </h2>
                    <p className="mt-2 text-gray-700">
                        Rất tiếc, thanh toán không thành công. Vui lòng thử lại.
                    </p>
                    <button
                        className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        onClick={() => (window.location.href = "/cart")}
                    >
                        Quay lại giỏ hàng
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-blue-600">
                        Đang xử lý thanh toán...
                    </h2>
                </div>
            )}
        </div>
    );
};

export default PaymentStatus;
