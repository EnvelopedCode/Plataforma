import React from 'react'
import NavbarAdmin from '../../components/NavbarAdmin'
import Titulo from '../../components/Titulo'
import RegistroMasivo from '../../components/RegistroMasivo';
import { useRef } from 'react';

export default function ServiciosRegistro() {

    const cedulaRef = useRef();
    const nombreRef = useRef();
    const apellidoRef = useRef();
    const departamentoRef = useRef();
    const municipioRef = useRef();
    const direccionRef = useRef();
    const barrioRef = useRef();
    const estratoRef = useRef();
    const fechaInicioRef = useRef();

    let flag = false;

    const guardar = () => {

      flag = false;

      let cedula = cedulaRef.current.value;
      let nombre = nombreRef.current.value;
      let apellido = apellidoRef.current.value;
      let departamento = departamentoRef.current.value;
      let municipio = municipioRef.current.value;
      let direccion = direccionRef.current.value;
      let barrio = barrioRef.current.value;
      let estrato = estratoRef.current.value;
      let fecha = fechaInicioRef.current.value;

      const cedulaError = document.getElementById("cedulaError");
      const nombreError = document.getElementById("nombreError");
      const apellidoError = document.getElementById("apellidoError");
      const departamentoError = document.getElementById("departamentoError");
      const municipioError = document.getElementById("municipioError");
      const direccionError = document.getElementById("direccionError");
      const barrioError = document.getElementById("barrioError");
      const estratoError = document.getElementById("estratoError");
      const fechaInicioError = document.getElementById("fechaInicioError");

      let errorC = "";
      let errorN = "";
      let errorA = "";
      let errorD = "";
      let errorM = "";
      let errorDir = "";
      let errorB = "";
      let errorE = "";
      let errorF = "";

      function validarTexto(parametro) {
        var patron = /^[a-zA-Z\s]*$/;
        if (parametro.search(patron)) {
          return false;
        } else {
          return true;
        }
      }

      console.warn(barrio);
    
      /*CEDULA*/
      if (cedula.length === 0 || cedula.length === null) {
        console.log("valida la cedula en 0");
        errorC = "Ingrese una cedula valida";
        flag = true;
      } else if (cedula.length < 10) {
        errorC = "Ingrese una longitud valida";
        flag = true;
      }

      /*NOMBRE*/
      if (nombre.length === 0 || nombre.length === null) {
        errorN = "Ingrese un nombre";
        flag = true;
      } else if (validarTexto(apellido) === false) {
        errorN = "Por favor no ingrese caracteres especiales ni numericos";
        flag = true;
      } else if (nombre.length < 3 || nombre.length > 20) {
        errorN = "Ingrese un nombre de longitud adecuada";
        flag = true;
      }

      //APELLIDO
      if (apellido.length === 0 || apellido.length === null) {
        errorA = "Ingrese un apellido";
        flag = true;
      } else if (validarTexto(apellido) === false) {
        errorA = "Por favor no ingrese caracteres especiales ni numericos";
        flag = true;
      } else if (apellido.length < 3 || apellido.length > 20) {
        errorA = "Ingrese un nombre de longitud adecuada";
        flag = true;
      }

      /*DIRECCION*/
      if (direccion.length === 0 || direccion.length === null) {
        console.log("valida la direccion");
        errorDir = "Ingrese una direccion";
        flag = true;
      } else if (direccion.lenght < 5) {
        errorDir = "Ingrese una direccion valida";
        flag = true;
      }

      //BARRIO
      if (barrio.length === 0 || barrio.length === null) {
        console.log("valida el barrio");
        errorB = "Ingrese un barrio";
        flag = true;
      } else if (barrio.lenght < 5) {
        errorB = "Ingrese un barrio valido";
        flag = true;
      }

      if (flag === true) {
        console.log("entró al true");
        cedulaError.innerHTML = errorC;
        nombreError.innerHTML = errorN;
        apellidoError.innerHTML = errorA;
        departamentoError.innerHTML = errorD;
        municipioError.innerHTML = errorM;
        direccionError.innerHTML = errorDir;
        barrioError.innerHTML = errorB;
        estratoError.innerHTML = errorE;
        fechaInicioError.innerHTML = errorF;
      }else{
        console.warn("FLAG === FALSE")
        // document.getElementById("registro").submit();
        errorC = "";
        errorN = "";
        errorA = "";
        errorD = "";
        errorM = "";
        errorDir = "";
        errorB = "";
        errorE = "";
        errorF = "";
        cedulaError.innerHTML = errorC;
        nombreError.innerHTML = errorN;
        apellidoError.innerHTML = errorA;
        departamentoError.innerHTML = errorD;
        municipioError.innerHTML = errorM;
        direccionError.innerHTML = errorDir;
        barrioError.innerHTML = errorB;
        estratoError.innerHTML = errorE;
        fechaInicioError.innerHTML = errorF;
        
        cedulaRef.current.value = "";
        nombreRef.current.value = "";
        apellidoRef.current.value = "";
        departamentoRef.current.value = "";
        municipioRef.current.value = "";
        direccionRef.current.value="";
        barrioRef.current.value="";
        estratoRef.current.value="";
        fechaInicioRef.current.value="";
        
      }
    }

    console.log("VALIDACIONES")
    console.log("VALIDACIONES")   

    return (
      <React.Fragment>
        <NavbarAdmin />
        <div classNameName="container" style={{ color: "#424B5A;" }}>
          <Titulo
            titulo="REGISTRO DE SERVICIO"
            subTitulo1="A continuación, podrás registrar tanto de forma manual"
            subTitulo2="como masiva los nuevos servicios de clientes"
          />
          <RegistroMasivo mensaje="Adjunta el archivo .xlsx con la información de los nuevos servicios a registrar" />
          {/*CONTENIDO*/}
          <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center" style={{marginBottom: "36px"}}>
            <div style={{background: "#FFFFFF",width: "386px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>Registro individual</h2>
                <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "0px",paddingRight: "32px",paddingLeft: "32px"}}>Ingresa la información básica del cliente responsable del servicio.<br /></p>
                <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{marginTop: "24px",marginBottom: "24px"}}>
                    <form id="registro" method="post" style={{width: "260px"}}>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                          <input ref={cedulaRef} className="form-control form-control-sm" type="number" name="Cedula" placeholder="Cédula" style={{fontSize: "14px",marginBottom: "4px"}} />
                            <p id="cedulaError" name="cedulaError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                          <input ref={nombreRef} className="form-control form-control-sm" type="text" name="Nombre" placeholder="Nombre" style={{fontSize: "14px",marginBottom: "4px"}} />
                          <p id="nombreError" name="nombreError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                          <input ref={apellidoRef} className="form-control form-control-sm" type="text" name="Apellido" placeholder="Apellido" style={{fontSize: "14px",marginBottom: "4px"}} />
                          <p id="apellidoError" name="apellidoError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "24px",paddingRight: "32px",paddingLeft: "32px",borderColor: "#A1AEB7"}}>Ingresa la información básica del servicio a asociar al cliente.<br /></p>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                          <select ref={departamentoRef} className="form-select form-select-sm" style={{fontSize: "14px",color: 'rgba(33,37,41,0.7)'}}>
                                <optgroup label="Departamento">
                                    <option value="Atlántico" selected="">Atlántico</option>
                                    <option value="Bolivar">Bolívar</option>
                                    <option value="Magdalena">Magdalena</option>
                                </optgroup>
                            </select>
                            <p id="departamentoError" name="departamentoError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                          <select  ref={municipioRef} className="form-select form-select-sm" style={{fontSize: "14px",color: 'rgba(33,37,41,0.7)'}}>
                                <optgroup label="Municipio">
                                    <option value="Barranquilla" selected="">Barranquilla</option>
                                    <option value="Puerto Colombia">Puerto Colombia</option>
                                    <option value="Soledad">Soledad</option>
                                </optgroup>
                            </select>
                            <p id="municipioError" name="municipioError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                          <input ref={direccionRef} className="form-control form-control-sm" type="text" name="Dirección" placeholder="Dirección" style={{fontSize: "14px",marginBottom: "4px"}} />
                          <p id="direccionError" name="direccionError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                          <input ref={barrioRef} className="form-control form-control-sm" type="text" name="Barrio" placeholder="Barrio" style={{fontSize: "14px",marginBottom: "4px"}} />
                          <p id="barrioError" name="barrioError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                          <select ref={estratoRef} className="form-select form-select-sm" style={{fontSize: "14px",color: 'rgba(33,37,41,0.7)'}}>
                                <optgroup label="Estrato">
                                    <option value="1" selected="">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </optgroup>
                            </select>
                            <p id="estratoError" name="estratoError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                          <input ref={fechaInicioRef} className="form-control form-control-sm" name="Fecha inicio" placeholder="Fecha inicio" style={{fontSize: "14px",marginBottom: "4px",color: 'rgba(33,37,41,0.7)'}} type="date" />
                          <p id="fechaInicioError" name="fechaInicioError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "40%",marginLeft: "30%",fontSize: "14px"}}>
                          <button onClick={guardar} className="btn btn-primary d-block w-100" type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "12px"}}>Cargar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
      </React.Fragment>
    );
  }
