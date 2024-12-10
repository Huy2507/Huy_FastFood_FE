import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar.jsx";
import AppRouter from "./routes/index.jsx";

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="flex-grow">
                <AppRouter />
            </div>
            <ToastContainer autoClose={3000} style={{ zIndex: 9999 }} />
        </div>
    );
}

export default App;
