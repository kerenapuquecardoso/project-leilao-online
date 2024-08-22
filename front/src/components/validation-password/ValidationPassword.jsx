import React, { useState } from "react";
import './ValidationPassword.css';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';


export default function  ValidationPassword({onPasswordChange}) {
    const [password, setPassword] = useState('');
    const header = <div className="font-bold mb-3">Pick a password</div>;
    const [validateInput, setValidateInput] = useState({
        lowcase: false,
        upcase: false,
        number: false,
        length: false,
        special: false
    });
    
    const validation = (e) => {
        const passwordIput = e.target.value;
        setPassword(passwordIput);
        const regexUppercase = /[A-Z]/;
        const regexLowercase = /[a-z]/;
        const regexNumber = /[0-9]/;
        const regexSpecialCharacter = /[!#@$%&]/;
        const length = passwordIput.length >= 6;

        setValidateInput({
            number: regexNumber.test(passwordIput),
            length: length,
            special: regexSpecialCharacter.test(passwordIput),
            lowcase: regexLowercase.test(passwordIput),
            upcase: regexUppercase.test(passwordIput),
        });
    };

    const  footer = (
        <>
            <Divider/>
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li className={validateInput.length ? "text-green-500" : "text-red-500"}>6 caracteres</li>
                <li className={validateInput.upcase ? "text-green-500" : "text-red-500"}>1 letra maiúscula</li>
                <li className={validateInput.lowcase ? "text-green-500" : "text-red-500"}>1 letra minúscula</li>
                <li className={validateInput.special ? "text-green-500" : "text-red-500"}>1 caractere especial</li>
                <li className={validateInput.number ? "text-green-500" : "text-red-500"}>1 número</li>
            </ul>
        </>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
    
            <form className="password-form" onSubmit={handleSubmit}>
                <div className="p-icon-field">
                    <Password  toggleMask style={{width:'100%'}} inputStyle={{width:'100%'}} value={password} onChange={(event) => onPasswordChange(event.target.value)} onInput={validation} header={header} footer={footer} placeholder="Senha" className="password-input"/>
                </div>
            </form>
            );
};
