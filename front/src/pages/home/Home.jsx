import React  from "react";
import './Home.css';
import Logout from "../../components/logout/logout";
const Home  = () =>{
    return(
        <div className="body-home">
            <h1>Pagina Inicial</h1>
            <img src="../../images/holandesa.png" alt="" />
            <img src="../../images/logo.svg" alt="logo do leilão online" />
            <Logout/>
        </div>
    );
}

export default Home;