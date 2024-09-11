import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () =>{
    //const isAuthenticated = localStorage.getItem("token")?true:false;
    const isAuthenticated = !!localStorage.getItem("token"); // ambos fazem a mesma coisa
   // alert('Aqui era para não deixar passar');
    return (isAuthenticated?<Outlet/>:<Navigate to='/access-danied'/>);
}

export default PrivateRouter;