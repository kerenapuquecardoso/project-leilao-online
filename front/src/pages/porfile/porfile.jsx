import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PopUpEdit from "../../components/popupEdit/popUpEdit";
import styles from "../../pages/porfile/porfile.module.css";
import imagePorfile from "../../images/perfil.png";
const Porfile = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const storagedName = localStorage.getItem('nome') || '';
    const storagedEmail = localStorage.getItem('email') || '';
    const storagedCpf = localStorage.getItem('cpf') || '';
    const storagedCep = localStorage.getItem('cep') || '';
    const storagedRua = localStorage.getItem('rua') || '';
    const storagedBairro = localStorage.getItem('bairro') || '';
    const storagedCidade = localStorage.getItem('cidade') || '';
    const storagedUf = localStorage.getItem('uf') || '';
    return (
        <div className={styles.container} >
            <Card className={styles.card} title={t('userPorfile')}>
                
                    <img src={imagePorfile} alt="Foto de perfil" className={styles.profile}/>
                    <p><strong>{t('name')}</strong> {storagedName}</p>
                    <p><strong>{t('email')}</strong> {storagedEmail}</p>
                    <p><strong>CPF:</strong> {storagedCpf}</p>
                    <p><strong>CEP:</strong> {storagedCep} </p>
                    <p><strong>{t('street')}</strong> {storagedRua} </p>
                    <p><strong>{t('neighborhoold')}:</strong> {storagedBairro}</p>
                    <p><strong>{t('city')}</strong> {storagedCidade}</p>
                    <p><strong>UF:</strong> {storagedUf}</p>
                    <Button className={styles.button} label={t('Editar Perfil')} onClick={() => setPopUpVisible(true)} />
                    <Button link onClick={() => navigate('/home', '_blank')}>{t('button.comeback')}</Button>
                
            </Card>
            <PopUpEdit visible={isPopUpVisible} setVisible={setPopUpVisible} />
        </div>
    );
};

export default Porfile;
