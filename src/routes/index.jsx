import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ForbiddenPage from "../components/ForbiddenPage";
import NotFoundPage from "../components/NotFoundPage";
import AdminAccount from "../pages/admin/AdminAccount/AdminAccount";
import AdminBanner from "../pages/admin/AdminBanner/AdminBanner";
import AdminCategory from "../pages/admin/AdminCategory/AdminCategory";
import AdminCustomer from "../pages/admin/AdminCustomer/AdminCustomer";
import CustomerDetail from "../pages/admin/AdminCustomer/CustomerDetail";
import OrderDetail from "../pages/admin/AdminCustomer/OrderDetail";
import AdminEmployee from "../pages/admin/AdminEmployee/AdminEmployee";
import AdminFood from "../pages/admin/AdminFood/AdminFood";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminRole from "../pages/admin/AdminRole/AdminRole";
import AdminStatistic from "../pages/admin/AdminStatistic/AdminStatistic";
import ChefLayout from "../pages/chef/ChefLayout";
import ChefOrder from "../pages/chef/ChefOrder/ChefOrder";
import PaymentStatus from "../pages/customer/cart/PaymentStatus";
import OrderList from "../pages/customer/DeliveringOrder/OrderList";
import CurrentOrder from "../pages/deliverer/Deliverer/CurrentOrder";
import DelivererOrder from "../pages/deliverer/Deliverer/DelivererOrder";
import DelivererLayout from "../pages/deliverer/DelivererLayout";
import ProtectedRoute from "./ProtectedRoute";

const Auth = lazy(() => import("../pages/auth"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const VerifyResetCode = lazy(() => import("../pages/auth/VerifyResetCode"));
const Cart = lazy(() => import("../pages/customer/cart/Cart"));
const Home = lazy(() => import("../pages/customer/home"));
const Menu = lazy(() => import("../pages/customer/menu"));
const FoodDetails = lazy(() => import("../pages/customer/menu/FoodDetails"));
const Addresses = lazy(() => import("../pages/customer/MyAccount/Addresses"));
const ChangePassword = lazy(
    () => import("../pages/customer/MyAccount/ChangePassword"),
);
const MyAccount = lazy(() => import("../pages/customer/MyAccount/MyAccount"));
const Orders = lazy(() => import("../pages/customer/MyAccount/Orders"));
// const NotFound = lazy(() => import("../pages/NotFound"));

const AppRouter = () => {
    return (
        <Suspense fallback={<div className="h-full w-screen">Đang tải...</div>}>
            <Routes>
                {/* Trang chủ */}
                <Route path="/" element={<Home />} />

                {/* Menu */}
                <Route path="/menu">
                    <Route index element={<Menu />} />
                    <Route path="food/:id" element={<FoodDetails />} />
                    <Route path=":slug" element={<Menu />} />
                    <Route path=":slug/:id" element={<FoodDetails />} />
                </Route>
                <Route path="/delivering-order" element={<OrderList />} />
                {/* Tài khoản */}
                <Route path="/my-account">
                    <Route index element={<MyAccount />} />
                    <Route path="edit-info" element={<MyAccount />} />
                    <Route
                        path="change-password"
                        element={<ChangePassword />}
                    />
                    <Route path="addresses" element={<Addresses />} />
                    <Route path="orders" element={<Orders />} />
                </Route>

                {/* Giỏ hàng */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment-status" element={<PaymentStatus />} />

                {/* Xác thực */}
                <Route path="/login" element={<Auth />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                    path="/verify-reset-code"
                    element={<VerifyResetCode />}
                />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Admin Dashboard */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute
                            element={AdminLayout}
                            requiredRole="Admin"
                        />
                    }
                >
                    <Route index element={<AdminStatistic />} />
                    <Route path="statistic" element={<AdminStatistic />} />
                    <Route path="food" element={<AdminFood />} />
                    <Route path="category" element={<AdminCategory />} />
                    <Route path="banner" element={<AdminBanner />} />
                    <Route path="account" element={<AdminAccount />} />
                    <Route path="customer" element={<AdminCustomer />} />
                    <Route path="customer/:id" element={<CustomerDetail />} />
                    <Route
                        path="customer/:id/order/:orderid"
                        element={<OrderDetail />}
                    />
                    <Route path="employee" element={<AdminEmployee />} />
                    <Route path="role" element={<AdminRole />} />
                </Route>
                {/* Chef Dashboard */}
                <Route
                    path="/chef"
                    element={
                        <ProtectedRoute
                            element={ChefLayout}
                            requiredRole="Chef"
                        />
                    }
                >
                    <Route index element={<ChefOrder />} />
                    <Route path="order" element={<ChefOrder />} />
                    <Route path="food" element={<AdminFood />} />
                </Route>

                <Route
                    path="/deliverer"
                    element={
                        <ProtectedRoute
                            element={DelivererLayout}
                            requiredRole="Deliverer"
                        />
                    }
                >
                    <Route index element={<DelivererOrder />} />
                    <Route path="order" element={<DelivererOrder />} />
                    <Route path="current-order" element={<CurrentOrder />} />
                </Route>

                {/* Forbidden Page */}
                <Route path="/forbidden" element={<ForbiddenPage />} />

                {/* Trang lỗi */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
