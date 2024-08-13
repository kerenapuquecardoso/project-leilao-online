import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';                  
import 'primeicons/primeicons.css';  
import 'primeflex/primeflex.css';

const DefaultLayout = ({children}) =>{
    return(
        <>
            <Header/>
                {children}
            <Footer/>
        </>
    );
}

export default DefaultLayout;