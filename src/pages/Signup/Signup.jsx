import React from 'react';
import { useRef } from 'react';

export default function Signup() {

    const nombreRef = useRef("");
    const apellidoRef = useRef("");
    const contraseñaRef = useRef("");
    const contraseña2Ref = useRef("");

    const registrar = (event) => {

        event.preventDefault();

        let nombre = nombreRef.current.value;
        let apellido = apellidoRef.current.value;
        let contraseña = contraseñaRef.current.value;
        let contraseña2 = contraseña2Ref.current.value;

        let errorNombre = document.getElementById("errorNombre");
        let errorApellido = document.getElementById("errorApellido");
        let errorContraseña = document.getElementById("errorContraseña");
        let errorContraseña2 = document.getElementById("errorContraseña2");
    
        let errorN = "";
        let errorA = "";
        let errorC = "";
        let errorC2 = "";

        function validarTexto(parametro) {
            var patron = /^[a-zA-Z\s]*$/;
            if (parametro.search(patron)) {
              return false;
            } else {
              return true;
            }
          }
        
        let flag = false

        //NOMBRE
        if(nombre === ""){
            errorN = "Ingrese un nombre";
            flag = true;
        }else if(nombre.length < 3 || nombre.length > 20){
            errorN = "Ingrese un nombre de longitud adecuada";
            flag = true;
        }else if (validarTexto(nombre) === false) {
            errorN = "Por favor no ingrese caracteres especiales ni numericos";
            flag = true;
        }

        //APELLIDO
        if(apellido === ""){
            errorA = "Ingrese un apellido";
            flag = true;
        }else if(apellido.length < 3 || apellido.length > 20){
            errorA = "Ingrese un nombre de longitud adecuada";
            flag = true;
        }else if (validarTexto(apellido) === false) {
            errorA = "Por favor no ingrese caracteres especiales ni numericos";
            flag = true;
        }

        //CONTRASEÑA
        if(contraseña === ""){
            errorC = "Ingrese una contraseña";
            flag = true;
        }else if(contraseña.length < 6 || contraseña.length > 20){
            errorC = "Ingrese una contraseña de tamaño correcto"
            flag = true;
        }

        //CONTRASEÑA 2
        if(contraseña2 === ""){
            errorC2 = "Confirme su contraseña"
            flag = true;
        }else if(contraseña2 !== contraseña){
            errorC2 = "Las contraseñas no coinciden";
            flag = true;
        }


        if(flag === true){
            console.warn("ENTRA A TRUE")
            errorNombre.innerHTML = errorN;
            errorApellido.innerHTML = errorA;
            errorContraseña.innerHTML = errorC;
            errorContraseña2.innerHTML = errorC2;
        } else {

            errorN = "";
            errorA = "";
            errorC = "";
            errorC2 = "";

            errorNombre.innerHTML = errorN;
            errorApellido.innerHTML = errorA;
            errorContraseña.innerHTML = errorC;
            errorContraseña2.innerHTML = errorC2;

            nombreRef.current.value = "";
            apellidoRef.current.value = "";
            contraseñaRef.current.value = "";
            contraseña2Ref.current.value = "";

            let registro = {
                "nombre": nombre,
                "apellido": apellido,
                "contraseña": contraseña,
            }

            registro = JSON.stringify(registro);
            console.log(registro);
            //ENVIAR A BACK END
        }

    }


    return (
        <React.Fragment>
            <div className="container" style={{ color: "#424B5A;" }}>

                <div className="row" style={{marginTop: "56px"}}>
                    <div className="col">
                        <div
                            className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center">
                            <div
                                style={{background: "#FFFFFF",width: "386px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                                <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center"
                                    style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>
                                    Registro</h2>
                                <p className="d-xl-flex justify-content-xl-center align-items-xl-center"
                                    style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "24px",paddingRight: "32px",paddingLeft: "32px",borderColor: "#A1AEB7"}}>
                                    Hemos encontrado servicios asociados a tu cédula. Para acceder a ellos debes primero
                                    registrarte en el portal.<br /></p>
                                <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                    style={{marginTop: "24px",marginBottom: "24px"}}>
                                    <form method="post" style={{width: "260px"}}>
                                        <div className="mb-3" style={{fontSize: "12px"}}>
                                            <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Cédula</p>
                                            <input
                                                className="form-control form-control-sm" type="text" name="Cedula"
                                                placeholder="Cédula" style={{fontSize: "14px",marginBottom: "4px"}} required=""
                                                readonly="" />
                                        </div>
                                        <div className="mb-3" style={{fontSize: "12px"}}>
                                            <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Nombre</p>
                                            <input ref={nombreRef}
                                                className="form-control form-control-sm" type="text" name="Nombre"
                                                placeholder="Nombre" style={{fontSize: "14px",marginBottom: "4px"}} required="" />
                                            <p id="errorNombre" style={{color: 'var(--bs-red)'}} ></p>
                                        </div>
                                        <div className="mb-3" style={{fontSize: "12px"}}>
                                            <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Apellido</p>
                                            <input ref={apellidoRef}
                                                className="form-control form-control-sm" type="text" name="Apellido"
                                                placeholder="Apellido" style={{fontSize: "14px",marginBottom: "4px"}} required="" />
                                            <p id="errorApellido" style={{color: 'var(--bs-red)'}}></p>
                                        </div>
                                        <div className="mb-3" style={{fontSize: "12px"}}>
                                            <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Contraseña</p>
                                            <input ref={contraseñaRef} className="form-control form-control-sm" type="password" name="pass"
                                                style={{fontSize: "14px",marginBottom: "4px"}} required="" />
                                            <p id="errorContraseña" style={{color: 'var(--bs-red)'}} ></p>
                                        </div>
                                        <div className="mb-3" style={{fontSize: "12px"}}>
                                            <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Confirmar
                                                contraseña</p>
                                                <input ref={contraseña2Ref} className="form-control form-control-sm" type="password"
                                                name="passnew" style={{fontSize: "14px",marginBottom: "4px"}} required="" />
                                            <p id="errorContraseña2" style={{color: 'var(--bs-red)'}}></p>
                                        </div>
                                        <div className="d-xl-flex justify-content-xl-center mb-3"
                                            style={{width: "40%",marginLeft: "30%",fontSize: "14px"}}>
                                                <button onClick={registrar}
                                                className="btn btn-primary d-block w-100" type="button"
                                                style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "14px"}}>Registrar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
