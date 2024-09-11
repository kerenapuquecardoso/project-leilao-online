import React from "react";
import holandesa from "../../images/holandesa.png";
import { useTranslation } from "react-i18next";
import VerticalBarDemo from "../../components/graph/vertical_bar_demo";
import DoughnutChartDemo from "../../components/graph/doughnut_chart_demo";
import styles from './Home.module.css';
import { Card } from 'primereact/card';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.bodyHome}>
            <h1 className={styles.h1}>{t('welcome')}</h1>
            <img src={holandesa} className={styles.holandesa} alt="logo do leilão online" />
            
            <div className={styles.cardContainer}>
                <Card className={styles.card}>
                    <p>{t('Leilões Ativos')}</p>
                    <h2>12</h2>
                </Card>
                <Card className={styles.card}>
                    <p>{t('Últimos Itens Arrematados')}</p>
                    <h2>R$ 45.000</h2>
                </Card>
                <Card className={styles.card}>
                    <p>{t('Usuários Cadastrados')}</p>
                    <h2>128</h2>
                </Card>
                <Card className={styles.card}>
                    <p>{t('Total de Vendas')}</p>
                    <h2>R$ 320.000</h2>
                </Card>
            </div>
            
            <div className={styles.grap}>
                <VerticalBarDemo />
                <DoughnutChartDemo />
            </div>
        </div>
    );
};

export default Home;
