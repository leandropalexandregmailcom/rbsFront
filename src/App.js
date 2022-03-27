import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/cards";

export default function App() {
    const [values, setValues] = useState();
    const [listCard, setListCard] = useState([]);

    const handleRegisterGame = () => {
        Axios.post("http://127.0.0.1:8000/api/incidents/", {
            title: values.title,
            description: values.description,
            type: values.type,
            criticality: values.criticality,
            status: values.status,
        }).then(() => {
            values.title = ''
            values.description = ''
            values.type = ''
            values.criticality = ''
            values.status = ''
            Axios.get("http://127.0.0.1:8000/api/incidents/", {
                id: values.id
            }).then((response) => {
                setListCard([
                    ...listCard,
                    {
                        id: response.id,
                        title: values.title,
                        description: values.description,
                        type: values.type,
                        criticality: values.criticality,
                        status: values.status,
                    },
                ]);
            });
        });
    };

    useEffect(() => {
        Axios.get("http://127.0.0.1:8000/api/incidents").then((response) => {
            setListCard(response.data);
        });
    }, []);

    const handleaddValues = (value) => {
        setValues((prevValues) => ({
            ...prevValues,
            [value.target.name]: value.target.value,
        }));
    };

    return (
        <div className = "app-container">
            <div className = "register-container">
                <h1 className = "register-title" > Cadastro de incidentes </h1>
                <label class = "label" > Título </label>
                <input type = "text"name = "title" placeholder = "Título" className = "register-input" onChange = { handleaddValues }/>
                <label class = "label" > Descrição </label>
                <input type = "text" name = "description" placeholder = "Descrição" className = "register-input" onChange = { handleaddValues } />
                <label class = "label">Criticidade</label >
                <select class = "register-input" name = "criticality" onChange = { handleaddValues } >
                    <option value = "baixa" > Baixa </option>
                    <option value = "media" > Média </option>
                    <option value = "alta" > Alta </option>
                </select >
                <label class = "label" > Tipo </label>
                <select class = "register-input" name = "type" onChange = { handleaddValues } >
                    <option value = "alarme" > alarme </option>
                    <option value = "incidente" > Incidente </option>
                    <option value = "outras" > Outras </option>
                </select>
                <label class = "label" > Status </label>
                <select class = "register-input"name = "status"onChange = { handleaddValues } >
                    <option value = "ativo" > Ativo </option>
                    <option value = "inativo" > Inativo </option>
                </select >
                <button onClick = { handleRegisterGame }className = "register-button" >Cadastrar </button>
            </div >

            {
                listCard.map((val) => ( <
                    Card listCard = { listCard }
                    setListCard = { setListCard }
                    key = { val.id }
                    id = { val.id }
                    title = { val.title }
                    description = { val.description }
                    criticality = { val.criticality }
                    type = { val.type }
                    status = { val.status }
                    />
                ))
            }
        </div>
    );
}