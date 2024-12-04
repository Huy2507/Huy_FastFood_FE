import BannerList from "./BannerList";
import FavoriteFood from "./FavoriteFood";
import ListCategory from "./ListCategory";

function Home() {
    return (
        <div>
            <BannerList />
            <ListCategory />
            <FavoriteFood />
        </div>
    );
}

export default Home;
