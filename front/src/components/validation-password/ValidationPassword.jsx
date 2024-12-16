import React, { useState } from "react";
import './ValidationPassword.css';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { useTranslation } from "react-i18next";

export default function ValidationPassword({ onPasswordChange }) {
    const { t } = useTranslation();
    const [password, setPassword] = useState('');
    const [validateInput, setValidateInput] = useState({
        lowcase: false,
        upcase: false,
        number: false,
        length: false,
        special: false
    });

    const validation = (e) => {
        const passwordInput = e.target.value;
        setPassword(passwordInput);
        onPasswordChange(passwordInput); 

        const regexUppercase = /[A-Z]/;
        const regexLowercase = /[a-z]/;
        const regexNumber = /[0-9]/;
        const regexSpecialCharacter = /[!#@$%&]/;
        const length = passwordInput.length >= 6;

        setValidateInput({
            number: regexNumber.test(passwordInput),
            length: length,
            special: regexSpecialCharacter.test(passwordInput),
            lowcase: regexLowercase.test(passwordInput),
            upcase: regexUppercase.test(passwordInput),
        });
    };

    const header = <div className="font-bold mb-3">{t('passwordTxt')}</div>;

    const footer = (
        <>
            <Divider />
            <p className="mt-2">{t('suggestions')}</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li className={validateInput.length ? "text-green-500" : "text-red-500"}>{t('char')}</li>
                <li className={validateInput.upcase ? "text-green-500" : "text-red-500"}>{t('upperCase')}</li>
                <li className={validateInput.lowcase ? "text-green-500" : "text-red-500"}>{t('lowerCase')}</li>
                <li className={validateInput.special ? "text-green-500" : "text-red-500"}>{t('specialChar')}</li>
                <li className={validateInput.number ? "text-green-500" : "text-red-500"}>{t('number')}</li>
            </ul>
        </>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form className="password-form" onSubmit={handleSubmit}>
            <div className="p-icon-field">
                <Password
                    name="password"
                    toggleMask
                    style={{ width: '100%' }}
                    inputStyle={{ width: '100%' }}
                    value={password}
                    onChange={validation}
                    header={header}
                    footer={footer}
                    placeholder={t('password')}
                    className="password-input"
                />
            </div>
        </form>
    );
}
