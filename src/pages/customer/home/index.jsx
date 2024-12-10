import { memo } from "react";
import Footer from "../../../components/footer";
import BannerList from "./BannerList";
import FavoriteFood from "./FavoriteFood";
import ListCategory from "./ListCategory";
import RecentFoods from "./RecentFoods";

function Home() {
    return (
        <div>
            <BannerList />
            <RecentFoods />
            <ListCategory />
            <FavoriteFood />
            <Footer />
        </div>
    );
}

export default memo(Home);
