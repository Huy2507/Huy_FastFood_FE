import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    AdminCreateBanner,
    AdminGetBannerById,
    AdminUpdateBanner,
} from "../../../services/adminService/Banner"; // Import API banners

const BannerForm = ({ bannerId, onClose, onSave }) => {
    const [bannerData, setBannerData] = useState({
        title: "",
        description: "",
        seoDescription: "",
        seoTitle: "",
        seoKeywords: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                if (bannerId) {
                    const data = await AdminGetBannerById(bannerId);

                    // Check if StartDate and EndDate are available before splitting
                    const startDateTime = data.startDate
                        ? data.startDate.split("T")
                        : ["", ""];
                    const endDateTime = data.endDate
                        ? data.endDate.split("T")
                        : ["", ""];

                    setBannerData({
                        title: data.title || "",
                        description: data.description || "",
                        seoDescription: data.seoDescript || "",
                        seoTitle: data.seoTitle || "",
                        seoKeywords: data.seoKeywords || "",
                        startDate: startDateTime[0] || "",
                        startTime: startDateTime[1] || "",
                        endDate: endDateTime[0] || "",
                        endTime: endDateTime[1] || "",
                    });
                }
            } catch (err) {
                toast.error(err.message || "Đã xảy ra lỗi khi tải banner");
            }
        };
        fetchBanner();
    }, [bannerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBannerData({ ...bannerData, [name]: value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmMessage = bannerId
            ? "Bạn có chắc chắn muốn cập nhật Banner này không?"
            : "Bạn có chắc chắn muốn thêm Banner này không?";
        const confirmed = window.confirm(confirmMessage);

        if (!confirmed) {
            return; // Nếu người dùng bấm 'Hủy', dừng xử lý
        }

        try {
            if (bannerId) {
                console.log(bannerData);
                await AdminUpdateBanner(bannerId, bannerData, imageFile);
                toast.success("Cập nhật banner thành công");
            } else {
                await AdminCreateBanner(bannerData, imageFile);
                toast.success("Thêm banner thành công");
            }
            onSave();
        } catch (err) {
            toast.error(err.message || "Đã xảy ra lỗi khi lưu banner");
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-70"
            onClick={onClose}
        >
            <div
                className="w-full max-w-5xl rounded bg-white p-6 shadow-lg dark:bg-gray-900 dark:text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
                    {bannerId ? "Chỉnh sửa Banner" : "Thêm Banner"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Left Column */}
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Tiêu đề
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={bannerData.title}
                                onChange={handleChange}
                                className="w-full rounded border p-2 dark:bg-slate-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Ảnh
                            </label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="w-full rounded border"
                                required={bannerId ? false : true}
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Mô tả
                            </label>
                            <textarea
                                name="description"
                                value={bannerData.description}
                                onChange={handleChange}
                                className="w-full rounded border p-2 dark:bg-slate-600"
                                rows="2"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                SEO Description
                            </label>
                            <textarea
                                name="seoDescription"
                                value={bannerData.seoDescription}
                                onChange={handleChange}
                                className="w-full rounded border p-2 dark:bg-slate-600"
                                rows="2"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                SEO Title
                            </label>
                            <input
                                type="text"
                                name="seoTitle"
                                value={bannerData.seoTitle}
                                onChange={handleChange}
                                className="w-full rounded border p-2 dark:bg-slate-600"
                            />
                        </div>

                        {/* Right Column */}
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                SEO Keywords
                            </label>
                            <input
                                type="text"
                                name="seoKeywords"
                                value={bannerData.seoKeywords}
                                onChange={handleChange}
                                className="w-full rounded border p-2 dark:bg-slate-600"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Ngày bắt đầu
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={bannerData.startDate}
                                onChange={handleChange}
                                className="w-full rounded border p-2 dark:bg-slate-600"
                                required
                            />
                            <input
                                type="time"
                                name="startTime"
                                value={bannerData.startTime}
                                onChange={handleChange}
                                className="mt-2 w-full rounded border p-2 dark:bg-slate-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Ngày kết thúc
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={bannerData.endDate}
                                onChange={handleChange}
                                className="w-full rounded border p-2 dark:bg-slate-600"
                                required
                            />
                            <input
                                type="time"
                                name="endTime"
                                value={bannerData.endTime}
                                onChange={handleChange}
                                className="mt-2 w-full rounded border p-2 dark:bg-slate-600"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 font-bold text-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-white"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="rounded bg-green-500 px-4 py-2 font-bold text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                            {bannerId ? "Lưu" : "Thêm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

BannerForm.propTypes = {
    bannerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default BannerForm;
