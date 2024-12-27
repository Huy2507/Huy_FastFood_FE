import axiosInstance from "../api/axiosInstance";

// Get all banners
export const AdminGetBanners = async () => {
    try {
        const response = await axiosInstance.get("/AdminBanner");
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

// Get banner by ID
export const AdminGetBannerById = async (id) => {
    try {
        const response = await axiosInstance.get(`/AdminBanner/${id}`);
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

// Create a new banner
export const AdminCreateBanner = async (bannerData, bannerImgFile) => {
    try {
        const startDateTime = `${bannerData.startDate}T${bannerData.startTime}`;
        const endDateTime = `${bannerData.endDate}T${bannerData.endTime}`;

        const formData = new FormData();
        formData.append("Title", bannerData.title);
        formData.append("Description", bannerData.description);
        formData.append("SeoTitle", bannerData.seoTitle);
        formData.append("SeoDescript", bannerData.seoDescript);
        formData.append("SeoKeywords", bannerData.SeoKeywords);
        formData.append("StartDate", startDateTime);
        formData.append("EndDate", endDateTime);
        if (bannerImgFile) {
            formData.append("BannerImgFile", bannerImgFile);
        }

        const response = await axiosInstance.post("/AdminBanner", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

// Update a banner
export const AdminUpdateBanner = async (id, bannerData, bannerImgFile) => {
    try {
        const startDateTime = `${bannerData.startDate}T${bannerData.startTime}`;
        const endDateTime = `${bannerData.endDate}T${bannerData.endTime}`;

        const formData = new FormData();
        formData.append("Title", bannerData.title);
        formData.append("Description", bannerData.description);
        formData.append("SeoTitle", bannerData.seoTitle);
        formData.append("SeoDescript", bannerData.seoDescript);
        formData.append("SeoKeywords", bannerData.seoKeywords);
        formData.append("StartDate", startDateTime);
        formData.append("EndDate", endDateTime);
        if (bannerImgFile) {
            formData.append("BannerImgFile", bannerImgFile);
        }

        const response = await axiosInstance.put(
            `/AdminBanner/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

// Delete a banner
export const AdminDeleteBanner = async (id) => {
    try {
        const response = await axiosInstance.delete(`/AdminBanner/${id}`);
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};
