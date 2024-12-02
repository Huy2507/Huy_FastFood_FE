import Navbar from "./components/navbar/navbar.jsx";
import BannerList from "./pages/customer/home/BannerList.jsx";
import AppRouter from "./routes/index.jsx";

function App() {
    return (
        <div className="App">
            <Navbar />
            <h1>Fast Food Banner</h1>
            <BannerList />
            <AppRouter />
        </div>
    );
}

export default App;
