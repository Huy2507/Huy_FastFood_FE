import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./components/CartContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <CartProvider>
                <App />
            </CartProvider>
        </Router>
    </StrictMode>,
);
