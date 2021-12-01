import React from 'react'

export default function Titulo({titulo, subTitulo1}) {

    return (
        <React.Fragment>
            <div style={{marginBottom: "36px"}}>
                <h1 style={{textAlign: "center",fontSize: "54px",marginBottom: "0px"}}>{titulo}</h1>
                <p style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "0px"}}>{subTitulo1}</p>
            </div>          
        </React.Fragment>
    )
}
