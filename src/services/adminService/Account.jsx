import axiosInstance from "../api/axiosInstance";

export const AdminGetAccounts = async (search, isActive, role) => {
    try {
        const params = {};

        if (search) params.search = search;
        if (isActive !== undefined) params.isActive = isActive;
        if (role) params.role = role;

        const response = await axiosInstance.get("/AdminAccount", { params });

        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

export const AdminGetAccountById = async (id) => {
    try {
        const response = await axiosInstance.get(`/AdminAccount/${id}`);
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "An error occurred" };
    }
};

export const AdminCreateAccount = async (accountData) => {
    try {
        const response = await axiosInstance.post(
            "/AdminAccount",
            accountData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "An error occurred" };
    }
};

export const AdminUpdateAccount = async (id, accountData) => {
    try {
        const response = await axiosInstance.put(
            `/AdminAccount/${id}`,
            accountData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "An error occurred" };
    }
};
