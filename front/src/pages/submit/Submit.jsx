import React from "react";
import './Submit.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

        
const Submit = () => {
    return(
        <div className="submit-body">
            <Card title="Novo Cadastro" className="flex flex-columns justify-content-center md:w-30rem align-items-center text-center mt-5">
                <InputText className="align-items-center justify-content-center mt-3" placeholder="nome" />
                <InputText className="align-items-center justify-content-center mt-3" placeholder="email" />
                <Password feedback={false} className="flex align-items-center justify-content-center mt-3" placeholder="senha"/>
                <Button  label="Cadastrar" className="flex-row align-items-center justify-content-center  mt-3" raised severity="secondary" /><br/>
                <Button label="Cancelar" className="flex-row align-items-center justify-content-center  mt-3" text/>
            </Card>
            

        </div>
        
    );
}

export default Submit;