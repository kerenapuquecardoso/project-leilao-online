import React from "react";
import './Submit.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import ValidationPassword from "../../components/validation-password/ValidationPassword";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Submit = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    return(
        <div className="submit-body">
            <Card title={t('submit')} className="submit-card" text-align="center">
                <div className="form-group">
                    <InputText className="input-field" placeholder={t('name')} />
                    <InputText className="input-field" placeholder={t('email')} />
                    <ValidationPassword className="input-field" />
                </div>
                <div className="buttons-group">
                    <Button label={t('submit2')} onClick={() =>  navigate('/home',  '_blank')} className="button primary-button"/>
                    <Button label={t('button.cancel')} link onClick={() =>  navigate('/',  '_blank')} className="button secondary-button" text />
                </div>
            </Card>
        </div>
    );
}

export default Submit;
