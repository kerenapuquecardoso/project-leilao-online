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
    return (
        <div className={styles.container} >
            <Card className={styles.card} title={t('userPorfile')}>
                
                    <img src={imagePorfile} alt="Foto de perfil" className={styles.profile}/>
                    <p><strong>{t('name')}</strong> João Silva</p>
                    <p><strong>{t('email')}</strong> joao@email.com</p>
                    <p><strong>CPF:</strong> 123.456.789-00</p>
                    <p><strong>CEP:</strong> 12345-678</p>
                    <p><strong>{t('street')}</strong>{t('street')} Seramitos de Barros</p>
                    <p><strong>{t('neighborhoold')}:</strong> Centro</p>
                    <p><strong>{t('city')}</strong> Paranavaí</p>
                    <p><strong>UF:</strong>PR</p>
                    <Button label={t('Editar Perfil')} onClick={() => setPopUpVisible(true)} />
                    <Button link onClick={() => navigate('/', '_blank')}>{t('button.comeback')}</Button>
                
            </Card>
            <PopUpEdit visible={isPopUpVisible} setVisible={setPopUpVisible} />
        </div>
    );
};

export default Porfile;
