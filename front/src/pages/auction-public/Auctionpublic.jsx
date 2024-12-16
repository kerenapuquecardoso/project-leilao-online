import React, { useState, useEffect, useRef } from "react";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { PanelMenu } from "primereact/panelmenu";
import { Dropdown } from "primereact/dropdown";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import AuctionService from "../../services/AuctionService";
import CategoryService from "../../services/CategoryService";
import "./AuctionPublic.css";

const AuctionPublic = () => {
    const [auctions, setAuctions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const stompClientRef = useRef(null); 

    const isUserLoggedIn = () => !!localStorage.getItem("token");

    const auctionService = new AuctionService();
    const categoryService = new CategoryService();

    useEffect(() => {
        loadCategories();
        loadAuctions();
    }, []);

    useEffect(() => {
        if (auctions.length > 0) {
            const socket = new SockJS("http://localhost:8080/ws");
            const stomp = Stomp.over(socket);

            stomp.connect({}, () => {
                console.log("Asdasdasddsa")
                auctions.forEach((auction) => {          
                    stomp.subscribe(`/topic/auction/${auction.id}`, (message) => {                     
                        const updatedAuction = JSON.parse(message.body);
                        console.log(updatedAuction)
                        setAuctions((prevAuctions) =>
                            prevAuctions.map((a) =>{
                                console.log(a.id === updatedAuction.auctionId ? updatedAuction : a);
                               return a.id === updatedAuction.auctionId ?  {
                                ...a,
                                valueBid: updatedAuction.newValue,
                                emailUserBid: updatedAuction.emailUser,
                            } : a;
                            }
                               
                            )
                      );
                    });
                });
            });

            stompClientRef.current = stomp;

            return () => {
                if (stompClientRef.current) {
                    stompClientRef.current.disconnect();
                }
            };
        }
    }, [auctions]);

    const loadCategories = async () => {
        try {
            const data = await categoryService.list();
            setCategories(
                data.map((category) => ({
                    label: category.name,
                    command: () => setSelectedCategory(category),
                }))
            );
        } catch (error) {
            console.error("Erro ao carregar categorias:", error);
        }
    };

    const loadAuctions = async () => {
        setLoading(true);
        try {
            const data = await auctionService.listPublic();
            setAuctions(data);
        } catch (error) {
            console.error("Erro ao carregar leilões:", error);
        } finally {
            setLoading(false);
        }
    };

    const sendBid = (auction) => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.send(
                `/app/bid/${auction.id}`,
                {},
                JSON.stringify({
                    auctionId:auction.id,
                    userToken: localStorage.getItem("token"),
                })
            );
        } else {
            console.error("STOMP client is not connected.");
        }
    };
    

    const filteredAuctions = auctions.filter((auction) => {
        const matchesCategory = selectedCategory
            ? auction.category?.id === selectedCategory.id
            : true;
        const matchesStatus = statusFilter
            ? auction.status === statusFilter
            : true;
        return matchesCategory && matchesStatus;
    });

    const renderAuctionItem = (auction) => (
        <div className="auction-item">
            <h3>{auction.title}</h3>
            <p>{auction.description}</p>
            <p><strong>Status:</strong> {auction.status}</p>
            <p><strong>Início:</strong> {new Date(auction.startDateTime).toLocaleString()}</p>
            <p><strong>Fim:</strong> {new Date(auction.endDateTime).toLocaleString()}</p>
            <p><strong>Incremento:</strong> R$ {auction.incrementValue}</p>
            <p><strong>Valor:</strong> R$ {auction.valueBid}</p>
            <p><strong>Usuário:</strong> {auction.emailUserBid}</p>
            <Button label="Ver Detalhes" className="p-button-outlined p-button-primary" />
            {isUserLoggedIn() ? (
                <Button
                    label="Lance"
                    className="p-button-raised p-button-success"
                    style={{ marginTop: "10px" }}
                    onClick={() => sendBid(auction)}
                />
            ) : (
                "Faça login para dar lance"
            )}
        </div>
    );

    return (
        <div className="auction-public-container">
 
            <div className="sidebar">
                <PanelMenu model={categories} style={{ width: "300px" }} />
                <div className="filter">
                    <h4>Filtrar por Status</h4>
                    <Dropdown
                        value={statusFilter}
                        options={[
                            { label: "Todos", value: null },
                            { label: "Ativo", value: "ACTIVE" },
                            { label: "Encerrado", value: "CLOSED" },
                        ]}
                        onChange={(e) => setStatusFilter(e.value)}
                        placeholder="Selecione um status"
                    />
                </div>
            </div>

            <div className="main-content">
                <DataView
                    value={filteredAuctions}
                    layout="grid"
                    itemTemplate={renderAuctionItem}
                    loading={loading}
                    paginator
                    rows={9}
                    emptyMessage="Nenhum leilão encontrado."
                />
            </div>
        </div>
    );
};

export default AuctionPublic;