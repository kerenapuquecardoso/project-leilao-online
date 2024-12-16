import React, { useState, useRef } from "react";
import styles from './Submit.module.css';
import logo from "../../images/logo.png";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import ValidationPassword from "../../components/validation-password/ValidationPassword";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PersonService from "../../services/PersonService";
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";


const Submit = () => {
    const [usuario, setUsuario] = useState({nome: "", email:"", password:""});
    //const [load, setLoad] = useState(false);
    const toast = useRef(null);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const personService = new PersonService();

    const handleChange = (input) => {
        console.log(input);
        setUsuario({...usuario, [input.target.name]:input.target.value});
    }

    const save = async () => {
        console.log(usuario);
        try{
            await personService.submit(usuario);
            toast.current.show({
                severity: "success",
                summary: "Sucesso",
                detail: "Cadastro criado com sucesso!",
            });
            navigate("/home");
           
        }catch(e){ 
            console.log(e);
            toast.current.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao cadastrar usuário, tente novamente mais tarde",
            });
            navigate("/access-danied");
        }
    }
    return(
        <div className={styles.body}>
            <Card title={t('submit')} className={styles.card} text-align="center">
                <img className={styles.img} src={logo}/>
                <div className={styles.form}>
                    <InputText name="nome" onChange={handleChange} className={styles.field} placeholder={t('name')} />
                    <InputText name="email" onChange={handleChange} className={styles.field} placeholder={t('email')} />
                    <ValidationPassword  onPasswordChange={(e)=> setUsuario({...usuario, ['password']:e})}  className={styles.field} />
                    {}

                </div>
                <div className={styles.buttons}>
                    <Button label={t('submit2')} onClick={save} className={styles.primary}/>
                    <Button label={t('button.cancel')} link onClick={() =>  navigate('/',  '_blank')} className={styles.secondary} text />
                </div>
            </Card>
        </div>
    );
}

export default Submit;
