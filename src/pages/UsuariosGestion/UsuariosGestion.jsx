import React from 'react';
import Titulo from '../../components/Titulo';
import {useRef} from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';

export default function UsuariosGestion() {

    let cedulaRef = useRef("");
    let nombreRef = useRef("");
    let apellidoRef = useRef("");
    let contraseñaRef = useRef("");
    let contraseña2Ref = useRef("");
    let perfilRef = useRef("");
    let cedulaEliminarRef = useRef("");
    var host = "http://localhost:8080";

    function validarTexto(parametro) {
        var patron = /^[a-zA-Z\s]*$/;
        if (parametro.search(patron)) {
            return false;
        } else {
            return true;
        }
    }

    const crear = () => {

        let cedula = cedulaRef.current.value;
        let nombre = nombreRef.current.value;
        let apellido = apellidoRef.current.value;
        let contraseña = contraseñaRef.current.value;
        let contraseña2 = contraseña2Ref.current.value;
        let perfil = perfilRef.current.value;

        let errorCedula = document.getElementById("errorCedula");
        let errorNombre = document.getElementById("errorNombre");
        let errorApellido = document.getElementById("errorApellido");
        let errorPass = document.getElementById("errorPass");
        let errorPass2 = document.getElementById("errorPass2");
        

        let errorC = "";
        let errorN = "";
        let errorA = "";
        let errorP = "";
        let errorP2 = "";
        

        let flag = false;

        if(cedula === ""){
            errorC = "Ingrese una cedula."
            flag = true
        }
        
        console.log("EVALUAR:")
        console.warn(validarTexto(nombre));

        //NOMBRE
        if(nombre === "") {
            errorN = "Ingrese un nombre";
            flag = true;
            } else if (validarTexto(nombre) === false) {
            errorN = "Por favor no ingrese caracteres especiales ni numericos";
            flag = true;
            } else if (nombre.length < 3 || nombre.length > 20) {
            errorN = "Ingrese un nombre de longitud adecuada";
            flag = true;
            }
        
        //APELLIDO
        if(apellido === "") {
            errorA = "Ingrese un apellido";
            flag = true;
            } else if (validarTexto(apellido) === false) {
            errorA = "Por favor no ingrese caracteres especiales ni numericos";
            flag = true;
            } else if (apellido.length < 3 || apellido.length > 20) {
            errorA = "Ingrese un apellido de longitud adecuada";
            flag = true;
            }

        //CONTRASEÑA
        if(contraseña === ""){
            errorP = "Ingrese una contraseña";
            flag = true;
        } else if(contraseña.length < 6 || contraseña.length > 20){
            errorP = "Ingrese una contraseña de longitud adecuada";
            flag = true;
        }

        //CONTRASEÑA 2
        if(contraseña2 !== contraseña){
            errorP2 = "Las contraseñas no coinciden";
            flag = true;
        }

        if(flag === true){
            errorNombre.innerHTML = errorN;
            errorApellido.innerHTML = errorA;
            errorCedula.innerHTML = errorC;
            errorPass.innerHTML = errorP;
            errorPass2.innerHTML = errorP2;
        } else{
            console.log("Sin problemas")
            errorN = "";
            errorA = "";
            errorC = "";
            errorP = "";
            errorP2 = "";
            errorNombre.innerHTML = errorN;
            errorApellido.innerHTML = errorA;
            errorCedula.innerHTML = errorC;
            errorPass.innerHTML = errorP;
            errorPass2.innerHTML = errorP2;
            cedulaRef.current.value = "";
            nombreRef.current.value = "";
            apellidoRef.current.value = "";
            contraseñaRef.current.value = "";
            contraseña2Ref.current.value = "";
            let usuario = {
                "cedula": cedula,
                "nombre": nombre,
                "apellido": apellido,
                "rol": perfil,
                "contrasena": contraseña 
            }

            fetch(`${host}/usuariosGestion`,{
                headers:{"content-type": "application/json"},
                method: "POST",
                body: JSON.stringify(usuario)
            })
            .then((data) => data.json())
            .then((data) =>{
                if(data.estado ==="ok"){
                    alert(data.msg)
                    console.log("usuario guardado")
                } else if(data.estado ==="error") {
                    alert(data.msg)
                    console.log("usuario no guardado")

                }
            })
            .catch((error)=>{
                console.log("error en el servidor")
                alert(error)
            })
            //HACER POST A LA RUTA
            
        }

    }

    const eliminar = () => {

        let errorCedulaEliminar = document.getElementById("errorCedulaEliminar");
        
        console.warn("ENTRO A ELIMINAR")
        let cedulaEliminar = cedulaEliminarRef.current.value;    
        let flag = false;
        let errorCE = "";
        
        console.log(cedulaEliminar);

        if (cedulaEliminar === "") {
            console.log("valida la cedula en 0");
            errorCE = "Ingrese una cedula valida";
            flag = true;
        } //BUSCAR AHORA CEDULA EN BASE DE DATOS

        if (flag === true) {
            console.warn("FLAG === TRUE");
            errorCedulaEliminar.innerHTML = errorCE;

        } else if(flag===false){
            errorCE = "";
            errorCedulaEliminar.innerHTML = errorCE;
              
        }

        let eliminar = {
            "cedula" : cedulaEliminar
        }

        fetch(`${host}/eliminar`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify(eliminar),
        })
          .then((data) => data.json())
          .then((data) => {
            if (data.estado == "ok") {
              alert(data.msg);
              console.log("usuario Eliminado satisfactoriamente");
            } else if (data.estado == "error") {
              alert(data.msg);
              console.log("error en eliminar");
            }
          })
          .catch((error) => {
            console.log("error en el servidor");
            alert(error);
          });

        
        
    }
    
    return (
        <React.Fragment>
            <NavbarAdmin />
            <div className="container" style={{ color: "#424B5A;" }}>
                <Titulo
                    titulo="GESTION USUARIOS"
                    subTitulo1="A continuación, podrás gestionar los usuarios administradores de la plataforma"
                />
                <div className="container" style={{color: "#424B5A"}}>
                    
                    <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center" style={{marginBottom: "36px"}}>
                        <div style={{background: "#FFFFFF",width: "386px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                            <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>Crear usuario</h2>
                            <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{marginTop: "24px",marginBottom: "4PX"}}>
                                <form method="post" style={{width: "260px"}}>
                                    <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "24px",paddingRight: "32px",paddingLeft: "32px",borderColor: "#A1AEB7"}}>Información básica del usuario administrador que se desea crear.<br /></p>
                                    <div className="mb-3" style={{fontSize: "12PX"}}>
                                        <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4PX"}}>Cédula</p>
                                        <input ref={cedulaRef} className="form-control form-control-sm" type="text" name="Cedula" placeholder="Cédula" style={{fontSize: "14px",marginBottom: "4PX"}} required="" />
                                        <p id="errorCedula" style={{color: 'var(--bs-red)'}}></p>
                                    </div>
                                    <div className="mb-3" style={{fontSize: "12PX"}}>
                                        <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4PX"}}>Nombre
                                        </p><input ref={nombreRef} className="form-control form-control-sm" type="text" name="Nombre" placeholder="Nombre" style={{fontSize: "14px",marginBottom: "4PX"}} required="" />
                                        <p id="errorNombre" style={{color: 'var(--bs-red)'}}></p>
                                    </div>
                                    <div className="mb-3" style={{fontSize: "12PX"}}>
                                        <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4PX"}}>Apellido</p>
                                        <input ref={apellidoRef} className="form-control form-control-sm" type="text" name="Apellido" placeholder="Apellido" style={{fontSize: "14px",marginBottom: "4PX"}} required="" />
                                        <p id="errorApellido" style={{color: 'var(--bs-red)'}}></p>
                                    </div>
                                    <div className="mb-3" style={{fontSize: "12PX"}}>
                                        <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4PX"}}>Perfil</p>
                                        <select  ref={perfilRef} className="form-select form-select-sm" style={{fontSize: "14px",color: 'rgba(33,37,41,0.7)',marginBottom: "4PX"}} required="" name="Perfil">
                                            <optgroup label="Perfil">
                                                <option value="Analista" selected="">Analista</option>
                                                <option value="Tecnico">Técnico</option>
                                            </optgroup>
                                        </select>
                                        <p id="errorPerfil" style={{color: 'var(--bs-red)'}}></p>
                                    </div>
                                    <div className="mb-3" style={{fontSize: "12PX"}}>
                                        <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4PX"}}>Contraseña</p>
                                        <input ref={contraseñaRef} className="form-control form-control-sm" type="text" name="pass" style={{fontSize: "14px",marginBottom: "4PX"}} required="" />
                                        <p id="errorPass" style={{color: 'var(--bs-red)'}}></p>
                                    </div>
                                    <div className="mb-3" style={{fontSize: "12PX"}}>
                                        <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4PX"}}>Confirmar contraseña</p>
                                        <input ref={contraseña2Ref} className="form-control form-control-sm" type="text" name="passnew" style={{fontSize: "14px",marginBottom: "4PX"}} required="" />
                                        <p id="errorPass2" style={{color: 'var(--bs-red)'}}></p>
                                    </div>
                                    <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "40%",marginLeft: "30%",fontSize: "4PX"}}>
                                        <button  onClick={crear} className="btn btn-primary d-block w-100" type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "14PX"}}>Crear</button>
                                    </div>
                                    <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "24px",paddingRight: "32px",paddingLeft: "32px",borderColor: "#A1AEB7"}}>Consulta masivamente todos los usarios administradores de la plataforma.<br /></p>
                                    <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "40%",marginLeft: "30%",fontSize: "4PX"}}><button className="btn btn-primary d-block w-100" type="button" style={{background: "#F2F5F7",fontSize: "14px",borderColor: "#F2F5F7",color: "#505D68"}}>Descargar</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center" style={{marginBottom: "36px"}}>
                        <div style={{background: "#FFFFFF",width: "386px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                            <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>Eliminar usuario</h2>
                            <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{marginTop: "24px",marginBottom: "4PX"}}>
                                <form method="post" style={{width: "260px"}}>
                                    <div className="mb-3" style={{fontSize: "12PX"}}>
                                        <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4PX"}}>Cédula</p>
                                        <input ref={cedulaEliminarRef} className="form-control form-control-sm" type="text" name="Cedula" placeholder="Cédula" style={{fontSize: "14px",marginBottom: "4PX"}} required="" />
                                        <p id="errorCedulaEliminar" style={{color: 'var(--bs-red)'}}></p>
                                        <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "40%",marginLeft: "30%",fontSize: "4PX"}}>
                                            <button onClick={eliminar} className="btn btn-primary d-block w-100" type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "14PX"}}>Eliminar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
