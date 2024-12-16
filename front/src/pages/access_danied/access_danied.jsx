import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../access_danied/access_danied.module.css';

const AccessDanied = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1>401</h1>
            <h2 className={styles.title}>Acesso Negado</h2>
            <p className={styles.message}>Você precisa estar logado para acessar esta página.</p>
            <button className={styles.button} onClick={() => navigate('/')}>Voltar para Login</button>
        </div>
    );
}

export default AccessDanied;