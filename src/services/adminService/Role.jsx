import axiosInstance from "../api/axiosInstance";

// Get list of roles with optional search parameter
export const AdminGetRoles = async () => {
    try {
        const response = await axiosInstance.get("/AdminRole");
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

// Get role details by ID
export const AdminGetRoleById = async (id) => {
    try {
        const response = await axiosInstance.get(`/AdminRole/${id}`);
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

// Create a new role
export const AdminCreateRole = async (roleData) => {
    try {
        const response = await axiosInstance.post("/AdminRole", roleData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

// Update an existing role by ID
export const AdminUpdateRole = async (id, roleData) => {
    try {
        const response = await axiosInstance.put(`/AdminRole/${id}`, roleData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

// Delete a role by ID
export const AdminDeleteRole = async (id) => {
    try {
        const response = await axiosInstance.delete(`/AdminRole/${id}`);
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};
