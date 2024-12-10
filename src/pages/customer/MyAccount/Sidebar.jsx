import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Sidebar({ activeButton, setActiveButton, onBack, isMobile }) {
    const navigate = useNavigate();

    const menuItems = [
        {
            id: "editInfo",
            label: "Chỉnh sửa thông tin",
            path: "/my-account/edit-info",
        },
        {
            id: "changePassword",
            label: "Đổi mật khẩu",
            path: "/my-account/change-password",
        },
        { id: "addresses", label: "Địa chỉ", path: "/my-account/addresses" },
        { id: "orders", label: "Đơn hàng đã đặt", path: "/my-account/orders" },
    ];

    const handleButtonClick = (id, path) => {
        setActiveButton(id);
        navigate(path);
        if (isMobile) onBack(); // Close Sidebar on mobile
    };

    const handleSelectChange = (e) => {
        const selectedId = e.target.value;
        const selectedItem = menuItems.find((item) => item.id === selectedId);
        if (selectedItem) {
            handleButtonClick(selectedId, selectedItem.path);
        }
    };

    return (
        <div
            className={`inset-0 z-50 flex bg-white p-4 sm:relative sm:z-auto sm:w-1/4 sm:border-r-2 md:bg-gray-50 ${isMobile ? "absolute -left-[1rem] top-0 h-5 w-screen pt-0" : ""}`}
        >
            {/* Dropdown for Mobile */}
            {isMobile ? (
                <div>
                    <select
                        id="mobileSelect"
                        value={activeButton}
                        onChange={handleSelectChange}
                        className="w-screen rounded-b-lg border-2 border-gray-300 bg-transparent p-3 text-2xl font-bold text-teal-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        {menuItems.map((item) => (
                            <option
                                key={item.id}
                                value={item.id}
                                className="text-2xl font-bold"
                            >
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                /* Buttons for Desktop */
                <div>
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            className={`relative mb-4 w-full rounded-lg p-3 text-left text-2xl font-bold ${
                                activeButton === item.id
                                    ? "relative mb-4 w-full rounded-lg bg-gray-200 p-3 text-left text-2xl font-bold text-teal-900 after:absolute after:left-full after:top-1/2 after:h-0 after:w-0 after:-translate-y-1/2 after:transform after:border-b-[10px] after:border-l-[10px] after:border-t-[10px] after:border-b-transparent after:border-t-transparent after:content-['']"
                                    : "text-teal-700 hover:bg-gray-200"
                            }`}
                            onClick={() =>
                                handleButtonClick(item.id, item.path)
                            }
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

Sidebar.propTypes = {
    activeButton: PropTypes.string.isRequired,
    setActiveButton: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    isMobile: PropTypes.bool,
};

export default Sidebar;
