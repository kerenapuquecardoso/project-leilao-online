import React from "react";
import styles from './Submit.module.css';
import logo from "../../images/logo.png";
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
        <div className={styles.body}>
            <Card title={t('submit')} className={styles.card} text-align="center">
                <img className={styles.img} src={logo}/>
                <div className={styles.form}>
                    <InputText className={styles.field} placeholder={t('name')} />
                    <InputText className={styles.field} placeholder={t('email')} />
                    <ValidationPassword className={styles.field} />
                </div>
                <div className={styles.buttons}>
                    <Button label={t('submit2')} onClick={() =>  navigate('/home',  '_blank')} className={styles.primary}/>
                    <Button label={t('button.cancel')} link onClick={() =>  navigate('/',  '_blank')} className={styles.secondary} text />
                </div>
            </Card>
        </div>
    );
}

export default Submit;
