import React, { Fragment } from 'react'
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";

export var cedulaLogin = "";
export var cedulaRegistro = "";

export default function Validacion() {

    const validarRef = useRef("");
    const navigate = useNavigate();
    var host = "http://localhost:8080";

    const navegar = (url) => {
        navigate(url);
    }

    const validar = (event) => {
        event.preventDefault();

        let cedula = validarRef.current.value;
        let errorCedula = document.getElementById("errorCedula-1");
        let errorC;

        let flag = false;

        if(cedula === ""){
            errorC = "Ingrese una cedula";
            flag = true;
        } else if (cedula.length !== 10){
            errorC = "Ingrese una cedula de tamaño adecuado"
            flag = true;
        }

        if(flag === true){
            errorCedula.innerHTML = errorC;
        } else {
            errorC = "";
            errorCedula.innerHTML = errorC;
            validarRef.current.value = "";

            let validar = {
                "cedula": cedula
            }


            fetch(`${host}/validacion`, {
              headers: { "content-type": "application/json" },
              method: "POST",
              body: JSON.stringify(validar)
            })
              .then((data) => data.json()) // Obtener los datos
              .then((data) => {
                if(data.url){
                    navegar(data.url);
                    cedulaLogin = data.cedula;
                    cedulaRegistro = data.cedula;
                } else {
                    alert(data.msg);
                }
              }).catch((error) => alert(error));
                    

        }
    }


    return (
        <Fragment>
            <div className="row" style={{marginTop: "120px"}}>
                <div className="col">
                    <div
                        className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center">
                        <div
                            style={{background: "#FFFFFF",width: "386px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                            <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center"
                                style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>
                                Validación de usuario</h2>
                            <p className="d-xl-flex justify-content-xl-center align-items-xl-center"
                                style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "24px",paddingRight: "32px",paddingLeft: "32px",borderColor: "#A1AEB7"}}>
                                BIenvenido al portal de usuarios. Para acceder, ingresa tu número de cédula para validar tu
                                perfil.<br /></p>
                            <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                style={{marginTop: "24px",marginBottom: "24px"}}>
                                <form id="formTest" method="post" style={{width: "260px"}}>
                                    <div className="mb-3" style={{fontSize: "12px"}}>
                                        <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Cédula</p>
                                        <input ref={validarRef} className="form-control form-control-sm" type="text" name="Cedula" placeholder="Cédula" style={{fontSize: "14px",marginBottom: "4px"}} required="" />
                                        <p id="errorCedula-1" style={{color: 'var(--bs-red)'}}></p>
                                    </div>
                                    <div className="d-xl-flex justify-content-xl-center mb-3"
                                        style={{width: "40%",marginLeft: "30%",fontSize: "14px"}}>
                                            <button onClick={validar} className="btn btn-primary d-block w-100" type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "14px"}}>Validar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
