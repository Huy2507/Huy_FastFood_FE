import { useEffect, useState } from "react";
import { ListBanner } from "../../../services/customerService/Home.jsx";

// Import Swiper.js
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BannerList = () => {
    const [banners, setBanners] = useState([]);
    // Fetch banners from API
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const data = await ListBanner();
                setBanners(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchBanners();
    }, []);
    return (
        <div className="banner-container w-full">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000, // Thời gian giữa các slide (ms)
                    disableOnInteraction: false // Tiếp tục autoplay ngay cả khi người dùng tương tác
                }}
                loop={banners.length > 1} // Bật loop nếu có nhiều hơn 1 banner
                slidesPerView={1}
                slidesPerGroup={1}
                className="w-full" // Swiper class
            >
                {banners.length > 0
                    ? banners.map((banner) => (
                          <SwiperSlide key={banner.id} className="w-full">
                              <img
                                  src={`${API_BASE_URL}${banner.bannerImg}`}
                                  alt={banner.title || "Banner"}
                                  className="h-auto w-full object-cover" // Tailwind classes for responsive images
                              />
                          </SwiperSlide>
                      ))
                    : null}
            </Swiper>
        </div>
    );
};

export default BannerList;
