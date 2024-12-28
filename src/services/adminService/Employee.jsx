import axiosInstance from "../api/axiosInstance";

export const AdminGetEmployees = async ({ search, isActive }) => {
    try {
        const params = {};

        if (search) params.search = search;
        if (isActive !== undefined) params.isActive = isActive;

        const response = await axiosInstance.get("/AdminEmployee", { params });
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi khi lấy danh sách nhân viên." };
    }
};

export const AdminGetEmployeeById = async (id) => {
    try {
        const response = await axiosInstance.get(`/AdminEmployee/${id}`);
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi khi lấy thông tin nhân viên." };
    }
};

// Tạo mới một nhân viên
export const AdminCreateEmployee = async (employeeData) => {
    try {
        const response = await axiosInstance.post(
            "/AdminEmployee",
            employeeData,
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
            : { message: "Đã xảy ra lỗi khi tạo mới nhân viên." };
    }
};

export const AdminUpdateEmployee = async (id, employeeData) => {
    try {
        const response = await axiosInstance.put(
            `/AdminEmployee/${id}`,
            employeeData,
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
            : { message: "Đã xảy ra lỗi khi cập nhật thông tin nhân viên." };
    }
};
