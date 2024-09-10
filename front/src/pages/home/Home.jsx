import React  from "react";
import holandesa from "../../images/holandesa.png";
import { useTranslation } from "react-i18next";
import VerticalBarDemo from "../../components/graph/vertical_bar_demo"
import { Card } from "primereact/card";
import DoughnutChartDemo from "../../components/graph/doughnut_chart_demo";

const Home  = () =>{
    const {t} = useTranslation();

    return(
        <div className="body-home">
            <h1>{t('welcome')}</h1>
            <img src={holandesa} className="holandesa" alt="logo do leilão online" />
            <div class="flex justify-content-evenly flex-wrap">
                <Card class="flex align-items-center justify-content-center shadow-6 p-4 w-3 h-17rem font-bold border-round m-2 line-height-2 font-light text-base"><p>{t('dashboard1')}</p></Card>
                <Card class="flex align-items-center justify-content-center shadow-6 p-4  w-3  h-17rem font-bold border-round m-2 line-height-2 font-light text-base"><p>{t('dashboard2')}</p></Card>
                <Card class="flex align-items-center justify-content-center shadow-6 p-4  w-3 h-17rem font-bold border-round m-2 line-height-2 font-light"><p>{t('dashboard3')}</p></Card>
            </div>
            <div className="grap">
                <VerticalBarDemo></VerticalBarDemo>
                <DoughnutChartDemo></DoughnutChartDemo>
            </div>
            
            
        </div>

        
    );
}

export default Home;


/**
 * quantidade de leilões ativos, 
 * últimos itens arrematados, 
 * últimos usuários cadastrados, 
 * total de vendas realizadas, 
 */