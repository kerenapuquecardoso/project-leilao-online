import React from "react";
import { Form } from "react-router-dom";
import styles from  "../../pages/porfile/porfile.module.css";
import { Card } from "primereact/card";
const Porfile = () => {
    return(
        <Card>
            Porfile
        </Card>
    );
}

export default Porfile;  

/**
 * Edição do perfil, 
 * com campos dos dados pessoais, 
 * documentos,
 * endereço completo 
 * foto de perfil 
 * somente pessoa física, Validar o CPF;
 * A tela deverá ser chamada a partir da área logada;
 * Utilizar localização do navegador para pesquisar o endereço e completar automaticamente;
 * Utilizar uma API de endereço;
 * Completar o endereço ao informar o CEP.
 */