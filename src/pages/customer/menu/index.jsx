import { Fragment } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import MenuFood from "./MenuFood";

function Menu() {
    return (
        <Fragment>
            <Navbar />
            <MenuFood />
            <Footer />
        </Fragment>
    );
}

export default Menu;
