import { Route, Routes } from "react-router-dom";
import BannerList from "../pages/customer/home/BannerList";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<BannerList />} />
        </Routes>
    );
};

export default AppRouter;
