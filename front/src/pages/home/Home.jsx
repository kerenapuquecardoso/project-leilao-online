import React  from "react";
import './Home.css';
import Logout from "../../components/logout/logout.jsx";
import holandesa from "../../images/holandesa.png";
import MenuLeilao from "../../components/menu/MenuLeilao.jsx"; 

const Home  = () =>{
    return(
        <div className="body-home">
            <img src={holandesa} className="holandesa" alt="logo do leilão online" />
        </div>
    );
}

export default Home;