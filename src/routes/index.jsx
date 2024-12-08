import { Route, Routes } from "react-router-dom";
import Auth from "../pages/auth";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyResetCode from "../pages/auth/VerifyResetCode";
import Cart from "../pages/customer/cart/Cart";
import Home from "../pages/customer/home";
import Menu from "../pages/customer/menu";
import FoodDetails from "../pages/customer/menu/FoodDetails";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:slug" element={<Menu />} />
            <Route path="/menu/:id" element={<FoodDetails />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/login" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-reset-code" element={<VerifyResetCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    );
};

export default AppRouter;
