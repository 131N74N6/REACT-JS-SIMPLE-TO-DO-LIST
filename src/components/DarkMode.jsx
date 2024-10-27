import React, { Fragment, useState, useEffect } from "react";
import { DarkModeContext } from "./Dark-Mode-Context";

function DarkMode(props) {
    const [dark, setDark] = useState(() => {
        // Ambil nilai dari localStorage saat pertama kali komponen dimuat
        const savedMode = localStorage.getItem("darkMode");
        return savedMode === "true";  // Jika "true", dark mode diaktifkan
    });

    // Simpan perubahan ke localStorage setiap kali nilai dark berubah
    useEffect(() => {
        localStorage.setItem("darkMode", dark);
    }, [dark]);

    function darkToggle() {
        setDark(change => !change);
    }

    return (
        <Fragment>
            <DarkModeContext.Provider value={{ dark, darkToggle }}>
                {props.children}
            </DarkModeContext.Provider>
        </Fragment>
    )
}

export default DarkMode;
