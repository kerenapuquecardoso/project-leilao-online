import React from "react";
import LanguageDropdown from "../components/language/language_drop_dow"
const SimpleLayout = ({children}) =>{
    return(
        <>
            <LanguageDropdown/>
            {children}
        </>
    );
}

export default SimpleLayout;