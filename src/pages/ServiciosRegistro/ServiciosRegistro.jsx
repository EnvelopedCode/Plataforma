import React from 'react'
import Titulo from '../../components/Titulo'
import RegistroMasivo from '../../components/RegistroMasivo';
import { useRef, useState, useEffect } from 'react';
import NavbarAnalista from '../../components/NavbarAnalista';

export default function ServiciosRegistro() {


    const cedulaRef = useRef("");
    const nombreRef = useRef("");
    const apellidoRef = useRef("");
    const departamentoRef = useRef("");
    const municipioRef = useRef("");
    const direccionRef = useRef("");
    const barrioRef = useRef("");
    const estratoRef = useRef("");
    const fechaInicioRef = useRef("");

    var host = "http://localhost:8080";
    let flag = false;

    console.warn("TEST ZONE")
    //Crear fecha base (fecha de hoy)
    const A = new Date() //Fecha actual

    const diabase = A.getDate()
    const mesbase = A.getMonth()+1
    const yearbase = A.getFullYear()

    const date = yearbase + "-" + mesbase + "-" + diabase
    const [minimo, setMinimo] = useState("01-01-1999")
    const [maximo, setMaximo] = useState("01-01-2999")
    console.log(`Actual: ${date}`);

    //Establecer minimo
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() - 1);
    newDate.setDate(newDate.getDate()+2);

    const Min = newDate

    let dia = Min.getDate()
    if(dia < 10){
        dia = "0" + dia
    }
    let mes = Min.getMonth()+1
    if(mes < 10){
        mes = "0" + mes
    }
    let year = Min.getFullYear()

    let fechaMinima = year + "-" + mes + "-" + dia //MINIMO
    
    //Establecer maximo
    const newDate2 = new Date(date)
    newDate2.setMonth(newDate2.getMonth() + 1);
    newDate2.setDate(newDate2.getDate())

    const Max = newDate2
    let dia2 = Max.getDate()
    if(dia2 < 10){
        dia2 = "0" + dia2
    }
    let mes2 = Max.getMonth()+1
    
    if(mes2 < 10){
        mes2 = "0" + mes2

    }
    let year2 = Max.getFullYear()
    let fechaMaxima = year2 + "-" + mes2 + "-" + dia2 //MAXIMO

    //PLACEHOLDER FECHA
    var _onFocus = (e) => {
      console.log("DETECTO FOCUS")
      e.currentTarget.type = "date";
    }
    var _onBlur = (e) => {
        console.log("DETECTO BLUR")
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = date;
    }


    const consultar = (e) => {

      if(e.key == 'Enter' || e._reactName === "onBlur"){
        console.warn("Ingresa consultar")

        flag = false;
        let cedula = cedulaRef.current.value;
        const cedulaError = document.getElementById("cedulaError");
        let Nombre = document.getElementById("Nombre");
        let Apellido = document.getElementById("Apellido");
        let errorC = "";

        console.log(cedula)

        /*CEDULA*/
        if (cedula === "") {
          console.log("valida la cedula en 0");
          errorC = "Ingrese una cedula valida";
          flag = true;
        } else if (cedula.length < 10) {
          errorC = "Ingrese una longitud valida";
          flag = true;
        } else if (isNaN(cedula)){
          errorC = "No ingrese caracteres";
          flag = true;
        }

        if(flag === true){
          console.warn("FLAG === TRUE");
          cedulaError.innerHTML = errorC;
        } else {
          console.warn("FLAG === FALSE")
          errorC = "";
          cedulaError.innerHTML = errorC;

          const servicio = {
            "cedula": cedula,
          } 

          fetch(`${host}/usuariosBusqueda`, { //REVISAR RUTA
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify(servicio)
          })
            .then((data) => data.json()) // Obtener los datos
            .then((data) => {
              if(data.estado === "OK"){ //Encontro la cedula

                  console.log("Encontro cedula")
                  Nombre.value = data.nombre
                  Apellido.value = data.apellido
                  

                  Nombre.readOnly = true;
                  Apellido.readOnly = true;

              } else if(data.estado === "error"){ //No encontro la cedula

                  console.log("No encontro cedula")
                  Nombre.value = ""
                  Apellido.value = ""

                  Nombre.readOnly = false;
                  Apellido.readOnly = false;

              }
            })
            .catch((error) => { //Hubo error en la busqueda
              console.log("Error del servidor")
              alert(error)
            });

        }
      }

    }

    const guardar = () => { //Boton registrar

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
    
      /*CEDULA*/
      if (cedula === "") {
        console.log("valida la cedula en 0");
        errorC = "Ingrese una cedula valida";
        flag = true;
      } else if (cedula.length < 10 && cedula.length > 10) {
        errorC = "Ingrese una longitud valida";
        flag = true;
      } else if (isNaN(cedula) === true) {
        errorC = "No ingrese caracteres en la cedula";
        flag = true;
      }

      /*NOMBRE*/
      if (nombre === "") {
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

      /*DIRECCION*/
      if (direccion === "") {
        errorDir = "Ingrese una direccion";
        flag = true;
      } else if (direccion.lenght < 5) {
        errorDir = "Ingrese una direccion valida";
        flag = true;
      }

      //BARRIO
      if (barrio === "") {
        errorB = "Ingrese un barrio";
        flag = true;
      } else if (barrio.lenght < 5) {
        errorB = "Ingrese un barrio valido";
        flag = true;
      }

      //FECHA
      if (fecha === ""){
        errorF = "Ingrese una fecha de ingreso";
        flag = true;
      }

      console.warn(errorB);
      console.warn(errorDir);

      if (flag === true) {
        console.warn("FLAG === TRUE");
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
        direccionRef.current.value="";
        barrioRef.current.value="";
        fechaInicioRef.current.value="";

        const servicio = {
          "cedula": cedula,
          "nombre": nombre,
          "apellido": apellido,
          "departamento": departamento,
          "municipio": municipio,
          "direccion": direccion,
          "barrio": barrio,
          "estrato": estrato,
          "fecha": fecha,
          "servicio": cedula
        } 

        fetch(`${host}/servicioRegistro`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify(servicio)
        })
          .then((data) => data.json()) // Obtener los datos
          .then((data) => {
            alert(data.msg);
            document.getElementById("Nombre").readOnly = false;
            document.getElementById("Apellido").readOnly = false;
          })
          .catch((error) => {
            alert(error.msg);
          });
        
      }
      
    }

    useEffect(() => {
      //SETTEAR LIMITES
      setMinimo(fechaMinima)
      setMaximo(fechaMaxima)
    }, [])

    return (
      <React.Fragment>
        <NavbarAnalista />
        <div className="container" style={{ color: "#424B5A;" }}>
          <Titulo
            titulo="REGISTRO DE SERVICIO"
            subTitulo1="A continuación, podrás registrar tanto de forma manual como masiva los nuevos servicios de clientes"
            // subTitulo2="como masiva los nuevos servicios de clientes"
          />
          <RegistroMasivo subtitulo="Adjunta el archivo .xlsx con la información de los nuevos servicios a registrar" subtitulo2="" descarga={true} />
          {/*CONTENIDO*/}
          <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center" style={{marginBottom: "36px"}}>
            <div style={{background: "#FFFFFF",width: "386px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
              <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>Registro individual</h2>
                <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSise: "12px",color: "#A1AEB7",marginBottom: "0px",paddingRight: "32px",paddingLeft: "32px"}}>Ingresa la información básica del cliente responsable del servicio.<br /></p>
                <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{marginTop: "24px",marginBottom: "24px"}}>
                  {/*FORM*/}
                  <form method="post" style={{width: "260px"}}>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                            {/**/}
                            <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Cédula</p>
                            <input autocomplete="off" onKeyDown={consultar} onBlur={consultar} id="cedulaConsulta" ref={cedulaRef} className="form-control form-control-sm" type="number" name="Cedula" placeholder="Cédula" style={{fontSize: "14px",marginBottom: "4px"}} />
                            <p id="cedulaError" name="cedulaError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                            <p style={{color: "#A1AEB7", marginBottom: "0px",paddingBottom: "4px"}}>Nombre</p>
                            <input autocomplete="off" id="Nombre" ref={nombreRef} className="form-control form-control-sm" type="text" name="Nombre" placeholder="Nombre" style={{fontSize: "14px",marginBottom: "4px"}} required="" />
                            <p id="nombreError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                            <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Apellido</p>
                            <input autocomplete="off" id="Apellido" ref={apellidoRef} className="form-control form-control-sm" type="text" name="Apellido" placeholder="Apellido" style={{fontSize: "14px",marginBottom: "4px"}} required="" />
                            <p id="apellidoError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "24px",paddingRight: "32px",paddingLeft: "32px",borderColor: "#A1AEB7"}}>Ingresa la información básica del servicio a asociar al cliente.<br /></p>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                            <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Departamento</p>
                            <select ref={departamentoRef} className="form-select form-select-sm" style={{fontSize: "14px",color: 'rgba(33,37,41,0.7)',marginBottom: "4px"}} required="" name="Departamento">
                                <optgroup label="Departamento">
                                    <option value="Atlantico" selected="">Atlantico</option>
                                    <option value="Bolivar">Bolivar</option>
                                    <option value="Magdalena">Magdalena</option>
                                </optgroup>
                            </select>
                            <p id="departamentoError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                            <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Municipio</p>
                            <select ref={municipioRef} className="form-select form-select-sm" style={{fontSize: "14px",color: 'rgba(33,37,41,0.7)',marginBottom: "4px"}} required="" name="Municipio">
                                <optgroup label="Municipio">
                                    <option value="Barranquilla" selected="">Barranquilla</option>
                                    <option value="Puerto Colombia">Puerto Colombia</option>
                                    <option value="Soleadad">Soledad</option>
                                </optgroup>
                            </select>
                            <p id="municipioError" value="" style={{color: "var(--bs-red)"}}></p>
                        </div>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                            <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Dirección</p>
                            <input autocomplete="off" ref={direccionRef} className="form-control form-control-sm"type="text" name="Direccion" placeholder="Dirección" style={{fontSize: "14px",marginBottom: "4px"}} required="" />
                            <p id="direccionError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                            <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Barrio</p>
                            <input autocomplete="off" ref={barrioRef} className="form-control form-control-sm" type="text" name="Barrio" placeholder="Barrio" style={{fontSize: "14px",marginBottom: "4px"}} required="" />
                            <p id="barrioError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <div className="mb-3" style={{fontSize: '12px'}}>
                            <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Estrato</p>
                            <select ref={estratoRef} className="form-select form-select-sm" style={{fontSize: "14px",color: 'rgba(33,37,41,0.7)',marginBottom: "4px"}} required="" name="Estrato">
                                <optgroup label="Estrato">
                                    <option value="1" selected="">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </optgroup>
                            </select>
                            <p id="estratoError"value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <div className="mb-3" style={{fontSize: "12px"}}>
                            <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Primera fecha de facturación</p>
                            <input id="datePicker" min={minimo} max={maximo} placeholder={date} onFocus={_onFocus} onBlur={_onBlur} ref={fechaInicioRef} className="form-control form-control-sm" name="Fecha" style={{fontSize: "14px",marginBottom: "4px",color: 'rgba(33,37,41,0.7)'}} type="text" required="" /> 
                            <p id="fechaInicioError" value="" style={{color: 'var(--bs-red)'}}></p>
                        </div>
                        <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "40%",marginLeft: "30%",fontSize: "14px"}}>
                        <button onClick={guardar} className="btn btn-primary d-block w-100" type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "14px"}}>Registrar</button></div>
                    </form>
                  {/*FORM*/}
                </div>
            </div>
          </div>
          {/*CONTENIDO*/}
        </div>
      </React.Fragment>
    );
  }
