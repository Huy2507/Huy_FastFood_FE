import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./components/CartContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <CartProvider>
                <App />
            </CartProvider>
        </Router>
    </React.StrictMode>
);
