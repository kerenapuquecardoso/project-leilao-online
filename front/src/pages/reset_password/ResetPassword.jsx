import React, { useEffect, useState, useRef } from "react";
import styles from './ResetPassword.module.css';
import logo from "../../images/logo.png";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";
import { InputText } from 'primereact/inputtext';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PersonService from "../../services/PersonService";

const ResetPassword = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(null);
    const toast = useRef(null);
    const navigate = useNavigate();
    const personService = new PersonService();

    useEffect(() => {
        const changePassword = async () => {
            if (email) {
                try {
                    await personService.changePassword(email);
                    setLoad(true);
                    toast.current.show({
                        severity: "success",
                        summary: "Sucesso",
                        detail: "Email enviado com sucesso!",
                    });
                    
                } catch (error) {
                    toast.current.show({
                        severity: "error",
                        summary: "Erro",
                        detail: "Erro ao enviar email de redefinição de senha!",
                    });
                }
            }
        };
        changePassword();
    }, [email]);

    return (
        <div className={styles.body}>
            <Card title={t('resetPassword')} className="flex flex-columns justify-content-center md:w-30rem align-items-center text-center mt-5">
                <img className={styles.img} src={logo} />
                <InputText className="align-items-center justify-content-center mt-3" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                {load && <p>Verifique seu email!</p>}
                {error && <p>{error}</p>}
                <Button label={t('button.resetPassword')} onClick={() => navigate('/login/reset-password/alter-password')} className="flex justify-content-center mt-5" />
                <Button label={t('button.cancel')} link onClick={() => navigate('/login/')} className="flex-row justify-content-center mt-2" text />
            </Card>
        </div>
    );
}

export default ResetPassword;