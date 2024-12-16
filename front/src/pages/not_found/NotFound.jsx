import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../access_danied/access_danied.module.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1>404</h1>
            <h2 className={styles.title}>Recurso não encontrado!</h2>
            <p className={styles.message}>Tente novamente mais tarde.</p>
            <button className={styles.button} onClick={() => navigate('/')}>Voltar para Login</button>
        </div>
    );
}

export default NotFound;