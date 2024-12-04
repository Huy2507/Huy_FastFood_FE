import axiosInstance from "./api/axiosInstance";

export const Login = async () => {
    const response = await axiosInstance.get("/Auth/Login");
    return response.data;
};
