import React, { useState } from "react";
import './Header.css';
import 'primeicons/primeicons.css';
import MenuLeilao from "../menu/MenuLeilao";
import LanguageDropdown from "../language/language_drop_dow"
const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    return (
        <header>
            <nav>
                
                <div className="card flex">
                    <i className="pi pi-bars" onClick={toggleMenu}></i>
                    <LanguageDropdown/>
                </div>
            </nav>
            {menuVisible && (
                <div className="overlay" onClick={closeMenu}></div>
            )}
            <div className={`navbar ${menuVisible ? 'visible' : ''}`}>
                <MenuLeilao />
            </div>
        </header>
    )
}

export default Header;
