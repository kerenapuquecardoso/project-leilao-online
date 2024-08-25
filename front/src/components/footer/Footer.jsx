import React from "react";
import './Fotter.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>Sobre o Leilão</h2>
                    <p>
                        Nosso leilão online de gado oferece a melhor plataforma para compra e venda de gado leiteiro. 
                        Garantimos uma experiência segura e transparente para todos os usuários.
                    </p>
                </div>

                <div className="footer-section contact">
                    <h2>Contato</h2>
                    <p><i className="pi pi-envelope"></i> contato@leilaoonline.com</p>
                    <p><i className="pi pi-phone"></i> (44) 99999-9999</p>
                    <p><i className="pi pi-map-marker"></i> Rua Exemplo, 123, Paranavaí, PR</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Leilão Online. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
