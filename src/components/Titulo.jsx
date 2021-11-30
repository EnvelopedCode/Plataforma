import React from 'react'

export default function Titulo({titulo, subTitulo1, subTitulo2 }) {

    return (
        <React.Fragment>
            <div style={{marginBottom: "36px"}}>
                <h1 style={{textAlign: "center",fontSize: "54px",marginBottom: "0px"}}>{titulo}</h1>
                <p style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "0px"}}>{subTitulo1}<br></br>{subTitulo2}
                </p>
                {/* <p style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "0px"}}>{subTitulo2}
                </p>*/}
            </div>          
        </React.Fragment>
    )
}
