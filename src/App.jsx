import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoToTop from "./components/GoToTop.jsx";
import { AuthProvider } from "./pages/auth/AuthProvider.jsx";
import AppRouter from "./routes/index.jsx";

function App() {
    return (
        <div className="App">
            <div className="flex-grow">
                <AuthProvider>
                    <AppRouter />
                </AuthProvider>
            </div>
            <GoToTop />
            <ToastContainer autoClose={3000} style={{ zIndex: 9999 }} />
        </div>
    );
}

export default App;
