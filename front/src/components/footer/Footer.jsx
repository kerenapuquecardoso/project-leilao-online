import React from "react";
import './Fotter.css';
import { useTranslation } from "react-i18next";
const Footer = () => {
    const {t} = useTranslation();
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>{t('about')}</h2>
                    <p>{t('txt-footer')}</p>
                </div>

                <div className="footer-section contact">
                    <h2>{t('contact')}</h2>
                    <p><i className="pi pi-envelope"></i> contato@leilaoonline.com</p>
                    <p><i className="pi pi-phone"></i> (44) 99999-9999</p>
                    <p><i className="pi pi-map-marker"></i> Rua Exemplo, 123, Paranavaí, PR</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy;{t('reserved')}</p>
            </div>
        </footer>
    );
}

export default Footer;
