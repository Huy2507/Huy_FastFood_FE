import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance"; // Import axios instance

const BannerList = () => {
    const [banners, setBanners] = useState([]);

    // Fetch banners from API
    useEffect(() => {
        axiosInstance
            .get("/banners") // Tự động được proxy thành "https://localhost:7290/api/banners"
            .then((response) => {
                setBanners(response.data);
            })
            .catch((error) => {
                console.error("Error fetching banners:", error);
            });
    }, []);

    return (
        <div className="banner-container">
            {banners.map((banner) => (
                <div key={banner.id} className="banner-item">
                    <img
                        src={`/${banner.bannerImg}`}
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
