import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Logout = () =>{
    const navigate = useNavigate();
    const {t} = useTranslation();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/login");

    }
    return(
        <>
            <Button label={t('logout')} onClick={logout}/>
        </>
    );
}

export default Logout;