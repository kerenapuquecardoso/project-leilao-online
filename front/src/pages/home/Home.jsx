import React  from "react";
import './Home.css';
import Logout from "../../components/logout/logout";
const Home  = () =>{
    return(
        <div className="body-home">
            <h1>Pagina Inicial</h1>
            <Logout/>
        </div>
    );
}

export default Home;