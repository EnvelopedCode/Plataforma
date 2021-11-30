import React from 'react'

export default function Titulo(titulo) {

    return (
        <React.Fragment>
            <div className="container" style={{color: "#424B5A"}}>
                    <div style={{marginTop: "36px"}}>
                    <h1 style={{textAlign: "center",fontSize: "54px",marginBottom: "0px"}}>{titulo.mensaje}</h1>
                    <p style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "0px"}}>A continuación, podrás registrar tanto de forma manual <br/>como masiva los nuevos servicios de clientes.<br/></p>
                </div>
            </div>
        </React.Fragment>
    )
}
