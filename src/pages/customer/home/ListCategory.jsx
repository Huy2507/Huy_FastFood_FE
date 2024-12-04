import { useEffect, useState } from "react";
import { getFullUrl } from "../../../services/api/axiosInstance";
import { ListCategoryApi } from "../../../services/customerService/Home.jsx";

function ListCategory() {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Hàm lấy dữ liệu danh mục từ API với phân trang
    const fetchCategories = async (page = 1) => {
        try {
            const response = await ListCategoryApi(page); // Truyền page vào API
            setCategories(response.data);
            setTotalPages(response.pagination.totalPages); // Cập nhật số trang
        } catch (error) {
            console.log(error.message);
        }
    };

    // Gọi fetchCategories mỗi khi currentPage thay đổi
    useEffect(() => {
        fetchCategories(currentPage);
    }, [currentPage]);

    // Hàm chuyển trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page); // Thay đổi trang
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-center">
                <h1 className="mb-4 text-2xl font-bold text-teal-700">
                    Danh mục sản phẩm
                </h1>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <div
                        title={category.seoTitle}
                        key={category.categoryId} // Thay đổi từ category.id sang category.categoryId
                        className="cursor-pointer rounded-lg bg-white p-4 shadow-lg transition duration-300 hover:shadow-xl"
                    >
                        <img
                            src={getFullUrl(category.imgUrl)}
                            alt={category.categoryName}
                            className="h-60 w-full object-cover"
                        />
                        <h2 className="text-xl font-semibold">
                            {category.categoryName}
                        </h2>
                        <p className="text-gray-500">
                            {category.description || "Không có mô tả"}
                        </p>
                    </div>
                ))}
            </div>
            {/* Phần điều hướng phân trang */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center gap-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="rounded bg-gray-500 px-4 py-2 text-white disabled:bg-gray-300"
                    >
                        Previous
                    </button>

                    <span className="flex items-center justify-center text-lg">
                        {currentPage} / {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="rounded bg-gray-500 px-4 py-2 text-white disabled:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default ListCategory;