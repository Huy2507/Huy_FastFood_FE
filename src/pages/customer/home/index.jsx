import { memo } from "react";
import Footer from "../../../components/footer";
import Navbar from "../../../components/Navbar";
import BannerList from "./BannerList";
import FavoriteFood from "./FavoriteFood";
import ListCategory from "./ListCategory";
import RecentFoods from "./RecentFoods";

function Home() {
    return (
        <div>
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
