import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import styles from  "../../components/popupEdit/popUp.module.css";
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FileUpload } from 'primereact/fileupload';
import { InputMask } from "primereact/inputmask";
const PopUpEdit = ({visible, setVisible}) => {
    const {t} = useTranslation();
    const [value, setValue] = useState();
/*
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
*/
    function limpa_formulário_cep() {
        document.getElementById('nome').value=("");
        document.getElementById('email').value=("");
        document.getElementById('cpf').value=("");
        document.getElementById('cep').value=("");
        document.getElementById('rua').value=("");
        document.getElementById('bairro').value=("");
        document.getElementById('cidade').value=("");
        document.getElementById('uf').value=("");
        
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
            const validaCep = /^[0-9]{8}$/;
            if (validaCep.test(cleanedCep)) {
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

    function salvarDados(){
        const nome =  document.getElementById('nome').value;
        const email =  document.getElementById('email').value;
        const cpf =  document.getElementById('cpf').value;
        const cep =  document.getElementById('cep').value;
        const rua =  document.getElementById('rua').value;
        const bairro =  document.getElementById('bairro').value;
        const cidade =  document.getElementById('cidade').value;
        const uf =  document.getElementById('uf').value;
        localStorage.setItem('nome', nome);
        localStorage.setItem('email', email);
        localStorage.setItem('cpf', cpf);
        localStorage.setItem('cep', cep);
        localStorage.setItem('rua', rua);
        localStorage.setItem('bairro', bairro);
        localStorage.setItem('cidade', cidade);
        localStorage.setItem('uf', uf);

    }
    const navigate = useNavigate();
   
    return(
        <Dialog className={styles.card} visible={visible}  onHide={() => {if (!visible) return; setVisible(false); }}>
            <div className="card">
                <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">{t('upload')}</p>} />
            </div>
            <InputText className={styles.inputDocuments} placeholder={t('name')} id="nome" />
            <InputText className={styles.inputDocuments} placeholder={t('email')} id="email"/>
            <InputMask className={styles.inputDocuments} value={value}  id="cpf" onChange={(e) => setValue(e.target.value)} mask="999.999.999-99" placeholder="CPF"/> 
            <InputText className={styles.inputDocuments} placeholder="CEP" id="cep" onBlur={(e) => buscarPorCEP(e.target.value)}/>
            <InputText className={styles.inputDocuments} placeholder={t('street')} id="rua" />
            <InputText className={styles.inputDocuments} placeholder={t('neighborhoold')}  id="bairro"/>
            <InputText className={styles.inputDocuments} placeholder= {t('city')} id="cidade" />
            <InputText className={styles.inputDocuments} placeholder="uf" id="uf"/>
            <Button className={styles.button_save} onClick={salvarDados}>{t('button.save')}</Button>
            <Button link onClick={limpa_formulário_cep}>{t('button.cancel')}</Button>
           
        </Dialog>
    );
}

export default PopUpEdit;
