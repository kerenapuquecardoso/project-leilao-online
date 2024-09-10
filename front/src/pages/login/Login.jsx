import React, { useState } from "react";
import './Login.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

                      
        
const Login = () => {
    const [usuario, setUsuario] = useState({email:"", password:""});
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleChange = (input) => {
        setUsuario({...usuario, [input.target.name]:input.target.value});
    }

    const login = () => {
        //chamada do backend para verificar as credenciais
        if(usuario.email == "cardosokerenapuque@gmail.com" && usuario.password == "123456"){
            let token = "token do backend";
            localStorage.setItem("token", token);
            localStorage.setItem("email", usuario.email);
            navigate("/");

           
        }else{ 
            alert("Usuário ou senha incorretos");
        }
        
    }
    return(
        
        <div className="login-body">
            <Card title="Login" className="flex flex-columns justify-content-center md:w-30rem align-items-center text-center mt-5">
                <InputText  onChange={handleChange}  name="email" className="align-items-center justify-content-center mt-3" inputStyle={{width:'100%'}} placeholder={t('email')} />
                <Password toggleMask onChange={handleChange} name="password" feedback={false} className="flex align-items-center justify-content-center mt-3" inputStyle={{width:'100%'}} placeholder={t('password')}/>
                <Button  onClick={login} className="align-items-center justify-content-center mt-3" inputStyle={{width:'100%'}} label={t('button.login')}/><br/>
                <Button label={t('button.resetPassword')} link onClick={() =>  navigate('/login/reset-password', '_blank')}  className="flex-row  justify-content-center align-content-between mt-5" text/>
                <Button label={t('button.submit')} link onClick={() => navigate('/login/submit', '_blank')} className="flex-row  justify-content-center align-content-between mt-2" text/>
            </Card>
        </div>
        
    );
}

export default Login;