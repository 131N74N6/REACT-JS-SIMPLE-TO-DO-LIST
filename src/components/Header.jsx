import { Fragment, useContext } from "react";
import "./Header.css";
import { DarkModeContext } from "./Dark-Mode-Context";

export default function Header() {

    const { dark, darkToggle } = useContext(DarkModeContext);

    function darkChange() {
        darkToggle();
    }

    return(
        <Fragment>
            <header className="header">
                <input type="checkbox" checked={dark} onChange={darkChange} id="dark-switch" />
                <label htmlFor="dark-switch" className="dark-switch">
                    { dark ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i> }
                </label>
            </header>
        </Fragment>
    )
}