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
        </div>
    );
}

export default Home;
