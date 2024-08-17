import React, {useState} from "react";
import './ValidationPassword.css';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { Message } from 'primereact/message';

const ValidationPassword = () => {
    const [validateInput, setValidateInput] = useState({
        lowcase: false,
        upcase: false,
        number: false,
        length: false,
        special: false
        
    });

    const validation = (password) => {
        // Correção dos nomes das variáveis
        const regexUppercase = /[A-Z]/;
        const regexLowercase = /[a-z]/;
        const regexNumber = /[0-9]/;
        const regexSpecialCharacter = /[!#@$%&]/; // Corrigido para 'SpecialCharacter'
        const length = password.length >= 6;
    
        setValidateInput({ 
            number: regexNumber.test(password),
            length: length,
            special: regexSpecialCharacter.test(password),
            lowcase: regexLowercase.test(password),
            upcase: regexUppercase.test(password),
        });
    };
    return (
        <Card >
            <div className="ValidationPassword" title=" A sua senha deve conter no mínio: ">
                <Password  onChange={(password) => { validation(password)}} feedback={false} className="flex align-items-center justify-content-center mt-3" placeholder="senha"/>
                <Message  severity={validateInput.length ? "success" : "error"}  text="6 caracteres" />
                <Message severity={validateInput.upcase ? "success" : "error"} text="1 letra maiúscula"/>
                <Message severity={validateInput.lowcase ? "success" : "error"} text="1 letra minúscula"/>
                <Message severity={validateInput.special ? "success" : "error"} text="1 caracter especial"/>
                <Message severity={validateInput.number ? "success" : "error" } text="1 número"/>          

            </div>
        </Card>
    );
}
export default ValidationPassword;