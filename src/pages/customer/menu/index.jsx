import { Fragment } from "react";
import Footer from "../../../components/footer";
import MenuFood from "./MenuFood";

function Menu() {
    return (
        <Fragment>
            <MenuFood />
            <Footer />
        </Fragment>
    );
}

export default Menu;
