import { useEffect, useState } from "react";
import { getFullUrl } from "../../../services/api/axiosInstance.js";
import { listBanner } from "../../../services/customerService/listBanner.jsx"; // Import axios instance

const BannerList = () => {
    const [banners, setBanners] = useState([]);

    // Fetch banners from API
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const data = await listBanner(); // Đợi kết quả từ API
                setBanners(data); // Cập nhật danh sách banners
            } catch (error) {
                console.log(error.message); // Lưu lỗi nếu xảy ra
            }
        };
        fetchBanners(); // Gọi hàm lấy dữ liệu khi component được mount
    }, []);

    return (
        <div className="banner-container">
            {banners.map((banner) => (
                <div key={banner.id} className="banner-item">
                    <img
                        src={getFullUrl(banner.bannerImg)}
                        alt={banner.title || "Banner"}
                        className="banner-img"
                    />
                    {banner.title && <h2>{banner.title}</h2>}
                    {banner.description && <p>{banner.description}</p>}
                </div>
            ))}
        </div>
    );
};

export default BannerList;
