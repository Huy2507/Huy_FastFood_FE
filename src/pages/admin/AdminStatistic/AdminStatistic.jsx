import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import Loading from "../../../components/Loading";
import {
    AdminGetBestSellingFoods,
    AdminGetOrderCountStatistics,
    AdminGetOrderRevenueStatistics,
    AdminGetPopularCategories,
} from "../../../services/adminService/Statistic";
import { getFullUrl } from "../../../services/api/axiosInstance";

// Registering the required elements for Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
);

function AdminStatistic() {
    const [orderCountData, setOrderCountData] = useState(null);
    const [orderRevenueData, setOrderRevenueData] = useState(null);
    const [bestSellingFoodsData, setBestSellingFoodsData] = useState([]);
    const [popularCategoriesData, setPopularCategoriesData] = useState([]);

    const [year, setYear] = useState(2024); // Default year
    const [month, setMonth] = useState(""); // Default month (optional)
    const [period, setPeriod] = useState("day"); // Default period

    useEffect(() => {
        const params = { year, period };
        if (month) params.month = month;

        // Fetch Order Count Data
        AdminGetOrderCountStatistics(params)
            .then((data) => {
                const labels = data.map((item) => item.date);
                const counts = data.map((item) => item.orderCount);
                setOrderCountData({
                    labels,
                    datasets: [
                        {
                            label: "Số lượng đơn hàng",
                            data: counts,
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                });
            })
            .catch((err) => console.error(err));

        // Fetch Order Revenue Data
        AdminGetOrderRevenueStatistics(params)
            .then((data) => {
                const labels = data.map((item) => item.date);
                const revenues = data.map((item) => item.revenue);
                setOrderRevenueData({
                    labels,
                    datasets: [
                        {
                            label: "Doanh thu",
                            data: revenues,
                            backgroundColor: "rgba(153, 102, 255, 0.6)",
                            borderColor: "rgba(153, 102, 255, 1)",
                            borderWidth: 1,
                        },
                    ],
                });
            })
            .catch((err) => console.error(err));
    }, [year, month, period]);

    useEffect(() => {
        const fetchBestSellingFoods = async () => {
            try {
                const bestSellingFood = await AdminGetBestSellingFoods({
                    year,
                    month,
                    period,
                    limit: 5,
                });

                setBestSellingFoodsData(bestSellingFood);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBestSellingFoods();
    }, [year, month, period]);

    useEffect(() => {
        const fetchBestSellingCategorys = async () => {
            try {
                const bestSellingCategory = await AdminGetPopularCategories({
                    year,
                    month,
                    period,
                    limit: 5,
                });

                setPopularCategoriesData(bestSellingCategory);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBestSellingCategorys();
    }, [year, month, period]);
    console.log(popularCategoriesData);
    const months = [
        { value: "", label: "Tất cả" },
        { value: "1", label: "Tháng 1" },
        { value: "2", label: "Tháng 2" },
        { value: "3", label: "Tháng 3" },
        { value: "4", label: "Tháng 4" },
        { value: "5", label: "Tháng 5" },
        { value: "6", label: "Tháng 6" },
        { value: "7", label: "Tháng 7" },
        { value: "8", label: "Tháng 8" },
        { value: "9", label: "Tháng 9" },
        { value: "10", label: "Tháng 10" },
        { value: "11", label: "Tháng 11" },
        { value: "12", label: "Tháng 12" },
    ];

    return (
        <div className="max-h-[calc(100vh-100px)] overflow-y-auto p-6">
            <h1 className="mb-8 text-center text-3xl font-bold dark:text-white">
                Thống Kê
            </h1>
            {/* Input Controls */}
            <div className="mb-6 flex justify-center gap-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium dark:text-white">
                        Năm
                    </label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="mt-1 rounded-md border px-3 py-2 shadow-sm focus:ring focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium dark:text-white">
                        Tháng
                    </label>
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="mt-1 rounded-md border px-3 py-2 shadow-sm focus:ring focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        {months.map((monthOption) => (
                            <option
                                key={monthOption.value}
                                value={monthOption.value}
                            >
                                {monthOption.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium dark:text-white">
                        Chu kỳ
                    </label>
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="mt-1 rounded-md border px-3 py-2 shadow-sm focus:ring focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="day">Ngày</option>
                        <option value="month">Tháng</option>
                    </select>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Order Count Chart */}
                <div className="scrollable w-full rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 dark:text-white">
                    <h2 className="mb-4 text-center text-xl font-semibold">
                        Thống Kê số lượng đơn hàng
                    </h2>
                    {orderCountData ? (
                        <Bar
                            data={orderCountData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: "top" },
                                    title: {
                                        display: true,
                                        text: "Số lượng đơn hàng",
                                    },
                                },
                            }}
                        />
                    ) : (
                        <Loading />
                    )}
                </div>

                {/* Order Revenue Chart */}
                <div className="scrollable w-full rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 dark:text-white">
                    <h2 className="mb-4 text-center text-xl font-semibold">
                        Thống kê doanh thu đơn hàng
                    </h2>
                    {orderRevenueData ? (
                        <Line
                            data={orderRevenueData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: "top" },
                                    title: {
                                        display: true,
                                        text: "Doanh thu",
                                    },
                                },
                            }}
                        />
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
            {/* Input Controls */}
            <div className="my-6 flex justify-center gap-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Năm</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="mt-1 rounded-md border px-3 py-2 shadow-sm focus:ring focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Tháng</label>
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="mt-1 rounded-md border px-3 py-2 shadow-sm focus:ring focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        {months.map((monthOption) => (
                            <option
                                key={monthOption.value}
                                value={monthOption.value}
                            >
                                {monthOption.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* Food and Category Sections */}
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-2">
                {/* Best Selling Foods */}
                <div className="scrollable w-full rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 dark:text-white">
                    <h2 className="mb-4 text-center text-xl font-semibold">
                        Món ăn phổ biến nhất
                    </h2>
                    {bestSellingFoodsData.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {bestSellingFoodsData.map((food, index) => (
                                <div
                                    key={index}
                                    className="flex flex-row items-center rounded-lg border p-2 dark:bg-gray-700 dark:text-white"
                                >
                                    <img
                                        src={getFullUrl(food.imageUrl)}
                                        alt={food.foodName}
                                        className="mx-3 mb-2 h-24 w-24 rounded-md object-cover"
                                    />
                                    <div className="flex w-full flex-col items-center justify-center">
                                        <p className="text-center font-bold">
                                            {food.foodName}
                                        </p>
                                        <p className="text-center text-gray-500">
                                            Số lượng bán: {food.quantitySold}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Loading />
                    )}
                </div>

                {/* Popular Categories */}
                <div className="scrollable w-full rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 dark:text-white">
                    <h2 className="mb-4 text-center text-xl font-semibold">
                        Danh mục phổ biến nhất
                    </h2>
                    {popularCategoriesData.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {popularCategoriesData.map((category) => (
                                <div
                                    key={category.categoryId}
                                    className="flex flex-row items-center rounded-lg border p-2 dark:bg-gray-700 dark:text-white"
                                >
                                    <img
                                        src={getFullUrl(category.imageUrl)}
                                        alt={category.categoryName}
                                        className="mb-2 h-24 w-24 rounded-md object-cover"
                                    />
                                    <div className="flex w-full flex-col items-center justify-center">
                                        <p className="text-center font-bold">
                                            {category.categoryName}
                                        </p>
                                        <p className="text-center text-gray-500">
                                            Số lượng bán:{" "}
                                            {category.quantitySold}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminStatistic;
