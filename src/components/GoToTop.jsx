import { useEffect, useState } from "react";

function GoToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Hiển thị nút khi người dùng cuộn xuống một khoảng nhất định
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Cuộn về đầu trang
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-full border-2 bg-gray-100 p-4 text-black shadow-lg hover:bg-gray-300 focus:outline-none"
                >
                    <i className="fas fa-chevron-up text-lg"></i>
                </button>
            )}
        </div>
    );
}

export default GoToTop;
