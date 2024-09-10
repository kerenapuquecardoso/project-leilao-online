import React from "react";
import './ResetPassword.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
        
const ResetPassword = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    return(
        <div className="ResetPassword-body">
            <Card title={t('resetPassword')} className="flex flex-columns justify-content-center md:w-30rem align-items-center text-center mt-5">
                <InputText className="align-items-center justify-content-center mt-3" placeholder="email" />
                <Button label={t('button.resetPassword')}  onClick={() =>  navigate('/login/reset-password/alter-password')} className="flex  justify-content-center  mt-5"/>
                <Button label={t('button.cancel')} link  onClick={() =>  navigate('/login/')} className="flex-row  justify-content-center  mt-2" text/>
            </Card>
            

        </div>
        
    );
}

export default ResetPassword;