import React from 'react'
import NavbarAdmin from '../../components/NavbarAdmin'
import Titulo from '../../components/Titulo';
import { useRef } from 'react';

export default function PerfilGestion() {


    // let cedulaRef = useRef("");
    let nombreRef = useRef("");
    let apellidoRef = useRef("");
    let cActualRef = useRef("");
    let cNuevaRef = useRef("");
    let cConfirmarRef=useRef("");
    let cedula = "1000403193" //Aqui reemplazar por la cedula de la sesion actual


    const actualizar = (event) => {

        event.preventDefault();

        let nombre = nombreRef.current.value;
        let apellido = apellidoRef.current.value;

        let errorNombre = document.getElementById("errorNombre");
        let errorApellido = document.getElementById("errorApellido");

        let errorN = "";
        let errorA = "";

        function validarTexto(parametro) {
            var patron = /^[a-zA-Z\s]*$/;
            if (parametro.search(patron)) {
              return false;
            } else {
              return true;
            }
        }

        let flag = false;
        console.warn(validarTexto(nombre));

        if (nombre === "") {
            errorN = "Ingrese un nombre";
            flag = true;
        } else if (validarTexto(nombre) === false) {
            errorN = "Por favor no ingrese caracteres especiales ni numericos";
            flag = true;
        } else if (nombre.length < 3 || nombre.length > 20) {
            errorN = "Ingrese un nombre de longitud adecuada";
            flag = true;
        }

        if (apellido === "") {
            errorA = "Ingrese un apellido";
            flag = true;
        } else if (validarTexto(apellido) === false) {
            errorA = "Por favor no ingrese caracteres especiales ni numericos";
            flag = true;
        } else if (apellido.length < 3 || apellido.length > 20) {
            errorA = "Ingrese un nombre de longitud adecuada";
            flag = true;
        }

        if(flag === true){
            errorNombre.innerHTML = errorN;
            errorApellido.innerHTML = errorA;
        } else {
            errorN = "";
            errorA = "";
            errorNombre.innerHTML = errorN;
            errorApellido.innerHTML = errorA;

            let perfil = {
                "nombre": nombre,
                "apellido": apellido
            }

            perfil = JSON.stringify(perfil)
            console.log(typeof perfil)
            console.log(perfil)
            //HACER POST A LA RUTA

        }

    }

    const asegurar = (event) => {

        event.preventDefault();

        let actual = cActualRef.current.value;
        let nueva = cNuevaRef.current.value;
        let confirmar = cConfirmarRef.current.value;

        // let errorCedula =  document.getElementById("errorCedula"); 
        let errorPass  = document.getElementById("errorPass");
        let errorPassnew = document.getElementById("errorPassnew");
        let errorPassnewconf = document.getElementById("errorPassnewconf");

        let errorP = "";
        let errorPn = "";
        let errorPnc = "";

        let flag = false;

        if(actual === ""){
            errorP = "Ingresa tu contraseña actual";
            flag = true;
        }

        if(nueva === ""){
            errorPn = "Ingresa una contraseña nueva";
            flag = true;
        } else if(nueva === actual){
            errorPn = "Ingresa una contraseña distinta a tu actual";
            flag = true;
        }

        if(confirmar === ""){
            errorPnc = "Confirma tu contraseña antes de hacer los cambios";
            flag = true;
        } else if(confirmar !== nueva){
            errorPnc = "Contraseñas no coinciden";
            flag = true;
        }
        
        if(flag === true){
            errorPass.innerHTML = errorP;
            errorPassnew.innerHTML = errorPn;
            errorPassnewconf.innerHTML = errorPnc;
        } else {
            errorP = "";
            errorPn = "";
            errorPnc = "";
            errorPass.innerHTML = errorP;
            errorPassnew.innerHTML = errorPn;
            errorPassnewconf.innerHTML = errorPnc;

            cActualRef.current.value = "";
            cNuevaRef.current.value = "";
            cConfirmarRef.current.value = "";

            let contraseña = {
                //Añadir usuario de la sesion activa, de esta forma sabemos a quien pertenece esta contraseña
                "actual": actual,
                "nueva": nueva,
                "confirmar": confirmar
              }

              contraseña = JSON.stringify(contraseña)
              console.log(typeof contraseña)
              console.log(contraseña)
              //HACER POST A LA RUTA

        }
    }

    const eliminar = () => {
        //ELIMINAR USUARIO DE LA PLATAFORMA CON BACKEND
    }  

    return (
        <React.Fragment>
            <NavbarAdmin />
            <div className="container" style={{ color: "#424B5A;" }}>
                <Titulo
                    titulo="GESTIÓN PERFIL"
                    subTitulo1="A continuación, podrás gestionar la información asociada a tu perfil de usuario."
                // subTitulo2="como masiva los nuevos servicios de clientes"
                />
                <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center" style={{ marginBottom: "36px" }}>
                    <div style={{ background: "#FFFFFF", width: "386px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomRightRadius: "8px", borderBottomLeftRadius: "8px" }}>
                        <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ fontSize: "20px", textAlign: "center", fontWeight: "bold", marginBottom: "12px", marginTop: "32px" }}>Jorge Pérez</h2>
                        <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{ marginTop: "24px", marginBottom: "24px" }}>
                            <form method="post" style={{ width: "260px" }}>
                                <div className="mb-3" style={{ fontSize: "12px" }}>
                                    <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>Cédula</p>
                                    <input value={cedula} className="form-control form-control-sm" type="text" name="Cedula" placeholder="1140123567" style={{ fontSize: "14px", marginBottom: "4px", textAlign: "center" }} required="" readonly="" />
                                </div>
                                <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ textAlign: "center", fontSize: "12px", color: "#A1AEB7", marginBottom: "24px", paddingRight: "32px", paddingLeft: "32px", borderColor: "#A1AEB7" }}>Campos habilitados para actualización.<br /></p>
                                <div className="mb-3" style={{ fontSize: "12px" }}>
                                    <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>Nombre</p>
                                    <input ref={nombreRef} className="form-control form-control-sm" type="text" name="Nombre" placeholder="Nombre" style={{ fontSize: "14px", marginBottom: "4px" }} required="" />
                                    <p id="errorNombre" style={{ color: 'var(--bs-red)' }}></p>
                                </div>
                                <div className="mb-3" style={{ fontSize: "12px" }}>
                                    <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>Apellido</p>
                                    <input ref={apellidoRef} className="form-control form-control-sm" type="text" name="Apellido" placeholder="Apellido" style={{ fontSize: "14px", marginBottom: "4px" }} required="" />
                                    <p id="errorApellido" style={{ color: 'var(--bs-red)' }}></p>
                                </div>
                                <div className="d-xl-flex justify-content-xl-center mb-3" style={{ width: "40%", marginLeft: "30%", fontSize: "14px" }}>
                                    <button onClick={actualizar} className="btn btn-primary d-block w-100" type="button" style={{ background: "#424B5A", borderColor: "#424B5A", fontSize: "14px" }}>Actualizar</button>
                                </div>
                                <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ textAlign: "center", fontSize: "12px", color: "#A1AEB7", marginBottom: "24px", paddingRight: "32px", paddingLeft: "32px", borderColor: "#A1AEB7" }}>Acá puedes hacer el cambio de tu contraseña para inicio de sesión en la plataforma.<br /></p>
                                <div className="mb-3" style={{ fontSize: "12px" }}>
                                    <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>Contraseña actual</p>
                                    <input ref={cActualRef} className="form-control form-control-sm" type="password" name="pass" style={{ fontSize: "14px", marginBottom: "4px" }} required="" />
                                    <p id="errorPass" style={{ color: 'var(--bs-red)' }}></p>
                                </div>
                                <div className="mb-3" style={{ fontSize: "12px" }}>
                                    <p style={{ color: "#A1AEB7", marginBottom: "0pX", paddingBottom: "4px" }}>Contraseña nueva</p>
                                    <input  ref={cNuevaRef} className="form-control form-control-sm" type="password" name="passnew" style={{ fontSize: "14px", marginBottom: "4px" }} required="" />
                                    <p id="errorPassnew" style={{ color: 'var(--bs-red)' }}></p>
                                </div>
                                <div className="mb-3" style={{ fontSize: '12px' }}>
                                    <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>Confirmar contraseña nueva</p>
                                    <input ref={cConfirmarRef} className="form-control form-control-sm" type="password" name="passnewconf" style={{ fontSize: "14px", marginBottom: "4px" }} required="" />
                                    <p id="errorPassnewconf" style={{ color: 'var(--bs-red)' }}></p>
                                </div>
                                <div className="d-xl-flex justify-content-xl-center mb-3" style={{ width: "40%", marginLeft: "30%", fontSize: "14px" }}>
                                    <button onClick={asegurar} className="btn btn-primary d-block w-100" type="button" style={{ background: "#424B5A", borderColor: "#424B5A", fontSize: "14px" }}>Actualizar</button>
                                </div>
                                <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ textAlign: "center", fontSize: "12px", color: "#A1AEB7", marginBottom: "24px", paddingRight: "32px", paddingLeft: "32px", borderColor: "#A1AEB7" }}>Para darte de baja en la plataforma debes estar al día con todas tus obligaciones.<br /></p>
                                <div className="d-xl-flex justify-content-xl-center mb-3" style={{ width: "40%", marginLeft: "30%", fontSize: "14px" }}>
                                    <button onClick={eliminar} className="btn btn-primary d-block w-100" type="button" style={{ background: "#F2F5F7", fontSize: "14px", borderColor: "#F2F5F7", color: "#505D68" }}>Dar de baja</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        </React.Fragment>
    )
}
