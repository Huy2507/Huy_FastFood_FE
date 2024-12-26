import axiosInstance from "../api/axiosInstance";

export const AdminGetCategories = async (search) => {
    try {
        const params = {};
        if (search) params.search = search;
        const response = await axiosInstance.get("/AdminCategory", { params });
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

// Get category by ID
export const AdminGetCategoryById = async (id) => {
    try {
        const response = await axiosInstance.get(`/AdminCategory/${id}`);
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Đã xảy ra lỗi" };
    }
};

// Create a new category
export const AdminCreateCategory = async (categoryData, imageFile) => {
    try {
        const formData = new FormData();
        formData.append("CategoryName", categoryData.CategoryName);
        formData.append("Description", categoryData.Description);
        formData.append("SeoTitle", categoryData.SeoTitle);
        formData.append("SeoDescription", categoryData.SeoDescription);
        formData.append("SeoKeywords", categoryData.SeoKeywords);
        formData.append("ImageFile", imageFile); // Image file (if any)
        console.log(...formData);
        const response = await axiosInstance.post("/AdminCategory", formData, {
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

// Update a category
export const AdminUpdateCategory = async (id, categoryData, imageFile) => {
    try {
        const formData = new FormData();
        formData.append("CategoryName", categoryData.categoryName);
        formData.append("Description", categoryData.description);
        formData.append("SeoTitle", categoryData.seoTitle);
        formData.append("SeoDescription", categoryData.seoDescription);
        formData.append("SeoKeywords", categoryData.seoKeywords);
        formData.append("ImageFile", imageFile); // New image file (if any)
        console.log(...formData);
        const response = await axiosInstance.put(
            `/AdminCategory/${id}`,
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
