import React, {useRef} from 'react'
import { cedulaLogin } from '../Validacion/Validacion'
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [cedula, setCedula] = useState(cedulaLogin);
    
    const navigate = useNavigate();
    const contrasenaRef= useRef("");
    const cedulaRef = useRef("")
    var host = "http://localhost:8080";


    const navegar = (url) => {
        navigate(url);
    }

    const login = (event) =>{
        event.preventDefault();
        let contrasena = contrasenaRef.current.value;
        let errorContrasena = document.getElementById("errorPass-1");
        let errorC = "";

        let flag = false;

        if(contrasena === ""){
            errorC = "Digite una contraseña"
            flag = true;
        }

        if(flag === true){
            errorContrasena.innerHTML = errorC;
        }else {
            errorC ="";
            errorContrasena = errorC;

            contrasenaRef.current.value = "";
            cedulaRef.current.value="";
        }

        let ingreso={
            "cedula" : cedula,
            "contrasena" : contrasena
        }

        fetch(`${host}/login`, {
            headers:{"content-type": "application/json"},
            method: "POST",
            body: JSON.stringify(ingreso)
        }).then((data) => data.json())
          .then((data) =>{
            var decoded = jwt_decode(data.token);
            console.log(data.url)
            
            if(decoded.rol === "cliente"){
                localStorage.setItem("token", data.token); //Sube el token al localStorage
                navegar(data.url)

            } else if(decoded.rol === "Tecnico"){
                localStorage.setItem("token", data.token);
                navegar(data.url) 

            } else if(data.rol === "Analista"){
                localStorage.setItem("token", data.token);
                navegar(data.url)

            }else if(data.rol === "Admin"){
                localStorage.setItem("token", data.token);
                navegar(data.url)
            
            }else if (data.estado === "error"){
                    alert(data.msg)
                    window.location.href = "/Validacion";
                    localStorage.removeItem("token");
            }
            
        }).catch((error)=>{
            console.log("error en el servidor")
            alert(error)
        })
    }


    useEffect(() => {
        setCedula(cedulaLogin);
    }, [])

    return (
        <React.Fragment>

            <div className="row" style={{ marginTop: "120px" }}>
                <div className="col">
                    <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center">
                        <div style={{ background: "#FFFFFF", width: "386px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomRightRadius: "8px", borderBottomLeftRadius: "8px" }}>
                            <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ fontSize: "20px", textAlign: "center", fontWeight: "bold", marginBottom: "12px", marginTop: "32px" }}>Inicio de sesión</h2>
                            <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ textAlign: "center", fontSize: "12px", color: "#A1AEB7", marginBottom: "24px", paddingRight: "32px", paddingLeft: "32px", borderColor: "#A1AEB7" }}>Hemos encontrado una cuenta asociada a tu cédula, ingresa la contraseña.<br /></p>
                            <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{ marginTop: "24px", marginBottom: "24px" }}>
                                <form method="post" style={{ width: "260px" }}>
                                    <div className="mb-3" style={{ fontSize: "12px" }}>
                                        <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>Cédula</p>
                                        <input ref={cedulaRef} value={cedula} className="form-control form-control-sm" type="text" name="Cedula" placeholder="Cédula" style={{ fontSize: "14px", marginBottom: "4px" }} required="" readonly="" />
                                    </div>
                                    <div className="mb-3" style={{ fontSize: "12px" }}>
                                        <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>Contraseña</p>
                                        <input ref={ contrasenaRef } className="form-control form-control-sm" type="password" name="pass" style={{ fontSize: "14px", marginBottom: "4px" }} required="" />
                                        <p id="errorPass-1" style={{ color: 'var(--bs-red)' }}></p>
                                    </div>
                                    <div className="d-xl-flex justify-content-xl-center mb-3" style={{ width: "40%", marginLeft: "30%", fontSize: "14px" }}>
                                        <button onClick={login} className="btn btn-primary d-block w-100" type="button" style={{ background: "#424B5A", borderColor: "#424B5A", fontSize: "14px" }}>Iniciar</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}