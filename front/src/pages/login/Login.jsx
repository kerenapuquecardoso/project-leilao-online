import React from "react";
import './Login.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

                      
        
const Login = () => {
    return(
        <div className="login-body">
            <Card title="Login" className="flex flex-columns justify-content-center md:w-30rem align-items-center text-center mt-5">
                <InputText className="align-items-center justify-content-center mt-3" placeholder="email" />
                <Password feedback={false} className="flex align-items-center justify-content-center mt-3"placeholder="password"/>
                <Button  className="align-items-center justify-content-center mt-3" label="Login"/><br/>
                <Button label="recuperar senha" className="flex-row  justify-content-center align-content-between mt-5" text/>
                <Button label="cadastrar" className="flex-row  justify-content-center align-content-between mt-2" text/>
            </Card>
            

        </div>
        
    );
}

export default Login;