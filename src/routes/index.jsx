import { Route, Routes } from "react-router-dom";
import Auth from "../pages/auth";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyResetCode from "../pages/auth/VerifyResetCode";
import Cart from "../pages/customer/cart/Cart";
import Home from "../pages/customer/home";
import Menu from "../pages/customer/menu";
import FoodDetails from "../pages/customer/menu/FoodDetails";
import Addresses from "../pages/customer/MyAccount/Addresses";
import ChangePassword from "../pages/customer/MyAccount/ChangePassword";
import MyAccount from "../pages/customer/MyAccount/MyAccount";
import Orders from "../pages/customer/MyAccount/Orders";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:slug" element={<Menu />} />
            <Route path="/menu/:id" element={<FoodDetails />} />
            <Route path="/my-account" element={<MyAccount />} />

            <Route path="/my-account/edit-info" element={<MyAccount />} />
            <Route
                path="/my-account/change-password"
                element={<ChangePassword />}
            />
            <Route path="/my-account/addresses" element={<Addresses />} />
            <Route path="/my-account/orders" element={<Orders />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/login" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-reset-code" element={<VerifyResetCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    );
};

export default AppRouter;
