import { memo } from "react";
import { Helmet } from "react-helmet";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import BannerList from "./BannerList";
import FavoriteFood from "./FavoriteFood";
import ListCategory from "./ListCategory";
import RecentFoods from "./RecentFoods";

function Home() {
    return (
        <div>
            <Helmet>
                <title>Trang chủ</title>
            </Helmet>
            <Navbar />
            <BannerList />
            <RecentFoods />
            <ListCategory />
            <FavoriteFood />
            <Footer />
        </div>
    );
}

export default memo(Home);
