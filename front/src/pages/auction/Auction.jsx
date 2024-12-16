import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import AuctionService from "../../services/AuctionService";
import CategoryService from "../../services/CategoryService";

const Auction = () => {
    const [auctions, setAuctions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [auction, setAuction] = useState({
        title: "",
        description: "",
        startDateTime: null,
        endDateTime: null,
        base64: "",
        status: "",
        observation: "",
        incrementValue: 0,
    });
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    const auctionService = new AuctionService();
    const categoryService = new CategoryService();

    useEffect(() => {
        loadAuctions();
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoryService.list();
            setCategories(data);
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao buscar as categorias!",
            });
        }
    };

    const loadAuctions = async () => {
        setLoading(true);
        try {
            const data = await auctionService.list();
            setAuctions(data);
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao buscar os leilões!",
            });
        } finally {
            setLoading(false);
        }
    };

    const openNew = () => {
        setAuction({
            title: "",
            description: "",
            startDateTime: null,
            endDateTime: null,
            base64: "",
            status: "",
            observation: "",
            incrementValue: 0,
        });
        setDialogVisible(true);
        setIsEdit(false);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const handleChange = () => {
        var arquivoSelecionado = document.getElementById("img").files;
        if(arquivoSelecionado.length > 0){
            var carregarImagem = arquivoSelecionado[0];
            var lerArquivo = new FileReader();
            lerArquivo.onload = function(e){
               var imagemBase64  = e.target.result;
               setAuction({ ...auction, base64: imagemBase64 });
               console.log(imagemBase64);
               var novaImg = document.createElement('img');
               novaImg.src = imagemBase64;
               document.getElementById('imgem').innerHTML = novaImg.outerHTML;
            }
            lerArquivo.readAsDataURL(carregarImagem);
        } 
    };

    const saveAuction = async () => {
        try {
            if (isEdit) {
                await auctionService.update(auction);
                toast.current.show({ severity: "success", summary: "Atualizado", detail: "Leilão atualizado com sucesso!" });
            } else {
                await auctionService.insert(auction);
                toast.current.show({ severity: "success", summary: "Criado", detail: "Leilão criado com sucesso!" });
            }
            loadAuctions();
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao salvar o leilão",
            });
        } finally {
            hideDialog();
        }
    };

    const editAuction = (auction) => {
        setAuction({
            ...auction,
            startDateTime: auction.startDateTime ? new Date(auction.startDateTime) : null,
            endDateTime: auction.endDateTime ? new Date(auction.endDateTime) : null,
        });
        setDialogVisible(true);
        setIsEdit(true);
    };

    const confirmDeleteAuction = (auction) => {
        confirmDialog({
            message: `Remover o leilão "${auction.title}"?`,
            header: "Confirmação",
            icon: "pi pi-exclamation-triangle",
            accept: () => deleteAuction(auction),
        });
    };

    const deleteAuction = async (auction) => {
        try {
            await auctionService.delete(auction.id);
            toast.current.show({ severity: "warn", summary: "Removido", detail: "Leilão removido com sucesso" });
            loadAuctions();
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao remover o leilão",
            });
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => editAuction(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger"
                    onClick={() => confirmDeleteAuction(rowData)}
                />
            </>
        );
    };

    const dialogFooter = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveAuction} />
        </div>
    );

    return (
        <div className="p-grid p-justify-center">
            <Toast ref={toast} />
            <ConfirmDialog acceptLabel="Sim" rejectLabel="Não" />

            <Button label="Novo Leilão" icon="pi pi-plus" className="p-button-success" onClick={openNew} />

            <DataTable value={auctions} loading={loading} paginator rows={10}>
                <Column field="title" header="Título"></Column>
                <Column field="description" header="Descrição"></Column>
                <Column field="status" header="Status"></Column>
                <Column field="incrementValue" header="Incremento"></Column>
                <Column
                    field="startDateTime"
                    header="Início"
                    body={(rowData) =>
                        rowData.startDateTime ? new Date(rowData.startDateTime).toLocaleString("pt-BR") : ""
                    }
                ></Column>
                <Column
                    field="endDateTime"
                    header="Fim"
                    body={(rowData) =>
                        rowData.endDateTime ? new Date(rowData.endDateTime).toLocaleString("pt-BR") : ""
                    }
                ></Column>
                <Column body={actionBodyTemplate} header="Ações"></Column>
            </DataTable>

            <Dialog
                visible={dialogVisible}
                style={{ width: "50vw" }}
                header={isEdit ? "Editar Leilão" : "Novo Leilão"}
                modal
                footer={dialogFooter}
                onHide={hideDialog}
            >
                <div className="p-fluid">
                    <div className="p-grid">

                        <div className="p-col-12 p-md-6">
                            <label htmlFor="title">Título</label>
                            <InputText
                                id="title"
                                value={auction.title}
                                onChange={(e) => setAuction({ ...auction, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="p-col-12 p-md-6">
                            <label htmlFor="description">Descrição</label>
                            <InputText
                                id="description"
                                value={auction.description}
                                onChange={(e) => setAuction({ ...auction, description: e.target.value })}
                            />
                        </div>

                        <div className="p-col-12 p-md-6">
                            <label htmlFor="startDateTime">Data de Início</label>
                            <Calendar
                                id="startDateTime"
                                value={auction.startDateTime}
                                onChange={(e) => setAuction({ ...auction, startDateTime: e.value })}
                                showTime
                                dateFormat="dd/mm/yy"
                            />
                        </div>
                        <div className="p-col-12 p-md-6">
                            <label htmlFor="endDateTime">Data de Fim</label>
                            <Calendar
                                id="endDateTime"
                                value={auction.endDateTime}
                                onChange={(e) => setAuction({ ...auction, endDateTime: e.value })}
                                showTime
                                dateFormat="dd/mm/yy"
                            />
                        </div>

                        <div className="p-col-12 p-md-6">
                            <label htmlFor="incrementValue">Incremento</label>
                            <InputText
                                id="incrementValue"
                                type="number"
                                value={auction.incrementValue}
                                onChange={(e) => setAuction({ ...auction, incrementValue: parseFloat(e.target.value) })}
                            />
                        </div>
                        <div className="p-col-12 p-md-6">
                            <label htmlFor="status">Status</label>
                            <Dropdown
                                id="status"
                                value={auction.status}
                                options={[{ label: "Ativo", value: "ACTIVE" }, { label: "Encerrado", value: "CLOSED" }]}
                                onChange={(e) => setAuction({ ...auction, status: e.value })}
                                placeholder="Selecione o Status"
                            />
                        </div>

                        <div className="p-col-12 p-md-6">
                            <input
                                id="img"
                                type="file"
                                onChange={handleChange} 
                            /><br/>
                            <div id="imgem" alt="preview" height="100px" width="100px" />
                        </div>

                        <div className="p-col-12 p-md-6">
                            <label htmlFor="category">Categoria</label>
                            <Dropdown
                                id="category"
                                value={auction.category}
                                options={categories}
                                onChange={(e) => setAuction({ ...auction, category: e.value })}
                                optionLabel="name"
                                placeholder="Selecione uma Categoria"
                            />
                        </div>

                        <div className="p-col-12">
                            <label htmlFor="observation">Observação</label>
                            <InputText
                                id="observation"
                                value={auction.observation}
                                onChange={(e) => setAuction({ ...auction, observation: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </Dialog>

        </div>
    );
};

export default Auction;