import { Route, Routes } from "react-router-dom";
import Auth from "../pages/auth";
import Home from "../pages/customer/home";
import Menu from "../pages/customer/menu";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />

            <Route path="/login" element={<Auth />} />
        </Routes>
    );
};

export default AppRouter;
