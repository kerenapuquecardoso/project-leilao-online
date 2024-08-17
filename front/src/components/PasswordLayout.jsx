import React from "react";
import ValidationPassword from "./validation-password/ValidationPassword";

const PasswordLayout = ({children}) =>{
    return(
        <>
           
            {children} <ValidationPassword/>
            
           
        </>
    );
}

export default PasswordLayout;