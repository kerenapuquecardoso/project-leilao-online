import React from "react";
import './ResetPassword.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

                      
        
const ResetPassword = () => {
    return(
        <div className="ResetPassword-body">
            <Card title="ResetPassword" className="flex flex-columns justify-content-center md:w-30rem align-items-center text-center mt-5">
                <InputText className="align-items-center justify-content-center mt-3" placeholder="email" />
                <Button label="recuperar senha" className="flex  justify-content-center  mt-5" text/>
                <Button label="cancelar" className="flex-row  justify-content-center  mt-2" text/>
            </Card>
            

        </div>
        
    );
}

export default ResetPassword;