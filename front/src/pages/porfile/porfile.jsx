import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import styles from  "../../pages/porfile/porfile.module.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const Porfile = () => {
    const {t} = useTranslation();
    const [image, setImage] = useState(null);
    const changeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                localStorage.setItem("image", reader.result);
                setImage(reader.result); 
            };
            reader.readAsDataURL(file); 
        }
    }

    const consultarLocalizacao = () => {
        const localizacaoStorage = localStorage.getItem('cep');
        if(localizacaoStorage){
            document.getElementById('cep').value = localizacaoStorage;
        }else{
            buscarEndereco();
        }
    }

    const buscarEndereco = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
                .then(response => response.json())
                .then(data => {
                    const localUser = data.region || data.city || 'localização não encontrada';
                    document.getElementById('cep').value = localUser;
                    localStorage.setItem('cep', localUser);
                });
            });
        }
    }

    function limpa_formulário_cep() {
        document.getElementById('rua').value=("");
        document.getElementById('bairro').value=("");
        document.getElementById('cidade').value=("");
        document.getElementById('uf').value=("");
        document.getElementById('ibge').value=("");
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            document.getElementById('rua').value=(conteudo.logradouro);
            document.getElementById('bairro').value=(conteudo.bairro);
            document.getElementById('cidade').value=(conteudo.localidade);
            document.getElementById('uf').value=(conteudo.uf);
        } 
        else {
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }

    const buscarPorCEP = async (cep) => {
        const cleanedCep = cep.replace(/\D/g, '');
        if (cleanedCep !== "") {
            const validacep = /^[0-9]{8}$/;
            if (validacep.test(cleanedCep)) {
                try {
                    const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json`);
                    const data = await response.json();
                    meu_callback(data);
                } catch (error) {
                    console.error("Erro ao buscar CEP:", error);
                }
            } else {
                limpa_formulário_cep();
                alert("CEP inválido!");
            }
        } else {
            limpa_formulário_cep();
        }
    }
    const navigate = useNavigate();
   
    return(
        
        <Card className={styles.card}>
            <label className={styles.image} htmlFor="image_porfile" tabIndex={0}>
                <span className="image_porfile" >{t('chooseImage')}</span>
                <img src={image} id="image"  className={styles.image_preview} />
            </label>
            <input  type="file" className={styles.image_porfile}  accept="image/*" id="image_porfile" onChange={changeImage}/>
            <InputText className={styles.inputDocuments} placeholder={t('name')} />
            <InputText className={styles.inputDocuments} placeholder="CPF" />
            <InputText className={styles.inputDocuments} placeholder="CEP" id="cep" onBlur={(e) => buscarPorCEP(e.target.value)}/>
            <InputText className={styles.inputDocuments} placeholder={t('street')} id="rua" />
            <InputText className={styles.inputDocuments} placeholder={t('neighborhoold')}  id="bairro"/>
            <InputText className={styles.inputDocuments} placeholder= {t('city')} id="cidade" />
            <InputText className={styles.inputDocuments} placeholder="uf" id="uf"/>
            
            <Button className={styles.button_save}>{t('button.save')}</Button>
            <Button link>{t('button.cancel')}</Button>
            <Button link onClick={() => navigate('/', '_blank')}>{t('button.comeback')}</Button>
        </Card>
    );
}

export default Porfile;
