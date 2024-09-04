import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () =>{
    //const isAuthenticated = localStorage.getItem("thoken")?true:false;
    const isAuthenticated = !!localStorage.getItem("token"); // ambos fazem a mesma coisa
    return (isAuthenticated?<Outlet/>:<Navigate to='/login'/>);
}

export default PrivateRouter;