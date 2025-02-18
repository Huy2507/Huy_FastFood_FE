import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./components/CartContext";

ReactDOM(
    <React.StrictMode>
        <Router>
            <CartProvider>
                <App />
            </CartProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
