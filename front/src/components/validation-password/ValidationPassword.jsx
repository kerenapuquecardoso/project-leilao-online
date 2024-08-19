import React, { useState } from "react";
import './ValidationPassword.css';
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

    const validation = (e) => {
        const password = e.target.value;
        const regexUppercase = /[A-Z]/;
        const regexLowercase = /[a-z]/;
        const regexNumber = /[0-9]/;
        const regexSpecialCharacter = /[!#@$%&]/;
        const length = password.length >= 6;

        setValidateInput({
            number: regexNumber.test(password),
            length: length,
            special: regexSpecialCharacter.test(password),
            lowcase: regexLowercase.test(password),
            upcase: regexUppercase.test(password),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
    
            <form className="password-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <Password onChange={validation} feedback={false} placeholder="Senha" className="password-input"/>
                </div>
                <div className="messages">
                    <Message severity={validateInput.length ? "success" : "error"} text="6 caracteres" />
                    <Message severity={validateInput.upcase ? "success" : "error"} text="1 letra maiúscula" />
                    <Message severity={validateInput.lowcase ? "success" : "error"} text="1 letra minúscula" />
                    <Message severity={validateInput.special ? "success" : "error"} text="1 caractere especial" />
                    <Message severity={validateInput.number ? "success" : "error"} text="1 número" />
                </div>
            </form>
            );
};

export default ValidationPassword;
