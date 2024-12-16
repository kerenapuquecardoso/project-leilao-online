import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import CategoryService from "../../services/CategoryService";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({ name: "", observation: "" });
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    const categoryService = new CategoryService();

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setLoading(true);
        try {
            const data = await categoryService.list();
            setCategories(data);
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao buscar as categorias!",
            });
        } finally {
            setLoading(false);
        }
    };

    const openNew = () => {
        setCategory({ name: "", observation: "" });
        setDialogVisible(true);
        setIsEdit(false);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const saveCategory = async () => {
        try {
            if (isEdit) {
                await categoryService.update(category);
                toast.current.show({ severity: "success", summary: "Atualizado", detail: "Categoria atualizada com sucesso!" });
            } else {
                await categoryService.insert(category);
                toast.current.show({ severity: "success", summary: "Criado", detail: "Categoria criada com sucesso!" });
            }
            loadCategories();
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao salvar categori",
            });
        } finally {
            hideDialog();
        }
    };

    const editCategory = (category) => {
        setCategory({ ...category });
        setDialogVisible(true);
        setIsEdit(true);
    };

    const confirmDeleteCategory = (category) => {
        confirmDialog({
            message: `Remover a categoria "${category.name}"?`,
            header: "Confirmaçõa",
            icon: "pi pi-exclamation-triangle",
            accept: () => deleteCategory(category),
        });
    };

    const deleteCategory = async (category) => {
        try {
            await categoryService.delete(category.id);
            toast.current.show({ severity: "warn", summary: "Removido", detail: "Categoria removida com sucesso" });
            loadCategories();
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao remover a categoria",
            });
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => editCategory(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger"
                    onClick={() => confirmDeleteCategory(rowData)}
                />
            </>
        );
    };

    const dialogFooter = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveCategory} />
        </div>
    );

    return (
        <div className="p-grid p-justify-center">
            <Toast ref={toast} />
            <ConfirmDialog acceptLabel="Sim" rejectLabel="Não"/>
          
                <Button label="Nova Categoria" icon="pi pi-plus" className="p-button-success" onClick={openNew} />
           
            <DataTable
                value={categories}
                loading={loading}
         
            >
                <Column field="name" header="Nome"></Column>
                <Column field="observation" header="Observação"></Column>
                <Column body={actionBodyTemplate} header="Ações"></Column>
            </DataTable>

            <Dialog
                visible={dialogVisible}
                style={{ width: "30vw" }}
                header={isEdit ? "Editar Categoria" : "Nova Categoria"}
                modal
                footer={dialogFooter}
                onHide={hideDialog}
            >
                <div className="field">
                    <label htmlFor="name">Nome</label>
                    <InputText
                        id="name"
                        value={category.name}
                        onChange={(e) => setCategory({ ...category, name: e.target.value })}
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="observation">Observação</label>
                    <InputText
                        id="observation"
                        value={category.observation}
                        onChange={(e) => setCategory({ ...category, observation: e.target.value })}
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default Category;