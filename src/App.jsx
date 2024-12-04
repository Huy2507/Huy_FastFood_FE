import Footer from "./components/footer.jsx";
import Navbar from "./components/Navbar.jsx";
import AppRouter from "./routes/index.jsx";

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="flex-grow">
                <AppRouter />
            </div>
            <Footer />
        </div>
    );
}

export default App;
