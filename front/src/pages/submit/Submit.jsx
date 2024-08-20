import React from "react";
import './Submit.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import ValidationPassword from "../../components/validation-password/ValidationPassword";
import { useNavigate } from "react-router-dom";
const Submit = () => {
    const navigate = useNavigate();
    return(
        <div className="submit-body">
            <Card title="Cadastrar" className="submit-card" text-align="center">
                <div className="form-group">
                    <InputText className="input-field" placeholder="Nome" />
                    <InputText className="input-field" placeholder="Email" />
                    <ValidationPassword className="input-field" />
                </div>
                <div className="buttons-group">
                    <Button label="Cadastrar" onClick={() =>  navigate('/',  '_blank')} className="button primary-button"/>
                    <Button label="Cancelar" link onClick={() =>  navigate('/login',  '_blank')} className="button secondary-button" text />
                </div>
            </Card>
        </div>
    );
}

export default Submit;
