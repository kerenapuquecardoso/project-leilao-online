import React from "react";
import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from "react-i18next";
import styles from './LanguageDropdown.module.css';
import en from '../../images/en.png';
import pt from '../../images/pt.png'
const LanguageDropdown = () => {
    const { i18n, t } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        console.log(language);
    }

    const languages = [
        { name: 'English', code: 'en', flag: en },
        { name: 'Português', code: 'pt', flag: pt },
    ];

    const selectedLanguageTemplate = (option) => {
        if (option) {
            return (
                <div className={styles.languageOption}>
                    <img alt={option.name} src={option.flag} className={styles.flag} />
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{t('chooseLanguage')}</span>;
    };

    const languageOptionTemplate = (option) => {
        return (
            <div className={styles.languageOption}>
                <img alt={option.name} src={option.flag} className={styles.flag} />
                <div>{option.name}</div>
            </div>
        );
    };

    return (
        <Dropdown 
            value={languages.find(lang => lang.code === i18n.language)} 
            onChange={(e) => changeLanguage(e.value.code)} 
            options={languages} 
            optionLabel="name" 
            placeholder="Select Language" 
            valueTemplate={selectedLanguageTemplate} 
            itemTemplate={languageOptionTemplate} 
            className={`w-full md:w-14rem ${styles.dropdown}`} 
        />
    );
};

export default LanguageDropdown;
