import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AdminGetBanners } from "../../../services/adminService/Banner";
import BannerForm from "./BannerForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AdminBanner() {
    const [banners, setBanners] = useState([]);

    const [editBannerId, setEditBannerId] = useState(null);
    const [isAddingBanner, setIsAddingBanner] = useState(false);
    const [expandedBannerId, setExpandedBannerId] = useState(null);

    const fetchBanners = async () => {
        try {
            const data = await AdminGetBanners();
            setBanners(data);
        } catch (err) {
            toast.error(err.message || "Đã xảy ra lỗi khi tải banner");
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const toggleExpandBanner = (bannerId) => {
        setExpandedBannerId((prev) => (prev === bannerId ? null : bannerId));
    };

    const handleAddBanner = () => {
        setEditBannerId(null);
        setIsAddingBanner(true);
    };

    const handleEditBanner = (bannerId) => {
        setEditBannerId(bannerId);
        setIsAddingBanner(false);
    };

    const handleCloseForm = () => {
        setEditBannerId(null);
        setIsAddingBanner(false);
    };

    const handleSaveBanner = () => {
        fetchBanners();
        handleCloseForm();
    };

    // Function to format date and time
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="px-4 pb-4 dark:bg-gray-600 dark:text-white">
            <h1 className="mb-4 text-center text-3xl font-bold">
                Quản lý Banner
            </h1>
            <div className="mb-4 flex justify-end">
                <button
                    onClick={handleAddBanner}
                    className="mr-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            {banners.length > 0 ? (
                <div className="relative max-h-[500px] overflow-y-auto">
                    <table className="w-full table-auto border-collapse dark:bg-gray-800 dark:text-white">
                        <thead className="sticky -top-1 bg-orange-200 dark:bg-teal-900 dark:text-white">
                            <tr>
                                <th className="border px-4 py-2 text-left">
                                    ID
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Hình ảnh
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Tiêu đề
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Mô tả
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Ngày bắt đầu
                                </th>
                                <th className="border px-4 py-2 text-left">
                                    Ngày kết thúc
                                </th>
                                <th className="border px-4 py-2 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners.map((banner) => (
                                <React.Fragment key={banner.id}>
                                    {/* Row displaying basic information */}
                                    <tr
                                        className="cursor-pointer p-3 odd:bg-white even:bg-gray-100 hover:bg-orange-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-600"
                                        onClick={() =>
                                            toggleExpandBanner(banner.id)
                                        }
                                    >
                                        <td className="border px-4 py-2">
                                            {banner.id}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <img
                                                className="h-20 rounded-md"
                                                src={`${API_BASE_URL}${banner.bannerImg}`}
                                                alt={banner.title}
                                            />
                                        </td>
                                        <td className="border px-4 py-2">
                                            {banner.title}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {banner.description}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {formatDateTime(banner.startDate)}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {formatDateTime(banner.endDate)}
                                        </td>
                                        <td
                                            className="border px-4 py-2 text-center"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditBanner(banner.id);
                                            }}
                                        >
                                            <button className="fa-solid fa-pen-to-square text-xl text-orange-500 hover:scale-105"></button>
                                        </td>
                                    </tr>

                                    {/* Row displaying additional details (if expanded) */}
                                    {expandedBannerId === banner.id && (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="border px-4 py-2"
                                            >
                                                <div>
                                                    <h3 className="mb-2 font-semibold">
                                                        Chi tiết Banner:
                                                    </h3>
                                                    <p>
                                                        <strong>
                                                            SEO Title:
                                                        </strong>{" "}
                                                        {banner.seoTitle}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            SEO Description:
                                                        </strong>{" "}
                                                        {banner.seoDescription}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            SEO Keywords:
                                                        </strong>{" "}
                                                        {banner.seoKeywords}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">
                    Không có banner nào để hiển thị.
                </p>
            )}
            {(editBannerId || isAddingBanner) && (
                <BannerForm
                    bannerId={editBannerId}
                    onClose={handleCloseForm}
                    onSave={handleSaveBanner}
                />
            )}
        </div>
    );
}

export default AdminBanner;
