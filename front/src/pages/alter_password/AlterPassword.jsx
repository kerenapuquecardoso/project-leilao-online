import React from "react";
import './AlterPassword.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
        
                      
        
const AlterPassword = () => {
    return(
        <div className="alter-password-body">
            <Card title="AlterPassword" className="flex flex-columns justify-content-center md:w-30rem align-items-center text-center mt-5">
                <InputText className="align-items-center justify-content-center mt-3" placeholder="email" />
                <InputText className="align-items-center justify-content-center mt-3" placeholder="código" />
                <Password feedback={false} className="flex align-items-center justify-content-center mt-3"placeholder="senha"/>
                <Password feedback={false} className="flex align-items-center justify-content-center mt-3"placeholder="confirmar senha"/>
                <Button  className="align-items-center justify-content-center mt-3" label="Alterar senha"/><br/>
                <Button label="cancelar" className="flex-row  justify-content-center align-content-between mt-5" text/>
            </Card>
            

        </div>
        
    );
}

export default AlterPassword;