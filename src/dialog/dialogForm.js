import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
    let list = {
        id: props.id,
        name: props.title,
        description: props.description,
        criticality: props.criticality,
        type: props.type,
        status: props.status,
    }
    const [editValues, setEditValues] = useState({
        id: this.list.id,
        name: this.list.title,
        description: this.list.description,
        criticality: this.list.criticality,
        type: this.list.type,
        status: this.list.status,
    });

    const handleChangeValues = (values) => {
        setEditValues((prevValues) => ({
            ...prevValues,
            [values.target.id]: values.target.value,
        }));
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleEditGame = () => {
        Axios.put("http://127.0.0.1:8000/api/incidents/", {
            id: editValues.id,
            name: editValues.title,
            description: editValues.description,
            criticality: editValues.criticality,
            type: editValues.type,
            status: editValues.status,
        }).then(() => {
            list = {
                id: '',
                name: '',
                description: '',
                criticality: '',
                type: '',
                status: '',
            }
            props.setListCard(
                props.listCard.map((value) => {
                    return value.id == editValues.id ? {
                            id: editValues.id,
                            name: editValues.title,
                            description: editValues.description,
                            criticality: editValues.criticality,
                            type: editValues.type,
                            status: editValues.status,
                        } :
                        value;
                })
            );
        });
        handleClose();
    };

    const handleDeleteGame = () => {
        Axios.delete(`http://127.0.0.1:8000/api/incidents//${editValues.id}`).then(() => {
            props.setListCard(
                props.listCard.filter((value) => {
                    return value.id != editValues.id;
                })
            );
        });
        handleClose();
    };

    return (
        <div>
            <Dialog open = { props.open } onClose = { handleClose } aria - labelledby = "form-dialog-title" >
                <DialogTitle id = "form-dialog-title" > Editar </DialogTitle>
                <DialogContent >
                    <label class = "label" > Título </label>
                    <input type = "text" name = "title" placeholder = "Título" className = "register-input" onChange = { handleChangeValues }/>
                    <label class = "label" > Descrição </label >
                    <input type = "text"name = "description"placeholder = "Descrição" className = "register-input" onChange = { handleChangeValues }/>
                    <label class = "label">Criticidade</label>
                    <select class = "register-input" name = "criticality" onChange = { handleChangeValues } >
                        <option value = "baixa" > Baixa </option>
                        <option value = "media" > Média </option>
                        <option value = "alta" > Alta </option>
                    </select>
                    <label class = "label" > Tipo </label>
                    <select class = "register-input" name = "type" onChange = { handleChangeValues } >
                        <option value = "alarme" > alarme </option>
                        <option value = "incidente" > Incidente </option>
                        <option value = "outras" > Outras </option>
                    </select >
                    <label class = "label" > Status </label>
                    <select class = "register-input" name = "status" onChange = { handleChangeValues } >
                        <option value = "ativo" > Ativo </option>
                        <option value = "inativo" > Inativo </option>
                    </select >
                </DialogContent>
                <DialogActions>
                    <Button onClick = { handleClose } color = "primary" > Cancel </Button>
                    <Button color = "primary" onClick = { () => handleDeleteGame() } > Excluir </Button>
                    <Button color = "primary" onClick = { () => handleEditGame() } > Salvar </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}