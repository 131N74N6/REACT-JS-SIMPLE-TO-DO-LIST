import { Fragment, useContext } from "react";
import "./Footer.css";
import { DarkModeContext } from "./Dark-Mode-Context";

export default function Footer() {
    const getYear = new Date();
    const { dark } = useContext(DarkModeContext);

    return(
        <Fragment>
            <footer className={`footer ${dark ? "active" : ""}`}>
                <div className="footer-content">
                    <div className="year">&copy;2022 - {getYear.getFullYear()}</div>
                </div>
            </footer>
        </Fragment>
    )
}