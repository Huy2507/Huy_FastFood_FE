import axiosInstance from "../api/axiosInstance";

export const AdminGetCustomers = async ({ search }) => {
    try {
        const params = {};

        if (search) params.search = search;

        const response = await axiosInstance.get("/AdminCustomer", { params });
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi khi lấy danh sách khách hàng." };
    }
};

export const AdminGetCustomerDetails = async ({ id }) => {
    try {
        const response = await axiosInstance.get(`/AdminCustomer/${id}`);
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi khi lấy danh sách khách hàng." };
    }
};

export const AdminGetCustomerOrders = async ({ id, search, status }) => {
    try {
        const params = {};

        if (search) params.search = search;
        if (status) params.status = status;

        const response = await axiosInstance.get(
            `/AdminCustomer/orders/${id}`,
            { params },
        );
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi khi lấy danh sách khách hàng." };
    }
};
