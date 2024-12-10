import axiosInstance from "../api/axiosInstance";

export const MyAccountApi = async () => {
    try {
        const response = await axiosInstance.get("/MyAccount/my-account");
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const UpdateMyAccountApi = async (updateAccoountInfo) => {
    try {
        const response = await axiosInstance.put(
            "/MyAccount/update-my-account",
            updateAccoountInfo,
        );
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const ChangePasswordApi = async (changePasswordInfo) => {
    try {
        const response = await axiosInstance.put(
            "/MyAccount/change-password",
            changePasswordInfo,
        );
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};
