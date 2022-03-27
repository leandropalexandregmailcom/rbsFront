import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
    const [open, setOpen] = React.useState(false);

    return ( <>
        <FormDialog open = { open } setOpen = { setOpen } title = { props.title }description = { props.description }
            type = { props.type }
            criticality = { props.criticality }
            status = { props.status }
            listCard = { props.listCard }
            setListCard = { props.setListCard }
            id = { props.id }
        />
        <div className = "card-container" onClick = { () => setOpen(true) } >
        <h1 className = "card-title" > { props.title } </h1>
        <p className = "card-id" > { props.id } </p>
        <p className = "card-cartegory" > { props.description } </p>
        <h3 className = "card-cost" > { props.criticality } </h3>
        <h3 className = "card-cost" > { props.status } </h3>
        </div > </>
    );
}