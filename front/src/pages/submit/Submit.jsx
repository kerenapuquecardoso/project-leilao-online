import React from "react";
import './Submit.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

        
const Submit = () => {
    return(
        <div className="submit-body">
            <Card title="Submit" className="flex flex-columns justify-content-center md:w-30rem align-items-center text-center mt-5">
                <InputText className="align-items-center justify-content-center mt-3" placeholder="nome" />
                <InputText className="align-items-center justify-content-center mt-3" placeholder="email" />
                <Password feedback={false} className="flex align-items-center justify-content-center mt-3"placeholder="password"/>
                <Button  className="align-items-center justify-content-center mt-3" label="Cadastrar"/><br/>
                <Button label="recuperar senha" className="flex-row align-items-center justify-content-center  mt-5" text/>
                <Button label="cadastrar" className="flex-row align-items-center justify-content-center mt-2" text/>
            </Card>
            

        </div>
        
    );
}

export default Submit;