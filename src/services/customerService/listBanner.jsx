import axiosInstance from "../api/axiosInstance";

export const listBanner = async () => {
    const response = await axiosInstance.get("/Home/banner");
    return response.data;
};
