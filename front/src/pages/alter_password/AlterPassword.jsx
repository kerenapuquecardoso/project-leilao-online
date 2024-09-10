import React from "react";
import './AlterPassword.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidationPassword from "../../components/validation-password/ValidationPassword";
import { useTranslation } from "react-i18next";

const AlterPassword = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState("");

    const handlePasswordChange = (e) => {
        setPassword(e);
    };

    const confirmPasswordInput =  (e) => {
        const passwordIput = e.target.value;
        setConfirmPassword(passwordIput);
        console.log(password);
        console.log(confirmPassword);
        
        if(password === passwordIput){
            setPasswordsMatch("");
        }
        else{
            setPasswordsMatch("As senhas não conferem");
        }
    };

    
    return(
        <div className="alter-password-body">
            <Card title={t('alterPassword')} className="flex flex-columns justify-content-center md:w-30rem align-items-center text-center mt-5">
                <InputText className="align-items-center justify-content-center mt-3" placeholder={t('email')} />
                <InputText className="align-items-center justify-content-center mt-3" placeholder={t('code')} />
                <ValidationPassword onPasswordChange={handlePasswordChange} />
                <Password toggleMask  onChange={confirmPasswordInput} feedback={false} className="flex align-items-center justify-content-center mt-3"placeholder={t('confirmPassword')}/>
                {passwordsMatch && <small >{passwordsMatch}</small> }
                <div className="btn-alter-password"> <Button className="align-items-center justify-content-center mt-3" label={t('alterPassword')} onClick={() => navigate('/', '_blank')}  /></div>
                <Button label={t('button.cancel')}className="flex-row  justify-content-center align-content-between mt-5" link onClick={() => navigate('/login', '_blank' )}/>
            </Card>
        </div>
    );
}

export default AlterPassword;