import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {

    const [editValues, setEditValues] = useState({
        id: props.id,
        title: props.title,
        description: props.description,
        criticality: props.criticality,
        type: props.type,
        status: props.status,
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
        Axios.delete(`http://127.0.0.1:8000/api/incidents/${editValues.id}`).then(() => {
            props.setListCard(
                props.listCard.filter((value) => {
                    return value.id != editValues.id;
                })
            );
        });
        handleClose();
    };

    return (
    <div >
        <Dialog open = { props.open } onClose = { handleClose } >
        <DialogTitle id = "form-dialog-title" > Editar </DialogTitle>
        <DialogContent>
            <TextField disabled margin = "dense" id = "id" label = "id" defaultValue = { props.id } type = "text" fullWidth />
            <TextField autoFocus margin = "dense" id = "title" label = "Título" type = "text" onChange = { handleChangeValues } fullWidth defaultValue = { props.title }/>
            <TextField autoFocus margin = "dense" id = "description" label = "Descrição" defaultValue = { props.description } type = "text" onChange = { handleChangeValues } fullWidth />
            <label> Criticidade </label>
            <select class = "select MuiInputBase-input MuiInput-input MuiInputBase-inputMarginDense MuiInput-inputMarginDense"
                defaultValue = { props.criticality } id = "criticality" >
                <option value = "baixa"> Baixa </option>
                <option value = "media"> Média </option>
                <option value = "alta"> Alta </option>
            </select >
            <label> Tipo </label>
            <select onChange = { handleChangeValues } class = "select MuiInputBase-input MuiInput-input MuiInputBase-inputMarginDense MuiInput-inputMarginDense"
                defaultValue = { props.type }id = "type" >
                <option value = "alarme" > Alarme </option>
                <option value = "incidente" > Incidente </option>
                <option value = "outros" > Outros </option>
            </select >
            <label > Status </label>
            <select onChange = { handleChangeValues } class = "select MuiInputBase-input MuiInput-input MuiInputBase-inputMarginDense MuiInput-inputMarginDense"
                defaultValue = { props.status } id = "status">
                <option value = "ativo" > Ativo </option>
                <option value = "inativo" > Inativo </option>
            </select >
        </DialogContent>
        <DialogActions>
        <Button onClick = { handleClose } color = "primary" >Cancel </Button>
        <Button color = "primary" onClick = { () => handleDeleteGame() } >Excluir </Button>
        <Button color = "primary"onClick = { () => handleEditGame() } >Salvar </Button>
        </DialogActions > </Dialog>
        </div>
    );
}