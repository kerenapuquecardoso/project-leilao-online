import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PersonService from '../../services/PersonService';
import styles from './ValidateRegister.module.css';

const ValidateRegister = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const personService = new PersonService();

    useEffect(() => {
        const validateEmail = async () => {
            if (email) {
                try {
                    console.log("Email "+email);
                    setLoading(true);
                    const isValid = await personService.validRegister(email);
                    console.log(isValid);
                    navigate('/');
                } catch (error) {
                    console.error(error);
                    setError('Erro ao validar dados, por favor, certifique-se que tenha cadastrado o email corretamente');
                } finally {
                    setLoading(false);
                }
            }
        };
        validateEmail();
    }, [email, navigate]);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Bem vindo ao leilão online de Gado leiteiro</h1>
            <p className={styles.message}>Aguarde enquanto validamos seus dados!</p>
            {loading && <p className={styles.loading}>Carregando...</p>}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default ValidateRegister;